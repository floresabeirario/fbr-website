// app/api/emoldurar-flores-secas/route.js
// ============================================================
// Recebe o formulário de "Emoldurar Flores Já Secas" e cria uma
// encomenda em `orders` (Supabase) com service_type = 'emoldurar_secas'.
//
// Difere do /api/reservar-preservacao em dois pontos:
//   • recebe multipart/form-data (fotos do ramo) em vez de JSON — os
//     dados vão no campo "data" (JSON string) e as fotos em "fotos";
//   • sobe até 5 fotos (≤10 MB cada, só imagens) para o bucket privado
//     `bouquet-photos` e guarda [{path,name}] em orders.client_photos.
//     São TEMPORÁRIAS: o admin move-as para o Drive ao 1º pagamento.
//
// Mantém as protecções do outro form: honeypot, rate limit, validação
// de Origin, Cloudflare Turnstile, notificação interna (email + push).
// ============================================================

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { randomUUID } from "node:crypto";
import { createFormsClient } from "@/app/_lib/supabase-server";
import {
  escapeHtml,
  createRateLimiter,
  exceedsLength,
  isAllowedOrigin,
} from "@/app/_lib/api-helpers";
import { EMAIL } from "@/app/_lib/constants";
import { mapEmoldurarToOrder } from "@/app/_lib/supabase-mappings";
import { verifyTurnstile } from "@/app/_lib/turnstile";

const isRateLimited = createRateLimiter();

const MAX_FOTOS = 5;
const MAX_FOTO_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const BUCKET = "bouquet-photos";

const MAX_LENGTHS = {
  nome:                200,
  email:               200,
  telefone:            30,
  nomeNoivos:          300,
  localEvento:         300,
  tipoFlores:          1000,
  elementosExtraOutro: 500,
  notasAdicionais:     2000,
  comoConheceuOutro:   1000,
  nomeFlorista:        300,
  codigoValePresente:  20,
};

// Extensão a partir do mime (para o nome do ficheiro no Storage).
function extFromType(type) {
  return (
    {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/heic": "heic",
      "image/heif": "heif",
    }[type] || "img"
  );
}

