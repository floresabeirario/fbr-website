// app/[locale]/enviar-flores-por-correio/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates, buildBreadcrumbJsonLd } from "@/app/_lib/metadata";
import { SITE_URL } from "@/app/_lib/constants";
import EnviarFloresClient from "@/app/enviar-flores-por-correio/EnviarFloresClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enviarCorreio.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en"
    ? `${SITE_URL}/en/how-to-ship-your-flowers`
    : `${SITE_URL}/enviar-flores-por-correio`;

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
    alternates: buildAlternates("/enviar-flores-por-correio", locale),
  };
}

export default async function EnviarFloresPage({ params }) {
  const { locale } = await params;
  const isEN = locale === "en";
  const selfPath = isEN ? "/en/how-to-ship-your-flowers" : "/enviar-flores-por-correio";

  // O HowTo desta página já vive no EnviarFloresClient (gerado dos passos
  // reais do guia) — aqui só acrescentamos o trilho de navegação.
  const schema = [
    buildBreadcrumbJsonLd([
      { name: isEN ? "Home" : "Início", path: isEN ? "/en" : "/" },
      { name: isEN ? "How to Ship Your Flowers" : "Enviar Flores por Correio", path: selfPath },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EnviarFloresClient />
    </>
  );
}
