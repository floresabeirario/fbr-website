// app/_lib/orcamento.js
// ============================================================
// Cálculo do orçamento de uma encomenda, num módulo PURO (sem imports
// de servidor) que corre nos dois sítios:
//
//   • no browser, dentro do formulário, para o "Resumo da sua encomenda"
//     se actualizar a cada escolha;
//   • na API (route.js), ao gravar a encomenda, para guardar em `orders`
//     o mesmo `budget` + `pricing_snapshot` que o cliente viu no ecrã.
//
// ⚠️ É um ESPELHO de `src/lib/pricing.ts` do fbr-admin
//    (computePricingSnapshot). As regras têm de ser as mesmas nos dois
//    repos, senão o cliente vê um valor no site e a Maria outro no admin.
//    O admin tem um teste de paridade que corre este ficheiro contra o
//    dele (website-pricing-contract.test.ts): ao mudar uma regra, mudar
//    nos dois e correr `npm run preflight` no admin.
//
// Entrada (enums da BD, iguais aos de `orders`):
//   service_type          'preservacao' | 'emoldurar_secas' | 'recriacao'
//   frame_size            '30x40' | '40x50' | '50x70' | 'nao_sei' | null
//   frame_background      'transparente' | 'preto' | 'branco' | 'fotografia'
//                         | 'cor' | 'voces_a_escolher' | 'nao_sei' | null
//   museum_glass          'sim' | 'nao' | 'nao_sei'
//   museum_glass_mini     'sim' | 'nao' | 'nao_sei'
//   extra_small_frames    'sim' | 'nao' | 'mais_info' | null  (+ _qty)
//   christmas_ornaments   idem (+ _qty)
//   necklace_pendants     idem (+ _qty)
//   pyramid_frame         boolean (nunca vem do site; fica false)
//
// Itens de preço: [{ category, key, label, price }] — as linhas de
// `pricing_items`, ou o equivalente construído a partir do mapa `precos`
// do site (ver itemsFromPrecos).
// ============================================================

import { PRICE_KEYS } from "./precos-valores.js";

// Tamanho de referência quando o cliente ainda não escolheu a moldura:
// a mais barata (30x40). O orçamento fica marcado `provisional`.
const PROVISIONAL_FRAME_SIZE = "30x40";

function findItem(items, category, key) {
  return items.find(
    (i) => (i.deleted_at ?? null) === null && i.category === category && i.key === key,
  );
}

/**
 * Espelho de computePricingSnapshot do admin. Devolve
 * { computed_at, total, lines, provisional? } ou null quando nem a
 * base 30x40 existe (tabela mal configurada).
 */
