// app/[locale]/preservacao-de-flores/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import PreservacaoDeFloresClient from "@/app/preservacao-de-flores/PreservacaoDeFloresClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN ? "Flower Preservation, Flores à Beira-Rio" : "Preservação de Flores, Flores à Beira-Rio",
    description: isEN
      ? "Artisan botanical preservation of emotionally meaningful flowers. Wedding bouquets, baptism and memorial flowers transformed into frames with museum anti-UV glass. Atelier in Coimbra, we ship across Europe."
      : "Preservação botânica artesanal de flores com valor emocional. Bouquets de casamento, flores de batizado e homenagem transformados em quadros de arte com vidro museu anti-UV. Atelier em Coimbra, enviamos para toda a Europa.",
    provider: {
      "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      image: `${SITE_URL}/logo.webp`,
      telephone: PHONE,
      email: EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
    },
    areaServed: "PT",
    serviceType: isEN ? "Flower Preservation" : "Preservação de Flores",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isEN ? "Preserved Flower Frames" : "Quadros de Flores Preservadas",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "30×40 cm" }, price: "300", priceCurrency: "EUR" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "40×50 cm" }, price: "400", priceCurrency: "EUR" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "50×70 cm" }, price: "500", priceCurrency: "EUR" },
      ],
    },
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "preservacao.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/flower-preservation` : `${SITE_URL}/preservacao-de-flores`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/joanaceu.webp`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/joanaceu.webp`,
    }),
    alternates: buildAlternates("/preservacao-de-flores"),
  };
}

export default async function PreservacaoDeFloresPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <PreservacaoDeFloresClient />
    </>
  );
}
