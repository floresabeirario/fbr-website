// Helper para construir links de WhatsApp (wa.me) com o texto pré-escrito
// no idioma da página. Antes os textos estavam fixos em PT (constants.js),
// por isso no site EN o botão de WhatsApp abria com a mensagem em português.
//
// Função pura (sem hook) — recebe o `locale` que os componentes já têm via
// useLocale(), por isso só é preciso trocar o import e a utilização.

import { WA_NUMBER } from "./constants";

const WA_MESSAGES = {
  pt: {
    geral:     "Olá! Gostaria de saber mais sobre a preservação das minhas flores.",
    noiva:     "Olá! Vou casar em breve e gostaria de reservar a preservação do meu bouquet.",
    recriacao: "Olá! Gostaria de saber mais sobre a recriação do meu bouquet.",
    vale:      "Olá! Gostaria de saber mais sobre o vale oferta de preservação de flores.",
    luto:      "Olá! Gostaria de preservar flores de uma cerimónia de homenagem.",
    urgente:   "Olá! O meu evento já passou e gostaria de preservar as flores. Ainda vou a tempo?",
    duvida:    "Olá! Tenho uma dúvida sobre a preservação das minhas flores.",
  },
  en: {
    geral:     "Hello! I'd like to know more about preserving my flowers.",
    noiva:     "Hello! I'm getting married soon and would like to book the preservation of my bouquet.",
    recriacao: "Hello! I'd like to know more about recreating my bouquet.",
    vale:      "Hello! I'd like to know more about the flower preservation gift voucher.",
    luto:      "Hello! I'd like to preserve flowers from a memorial ceremony.",
    urgente:   "Hello! My event has already taken place and I'd like to preserve the flowers. Is there still time?",
    duvida:    "Hello! I have a question about preserving my flowers.",
  },
};

export function waUrl(locale, variant = "geral") {
  const m = WA_MESSAGES[locale] ?? WA_MESSAGES.pt;
  const text = m[variant] ?? m.geral;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
