// app/preservar-flores-batizado-nascimento/page.js
import { SITE_URL, PHONE, EMAIL } from "../_lib/constants";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";
import BatizadoNascimentoClient from "./BatizadoNascimentoClient";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Preservação de Flores de Batizado e Nascimento | Flores à Beira-Rio",
  description:
    "As flores do batizado ou do nascimento preservadas em arte botânica artesanal. Vidro museu anti-UV e moldura feita à medida em Coimbra.",
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
  serviceType: "Preservação de Flores de Batizado",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "300",
    highPrice: "500",
    offerCount: "3",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/preservar-flores-batizado-nascimento`,
  },
};

export const metadata = {
  title: "Preservar Flores de Batizado e Nascimento | Flores à Beira-Rio",
  description:
    "As flores do batizado ou do nascimento preservadas em arte botânica artesanal que acompanha o seu filho ao longo da vida. Feito à mão em Coimbra. A partir de 300€.",
  keywords: [
    "preservar flores batizado",
    "flores nascimento preservadas",
    "quadro flores prensadas batizado",
    "preservação flores maternidade",
    "arte botânica batizado",
    "Coimbra",
  ],
  openGraph: buildOpenGraph({
    title: "Preservar Flores de Batizado e Nascimento | Flores à Beira-Rio",
    description:
      "Flores do batizado ou do nascimento preservadas em arte botânica artesanal. A partir de 300€.",
    url: `${SITE_URL}/preservar-flores-batizado-nascimento`,
    imagePath: "/og-homepage.jpg",
    imageAlt: "Flores de batizado preservadas, Flores à Beira-Rio, Coimbra",
  }),
  twitter: buildTwitterCard({
    title: "Preservar Flores de Batizado e Nascimento | Flores à Beira-Rio",
    description:
      "Flores do batizado preservadas em arte botânica que acompanha o seu filho. A partir de 300€.",
    imagePath: "/og-homepage.jpg",
  }),
  alternates: {
    canonical: `${SITE_URL}/preservar-flores-batizado-nascimento`,
    languages: { "pt-PT": `${SITE_URL}/preservar-flores-batizado-nascimento` },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BatizadoNascimentoClient />
    </>
  );
}
