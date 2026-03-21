// app/api/reservar-preservacao/route.js
// Recebe os dados do formulário de reserva de preservação e cria um item no Monday.com via GraphQL.
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

// ─── Colunas Status (color) neste board rejeitam { label } com missingLabel ──
// Usamos { index } com os valores confirmados pelos erros da API Monday.

// single_select634naka / color_mm1kz8vz
// {0: "Sim,...", 2: "Gostava...", 3: "Não,..."}
function extrasIndex(val) {
  if (!val) return undefined;
  const v = val.trim();
  if (v.startsWith("Sim,")) return 0;
  if (v.startsWith("Gostava")) return 2;
  if (v.startsWith("Não,")) return 3;
  return undefined;
}

// single_selectif561xw (quadrosExtra)
// 0=Não, 1=Sim, 2=Gostava
function quadrosExtraIndex(val) {
  if (!val) return undefined;
  const v = val.trim();
  if (v.startsWith("Não,")) return 0;
  if (v.startsWith("Sim,")) return 1;
  if (v.startsWith("Gostava")) return 2;
  return undefined;
}

// color_mkq09fxw (tamanho de moldura)
// {0: 40x50cm, 1: 30x40cm, 2: 50x70cm, 3: Ainda não sei}
function tamanhoMolduraIndex(val) {
  if (!val) return undefined;
  const v = val.trim();
  if (v === "30x40cm") return 1;
  if (v === "40x50cm") return 0;
  if (v === "50x70cm") return 2;
  if (v.startsWith("Ainda não sei")) return 3;
  return undefined;
}

// color_mkq04a2f (comoEnviarFlores)
// {0: Envio por CTT/..., 1: Entrega em mãos, 2: Recolha no evento, 3: Ainda não sei}
function comoEnviarFloresIndex(val) {
  if (!val) return undefined;
  const v = val.trim();
  if (v.startsWith("Envio por CTT")) return 0;
  if (v.startsWith("Entrega em mãos")) return 1;
  if (v.startsWith("Recolha no evento")) return 2;
  if (v.startsWith("Ainda não sei")) return 3;
  return undefined;
}

// color_mkq0xxf4 (tipo de fundo)
// {0:Preto, 1:Transparente, 2:Branco, 3:Fotografia, 4:Ainda não sei, 6:Cor, 7:Gostaria}
function tipoFundoIndex(val) {
  if (!val) return undefined;
  const v = val.trim();
  if (v === "Preto") return 0;
  if (v.startsWith("Transparente")) return 1;
  if (v === "Branco") return 2;
  if (v.startsWith("Fotografia")) return 3;
  if (v.startsWith("Ainda não sei")) return 4;
  if (v === "Cor") return 6;
  if (v.startsWith("Gostaria que fossem")) return 7;
  return undefined;
}

function buildColumnValues(data) {
  const cols = {};

  if (data.meioContacto)
    cols.color_mks92sp9 = { label: data.meioContacto };

  if (data.email)
    cols.email_mkq0dm3f = { email: data.email, text: data.email };

  if (data.telefone) {
    const phoneClean = data.telefone.replace(/\s+/g, "");
    if (phoneClean.length >= 7)
      cols.phone_mkq0xfnm = { phone: phoneClean, countryShortName: detectCountryShortName(data.telefone) };
  }

  if (data.dataEvento)
    cols.date_mkpzn3z3 = { date: data.dataEvento };

  if (data.tipoFlores)
    cols.long_text_mkq0e33x = { text: data.tipoFlores };

  if (data.comoEnviarFlores) {
    const idx = comoEnviarFloresIndex(data.comoEnviarFlores);
    cols.color_mkq04a2f = idx !== undefined ? { index: idx } : { label: data.comoEnviarFlores };
  }

  if (data.comoReceberQuadro)
    cols.color_mkq066bs = { label: data.comoReceberQuadro };

  if (data.tamanhoMoldura) {
    const idx = tamanhoMolduraIndex(data.tamanhoMoldura);
    cols.color_mkq09fxw = idx !== undefined ? { index: idx } : { label: data.tamanhoMoldura };
  }

  if (data.tipoFundo) {
    const idx = tipoFundoIndex(data.tipoFundo);
    cols.color_mkq0xxf4 = idx !== undefined ? { index: idx } : { label: data.tipoFundo };
  }

  if (data.elementosExtra?.length)
    cols.dropdown_mkq0vepg = { labels: data.elementosExtra };

  if (data.quadrosExtra) {
    const idx = quadrosExtraIndex(data.quadrosExtra);
    cols.single_selectif561xw = idx !== undefined ? { index: idx } : { label: data.quadrosExtra };
  }

  if (data.quantosQuadros)
    cols.long_textnvi49n07 = { text: String(data.quantosQuadros) };

  if (data.ornamentosNatal) {
    const idx = extrasIndex(data.ornamentosNatal);
    cols.single_select634naka = idx !== undefined ? { index: idx } : { label: data.ornamentosNatal };
  }

  if (data.quantosOrnamentos)
    cols.text_mm1kx2jh = String(data.quantosOrnamentos);

  if (data.pendentes) {
    const idx = extrasIndex(data.pendentes);
    cols.color_mm1kz8vz = idx !== undefined ? { index: idx } : { label: data.pendentes };
  }

  if (data.quantosPendentes)
    cols.text_mm1k610f = String(data.quantosPendentes);

  if (data.comoConheceu)
    cols.color_mkq0n7rp = { label: data.comoConheceu };

  if (data.comoConheceuOutro)
    cols.long_text_mkq0qwqs = { text: data.comoConheceuOutro };

  if (data.nomeFlorista)
    cols.long_textyoq9dh7s = { text: data.nomeFlorista };

  if (data.elementosExtraOutro)
    cols.long_text_mkq090y7 = { text: data.elementosExtraOutro };

  if (data.notasAdicionais)
    cols.long_text_mkq0z9d = { text: data.notasAdicionais };

  return cols;
}

