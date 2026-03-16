"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA, CATEGORIES } from "./faq-data";

// ─── Accent colours per category ─────────────────────────────────────────────
const CAT_META = {
  processo:   { num: "01", color: "#3D6B5E", bg: "rgba(61,107,94,0.07)",   border: "rgba(61,107,94,0.18)"   },
  flores:     { num: "02", color: "#8B3A6B", bg: "rgba(139,58,107,0.07)",  border: "rgba(139,58,107,0.18)"  },
  entrega:    { num: "03", color: "#B85F3A", bg: "rgba(184,95,58,0.07)",   border: "rgba(184,95,58,0.18)"   },
  pagamentos: { num: "04", color: "#8A6B1E", bg: "rgba(138,107,30,0.07)",  border: "rgba(138,107,30,0.18)"  },
};

const ACCENT        = "#8B3A6B";
const ACCENT_BORDER = "rgba(139,58,107,0.25)";

// ─── Highlight helper ─────────────────────────────────────────────────────────
function highlight(text, searchTerm) {
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
}

// ─── Individual FAQ item ──────────────────────────────────────────────────────
const FAQItem = ({ faq, isOpen, onToggle, searchTerm, accentColor, itemIndex }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: itemIndex * 0.045, ease: [0.16, 1, 0.3, 1] }}
    style={{ borderBottom: "1px solid rgba(30,45,42,0.07)" }}
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      style={{
        width: "100%", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        padding: "clamp(14px,2.2vw,20px) 0",
        background: "none", border: "none", cursor: "pointer",
        textAlign: "left", gap: "16px",
      }}
    >
      <span style={{
        fontFamily: "'TAN-MEMORIES', serif",
        fontSize: "clamp(0.9rem,1.9vw,1.05rem)",
        color: isOpen ? accentColor : "#1E2D2A",
        lineHeight: 1.35, flex: 1,
        transition: "color 0.22s ease",
      }}>
        {highlight(faq.q, searchTerm)}
      </span>

      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{
          flexShrink: 0,
          width: "clamp(26px,3.2vw,32px)", height: "clamp(26px,3.2vw,32px)",
          borderRadius: "50%",
          backgroundColor: isOpen ? accentColor : `rgba(30,45,42,0.07)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background-color 0.22s ease",
        }}
        aria-hidden="true"
      >
        <svg width="11" height="11" viewBox="0 0 20 20" fill="none"
          stroke={isOpen ? "#FAF7F0" : "#5A6B60"}
          strokeWidth="2.4" strokeLinecap="round">
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
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div style={{
            paddingBottom: "clamp(14px,2.2vw,20px)",
            color: "#5A6B60", lineHeight: 1.88,
            fontSize: "clamp(0.85rem,1.6vw,0.92rem)",
          }}>
            {faq.a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ─── Category accordion block ─────────────────────────────────────────────────
const CategoryBlock = ({ cat, faqs, isOpen, onToggle, openFaqIndex, setOpenFaqIndex, sectionIndex }) => {
  const meta = CAT_META[cat.id] || { num: "0" + (sectionIndex + 1), color: ACCENT, bg: "rgba(139,58,107,0.07)", border: ACCENT_BORDER };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: sectionIndex * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginBottom: "4px",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${isOpen ? meta.border : "rgba(30,45,42,0.06)"}`,
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Category header — the accordion trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`cat-panel-${cat.id}`}
        className="cat-block-btn"
        style={{
          width: "100%",
          display: "flex", alignItems: "center", gap: "clamp(14px,2.5vw,24px)",
          padding: "clamp(20px,3vw,28px) clamp(20px,3vw,28px)",
          background: isOpen ? meta.bg : "rgba(250,247,240,0.6)",
          border: "none", cursor: "pointer", textAlign: "left",
          transition: "background 0.3s ease",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Large number */}
        <span style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(1.6rem,4vw,2.6rem)",
          color: isOpen ? meta.color : "rgba(30,45,42,0.18)",
          lineHeight: 1,
          flexShrink: 0,
          transition: "color 0.3s ease",
          letterSpacing: "-1px",
        }} aria-hidden="true">
          {meta.num}
        </span>

        {/* Category name */}
        <span style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(1.15rem,2.8vw,1.7rem)",
          color: isOpen ? "#1E2D2A" : "#3A4F4A",
          lineHeight: 1.1,
          flex: 1,
          transition: "color 0.3s ease",
        }}>
          {cat.label}
        </span>

        {/* Count + chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <span style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1.5px",
            color: isOpen ? meta.color : "#9BA89F",
            fontFamily: "'Google Sans', Roboto, sans-serif",
            background: isOpen ? `rgba(0,0,0,0.06)` : "rgba(30,45,42,0.05)",
            padding: "4px 10px", borderRadius: "100px",
            transition: "all 0.3s ease",
          }} aria-hidden="true">
            {faqs.length} perguntas
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{
              width: "clamp(30px,4vw,38px)", height: "clamp(30px,4vw,38px)",
              borderRadius: "50%",
              background: isOpen ? meta.color : "rgba(30,45,42,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.3s ease",
            }}
            aria-hidden="true"
          >
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none"
              stroke={isOpen ? "#FAF7F0" : "#5A6B60"}
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 7.5L10 12.5L15 7.5" />
            </svg>
          </motion.div>
        </div>
      </button>

      {/* FAQ items panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`cat-panel-${cat.id}`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              padding: "0 clamp(20px,3vw,28px) clamp(12px,2vw,20px)",
              borderTop: `1px solid ${meta.border}`,
            }}>
              {/* Coloured left-border accent stripe */}
              <div style={{
                borderLeft: `3px solid ${meta.color}`,
                paddingLeft: "clamp(16px,2.5vw,24px)",
                marginTop: "clamp(14px,2vw,20px)",
              }}>
                {faqs.map((faq, idx) => {
                  const globalIndex = FAQ_DATA.indexOf(faq);
                  return (
                    <FAQItem
                      key={globalIndex}
                      faq={faq}
                      isOpen={openFaqIndex === globalIndex}
                      onToggle={() => setOpenFaqIndex(openFaqIndex === globalIndex ? null : globalIndex)}
                      searchTerm=""
                      accentColor={meta.color}
                      itemIndex={idx}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function FaqAccordion() {
  const [openFaqIndex, setOpenFaqIndex]   = useState(null);
  const [openCatId, setOpenCatId]         = useState("processo"); // first open by default
  const [search, setSearch]               = useState("");

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

  const toggleCat = (catId) => {
    setOpenCatId(prev => prev === catId ? null : catId);
    setOpenFaqIndex(null);
  };

  return (
    <div style={{ maxWidth: "840px", margin: "0 auto", padding: "clamp(32px,5vw,56px) 20px clamp(56px,8vw,88px)" }}>

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
          onChange={e => { setSearch(e.target.value); setOpenFaqIndex(null); }}
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

      {/* ── Search results ── */}
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
                {searchResults.map((faq, idx) => {
                  const globalIndex = FAQ_DATA.indexOf(faq);
                  const meta = CAT_META[faq.cat] || { color: ACCENT };
                  return (
                    <div key={globalIndex} role="listitem">
                      <FAQItem
                        faq={faq}
                        isOpen={openFaqIndex === globalIndex}
                        onToggle={() => setOpenFaqIndex(openFaqIndex === globalIndex ? null : globalIndex)}
                        searchTerm={search.trim()}
                        accentColor={meta.color}
                        itemIndex={idx}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── Category accordion blocks ── */}
      {!isSearching && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {categoriesWithFaqs.map(({ cat, faqs }, i) => (
            <CategoryBlock
              key={cat.id}
              cat={cat}
              faqs={faqs}
              isOpen={openCatId === cat.id}
              onToggle={() => toggleCat(cat.id)}
              openFaqIndex={openFaqIndex}
              setOpenFaqIndex={setOpenFaqIndex}
              sectionIndex={i}
            />
          ))}
        </div>
      )}

      {/* ── Related links ── */}
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
            margin: "clamp(44px,6vw,64px) 0 0", textAlign: "center",
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
