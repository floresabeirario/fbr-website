// app/[locale]/preservar-flores-aniversario/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import AniversarioClient from "@/app/preservar-flores-aniversario/AniversarioClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  const canonicalUrl = isEN
    ? `${SITE_URL}/en/preserve-anniversary-flowers`
    : `${SITE_URL}/preservar-flores-aniversario`;

  const provider = {
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
  };

  const service = {
    "@type": "Service",
    name: isEN ? "Anniversary Flower Preservation, Flores à Beira-Rio" : "Preservação de Flores de Aniversário, Flores à Beira-Rio",
    description: isEN
      ? "Artisan preservation of anniversary flowers into botanical art frames with museum anti-UV glass. Handmade in Coimbra, Portugal."
      : "Preservação artesanal de flores de aniversário em quadros de arte botânica com vidro museu anti-UV. Feito à mão em Coimbra.",
    provider,
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    serviceType: isEN ? "Anniversary Flower Preservation" : "Preservação de Flores de Aniversário",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    url: canonicalUrl,
  };

  const howTo = {
    "@type": "HowTo",
    name: isEN
      ? "How to preserve anniversary flowers in a botanical frame"
      : "Como preservar flores de aniversário num quadro botânico",
    description: isEN
      ? "Step-by-step process to turn anniversary flowers into a lasting botanical art frame."
      : "Processo artesanal para preservar as flores de aniversário num quadro botânico.",
    step: isEN
      ? [
          { "@type": "HowToStep", position: 1, name: "Contact us within days of the anniversary", text: "Get in touch as soon as possible, ideally within 1 to 3 days of the anniversary (up to 6 days). The flowers are at their best for preservation." },
          { "@type": "HowToStep", position: 2, name: "Hand in the flowers", text: "Drop them off in person in Coimbra, send them by express courier, or request collection (subject to availability). We receive flowers Monday to Sunday." },
          { "@type": "HowToStep", position: 3, name: "Approve the composition", text: "We send photographs of the composition by email. You have 72 hours to approve or request changes." },
          { "@type": "HowToStep", position: 4, name: "Receive the framed piece", text: "The framed artwork is shipped with insurance and specialist packaging, worldwide." },
        ]
      : [
          { "@type": "HowToStep", position: 1, name: "Contactar nos primeiros dias após o aniversário", text: "Entre em contacto assim que possível, idealmente nos primeiros 1 a 3 dias após o aniversário (até 6 dias). As flores estão no ponto óptimo para preservação." },
          { "@type": "HowToStep", position: 2, name: "Entregar as flores", text: "Pode entregar em mãos em Coimbra, enviar por correio expresso, ou solicitar recolha (consulte disponibilidade). Recebemos de segunda a domingo." },
          { "@type": "HowToStep", position: 3, name: "Aprovar a composição", text: "Enviamos fotografias da composição por e-mail. Tem 72 horas para aprovar ou pedir alterações." },
          { "@type": "HowToStep", position: 4, name: "Receber o quadro em casa", text: "O quadro emoldurado é enviado com seguro e embalagem especializada para qualquer ponto do país." },
        ],
  };

  const faqPT = [
    { q: "Quando devo entregar as flores depois do aniversário?", a: "O mais cedo possível, até 6 dias após o aniversário. Quanto mais frescas as flores, melhor o resultado da prensagem." },
    { q: "Que tipo de flores se podem preservar?", a: "Qualquer tipo: ramos oferecidos, arranjos da celebração, ou flores compradas para a ocasião. Cada espécie reage de forma diferente à prensagem e adaptamos a técnica em conformidade." },
    { q: "Apenas fazem quadros, ou peças mais pequenas?", a: "Além do quadro principal, pode acrescentar à encomenda Ornamentos de Natal, quadros mais pequenos e Pendentes para Colar feitos com as mesmas flores. Veja todas as opções e preços em " + SITE_URL + "/opcoes-e-precos" },
  ];

  const faqEN = [
    { q: "When should I hand in the flowers after the anniversary?", a: "As soon as possible, within 6 days of the anniversary. The fresher the flowers, the better the pressing result." },
    { q: "What types of flowers can be preserved?", a: "Any type: bouquets received as gifts, arrangements from the celebration, or flowers bought for the occasion. Each species reacts differently to pressing, and we adapt the technique accordingly." },
    { q: "Do you only make framed pieces, or smaller pieces too?", a: "In addition to the main frame, you can add Christmas Ornaments, smaller frames, and Pendant Necklaces made from the same flowers to your order. See all options and prices at " + SITE_URL + "/en/options-and-pricing" },
  ];

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: (isEN ? faqEN : faqPT).map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [service, howTo, faqPage],
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aniversario.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/preserve-anniversary-flowers` : `${SITE_URL}/preservar-flores-aniversario`;

  return {
    title: t("title"),
    description: t("description"),
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
    alternates: buildAlternates("/preservar-flores-aniversario", locale),
  };
}

export default async function AniversarioPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <AniversarioClient />
    </>
  );
}
