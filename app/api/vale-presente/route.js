// app/api/vale-presente/route.js
// Recebe os dados do formulário e cria um item no Monday.com via GraphQL.
// O token fica apenas no servidor — nunca exposto ao browser.

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  escapeHtml,
  createRateLimiter,
  detectCountryShortName,
  exceedsLength,
} from "@/app/_lib/api-helpers";

const MONDAY_API = "https://api.monday.com/v2";
const isRateLimited = createRateLimiter();

function buildColumnValues(data) {
  const cols = {};

  if (data.meioContacto)
    cols.single_select29teo39 = { label: data.meioContacto };

  if (data.telefone) {
    // Remove espaços — Monday rejeita números com espaços em alguns países.
    // Guarda mínimo de 7 chars para não enviar só o indicativo.
    const phoneClean = data.telefone.replace(/\s+/g, "");
    if (phoneClean.length >= 7)
      cols.phoneofkl3pv1 = { phone: phoneClean, countryShortName: detectCountryShortName(data.telefone) };
  }

  if (data.email)
    cols.emailq6ytvvvi = { email: data.email, text: data.email };

  if (data.nomeDestinatario)
    cols.short_textf7mgmmup = data.nomeDestinatario;

  if (data.mensagem)
    cols.long_textz9slq9om = { text: data.mensagem };

  if (data.valorVale)
    cols.numberuey1dh9l = Number(data.valorVale);

  if (data.entrega)
    cols.single_selectpkp4rxv = { label: data.entrega };

  if (data.tipoVale)
    cols.single_selectflb64wv = { label: data.tipoVale };

  if (data.entregaRemetenteComo)
    cols.color_mm1kya1x = { label: data.entregaRemetenteComo };

  if (data.morada)
    cols.long_texthqr0263u = { text: data.morada };

  if (data.contactoDestinatario) {
    const isEmail = data.contactoDestinatario.includes("@");
    cols.email_mkqvp1h6 = {
      email: isEmail ? data.contactoDestinatario : "",
      text: data.contactoDestinatario,
    };
  }

  if (data.dataEnvio)
    cols.datefa6cvbc4 = { date: data.dataEnvio };

  if (data.comentarios)
    cols.long_textcxluujwf = { text: data.comentarios };

  if (data.comoConheceu)
    cols.color_mkqwk84z = { label: data.comoConheceu };

  if (data.comoConheceuOutro)
    cols.long_text_mkqwhb3 = { text: data.comoConheceuOutro };

  if (data.nomeFlorista)
    cols.long_textk6rqfhxk = { text: data.nomeFlorista };

  return cols;
}

// ─── Limites de comprimento para campos de texto livre ───────────────────────
const MAX_LENGTHS = {
  nome: 200,
  email: 200,
  telefone: 30,
  nomeDestinatario: 200,
  mensagem: 1000,
  morada: 500,
  comentarios: 2000,
  comoConheceuOutro: 1000,
  nomeFlorista: 300,
};

