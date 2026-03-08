// app/blog/page.js
// Server Component — lê os artigos no servidor, passa para o Client

import { getAllPosts, getCategories, CATEGORY_LABELS } from "../_lib/blog";
import BlogClient from "./BlogClient";
import { SITE_URL } from "../_lib/constants";

export const metadata = {
  title: "Blog | Flores à Beira-Rio — Preservação de Flores",
  description:
    "Dicas, guias e histórias sobre preservação botânica de flores. Aprende como funciona o processo, como cuidar do teu quadro e muito mais.",
  keywords: [
    "blog preservação flores",
    "dicas bouquet casamento",
    "como preservar flores",
    "guia flores prensadas",
    "flores à beira-rio blog",
  ],
  openGraph: {
    title: "Blog | Flores à Beira-Rio",
    description:
      "Dicas, guias e histórias sobre preservação botânica de flores.",
    url: `${SITE_URL}/blog`,
    siteName: "Flores à Beira-Rio",
    images: [
      {
        url: `${SITE_URL}/fotoquadro1.webp`,
        width: 1200,
        height: 630,
        alt: "Blog Flores à Beira-Rio — Preservação de Flores",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Flores à Beira-Rio",
    description: "Dicas, guias e histórias sobre preservação botânica de flores.",
    images: [`${SITE_URL}/fotoquadro1.webp`],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  const posts      = getAllPosts();
  const categories = getCategories();

  return (
    <BlogClient
      posts={posts}
      categories={categories}
      categoryLabels={CATEGORY_LABELS}
    />
  );
}
