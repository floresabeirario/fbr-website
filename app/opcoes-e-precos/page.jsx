// app/opcoes-e-precos/page.jsx
// Server Component — NÃO tem "use client"

import OpcoesClient from "./OpcoesClient";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";

export const metadata = {
  title: "Opções e Preços | Flores à Beira-Rio, Quadros de Flores Prensadas",
  description:
    "Descubra os tipos de fundo, tamanhos e preços dos quadros de flores preservadas da Flores à Beira-Rio. 30×40cm a partir de 300€. Feitos à mão em Coimbra, com vidro museu UltraVue® anti-UV.",
  keywords: [
    "preços preservação flores",
    "quadros flores prensadas tamanhos",
    "vidro museu flores preservadas",
    "bouquet preservado preço Portugal",
    "flores emolduradas Coimbra preço",
  ],
  openGraph: buildOpenGraph({
    title: "Opções e Preços | Flores à Beira-Rio",
    description: "Quadros de flores prensadas feitos à mão em Coimbra. 30×40cm a partir de 300€. Vidro museu UltraVue® anti-UV incluído.",
    url: "https://floresabeirario.pt/opcoes-e-precos",
    imagePath: "https://floresabeirario.pt/fotoquadro1.webp",
    imageAlt: "Quadros de flores prensadas, Opções e Preços, Flores à Beira-Rio",
  }),
  twitter: buildTwitterCard({
    title: "Opções e Preços | Flores à Beira-Rio",
    description: "Quadros de flores prensadas a partir de 300€, feitos à mão em Coimbra.",
    imagePath: "https://floresabeirario.pt/fotoquadro1.webp",
  }),
  alternates: {
    canonical: "https://floresabeirario.pt/opcoes-e-precos",
  },
};

export default function OpcoesEPrecos() {
  return <OpcoesClient />;
}
