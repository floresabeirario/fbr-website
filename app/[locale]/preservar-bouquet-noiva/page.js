// app/[locale]/preservar-bouquet-noiva/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import BouquetNoivaClient from "@/app/preservar-bouquet-noiva/BouquetNoivaClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN ? "Wedding Bouquet Preservation, Flores à Beira-Rio" : "Preservação de Bouquet de Noiva, Flores à Beira-Rio",
    description: isEN
      ? "Artisan preservation of wedding bouquets into botanical art frames with museum anti-UV glass. Handmade in Coimbra, Portugal. Ships across Europe."
      : "Preservação artesanal de bouquets de noiva em quadros de arte botânica com vidro museu anti-UV. Feito à mão em Coimbra. Enviamos para toda a Europa.",
    provider: {
      "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
    },
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    serviceType: isEN ? "Wedding Bouquet Preservation" : "Preservação de Bouquet de Noiva",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    url: isEN ? `${SITE_URL}/en/preserve-wedding-bouquet` : `${SITE_URL}/preservar-bouquet-noiva`,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bouquetNoiva.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/preserve-wedding-bouquet` : `${SITE_URL}/preservar-bouquet-noiva`;

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
    alternates: buildAlternates("/preservar-bouquet-noiva"),
  };
}

export default async function BouquetNoivaPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <BouquetNoivaClient />
    </>
  );
}
