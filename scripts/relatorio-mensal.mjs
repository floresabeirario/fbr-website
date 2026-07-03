// scripts/relatorio-mensal.mjs
//
// Relatório mensal de tráfego do site, a partir da API do Umami Cloud.
// Gera um ficheiro Markdown pronto a ler (e a colar aqui ao Claude para análise).
//
// Uso:
//   node scripts/relatorio-mensal.mjs            -> mês passado completo
//   node scripts/relatorio-mensal.mjs 2026-06    -> um mês específico
//
// Variáveis de ambiente necessárias (lidas do ambiente ou do .env.local):
//   UMAMI_API_KEY     -> chave de API do Umami Cloud (conta > Settings > API keys)
//   UMAMI_WEBSITE_ID  -> ou NEXT_PUBLIC_UMAMI_WEBSITE_ID (o mesmo ID do site)
// Opcional:
//   UMAMI_API_BASE    -> por defeito https://api.umami.is/v1 (a API encaminha
//                        para a região da conta; para forçar EU: .../v1/eu)
//
// NOTA: as API keys do Umami Cloud exigem plano Pro. No plano grátis não há
// acesso por API, por isso este script só corre com uma conta Pro (ou self-host).
// Alternativa grátis: usar os "Email reports" do próprio Umami.

import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

// ─── Carregar .env.local (sem dependências) ──────────────────────────────────
async function loadEnvLocal() {
  try {
    const raw = await readFile(path.resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    // sem .env.local — segue com o ambiente real
  }
}
await loadEnvLocal();

const API_BASE = process.env.UMAMI_API_BASE || "https://api.umami.is/v1";
const API_KEY = process.env.UMAMI_API_KEY;
const WEBSITE_ID =
  process.env.UMAMI_WEBSITE_ID || process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

if (!API_KEY || !WEBSITE_ID) {
  console.error(
    "Faltam variáveis de ambiente.\n" +
      "  UMAMI_API_KEY     = " + (API_KEY ? "ok" : "EM FALTA") + "\n" +
      "  UMAMI_WEBSITE_ID  = " + (WEBSITE_ID ? "ok" : "EM FALTA") + "\n\n" +
      "Põe-as no .env.local ou no ambiente e volta a correr.",
  );
  process.exit(1);
}

// ─── Intervalo do mês (em milissegundos, UTC) ────────────────────────────────
function monthRange(arg) {
  const now = new Date();
  let year = now.getUTCFullYear();
  let month = now.getUTCMonth() - 1; // mês passado por defeito
  if (arg && /^\d{4}-\d{2}$/.test(arg)) {
    const [y, m] = arg.split("-").map(Number);
    year = y;
    month = m - 1;
  }
  if (month < 0) {
    month = 11;
    year -= 1;
  }
  const startAt = Date.UTC(year, month, 1, 0, 0, 0, 0);
  const endAt = Date.UTC(year, month + 1, 1, 0, 0, 0, 0) - 1;
  const label = `${year}-${String(month + 1).padStart(2, "0")}`;
  return { startAt, endAt, label };
}

async function api(pathname, params = {}) {
  const url = new URL(`${API_BASE}/websites/${WEBSITE_ID}${pathname}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, {
    headers: { "x-umami-api-key": API_KEY, accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Umami API ${res.status} em ${pathname}: ${await res.text()}`);
  }
  return res.json();
}

// ─── Formatação ──────────────────────────────────────────────────────────────
function pct(value, prev) {
  if (!prev) return value ? "novo" : "0%";
  const d = ((value - prev) / prev) * 100;
  const sinal = d >= 0 ? "+" : "";
  return `${sinal}${d.toFixed(0)}%`;
}
function dur(seconds) {
  const s = Math.round(seconds || 0);
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}
const isEN = (url) => url === "/en" || url.startsWith("/en/") || url.startsWith("/en?");

