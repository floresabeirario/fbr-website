import { getAllPosts } from "@/app/_lib/blog";

export default function sitemap() {
  const base = "https://www.floresabeirario.pt";

  // Each entry: { pt, en, priority, changeFrequency }
  // PT pages are served without prefix (/), EN pages with (/en/...)
  const routes = [
    { pt: "/",                                        en: "/en",                                       priority: 1.0,  changeFrequency: "monthly" },
    { pt: "/como-funciona",                           en: "/en/how-it-works",                          priority: 0.9,  changeFrequency: "monthly" },
    { pt: "/opcoes-e-precos",                         en: "/en/options-and-pricing",                       priority: 0.9,  changeFrequency: "monthly" },
    { pt: "/preservacao-de-flores",                   en: "/en/flower-preservation",                   priority: 0.85, changeFrequency: "monthly" },
    { pt: "/preservar-bouquet-noiva",                 en: "/en/preserve-wedding-bouquet",              priority: 0.85, changeFrequency: "monthly" },
    { pt: "/preservar-flores-luto-homenagem",         en: "/en/preserve-memorial-flowers",             priority: 0.85, changeFrequency: "monthly" },
    { pt: "/preservar-flores-batizado-nascimento",    en: "/en/preserve-baptism-flowers",              priority: 0.8,  changeFrequency: "monthly" },
    { pt: "/preservar-flores-aniversario",            en: "/en/preserve-anniversary-flowers",          priority: 0.8,  changeFrequency: "monthly" },
    { pt: "/preservar-flores-pedido-casamento",       en: "/en/preserve-proposal-flowers",             priority: 0.8,  changeFrequency: "monthly" },
    { pt: "/momentos-especiais",                      en: "/en/special-moments",                       priority: 0.75, changeFrequency: "monthly" },
    { pt: "/emoldurar-flores-secas",                  en: "/en/frame-dried-flowers",                   priority: 0.75, changeFrequency: "monthly" },
    { pt: "/recriacao",                               en: "/en/bouquet-recreation",                    priority: 0.8,  changeFrequency: "monthly" },
    { pt: "/oferecer-preservacao",                    en: "/en/gift-preservation",                     priority: 0.8,  changeFrequency: "monthly" },
    { pt: "/reservar-preservacao",                    en: "/en/book-preservation",                     priority: 0.85, changeFrequency: "monthly" },
    { pt: "/vale-presente",                           en: "/en/gift-voucher",                          priority: 0.75, changeFrequency: "monthly" },
    { pt: "/sustentabilidade",                        en: "/en/sustainability",                        priority: 0.7,  changeFrequency: "monthly" },
    { pt: "/perguntas-frequentes",                    en: "/en/faq",                                   priority: 0.8,  changeFrequency: "monthly" },
    { pt: "/contactos",                               en: "/en/contact",                               priority: 0.7,  changeFrequency: "yearly"  },
    { pt: "/blog",                                    en: "/en/blog",                                  priority: 0.5,  changeFrequency: "weekly"  },
    { pt: "/politica-de-privacidade",                 en: "/en/privacy-policy",                        priority: 0.3,  changeFrequency: "yearly"  },
    { pt: "/termos-e-condicoes",                      en: "/en/terms-and-conditions",                  priority: 0.3,  changeFrequency: "yearly"  },
  ];

  // Add blog posts (dynamic MDX articles, locale-specific slugs)
  const ptPosts = getAllPosts("pt");
  const enPosts = getAllPosts("en");
  for (const ptPost of ptPosts) {
    const enSlug = ptPost.enSlug;
    routes.push({
      pt: `/blog/${ptPost.slug}`,
      en: enSlug ? `/en/blog/${enSlug}` : `/en/blog/${ptPost.slug}`,
      priority: 0.6,
      changeFrequency: "yearly",
    });
  }
  // Add any EN-only posts that have no PT counterpart
  const ptSlugsSet = new Set(ptPosts.map((p) => p.enSlug).filter(Boolean));
  for (const enPost of enPosts) {
    if (!ptSlugsSet.has(enPost.slug)) {
      routes.push({
        pt: `/blog/${enPost.ptSlug || enPost.slug}`,
        en: `/en/blog/${enPost.slug}`,
        priority: 0.6,
        changeFrequency: "yearly",
      });
    }
  }

  const entries = [];

  for (const route of routes) {
    const altLanguages = {
      "pt-PT":     `${base}${route.pt}`,
      "en":        `${base}${route.en}`,
      "x-default": `${base}${route.pt}`,
    };

    // PT entry
    entries.push({
      url:             `${base}${route.pt}`,
      lastModified:    new Date(),
      changeFrequency: route.changeFrequency,
      priority:        route.priority,
      alternates:      { languages: altLanguages },
    });

    // EN entry
    entries.push({
      url:             `${base}${route.en}`,
      lastModified:    new Date(),
      changeFrequency: route.changeFrequency,
      priority:        route.priority,
      alternates:      { languages: altLanguages },
    });
  }

  return entries;
}
