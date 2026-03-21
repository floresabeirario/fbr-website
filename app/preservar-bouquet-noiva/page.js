// app/preservar-bouquet-noiva/page.js
import { SITE_URL, PHONE, EMAIL } from "../_lib/constants";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";
import BouquetNoivaClient from "./BouquetNoivaClient";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Preservação de Bouquet de Noiva | Flores à Beira-Rio",
  description:
    "Transformamos o bouquet do casamento numa obra de arte botânica que dura décadas. Prensagem artesanal, vidro museu anti-UV e emolduramento feito à mão em Coimbra.",
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
  serviceType: "Preservação de Bouquet de Noiva",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "300",
    highPrice: "500",
    offerCount: "3",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/preservar-bouquet-noiva`,
  },
};

export const metadata = {
  title: "Preservar Bouquet de Noiva | Quadro de Flores do Casamento",
  description:
    "Transformamos o bouquet do seu casamento numa obra de arte botânica que dura décadas. Prensagem artesanal, vidro museu anti-UV e emolduramento feito à mão em Coimbra. A partir de 300€.",
  keywords: [
    "preservar bouquet de noiva",
    "preservação bouquet casamento",
    "quadro flores prensadas casamento",
    "preservar flores casamento",
    "bouquet preservado quadro",
    "flores casamento emolduradas",
    "Coimbra",
  ],
  openGraph: buildOpenGraph({
    title: "Preservar Bouquet de Noiva | Flores à Beira-Rio",
    description:
      "Transformamos o bouquet do casamento numa obra de arte botânica que dura décadas. A partir de 300€.",
    url: `${SITE_URL}/preservar-bouquet-noiva`,
    imagePath: "/og-homepage.jpg",
    imageAlt: "Bouquet de noiva preservado, Flores à Beira-Rio, Coimbra",
  }),
  twitter: buildTwitterCard({
    title: "Preservar Bouquet de Noiva | Flores à Beira-Rio",
    description:
      "O bouquet do casamento transformado em arte botânica que dura décadas. A partir de 300€.",
    imagePath: "/og-homepage.jpg",
  }),
  alternates: {
    canonical: `${SITE_URL}/preservar-bouquet-noiva`,
    languages: { "pt-PT": `${SITE_URL}/preservar-bouquet-noiva` },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BouquetNoivaClient />
    </>
  );
}
