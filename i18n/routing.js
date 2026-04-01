import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // PT has no prefix (/), EN has prefix (/en/...)
  localePrefix: "as-needed",

  pathnames: {
    "/": "/",
    "/preservacao-de-flores": {
      pt: "/preservacao-de-flores",
      en: "/flower-preservation",
    },
    "/opcoes-e-precos": {
      pt: "/opcoes-e-precos",
      en: "/pricing-options",
    },
    "/como-funciona": {
      pt: "/como-funciona",
      en: "/how-it-works",
    },
    "/momentos-especiais": {
      pt: "/momentos-especiais",
      en: "/special-moments",
    },
    "/preservar-bouquet-noiva": {
      pt: "/preservar-bouquet-noiva",
      en: "/preserve-wedding-bouquet",
    },
    "/preservar-flores-luto-homenagem": {
      pt: "/preservar-flores-luto-homenagem",
      en: "/preserve-memorial-flowers",
    },
    "/preservar-flores-batizado-nascimento": {
      pt: "/preservar-flores-batizado-nascimento",
      en: "/preserve-baptism-flowers",
    },
    "/preservar-flores-aniversario": {
      pt: "/preservar-flores-aniversario",
      en: "/preserve-anniversary-flowers",
    },
    "/preservar-flores-pedido-casamento": {
      pt: "/preservar-flores-pedido-casamento",
      en: "/preserve-proposal-flowers",
    },
    "/emoldurar-flores-secas": {
      pt: "/emoldurar-flores-secas",
      en: "/frame-dried-flowers",
    },
    "/recriacao": {
      pt: "/recriacao",
      en: "/bouquet-recreation",
    },
    "/oferecer-preservacao": {
      pt: "/oferecer-preservacao",
      en: "/gift-preservation",
    },
    "/sustentabilidade": {
      pt: "/sustentabilidade",
      en: "/sustainability",
    },
    "/reservar-preservacao": {
      pt: "/reservar-preservacao",
      en: "/book-preservation",
    },
    "/vale-presente": {
      pt: "/vale-presente",
      en: "/gift-voucher",
    },
    "/perguntas-frequentes": {
      pt: "/perguntas-frequentes",
      en: "/faq",
    },
    "/contactos": {
      pt: "/contactos",
      en: "/contact",
    },
    "/blog": {
      pt: "/blog",
      en: "/blog",
    },
    "/blog/[slug]": {
      pt: "/blog/[slug]",
      en: "/blog/[slug]",
    },
    "/politica-de-privacidade": {
      pt: "/politica-de-privacidade",
      en: "/privacy-policy",
    },
    "/termos-e-condicoes": {
      pt: "/termos-e-condicoes",
      en: "/terms-and-conditions",
    },
  },
});
