"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

import { TRACKING_URL } from "../_lib/constants";
import { PRECO_EMOLDURAR_30x40, PRECO_EMOLDURAR_40x50, PRECO_EMOLDURAR_50x70 } from "../_lib/precos";
import "./EmoldurarFloresSecasClient.css";

const C = {
  creme:   "var(--cream)",
  creEsc:  "#EFF4F7",
  escuro:  "var(--dark)",
  sec:     "var(--mid)",
  azul:    "#1B4B6B",
  azulClr: "#5A8FA8",
  terra:   "var(--terra)",
  branco:  "#FFFFFF",
};

function Reveal({ children, delay = 0, y = 28, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={style} className={className}
    >{children}</motion.div>
  );
}

function Eyebrow({ children, light, color }) {
  return (
    <p style={{
      fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase",
      color: color || (light ? "rgba(250,247,240,0.5)" : C.terra),
      fontFamily: "'Google Sans', sans-serif", margin: "0 0 16px", fontWeight: 700,
    }}>{children}</p>
  );
}

function Divider({ light }) {
  return (
    <div aria-hidden="true" style={{
      width: "44px", height: "1px", margin: "0 auto",
      background: `linear-gradient(to right, transparent, ${light ? "rgba(250,247,240,0.35)" : C.terra}, transparent)`,
    }} />
  );
}

// SVG Opção 1 — flor com vidro sobre vidro (com reflexos de vidro e sem bouquet)
function SVGOpcao1({ width = "180px" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"
      style={{ width, maxWidth: "100%", height: "auto", display: "block", margin: "0 auto 1.2rem" }}
      aria-label="Ilustração moldura flores secas">
      <rect x="10" y="10" width="380" height="480" rx="3" ry="3" stroke="#b0a8a1" strokeWidth="4" fill="none"/>
      <rect x="30" y="30" width="340" height="440" rx="1.5" ry="1.5" stroke="#b0a8a1" strokeWidth="1.5" fill="none"/>
      <line x1="30" y1="30" x2="60" y2="60" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="370" y1="30" x2="340" y2="60" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="470" x2="60" y2="440" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="370" y1="470" x2="340" y2="440" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="60" y="60" width="280" height="380" stroke="#b0a8a1" strokeWidth="1" fill="none"/>
      <line x1="100" y1="180" x2="220" y2="60" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="250" y1="400" x2="330" y2="320" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="280" y1="430" x2="300" y2="410" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <g transform="translate(200, 250) scale(1.8) translate(-100, -125)">
        <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
          stroke="#b0a8a1" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
          stroke="#b0a8a1" strokeWidth="1" strokeLinecap="round"/>
        <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)" stroke="#b0a8a1" strokeWidth="1.5" fill="none"/>
      </g>
    </svg>
  );
}

// SVG Opção 2/3 — composição mista com linhas decorativas
function SVGOpcao2({ width = "180px" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"
      style={{ width, maxWidth: "100%", height: "auto", display: "block", margin: "0 auto 1.2rem" }}
      aria-label="Ilustração moldura composição">
      <rect x="20" y="20" width="360" height="460" stroke="#b0a8a1" strokeWidth="2.5" fill="none"/>
      <rect x="35" y="35" width="330" height="430" stroke="#b0a8a1" strokeWidth="1.5" fill="none"/>
      <line x1="60" y1="145" x2="155" y2="50" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="100" y1="180" x2="220" y2="60" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="250" y1="400" x2="330" y2="320" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="280" y1="430" x2="300" y2="410" stroke="#b0a8a1" strokeWidth="1.5" strokeLinecap="round"/>
      <g transform="translate(200, 250) scale(1.8) translate(-100, -125)">
        <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
          stroke="#b0a8a1" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
          stroke="#b0a8a1" strokeWidth="1" strokeLinecap="round"/>
        <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)" stroke="#b0a8a1" strokeWidth="1.5" fill="none"/>
      </g>
    </svg>
  );
}

