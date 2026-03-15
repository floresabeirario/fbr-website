// app/como-funciona/page.js
// Server Component — NÃO tem "use client"

import ComoFuncionaClient from "./ComoFuncionaClient";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";

export const metadata = {
  title: "Como Funciona | Flores à Beira-Rio — Preservação de Flores",
  description:
    "Cinco passos para transformar as suas flores numa obra de arte botânica que dura décadas. Desde a reserva até ao quadro emoldurado em casa, explicados com total transparência.",
  keywords: [
    "como funciona preservação flores",
    "processo preservação botânica",
    "prensagem flores casamento",
    "bouquet preservado quadro",
    "flores secas emolduradas",
  ],
  openGraph: buildOpenGraph({
    title: "Como Funciona | Flores à Beira-Rio",
    description: "Cinco passos para transformar as suas flores numa obra de arte que dura décadas.",
    url: "https://floresabeirario.pt/como-funciona",
    imagePath: "https://floresabeirario.pt/prensa.webp",
    imageAlt: "Processo de prensagem botânica artesanal — Flores à Beira-Rio",
  }),
  twitter: buildTwitterCard({
    title: "Como Funciona | Flores à Beira-Rio",
    description: "Cinco passos para transformar as suas flores numa obra de arte que dura décadas.",
    imagePath: "https://floresabeirario.pt/prensa.webp",
  }),
  alternates: {
    canonical: "https://floresabeirario.pt/como-funciona",
    languages: { "pt-PT": "https://floresabeirario.pt/como-funciona" },
  },
};

export default function ComoFuncionaPage() {
  return <ComoFuncionaClient />;
}
