// app/perguntas-frequentes/page.js
// SERVER COMPONENT — exporta metadata estática para SEO perfeito

import PerguntasFrequentesClient from "../_components/PerguntasFrequentesClient";

export const metadata = {
  title: "Perguntas Frequentes sobre Preservação de Flores",
  description:
    "Todas as respostas sobre preservação botânica de bouquets: processo, prazos, tipos de flores, entrega e pagamentos. Atelier em Coimbra.",
  keywords: [
    "perguntas frequentes preservação flores",
    "dúvidas bouquet casamento",
    "como funciona preservação botânica",
    "prazo preservação bouquet",
    "preço preservação flores",
    "flores à beira-rio faq",
  ],
  openGraph: {
    title: "Perguntas Frequentes | Flores à Beira-Rio",
    description:
      "Todas as respostas sobre preservação botânica de bouquets: processo, prazos, flores, entrega e pagamentos.",
    url: "https://floresabeirario.pt/perguntas-frequentes",
    images: [{ url: "/og-faq.webp", width: 1200, height: 630, alt: "Perguntas Frequentes — Flores à Beira-Rio" }],
  },
  alternates: {
    canonical: "https://floresabeirario.pt/perguntas-frequentes",
    languages: { "pt-PT": "https://floresabeirario.pt/perguntas-frequentes" },
  },
};

export default function PerguntasFrequentes() {
  return <PerguntasFrequentesClient />;
}
