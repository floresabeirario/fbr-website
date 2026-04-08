// app/_lib/blog.js
// Funções para ler e processar os artigos MDX da pasta content/blog/

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getBlogDir(locale) {
  return path.join(BLOG_DIR, locale);
}

// ─── Ler todos os artigos (para listagem e sitemap) ───────────────────────────
export function getAllPosts(locale = "pt") {
  const dir = getBlogDir(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.reduce((acc, filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(dir, filename);

    try {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      acc.push({
        slug,
        title:       data.title       || "Sem título",
        description: data.description || "",
        date:        data.date        || "",
        category:    data.category    || "geral",
        tags:        data.tags        || [],
        image:       data.image       || "/fotoquadro1.webp",
        imageAlt:    data.imageAlt    || data.title || "",
        author:      data.author      || "Flores à Beira-Rio",
        readTime:    data.readTime    || "5 min",
        featured:    data.featured    || false,
        enSlug:      data.enSlug      || null,
        ptSlug:      data.ptSlug      || null,
      });
    } catch (err) {
      console.error(`[blog] Erro ao ler o ficheiro "${filename}":`, err.message);
    }

    return acc;
  }, []);

  // Ordenar do mais recente para o mais antigo
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ─── Ler um artigo pelo slug (para página individual) ─────────────────────────
export function getPostBySlug(slug, locale = "pt") {
  const dir = getBlogDir(locale);
  const fullPath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title:       data.title       || "Sem título",
      description: data.description || "",
      date:        data.date        || "",
      category:    data.category    || "geral",
      tags:        data.tags        || [],
      image:       data.image       || "/fotoquadro1.webp",
      imageAlt:    data.imageAlt    || data.title || "",
      author:      data.author      || "Flores à Beira-Rio",
      readTime:    data.readTime    || "5 min",
      featured:    data.featured    || false,
      enSlug:      data.enSlug      || null,
      ptSlug:      data.ptSlug      || null,
      content,
    };
  } catch (err) {
    console.error(`[blog] Erro ao ler o artigo "${slug}":`, err.message);
    return null;
  }
}

// ─── Artigos relacionados (mesma categoria ou tags em comum) ──────────────────
export function getRelatedPosts(currentSlug, category, tags = [], locale = "pt", limit = 3) {
  const all = getAllPosts(locale).filter((p) => p.slug !== currentSlug);

  // Pontuação: mesma categoria = 2 pts, cada tag em comum = 1 pt
  const scored = all.map((post) => {
    let score = 0;
    if (post.category === category) score += 2;
    tags.forEach((tag) => {
      if (post.tags.includes(tag)) score += 1;
    });
    return { ...post, score };
  });

  return scored
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

// ─── Categorias únicas com contagem ──────────────────────────────────────────
export function getCategories(locale = "pt") {
  const posts = getAllPosts(locale);
  const map = {};

  posts.forEach((p) => {
    map[p.category] = (map[p.category] || 0) + 1;
  });

  return Object.entries(map).map(([id, count]) => ({ id, count }));
}

// ─── Labels das categorias ────────────────────────────────────────────────────
export const CATEGORY_LABELS = {
  processo:    "Processo",
  cuidados:    "Cuidados",
  casamento:   "Casamento",
  sustentabilidade: "Sustentabilidade",
  presentes:   "Presentes",
  historias:   "Histórias",
  geral:       "Geral",
  // EN categories
  process:     "Process",
  care:        "Care",
  wedding:     "Wedding",
  sustainability: "Sustainability",
  gifts:       "Gifts",
  stories:     "Stories",
  general:     "General",
};
