// app/api/reservar-preservacao/route.js
// Recebe os dados do formulário de reserva de preservação e cria um item no Monday.com via GraphQL.
// O token fica apenas no servidor — nunca exposto ao browser.

import { NextResponse } from "next/server";

const MONDAY_API = "https://api.monday.com/v2";

// Colunas Status (color) neste board rejeitam { label } com missingLabel.
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

// single_selectif561xw (quadrosExtra) — índices diferentes: confirmado por utilizador que 0=Não, 3=Sim
function quadrosExtraIndex(val) {
  if (!val) return undefined;
  const v = val.trim();
  if (v.startsWith("Não,")) return 0;
  if (v.startsWith("Gostava")) return 2;
  if (v.startsWith("Sim,")) return 3;
  return undefined;
}

// color_mkq09fxw (tamanho de moldura)
// {0: 40x50cm, 1: 30x40cm, 2: 50x70xm (typo Monday), 3: Ainda não sei}
function tamanhoMolduraIndex(val) {
  if (!val) return undefined;
  const v = val.trim();
  if (v === "30x40cm") return 1;
  if (v === "40x50cm") return 0;
  if (v === "50x70cm") return 2;
  if (v.startsWith("Ainda não sei")) return 3;
  return undefined;
}

// Detecção do indicativo do país a partir do número de telefone
function detectCountryShortName(phone) {
  const n = (phone || "").replace(/[\s\-\(\)]/g, "");
  if (n.startsWith("+351")) return "PT";
  if (n.startsWith("+44")) return "GB";
  if (n.startsWith("+33")) return "FR";
  if (n.startsWith("+34")) return "ES";
  if (n.startsWith("+49")) return "DE";
  if (n.startsWith("+39")) return "IT";
  if (n.startsWith("+31")) return "NL";
  if (n.startsWith("+32")) return "BE";
  if (n.startsWith("+41")) return "CH";
  if (n.startsWith("+55")) return "BR";
  if (n.startsWith("+1")) return "US";
  return "PT";
}

// color_mkq0xxf4 (tipo de fundo)
// {0:Preto, 1:Transparente(vidro sobre vidro), 2:Branco, 3:Fotografia(...), 4:Ainda não sei, 6:Cor, 7:Gostaria que fossem vocês a escolher}
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

  if (data.telefone)
    cols.phone_mkq0xfnm = { phone: data.telefone, countryShortName: detectCountryShortName(data.telefone) };

  if (data.dataEvento)
    cols.date_mkpzn3z3 = { date: data.dataEvento };

  if (data.tipoFlores)
    cols.long_text_mkq0e33x = { text: data.tipoFlores };

  if (data.comoEnviarFlores)
    cols.color_mkq04a2f = { label: data.comoEnviarFlores };

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
    cols.long_textnvi49n07 = { text: data.quantosQuadros };

  if (data.ornamentosNatal) {
    const idx = extrasIndex(data.ornamentosNatal);
    cols.single_select634naka = idx !== undefined ? { index: idx } : { label: data.ornamentosNatal };
  }

  if (data.quantosOrnamentos)
    cols.text_mm1kx2jh = data.quantosOrnamentos;

  if (data.pendentes) {
    const idx = extrasIndex(data.pendentes);
    cols.color_mm1kz8vz = idx !== undefined ? { index: idx } : { label: data.pendentes };
  }

  if (data.quantosPendentes)
    cols.text_mm1k610f = data.quantosPendentes;

  if (data.comoConheceu)
    cols.color_mkq0n7rp = { label: data.comoConheceu };

  if (data.comoConheceuOutro)
    cols.long_text_mkq0qwqs = { text: data.comoConheceuOutro };

  if (data.nomeFlorista)
    cols.long_textyoq9dh7s = { text: data.nomeFlorista };

  // "Que outros elementos gostaria de adicionar?" — campo livre quando "Outro" é seleccionado
  if (data.elementosExtraOutro)
    cols.long_text_mkq090y7 = { text: data.elementosExtraOutro };

  // Notas adicionais finais
  if (data.notasAdicionais)
    cols.long_text_mkq0z9d = { text: data.notasAdicionais };

  return cols;
}