// ─── Recolha e escrita ───────────────────────────────────────────────────────
async function main() {
  const { startAt, endAt, label } = monthRange(process.argv[2]);
  const range = { startAt, endAt };

  const [stats, urls, referrers, events] = await Promise.all([
    api("/stats", range),
    api("/metrics", { ...range, type: "url", limit: 30 }),
    api("/metrics", { ...range, type: "referrer", limit: 10 }),
    api("/metrics", { ...range, type: "event", limit: 20 }),
  ]);

  const visitors = stats.visitors?.value ?? 0;
  const visits = stats.visits?.value ?? 0;
  const pageviews = stats.pageviews?.value ?? 0;
  const bounces = stats.bounces?.value ?? 0;
  const totaltime = stats.totaltime?.value ?? 0;
  const bounceRate = visits ? Math.round((bounces / visits) * 100) : 0;
  const avgTime = visits ? totaltime / visits : 0;

  // PT vs EN a partir das páginas vistas
  let ptViews = 0;
  let enViews = 0;
  for (const row of urls) (isEN(row.x) ? (enViews += row.y) : (ptViews += row.y));
  const totalViews = ptViews + enViews || 1;

  // Eventos por nome
  const evMap = Object.fromEntries(events.map((e) => [e.x, e.y]));
  const ev = (name) => evMap[name] ?? 0;

  // Conversão do formulário de reserva
  const formViews = urls
    .filter((r) => /\/reservar-preservacao|\/book-preservation/.test(r.x))
    .reduce((a, r) => a + r.y, 0);
  const reservasEnviadas = ev("reserva-enviada");
  const taxaConversao = formViews
    ? ((reservasEnviadas / formViews) * 100).toFixed(1) + "%"
    : "sem dados";

  const linha = (n, v) => `| ${n} | ${v} |`;
  const md = `# Relatório de tráfego — ${label}

> Site: floresabeirario.pt · Fonte: Umami · Período: mês ${label}
> (percentagens comparam com o mês anterior)

## Visão geral

| Métrica | Valor |
|---|---|
${linha("Visitantes únicos", `${visitors} (${pct(visitors, stats.visitors?.prev)})`)}
${linha("Visitas (sessões)", `${visits} (${pct(visits, stats.visits?.prev)})`)}
${linha("Páginas vistas", `${pageviews} (${pct(pageviews, stats.pageviews?.prev)})`)}
${linha("Taxa de rejeição", `${bounceRate}%`)}
${linha("Tempo médio por visita", dur(avgTime))}

## Tráfego por idioma do site

| Versão | Páginas vistas | Peso |
|---|---|---|
${linha("Português (/)", `${ptViews}`)} ${Math.round((ptViews / totalViews) * 100)}% |
${linha("Inglês (/en)", `${enViews}`)} ${Math.round((enViews / totalViews) * 100)}% |

## Ações dos visitantes (eventos)

| Ação | Nº |
|---|---|
${linha("Clique em 'Reservar'", ev("reservar"))}
${linha("Clique em WhatsApp", ev("whatsapp"))}
${linha("Clique no vale-oferta", ev("vale-oferta"))}
${linha("Clique em 'ver estado'", ev("ver-estado"))}
${linha("**Reservas enviadas** (conversão)", `**${reservasEnviadas}**`)}

**Conversão do formulário:** ${reservasEnviadas} reservas enviadas em ${formViews} visitas à página de reserva = **${taxaConversao}**.

## Páginas mais vistas

| Página | Vistas |
|---|---|
${urls.slice(0, 10).map((r) => linha(r.x, r.y)).join("\n")}

## De onde vêm (origens)

| Origem | Visitas |
|---|---|
${referrers.slice(0, 8).map((r) => linha(r.x || "(direto)", r.y)).join("\n")}

---
_Gerado automaticamente. Cola este relatório ao Claude e pede a análise do que está a funcionar e do que não está._
`;

  const outDir = path.resolve(process.cwd(), "relatorios");
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `relatorio-${label}.md`);
  await writeFile(outFile, md, "utf8");
  console.log(md);
  console.error(`\n✓ Guardado em ${outFile}`);
}

main().catch((err) => {
  console.error("Erro ao gerar o relatório:", err.message);
  process.exit(1);
});
