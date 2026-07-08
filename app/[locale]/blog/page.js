// app/[locale]/blog/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates, buildBreadcrumbJsonLd } from "@/app/_lib/metadata";
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
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/quadro-flores-prensadas-preservadas.webp`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/quadro-flores-prensadas-preservadas.webp`,
    }),
    alternates: buildAlternates("/blog", locale),
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const isEN = locale === "en";
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts      = getAllPosts(locale);
  const categories = getCategories(locale);
  const categoryLabels = t.raw("categorias");

  const blogPath = isEN ? "/en/blog" : "/blog";
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: t("meta.title"),
      description: t("meta.description"),
      url: `${SITE_URL}${blogPath}`,
      inLanguage: isEN ? "en" : "pt-PT",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${blogPath}/${p.slug}`,
          name: p.title,
        })),
      },
    },
    buildBreadcrumbJsonLd([
      { name: isEN ? "Home" : "Início", path: isEN ? "/en" : "/" },
      { name: "Blog", path: blogPath },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogClient
        posts={posts}
        categories={categories}
        categoryLabels={categoryLabels}
      />
    </>
  );
}
