// app/[locale]/opcoes-e-precos/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import OpcoesClient from "@/app/opcoes-e-precos/OpcoesClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  const pageUrl = isEN ? `${SITE_URL}/en/pricing-options` : `${SITE_URL}/opcoes-e-precos`;
  const provider = {
    "@type": "LocalBusiness",
    name: "Flores à Beira-Rio",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
  };
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isEN ? "Flower Preservation Options & Pricing" : "Opções e Preços de Preservação de Flores",
    description: isEN
      ? "Three preservation options for wedding bouquets and special occasion flowers, framed in museum-quality anti-UV glass. Handmade in Coimbra, Portugal."
      : "Três opções de preservação para bouquets de casamento e flores de momentos especiais, emolduradas em vidro museu anti-UV. Feito à mão em Coimbra.",
    url: pageUrl,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: isEN ? "Flower Preservation — 30×40 cm frame" : "Preservação de Flores — moldura 30×40 cm",
          provider,
          offers: { "@type": "Offer", price: "300", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
          url: pageUrl,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: isEN ? "Flower Preservation — 40×50 cm frame" : "Preservação de Flores — moldura 40×50 cm",
          provider,
          offers: { "@type": "Offer", price: "400", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
          url: pageUrl,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: isEN ? "Flower Preservation — 50×70 cm frame" : "Preservação de Flores — moldura 50×70 cm",
          provider,
          offers: { "@type": "Offer", price: "500", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
          url: pageUrl,
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: isEN ? "Flower Preservation — 20×25 cm frame (add-on)" : "Preservação de Flores — moldura 20×25 cm (complemento)",
          description: isEN
            ? "Small frame available as an add-on with the purchase of a larger frame."
            : "Moldura pequena disponível em conjunto com a compra de um quadro maior.",
          brand: { "@type": "Brand", name: "Flores à Beira-Rio" },
          offers: { "@type": "Offer", price: "90", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
          url: pageUrl,
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Product",
          name: isEN ? "Christmas Ornament with preserved flowers (~8 cm)" : "Ornamento de Natal com flores preservadas (~8 cm)",
          description: isEN
            ? "Christmas ornament with double lead-free silver-plated glass. Available as an add-on with the purchase of a larger frame."
            : "Ornamento de Natal com vidro duplo soldado sem chumbo, com prata. Disponível em conjunto com a compra de um quadro maior.",
          brand: { "@type": "Brand", name: "Flores à Beira-Rio" },
          offers: { "@type": "Offer", price: "35", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
          url: pageUrl,
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Product",
          name: isEN ? "Necklace pendant with preserved flowers (~3 cm)" : "Pendente para colar com flores preservadas (~3 cm)",
          description: isEN
            ? "Necklace pendant with double lead-free silver-plated glass. Available as an add-on with the purchase of a larger frame."
            : "Pendente com vidro duplo soldado sem chumbo, com prata. Disponível em conjunto com a compra de um quadro maior.",
          brand: { "@type": "Brand", name: "Flores à Beira-Rio" },
          offers: { "@type": "Offer", price: "35", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
          url: pageUrl,
        },
      },
    ],
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "opcoes.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/pricing-options` : `${SITE_URL}/opcoes-e-precos`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/fotoquadro1.webp`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/fotoquadro1.webp`,
    }),
    alternates: buildAlternates("/opcoes-e-precos"),
  };
}

export default async function OpcoesPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <OpcoesClient />
    </>
  );
}
