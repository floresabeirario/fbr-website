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
    <div style={{ borderBottom: "1px solid rgba(139,58,107,0.08)" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          padding: "clamp(16px,2.5vw,22px) 0",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: "16px",
        }}
      >
        <span style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(0.95rem,2vw,1.12rem)",
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
            width: "clamp(28px,3.5vw,34px)", height: "clamp(28px,3.5vw,34px)",
            borderRadius: "50%",
            backgroundColor: isOpen ? ACCENT : ACCENT_LIGHT,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background-color 0.22s ease",
          }}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none"
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
              paddingBottom: "clamp(16px,2.5vw,22px)",
              color: "#5A6B60", lineHeight: 1.85,
              fontSize: "clamp(0.87rem,1.7vw,0.94rem)",
            }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategorySection = ({ cat, faqs, openIndex, setOpenIndex, searchTerm, sectionIndex }) => {
  if (faqs.length === 0) return null;

  return (
    <motion.section
      aria-label={`Perguntas sobre ${cat.label}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: sectionIndex * 0.06 }}
      style={{ marginBottom: "clamp(40px,6vw,60px)" }}
    >
      {/* Category header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
        <h2 style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(1.1rem,2.5vw,1.4rem)",
          color: "#1E2D2A",
          margin: 0, lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}>
          {cat.label}
        </h2>
        <div style={{
          flex: 1, height: "1px",
          background: `linear-gradient(to right, ${ACCENT_BORDER}, transparent)`,
        }} aria-hidden="true" />
        <span style={{
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.5px",
          color: ACCENT, fontFamily: "'Google Sans', Roboto, sans-serif",
          opacity: 0.7,
        }} aria-hidden="true">
          {faqs.length}
        </span>
      </div>

      {/* FAQ items */}
      <div role="list" aria-label={`${cat.label} — perguntas`}>
        {faqs.map((faq) => {
          const globalIndex = FAQ_DATA.indexOf(faq);
          return (
            <div key={globalIndex} role="listitem">
              <FAQItem
                faq={faq}
                isOpen={openIndex === globalIndex}
                onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                searchTerm={searchTerm}
              />
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch]       = useState("");

  const isSearching = search.trim().length >= 2;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = search.toLowerCase();
    return FAQ_DATA.filter(f =>
      f.q.toLowerCase().includes(q) || f.plain.toLowerCase().includes(q)
    );
  }, [search, isSearching]);

  const categoriesWithFaqs = CATEGORIES.filter(c => c.id !== "todas").map(cat => ({
    cat,
    faqs: FAQ_DATA.filter(f => f.cat === cat.id),
  }));

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "44px 20px clamp(56px,8vw,88px)" }}>

      {/* Search */}
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

      {/* Search results */}
      {isSearching && (
        <AnimatePresence mode="wait">
          <motion.div
            key={search}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <span className="result-count" aria-live="polite">
              {searchResults.length === 0
                ? "Nenhum resultado encontrado"
                : `${searchResults.length} pergunta${searchResults.length !== 1 ? "s" : ""}`}
            </span>

            {searchResults.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "48px 20px",
                color: "#9BA89F", fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.2rem",
              }}>
                Nenhuma pergunta encontrada.<br />
                <button
                  onClick={() => setSearch("")}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: ACCENT, fontWeight: 600, fontSize: "0.88rem", padding: 0, marginTop: "8px",
                    fontFamily: "'Google Sans', Roboto, sans-serif",
                    borderBottom: `1px solid ${ACCENT_BORDER}`,
                  }}
                >
                  Ver todas as perguntas
                </button>
              </div>
            ) : (
              <div role="list">
                {searchResults.map((faq) => {
                  const globalIndex = FAQ_DATA.indexOf(faq);
                  return (
                    <div key={globalIndex} role="listitem">
                      <FAQItem
                        faq={faq}
                        isOpen={openIndex === globalIndex}
                        onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                        searchTerm={search.trim()}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Category sections (default view) */}
      {!isSearching && categoriesWithFaqs.map(({ cat, faqs }, i) => (
        <CategorySection
          key={cat.id}
          cat={cat}
          faqs={faqs}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          searchTerm=""
          sectionIndex={i}
        />
      ))}

      {/* Related links */}
      {!isSearching && (
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
      )}
    </div>
  );
}