export function computePricingSnapshot(order, items) {
  const sizeUndecided =
    !order.frame_size ||
    order.frame_size === "voces_a_escolher" ||
    order.frame_size === "nao_sei";

  const effectiveSize = sizeUndecided ? PROVISIONAL_FRAME_SIZE : order.frame_size;
  const lines = [];

  // 1. Base por tamanho (as secas têm tabela própria: secas_30x40…)
  const baseKeyPrefix = order.service_type === "emoldurar_secas" ? "secas_" : "";
  const base = findItem(items, "base_frame", `${baseKeyPrefix}${effectiveSize}`);
  if (sizeUndecided && !base) return null;
  if (base) lines.push(line(base, 1));

  // 2. Suplemento de fundo. "fotografia" tem preço por tamanho
  //    (fotografia_<size>), com o genérico "fotografia" como fallback.
  if (order.frame_background) {
    let supp;
    if (order.frame_background === "fotografia") {
      supp =
        findItem(items, "background_supplement", `fotografia_${effectiveSize}`) ??
        findItem(items, "background_supplement", "fotografia");
    } else {
      supp = findItem(items, "background_supplement", order.frame_background);
    }
    if (supp) lines.push(line(supp, 1));
  }

  // 2b. Vidro museu do quadro principal, por tamanho. Só quando 'sim'.
  if (order.museum_glass === "sim") {
    const glass = findItem(items, "glass_supplement", `museum_glass_${effectiveSize}`);
    if (glass) lines.push(line(glass, 1));
  }

  // 3. Extras por unidade — só conta se 'sim' E qty > 0.
  const extras = [
    { key: "mini_frame",         flag: order.extra_small_frames,  qty: order.extra_small_frames_qty },
    { key: "christmas_ornament", flag: order.christmas_ornaments, qty: order.christmas_ornaments_qty },
    { key: "necklace_pendant",   flag: order.necklace_pendants,   qty: order.necklace_pendants_qty },
  ];
  for (const e of extras) {
    if (e.flag === "sim" && e.qty && e.qty > 0) {
      const item = findItem(items, "extra", e.key);
      if (item) lines.push(line(item, e.qty));
    }
  }

  const minis =
    order.extra_small_frames === "sim" &&
    order.extra_small_frames_qty &&
    order.extra_small_frames_qty > 0
      ? order.extra_small_frames_qty
      : 0;

  // 3b. Suplemento foto por mini (quando o fundo é fotografia).
  if (order.frame_background === "fotografia" && minis > 0) {
    const miniSupp = findItem(items, "background_supplement", "fotografia_mini");
    if (miniSupp && miniSupp.price > 0) lines.push(line(miniSupp, minis));
  }

  // 3c. Vidro museu nos minis — escolha própria, multiplica pela qty.
  if (order.museum_glass_mini === "sim" && minis > 0) {
    const miniGlass = findItem(items, "glass_supplement", "museum_glass_20x25");
    if (miniGlass && miniGlass.price > 0) lines.push(line(miniGlass, minis));
  }

  // 4. Moldura pirâmide (nunca vem do site; mantido pela paridade).
  if (order.pyramid_frame) {
    const pyr = findItem(items, "extra", "pyramid_frame");
    if (pyr) lines.push(line(pyr, 1));
  }

  const total = lines.reduce((s, l) => s + l.subtotal, 0);

  return {
    computed_at: new Date().toISOString(),
    total,
    lines,
    ...(sizeUndecided ? { provisional: true } : {}),
  };
}

function line(item, qty) {
  return {
    category: item.category,
    key: item.key,
    label: item.label,
    qty,
    unit_price: item.price,
    subtotal: item.price * qty,
  };
}

// ── Itens a partir do mapa `precos` do site ─────────────────────────
//
// Os componentes de cliente recebem os preços já formatados ("300",
// "12,50"). Este helper reconstrói a lista de itens que o cálculo
// espera, com números. Os fundos sem custo (transparente, preto, branco,
// cor, vocês a escolher, não sei) entram a 0 para o cálculo "considerar"
// o fundo tal como o admin faz.
//
// Etiquetas em PT: só servem de fallback na API quando a leitura da
// tabela falha (o formulário traduz pela `key`, não usa o label).
const LABELS_PT = {
  "base_frame:30x40": "Moldura 30x40",
  "base_frame:40x50": "Moldura 40x50",
  "base_frame:50x70": "Moldura 50x70",
  "base_frame:secas_30x40": "Moldura 30x40 (flores secas)",
  "base_frame:secas_40x50": "Moldura 40x50 (flores secas)",
  "base_frame:secas_50x70": "Moldura 50x70 (flores secas)",
  "extra:mini_frame": "Quadro extra pequeno",
  "extra:christmas_ornament": "Ornamento de Natal",
  "extra:necklace_pendant": "Pendente para colar",
  "glass_supplement:museum_glass_30x40": "Vidro museu UltraVue 30x40",
  "glass_supplement:museum_glass_40x50": "Vidro museu UltraVue 40x50",
  "glass_supplement:museum_glass_50x70": "Vidro museu UltraVue 50x70",
  "glass_supplement:museum_glass_20x25": "Vidro museu UltraVue 20x25 (mini)",
  "background_supplement:fotografia_30x40": "Fundo fotografia — 30x40",
  "background_supplement:fotografia_40x50": "Fundo fotografia — 40x50",
  "background_supplement:fotografia_50x70": "Fundo fotografia — 50x70",
  "background_supplement:fotografia_mini": "Suplemento fotografia · 20x25 mini",
};

