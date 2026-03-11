// app/preservacao-de-flores/page.js
// Server Component — NÃO tem "use client"

import PreservacaoDeFloresClient from "./PreservacaoDeFloresClient";

export const metadata = {
  title: "Preservação de Flores | Flores à Beira-Rio — Arte Botânica em Coimbra",
  description:
    "Preservação botânica artesanal de flores com valor emocional. Bouquets de casamento, batizado e homenagem transformados em quadros com vidro museu anti-UV. Atelier em Coimbra. A partir de 300€.",
  keywords: [
    "preservação de flores",
    "preservar flores casamento",
    "bouquet preservado quadro",
    "flores prensadas quadro Portugal",
    "preservação botânica artesanal",
    "flores casamento preservadas Coimbra",
    "quadro flores prensadas",
    "eternizar flores casamento",
    "preservar bouquet noiva",
    "flores emolduradas Portugal",
  ],
  openGraph: {
    title: "Preservação de Flores | Flores à Beira-Rio",
    description:
      "Arte botânica artesanal. Bouquets de casamento e flores especiais transformados em quadros únicos com vidro museu anti-UV. Atelier em Coimbra, enviamos para toda a Europa.",
    url: "https://floresabeirario.pt/preservacao-de-flores",
    siteName: "Flores à Beira-Rio",
    images: [
      {
        url: "https://floresabeirario.pt/joanaceu.webp",
        width: 1200,
        height: 630,
        alt: "Quadro de flores preservadas — Flores à Beira-Rio, Coimbra",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preservação de Flores | Flores à Beira-Rio",
    description:
      "Arte botânica artesanal. Bouquets de casamento transformados em quadros únicos. A partir de 300€.",
    images: ["https://floresabeirario.pt/joanaceu.webp"],
  },
  alternates: {
    canonical: "https://floresabeirario.pt/preservacao-de-flores",
    languages: {
      "pt-PT": "https://floresabeirario.pt/preservacao-de-flores",
    },
  },
};

export default function PreservacaoDeFloresPage() {
  return <PreservacaoDeFloresClient />;
}
