// app/[locale]/blog/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL } from "@/app/_lib/constants";
import { getAllPosts, getCategories } from "@/app/_lib/blog";
import BlogClient from "@/app/blog/BlogClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/blog` : `${SITE_URL}/blog`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
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
    alternates: buildAlternates("/blog"),
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts      = getAllPosts(locale);
  const categories = getCategories(locale);
  const categoryLabels = t.raw("categorias");

  return (
    <BlogClient
      posts={posts}
      categories={categories}
      categoryLabels={categoryLabels}
    />
  );
}
