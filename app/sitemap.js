export default function sitemap() {
  const base = "https://floresabeirario.pt";

  const ptRoutes = [
    { path: "/",                                        priority: 1.0,  changeFrequency: "monthly" },
    { path: "/como-funciona",                           priority: 0.9,  changeFrequency: "monthly" },
    { path: "/opcoes-e-precos",                         priority: 0.9,  changeFrequency: "monthly" },
    { path: "/preservacao-de-flores",                   priority: 0.85, changeFrequency: "monthly" },
    { path: "/preservar-bouquet-noiva",                 priority: 0.85, changeFrequency: "monthly" },
    { path: "/preservar-flores-luto-homenagem",         priority: 0.85, changeFrequency: "monthly" },
    { path: "/preservar-flores-batizado-nascimento",    priority: 0.8,  changeFrequency: "monthly" },
    { path: "/preservar-flores-aniversario",            priority: 0.8,  changeFrequency: "monthly" },
    { path: "/preservar-flores-pedido-casamento",       priority: 0.8,  changeFrequency: "monthly" },
    { path: "/momentos-especiais",                      priority: 0.75, changeFrequency: "monthly" },
    { path: "/emoldurar-flores-secas",                  priority: 0.75, changeFrequency: "monthly" },
    { path: "/recriacao",                               priority: 0.8,  changeFrequency: "monthly" },
    { path: "/oferecer-preservacao",                    priority: 0.8,  changeFrequency: "monthly" },
    { path: "/sustentabilidade",                        priority: 0.7,  changeFrequency: "monthly" },
    { path: "/perguntas-frequentes",                    priority: 0.8,  changeFrequency: "monthly" },
    { path: "/contactos",                               priority: 0.7,  changeFrequency: "yearly"  },
    { path: "/blog",                                    priority: 0.5,  changeFrequency: "weekly"  },
    { path: "/politica-de-privacidade",                 priority: 0.3,  changeFrequency: "yearly"  },
    { path: "/termos-e-condicoes",                      priority: 0.3,  changeFrequency: "yearly"  },
  ];

  const enRoutes = [
    { path: "/en",                                      priority: 1.0,  changeFrequency: "monthly" },
    { path: "/en/how-it-works",                         priority: 0.9,  changeFrequency: "monthly" },
    { path: "/en/pricing-options",                      priority: 0.9,  changeFrequency: "monthly" },
    { path: "/en/flower-preservation",                  priority: 0.85, changeFrequency: "monthly" },
    { path: "/en/preserve-wedding-bouquet",             priority: 0.85, changeFrequency: "monthly" },
    { path: "/en/preserve-memorial-flowers",            priority: 0.85, changeFrequency: "monthly" },
    { path: "/en/preserve-baptism-flowers",             priority: 0.8,  changeFrequency: "monthly" },
    { path: "/en/preserve-anniversary-flowers",         priority: 0.8,  changeFrequency: "monthly" },
    { path: "/en/preserve-proposal-flowers",            priority: 0.8,  changeFrequency: "monthly" },
    { path: "/en/special-moments",                      priority: 0.75, changeFrequency: "monthly" },
    { path: "/en/frame-dried-flowers",                  priority: 0.75, changeFrequency: "monthly" },
    { path: "/en/bouquet-recreation",                   priority: 0.8,  changeFrequency: "monthly" },
    { path: "/en/gift-preservation",                    priority: 0.8,  changeFrequency: "monthly" },
    { path: "/en/sustainability",                       priority: 0.7,  changeFrequency: "monthly" },
    { path: "/en/faq",                                  priority: 0.8,  changeFrequency: "monthly" },
    { path: "/en/contact",                              priority: 0.7,  changeFrequency: "yearly"  },
    { path: "/en/blog",                                 priority: 0.5,  changeFrequency: "weekly"  },
    { path: "/en/privacy-policy",                       priority: 0.3,  changeFrequency: "yearly"  },
    { path: "/en/terms-and-conditions",                 priority: 0.3,  changeFrequency: "yearly"  },
  ];

  return [...ptRoutes, ...enRoutes].map((route) => ({
    url:             `${base}${route.path}`,
    lastModified:    new Date(),
    changeFrequency: route.changeFrequency,
    priority:        route.priority,
  }));
}
