export default function sitemap() {
  const base = "https://floresabeirario.pt";

  const routes = [
    { url: `${base}/`,                                        priority: 1.0,  changeFrequency: "monthly" },
    { url: `${base}/como-funciona`,                           priority: 0.9,  changeFrequency: "monthly" },
    { url: `${base}/opcoes-e-precos`,                         priority: 0.9,  changeFrequency: "monthly" },
    { url: `${base}/preservacao-de-flores`,                   priority: 0.85, changeFrequency: "monthly" },
    { url: `${base}/preservar-bouquet-noiva`,                 priority: 0.85, changeFrequency: "monthly" },
    { url: `${base}/preservar-flores-luto-homenagem`,         priority: 0.85, changeFrequency: "monthly" },
    { url: `${base}/preservar-flores-batizado-nascimento`,    priority: 0.8,  changeFrequency: "monthly" },
    { url: `${base}/preservar-flores-aniversario`,            priority: 0.8,  changeFrequency: "monthly" },
    { url: `${base}/preservar-flores-pedido-casamento`,       priority: 0.8,  changeFrequency: "monthly" },
    { url: `${base}/momentos-especiais`,                      priority: 0.75, changeFrequency: "monthly" },
    { url: `${base}/emoldurar-flores-secas`,                  priority: 0.75, changeFrequency: "monthly" },
    { url: `${base}/recriacao`,                               priority: 0.8,  changeFrequency: "monthly" },
    { url: `${base}/oferecer-preservacao`,                    priority: 0.8,  changeFrequency: "monthly" },
    { url: `${base}/sustentabilidade`,                        priority: 0.7,  changeFrequency: "monthly" },
    { url: `${base}/perguntas-frequentes`,                    priority: 0.8,  changeFrequency: "monthly" },
    { url: `${base}/contactos`,                               priority: 0.7,  changeFrequency: "yearly"  },
    { url: `${base}/blog`,                                    priority: 0.5,  changeFrequency: "weekly"  },
    { url: `${base}/politica-de-privacidade`,                 priority: 0.3,  changeFrequency: "yearly"  },
    { url: `${base}/termos-e-condicoes`,                      priority: 0.3,  changeFrequency: "yearly"  },
  ];

  return routes.map((route) => ({
    url:             route.url,
    lastModified:    new Date(),
    changeFrequency: route.changeFrequency,
    priority:        route.priority,
  }));
}
