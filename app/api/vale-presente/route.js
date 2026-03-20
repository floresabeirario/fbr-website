// app/api/vale-presente/route.js
// Recebe os dados do formulário e cria um item no Monday.com via GraphQL.
// O token fica apenas no servidor — nunca exposto ao browser.

import { NextResponse } from "next/server";
import { headers } from "next/headers";

const MONDAY_API = "https://api.monday.com/v2";

// ─── Segurança: escaping HTML ────────────────────────────────────────────────
// Previne XSS no corpo do e-mail enviado via Resend.
function escapeHtml(val) {
  return String(val ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ─── Rate limiting (best-effort, por instância serverless) ───────────────────
// Para rate limiting global em produção, usar Upstash Redis + @upstash/ratelimit.
const _rl = new Map(); // ip → { count, resetAt }
function isRateLimited(ip) {
  const now = Date.now();
  const entry = _rl.get(ip);
  if (_rl.size > 500) {
    for (const [k, v] of _rl) { if (now > v.resetAt) _rl.delete(k); }
  }
  if (!entry || now > entry.resetAt) {
    _rl.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

// Maps dialling prefix → ISO 3166-1 alpha-2 code expected by Monday phone column.
// Longer prefixes must come before shorter ones to avoid false matches (e.g. +351 before +35).
const PREFIX_TO_ISO = [
  ["+351", "PT"], ["+352", "LU"], ["+353", "IE"], ["+354", "IS"], ["+355", "AL"],
  ["+356", "MT"], ["+357", "CY"], ["+358", "FI"], ["+359", "BG"], ["+370", "LT"],
  ["+371", "LV"], ["+372", "EE"], ["+373", "MD"], ["+374", "AM"], ["+375", "BY"],
  ["+380", "UA"], ["+381", "RS"], ["+382", "ME"], ["+383", "XK"], ["+385", "HR"],
  ["+386", "SI"], ["+387", "BA"], ["+389", "MK"], ["+420", "CZ"], ["+421", "SK"],
  ["+591", "BO"], ["+593", "EC"], ["+595", "PY"], ["+598", "UY"],
  ["+852", "HK"], ["+966", "SA"], ["+971", "AE"], ["+972", "IL"], ["+974", "QA"],
  ["+30", "GR"], ["+31", "NL"], ["+32", "BE"], ["+33", "FR"], ["+34", "ES"],
  ["+36", "HU"], ["+39", "IT"], ["+40", "RO"], ["+41", "CH"], ["+43", "AT"],
  ["+44", "GB"], ["+45", "DK"], ["+46", "SE"], ["+47", "NO"], ["+48", "PL"],
  ["+49", "DE"], ["+51", "PE"], ["+52", "MX"], ["+54", "AR"], ["+55", "BR"],
  ["+56", "CL"], ["+57", "CO"], ["+58", "VE"], ["+60", "MY"], ["+61", "AU"],
  ["+62", "ID"], ["+63", "PH"], ["+64", "NZ"], ["+65", "SG"], ["+66", "TH"],
  ["+81", "JP"], ["+82", "KR"], ["+86", "CN"], ["+90", "TR"], ["+91", "IN"],
  ["+212", "MA"], ["+233", "GH"], ["+234", "NG"], ["+238", "CV"], ["+239", "ST"],
  ["+240", "GQ"], ["+244", "AO"], ["+245", "GW"], ["+254", "KE"], ["+258", "MZ"],
  ["+27", "ZA"], ["+1", "US"],
];

function detectCountryShortName(phone) {
  const n = (phone || "").replace(/[\s\-\(\)]/g, "");
  for (const [prefix, iso] of PREFIX_TO_ISO) {
    if (n.startsWith(prefix)) return iso;
  }
  return "PT";
}

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

function exceedsLength(data) {
  for (const [key, max] of Object.entries(MAX_LENGTHS)) {
    if (typeof data[key] === "string" && data[key].length > max) return key;
  }
  return null;
}

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

    const overLimit = exceedsLength(data);
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
        { error: "Erro ao registar no sistema.", detail: json.errors },
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
