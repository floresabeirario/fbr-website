// app/recriacao/page.js
// SERVER COMPONENT — exporta metadata estática para SEO perfeito

import RecriacaoClient from "./RecriacaoClient";
import { buildOpenGraph } from "../_lib/metadata";

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
  openGraph: buildOpenGraph({
    title: "Recriação de Bouquet de Casamento | Flores à Beira-Rio",
    description: "Recriamos o seu bouquet de noiva com flores frescas a partir de uma fotografia e eternizamo-lo numa obra de arte.",
    url: "https://floresabeirario.pt/recriacao",
    imagePath: "/recriacao-hero.webp",
    imageAlt: "Recriação de Bouquet de Casamento, Flores à Beira-Rio",
  }),
  alternates: {
    canonical: "https://floresabeirario.pt/recriacao",
    languages: { "pt-PT": "https://floresabeirario.pt/recriacao" },
  },
};

export default function RecriacaoBouquet() {
  return <RecriacaoClient />;
}
