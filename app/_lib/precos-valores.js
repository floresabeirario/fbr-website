// app/_lib/precos-valores.js
// ============================================================
// Valores de fallback dos preços, num módulo PURO (sem imports).
//
// Está separado do `precos.js` de propósito: esse importa o cliente
// Supabase e é server-only. Os componentes de cliente (OpcoesClient,
// EmoldurarFloresSecasClient, …) precisam do fallback como valor por
// omissão das props, e se o importassem de `precos.js` arrastavam o SDK
// do Supabase para o bundle do browser. Num site mobile-first isso
// custa peso a quem menos o pode pagar.
//
// Último valor conhecido a 26/08/2026. Rede de segurança, não a fonte:
// a fonte é a tabela `pricing_items` (Finanças → Catálogo no admin).
// ============================================================

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
};
