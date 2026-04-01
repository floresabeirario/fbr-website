// app/[locale]/page.js — Home
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL } from "@/app/_lib/constants";
import HomeClient from "@/app/HomeClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
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
    alternates: buildAlternates("/"),
  };
}

export default function HomePage() {
  return <HomeClient />;
}
