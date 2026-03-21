// app/preservar-flores-pedido-casamento/page.js
import { SITE_URL, PHONE, EMAIL } from "../_lib/constants";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";
import PedidoCasamentoClient from "./PedidoCasamentoClient";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Preservação de Flores do Pedido de Casamento | Flores à Beira-Rio",
  description:
    "As flores do pedido de casamento preservadas em arte botânica artesanal. Vidro museu anti-UV e moldura feita à medida em Coimbra.",
  provider: {
    "@type": "LocalBusiness",
    name: "Flores à Beira-Rio",
    url: SITE_URL,
    image: `${SITE_URL}/logo.webp`,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbra",
      addressCountry: "PT",
    },
  },
  areaServed: "PT",
  serviceType: "Preservação de Flores de Pedido de Casamento",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "300",
    highPrice: "500",
    offerCount: "3",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/preservar-flores-pedido-casamento`,
  },
};

export const metadata = {
  title: "Preservar Flores do Pedido de Casamento | Flores à Beira-Rio",
  description:
    "As flores do pedido de casamento marcam o início de uma história. Preserve esse momento em arte botânica feita à mão em Coimbra. A partir de 300€.",
  keywords: [
    "preservar flores pedido casamento",
    "quadro flores prensadas noivado",
    "preservação flores pedido casamento",
    "arte botânica casamento",
    "flores noivado preservadas",
    "Coimbra",
  ],
  openGraph: buildOpenGraph({
    title: "Preservar Flores do Pedido de Casamento | Flores à Beira-Rio",
    description:
      "As flores do pedido de casamento preservadas em arte botânica. A partir de 300€.",
    url: `${SITE_URL}/preservar-flores-pedido-casamento`,
    imagePath: "/og-homepage.jpg",
    imageAlt: "Flores do pedido de casamento preservadas, Flores à Beira-Rio, Coimbra",
  }),
  twitter: buildTwitterCard({
    title: "Preservar Flores do Pedido de Casamento | Flores à Beira-Rio",
    description:
      "As flores do pedido de casamento transformadas em arte botânica. A partir de 300€.",
    imagePath: "/og-homepage.jpg",
  }),
  alternates: {
    canonical: `${SITE_URL}/preservar-flores-pedido-casamento`,
    languages: { "pt-PT": `${SITE_URL}/preservar-flores-pedido-casamento` },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <PedidoCasamentoClient />
    </>
  );
}
