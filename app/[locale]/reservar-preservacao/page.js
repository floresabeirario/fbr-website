// app/[locale]/reservar-preservacao/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL } from "@/app/_lib/constants";
import ReservarPreservacaoClient from "@/app/reservar-preservacao/ReservarPreservacaoClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservar.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/book-preservation` : `${SITE_URL}/reservar-preservacao`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/moldurapreta.webp`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/moldurapreta.webp`,
    }),
    alternates: buildAlternates("/reservar-preservacao"),
  };
}

export default function ReservarPreservacaoPage() {
  return <ReservarPreservacaoClient />;
}