// ─── Limites de comprimento para campos de texto livre ───────────────────────
const MAX_LENGTHS = {
  nome: 200,
  email: 200,
  telefone: 30,
  tipoFlores: 1000,
  elementosExtraOutro: 500,
  notasAdicionais: 2000,
  comoConheceuOutro: 1000,
  nomeFlorista: 300,
};

export async function POST(request) {
  try {
    // ── Variáveis de ambiente obrigatórias ──────────────────────────────────
    if (!process.env.MONDAY_BOARD_ID_PRESERVACAO) {
      console.error("[reservar-preservacao] MONDAY_BOARD_ID_PRESERVACAO not set");
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
    // O campo "website" é invisível para humanos; bots costumam preenchê-lo.
    // Retorna sucesso silencioso para não alertar o bot.
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

    const overLimit = exceedsLength(data, MAX_LENGTHS);
    if (overLimit) {
      return NextResponse.json(
        { error: `O campo "${overLimit}" excede o comprimento máximo permitido.` },
        { status: 400 }
      );
    }

    // Rejeita datas com ano inválido antes de enviar ao Monday
    if (data.dataEvento) {
      const year = parseInt(data.dataEvento.split("-")[0], 10);
      if (isNaN(year) || year > 9999 || year < 1900) {
        return NextResponse.json({ error: "Data do evento inválida." }, { status: 400 });
      }
    }

    console.log("[reservar-preservacao] new submission from:", ip);

    const columnValues = buildColumnValues(data);

    const query = `
      mutation {
        create_item(
          board_id: ${process.env.MONDAY_BOARD_ID_PRESERVACAO}
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
    // Falha silenciosamente se a chave não estiver configurada.
    // escapeHtml() previne XSS no cliente de e-mail da destinatária.
    if (process.env.RESEND_API_KEY) {
      const e = (v) =>
        escapeHtml(!v || (Array.isArray(v) && !v.length) ? "—" : Array.isArray(v) ? v.join(", ") : v);

      const linhas = [
        `<tr><td><strong>Nome</strong></td><td>${e(data.nome)}</td></tr>`,
        `<tr><td><strong>Meio de contacto</strong></td><td>${e(data.meioContacto)}</td></tr>`,
        `<tr><td><strong>E-mail</strong></td><td>${e(data.email)}</td></tr>`,
        `<tr><td><strong>Telefone</strong></td><td>${e(data.telefone)}</td></tr>`,
        `<tr><td><strong>Data do evento</strong></td><td>${e(data.dataEvento)}</td></tr>`,
        `<tr><td><strong>Tipo de flores</strong></td><td>${e(data.tipoFlores)}</td></tr>`,
        `<tr><td><strong>Como enviar flores</strong></td><td>${e(data.comoEnviarFlores)}</td></tr>`,
        `<tr><td><strong>Como receber quadro</strong></td><td>${e(data.comoReceberQuadro)}</td></tr>`,
        `<tr><td><strong>Tamanho da moldura</strong></td><td>${e(data.tamanhoMoldura)}</td></tr>`,
        `<tr><td><strong>Tipo de fundo</strong></td><td>${e(data.tipoFundo)}</td></tr>`,
        `<tr><td><strong>Elementos extra</strong></td><td>${e(data.elementosExtra)}</td></tr>`,
        data.elementosExtraOutro ? `<tr><td><strong>Detalhe elemento extra</strong></td><td>${e(data.elementosExtraOutro)}</td></tr>` : "",
        `<tr><td><strong>Quadros extra</strong></td><td>${e(data.quadrosExtra)}</td></tr>`,
        data.quantosQuadros ? `<tr><td><strong>Quantos quadros extra</strong></td><td>${e(data.quantosQuadros)}</td></tr>` : "",
        `<tr><td><strong>Ornamentos de Natal</strong></td><td>${e(data.ornamentosNatal)}</td></tr>`,
        data.quantosOrnamentos ? `<tr><td><strong>Quantos ornamentos</strong></td><td>${e(data.quantosOrnamentos)}</td></tr>` : "",
        `<tr><td><strong>Pendentes</strong></td><td>${e(data.pendentes)}</td></tr>`,
        data.quantosPendentes ? `<tr><td><strong>Quantos pendentes</strong></td><td>${e(data.quantosPendentes)}</td></tr>` : "",
        `<tr><td><strong>Como conheceu</strong></td><td>${e(data.comoConheceu)}</td></tr>`,
        data.nomeFlorista ? `<tr><td><strong>Nome da florista</strong></td><td>${e(data.nomeFlorista)}</td></tr>` : "",
        data.comoConheceuOutro ? `<tr><td><strong>Como conheceu (detalhe)</strong></td><td>${e(data.comoConheceuOutro)}</td></tr>` : "",
        data.notasAdicionais ? `<tr><td><strong>Notas adicionais</strong></td><td>${e(data.notasAdicionais)}</td></tr>` : "",
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
            subject: `Nova pré-reserva de preservação — ${data.nome}`,
            html: `<h2 style="font-family:sans-serif;color:#5A1E38;">Nova pré-reserva de preservação</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px;">
  <tbody style="line-height:1.7;">${linhas}</tbody>
</table>`,
          }),
        });
      } catch (emailErr) {
        console.error("[reservar-preservacao] email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reservar preservacao route error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
