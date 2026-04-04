// app/api/health/route.js
// Verifica a conectividade com Monday.com e Resend.
// Chamado pelo cron do Vercel e pelo GitHub Actions a cada 15 dias.
// Não cria dados — apenas valida tokens e env vars.

import { NextResponse } from "next/server";

const MONDAY_API = "https://api.monday.com/v2";

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

async function checkResend() {
  if (!process.env.RESEND_API_KEY)
    return { ok: false, reason: "RESEND_API_KEY não configurado" };

  // Verificamos apenas se a chave está presente e a API está acessível.
  // Não chamamos /domains porque chaves com permissão apenas de envio retornam 401
  // nesse endpoint mesmo sendo válidas — o que causaria um falso negativo.
  try {
    const res = await fetch("https://api.resend.com/emails", {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      signal: AbortSignal.timeout(8000),
    });

    // 401 = chave mesmo inválida. Qualquer outro código = API acessível e chave reconhecida.
    if (res.status === 401)
      return { ok: false, reason: "RESEND_API_KEY inválida (401)" };

    return { ok: true };
  } catch (err) {
    return { ok: false, reason: `Resend API inacessível: ${err.message}` };
  }
}

export async function GET() {
  const [monday, resend] = await Promise.all([checkMonday(), checkResend()]);

  const ok = monday.ok && resend.ok;

  return NextResponse.json(
    { ok, monday, resend, checkedAt: new Date().toISOString() },
    { status: ok ? 200 : 503 }
  );
}
