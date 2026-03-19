// app/api/vale-presente/route.js
// Recebe os dados do formulário e cria um item no Monday.com via GraphQL.
// O token fica apenas no servidor — nunca exposto ao browser.

import { NextResponse } from "next/server";

const MONDAY_API = "https://api.monday.com/v2";

function buildColumnValues(data) {
  const cols = {};

  if (data.meioContacto)
    cols.single_select29teo39 = { label: data.meioContacto };

  if (data.telefone)
    cols.phoneofkl3pv1 = { phone: data.telefone, countryShortName: "PT" };

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

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("[vale-presente route] received data:", JSON.stringify(data));

    if (!data.nome?.trim() || !data.email?.trim()) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta." },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { error: "Resposta inesperada do sistema." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Vale presente route error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
