// app/[locale]/preservar-flores-pedido-casamento/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import PedidoCasamentoClient from "@/app/preservar-flores-pedido-casamento/PedidoCasamentoClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEN ? "Proposal Flower Preservation, Flores à Beira-Rio" : "Preservação de Flores de Pedido de Casamento, Flores à Beira-Rio",
    description: isEN
      ? "Artisan preservation of proposal flowers into botanical art frames with museum anti-UV glass. Handmade in Coimbra, Portugal."
      : "Preservação artesanal de flores de pedido de casamento em quadros de arte botânica com vidro museu anti-UV. Feito à mão em Coimbra.",
    provider: {
      "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
    },
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    serviceType: isEN ? "Proposal Flower Preservation" : "Preservação de Flores de Pedido de Casamento",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    url: isEN ? `${SITE_URL}/en/preserve-proposal-flowers` : `${SITE_URL}/preservar-flores-pedido-casamento`,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pedidoCasamento.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/preserve-proposal-flowers` : `${SITE_URL}/preservar-flores-pedido-casamento`;

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
    alternates: buildAlternates("/preservar-flores-pedido-casamento"),
  };
}

export default async function PedidoCasamentoPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <PedidoCasamentoClient />
    </>
  );
}
