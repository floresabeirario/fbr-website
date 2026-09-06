// app/_lib/precos-valores.js
// ============================================================
// Valores de fallback dos preços + mapa de chaves, num módulo PURO
// (sem imports).
//
// Está separado do `precos.js` de propósito: esse importa o cliente
// Supabase e é server-only. Os componentes de cliente (OpcoesClient,
// EmoldurarFloresSecasClient, ResumoEncomenda, …) precisam do fallback
// e do mapa de chaves, e se os importassem de `precos.js` arrastavam o
// SDK do Supabase para o bundle do browser. Num site mobile-first isso
// custa peso a quem menos o pode pagar.
//
// Último valor conhecido a 06/09/2026. Rede de segurança, não a fonte:
// a fonte é a tabela `pricing_items` (Finanças → Catálogo no admin).
// ============================================================

// Chave usada no site → (categoria, key) em pricing_items.
// ⚠️ Ao acrescentar um preço novo ao site: juntar a chave aqui E um valor
// a PRECOS_FALLBACK. Sem isso o site não o conhece. O teste de contrato
// do admin (website-pricing-contract.test.ts) confere que cada par existe
// mesmo na base de dados.
export const PRICE_KEYS = {
  quadro30x40: ["base_frame", "30x40"],
  quadro40x50: ["base_frame", "40x50"],
  quadro50x70: ["base_frame", "50x70"],
  mini20x25: ["extra", "mini_frame"],
  ornamento: ["extra", "christmas_ornament"],
  pendente: ["extra", "necklace_pendant"],

  secas30x40: ["base_frame", "secas_30x40"],
  secas40x50: ["base_frame", "secas_40x50"],
  secas50x70: ["base_frame", "secas_50x70"],

  vidro30x40: ["glass_supplement", "museum_glass_30x40"],
  vidro40x50: ["glass_supplement", "museum_glass_40x50"],
  vidro50x70: ["glass_supplement", "museum_glass_50x70"],
  vidro20x25: ["glass_supplement", "museum_glass_20x25"],

  // Suplemento do fundo fotografia (impressão profissional), por tamanho.
  // É o único fundo com custo para o cliente (decisão Maria 06/09/2026:
  // o fundo de cor custa mais à FBR, mas o cliente não paga esse custo).
  fotografia30x40: ["background_supplement", "fotografia_30x40"],
  fotografia40x50: ["background_supplement", "fotografia_40x50"],
  fotografia50x70: ["background_supplement", "fotografia_50x70"],
  fotografiaMini: ["background_supplement", "fotografia_mini"],
};

export const PRECOS_FALLBACK = {
  quadro30x40: "300",
  quadro40x50: "400",
  quadro50x70: "500",
  mini20x25: "90",
  ornamento: "35",
  pendente: "35",

  secas30x40: "200",
  secas40x50: "270",
  secas50x70: "360",

  vidro30x40: "45",
  vidro40x50: "65",
  vidro50x70: "115",
  vidro20x25: "20",

  fotografia30x40: "15",
  fotografia40x50: "25",
  fotografia50x70: "35",
  fotografiaMini: "0",
};
