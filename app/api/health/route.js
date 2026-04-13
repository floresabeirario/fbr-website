// app/api/health/route.js
// Verifica a conectividade com Monday.com e Resend.
// Chamado pelo cron do Vercel e pelo GitHub Actions a cada 15 dias.
// Não cria dados — apenas valida tokens e env vars.

import { NextResponse } from "next/server";

const MONDAY_API = "https://api.monday.com/v2";

// Valores de `valor` em messages/pt.json > reservar.elementosOpcoes.
// Têm de existir como labels na coluna dropdown_mkq0vepg do Monday.
// Se divergirem, submissões em EN voltam a causar erro 500.
const ELEMENTOS_OPCOES_VALORES = [
  "Não pretendo incluir extras",
  "Votos manuscritos",
  "Convite do casamento",
  "Fitas, tecidos ou rendas",
  "Fotografia",
  "Joia ou medalha",
  "Coleira de animal",
  "Cartas ou bilhetes",
  "Outro (especifique abaixo)",
];

async function checkMonday() {
  if (!process.env.MONDAY_API_TOKEN)
    return { ok: false, reason: "MONDAY_API_TOKEN não configurado" };
  if (!process.env.MONDAY_BOARD_ID_PRESERVACAO)
    return { ok: false, reason: "MONDAY_BOARD_ID_PRESERVACAO não configurado" };
  if (!process.env.MONDAY_BOARD_ID_VALE)
    return { ok: false, reason: "MONDAY_BOARD_ID_VALE não configurado" };

  try {
    const res = await fetch(MONDAY_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MONDAY_API_TOKEN}`,
        "Content-Type": "application/json",
        "API-Version": "2024-10",
      },
      body: JSON.stringify({ query: "{ me { id } }" }),
      signal: AbortSignal.timeout(8000),
    });

    const json = await res.json();

    if (json.data?.me?.id) return { ok: true };
    if (json.errors?.length)
      return { ok: false, reason: `Monday API: ${json.errors[0]?.message ?? "erro desconhecido"}` };

    return { ok: false, reason: "Monday API: resposta inesperada" };
  } catch (err) {
    return { ok: false, reason: `Monday API inacessível: ${err.message}` };
  }
}

async function checkMondayDropdowns() {
  if (!process.env.MONDAY_API_TOKEN || !process.env.MONDAY_BOARD_ID_PRESERVACAO)
    return { ok: false, reason: "Variáveis de ambiente do Monday não configuradas" };

  try {
    const res = await fetch(MONDAY_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MONDAY_API_TOKEN}`,
        "Content-Type": "application/json",
        "API-Version": "2024-10",
      },
      body: JSON.stringify({
        query: `{ boards(ids: [${process.env.MONDAY_BOARD_ID_PRESERVACAO}]) { columns(ids: ["dropdown_mkq0vepg"]) { settings_str } } }`,
      }),
      signal: AbortSignal.timeout(8000),
    });

    const json = await res.json();
    const settingsStr = json.data?.boards?.[0]?.columns?.[0]?.settings_str;

    if (!settingsStr)
      return { ok: false, reason: "Coluna dropdown_mkq0vepg não encontrada no board" };

    const settings = JSON.parse(settingsStr);
    const mondayLabels = (settings.labels ?? []).map((l) => l.name);

    const missing = ELEMENTOS_OPCOES_VALORES.filter((l) => !mondayLabels.includes(l));
    if (missing.length > 0)
      return { ok: false, reason: `Labels em falta no dropdown do Monday: ${missing.join("; ")}` };

    return { ok: true };
  } catch (err) {
    return { ok: false, reason: `Erro ao verificar dropdown: ${err.message}` };
  }
}

async function checkResend() {
  // Chaves do Resend com permissão apenas de envio retornam 401 em todos os
  // endpoints de leitura, mesmo sendo válidas. Verificamos só a presença da
  // variável — se estiver configurada, a chave está em uso e os e-mails chegam.
  if (!process.env.RESEND_API_KEY)
    return { ok: false, reason: "RESEND_API_KEY não configurado" };

  return { ok: true };
}

export async function GET() {
  const [monday, dropdown, resend] = await Promise.all([
    checkMonday(),
    checkMondayDropdowns(),
    checkResend(),
  ]);

  const ok = monday.ok && dropdown.ok && resend.ok;

  return NextResponse.json(
    { ok, monday, dropdown, resend, checkedAt: new Date().toISOString() },
    { status: ok ? 200 : 503 }
  );
}
