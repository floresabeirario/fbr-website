// app/preservar-flores-aniversario/page.js
import { SITE_URL, PHONE, EMAIL } from "../_lib/constants";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";
import AniversarioClient from "./AniversarioClient";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Preservação de Flores de Aniversário | Flores à Beira-Rio",
  description:
    "Flores de aniversário preservadas em arte botânica artesanal. Vidro museu anti-UV e moldura feita à medida em Coimbra.",
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
  serviceType: "Preservação de Flores de Aniversário",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "300",
    highPrice: "500",
    offerCount: "3",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/preservar-flores-aniversario`,
  },
};

export const metadata = {
  title: "Preservar Flores de Aniversário | Flores à Beira-Rio",
  description:
    "Guarde para sempre as flores de um aniversário especial. Arte botânica artesanal, vidro museu anti-UV, feita à mão em Coimbra. A partir de 300€.",
  keywords: [
    "preservar flores aniversário",
    "quadro flores prensadas aniversário",
    "preservação flores aniversário casamento",
    "arte botânica aniversário",
    "Coimbra",
  ],
  openGraph: buildOpenGraph({
    title: "Preservar Flores de Aniversário | Flores à Beira-Rio",
    description:
      "Flores de aniversário preservadas em arte botânica artesanal. A partir de 300€.",
    url: `${SITE_URL}/preservar-flores-aniversario`,
    imagePath: "/og-homepage.jpg",
    imageAlt: "Flores de aniversário preservadas, Flores à Beira-Rio, Coimbra",
  }),
  twitter: buildTwitterCard({
    title: "Preservar Flores de Aniversário | Flores à Beira-Rio",
    description:
      "Flores de aniversário transformadas em arte botânica que dura décadas. A partir de 300€.",
    imagePath: "/og-homepage.jpg",
  }),
  alternates: {
    canonical: `${SITE_URL}/preservar-flores-aniversario`,
    languages: { "pt-PT": `${SITE_URL}/preservar-flores-aniversario` },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <AniversarioClient />
    </>
  );
}
