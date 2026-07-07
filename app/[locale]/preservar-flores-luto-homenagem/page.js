// app/[locale]/preservar-flores-luto-homenagem/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates, buildBreadcrumbJsonLd } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import LutoHomenagemClient from "@/app/preservar-flores-luto-homenagem/LutoHomenagemClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  const canonicalUrl = isEN
    ? `${SITE_URL}/en/preserve-memorial-flowers`
    : `${SITE_URL}/preservar-flores-luto-homenagem`;

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
    name: isEN ? "Memorial Flower Preservation, Flores à Beira-Rio" : "Preservação de Flores de Homenagem e Luto, Flores à Beira-Rio",
    description: isEN
      ? "Artisan preservation of memorial and funeral flowers into botanical art frames with museum anti-UV glass. Handmade with care in Coimbra, Portugal."
      : "Preservação artesanal de flores de cerimónias fúnebres em quadros de arte botânica com vidro museu anti-UV. Feito com todo o respeito em Coimbra.",
    provider,
    areaServed: "Worldwide",
    serviceType: isEN ? "Memorial Flower Preservation" : "Preservação de Flores de Homenagem",
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
      ? "How to preserve memorial flowers in a botanical frame"
      : "Como preservar flores de homenagem num quadro botânico",
    description: isEN
      ? "Step-by-step process to turn memorial or funeral flowers into a lasting botanical art frame."
      : "Processo artesanal para preservar as flores de uma cerimónia de homenagem num quadro botânico.",
    step: isEN
      ? [
          { "@type": "HowToStep", position: 1, name: "Contact us within days of the ceremony", text: "Get in touch as soon as possible, ideally within 1 to 3 days of the ceremony (up to 6 days). The flowers are at their best for preservation." },
          { "@type": "HowToStep", position: 2, name: "Hand in the flowers", text: "Drop them off in person in Coimbra, send them by express courier, or request collection (subject to availability). We receive flowers Monday to Sunday." },
          { "@type": "HowToStep", position: 3, name: "Approve the composition", text: "We send photographs of the composition by email. You have 72 hours to approve or request changes." },
          { "@type": "HowToStep", position: 4, name: "Receive the framed piece", text: "The framed artwork is shipped with insurance and specialist packaging, worldwide." },
        ]
      : [
          { "@type": "HowToStep", position: 1, name: "Contactar nos primeiros dias após a cerimónia", text: "Entre em contacto assim que possível, idealmente nos primeiros 1 a 3 dias após a cerimónia (até 6 dias). As flores estão no ponto óptimo para preservação." },
          { "@type": "HowToStep", position: 2, name: "Entregar as flores", text: "Pode entregar em mãos em Coimbra, enviar por correio expresso, ou solicitar recolha (consulte disponibilidade). Recebemos de segunda a domingo." },
          { "@type": "HowToStep", position: 3, name: "Aprovar a composição", text: "Enviamos fotografias da composição por e-mail. Tem 72 horas para aprovar ou pedir alterações." },
          { "@type": "HowToStep", position: 4, name: "Receber o quadro em casa", text: "O quadro emoldurado é enviado com seguro e embalagem especializada para qualquer ponto do país." },
        ],
  };

  const faqPT = [
    { q: "Quando devo entregar as flores depois da cerimónia?", a: "O mais cedo possível, até 6 dias após a cerimónia. Quanto mais frescas as flores, melhor o resultado da prensagem. Se já passou tempo, contacte-nos: a recriação com flores semelhantes é uma alternativa possível." },
    { q: "Que tipo de flores se podem preservar?", a: "Qualquer tipo: coroas, ramos, ou flores enviadas pela família e amigos. Cada espécie reage de forma diferente à prensagem e adaptamos a técnica em conformidade." },
    { q: "Apenas fazem quadros, ou peças mais pequenas?", a: "Além do quadro principal, pode acrescentar à encomenda quadros mais pequenos e Pendentes para Colar feitos com as mesmas flores. Veja todas as opções e preços em " + SITE_URL + "/opcoes-e-precos" },
  ];

  const faqEN = [
    { q: "When should I hand in the flowers after the ceremony?", a: "As soon as possible, within 6 days of the ceremony. The fresher the flowers, the better the pressing result. If more time has passed, please contact us: recreation with similar flowers is also possible." },
    { q: "What types of flowers can be preserved?", a: "Any type: wreaths, bouquets, or flowers sent by family and friends. Each species reacts differently to pressing, and we adapt the technique accordingly." },
    { q: "Do you only make framed pieces, or smaller pieces too?", a: "In addition to the main frame, you can add smaller frames and Pendant Necklaces made from the same flowers to your order. See all options and prices at " + SITE_URL + "/en/options-and-pricing" },
  ];

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: (isEN ? faqEN : faqPT).map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  // Trilho Início > Momentos Especiais > página (sem @context: já vem do @graph)
  const { "@context": _bcCtx, ...breadcrumb } = buildBreadcrumbJsonLd(isEN
    ? [ { name: "Home", path: "/en" }, { name: "Special Moments", path: "/en/special-moments" }, { name: "Memorial Flowers", path: "/en/preserve-memorial-flowers" } ]
    : [ { name: "Início", path: "/" }, { name: "Momentos Especiais", path: "/momentos-especiais" }, { name: "Homenagem e Luto", path: "/preservar-flores-luto-homenagem" } ]);

  return {
    "@context": "https://schema.org",
    "@graph": [service, howTo, faqPage, breadcrumb],
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
    alternates: buildAlternates("/preservar-flores-luto-homenagem", locale),
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