export async function POST(request) {
  try {
    if (!process.env.MONDAY_BOARD_ID_PRESERVACAO) {
      console.error("[reservar-preservacao] MONDAY_BOARD_ID_PRESERVACAO not set");
      return NextResponse.json({ error: "Configuração em falta no servidor." }, { status: 500 });
    }

    const data = await request.json();
    console.log("[reservar-preservacao] received data:", JSON.stringify(data));

    if (!data.nome?.trim() || !data.email?.trim()) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta." },
        { status: 400 }
      );
    }

    // Rejeita datas com ano inválido (ex: 6 dígitos) antes de enviar ao Monday
    if (data.dataEvento) {
      const year = parseInt(data.dataEvento.split("-")[0], 10);
      if (isNaN(year) || year > 9999 || year < 1900) {
        return NextResponse.json({ error: "Data do evento inválida." }, { status: 400 });
      }
    }

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
        { error: "Erro ao registar no sistema.", detail: json.errors },
        { status: 500 }
      );
    }

    if (!json.data?.create_item?.id) {
      console.error("Monday unexpected response:", JSON.stringify(json, null, 2));
      return NextResponse.json(
        { error: "Resposta inesperada do sistema." },
        { status: 500 }
      );
    }

    // Notificação por e-mail (Resend). Falha silenciosamente se a chave não estiver configurada.
    if (process.env.RESEND_API_KEY) {
      const camposOmitidos = (v) => (!v || (Array.isArray(v) && !v.length)) ? "—" : v;
      const linhas = [
        `<tr><td><strong>Nome</strong></td><td>${data.nome}</td></tr>`,
        `<tr><td><strong>Meio de contacto</strong></td><td>${camposOmitidos(data.meioContacto)}</td></tr>`,
        `<tr><td><strong>E-mail</strong></td><td>${data.email}</td></tr>`,
        `<tr><td><strong>Telefone</strong></td><td>${camposOmitidos(data.telefone)}</td></tr>`,
        `<tr><td><strong>Data do evento</strong></td><td>${camposOmitidos(data.dataEvento)}</td></tr>`,
        `<tr><td><strong>Tipo de flores</strong></td><td>${camposOmitidos(data.tipoFlores)}</td></tr>`,
        `<tr><td><strong>Como enviar flores</strong></td><td>${camposOmitidos(data.comoEnviarFlores)}</td></tr>`,
        `<tr><td><strong>Como receber quadro</strong></td><td>${camposOmitidos(data.comoReceberQuadro)}</td></tr>`,
        `<tr><td><strong>Tamanho da moldura</strong></td><td>${camposOmitidos(data.tamanhoMoldura)}</td></tr>`,
        `<tr><td><strong>Tipo de fundo</strong></td><td>${camposOmitidos(data.tipoFundo)}</td></tr>`,
        `<tr><td><strong>Elementos extra</strong></td><td>${camposOmitidos(data.elementosExtra?.join(", "))}</td></tr>`,
        data.elementosExtraOutro ? `<tr><td><strong>Detalhe elemento extra</strong></td><td>${data.elementosExtraOutro}</td></tr>` : "",
        `<tr><td><strong>Quadros extra</strong></td><td>${camposOmitidos(data.quadrosExtra)}</td></tr>`,
        data.quantosQuadros ? `<tr><td><strong>Quantos quadros extra</strong></td><td>${data.quantosQuadros}</td></tr>` : "",
        `<tr><td><strong>Ornamentos de Natal</strong></td><td>${camposOmitidos(data.ornamentosNatal)}</td></tr>`,
        data.quantosOrnamentos ? `<tr><td><strong>Quantos ornamentos</strong></td><td>${data.quantosOrnamentos}</td></tr>` : "",
        `<tr><td><strong>Pendentes</strong></td><td>${camposOmitidos(data.pendentes)}</td></tr>`,
        data.quantosPendentes ? `<tr><td><strong>Quantos pendentes</strong></td><td>${data.quantosPendentes}</td></tr>` : "",
        `<tr><td><strong>Como conheceu</strong></td><td>${camposOmitidos(data.comoConheceu)}</td></tr>`,
        data.nomeFlorista ? `<tr><td><strong>Nome da florista</strong></td><td>${data.nomeFlorista}</td></tr>` : "",
        data.comoConheceuOutro ? `<tr><td><strong>Como conheceu (detalhe)</strong></td><td>${data.comoConheceuOutro}</td></tr>` : "",
        data.notasAdicionais ? `<tr><td><strong>Notas adicionais</strong></td><td>${data.notasAdicionais}</td></tr>` : "",
      ].filter(Boolean).join("\n");

      fetch("https://api.resend.com/emails", {
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
      }).catch((emailErr) => console.error("[reservar-preservacao] email error:", emailErr));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reservar preservacao route error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
