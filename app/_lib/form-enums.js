// app/_lib/form-enums.js
// ============================================================
// Mapas "valor do formulário (PT)" → enum interno da base de dados,
// num módulo PURO (sem imports) que pode ir para o browser.
//
// Vivem aqui, e não em supabase-mappings.js (server-only), porque o
// resumo da encomenda no formulário precisa de saber o que cada escolha
// significa para calcular o orçamento ao vivo, com as MESMAS regras que
// a API usa ao gravar a encomenda. Um único mapa evita que o cliente veja
// um valor no site e a Maria outro no admin.
//
// Os ficheiros messages/pt.json e messages/en.json partilham o mesmo
// `valor` (em PT), só o `label` muda. Por isso é monolingue.
// ============================================================

export const COMO_ENVIAR_FLORES = {
  "Entrega em mãos em Coimbra":                                                                 "maos",
  "Envio por CTT/transportadora para o estúdio (custos a cargo do cliente)":                    "ctt",
  "Recolha no local por parte da Flores à Beira-Rio - mediante orçamento e disponibilidade":    "recolha_evento",
  "Ainda não sei":                                                                              "nao_sei",
};

export const COMO_RECEBER_QUADRO = {
  "Recolha em mãos em Coimbra":                                            "maos",
  "Envio por transportadora/CTT para morada (custos a cargo do cliente)":  "ctt",
  "Ainda não sei":                                                         "nao_sei",
};

export const TAMANHO_MOLDURA = {
  "30x40cm":         "30x40",
  "40x50cm":         "40x50",
  "50x70cm":         "50x70",
  "Ainda não sei":   "nao_sei",
};

export const TIPO_FUNDO = {
  "Transparente (vidro sobre vidro)":                  "transparente",
  "Preto":                                             "preto",
  "Branco":                                            "branco",
  "Fotografia (custo adicional da impressão profissional)": "fotografia",
  "Cor":                                               "cor",
  "Gostaria que fossem vocês a escolher":              "voces_a_escolher",
  "Ainda não sei":                                     "nao_sei",
};

// Vidro museu (mig 104 do admin). O estado 'incluido' NÃO existe aqui de
// propósito: é exclusivo das encomendas anteriores a 26/08/2026, que
// levaram o vidro dentro do preço-base. Um pedido novo só pode dizer
// sim/nao/nao_sei.
export const VIDRO_MUSEU = {
  "Sim, com vidro museu anti-UV":   "sim",
  "Não, vidro normal":              "nao",
  "Ainda não sei":                  "nao_sei",
};

export const SIM_NAO_INFO = {
  "Não, apenas o quadro principal":              "nao",
  "Sim, quero acrescentar quadros extra":        "sim",
  "Sim, gostaria de acrescentar ornamentos de natal": "sim",
  "Sim, gostaria de acrescentar pendentes":      "sim",
  "Gostava de receber mais informações":         "mais_info",
};

// ── Emoldurar Flores Secas ──────────────────────────────────
// A abordagem escolhida (as 3 opções da página do serviço + "não sei").
export const DRIED_APPROACH = {
  "Emoldurar o ramo original seco":         "ramo_original",
  "Recriar o ramo com flores frescas":      "recriacao",
  "Combinação das duas":                    "combinacao",
  "Não sei, prefiro aconselhamento":        "nao_sei",
};

export function lookupEnum(map, value) {
  if (!value) return null;
  return map[value] ?? null;
}
