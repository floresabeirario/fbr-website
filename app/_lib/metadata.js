// app/_lib/metadata.js
// Helpers para construir openGraph, twitter card e alternates i18n

import { SITE_URL } from "./constants";

const SITE_NAME = "Flores à Beira-Rio";

// Slug map: pathname key → { pt, en } paths (without SITE_URL)
const SLUG_MAP = {
  "/":                                    { pt: "/",                                     en: "/en" },
  "/preservacao-de-flores":               { pt: "/preservacao-de-flores",                en: "/en/flower-preservation" },
  "/opcoes-e-precos":                     { pt: "/opcoes-e-precos",                      en: "/en/options-and-pricing" },
  "/como-funciona":                       { pt: "/como-funciona",                        en: "/en/how-it-works" },
  "/momentos-especiais":                  { pt: "/momentos-especiais",                   en: "/en/special-moments" },
  "/preservar-bouquet-noiva":             { pt: "/preservar-bouquet-noiva",              en: "/en/preserve-wedding-bouquet" },
  "/preservar-flores-luto-homenagem":     { pt: "/preservar-flores-luto-homenagem",      en: "/en/preserve-memorial-flowers" },
  "/preservar-flores-batizado-nascimento":{ pt: "/preservar-flores-batizado-nascimento", en: "/en/preserve-baptism-flowers" },
  "/preservar-flores-aniversario":        { pt: "/preservar-flores-aniversario",         en: "/en/preserve-anniversary-flowers" },
  "/preservar-flores-pedido-casamento":   { pt: "/preservar-flores-pedido-casamento",    en: "/en/preserve-proposal-flowers" },
  "/emoldurar-flores-secas":              { pt: "/emoldurar-flores-secas",               en: "/en/frame-dried-flowers" },
  "/recriacao":                           { pt: "/recriacao",                            en: "/en/bouquet-recreation" },
  "/oferecer-preservacao":                { pt: "/oferecer-preservacao",                 en: "/en/gift-preservation" },
  "/sustentabilidade":                    { pt: "/sustentabilidade",                     en: "/en/sustainability" },
  "/reservar-preservacao":                { pt: "/reservar-preservacao",                 en: "/en/book-preservation" },
  "/vale-presente":                       { pt: "/vale-presente",                        en: "/en/gift-voucher" },
  "/perguntas-frequentes":                { pt: "/perguntas-frequentes",                 en: "/en/faq" },
  "/contactos":                           { pt: "/contactos",                            en: "/en/contact" },
  "/blog":                                { pt: "/blog",                                 en: "/en/blog" },
  "/politica-de-privacidade":             { pt: "/politica-de-privacidade",              en: "/en/privacy-policy" },
  "/termos-e-condicoes":                  { pt: "/termos-e-condicoes",                   en: "/en/terms-and-conditions" },
};

/**
 * Builds hreflang alternates for a given pathname key.
 * pathnameKey: e.g. "/preservacao-de-flores"
 * locale: "pt" or "en". Each locale's page must canonicalize to itself,
 * otherwise Google treats EN pages as duplicates of PT and refuses to index them.
 */
export function buildAlternates(pathnameKey, locale = "pt") {
  const paths = SLUG_MAP[pathnameKey];
  if (!paths) return {};
  const selfPath = locale === "en" ? paths.en : paths.pt;
  return {
    canonical: `${SITE_URL}${selfPath}`,
    languages: {
      "pt-PT":    `${SITE_URL}${paths.pt}`,
      "en":       `${SITE_URL}${paths.en}`,
      "x-default":`${SITE_URL}${paths.pt}`,
    },
  };
}

/**
 * Builds hreflang alternates for blog articles.
 * Each locale's article must canonicalize to itself.
 */
export function buildBlogAlternates(ptSlug, enSlug, locale = "pt") {
  const selfUrl = locale === "en"
    ? `${SITE_URL}/en/blog/${enSlug}`
    : `${SITE_URL}/blog/${ptSlug}`;
  return {
    canonical: selfUrl,
    languages: {
      "pt-PT":     `${SITE_URL}/blog/${ptSlug}`,
      "en":        `${SITE_URL}/en/blog/${enSlug}`,
      "x-default": `${SITE_URL}/blog/${ptSlug}`,
    },
  };
}

/**
 * Devolve um objecto openGraph completo com defaults.
 * imagePath: caminho relativo ("/imagem.webp") ou URL absoluta.
 */
export function buildOpenGraph({ title, description, url, imagePath, imageAlt, type = "website", locale = "pt_PT" }) {
  const og = { title, description, url, siteName: SITE_NAME, locale, type };
  if (imagePath) {
    og.images = [{ url: imagePath, width: 1200, height: 630, alt: imageAlt ?? "" }];
  }
  return og;
}

/**
 * Devolve um objecto twitter card com defaults.
 * imagePath: caminho relativo ("/imagem.webp") ou URL absoluta.
 */
export function buildTwitterCard({ title, description, imagePath }) {
  const tw = { card: "summary_large_image", title, description };
  if (imagePath) {
    tw.images = [imagePath];
  }
  return tw;
}
