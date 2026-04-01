// app/[locale]/vale-presente/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import ValeApresenteClient from "@/app/vale-presente/ValeApresenteClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isEN
      ? "Flower Preservation Gift Voucher — Flores à Beira-Rio"
      : "Vale-Presente de Preservação de Flores — Flores à Beira-Rio",
    description: isEN
      ? "Give the gift of flower preservation with our gift voucher. The recipient chooses their own flowers and preferred preservation style. Perfect wedding gift, anniversary or baptism present."
      : "Ofereça a preservação de flores com o nosso vale-presente. O presenteado escolhe as flores e o estilo de preservação ao seu gosto. O presente perfeito para casamentos, aniversários e batizados.",
    image: `${SITE_URL}/og-homepage.jpg`,
    brand: { "@type": "Brand", name: "Flores à Beira-Rio" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name: "Flores à Beira-Rio",
        url: SITE_URL,
        telephone: PHONE,
        email: EMAIL,
        address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
      },
    },
    url: isEN ? `${SITE_URL}/en/gift-voucher` : `${SITE_URL}/vale-presente`,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vale.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/gift-voucher` : `${SITE_URL}/vale-presente`;

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
    alternates: buildAlternates("/vale-presente"),
  };
}

export default async function ValeApresentePage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <ValeApresenteClient />
    </>
  );
}