export async function POST(request) {
  try {
    // ── Variáveis de ambiente obrigatórias ──────────────────────────────────
    if (!process.env.MONDAY_BOARD_ID_VALE) {
      console.error("[vale-presente] MONDAY_BOARD_ID_VALE not set");
      return NextResponse.json({ error: "Configuração em falta no servidor." }, { status: 500 });
    }

    // ── Rate limiting ───────────────────────────────────────────────────────
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados pedidos. Por favor aguarde um momento." },
        { status: 429 }
      );
    }

    const data = await request.json();

    // ── Honeypot anti-spam ──────────────────────────────────────────────────
    if (data.website) {
      return NextResponse.json({ success: true });
    }

    // ── Validação server-side ───────────────────────────────────────────────
    if (!data.nome?.trim() || !data.email?.trim()) {
      return NextResponse.json({ error: "Campos obrigatórios em falta." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Endereço de e-mail inválido." }, { status: 400 });
    }

    if (data.telefone && !/^\+?[\d\s\-]{5,30}$/.test(data.telefone)) {
      return NextResponse.json({ error: "Número de telefone inválido." }, { status: 400 });
    }

    if (data.valorVale !== undefined && data.valorVale !== "") {
      const val = Number(data.valorVale);
      if (isNaN(val) || val < 300 || val > 100_000) {
        return NextResponse.json({ error: "Valor do vale inválido." }, { status: 400 });
      }
    }

    const overLimit = exceedsLength(data, MAX_LENGTHS);
    if (overLimit) {
      return NextResponse.json(
        { error: `O campo "${overLimit}" excede o comprimento máximo permitido.` },
        { status: 400 }
      );
    }

    if (data.dataEnvio) {
      const year = parseInt(data.dataEnvio.split("-")[0], 10);
      if (isNaN(year) || year < 2020 || year > 2099) {
        return NextResponse.json({ error: "Data de envio inválida." }, { status: 400 });
      }
    }

    console.log("[vale-presente] new submission from:", ip);

    const columnValues = buildColumnValues(data);

    // column_values must be a JSON string literal inline in the query.
    // Using GraphQL variables with JSON! type is unreliable across Monday API versions.
    const query = `
      mutation {
        create_item(
          board_id: ${process.env.MONDAY_BOARD_ID_VALE}
          item_name: ${JSON.stringify(data.nome)}
          column_values: ${JSON.stringify(JSON.stringify(columnValues))}
        ) {
          id
        }
      }
    `;

    const res = await fetch(MONDAY_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MONDAY_API_TOKEN}`,
        "Content-Type": "application/json",
        "API-Version": "2024-10",
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();

    if (json.errors?.length) {
      console.error("Monday API errors:", JSON.stringify(json.errors, null, 2));
      return NextResponse.json(
        { error: "Erro ao registar no sistema." },
        { status: 500 }
      );
    }

    if (!json.data?.create_item?.id) {
      console.error("Monday unexpected response:", JSON.stringify(json, null, 2));
      return NextResponse.json({ error: "Resposta inesperada do sistema." }, { status: 500 });
    }

    // ── Notificação por e-mail (Resend) ─────────────────────────────────────
    // escapeHtml() previne XSS no cliente de e-mail da destinatária.
    if (process.env.RESEND_API_KEY) {
      const e = (v) => escapeHtml(!v ? "—" : v);

      const linhas = [
        `<tr><td><strong>Nome</strong></td><td>${e(data.nome)}</td></tr>`,
        `<tr><td><strong>Meio de contacto</strong></td><td>${e(data.meioContacto)}</td></tr>`,
        `<tr><td><strong>E-mail</strong></td><td>${e(data.email)}</td></tr>`,
        data.telefone ? `<tr><td><strong>Telefone</strong></td><td>${e(data.telefone)}</td></tr>` : "",
        `<tr><td><strong>Destinatário</strong></td><td>${e(data.nomeDestinatario)}</td></tr>`,
        data.mensagem ? `<tr><td><strong>Mensagem personalizada</strong></td><td>${e(data.mensagem)}</td></tr>` : "",
        `<tr><td><strong>Valor do vale</strong></td><td>${e(data.valorVale)}€</td></tr>`,
        `<tr><td><strong>Entrega</strong></td><td>${e(data.entrega)}</td></tr>`,
        `<tr><td><strong>Tipo de vale</strong></td><td>${e(data.tipoVale)}</td></tr>`,
        data.entregaRemetenteComo ? `<tr><td><strong>Como receber (remetente)</strong></td><td>${e(data.entregaRemetenteComo)}</td></tr>` : "",
        data.morada ? `<tr><td><strong>Morada</strong></td><td>${e(data.morada)}</td></tr>` : "",
        data.contactoDestinatario ? `<tr><td><strong>Contacto destinatário</strong></td><td>${e(data.contactoDestinatario)}</td></tr>` : "",
        data.dataEnvio ? `<tr><td><strong>Data de envio</strong></td><td>${e(data.dataEnvio)}</td></tr>` : "",
        data.comentarios ? `<tr><td><strong>Comentários</strong></td><td>${e(data.comentarios)}</td></tr>` : "",
        `<tr><td><strong>Como conheceu</strong></td><td>${e(data.comoConheceu)}</td></tr>`,
        data.nomeFlorista ? `<tr><td><strong>Nome da florista</strong></td><td>${e(data.nomeFlorista)}</td></tr>` : "",
        data.comoConheceuOutro ? `<tr><td><strong>Como conheceu (detalhe)</strong></td><td>${e(data.comoConheceuOutro)}</td></tr>` : "",
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
            to: ["info@floresabeirario.pt"],
            subject: `Novo pedido de vale presente — ${data.nome}`,
            html: `<h2 style="font-family:sans-serif;color:#3A4A78;">Novo pedido de vale presente</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px;">
  <tbody style="line-height:1.7;">${linhas}</tbody>
</table>`,
          }),
        });
      } catch (emailErr) {
        console.error("[vale-presente] email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Vale presente route error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
