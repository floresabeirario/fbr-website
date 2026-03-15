// app/preservacao-de-flores/page.js
// Server Component — NÃO tem "use client"

import PreservacaoDeFloresClient from "./PreservacaoDeFloresClient";
import { PHONE, EMAIL } from "../_lib/constants";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Preservação de Flores — Flores à Beira-Rio",
  description:
    "Preservação botânica artesanal de flores com valor emocional. Bouquets de casamento, flores de batizado e homenagem transformados em quadros de arte com vidro museu anti-UV. Atelier em Coimbra, enviamos para toda a Europa.",
  provider: {
    "@type": "LocalBusiness",
    name: "Flores à Beira-Rio",
    url: "https://floresabeirario.pt",
    image: "https://floresabeirario.pt/logo.webp",
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbra",
      addressCountry: "PT",
    },
  },
  areaServed: "PT",
  serviceType: "Preservação de Flores",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "300",
    highPrice: "500",
    offerCount: "3",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Quadros de Flores Preservadas",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Quadro 30×40 cm", description: "Preservação botânica com vidro museu UltraVue® anti-UV, moldura à medida." },
        price: "300",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Quadro 40×50 cm", description: "Preservação botânica com vidro museu UltraVue® anti-UV, moldura à medida." },
        price: "400",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Quadro 50×70 cm", description: "Preservação botânica com vidro museu UltraVue® anti-UV, moldura à medida." },
        price: "500",
        priceCurrency: "EUR",
      },
    ],
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://floresabeirario.pt/preservacao-de-flores",
  },
};

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <PreservacaoDeFloresClient />
    </>
  );
}