// SVG Opção 1 versão fundo escuro — stroke colorido por acento
function SVGOpcao1Escuro({ width = "120px", accent = "#5A8FA8" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"
      style={{ width, maxWidth: "100%", height: "auto", display: "block" }}
      aria-hidden="true">
      <rect x="10" y="10" width="380" height="480" rx="3" ry="3" stroke={accent} strokeWidth="4" fill="none" strokeOpacity="0.55"/>
      <rect x="30" y="30" width="340" height="440" rx="1.5" ry="1.5" stroke={accent} strokeWidth="1.5" fill="none" strokeOpacity="0.3"/>
      <line x1="30" y1="30" x2="60" y2="60" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/>
      <line x1="370" y1="30" x2="340" y2="60" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/>
      <line x1="30" y1="470" x2="60" y2="440" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/>
      <line x1="370" y1="470" x2="340" y2="440" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/>
      <rect x="60" y="60" width="280" height="380" stroke={accent} strokeWidth="1" fill="none" strokeOpacity="0.2"/>
      <line x1="100" y1="180" x2="220" y2="60" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.2"/>
      <line x1="250" y1="400" x2="330" y2="320" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.2"/>
      <line x1="280" y1="430" x2="300" y2="410" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.2"/>
      <g transform="translate(200, 250) scale(1.8) translate(-100, -125)">
        <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
          stroke={accent} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.8"/>
        <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
          stroke={accent} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.55"/>
        <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)" stroke={accent} strokeWidth="1.5" fill="none" strokeOpacity="0.8"/>
      </g>
    </svg>
  );
}

const OPCOES_VISUAL = [
  { cor: C.azul,    svg: "op1" },
  { cor: C.terra,   svg: "op2" },
  { cor: C.azulClr, svg: "op2" },
];

const precos = [
  { size: "30 × 40 cm", price: `${PRECO_EMOLDURAR_30x40}€`, svgW: "80px" },
  { size: "40 × 50 cm", price: `${PRECO_EMOLDURAR_40x50}€`, svgW: "96px" },
  { size: "50 × 70 cm", price: `${PRECO_EMOLDURAR_50x70}€`, svgW: "112px" },
];

