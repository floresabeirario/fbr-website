// app/_lib/api-helpers.js
// Utilitários partilhados entre rotas de API (server-only).

// ─── Origens autorizadas a submeter aos formulários ──────────────────────────
// Bloqueia pedidos cross-site para impedir que outros domínios usem as nossas
// APIs como backend de spam. Os formulários do próprio site ficam autorizados
// porque a Origin coincide com SITE_URL (www.floresabeirario.pt) ou apex.
const ALLOWED_ORIGINS = new Set([
  "https://www.floresabeirario.pt",
  "https://floresabeirario.pt",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

// Permite previews do Vercel (https://*.vercel.app) e branches deploy.
function isVercelPreview(origin) {
  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
}

export function isAllowedOrigin(originHeader, refererHeader) {
  const origin = originHeader || (refererHeader ? new URL(refererHeader).origin : "");
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (isVercelPreview(origin)) return true;
  return false;
}

// ─── Segurança: escaping HTML ─────────────────────────────────────────────────
// Previne XSS no corpo de e-mails enviados via Resend.
export function escapeHtml(val) {
  return String(val ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ─── Rate limiting (best-effort, por instância serverless) ───────────────────
// Para rate limiting global em produção, usar Upstash Redis + @upstash/ratelimit.
export function createRateLimiter() {
  const _rl = new Map(); // ip → { count, resetAt }
  return function isRateLimited(ip) {
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
  };
}

// ─── Indicativos telefónicos → ISO 3166-1 alpha-2 ────────────────────────────
// Prefixos mais longos primeiro para evitar falsas correspondências (ex: +351 antes de +35).
export const PREFIX_TO_ISO = [
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

export function detectCountryShortName(phone) {
  const n = (phone || "").replace(/[\s\-\(\)]/g, "");
  for (const [prefix, iso] of PREFIX_TO_ISO) {
    if (n.startsWith(prefix)) return iso;
  }
  return "PT";
}

// ─── Validação de comprimento de campos de texto livre ────────────────────────
export function exceedsLength(data, maxLengths) {
  for (const [key, max] of Object.entries(maxLengths)) {
    if (typeof data[key] === "string" && data[key].length > max) return key;
  }
  return null;
}

// ─── Formatação de datas em PT por extenso ────────────────────────────────────
// Recebe ISO "YYYY-MM-DD" (do input HTML type=date) e devolve "8 de Junho de 2026".
// Pedido pela Maria — no email de pré-reserva o formato dd/MM/yyyy confundia-a.
const MONTHS_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function formatDatePT(isoDate) {
  if (!isoDate || typeof isoDate !== "string") return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate);
  if (!m) return isoDate; // se o formato não é o esperado, devolve original
  const [, y, mo, d] = m;
  const monthIdx = parseInt(mo, 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return isoDate;
  return `${parseInt(d, 10)} de ${MONTHS_PT[monthIdx]} de ${y}`;
}