export async function POST(request) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error("[emoldurar-flores-secas] SUPABASE_URL/ANON_KEY not set");
      return NextResponse.json({ error: "Configuração em falta no servidor." }, { status: 500 });
    }

    const headersList = await headers();
    if (!isAllowedOrigin(headersList.get("origin"), headersList.get("referer"))) {
      return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });
    }

    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados pedidos. Por favor aguarde um momento." },
        { status: 429 },
      );
    }

    // ── multipart/form-data: "data" (JSON) + "fotos" (ficheiros) ──────────
    const formData = await request.formData();
    const rawData = formData.get("data");
    if (typeof rawData !== "string") {
      return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
    }
    let data;
    try {
      data = JSON.parse(rawData);
    } catch {
      return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
    }

    // Honeypot
    if (data.website) return NextResponse.json({ success: true });

    // Turnstile
    const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Verificação anti-spam falhou. Recarregue a página e tente novamente." },
        { status: 400 },
      );
    }

    // ── Validação server-side ───────────────────────────────────────────
    if (!data.nome?.trim() || !data.email?.trim()) {
      return NextResponse.json({ error: "Campos obrigatórios em falta." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Endereço de e-mail inválido." }, { status: 400 });
    }
    if (data.telefone && !/^\+?[\d\s\-]{5,30}$/.test(data.telefone)) {
      return NextResponse.json({ error: "Número de telefone inválido." }, { status: 400 });
    }
    if (!data.tipoEvento?.trim()) {
      return NextResponse.json({ error: "Indique o tipo de ocasião." }, { status: 400 });
    }
    const overLimit = exceedsLength(data, MAX_LENGTHS);
    if (overLimit) {
      return NextResponse.json(
        { error: `O campo "${overLimit}" excede o comprimento máximo permitido.` },
        { status: 400 },
      );
    }
    if (data.termosCondicoes !== true) {
      return NextResponse.json(
        { error: "Tem de aceitar os Termos e Condições para continuar." },
        { status: 400 },
      );
    }

    const supabase = createFormsClient();
    if (!supabase) {
      return NextResponse.json({ error: "Configuração em falta no servidor." }, { status: 500 });
    }

    // ── Upload das fotos do ramo para o Storage ─────────────────────────
    const fotos = formData.getAll("fotos").filter((f) => typeof f === "object" && f && "arrayBuffer" in f);
    if (fotos.length > MAX_FOTOS) {
      return NextResponse.json({ error: `Máximo de ${MAX_FOTOS} fotos.` }, { status: 400 });
    }
    const clientPhotos = [];
    const prefix = randomUUID();
    for (const [i, file] of fotos.entries()) {
      if (file.size > MAX_FOTO_BYTES) {
        return NextResponse.json({ error: "Cada foto pode ter no máximo 10 MB." }, { status: 400 });
      }
      if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json({ error: "Só aceitamos imagens (JPG, PNG, WEBP, HEIC)." }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const path = `${prefix}/foto-${i + 1}.${extFromType(file.type)}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: file.type, upsert: false });
      if (upErr) {
        console.error("[emoldurar-flores-secas] upload falhou:", upErr);
        return NextResponse.json(
          { error: "Não foi possível guardar as fotos. Tente novamente." },
          { status: 500 },
        );
      }
      clientPhotos.push({ path, name: (file.name || `foto-${i + 1}`).slice(0, 200) });
    }

    // ── Mapeia e insere ─────────────────────────────────────────────────
    const { payload, errors } = mapEmoldurarToOrder(data, { ip, clientPhotos });
    if (errors.length) {
      console.error("[emoldurar-flores-secas] mapping errors:", errors);
      // Fotos já subiram — limpa-as para não deixar lixo no Storage.
      if (clientPhotos.length) {
        await supabase.storage.from(BUCKET).remove(clientPhotos.map((p) => p.path));
      }
      return NextResponse.json({ error: `Valores inválidos em: ${errors.join(", ")}` }, { status: 400 });
    }

    const { data: inserted, error: dbError } = await supabase
      .from("orders")
      .insert(payload)
      .select("id, order_id")
      .single();

    if (dbError) {
      console.error("[emoldurar-flores-secas] supabase error:", dbError);
      if (clientPhotos.length) {
        await supabase.storage.from(BUCKET).remove(clientPhotos.map((p) => p.path));
      }
      return NextResponse.json(
        { error: "Erro ao registar o pedido. Tente novamente em instantes." },
        { status: 500 },
      );
    }

    // ── Notificação por e-mail (Resend) ─────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const e = (v) =>
        escapeHtml(!v || (Array.isArray(v) && !v.length) ? "—" : Array.isArray(v) ? v.join(", ") : v);
      const idiomaLabel = data.locale === "en" ? "Inglês" : "Português";
      const linhas = [
        `<tr><td><strong>ID</strong></td><td><code>${escapeHtml(inserted.order_id)}</code></td></tr>`,
        `<tr><td><strong>Serviço</strong></td><td>Emoldurar flores secas</td></tr>`,
        `<tr><td><strong>Idioma</strong></td><td>${idiomaLabel}</td></tr>`,
        `<tr><td><strong>Nome</strong></td><td>${e(data.nome)}</td></tr>`,
        `<tr><td><strong>Meio de contacto</strong></td><td>${e(data.meioContacto)}</td></tr>`,
        `<tr><td><strong>E-mail</strong></td><td>${e(data.email)}</td></tr>`,
        `<tr><td><strong>Telefone</strong></td><td>${e(data.telefone)}</td></tr>`,
        `<tr><td><strong>Tipo de ocasião</strong></td><td>${e(data.tipoEvento)}</td></tr>`,
        data.nomeNoivos ? `<tr><td><strong>Noivos</strong></td><td>${e(data.nomeNoivos)}</td></tr>` : "",
        `<tr><td><strong>Abordagem</strong></td><td>${e(data.abordagem)}</td></tr>`,
        `<tr><td><strong>Estado das flores</strong></td><td>${e(data.estadoFlores)}</td></tr>`,
        `<tr><td><strong>Fotos do ramo</strong></td><td>${clientPhotos.length}</td></tr>`,
        `<tr><td><strong>Tipo de flores</strong></td><td>${e(data.tipoFlores)}</td></tr>`,
        `<tr><td><strong>Como enviar flores</strong></td><td>${e(data.comoEnviarFlores)}</td></tr>`,
        `<tr><td><strong>Como receber quadro</strong></td><td>${e(data.comoReceberQuadro)}</td></tr>`,
        `<tr><td><strong>Tamanho da moldura</strong></td><td>${e(data.tamanhoMoldura)}</td></tr>`,
        `<tr><td><strong>Tipo de fundo</strong></td><td>${e(data.tipoFundo)}</td></tr>`,
        `<tr><td><strong>Vidro museu</strong></td><td>${e(data.vidroMuseu)}</td></tr>`,
        data.vidroMuseuMini ? `<tr><td><strong>Vidro museu (quadros pequenos)</strong></td><td>${e(data.vidroMuseuMini)}</td></tr>` : "",
        `<tr><td><strong>Elementos extra</strong></td><td>${e(data.elementosExtra)}</td></tr>`,
        `<tr><td><strong>Como conheceu</strong></td><td>${e(data.comoConheceu)}</td></tr>`,
        data.notasAdicionais ? `<tr><td><strong>Notas</strong></td><td>${e(data.notasAdicionais)}</td></tr>` : "",
      ].filter(Boolean).join("\n");

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Flores à Beira-Rio <noreply@floresabeirario.pt>",
            to: [EMAIL],
            subject: `Novo pedido: emoldurar flores secas | ${data.nome}`,
            html: `<h2 style="font-family:sans-serif;color:#5A1E38;">Novo pedido de emoldurar flores secas</h2>
<p style="font-family:sans-serif;font-size:13px;color:#666;">
  Veja no admin: <a href="https://admin.floresabeirario.pt/preservacao/${escapeHtml(inserted.order_id)}">${escapeHtml(inserted.order_id)}</a>
</p>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px;">
  <tbody style="line-height:1.7;">${linhas}</tbody>
</table>`,
          }),
        });
      } catch (emailErr) {
        console.error("[emoldurar-flores-secas] email error:", emailErr);
      }
    }

    // ── Notificação push interna (admin PWA) ────────────────────────────
    if (process.env.INTERNAL_NOTIFY_SECRET) {
      const adminBase = process.env.ADMIN_URL || "https://admin.floresabeirario.pt";
      try {
        await fetch(`${adminBase}/api/internal/notify-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.INTERNAL_NOTIFY_SECRET}`,
          },
          body: JSON.stringify({
            order_id: inserted.order_id,
            client_name: data.nome,
            event_type: "Emoldurar flores secas",
          }),
        });
      } catch (pushErr) {
        console.error("[emoldurar-flores-secas] push notify error:", pushErr);
      }
    }

    return NextResponse.json({ success: true, orderId: inserted.order_id });
  } catch (err) {
    console.error("Emoldurar flores secas route error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
