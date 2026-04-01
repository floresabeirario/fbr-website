// app/[locale]/reservar-preservacao/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import ReservarPreservacaoClient from "@/app/reservar-preservacao/ReservarPreservacaoClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  const pageUrl = isEN ? `${SITE_URL}/en/book-preservation` : `${SITE_URL}/reservar-preservacao`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN ? "Book Flower Preservation, Flores à Beira-Rio" : "Reservar Preservação de Flores, Flores à Beira-Rio",
    description: isEN
      ? "Reserve your flower preservation with Flores à Beira-Rio. Wedding bouquets, memorial flowers, and other special blooms preserved into botanical art frames. Handmade in Coimbra, Portugal."
      : "Reserve a sua preservação de flores com a Flores à Beira-Rio. Bouquets de noiva, flores de homenagem e outras flores especiais preservadas em quadros de arte botânica. Feito à mão em Coimbra.",
    provider: {
      "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coimbra",
        addressCountry: "PT",
      },
    },
    serviceType: isEN ? "Flower Preservation" : "Preservação de Flores",
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: pageUrl,
        inLanguage: isEN ? "en" : "pt",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: isEN ? "Flower Preservation Reservation" : "Reserva de Preservação de Flores",
      },
    },
    url: pageUrl,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservar.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/book-preservation` : `${SITE_URL}/reservar-preservacao`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/moldurapreta.webp`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/moldurapreta.webp`,
    }),
    alternates: buildAlternates("/reservar-preservacao"),
  };
}

export default async function ReservarPreservacaoPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <ReservarPreservacaoClient />
    </>
  );
}
