"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatDate } from "@/app/_lib/utils";
import "./BlogClient.css";

// ─── Card de artigo ───────────────────────────────────────────────────────────
function PostCard({ post, categoryLabels, index, t }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href={`/blog/${post.slug}`} className="post-card">
        <div className="post-card-img-wrap">
          <Image
            fill
            src={post.image}
            alt={post.imageAlt}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="post-card-img"
          />
          {post.featured && (
            <span className="post-card-featured-badge">{t("destaque")}</span>
          )}
        </div>
        <div className="post-card-body">
          <div className="post-card-meta">
            <span className="post-card-category">{categoryLabels[post.category] || post.category}</span>
            <span className="post-card-time">{post.readTime} {t("minLeitura")}</span>
          </div>
          <h2 className="post-card-title">{post.title}</h2>
          <p className="post-card-desc">{post.description}</p>
          <span className="post-card-date">{formatDate(post.date)}</span>
        </div>
      </a>
    </motion.article>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function BlogClient({ posts, categories, categoryLabels }) {
  const t = useTranslations("blog");
  const [activeCategory, setActiveCategory] = useState("todas");

  const filtered = useMemo(() => {
    if (activeCategory === "todas") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  const featured = posts.find((p) => p.featured);

  return (
    <div style={{ backgroundColor: "var(--cream)", overflowX: "clip" }}>

      {/* HERO */}
      <section
        aria-label={t("h1")}
        style={{ paddingTop: "clamp(130px,18vw,190px)", paddingBottom: "clamp(40px,6vw,64px)", paddingLeft: "clamp(20px,5vw,48px)", paddingRight: "clamp(20px,5vw,48px)", backgroundColor: "var(--cream)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
        >
          <div aria-hidden="true" className="hero-ornament" />
          <span className="hero-eyebrow">{t("eyebrow")}</span>
          <h1 className="hero-title">{t("h1")}</h1>
          <p className="hero-desc">{t("heroDesc")}</p>
        </motion.div>
      </section>

      {/* ARTIGO DESTAQUE */}
      {featured && (
        <section
          aria-label={t("artigoDestaque")}
          style={{ padding: "clamp(24px,4vw,48px) clamp(20px,5vw,48px) clamp(48px,7vw,64px)", backgroundColor: "var(--cream)" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <span className="featured-section-eyebrow">{t("artigoDestaque")}</span>
            <motion.a
              href={`/blog/${featured.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="featured-card"
              aria-label={`Ler artigo em destaque: ${featured.title}`}
            >
              <div className="featured-img-wrap">
                <Image
                  fill
                  src={featured.image}
                  alt={featured.imageAlt}
                  priority
                  sizes="100vw"
                  className="featured-img"
                />
                <div className="featured-overlay" />
                <div className="featured-content">
                  <div className="featured-meta">
                    <span className="featured-cat">{categoryLabels[featured.category] || featured.category}</span>
                    <span className="featured-time-label">{featured.readTime} {t("minLeitura")}</span>
                  </div>
                  <h2 className="featured-title">{featured.title}</h2>
                  <p className="featured-description">{featured.description}</p>
                  <div className="featured-footer">
                    <span className="featured-date-label">{formatDate(featured.date)}</span>
                    <span className="featured-read-label">{t("lerArtigo")} →</span>
                  </div>
                </div>
              </div>
            </motion.a>
          </div>
        </section>
      )}

      {/* LISTAGEM */}
      <section
        aria-label={t("todosArtigos")}
        style={{ padding: "clamp(12px,3vw,28px) clamp(20px,5vw,48px) clamp(72px,12vw,120px)", backgroundColor: "var(--cream)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="section-title">{t("todosArtigos")}</h2>
          <div className="tabs-row" role="tablist" aria-label={t("todosArtigos")}>
            <button
              role="tab"
              aria-selected={activeCategory === "todas"}
              className={`tab${activeCategory === "todas" ? " active" : ""}`}
              onClick={() => setActiveCategory("todas")}
            >
              {t("todos")} <span className="tab-count">{posts.length}</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`tab${activeCategory === cat.id ? " active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {categoryLabels[cat.id] || cat.id} <span className="tab-count">{cat.count}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "64px 20px", color: "var(--mid-l)" }}>
                  <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.3rem", marginBottom: "8px" }}>
                    {t("semArtigos")}
                  </p>
                  <button
                    onClick={() => setActiveCategory("todas")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--green)", fontWeight: 600, fontSize: "0.88rem", fontFamily: "Roboto, sans-serif", borderBottom: "1px solid rgba(61,107,94,0.35)", paddingBottom: "2px" }}
                  >
                    {t("verTodos")}
                  </button>
                </div>
              ) : (
                <div className="posts-grid">
                  {filtered.map((post, i) => (
                    <PostCard key={post.slug} post={post} categoryLabels={categoryLabels} index={i} t={t} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
