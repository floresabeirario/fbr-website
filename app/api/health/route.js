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
  // Chaves do Resend com permissão apenas de envio retornam 401 em todos os
  // endpoints de leitura, mesmo sendo válidas. Verificamos só a presença da
  // variável — se estiver configurada, a chave está em uso e os e-mails chegam.
  if (!process.env.RESEND_API_KEY)
    return { ok: false, reason: "RESEND_API_KEY não configurado" };

  return { ok: true };
}

export async function GET() {
  const [monday, resend] = await Promise.all([checkMonday(), checkResend()]);

  const ok = monday.ok && resend.ok;

  return NextResponse.json(
    { ok, monday, resend, checkedAt: new Date().toISOString() },
    { status: ok ? 200 : 503 }
  );
}
