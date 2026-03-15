// app/opcoes-e-precos/page.jsx
// Server Component — NÃO tem "use client"

import OpcoesClient from "./OpcoesClient";

export const metadata = {
  title: "Opções e Preços | Flores à Beira-Rio — Quadros de Flores Prensadas",
  description:
    "Descubra os tipos de fundo, tamanhos e preços dos quadros de flores preservadas da Flores à Beira-Rio. 30×40cm a partir de 300€. Feitos à mão em Coimbra, com vidro museu UltraVue® anti-UV.",
  keywords: [
    "preços preservação flores",
    "quadros flores prensadas tamanhos",
    "vidro museu flores preservadas",
    "bouquet preservado preço Portugal",
    "flores emolduradas Coimbra preço",
  ],
  openGraph: {
    title: "Opções e Preços | Flores à Beira-Rio",
    description:
      "Quadros de flores prensadas feitos à mão em Coimbra. 30×40cm a partir de 300€. Vidro museu UltraVue® anti-UV incluído.",
    url: "https://floresabeirario.pt/opcoes-e-precos",
    siteName: "Flores à Beira-Rio",
    images: [
      {
        url: "https://floresabeirario.pt/fotoquadro1.webp",
        width: 1200,
        height: 630,
        alt: "Quadros de flores prensadas — Opções e Preços — Flores à Beira-Rio",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opções e Preços | Flores à Beira-Rio",
    description: "Quadros de flores prensadas a partir de 300€, feitos à mão em Coimbra.",
    images: ["https://floresabeirario.pt/fotoquadro1.webp"],
  },
  alternates: {
    canonical: "https://floresabeirario.pt/opcoes-e-precos",
  },
};

export default function OpcoesEPrecos() {
  return <OpcoesClient />;
}
