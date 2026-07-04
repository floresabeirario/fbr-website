// app/_lib/turnstile.js
// ============================================================
// Verificação opcional do Cloudflare Turnstile (anti-spam).
// Activa-se automaticamente quando a env var TURNSTILE_SECRET
// estiver definida; caso contrário, este módulo deixa passar
// tudo (no-op). Permite implementar o widget no front-end sem
// quebrar deploys que ainda não tenham Turnstile configurado.
//
// Server-only.
// ============================================================

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Devolve `true` se o token Turnstile for válido OU se Turnstile não
 * estiver configurado (sem TURNSTILE_SECRET). Devolve `false` quando
 * a verificação falha.
 *
 * @param {string|undefined} token — valor do `cf-turnstile-response`
 * @param {string|undefined} ip    — IP do cliente para validação remota
 */
export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    // Sem secret: em produção NÃO deixamos passar (fail-closed) — um form
    // sem anti-bot é pior do que um form em baixo, e apanha logo o caso de
    // a env var desaparecer num redeploy. Em desenvolvimento local deixa
    // passar, para não obrigar a configurar Turnstile na máquina.
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] TURNSTILE_SECRET em falta em produção — submissão rejeitada");
      return false;
    }
    return true;
  }

  if (!token) return false;

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);
  if (ip) params.append("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const json = await res.json();
    return json?.success === true;
  } catch (err) {
    console.error("[turnstile] verify failed:", err);
    return false;
  }
}

export function turnstileEnabled() {
  return Boolean(process.env.TURNSTILE_SECRET);
}
