// app/[locale]/oferecer-preservacao/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import OfereceClient from "@/app/oferecer-preservacao/OfereceClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN
      ? "Flower Preservation as a Gift, Flores à Beira-Rio"
      : "Oferecer Preservação de Flores, Flores à Beira-Rio",
    description: isEN
      ? "Give the gift of flower preservation. Choose from our gift options and let the recipient select their own flowers and preservation style. The perfect wedding gift, anniversary or baptism present."
      : "Ofereça a preservação de flores a alguém especial. Escolha entre as nossas opções e deixe o presenteado escolher as flores e o estilo de preservação ao seu gosto. O presente perfeito para casamentos, aniversários e batizados.",
    provider: {
      "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "7",
        bestRating: "5",
        worstRating: "1",
      },
    },
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    serviceType: isEN ? "Flower Preservation Gift" : "Oferta de Preservação de Flores",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    url: isEN ? `${SITE_URL}/en/gift-preservation` : `${SITE_URL}/oferecer-preservacao`,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "oferecer.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/gift-preservation` : `${SITE_URL}/oferecer-preservacao`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/og-homepage.jpg`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/og-homepage.jpg`,
    }),
    alternates: buildAlternates("/oferecer-preservacao", locale),
  };
}

export default async function OferecePreservacaoPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <OfereceClient />
    </>
  );
}
