// app/[locale]/preservar-flores-luto-homenagem/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import LutoHomenagemClient from "@/app/preservar-flores-luto-homenagem/LutoHomenagemClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN ? "Memorial Flower Preservation, Flores à Beira-Rio" : "Preservação de Flores de Homenagem e Luto, Flores à Beira-Rio",
    description: isEN
      ? "Artisan preservation of memorial and funeral flowers into botanical art frames with museum anti-UV glass. Handmade with care in Coimbra, Portugal."
      : "Preservação artesanal de flores de cerimónias fúnebres em quadros de arte botânica com vidro museu anti-UV. Feito com todo o respeito em Coimbra.",
    provider: {
      "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
    },
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    serviceType: isEN ? "Memorial Flower Preservation" : "Preservação de Flores de Homenagem",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "7",
      bestRating: "5",
      worstRating: "1",
    },
    url: isEN ? `${SITE_URL}/en/preserve-memorial-flowers` : `${SITE_URL}/preservar-flores-luto-homenagem`,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lutoHomenagem.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/preserve-memorial-flowers` : `${SITE_URL}/preservar-flores-luto-homenagem`;

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
    alternates: buildAlternates("/preservar-flores-luto-homenagem"),
  };
}

export default async function LutoHomenagemPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <LutoHomenagemClient />
    </>
  );
}
