// app/_lib/precos.js
// Fonte única de verdade para os preços mostrados no site.
// Antes estavam espalhados por OpcoesClient e EmoldurarFloresSecasClient;
// quando um preço mudar, alterar APENAS aqui.
// NOTA: o meta title de Opções e Preços ("300€-500€") vive em messages/*.json
// e tem de ser actualizado à mão se estes valores mudarem.

// Preservação completa (flores frescas) — página Opções e Preços
export const PRECO_QUADRO_30x40 = "300";
export const PRECO_QUADRO_40x50 = "400";
export const PRECO_QUADRO_50x70 = "500";
export const PRECO_MINI_20x25   = "90";
export const PRECO_ORNAMENTO    = "35";
export const PRECO_PENDENTE     = "35";

// Emolduramento de flores já secas — página Emoldurar Flores Secas
export const PRECO_EMOLDURAR_30x40 = "200";
export const PRECO_EMOLDURAR_40x50 = "270";
export const PRECO_EMOLDURAR_50x70 = "360";
