// app/[locale]/blog/[slug]/page.js
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/app/_lib/blog";
import ArticleClient from "@/app/blog/[slug]/ArticleClient";
import { mdxComponents } from "@/app/blog/[slug]/MdxComponents";
import { SITE_URL } from "@/app/_lib/constants";
import { buildBlogAlternates } from "@/app/_lib/metadata";

export async function generateStaticParams() {
  const ptPosts = getAllPosts("pt");
  const enPosts = getAllPosts("en");
  return [
    ...ptPosts.map((post) => ({ locale: "pt", slug: post.slug })),
    ...enPosts.map((post) => ({ locale: "en", slug: post.slug })),
  ];
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return { title: locale === "en" ? "Article not found | Flores à Beira-Rio" : "Artigo não encontrado | Flores à Beira-Rio" };

  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const ptSlug = locale === "pt" ? slug : post.ptSlug;
  const enSlug = locale === "en" ? slug : post.enSlug;

  return {
    title: `${post.title} | Flores à Beira-Rio`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${locale === "en" ? "/en" : ""}/blog/${slug}`,
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
    alternates: ptSlug && enSlug ? buildBlogAlternates(ptSlug, enSlug, locale) : undefined,
  };
}

function buildBlogPostingSchema(post, locale, slug) {
  const imageUrl = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;
  const postUrl = `${SITE_URL}${locale === "en" ? "/en" : ""}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Flores à Beira-Rio",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.webp` },
    },
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    keywords: post.tags.join(", "),
  };
}

export default async function ArticlePage({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, post.tags, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogPostingSchema(post, locale, slug)) }}
      />
      <ArticleClient post={post} related={related}>
        <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </ArticleClient>
    </>
  );
}
