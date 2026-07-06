"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatDate } from "@/app/_lib/utils";
import "./ArticleClient.css";

// ─── Card artigo relacionado ──────────────────────────────────────────────────
function RelatedCard({ post, t }) {
  return (
    <a href={`/blog/${post.slug}`} className="related-card-link">
      <div className="related-card-img-wrap">
        <Image
          fill
          src={post.image}
          alt={post.imageAlt}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="related-card-img"
        />
      </div>
      <div className="related-card-body">
        <span className="related-card-time">{post.readTime} {t("minLeitura")}</span>
        <h3 className="related-card-title">{post.title}</h3>
        <p className="related-card-date">{formatDate(post.date)}</p>
      </div>
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ArticleClient({ post, related, children }) {
  const t = useTranslations("artigo");

  return (
    <div style={{ backgroundColor: "var(--cream)", overflowX: "clip" }}>

      {/* HERO — imagem full-bleed com overlay */}
      <section
        aria-label={post.title}
        style={{ position: "relative", height: "clamp(420px, 65vh, 700px)", overflow: "hidden", backgroundColor: "var(--sage)" }}
      >
        <Image
          fill
          src={post.image}
          alt={post.imageAlt}
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="article-hero-overlay" />

        {/* Conteúdo sobre a imagem */}
        <m.div
          className="hero-enter"
          style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(24px,5vw,60px) clamp(20px,5vw,48px)" }}
        >
          <div style={{ maxWidth: "800px" }}>
            {/* Breadcrumb */}
            <nav aria-label={t("breadcrumbAriaLabel")} style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <a href="/blog" className="breadcrumb-link-hero">{t("blogBreadcrumb")}</a>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }} aria-hidden="true">›</span>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", fontFamily: "Roboto, sans-serif" }}>{post.title}</span>
            </nav>

            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
              <span className="article-hero-category">{post.category}</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontFamily: "Roboto, sans-serif" }}>{post.readTime} {t("minLeitura")}</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontFamily: "Roboto, sans-serif" }}>{formatDate(post.date)}</span>
            </div>

            {/* Título */}
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.9rem, 5.5vw, 3.4rem)", color: "var(--cream)", margin: "0 0 14px", lineHeight: 1.08 }}>
              {post.title}
            </h1>

            {/* Descrição */}
            <p style={{ color: "rgba(255,255,255,0.76)", fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", lineHeight: 1.82, margin: 0 }}>
              {post.description}
            </p>
          </div>
        </m.div>
      </section>

      {/* CONTEÚDO MDX */}
      <article
        aria-label={`Conteúdo do artigo: ${post.title}`}
        style={{ maxWidth: "720px", margin: "clamp(48px,7vw,72px) auto clamp(60px,8vw,96px)", padding: "0 clamp(20px,5vw,48px)" }}
      >
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75 }}
        >
          {children}
        </m.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="tags-section">
            <span className="tags-label">{t("tags")}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        )}

        {/* Autor */}
        <div className="author-block">
          <div className="author-avatar" aria-hidden="true">
            <span className="author-initial">{post.author.charAt(0)}</span>
          </div>
          <div>
            <p className="author-name">{post.author}</p>
            <p className="author-label">{t("autor")}</p>
          </div>
        </div>
      </article>

      {/* ARTIGOS RELACIONADOS */}
      {related && related.length > 0 && (
        <section aria-label="Artigos relacionados" className="related-section">
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              style={{ marginBottom: "28px" }}
            >
              <span className="related-section-eyebrow">{t("continuaLer")}</span>
              <h2 className="related-section-title">{t("artigosRelacionados")}</h2>
            </m.div>

            <div className="related-grid">
              {related.map((p, i) => (
                <m.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <RelatedCard post={p} t={t} />
                </m.div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "36px" }}>
              <a href="/blog" className="view-all-link">{t("verTodos")}</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