const FUNDOS_SEM_CUSTO = ["transparente", "preto", "branco", "cor", "voces_a_escolher", "nao_sei"];

export function precoNumero(valor) {
  if (typeof valor === "number") return valor;
  const n = Number(String(valor ?? "").replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function itemsFromPrecos(precos) {
  const items = [];
  for (const [nome, [category, key]] of Object.entries(PRICE_KEYS)) {
    if (!(nome in precos)) continue;
    items.push({
      category,
      key,
      label: LABELS_PT[`${category}:${key}`] ?? key,
      price: precoNumero(precos[nome]),
      deleted_at: null,
    });
  }
  for (const key of FUNDOS_SEM_CUSTO) {
    items.push({ category: "background_supplement", key, label: `Fundo ${key}`, price: 0, deleted_at: null });
  }
  return items;
}

// ── Fases de pagamento ──────────────────────────────────────────────
//
// 30% na reserva, 40% quando as flores chegam, 30% antes da entrega.
// Arredonda cada fase ao cêntimo e ajusta a última para a soma bater
// certo com o total (evita 0,01€ perdidos em arredondamentos).
export const FASES_PAGAMENTO = [0.3, 0.4, 0.3];

export function fasesPagamento(total) {
  const cents = Math.round(total * 100);
  const first = Math.round(cents * FASES_PAGAMENTO[0]);
  const second = Math.round(cents * FASES_PAGAMENTO[1]);
  const third = cents - first - second;
  return [first, second, third].map((c) => c / 100);
}

// "745" → "745€" · "223.5" → "223,50€" (formato europeu do site).
export function formatEuro(n) {
  const v = Number(n) || 0;
  const inteiro = Math.abs(v - Math.round(v)) < 0.005;
  const txt = inteiro ? String(Math.round(v)) : v.toFixed(2).replace(".", ",");
  return `${txt}€`;
}

// ── Previsão de entrega ─────────────────────────────────────────────
//
// Preservação: cerca de 6 meses depois de as flores chegarem, que é
// poucos dias depois do evento. Devolve o mês/ano (como no site de
// acompanhamento, que também só mostra mês e ano) ou null sem data.
export function mesPrevisaoEntrega(dataEventoIso, meses = 6) {
  if (!dataEventoIso || !/^\d{4}-\d{2}-\d{2}$/.test(dataEventoIso)) return null;
  const [y, m] = dataEventoIso.split("-").map(Number);
  if (!y || !m) return null;
  // Dia 15 para não haver saltos de fuso horário ao formatar.
  return new Date(y, m - 1 + meses, 15);
}

export function formatMesAno(date, locale) {
  if (!date) return null;
  const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "pt-PT", {
    month: "long",
    year: "numeric",
  });
  return fmt.format(date);
}

// Evento a 6 ou mais meses de distância: a resposta pode demorar mais
// do que os 3 dias úteis habituais (prioridade a quem tem o evento mais
// perto). Usado para mostrar a salvaguarda só a quem ela se aplica.
export function eventoDistante(dataEventoIso, hoje = new Date(), meses = 6) {
  if (!dataEventoIso || !/^\d{4}-\d{2}-\d{2}$/.test(dataEventoIso)) return false;
  const [y, m, d] = dataEventoIso.split("-").map(Number);
  const evento = new Date(y, m - 1, d);
  const limite = new Date(hoje.getFullYear(), hoje.getMonth() + meses, hoje.getDate());
  return evento >= limite;
}
