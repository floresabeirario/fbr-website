import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";

export const metadata = {
  title: "Sustentabilidade | Flores à Beira-Rio",
  description: "Preservação botânica artesanal sem resina epóxi nem sílica industrial. Prensagem 100% natural, materiais de museu e embalagem solidária com a APCC Coimbra.",
  openGraph: buildOpenGraph({
    title: "Sustentabilidade sem compromissos | Flores à Beira-Rio",
    description: "Sem resinas petroquímicas, sem sílica industrial. Apenas prensagem botânica artesanal com materiais de conservação museu, feita em Coimbra.",
    url: "https://floresabeirario.pt/sustentabilidade",
    imagePath: "https://floresabeirario.pt/ines1.webp",
    imageAlt: "Prensagem botânica artesanal na Flores à Beira-Rio",
    type: "article",
  }),
  twitter: buildTwitterCard({
    title: "Sustentabilidade sem compromissos | Flores à Beira-Rio",
    description: "Sem resinas petroquímicas, sem sílica industrial. Apenas prensagem botânica artesanal com materiais de conservação museu.",
    imagePath: "https://floresabeirario.pt/ines1.webp",
  }),
  alternates: {
    canonical: "https://floresabeirario.pt/sustentabilidade",
  },
};

export { default } from "./SustentabilidadeClient";
