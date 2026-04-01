// app/[locale]/recriacao/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import RecriacaoClient from "@/app/recriacao/RecriacaoClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN ? "Wedding Bouquet Recreation, Flores à Beira-Rio" : "Recriação de Bouquet de Noiva, Flores à Beira-Rio",
    description: isEN
      ? "Recreate your wedding bouquet with fresh flowers from a photograph, then preserve it in a botanical art frame with museum anti-UV glass. Handmade in Coimbra, Portugal."
      : "Recriação do bouquet de noiva com flores frescas a partir de uma fotografia, depois preservado em quadro de arte botânica com vidro museu anti-UV. Feito à mão em Coimbra.",
    provider: {
      "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
    },
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    serviceType: isEN ? "Bouquet Recreation and Preservation" : "Recriação e Preservação de Bouquet",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "300",
      description: isEN
        ? "From €300 for preservation and framing, plus fresh flower cost quoted separately."
        : "A partir de 300€ para preservação e moldura, mais o custo das flores frescas cotado separadamente.",
    },
    url: isEN ? `${SITE_URL}/en/bouquet-recreation` : `${SITE_URL}/recriacao`,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recriacao.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/bouquet-recreation` : `${SITE_URL}/recriacao`;

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
    alternates: buildAlternates("/recriacao"),
  };
}

export default async function RecriacaoPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <RecriacaoClient />
    </>
  );
}
