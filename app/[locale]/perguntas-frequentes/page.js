// app/[locale]/perguntas-frequentes/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL } from "@/app/_lib/constants";
import { FAQ_DATA } from "@/app/perguntas-frequentes/faq-data";
import { FAQ_DATA_EN } from "@/app/perguntas-frequentes/faq-data-en";
import PerguntasFrequentesClient from "@/app/perguntas-frequentes/PerguntasFrequentesClient";

function buildFaqSchema(locale) {
  const faqData = locale === "en" ? FAQ_DATA_EN : FAQ_DATA;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.plain },
    })),
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/faq` : `${SITE_URL}/perguntas-frequentes`;

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
    alternates: buildAlternates("/perguntas-frequentes", locale),
  };
}

export default async function PerguntasFrequentesPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(locale)) }}
      />
      <PerguntasFrequentesClient />
    </>
  );
}
