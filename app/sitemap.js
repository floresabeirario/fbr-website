import { getAllPosts } from "@/app/_lib/blog";

export default function sitemap() {
  const base = "https://www.floresabeirario.pt";

  // Each entry: { pt, en, priority, changeFrequency, images? }
  // PT pages are served without prefix (/), EN pages with (/en/...)
  // `images`: fotos de trabalhos reais servidas na página. Declará-las no sitemap
  // ajuda o Google a indexá-las no separador Imagens (ficheiros já têm nomes
  // descritivos ricos em palavras-chave). Mesmo ficheiro para PT e EN.
  const routes = [
    { pt: "/",                                        en: "/en",                                       priority: 1.0,  changeFrequency: "monthly", images: ["/quadro-flores-preservadas-luz-natural.webp", "/quadro-bouquet-noiva-preservado.webp"] },
    { pt: "/como-funciona",                           en: "/en/how-it-works",                          priority: 0.9,  changeFrequency: "monthly", images: ["/quadro-flores-prensadas-detalhe.webp"] },
    { pt: "/opcoes-e-precos",                         en: "/en/options-and-pricing",                       priority: 0.9,  changeFrequency: "monthly", images: ["/quadro-flores-prensadas-preservadas.webp", "/quadro-flores-vidro-sobre-vidro.webp", "/quadro-flores-fundo-preto.webp", "/moldura-nogueira-flores-preservadas.webp"] },
    { pt: "/preservacao-de-flores",                   en: "/en/flower-preservation",                   priority: 0.85, changeFrequency: "monthly", images: ["/quadro-flores-preservadas-luz-natural.webp", "/bouquet-noiva-preservado-quadro.webp"] },
    { pt: "/preservar-bouquet-noiva",                 en: "/en/preserve-wedding-bouquet",              priority: 0.85, changeFrequency: "monthly", images: ["/quadro-bouquet-noiva-preservado.webp"] },
    { pt: "/preservar-flores-luto-homenagem",         en: "/en/preserve-memorial-flowers",             priority: 0.85, changeFrequency: "monthly", images: ["/flores-homenagem-preservadas-quadro.webp"] },
    { pt: "/preservar-flores-batizado-nascimento",    en: "/en/preserve-baptism-flowers",              priority: 0.8,  changeFrequency: "monthly", images: ["/flores-prensadas-close-up.webp"] },
    { pt: "/preservar-flores-aniversario",            en: "/en/preserve-anniversary-flowers",          priority: 0.8,  changeFrequency: "monthly", images: ["/flores-aniversario-preservadas-quadro.webp"] },
    { pt: "/preservar-flores-pedido-casamento",       en: "/en/preserve-proposal-flowers",             priority: 0.8,  changeFrequency: "monthly", images: ["/quadro-flores-preservadas-coloridas.webp"] },
    { pt: "/momentos-especiais",                      en: "/en/special-moments",                       priority: 0.75, changeFrequency: "monthly" },
    { pt: "/emoldurar-flores-secas",                  en: "/en/frame-dried-flowers",                   priority: 0.75, changeFrequency: "monthly", images: ["/quadro-flores-vidro-sobre-vidro.webp", "/flores-casamento-emolduradas-quadro.webp"] },
    { pt: "/recriacao",                               en: "/en/bouquet-recreation",                    priority: 0.8,  changeFrequency: "monthly", images: ["/recriacao-bouquet-noiva-quadro.webp"] },
    { pt: "/oferecer-preservacao",                    en: "/en/gift-preservation",                     priority: 0.8,  changeFrequency: "monthly" },
    { pt: "/reservar-preservacao",                    en: "/en/book-preservation",                     priority: 0.85, changeFrequency: "monthly", images: ["/moldura-preta-flores-preservadas.webp"] },
    { pt: "/enviar-flores-por-correio",               en: "/en/how-to-ship-your-flowers",              priority: 0.6,  changeFrequency: "yearly"  },
    { pt: "/vale-presente",                           en: "/en/gift-voucher",                          priority: 0.75, changeFrequency: "monthly" },
    { pt: "/sustentabilidade",                        en: "/en/sustainability",                        priority: 0.7,  changeFrequency: "monthly", images: ["/bouquet-noiva-preservado-quadro.webp"] },
    { pt: "/perguntas-frequentes",                    en: "/en/faq",                                   priority: 0.8,  changeFrequency: "monthly", images: ["/flores-preservadas-quadro-detalhe.webp"] },
    { pt: "/contactos",                               en: "/en/contact",                               priority: 0.7,  changeFrequency: "yearly",  images: ["/quadro-flores-casamento-preservadas.webp"] },
    { pt: "/blog",                                    en: "/en/blog",                                  priority: 0.5,  changeFrequency: "weekly"  },
    // politica-de-privacidade e termos-e-condicoes ficam fora do sitemap:
    // são noindex (páginas legais sem valor de pesquisa) — ver page.js de cada uma.
  ];

  // Add blog posts (dynamic MDX articles, locale-specific slugs)
  const ptPosts = getAllPosts("pt");
  const enPosts = getAllPosts("en");
  // Posts sem contraparte no outro idioma entram só com o URL que existe
  // (senão o sitemap apontava para /blog/<slug> ou /en/blog/<slug> a 404).
  for (const ptPost of ptPosts) {
    routes.push({
      pt: `/blog/${ptPost.slug}`,
      en: ptPost.enSlug ? `/en/blog/${ptPost.enSlug}` : null,
      priority: 0.6,
      changeFrequency: "yearly",
      lastModified: ptPost.date ? new Date(ptPost.date) : undefined,
    });
  }
  // Add any EN-only posts that have no PT counterpart
  const ptSlugsSet = new Set(ptPosts.map((p) => p.enSlug).filter(Boolean));
  for (const enPost of enPosts) {
    if (!ptSlugsSet.has(enPost.slug)) {
      routes.push({
        pt: enPost.ptSlug ? `/blog/${enPost.ptSlug}` : null,
        en: `/en/blog/${enPost.slug}`,
        priority: 0.6,
        changeFrequency: "yearly",
        lastModified: enPost.date ? new Date(enPost.date) : undefined,
      });
    }
  }

  const entries = [];

  for (const route of routes) {
    const altLanguages =
      route.pt && route.en
        ? {
            "pt-PT":     `${base}${route.pt}`,
            "en":        `${base}${route.en}`,
            "x-default": `${base}${route.pt}`,
          }
        : undefined;

    // lastModified: só quando conhecemos a data real (artigos do blog, via
    // frontmatter). "new Date()" a cada build ensinava o Google a ignorar
    // o sinal, porque todas as páginas pareciam mudar todos os dias.

    // Imagens (URLs absolutas) — mesmas fotos servidas em PT e EN.
    const images =
      route.images && route.images.length
        ? route.images.map((img) => `${base}${img}`)
        : undefined;

    // PT entry
    if (route.pt) {
      entries.push({
        url:             `${base}${route.pt}`,
        ...(route.lastModified ? { lastModified: route.lastModified } : {}),
        changeFrequency: route.changeFrequency,
        priority:        route.priority,
        ...(altLanguages ? { alternates: { languages: altLanguages } } : {}),
        ...(images ? { images } : {}),
      });
    }

    // EN entry
    if (route.en) {
      entries.push({
        url:             `${base}${route.en}`,
        ...(route.lastModified ? { lastModified: route.lastModified } : {}),
        changeFrequency: route.changeFrequency,
        priority:        route.priority,
        ...(altLanguages ? { alternates: { languages: altLanguages } } : {}),
        ...(images ? { images } : {}),
      });
    }
  }

  return entries;
}
