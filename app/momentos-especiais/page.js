// app/momentos-especiais/page.js
import { SITE_URL, PHONE, EMAIL } from "../_lib/constants";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";
import MomentosEspeciaisClient from "./MomentosEspeciaisClient";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Momentos Especiais | Flores à Beira-Rio",
  description:
    "Preservamos flores de casamentos, batizados, homenagens, aniversários e pedidos de casamento. Arte botânica artesanal em Coimbra.",
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
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, url: `${SITE_URL}/preservar-bouquet-noiva`, name: "Preservar Bouquet de Noiva" },
      { "@type": "ListItem", position: 2, url: `${SITE_URL}/preservar-flores-luto-homenagem`, name: "Preservar Flores de Homenagem e Luto" },
      { "@type": "ListItem", position: 3, url: `${SITE_URL}/preservar-flores-batizado-nascimento`, name: "Preservar Flores de Batizado e Nascimento" },
      { "@type": "ListItem", position: 4, url: `${SITE_URL}/preservar-flores-aniversario`, name: "Preservar Flores de Aniversário" },
      { "@type": "ListItem", position: 5, url: `${SITE_URL}/preservar-flores-pedido-casamento`, name: "Preservar Flores do Pedido de Casamento" },
    ],
  },
};

export const metadata = {
  title: "Momentos Especiais | Preservação de Flores",
  description:
    "Preservamos flores de casamentos, batizados, homenagens, aniversários e pedidos de casamento. Arte botânica artesanal feita à mão em Coimbra. A partir de 300€.",
  keywords: [
    "preservar flores momentos especiais",
    "preservação flores casamento",
    "preservar flores batizado",
    "preservar flores luto homenagem",
    "preservar flores aniversário",
    "preservar flores pedido casamento",
    "arte botânica Coimbra",
    "quadro flores prensadas",
  ],
  openGraph: buildOpenGraph({
    title: "Momentos Especiais | Flores à Beira-Rio",
    description:
      "Preservamos flores de casamentos, batizados, homenagens, aniversários e pedidos de casamento. A partir de 300€.",
    url: `${SITE_URL}/momentos-especiais`,
    imagePath: "/og-homepage.jpg",
    imageAlt: "Momentos Especiais, Flores à Beira-Rio, Coimbra",
  }),
  twitter: buildTwitterCard({
    title: "Momentos Especiais | Flores à Beira-Rio",
    description:
      "Preservamos flores de casamentos, batizados, homenagens e pedidos de casamento. A partir de 300€.",
    imagePath: "/og-homepage.jpg",
  }),
  alternates: {
    canonical: `${SITE_URL}/momentos-especiais`,
    languages: { "pt-PT": `${SITE_URL}/momentos-especiais` },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <MomentosEspeciaisClient />
    </>
  );
}
