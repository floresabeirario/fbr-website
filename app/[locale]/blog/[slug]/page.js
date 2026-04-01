// app/[locale]/blog/[slug]/page.js
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/app/_lib/blog";
import ArticleClient from "@/app/blog/[slug]/ArticleClient";
import { mdxComponents } from "@/app/blog/[slug]/MdxComponents";
import { SITE_URL } from "@/app/_lib/constants";
import { buildBlogAlternates } from "@/app/_lib/metadata";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const locales = ["pt", "en"];
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: locale === "en" ? "Article not found | Flores à Beira-Rio" : "Artigo não encontrado | Flores à Beira-Rio" };

  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";

  return {
    title: `${post.title} | Flores à Beira-Rio`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${locale === "en" ? "/en" : ""}/blog/${post.slug}`,
      siteName: "Flores à Beira-Rio",
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      locale: ogLocale,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`],
    },
    alternates: buildBlogAlternates(post.slug),
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, post.tags);

  return (
    <ArticleClient post={post} related={related}>
      <MDXRemote source={post.content} components={mdxComponents} />
    </ArticleClient>
  );
}
