// app/[locale]/preservacao-de-flores/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import PreservacaoDeFloresClient from "@/app/preservacao-de-flores/PreservacaoDeFloresClient";

function buildSchema(locale) {
  const isEN = locale === "en";

  const provider = {
    "@type": "LocalBusiness",
    name: "Flores à Beira-Rio",
    url: SITE_URL,
    image: `${SITE_URL}/logo.webp`,
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
  };

  const service = {
    "@type": "Service",
    name: isEN ? "Flower Preservation, Flores à Beira-Rio" : "Preservação de Flores, Flores à Beira-Rio",
    description: isEN
      ? "Artisan botanical preservation of emotionally meaningful flowers. Wedding bouquets, baptism and memorial flowers transformed into frames with museum anti-UV glass. Atelier in Coimbra, with worldwide shipping."
      : "Preservação botânica artesanal de flores com valor emocional. Bouquets de casamento, flores de batizado e homenagem transformados em quadros de arte com vidro museu anti-UV. Atelier em Coimbra, com envio nacional e internacional.",
    provider,
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    serviceType: isEN ? "Flower Preservation" : "Preservação de Flores",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isEN ? "Preserved Flower Frames" : "Quadros de Flores Preservadas",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "30×40 cm" }, price: "300", priceCurrency: "EUR" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "40×50 cm" }, price: "400", priceCurrency: "EUR" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "50×70 cm" }, price: "500", priceCurrency: "EUR" },
      ],
    },
  };

  const howTo = {
    "@type": "HowTo",
    name: isEN
      ? "How to preserve flowers in a botanical art frame"
      : "Como preservar flores num quadro de arte botânica",
    description: isEN
      ? "The artisan process to turn meaningful flowers into a lasting framed piece, from booking to delivery."
      : "O processo artesanal para transformar flores com valor emocional num quadro duradouro, da reserva à entrega.",
    step: isEN
      ? [
          { "@type": "HowToStep", position: 1, name: "Book your date", text: "Get in touch as soon as possible, especially for weddings (May to September are limited)." },
          { "@type": "HowToStep", position: 2, name: "Hand in the flowers within 6 days", text: "Drop them off in person in Coimbra, send by express courier, or request collection. We receive flowers Monday to Sunday." },
          { "@type": "HowToStep", position: 3, name: "Approve the composition", text: "We send photographs of the composition by email. You have 72 hours to approve or request changes." },
          { "@type": "HowToStep", position: 4, name: "Receive the framed piece", text: "The framed artwork is shipped with insurance and specialist packaging, worldwide." },
        ]
      : [
          { "@type": "HowToStep", position: 1, name: "Reservar a data", text: "Entre em contacto assim que possível, especialmente para casamentos (Maio a Setembro são vagas limitadas)." },
          { "@type": "HowToStep", position: 2, name: "Entregar as flores em 6 dias", text: "Pode entregar em mãos em Coimbra, enviar por correio expresso, ou solicitar recolha. Recebemos de segunda a domingo." },
          { "@type": "HowToStep", position: 3, name: "Aprovar a composição", text: "Enviamos fotografias da composição por e-mail. Tem 72 horas para aprovar ou pedir alterações." },
          { "@type": "HowToStep", position: 4, name: "Receber o quadro em casa", text: "O quadro emoldurado é enviado com seguro e embalagem especializada, para Portugal e para o estrangeiro." },
        ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [service, howTo],
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "preservacao.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/flower-preservation` : `${SITE_URL}/preservacao-de-flores`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/joanaceu.webp`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/joanaceu.webp`,
    }),
    alternates: buildAlternates("/preservacao-de-flores", locale),
  };
}

export default async function PreservacaoDeFloresPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <PreservacaoDeFloresClient />
    </>
  );
}
