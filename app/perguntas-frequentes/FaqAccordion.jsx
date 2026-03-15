"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA, CATEGORIES } from "./faq-data";

const ACCENT = "#8B3A6B";
const ACCENT_LIGHT = "rgba(139,58,107,0.12)";
const ACCENT_BORDER = "rgba(139,58,107,0.25)";

const FAQItem = ({ faq, isOpen, onToggle, searchTerm }) => {
  const highlight = (text) => {
    if (!searchTerm || searchTerm.length < 2) return text;
    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: "rgba(139,58,107,0.18)", borderRadius: "3px", padding: "0 2px" }}>
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div style={{ borderBottom: "1px solid rgba(139,58,107,0.1)" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          padding: "clamp(18px,3vw,24px) 0",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: "16px",
        }}
      >
        <span style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(1rem,2.2vw,1.18rem)",
          color: isOpen ? ACCENT : "#1E2D2A",
          lineHeight: 1.3, flex: 1,
          transition: "color 0.22s ease",
        }}>
          {highlight(faq.q)}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          style={{
            flexShrink: 0,
            width: "clamp(30px,4vw,36px)", height: "clamp(30px,4vw,36px)",
            borderRadius: "50%",
            backgroundColor: isOpen ? ACCENT : ACCENT_LIGHT,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background-color 0.22s ease",
          }}
          aria-hidden="true"
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none"
            stroke={isOpen ? "#FAF7F0" : ACCENT}
            strokeWidth="2.2" strokeLinecap="round">
            <path d="M10 4V16M4 10H16" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              paddingBottom: "clamp(18px,3vw,24px)",
              color: "#5A6B60", lineHeight: 1.85,
              fontSize: "clamp(0.88rem,1.8vw,0.96rem)",
            }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FaqAccordion() {
  const [openIndex, setOpenIndex]           = useState(null);
  const [activeCategory, setActiveCategory] = useState("todas");
  const [search, setSearch]                 = useState("");

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const filtered = useMemo(() => {
    let list = activeCategory === "todas"
      ? FAQ_DATA
      : FAQ_DATA.filter(f => f.cat === activeCategory);

    if (search.trim().length >= 2) {
      const q = search.toLowerCase();
      list = list.filter(f =>
        f.q.toLowerCase().includes(q) || f.plain.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "44px 20px clamp(56px,8vw,88px)" }}>

      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        <input
          type="search"
          className="search-input"
          placeholder="Pesquisar uma dúvida..."
          value={search}
          onChange={e => { setSearch(e.target.value); setOpenIndex(null); }}
          aria-label="Pesquisar nas perguntas frequentes"
          autoComplete="off"
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch("")} aria-label="Limpar pesquisa">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </button>
        )}
      </div>

      <div className="pills-row" role="tablist" aria-label="Filtrar por categoria" style={{ marginBottom: "28px" }}>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            role="tab"
            aria-selected={activeCategory === c.id}
            className={`pill${activeCategory === c.id ? " active" : ""}`}
            onClick={() => { setActiveCategory(c.id); setOpenIndex(null); }}
          >
            {c.label}
            <span className="pill-count">{c.count}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.span
          key={`${activeCategory}-${search}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="result-count"
          aria-live="polite"
        >
          {filtered.length === 0
            ? "Nenhum resultado encontrado"
            : `${filtered.length} pergunta${filtered.length !== 1 ? "s" : ""}`}
        </motion.span>
      </AnimatePresence>

      <div role="list" aria-label="Perguntas e respostas">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                textAlign: "center", padding: "48px 20px",
                color: "#9BA89F", fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.2rem",
              }}
            >
              Nenhuma pergunta encontrada.<br />
              <span style={{ fontFamily: "'Google Sans', Roboto, sans-serif", fontSize: "0.88rem", color: "#B8A898" }}>
                Tente outra pesquisa ou{" "}
                <button
                  onClick={() => { setSearch(""); setActiveCategory("todas"); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: ACCENT, fontWeight: 600, fontSize: "0.88rem", padding: 0,
                    fontFamily: "'Google Sans', Roboto, sans-serif",
                    borderBottom: `1px solid ${ACCENT_BORDER}`,
                  }}
                >
                  ver todas as perguntas
                </button>
              </span>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {filtered.map((faq) => {
                const globalIndex = FAQ_DATA.indexOf(faq);
                return (
                  <div key={globalIndex} role="listitem">
                    <FAQItem
                      faq={faq}
                      isOpen={openIndex === globalIndex}
                      onToggle={() => toggle(globalIndex)}
                      searchTerm={search.trim()}
                    />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p style={{
          fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase",
          color: "#B8A898", fontFamily: "'Google Sans', Roboto, sans-serif",
          margin: "52px 0 0", textAlign: "center",
        }}>
          Explorar
        </p>
        <div className="related-grid">
          {[
            { href: "/como-funciona",   label: "Como Funciona",        desc: "O processo passo a passo da preservação" },
            { href: "/opcoes-e-precos", label: "Preços e Tamanhos",    desc: "Escolha a moldura e formato certos" },
            { href: "/recriacao",       label: "Recriação de Bouquet", desc: "Quando o tempo já passou" },
          ].map((l, i) => (
            <a key={i} href={l.href} className="related-card">
              <span style={{ display: "block", fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem", color: "#1E2D2A", marginBottom: "6px" }}>{l.label}</span>
              <span style={{ display: "block", fontSize: "0.82rem", color: "#5A6B60", lineHeight: 1.6 }}>{l.desc} →</span>
            </a>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
