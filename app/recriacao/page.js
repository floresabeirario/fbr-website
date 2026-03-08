// app/recriacao/page.js
// SERVER COMPONENT — exporta metadata estática para SEO perfeito

import RecriacaoClient from "./RecriacaoClient";

export const metadata = {
  title: "Recriação de Bouquet de Casamento | Preservação Botânica",
  description:
    "O seu bouquet de noiva não foi preservado a tempo? Recriamos o ramo com flores frescas a partir de uma fotografia e eternizamo-lo numa obra de arte botânica. Atelier em Coimbra.",
  keywords: [
    "recriação bouquet casamento",
    "preservar bouquet de casamento tarde",
    "recriar ramo de noiva",
    "flores frescas bouquet fotos",
    "preservação botânica coimbra",
    "flores à beira-rio recriação",
  ],
  openGraph: {
    title: "Recriação de Bouquet de Casamento | Flores à Beira-Rio",
    description:
      "Recriamos o seu bouquet de noiva com flores frescas a partir de uma fotografia e eternizamo-lo numa obra de arte.",
    url: "https://floresabeirario.pt/recriacao",
    images: [{ url: "/recriacao-hero.webp", width: 1200, height: 630, alt: "Recriação de Bouquet de Casamento — Flores à Beira-Rio" }],
  },
  alternates: {
    canonical: "https://floresabeirario.pt/recriacao",
    languages: { "pt-PT": "https://floresabeirario.pt/recriacao" },
  },
};

export default function RecriacaoBouquet() {
  return <RecriacaoClient />;
}
