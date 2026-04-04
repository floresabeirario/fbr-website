// app/api/cron/monitor-forms/route.js
// Chamado pelo Vercel Cron de 15 em 15 dias (dias 1 e 16 de cada mês, 09:00 UTC).
// Corre o health check e envia e-mail de alerta se algo falhar.
// Protegido pela variável CRON_SECRET — o Vercel envia-a automaticamente.

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { EMAIL } from "@/app/_lib/constants";

export async function GET() {
  // Verificar que o pedido vem do Vercel Cron (ou de nós via CRON_SECRET)
  const headersList = await headers();
  const authHeader = headersList.get("authorization");

  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://floresabeirario.pt";

  let health;
  try {
    const res = await fetch(`${baseUrl}/api/health`, {
      signal: AbortSignal.timeout(15000),
    });
    health = await res.json();
  } catch (err) {
    console.error("[monitor-forms] Falha ao chamar /api/health:", err);
    health = {
      ok: false,
      monday: { ok: false, reason: "Não foi possível contactar /api/health" },
      resend: { ok: false, reason: "Não foi possível contactar /api/health" },
      checkedAt: new Date().toISOString(),
    };
  }

  if (health.ok) {
    console.log("[monitor-forms] Tudo OK:", health.checkedAt);
    return NextResponse.json({ ok: true, checkedAt: health.checkedAt });
  }

  // Algo falhou — enviar e-mail de alerta
  console.error("[monitor-forms] Falha detectada:", JSON.stringify(health));

  if (process.env.RESEND_API_KEY) {
    const problemas = [];
    if (!health.monday?.ok) problemas.push(`<li><strong>Monday.com</strong>: ${health.monday?.reason ?? "erro desconhecido"}</li>`);
    if (!health.resend?.ok) problemas.push(`<li><strong>Resend (e-mail)</strong>: ${health.resend?.reason ?? "erro desconhecido"}</li>`);

    const html = `
<h2 style="font-family:sans-serif;color:#c0392b;">Alerta: possível problema nos formulários</h2>
<p style="font-family:sans-serif;">A verificação automática de 15 em 15 dias detectou o seguinte:</p>
<ul style="font-family:sans-serif;color:#c0392b;line-height:1.8;">
  ${problemas.join("\n  ")}
</ul>
<p style="font-family:sans-serif;">
  Confirma os formulários em
  <a href="https://floresabeirario.pt/reservar-preservacao">Reservar Preservação</a>
  e <a href="https://floresabeirario.pt/oferecer-preservacao">Vale Presente</a>.
</p>
<p style="font-family:sans-serif;">
  Se o problema persistir, verifica as variáveis de ambiente no painel do Vercel
  e o estado da API do Monday.com.
</p>
<p style="font-family:sans-serif;color:#999;font-size:12px;">Verificação feita em: ${health.checkedAt}</p>
    `.trim();

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
          subject: "Alerta: formulários do site podem ter um problema",
          html,
        }),
      });
      console.log("[monitor-forms] E-mail de alerta enviado para", EMAIL);
    } catch (emailErr) {
      console.error("[monitor-forms] Falha ao enviar e-mail de alerta:", emailErr);
    }
  } else {
    console.warn("[monitor-forms] RESEND_API_KEY não configurado — não foi possível enviar alerta.");
  }

  // Retorna 200 para o Vercel não marcar o cron como falhado e tentar de novo
  return NextResponse.json({ ok: false, health });
}
