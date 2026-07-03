// app/[locale]/page.js — Home
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import {
  SITE_URL, PHONE, EMAIL,
  SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_TIKTOK, SOCIAL_PINTEREST, SOCIAL_CASAMENTOS, SOCIAL_GOOGLE_BUSINESS,
} from "@/app/_lib/constants";
import HomeClient from "@/app/HomeClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "Flores à Beira-Rio",
      description: isEN
        ? "Artisan botanical preservation studio in Coimbra, Portugal. We transform wedding bouquets and special occasion flowers into framed botanical art that lasts decades."
        : "Atelier de preservação botânica artesanal em Coimbra. Transformamos bouquets de casamento e flores de momentos especiais em quadros de arte botânica que duram décadas.",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      image: `${SITE_URL}/og-homepage.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coimbra",
        addressRegion: "Centro",
        addressCountry: "PT",
      },
      geo: { "@type": "GeoCoordinates", latitude: "40.2033", longitude: "-8.4103" },
      openingHours: "Mo-Fr 10:00-18:00",
      areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
      priceRange: "€€€",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "7",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_TIKTOK, SOCIAL_PINTEREST, SOCIAL_CASAMENTOS, SOCIAL_GOOGLE_BUSINESS],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Flores à Beira-Rio",
      inLanguage: ["pt-PT", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    // VideoObject removido (decisão da Maria, sessão 123): o vídeo referenciado
    // vivia no Facebook e não está nesta página — o schema não rendia nada.
  ];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: locale === "en" ? `${SITE_URL}/en` : SITE_URL,
      imagePath: "/og-homepage.jpg",
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      imagePath: "/og-homepage.jpg",
    }),
    alternates: buildAlternates("/", locale),
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <HomeClient />
    </>
  );
}
