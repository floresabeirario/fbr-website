// app/_lib/analytics-compile.mjs
// ============================================================
// Compilação do relatório mensal de tráfego (Microsoft Clarity).
//
// O cron `clarity-snapshot` guarda, de 3 em 3 dias, um snapshot cru da
// API do Clarity em `analytics_snapshots.data`. Este módulo é PURO (sem
// IO): recebe os `data` de todos os snapshots de um mês e devolve um
// resumo compacto + o HTML do email. O envio e a gravação vivem no cron.
//
// Formato do Clarity (project-live-insights): cada `data` é um objecto
// com as dimensões pedidas — "overall", "URL", "Source", "Device". Cada
// dimensão é um array de métricas { metricName, information: [...] }.
// As métricas relevantes: Traffic, EngagementTime, ScrollDepth, e os
// sinais de fricção (DeadClickCount, RageClickCount, QuickbackClick,
// ScriptErrorCount, ErrorClickCount, ExcessiveScroll). O bloco "overall"
// traz ainda Country, ReferrerUrl e PopularPages.
//
// Nota de honestidade dos números: cada snapshot cobre uma janela de ~3
// dias. Contagens (sessões, cliques) SOMAM-SE ao longo do mês. Médias
// (scroll, tempo) são ponderadas pelo nº de sessões de cada janela.
// "Visitantes" é a soma dos utilizadores distintos por janela, por isso
// sobre-conta quem voltou — é aproximado (marcado como tal no email).
// ============================================================

const FRICTION_METRICS = [
  "DeadClickCount",
  "RageClickCount",
  "QuickbackClick",
  "ScriptErrorCount",
  "ErrorClickCount",
  "ExcessiveScroll",
];

// Um número a partir de string ou número; qualquer lixo vira 0.
function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// A lista `information` de uma métrica dentro de um bloco de dimensão.
// Robusto: se o bloco falhou (guardámos { error }) ou falta a métrica,
// devolve [].
function metricInfo(block, metricName) {
  if (!Array.isArray(block)) return [];
  const m = block.find((x) => x && x.metricName === metricName);
  return m && Array.isArray(m.information) ? m.information : [];
}

// Primeira linha de uma métrica "overall" (só tem uma entrada agregada).
function overallRow(block, metricName) {
  return metricInfo(block, metricName)[0] ?? null;
}

// Tira o https://dominio e deixa só o caminho, para caber e ler bem.
function pathOf(url) {
  if (typeof url !== "string") return "";
  const m = /^https?:\/\/[^/]+(\/.*)?$/.exec(url);
  const path = m ? m[1] || "/" : url;
  return path;
}

// Uma página conta como inglesa se o caminho começa por /en.
function isEnglish(path) {
  return path === "/en" || path.startsWith("/en/");
}

// Referrer → etiqueta curta. null/"" = acesso directo.
function referrerLabel(name) {
  if (name == null || name === "") return "Directo";
  try {
    return new URL(name).hostname.replace(/^www\./, "");
  } catch {
    return String(name);
  }
}

// Acumula pares { chave → soma } a partir de uma lista de information.
function accumulate(target, list, keyField, valueField) {
  for (const row of list) {
    if (!row) continue;
    const key = row[keyField];
    if (key == null) {
      // Só ignoramos a chave nula quando ela não é significativa; para
      // referrers a chave nula É significativa (directo) e é tratada antes.
      continue;
    }
    target.set(key, (target.get(key) ?? 0) + num(row[valueField]));
  }
}

/**
 * Compila os snapshots de um mês num resumo.
 * @param {object[]} snapshots — valores da coluna `data` (cada um o JSON cru
 *   do Clarity). Aceita entradas nulas/estragadas sem rebentar.
 * @returns {object} resumo pronto a guardar em analytics_monthly.summary.
 */
