// app/[locale]/preservar-flores-batizado-nascimento/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import BatizadoNascimentoClient from "@/app/preservar-flores-batizado-nascimento/BatizadoNascimentoClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN ? "Baptism & Birth Flower Preservation, Flores à Beira-Rio" : "Preservação de Flores de Batizado e Nascimento, Flores à Beira-Rio",
    description: isEN
      ? "Artisan preservation of baptism and birth flowers into botanical art frames with museum anti-UV glass. Handmade in Coimbra, Portugal."
      : "Preservação artesanal de flores de batizado e nascimento em quadros de arte botânica com vidro museu anti-UV. Feito à mão em Coimbra.",
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
    serviceType: isEN ? "Baptism Flower Preservation" : "Preservação de Flores de Batizado",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    url: isEN ? `${SITE_URL}/en/preserve-baptism-flowers` : `${SITE_URL}/preservar-flores-batizado-nascimento`,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "batizadoNascimento.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/preserve-baptism-flowers` : `${SITE_URL}/preservar-flores-batizado-nascimento`;

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
    alternates: buildAlternates("/preservar-flores-batizado-nascimento"),
  };
}

export default async function BatizadoNascimentoPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <BatizadoNascimentoClient />
    </>
  );
}
