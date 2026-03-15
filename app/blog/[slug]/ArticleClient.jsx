"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/app/_lib/utils";
import "./ArticleClient.css";

// ─── Card artigo relacionado ──────────────────────────────────────────────────
function RelatedCard({ post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="related-card-link"
    >
      <div style={{ aspectRatio: "16/9", overflow: "hidden", backgroundColor: "#D4DECC" }}>
        <img src={post.image} alt={post.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
      </div>
      <div style={{ padding: "16px 18px 20px" }}>
        <span style={{ display: "inline-block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#3D6B5E", fontFamily: "Roboto, sans-serif", marginBottom: "8px" }}>
          {post.readTime} de leitura
        </span>
        <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem", color: "#1E2D2A", margin: "0 0 6px", lineHeight: 1.25 }}>
          {post.title}
        </h3>
        <p style={{ color: "#9BA89F", fontSize: "0.78rem", fontFamily: "Roboto, sans-serif", margin: 0 }}>
          {formatDate(post.date)}
        </p>
      </div>
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
// Recebe o MDX já renderizado como `children` (Server Component passado ao Client)
export default function ArticleClient({ post, related, children }) {
  return (
    <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden" }}>

      {/* HERO */}
      <section
        aria-label={post.title}
        style={{ paddingTop: "clamp(100px,14vw,150px)", paddingBottom: "clamp(40px,6vw,64px)", paddingLeft: "clamp(20px,5vw,48px)", paddingRight: "clamp(20px,5vw,48px)", background: "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)" }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <nav aria-label="Caminho" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <a href="/blog" className="breadcrumb-link">
                Blog
              </a>
              <span style={{ color: "#C8D4C0", fontSize: "0.72rem" }} aria-hidden="true">›</span>
              <span style={{ fontSize: "0.78rem", color: "#5A6B60", fontFamily: "Roboto, sans-serif" }}>{post.title}</span>
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "18px" }}>
              <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#3D6B5E", fontFamily: "Roboto, sans-serif", backgroundColor: "rgba(61,107,94,0.08)", padding: "5px 12px", borderRadius: "50px" }}>
                {post.category}
              </span>
              <span style={{ fontSize: "0.78rem", color: "#9BA89F", fontFamily: "Roboto, sans-serif" }}>{post.readTime} de leitura</span>
              <span style={{ fontSize: "0.78rem", color: "#9BA89F", fontFamily: "Roboto, sans-serif" }}>{formatDate(post.date)}</span>
            </div>

            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,6vw,3.6rem)", color: "#1E2D2A", margin: "0 0 18px", lineHeight: 1.08 }}>
              {post.title}
            </h1>
            <p style={{ color: "#5A6B60", fontSize: "clamp(1rem,2vw,1.12rem)", lineHeight: 1.85, margin: 0 }}>
              {post.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* IMAGEM DE CAPA */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 clamp(20px,5vw,48px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 16px 56px rgba(30,45,42,0.12)", aspectRatio: "16/7", backgroundColor: "#D4DECC" }}
        >
          <img src={post.image} alt={post.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="eager" />
        </motion.div>
      </div>

      {/* CONTEÚDO MDX — passado como children do Server Component */}
      <article
        aria-label={`Conteúdo do artigo: ${post.title}`}
        style={{ maxWidth: "720px", margin: "clamp(40px,6vw,64px) auto clamp(60px,8vw,96px)", padding: "0 clamp(20px,5vw,48px)" }}
      >
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.75 }}>
          {children}
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: "40px", paddingTop: "28px", borderTop: "1px solid rgba(61,107,94,0.1)", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#9BA89F", fontFamily: "Roboto, sans-serif", marginRight: "4px" }}>Tags:</span>
            {post.tags.map((tag) => (
              <span key={tag} style={{ fontSize: "0.72rem", color: "#5A6B60", fontFamily: "Roboto, sans-serif", backgroundColor: "rgba(61,107,94,0.07)", padding: "4px 12px", borderRadius: "50px", border: "1px solid rgba(61,107,94,0.12)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Autor */}
        <div style={{ marginTop: "32px", padding: "20px 22px", backgroundColor: "rgba(61,107,94,0.05)", borderRadius: "14px", display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#3D6B5E", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.1rem", color: "#FAF7F0" }} aria-hidden="true">
              {post.author.charAt(0)}
            </span>
          </div>
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.88rem", color: "#1E2D2A", fontFamily: "Roboto, sans-serif" }}>{post.author}</p>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "#9BA89F", fontFamily: "Roboto, sans-serif" }}>Flores à Beira-Rio, Coimbra</p>
          </div>
        </div>
      </article>

      {/* ARTIGOS RELACIONADOS */}
      {related && related.length > 0 && (
        <section
          aria-label="Artigos relacionados"
          style={{ padding: "clamp(48px,8vw,72px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} style={{ marginBottom: "28px" }}>
              <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#C4846B", marginBottom: "8px", fontFamily: "Roboto, sans-serif" }}>
                Continua a ler
              </span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.4rem,3.5vw,2rem)", color: "#1E2D2A", margin: 0 }}>
                Artigos relacionados
              </h2>
            </motion.div>
            <div className="related-grid">
              {related.map((p, i) => (
                <motion.div key={p.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                  <RelatedCard post={p} />
                </motion.div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "36px" }}>
              <a href="/blog" style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#3D6B5E", fontFamily: "Roboto, sans-serif", textDecoration: "none", borderBottom: "1px solid rgba(61,107,94,0.35)", paddingBottom: "2px" }}>
                Ver todos os artigos →
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
