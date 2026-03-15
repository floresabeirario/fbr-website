// app/blog/[slug]/page.js
// Server Component — renderiza MDX directamente no servidor com next-mdx-remote/rsc

import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "../../_lib/blog";
import ArticleClient from "./ArticleClient";
import { mdxComponents } from "./MdxComponents";
import { SITE_URL } from "../../_lib/constants";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado | Flores à Beira-Rio" };

  return {
    title: `${post.title} | Flores à Beira-Rio`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: "Flores à Beira-Rio",
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      locale: "pt_PT",
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
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
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