function FAQItem({ faq, i }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.06}>
      <div style={{ borderBottom: "1px solid rgba(15,30,26,0.09)" }}>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", textAlign: "left", background: "none", border: "none",
          padding: "22px 0", cursor: "pointer", display: "flex",
          justifyContent: "space-between", alignItems: "center", gap: "16px",
        }}>
          <span style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 500, color: C.escuro, fontSize: "0.95rem", lineHeight: 1.5 }}>{faq.q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
            style={{ color: C.azul, fontSize: "1.4rem", flexShrink: 0, display: "inline-block", lineHeight: 1 }}>+</motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
              <p style={{ color: C.sec, fontSize: "0.9rem", lineHeight: 1.9, padding: "0 0 22px", margin: 0, fontWeight: 300 }}>
                {faq.a}
                {faq.aLinkHref && (
                  <>{" "}<a href={faq.aLinkHref} style={{ color: C.azul, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "2px" }}>{faq.aLinkLabel}</a>{faq.aAfter}</>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function EmoldurarFloresSecasClient() {
  const t = useTranslations("emoldurar");
  const locale = useLocale();
  const OPCOES_TEXT = t.raw("opcoes");
  const PROCESSO_TEXT = t.raw("processo");
  const VIDRO_FEATURES = t.raw("vidroFeatures");
  const PAGAMENTO_TEXT = t.raw("pagamento");
  const FAQS = t.raw("faqs");
  const NAV_SQUARES = t.raw("navSquares");

  const contactosHref = locale === "en" ? "/en/contact" : "/contactos";

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.38], [0, 28]);

  return (
    <div style={{ backgroundColor: C.creme, fontFamily: "'Google Sans', sans-serif", color: C.escuro, overflowX: "clip" }}>

      {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="hero-wrap" aria-label={t("heroH1")}>
        <div className="hero-bg">
          <Image fill src="/quadrovidrosobrevidro.webp" alt="Quadro de flores secas emoldurado com vidro museu anti-UV" priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <motion.div className="hero-content" style={{ opacity: heroOpacity, y: heroY }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: "640px", margin: "0 auto" }}
          >
            <p style={{
              fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase",
              color: "rgba(250,247,240,0.82)", fontFamily: "'Google Sans', sans-serif",
              margin: "0 0 20px", fontWeight: 500,
            }}>{t("heroEyebrow")}</p>
            <h1 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2.4rem,6vw,5rem)",
              color: C.creme,
              margin: "0 0 clamp(1rem,2.5vw,1.6rem)",
              lineHeight: 1.05,
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}>
              {t("heroH1")}<br />
              <em style={{ fontStyle: "italic", color: "#A8C4D4" }}>{t("heroH1em")}</em>
            </h1>
            <p style={{
              fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.88, maxWidth: "480px",
              color: "rgba(250,247,240,0.86)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight: 300, textShadow: "0 2px 16px rgba(0,0,0,0.4)",
            }}>
              {t("heroDesc")}
            </p>
            <div className="cta-row" style={{ justifyContent: "center", marginBottom: "1.6rem" }}>
              <a href={contactosHref} className="btn-ghost-light">{t("heroCta")}</a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ 2. TRÊS OPÇÕES ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creEsc, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-opcoes">
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <Eyebrow>{t("opcoesEyebrow")}</Eyebrow>
              <h2 id="h2-opcoes" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.escuro, margin: 0, lineHeight: 1.1 }}>
                {t("opcoesH2")}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="opcao-grid" role="list">
              {OPCOES_VISUAL.map((vis, i) => {
                const item = OPCOES_TEXT[i];
                return (
                  <article key={i} className="opcao-item" role="listitem">
                    {vis.svg === "op1" ? <SVGOpcao1 width="160px" /> : <SVGOpcao2 width="160px" />}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                      <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.1rem", color: vis.cor, lineHeight: 1 }}>{item.n}</span>
                      <div style={{ flex: 1, height: "1px", background: `${vis.cor}2A` }} aria-hidden="true" />
                    </div>
                    <p style={{ fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase", color: vis.cor, fontFamily: "'Google Sans', sans-serif", margin: "0 0 10px", fontWeight: 700 }}>{item.sub}</p>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.1rem,2.2vw,1.4rem)", color: C.escuro, margin: "0 0 0.7rem", lineHeight: 1.15 }}>{item.titulo}</h3>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: C.sec, margin: "0 0 0.8rem", fontWeight: 300 }}>{item.desc}</p>
                    <p style={{ fontSize: "0.77rem", color: C.azulClr, margin: "0 0 0.9rem", fontStyle: "italic" }}>{item.detalhe}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ fontSize: "0.72rem", color: C.sec }}>{t("producaoLabel")} <strong style={{ color: vis.cor }}>{item.time}</strong></span>
                      {item.linkHref && (
                        <a href={item.linkHref} className="hover-border-full" style={{ fontSize: "0.74rem", fontWeight: 600, color: vis.cor, textDecoration: "none", borderBottom: `1px solid ${vis.cor}40`, paddingBottom: "1px", transition: "border-color 0.2s" }}
                        >{item.linkLabel} →</a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 3. FOTOGRAFIA — fundo com imagem ═════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "380px", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image fill src="/photowedding.webp" alt="Casamento" sizes="100vw" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,22,40,0.80) 0%, rgba(10,22,40,0.50) 55%, rgba(10,22,40,0.25) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", maxWidth: "600px", margin: "0 auto", textAlign: "center", width: "100%" }}>
          <Reveal>
            <Divider light />
            <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
              <Eyebrow light>{t("fotoEyebrow")}</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: C.creme, margin: "0 0 1rem" }}>
                {t("fotoH2")}
              </h2>
              <p style={{ color: "rgba(250,247,240,0.85)", lineHeight: 1.9, fontSize: "0.97rem", fontWeight: 300 }}>
                {t("fotoDesc")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 4. PROCESSO ══════════════════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(145deg, ${C.escuro} 0%, ${C.azul} 100%)`, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)", position: "relative", overflow: "hidden" }} aria-labelledby="h2-processo">
        <div aria-hidden="true" style={{ position: "absolute", top: "-30%", right: "-15%", width: "clamp(300px,55vw,800px)", height: "clamp(300px,55vw,800px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <Eyebrow light>{t("processoEyebrow")}</Eyebrow>
              <h2 id="h2-processo" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.creme, margin: 0 }}>
                {t("processoH2")}
              </h2>
            </div>
          </Reveal>
          <div className="processo-steps" role="list">
            {PROCESSO_TEXT.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="processo-step" role="listitem">
                  <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(250,247,240,0.18)", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.82rem", color: "rgba(250,247,240,0.55)" }} aria-hidden="true">{`0${i + 1}`}</span>
                    {i < PROCESSO_TEXT.length - 1 && <div className="processo-connector" aria-hidden="true" />}
                  </div>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem,2vw,1.2rem)", color: C.creme, margin: "0 0 0.6rem", lineHeight: 1.2 }}>{item.titulo}</h3>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(250,247,240,0.62)", margin: 0, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Nota status */}
          <Reveal delay={0.35}>
            <div style={{ marginTop: "clamp(2.5rem,4vw,3.5rem)", display: "flex", alignItems: "center", gap: "14px", padding: "20px 28px", background: "rgba(250,247,240,0.06)", border: "1px solid rgba(250,247,240,0.12)", borderRadius: "12px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, color: C.azulClr }} aria-hidden="true">
                <circle cx="10" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                <path d="M10 2C6.686 2 4 4.686 4 8c0 4.5 6 9 6 9s6-4.5 6-9c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
              </svg>
              <p style={{ fontFamily: "'Google Sans', sans-serif", fontSize: "0.85rem", color: "rgba(250,247,240,0.75)", margin: 0, lineHeight: 1.65, fontWeight: 300 }}>
                {t("trackingNote")}{" "}
                <a href={TRACKING_URL} target="_blank" rel="noopener noreferrer"
                  style={{ color: C.azulClr, textDecoration: "none", fontWeight: 500, borderBottom: `1px solid ${C.azulClr}60`, paddingBottom: "1px" }}>
                  status.floresabeirario.pt
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 5. MATERIAIS (só UltraVue) ════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creEsc, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-materiais">
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <Eyebrow>{t("materiaisEyebrow")}</Eyebrow>
              <h2 id="h2-materiais" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.escuro, margin: 0 }}>
                {t("materiaisH2")}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="ultravue-box">
              <div style={{ flex: 1 }}>
                <Eyebrow color={C.azulClr}>{t("vidroEyebrow")}</Eyebrow>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: C.escuro, margin: "0 0 1rem", lineHeight: 1.15 }}>
                  {t("vidroH3")}<br />
                  <em style={{ fontStyle: "italic", color: C.azulClr }}>{t("vidroH3em")}</em>
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {VIDRO_FEATURES.map((feat, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 0", borderBottom: "1px solid rgba(15,30,26,0.07)", fontFamily: "'Google Sans', sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.6, color: C.sec }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: C.azulClr, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }} aria-hidden="true">
                        <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#FAF7F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ultravue-img">
                <Image src="/ladoalado.webp" alt="Comparação entre vidro normal e vidro UltraVue anti-reflexo" width={640} height={640} sizes="(max-width: 640px) 100vw, 340px" style={{ width: "100%", height: "auto", display: "block", borderRadius: "10px 10px 0 0" }} />
                <div style={{ backgroundColor: C.creEsc, padding: "10px 14px", display: "flex", justifyContent: "space-between", borderRadius: "0 0 10px 10px" }}>
                  <span style={{ fontFamily: "'Google Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(15,30,26,0.35)", fontWeight: 500 }}>{t("vidroLabelNormal")}</span>
                  <span style={{ fontFamily: "'Google Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "1.5px", textTransform: "uppercase", color: C.azulClr, fontWeight: 700 }}>UltraVue®</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 6. PREÇOS ═════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.escuro, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)", position: "relative", overflow: "hidden" }} aria-labelledby="h2-precos">
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-25%", left: "-10%", width: "clamp(320px,55vw,700px)", height: "clamp(320px,55vw,700px)", borderRadius: "50%", background: `radial-gradient(circle, ${C.azul}28 0%, transparent 68%)`, pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-8%", width: "clamp(200px,35vw,480px)", height: "clamp(200px,35vw,480px)", borderRadius: "50%", background: `radial-gradient(circle, ${C.terra}18 0%, transparent 68%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <Eyebrow light>{t("precosEyebrow")}</Eyebrow>
              <h2 id="h2-precos" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.4rem)", color: C.creme, margin: "0 0 1rem", lineHeight: 1.05 }}>
                {t("precosH2")}
              </h2>
              <p style={{ color: "rgba(250,247,240,0.5)", fontSize: "0.85rem", lineHeight: 1.75, fontWeight: 300, maxWidth: "480px" }}>
                {t("precosDesc")}{" "}
                <a href={t("precosDescLinkHref")} style={{ color: C.azulClr, textDecoration: "none", borderBottom: `1px solid ${C.azulClr}50`, paddingBottom: "1px" }}>
                  {t("precosDescLinkLabel")}
                </a>.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {precos.map((row, i) => {
              const accent = [C.azulClr, C.terra, C.azul][i];
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "clamp(1.2rem,3vw,2.4rem)",
                    background: C.creme,
                    border: `1px solid ${accent}25`,
                    borderRadius: "16px",
                    padding: "clamp(1.4rem,2.5vw,2rem) clamp(1.4rem,2.5vw,2rem)",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                    className="hover-lift-shadow"
                  >
                    <div style={{ flexShrink: 0 }}>
                      <SVGOpcao1Escuro width={row.svgW} accent={accent} />
                    </div>
                    <div style={{ width: "1px", alignSelf: "stretch", background: `${accent}30`, flexShrink: 0 }} aria-hidden="true" />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Google Sans', sans-serif", color: C.sec, fontSize: "0.65rem", letterSpacing: "2.5px", textTransform: "uppercase", margin: "0 0 8px", fontWeight: 500 }}>{t("precosLabelTamanho")}</p>
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", color: C.escuro, fontSize: "clamp(1rem,2.5vw,1.2rem)", margin: "0 0 12px", lineHeight: 1.1 }}>{row.size}</p>
                      <div style={{ width: "24px", height: "1px", background: `${accent}80`, marginBottom: "12px" }} aria-hidden="true" />
                      <p style={{ fontFamily: "'Google Sans', sans-serif", color: C.sec, fontSize: "0.65rem", letterSpacing: "2.5px", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>{t("precosLabelPreco")}</p>
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", color: accent, fontSize: "clamp(1.8rem,4vw,2.6rem)", margin: 0, lineHeight: 1 }}>{row.price}</p>
                    </div>
                    <div style={{ flexShrink: 0, display: "none", maxWidth: "160px" }} className="preco-nota">
                      <p style={{ fontFamily: "'Google Sans', sans-serif", color: C.sec, fontSize: "0.68rem", lineHeight: 1.6, margin: 0, fontWeight: 300, textAlign: "right" }}>
                        {t("precosNota2")}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.35}>
            <p style={{ fontFamily: "'Google Sans', sans-serif", color: "rgba(250,247,240,0.35)", fontSize: "0.75rem", lineHeight: 1.7, margin: "1.8rem 0 0", fontWeight: 300 }}>
              {t("precosNota")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 7. PAGAMENTO ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creEsc, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-pagamento">
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
              <Eyebrow>{t("pagamentoEyebrow")}</Eyebrow>
              <h2 id="h2-pagamento" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: C.escuro, margin: 0 }}>
                {t("pagamentoH2")}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pag-grid" role="list">
              {PAGAMENTO_TEXT.map((p, i) => (
                <div key={i} className="pag-item" role="listitem">
                  <div style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem,3.5vw,2.2rem)", color: C.azul, marginBottom: "4px" }}>{["30%", "40%", "30%"][i]}</div>
                  <div style={{ fontWeight: 600, color: C.escuro, fontSize: "0.75rem", marginBottom: "4px", fontFamily: "'Google Sans', sans-serif" }}>{p.label}</div>
                  <p style={{ color: C.sec, fontSize: "0.72rem", margin: 0, lineHeight: 1.55, fontWeight: 300 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 8. FAQ ═══════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creme, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-faq">
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,3.5rem)" }}>
              <Eyebrow>{t("faqEyebrow")}</Eyebrow>
              <h2 id="h2-faq" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3rem)", color: C.escuro, margin: 0 }}>
                {t("faqH2")}
              </h2>
            </div>
          </Reveal>
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} i={i} />)}
        </div>
      </section>

      {/* ══ 9. NAVEGAÇÃO — 4 QUADRADOS ════════════════════════════════════════ */}
      <section aria-label="Explorar serviços">
        <div className="nav-squares-grid">
          {[
            { img: "/molduranogueira.webp" },
            { img: "/ramo.webp" },
            { img: "/vale1.webp" },
            { img: "/fotoquadrocloseup2.webp" },
          ].map((vis, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <a href={NAV_SQUARES[i].href} className="nav-square">
                <Image fill src={vis.img} alt="" aria-hidden="true" className="nav-square-img" sizes="(max-width: 640px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                <div className="nav-square-overlay">
                  <span className="nav-square-label">{NAV_SQUARES[i].label}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