export function compileMonthly(snapshots) {
  const clean = Array.isArray(snapshots) ? snapshots.filter(Boolean) : [];

  let sessoes = 0;
  let bots = 0;
  let visitantes = 0;

  // Médias ponderadas: acumulamos soma(valor*peso) e soma(peso).
  let scrollW = 0;
  let scrollWsum = 0;
  let tempoTotalW = 0;
  let tempoAtivoW = 0;
  let tempoWsum = 0;

  const friccao = Object.fromEntries(FRICTION_METRICS.map((m) => [m, 0]));

  const paginas = new Map(); // caminho → visitas
  const paises = new Map(); // país → sessões
  const origens = new Map(); // referrer label → sessões
  const dispositivos = new Map(); // Mobile/PC → sessões
  let origemDirecto = 0; // referrer nulo (tratado à parte)

  for (const data of clean) {
    const overall = data?.overall;

    // ── Tráfego (agregado) ──
    const traffic = overallRow(overall, "Traffic");
    const janelaSessoes = traffic ? num(traffic.totalSessionCount) : 0;
    if (traffic) {
      sessoes += num(traffic.totalSessionCount);
      bots += num(traffic.totalBotSessionCount);
      visitantes += num(traffic.distinctUserCount);
    }

    // ── Scroll médio (ponderado pelas sessões da janela) ──
    const scroll = overallRow(overall, "ScrollDepth");
    if (scroll && janelaSessoes > 0) {
      scrollW += num(scroll.averageScrollDepth) * janelaSessoes;
      scrollWsum += janelaSessoes;
    }

    // ── Tempo de envolvimento (ponderado pelas sessões) ──
    const eng = overallRow(overall, "EngagementTime");
    if (eng && janelaSessoes > 0) {
      tempoTotalW += num(eng.totalTime) * janelaSessoes;
      tempoAtivoW += num(eng.activeTime) * janelaSessoes;
      tempoWsum += janelaSessoes;
    }

    // ── Sinais de fricção (somam) ──
    for (const metric of FRICTION_METRICS) {
      const row = overallRow(overall, metric);
      if (row) friccao[metric] += num(row.subTotal);
    }

    // ── Repartições ──
    accumulate(paginas, metricInfo(overall, "PopularPages"), "url", "visitsCount");
    accumulate(paises, metricInfo(overall, "Country"), "name", "sessionsCount");
    accumulate(dispositivos, metricInfo(overall, "Device"), "name", "sessionsCount");

    // Origens: a chave nula = directo, por isso trata-se à mão.
    for (const row of metricInfo(overall, "ReferrerUrl")) {
      if (!row) continue;
      const n = num(row.sessionsCount);
      if (row.name == null || row.name === "") origemDirecto += n;
      else origens.set(referrerLabel(row.name), (origens.get(referrerLabel(row.name)) ?? 0) + n);
    }
  }

  if (origemDirecto > 0) origens.set("Directo", (origens.get("Directo") ?? 0) + origemDirecto);

  // Top páginas por visitas, separadas PT / EN.
  const paginasArr = [...paginas.entries()]
    .map(([url, visitas]) => ({ url: pathOf(url), visitas }))
    .sort((a, b) => b.visitas - a.visitas);

  const rank = (m, n = 6) =>
    [...m.entries()].map(([nome, sessoes]) => ({ nome, sessoes })).sort((a, b) => b.sessoes - a.sessoes).slice(0, n);

  return {
    snapshots: clean.length,
    sessoes,
    bots,
    visitantes,
    scrollMedio: scrollWsum > 0 ? Math.round((scrollW / scrollWsum) * 10) / 10 : null,
    tempoTotalMedio: tempoWsum > 0 ? Math.round(tempoTotalW / tempoWsum) : null,
    tempoAtivoMedio: tempoWsum > 0 ? Math.round(tempoAtivoW / tempoWsum) : null,
    friccao: {
      deadClicks: friccao.DeadClickCount,
      rageClicks: friccao.RageClickCount,
      quickbacks: friccao.QuickbackClick,
      scriptErrors: friccao.ScriptErrorCount,
      errorClicks: friccao.ErrorClickCount,
      excessiveScroll: friccao.ExcessiveScroll,
    },
    dispositivos: rank(dispositivos, 5),
    paises: rank(paises, 6),
    origens: rank(origens, 6),
    topPaginasPT: paginasArr.filter((p) => !isEnglish(p.url)).slice(0, 6),
    topPaginasEN: paginasArr.filter((p) => isEnglish(p.url)).slice(0, 6),
  };
}

// ── Formatação para o email ─────────────────────────────────

// segundos → "1m 14s" (ou "44s"). null → "—".
function fmtSecs(s) {
  if (s == null) return "—";
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r ? `${m}m ${r}s` : `${m}m`;
}

function fmtPct(v) {
  return v == null ? "—" : `${String(v).replace(".", ",")}%`;
}

// Escapa texto para HTML (nomes de páginas/países vêm de fora).
function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function listRows(items, label) {
  if (!items || items.length === 0) {
    return `<tr><td style="padding:4px 0;color:#999;">Sem dados</td><td></td></tr>`;
  }
  return items
    .map(
      (it) =>
        `<tr><td style="padding:4px 8px 4px 0;">${esc(it.nome ?? it.url)}</td>` +
        `<td style="padding:4px 0;text-align:right;font-variant-numeric:tabular-nums;">${it.sessoes ?? it.visitas}</td></tr>`,
    )
    .join("");
}

