// app/page.js
// Server Component — NÃO tem "use client"

import HomeClient from "./HomeClient";
import { SITE_URL } from "./_lib/constants";

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
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "Flores à Beira-Rio",
    title: "Flores à Beira-Rio | Preservação de Flores em Coimbra",
    description:
      "Transformamos o seu bouquet numa obra de arte botânica que dura décadas. Feito à mão em Coimbra.",
    images: [
      {
        url: "/fotoquadro1.webp",
        width: 1200,
        height: 630,
        alt: "Quadro de flores prensadas — Flores à Beira-Rio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flores à Beira-Rio | Preservação de Flores em Coimbra",
    description:
      "Transformamos o seu bouquet numa obra de arte botânica que dura décadas.",
    images: ["/fotoquadro1.webp"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-PT": SITE_URL,
      en: `${SITE_URL}/en`,
    },
  },
};

export default function HomePage() {
  return <HomeClient />;
}
