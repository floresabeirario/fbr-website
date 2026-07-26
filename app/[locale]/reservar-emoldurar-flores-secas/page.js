// app/[locale]/reservar-emoldurar-flores-secas/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import EmoldurarReservarClient from "@/app/emoldurar-flores-secas/EmoldurarReservarClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  const pageUrl = isEN
    ? `${SITE_URL}/en/book-dried-flower-framing`
    : `${SITE_URL}/reservar-emoldurar-flores-secas`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN
      ? "Frame Already-Dried Flowers, Flores à Beira-Rio"
      : "Emoldurar Flores Já Secas, Flores à Beira-Rio",
    description: isEN
      ? "Frame flowers that are already dried into botanical art. Frame the original bouquet, recreate it, or combine both. Handmade in Coimbra, Portugal."
      : "Emoldure flores que já estão secas em arte botânica. Emoldurar o ramo original, recriá-lo ou combinar os dois. Feito à mão em Coimbra.",
    provider: {
      "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
    },
    serviceType: isEN ? "Dried Flower Framing" : "Emoldurar Flores Secas",
    areaServed: "Worldwide",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "200",
      highPrice: "360",
      offerCount: "3",
    },
    url: pageUrl,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservarEmoldurar.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en"
    ? `${SITE_URL}/en/book-dried-flower-framing`
    : `${SITE_URL}/reservar-emoldurar-flores-secas`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/moldura-preta-flores-preservadas.webp`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/moldura-preta-flores-preservadas.webp`,
    }),
    alternates: buildAlternates("/reservar-emoldurar-flores-secas", locale),
  };
}

export default async function ReservarEmoldurarPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <EmoldurarReservarClient />
    </>
  );
}
