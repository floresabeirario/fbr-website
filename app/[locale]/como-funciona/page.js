// app/[locale]/como-funciona/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates, buildBreadcrumbJsonLd } from "@/app/_lib/metadata";
import { SITE_URL } from "@/app/_lib/constants";
import ComoFuncionaClient from "@/app/como-funciona/ComoFuncionaClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comoFunciona.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/how-it-works` : `${SITE_URL}/como-funciona`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/fotoquadro1.webp`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/fotoquadro1.webp`,
    }),
    alternates: buildAlternates("/como-funciona", locale),
  };
}

export default async function ComoFuncionaPage({ params }) {
  const { locale } = await params;
  const isEN = locale === "en";
  const selfPath = isEN ? "/en/how-it-works" : "/como-funciona";

  // O HowTo desta página já vive no ComoFuncionaClient (com custo, duração e
  // âncoras por passo) — aqui só acrescentamos o trilho de navegação.
  const schema = [
    buildBreadcrumbJsonLd([
      { name: isEN ? "Home" : "Início", path: isEN ? "/en" : "/" },
      { name: isEN ? "How It Works" : "Como Funciona", path: selfPath },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ComoFuncionaClient />
    </>
  );
}
