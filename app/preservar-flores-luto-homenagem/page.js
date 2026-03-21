// app/preservar-flores-luto-homenagem/page.js
import { SITE_URL, PHONE, EMAIL } from "../_lib/constants";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";
import LutoHomenagemClient from "./LutoHomenagemClient";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Preservação de Flores de Homenagem e Luto | Flores à Beira-Rio",
  description:
    "Eternize as flores de uma cerimónia fúnebre como forma de homenagem duradoura. Arte botânica artesanal feita com respeito e sensibilidade em Coimbra.",
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
  serviceType: "Preservação de Flores de Homenagem",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "300",
    highPrice: "500",
    offerCount: "3",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/preservar-flores-luto-homenagem`,
  },
};

export const metadata = {
  title: "Preservar Flores de Homenagem e Luto | Flores à Beira-Rio",
  description:
    "Eternize as flores de uma cerimónia fúnebre como forma de homenagem duradoura. Arte botânica artesanal feita com respeito e sensibilidade em Coimbra. A partir de 300€.",
  keywords: [
    "preservar flores luto",
    "flores homenagem funeral",
    "preservação flores funeral",
    "quadro flores prensadas homenagem",
    "preservar flores cerimónia fúnebre",
    "Coimbra",
  ],
  openGraph: buildOpenGraph({
    title: "Preservar Flores de Homenagem e Luto | Flores à Beira-Rio",
    description:
      "Eternize as flores de uma cerimónia fúnebre como forma de homenagem duradoura. A partir de 300€.",
    url: `${SITE_URL}/preservar-flores-luto-homenagem`,
    imagePath: "/og-homepage.jpg",
    imageAlt: "Flores de homenagem preservadas, Flores à Beira-Rio, Coimbra",
  }),
  twitter: buildTwitterCard({
    title: "Preservar Flores de Homenagem e Luto | Flores à Beira-Rio",
    description:
      "Uma homenagem permanente. Flores de cerimónias fúnebres preservadas em arte botânica. A partir de 300€.",
    imagePath: "/og-homepage.jpg",
  }),
  alternates: {
    canonical: `${SITE_URL}/preservar-flores-luto-homenagem`,
    languages: { "pt-PT": `${SITE_URL}/preservar-flores-luto-homenagem` },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <LutoHomenagemClient />
    </>
  );
}
