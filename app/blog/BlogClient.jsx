"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatDate } from "@/app/_lib/utils";
import "./BlogClient.css";

// ─── Card de artigo ───────────────────────────────────────────────────────────
function PostCard({ post, categoryLabels, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <a
        href={`/blog/${post.slug}`}
        style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", color: "inherit" }}
        className="post-card"
      >
        {/* Imagem */}
        <div style={{ borderRadius: "16px 16px 0 0", overflow: "hidden", backgroundColor: "#D4DECC", aspectRatio: "16/10", flexShrink: 0, position: "relative" }}>
          <Image fill
            src={post.image}
            alt={post.imageAlt}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="post-card-img"
            style={{ objectFit: "cover", transition: "transform 0.65s ease" }}
          />
          {post.featured && (
            <div style={{ position: "absolute", top: "14px", left: "14px", backgroundColor: "#B8954A", color: "#FAF7F0", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", padding: "5px 12px", borderRadius: "50px" }}>
              Destaque
            </div>
          )}
        </div>

        {/* Corpo */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 22px 24px", backgroundColor: "#fff", borderRadius: "0 0 16px 16px", border: "1px solid rgba(61,107,94,0.08)", borderTop: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#3D6B5E", fontFamily: "Roboto, sans-serif", backgroundColor: "rgba(61,107,94,0.08)", padding: "4px 10px", borderRadius: "50px" }}>
              {categoryLabels[post.category] || post.category}
            </span>
            <span style={{ fontSize: "0.72rem", color: "#9BA89F", fontFamily: "Roboto, sans-serif" }}>
              {post.readTime} de leitura
            </span>
          </div>

          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.05rem, 2.2vw, 1.22rem)", color: "#1E2D2A", margin: "0 0 10px", lineHeight: 1.25, flex: "0 0 auto" }}>
            {post.title}
          </h2>

          <p style={{ color: "#5A6B60", fontSize: "0.88rem", lineHeight: 1.75, margin: "0 0 18px", flex: 1 }}>
            {post.description}
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(61,107,94,0.08)" }}>
            <span style={{ fontSize: "0.78rem", color: "#9BA89F", fontFamily: "Roboto, sans-serif" }}>
              {formatDate(post.date)}
            </span>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#3D6B5E", fontFamily: "Roboto, sans-serif" }}>
              Ler →
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function BlogClient({ posts, categories, categoryLabels }) {
  const [activeCategory, setActiveCategory] = useState("todas");

  const filtered = useMemo(() => {
    if (activeCategory === "todas") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  const featured = posts.find((p) => p.featured);

  return (
    <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden" }}>

      {/* HERO */}
      <section
        aria-label="Blog da Flores à Beira-Rio"
        style={{ paddingTop: "clamp(110px,16vw,170px)", paddingBottom: "clamp(52px,8vw,80px)", paddingLeft: "clamp(20px,5vw,48px)", paddingRight: "clamp(20px,5vw,48px)", background: "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)" }}
      >
        <div style={{ maxWidth: "700px" }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#C4846B", marginBottom: 14, fontFamily: "Roboto, sans-serif" }}>
              Do atelier para ti
            </span>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.8rem,9vw,5.5rem)", color: "#1E2D2A", margin: "0 0 18px", lineHeight: 1.02 }}>
              O nosso<br />
              <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>blog</em>
            </h1>
            <p style={{ color: "#5A6B60", fontSize: "clamp(0.95rem,2vw,1.06rem)", lineHeight: 1.88, maxWidth: "520px", margin: 0 }}>
              Dicas, guias e histórias sobre preservação botânica. Tudo o que precisas de saber para eternizar as tuas flores.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ARTIGO DESTAQUE */}
      {featured && (
        <section
          aria-label="Artigo em destaque"
          style={{ padding: "clamp(48px,8vw,72px) clamp(20px,5vw,48px)", backgroundColor: "#FAF7F0" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#B8954A", marginBottom: 20, fontFamily: "Roboto, sans-serif" }}>
              Artigo em destaque
            </span>
            <motion.a
              href={`/blog/${featured.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="featured-card"
              style={{ display: "block", textDecoration: "none", color: "inherit", backgroundColor: "#fff", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(61,107,94,0.08)", boxShadow: "0 8px 40px rgba(30,45,42,0.07)" }}
              aria-label={`Ler artigo em destaque: ${featured.title}`}
            >
              <div className="featured-grid">
                <div style={{ aspectRatio: "16/10", overflow: "hidden", backgroundColor: "#D4DECC", minHeight: "260px", position: "relative" }}>
                  <Image fill src={featured.image} alt={featured.imageAlt} priority sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: "cover", transition: "transform 0.65s ease" }} />
                </div>
                <div style={{ padding: "clamp(24px,4vw,48px) clamp(22px,4vw,48px) clamp(24px,4vw,48px) clamp(24px,3vw,32px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#3D6B5E", fontFamily: "Roboto, sans-serif", backgroundColor: "rgba(61,107,94,0.08)", padding: "4px 10px", borderRadius: "50px" }}>
                      {categoryLabels[featured.category] || featured.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#9BA89F", fontFamily: "Roboto, sans-serif" }}>
                      {featured.readTime} de leitura
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem,3.5vw,2.2rem)", color: "#1E2D2A", margin: "0 0 14px", lineHeight: 1.15 }}>
                    {featured.title}
                  </h2>
                  <p style={{ color: "#5A6B60", fontSize: "clamp(0.9rem,1.8vw,1rem)", lineHeight: 1.82, margin: "0 0 24px" }}>
                    {featured.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.78rem", color: "#9BA89F", fontFamily: "Roboto, sans-serif" }}>
                      {formatDate(featured.date)}
                    </span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#3D6B5E", fontFamily: "Roboto, sans-serif" }}>
                      Ler artigo →
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          </div>
        </section>
      )}

      {/* LISTAGEM COM FILTROS */}
      <section
        aria-label="Todos os artigos"
        style={{ padding: "clamp(16px,4vw,40px) clamp(20px,5vw,48px) clamp(72px,12vw,120px)", backgroundColor: "#FAF7F0" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.3rem,3vw,1.8rem)", color: "#1E2D2A", margin: 0 }}>
              Todos os artigos
            </h2>
            <div className="pills-row" role="tablist" aria-label="Filtrar por categoria">
              <button
                role="tab"
                aria-selected={activeCategory === "todas"}
                className={`pill${activeCategory === "todas" ? " active" : ""}`}
                onClick={() => setActiveCategory("todas")}
              >
                Todos
                <span className="pill-count">{posts.length}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`pill${activeCategory === cat.id ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {categoryLabels[cat.id] || cat.id}
                  <span className="pill-count">{cat.count}</span>
                </button>
              ))}
            </div>
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
                <div style={{ textAlign: "center", padding: "64px 20px", color: "#9BA89F" }}>
                  <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.3rem", marginBottom: "8px" }}>
                    Ainda não há artigos nesta categoria.
                  </p>
                  <button
                    onClick={() => setActiveCategory("todas")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#3D6B5E", fontWeight: 600, fontSize: "0.88rem", fontFamily: "Roboto, sans-serif", borderBottom: "1px solid rgba(61,107,94,0.35)", paddingBottom: "2px" }}
                  >
                    Ver todos os artigos
                  </button>
                </div>
              ) : (
                <div className="posts-grid">
                  {filtered.map((post, i) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      categoryLabels={categoryLabels}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
