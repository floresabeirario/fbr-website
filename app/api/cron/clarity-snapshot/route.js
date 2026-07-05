// app/api/cron/clarity-snapshot/route.js
// ============================================================
// Chamado pelo Vercel Cron a cada ~3 dias.
// Vai buscar os dados dos últimos 3 dias ao Microsoft Clarity (API gratuita),
// guarda um "snapshot" cru no Supabase e apaga os snapshots com mais de 45 dias
// (auto-limpeza: os crus nunca se acumulam).
//
// O resumo mensal é compilado à parte, a partir destes snapshots.
//
// Protegido pela CRON_SECRET, tal como /api/cron/monitor-forms.
// Precisa das env vars: CLARITY_API_TOKEN, CRON_SECRET, SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY.
// ============================================================

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createFormsClient } from "@/app/_lib/supabase-server";
import { EMAIL } from "@/app/_lib/constants";
import {
  compileMonthly,
  renderMonthlyEmailHtml,
} from "@/app/_lib/analytics-compile.mjs";

export const maxDuration = 60;

const CLARITY_ENDPOINT =
  "https://www.clarity.ms/export-data/api/v1/project-live-insights";
// Cada dimensão dá uma repartição diferente das mesmas métricas.
const DIMENSIONS = ["URL", "Source", "Device"];
const RETENTION_DAYS = 45;

async function fetchClarity(token, dimension) {
  const url = new URL(CLARITY_ENDPOINT);
  url.searchParams.set("numOfDays", "3");
  if (dimension) url.searchParams.set("dimension1", dimension);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    const body = (await res.text()).slice(0, 200);
    throw new Error(`Clarity ${res.status}: ${body}`);
  }
  return res.json();
}

export async function GET() {
  // Só o Vercel Cron (ou nós, com a CRON_SECRET) pode disparar isto.
  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.CLARITY_API_TOKEN;
  if (!token) {
    console.error("[clarity-snapshot] CLARITY_API_TOKEN em falta");
    return NextResponse.json({ error: "CLARITY_API_TOKEN em falta" }, { status: 500 });
  }

  const supabase = createFormsClient();
  if (!supabase) {
    console.error("[clarity-snapshot] Supabase indisponível");
    return NextResponse.json({ error: "Supabase indisponível" }, { status: 500 });
  }

  // 1. Buscar ao Clarity: totais + repartição por dimensão. Em paralelo e
  //    resiliente — se uma dimensão falhar, guarda-se o erro e segue-se.
  const keys = ["overall", ...DIMENSIONS];
  const results = await Promise.all(
    keys.map((k) =>
      fetchClarity(token, k === "overall" ? null : k)
        .then((json) => [k, json])
        .catch((err) => {
          console.error(`[clarity-snapshot] falha (${k}):`, err.message);
          return [k, { error: err.message }];
        }),
    ),
  );
  const data = Object.fromEntries(results);

  // 2. Guardar o snapshot cru (sem interpretar o formato — robusto).
  const { error: insErr } = await supabase
    .from("analytics_snapshots")
    .insert({ source: "clarity", period_days: 3, data });
  if (insErr) {
    console.error("[clarity-snapshot] erro a inserir:", insErr.message);
    return NextResponse.json({ error: insErr.message }, { status: 500 });
  }

  // 3. Auto-limpeza: apagar snapshots crus com mais de RETENTION_DAYS dias.
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 86400000).toISOString();
  const { error: delErr } = await supabase
    .from("analytics_snapshots")
    .delete()
    .lt("captured_at", cutoff);
  if (delErr) console.error("[clarity-snapshot] erro a limpar antigos:", delErr.message);

  const capturedAt = new Date().toISOString();
  console.log("[clarity-snapshot] snapshot guardado:", capturedAt);

  // 4. Uma vez por mês, na primeira recolha do mês novo, compilar o
  //    relatório do mês anterior e enviá-lo por email. Nunca deixar isto
  //    partir a recolha — daí o try/catch.
  let monthly = null;
  try {
    monthly = await maybeCompilePreviousMonth(supabase);
  } catch (err) {
    console.error("[clarity-snapshot] falha na compilação mensal:", err.message);
  }

  return NextResponse.json({ ok: true, capturedAt, monthly });
}

// Nome do mês em português, ex.: "Julho de 2026".
function monthLabelPT(firstOfMonth) {
  const s = new Intl.DateTimeFormat("pt-PT", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(firstOfMonth);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Compila o relatório do MÊS ANTERIOR se ainda não estiver feito (a chave
// primária month+source garante que só acontece uma vez). Idempotente: nas
// recolhas seguintes do mesmo mês encontra a linha e sai.
async function maybeCompilePreviousMonth(supabase) {
  const now = new Date();
  const startPrev = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const startCurr = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const monthKey = startPrev.toISOString().slice(0, 10); // YYYY-MM-01

  const { data: existing, error: exErr } = await supabase
    .from("analytics_monthly")
    .select("month")
    .eq("month", monthKey)
    .eq("source", "clarity")
    .maybeSingle();
  if (exErr) throw new Error(exErr.message);
  if (existing) return { skipped: "ja-compilado", month: monthKey };

  const { data: snaps, error: snErr } = await supabase
    .from("analytics_snapshots")
    .select("data")
    .eq("source", "clarity")
    .gte("captured_at", startPrev.toISOString())
    .lt("captured_at", startCurr.toISOString());
  if (snErr) throw new Error(snErr.message);
  if (!snaps || snaps.length === 0) return { skipped: "sem-dados", month: monthKey };

  const summary = compileMonthly(snaps.map((s) => s.data));

  const { error: upErr } = await supabase
    .from("analytics_monthly")
    .upsert(
      { month: monthKey, source: "clarity", summary, compiled_at: new Date().toISOString() },
      { onConflict: "month,source" },
    );
  if (upErr) throw new Error(upErr.message);

  const label = monthLabelPT(startPrev);
  if (process.env.RESEND_API_KEY) {
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
          subject: `Relatório de tráfego do site — ${label}`,
          html: renderMonthlyEmailHtml(summary, label),
        }),
      });
      console.log("[clarity-snapshot] relatório mensal enviado:", label);
    } catch (mailErr) {
      // O resumo já está guardado; falha de email não é fatal.
      console.error("[clarity-snapshot] falha ao enviar relatório:", mailErr.message);
    }
  } else {
    console.warn("[clarity-snapshot] RESEND_API_KEY em falta — relatório guardado mas não enviado.");
  }

  return { compiled: monthKey, snapshots: snaps.length, emailed: !!process.env.RESEND_API_KEY };
}