const friccaoLabels = {
  deadClicks: "Cliques mortos (em zonas que não reagem)",
  rageClicks: "Cliques de frustração (repetidos)",
  quickbacks: "Saídas rápidas (voltar logo atrás)",
  scriptErrors: "Erros de script",
  errorClicks: "Cliques em elementos com erro",
  excessiveScroll: "Scroll excessivo (à procura de algo)",
};

/**
 * Gera o HTML do email do relatório mensal.
 * @param {object} summary — saída de compileMonthly.
 * @param {string} monthLabel — ex.: "Julho de 2026".
 */
export function renderMonthlyEmailHtml(summary, monthLabel) {
  const s = summary;
  const humanas = s.sessoes;

  const friccaoItens = Object.entries(s.friccao).filter(([, v]) => v > 0);
  const friccaoBloco =
    friccaoItens.length === 0
      ? `<p style="margin:6px 0;color:#2e7d32;">Sem problemas de usabilidade detectados este mês. 🌿</p>`
      : `<table style="width:100%;border-collapse:collapse;font-size:14px;">${friccaoItens
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 8px 4px 0;">${esc(friccaoLabels[k] ?? k)}</td>` +
              `<td style="padding:4px 0;text-align:right;font-variant-numeric:tabular-nums;">${v}</td></tr>`,
          )
          .join("")}</table>`;

  const box = "background:#faf7f2;border-radius:10px;padding:14px 16px;margin:0 0 14px;";
  const h3 = "font-family:sans-serif;font-size:15px;color:#7a5c3e;margin:0 0 8px;";

  return `
<div style="font-family:sans-serif;color:#333;max-width:560px;margin:0 auto;line-height:1.5;">
  <h2 style="font-size:20px;color:#7a5c3e;margin:0 0 4px;">Relatório de tráfego do site</h2>
  <p style="margin:0 0 16px;color:#666;">${esc(monthLabel)} · fonte: Microsoft Clarity</p>

  <div style="${box}">
    <table style="width:100%;border-collapse:collapse;font-size:15px;">
      <tr><td style="padding:6px 8px 6px 0;">Sessões (pessoas)</td><td style="padding:6px 0;text-align:right;font-weight:bold;font-variant-numeric:tabular-nums;">${humanas}</td></tr>
      <tr><td style="padding:6px 8px 6px 0;">Visitantes <span style="color:#999;">(aprox.)</span></td><td style="padding:6px 0;text-align:right;font-variant-numeric:tabular-nums;">${s.visitantes}</td></tr>
      <tr><td style="padding:6px 8px 6px 0;">Sessões de bots</td><td style="padding:6px 0;text-align:right;color:#999;font-variant-numeric:tabular-nums;">${s.bots}</td></tr>
      <tr><td style="padding:6px 8px 6px 0;">Scroll médio</td><td style="padding:6px 0;text-align:right;font-variant-numeric:tabular-nums;">${fmtPct(s.scrollMedio)}</td></tr>
      <tr><td style="padding:6px 8px 6px 0;">Tempo activo médio / sessão</td><td style="padding:6px 0;text-align:right;font-variant-numeric:tabular-nums;">${fmtSecs(s.tempoAtivoMedio)}</td></tr>
    </table>
  </div>

  <div style="${box}">
    <h3 style="${h3}">Páginas mais vistas (PT)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${listRows(s.topPaginasPT)}</table>
  </div>

  <div style="${box}">
    <h3 style="${h3}">Páginas mais vistas (EN)</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${listRows(s.topPaginasEN)}</table>
  </div>

  <div style="${box}">
    <h3 style="${h3}">Dispositivo</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${listRows(s.dispositivos)}</table>
  </div>

  <div style="${box}">
    <h3 style="${h3}">Origem do tráfego</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${listRows(s.origens)}</table>
  </div>

  <div style="${box}">
    <h3 style="${h3}">Países</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${listRows(s.paises)}</table>
  </div>

  <div style="${box}">
    <h3 style="${h3}">Sinais de usabilidade</h3>
    ${friccaoBloco}
  </div>

  <p style="font-size:12px;color:#999;margin:16px 0 0;">
    Compilado de ${s.snapshots} recolha(s) automática(s) de 3 em 3 dias. Os números de
    visitas do Umami não entram aqui (a API do Umami é paga) — para esses, vê o painel do Umami.
  </p>
</div>`.trim();
}
