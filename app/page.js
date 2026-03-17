// app/page.js
// Server Component — NÃO tem "use client"

import HomeClient from "./HomeClient";
import { SITE_URL } from "./_lib/constants";
import { buildOpenGraph, buildTwitterCard } from "./_lib/metadata";

export const metadata = {
  title: "Flores à Beira-Rio | Preservação de Flores em Coimbra",
  description:
    "Atelier de preservação botânica artesanal em Coimbra. Transformamos bouquets de casamento e flores de momentos especiais em quadros de arte que duram décadas.",
  keywords: [
    "preservação de flores",
    "bouquet de noiva",
    "quadros de flores prensadas",
    "Coimbra",
    "flores preservadas casamento",
  ],
  openGraph: buildOpenGraph({
    title: "Flores à Beira-Rio | Preservação de Flores em Coimbra",
    description: "Transformamos o seu bouquet numa obra de arte botânica que dura décadas. Feito à mão em Coimbra.",
    url: SITE_URL,
    imagePath: "/fotoquadro1.webp",
    imageAlt: "Quadro de flores prensadas, Flores à Beira-Rio",
  }),
  twitter: buildTwitterCard({
    title: "Flores à Beira-Rio | Preservação de Flores em Coimbra",
    description: "Transformamos o seu bouquet numa obra de arte botânica que dura décadas.",
    imagePath: "/fotoquadro1.webp",
  }),
  alternates: {
    canonical: SITE_URL,
    languages: { "pt-PT": SITE_URL, en: `${SITE_URL}/en` },
  },
};

export default function HomePage() {
  return <HomeClient />;
}
