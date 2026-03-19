// app/api/reservar-preservacao/route.js
// Recebe os dados do formulário de reserva de preservação e cria um item no Monday.com via GraphQL.
// O token fica apenas no servidor — nunca exposto ao browser.

import { NextResponse } from "next/server";

const MONDAY_API = "https://api.monday.com/v2";

function buildColumnValues(data) {
  const cols = {};

  if (data.meioContacto)
    cols.color_mks92sp9 = { label: data.meioContacto };

  if (data.email)
    cols.email_mkq0dm3f = { email: data.email, text: data.email };

  if (data.telefone)
    cols.phone_mkq0xfnm = { phone: data.telefone, countryShortName: "PT" };

  if (data.dataEvento)
    cols.date_mkpzn3z3 = { date: data.dataEvento };

  if (data.tipoFlores)
    cols.long_text_mkq0e33x = { text: data.tipoFlores };

  if (data.comoEnviarFlores)
    cols.color_mkq04a2f = { label: data.comoEnviarFlores };

  if (data.comoReceberQuadro)
    cols.color_mkq066bs = { label: data.comoReceberQuadro };

  if (data.tamanhoMoldura)
    cols.color_mkq09fxw = { label: data.tamanhoMoldura };

  if (data.tipoFundo)
    cols.color_mkq0xxf4 = { label: data.tipoFundo };

  if (data.elementosExtra?.length)
    cols.dropdown_mkq0vepg = { labels: data.elementosExtra };

  if (data.quadrosExtra)
    cols.single_selectif561xw = { label: data.quadrosExtra };

  if (data.quantosQuadros)
    cols.long_textnvi49n07 = { text: data.quantosQuadros };

  if (data.ornamentosNatal)
    cols.single_select634naka = { label: data.ornamentosNatal };

  if (data.quantosOrnamentos)
    cols.text_mm1kx2jh = data.quantosOrnamentos;

  if (data.pendentes)
    cols.color_mm1kz8vz = { label: data.pendentes };

  if (data.quantosPendentes)
    cols.text_mm1k610f = data.quantosPendentes;

  if (data.comoConheceu)
    cols.color_mkq0n7rp = { label: data.comoConheceu };

  if (data.comoConheceuOutro)
    cols.long_text_mkq0qwqs = { text: data.comoConheceuOutro };

  if (data.nomeFlorista)
    cols.long_textyoq9dh7s = { text: data.nomeFlorista };

  // Notas adicionais — inclui especificação de elemento extra "Outro", se preenchida
  const partes = [
    data.elementosExtraOutro
      ? `Elemento extra - Outro: ${data.elementosExtraOutro}`
      : "",
    data.notasAdicionais || "",
  ].filter(Boolean);

  if (partes.length)
    cols.long_text_mkq0z9d = { text: partes.join("\n\n") };

  return cols;
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("[reservar-preservacao] received data:", JSON.stringify(data));

    if (!data.nome?.trim() || !data.email?.trim()) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta." },
        { status: 400 }
      );
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reservar preservacao route error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
