"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─────────────────────────────────────────────
// SVG Botanical Decorations
// ─────────────────────────────────────────────
const BotanicalBloom = ({ style }) => (
  <svg viewBox="0 0 140 140" style={style} fill="none" aria-hidden="true">
    {[0,45,90,135,180,225,270,315].map((r, i) => (
      <ellipse key={i} cx="70" cy="70" rx="16" ry="38"
        fill="currentColor" opacity="0.12"
        transform={`rotate(${r} 70 70) translate(0 -22)`}/>
    ))}
    <circle cx="70" cy="70" r="10" fill="currentColor" opacity="0.22"/>
  </svg>
);

const BotanicalLeaf = ({ style }) => (
  <svg viewBox="0 0 80 120" style={style} fill="none" aria-hidden="true">
    <path d="M40 115 C8 80 10 35 40 8 C70 35 72 80 40 115Z" fill="currentColor" opacity="0.2"/>
    <path d="M40 115 L40 8" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <path d="M40 55 C22 50 16 40 24 30" stroke="currentColor" strokeWidth="0.8" opacity="0.22"/>
    <path d="M40 55 C58 50 64 40 56 30" stroke="currentColor" strokeWidth="0.8" opacity="0.22"/>
  </svg>
);

// ─────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// ─────────────────────────────────────────────
// Portfolio Item
// ─────────────────────────────────────────────
const PortfolioItem = ({ src, alt, span, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-8%" }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={`portfolio-item ${span || ""}`}
    style={{
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "#D4DECC",
      boxShadow: "0 8px 32px rgba(30,45,42,0.1)"
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
      loading="lazy"
      className="portfolio-img"
    />
  </motion.div>
);

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const reviewRef = useRef(null);

  const { scrollY } = useScroll();
  // Hero text fades out as user scrolls down
  const titleOpacity = useTransform(scrollY, [0, 220], [1, 0]);
  const titleY       = useTransform(scrollY, [0, 220], [0, -60]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // TrustIndex reviews
    if (reviewRef.current && !reviewRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "https://cdn.trustindex.io/loader.js?6897287659a84643ca864d340dd";
      script.async = true;
      script.defer = true;
      reviewRef.current.appendChild(script);
    }
  }, []);

  // ── Portfolio images — replace srcs with your actual filenames ──
  // These are displayed in a masonry-style grid
  const portfolio = [
    { src: "/portfolio-1.jpg", alt: "Bouquet de noiva preservado em quadro — rosas brancas e eucalipto", span: "tall" },
    { src: "/portfolio-2.jpg", alt: "Quadro botânico de flores de casamento prensadas" },
    { src: "/portfolio-3.jpg", alt: "Preservação de flores de noiva — peônias e ranúnculos" },
    { src: "/portfolio-4.jpg", alt: "Quadro de flores prensadas com moldura dourada", span: "wide" },
    { src: "/portfolio-5.jpg", alt: "Bouquet de casamento eternizado em moldura de museu" },
    { src: "/portfolio-6.jpg", alt: "Flores de casamento prensadas — ramo com laço" },
  ];

  const whatsappUrl = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre a preservação das minhas flores.");

  return (
    <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }
        :root {
          --green:   #3D6B5E;
          --green-d: #1E2D2A;
          --green-l: #8BA888;
          --terra:   #C4846B;
          --gold:    #B8954A;
          --cream:   #FAF7F0;
          --mid:     #5A6B60;
        }

        @keyframes driftA {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-16px) rotate(5deg); }
        }
        @keyframes driftB {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-10px) rotate(-7deg); }
        }
        .drift-a { animation: driftA 8s ease-in-out infinite; }
        .drift-b { animation: driftB 10s ease-in-out infinite; }

        /* ── Buttons ── */
        .btn-primary {
          display: inline-block;
          background-color: var(--green);
          color: var(--cream);
          padding: 15px 34px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          box-shadow: 0 6px 24px rgba(61,107,94,0.28);
          transition: all 0.3s ease;
          text-align: center;
          font-family: Roboto, sans-serif;
        }
        .btn-primary:hover {
          background-color: var(--green-d);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(61,107,94,0.36);
        }
        .btn-outline {
          display: inline-block;
          border: 2px solid var(--green);
          color: var(--green);
          padding: 13px 32px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          text-align: center;
          font-family: Roboto, sans-serif;
        }
        .btn-outline:hover {
          background-color: var(--green);
          color: var(--cream);
          transform: translateY(-3px);
        }
        .btn-ghost-light {
          display: inline-block;
          border: 1.5px solid rgba(250,247,240,0.35);
          color: rgba(250,247,240,0.82);
          padding: 13px 30px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.78rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          text-align: center;
          font-family: Roboto, sans-serif;
          backdrop-filter: blur(6px);
        }
        .btn-ghost-light:hover {
          background: rgba(250,247,240,0.12);
          border-color: rgba(250,247,240,0.6);
          color: #FAF7F0;
          transform: translateY(-3px);
        }

        .section-eyebrow {
          display: block;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 12px;
          font-family: Roboto, sans-serif;
        }
        .gold-line {
          width: 44px; height: 1px;
          background: linear-gradient(to right, transparent, #B8954A, transparent);
          margin: 0 auto;
        }

        /* ── Nav links on footer ── */
        .footer-link {
          color: rgba(250,247,240,0.7);
          text-decoration: none;
          font-size: 0.88rem;
          transition: color 0.3s ease;
          font-weight: 300;
        }
        .footer-link:hover { color: #FAF7F0; }

        /* ── CTA row ── */
        .cta-row {
          display: flex; flex-direction: column;
          align-items: stretch; gap: 12px;
        }
        @media (min-width: 460px) {
          .cta-row { flex-direction: row; justify-content: center; align-items: center; }
        }

        /* ── 3 Steps ── */
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 768px) {
          .steps-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Services grid ── */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Portfolio grid ── */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          grid-auto-rows: 200px;
        }
        @media (min-width: 640px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 240px;
            gap: 12px;
          }
        }
        @media (min-width: 1024px) {
          .portfolio-grid {
            grid-auto-rows: 280px;
            gap: 14px;
          }
        }
        .portfolio-item { cursor: pointer; }
        .portfolio-item.tall {
          grid-row: span 2;
        }
        .portfolio-item.wide {
          grid-column: span 2;
        }
        @media (max-width: 639px) {
          .portfolio-item.tall { grid-row: span 1; }
          .portfolio-item.wide { grid-column: span 1; }
        }
        .portfolio-item:hover .portfolio-img {
          transform: scale(1.04);
        }

        /* ── Footer grid ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          text-align: center;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            text-align: left;
          }
        }
        .footer-grid-col-center {
          display: flex; flex-direction: column; align-items: center;
        }
        @media (min-width: 768px) {
          .footer-grid-col-center { align-items: flex-start; }
        }

        .scroll-hint {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          color: rgba(250,247,240,0.5);
          font-size: 0.54rem; letter-spacing: 3px;
          text-transform: uppercase; z-index: 5;
          font-family: Roboto, sans-serif;
        }
        .scroll-line {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, rgba(250,247,240,0.6), transparent);
          animation: driftA 2.4s ease-in-out infinite;
        }
      `}} />

      {/* ═══════════════════════════════════════
          1. HERO — full-screen video
          H1 with SEO keywords
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        aria-label="Flores à Beira-Rio — preservação de flores de casamento"
        style={{
          height: "100vh", minHeight: "600px",
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        <video
          autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          aria-hidden="true"
        >
          <source src="/hero-video.webm" type="video/webm"/>
          <source src="/hero-video.mp4"  type="video/mp4"/>
        </video>

        {/* Gradient overlay — darker at bottom for text legibility */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(15,30,26,0.25) 0%, rgba(15,30,26,0.45) 60%, rgba(15,30,26,0.7) 100%)"
        }}/>

        <motion.div
          style={{
            zIndex: 2, textAlign: "center", color: "#FAF7F0",
            padding: "0 20px",
            opacity: titleOpacity, y: titleY,
            width: "100%", maxWidth: "1000px"
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: "clamp(0.58rem,1.4vw,0.7rem)",
              letterSpacing: "5px", textTransform: "uppercase",
              fontWeight: "700", marginBottom: "20px",
              opacity: 0.75, fontFamily: "Roboto, sans-serif"
            }}
          >
            Atelier de Preservação Botânica · Coimbra
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
              lineHeight: 1.0, margin: "0 0 18px",
              textShadow: "0 4px 30px rgba(0,0,0,0.2)"
            }}
          >
            Flores à <span style={{ whiteSpace: "nowrap" }}>Beira&#8209;Rio</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: "clamp(1rem,2.4vw,1.25rem)",
              letterSpacing: "clamp(2px,1vw,6px)",
              textTransform: "uppercase", fontWeight: "300",
              marginBottom: "36px", opacity: 0.88
            }}
          >
            Especialistas em preservação de flores
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="cta-row"
            style={{ justifyContent: "center" }}
          >
            <a href="/passo-a-passo" className="btn-primary">
              Como Funciona
            </a>
            <a href="/opcoes-e-precos" className="btn-ghost-light">
              Ver Preços
            </a>
          </motion.div>
        </motion.div>

        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-line"/>
          <span>scroll</span>
        </div>

        {/* Wave */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, width: "100%", zIndex: 4 }}>
          <svg viewBox="0 0 1440 55" fill="none" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "44px" }}>
            <path d="M0 28 C300 55 660 0 1000 32 C1180 46 1340 12 1440 28 L1440 55 L0 55Z" fill="#FAF7F0"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. O QUE FAZEMOS — serviço em 3 cards
      ═══════════════════════════════════════ */}
      <section
        aria-label="Serviços de preservação de flores"
        style={{ padding: "64px 20px 70px", backgroundColor: "#FAF7F0" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <span className="section-eyebrow">O que fazemos</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
              color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1
            }}>
              As suas flores, para sempre
            </h2>
            <p style={{
              color: "#5A6B60", fontSize: "clamp(0.95rem,2vw,1.05rem)",
              lineHeight: 1.85, maxWidth: "560px", margin: "0 auto"
            }}>
              Transformamos flores com significado emocional — bouquets de noiva,
              ramos de batizado, flores de aniversário — em obras de arte botânica
              que duram décadas na sua parede.
            </p>
          </motion.div>

          <div className="services-grid">
            {[
              {
                href: "/passo-a-passo",
                bg: "#EDF2E8",
                accent: "#3D6B5E",
                icon: "🌿",
                title: "Preservação de Bouquet",
                desc: "Enviamos as flores até 5 dias após o evento. Prensamos, secamos e emolduramos com vidro museu anti-UV.",
                cta: "Ver o processo"
              },
              {
                href: "/recriacao",
                bg: "#F0EBE0",
                accent: "#B8954A",
                icon: "✦",
                title: "Recriação de Bouquet",
                desc: "Já passou o tempo? Recreamos o seu ramo com flores frescas iguais às originais, a partir de uma fotografia.",
                cta: "Saber mais"
              },
              {
                href: "/opcoes-e-precos",
                bg: "#EEF0F5",
                accent: "#5A6B8A",
                icon: "◻",
                title: "Tamanhos & Molduras",
                desc: "Múltiplos formatos de moldura, feitos à mão com materiais museológicos. A partir de 300€.",
                cta: "Ver preços"
              }
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block", textDecoration: "none",
                  backgroundColor: s.bg,
                  borderRadius: "20px", padding: "32px 28px",
                  border: `1px solid ${s.accent}18`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative", overflow: "hidden"
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(30,45,42,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{
                  display: "inline-block",
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.6rem", color: s.accent,
                  marginBottom: "16px", lineHeight: 1
                }}>
                  {s.icon}
                </span>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.3rem", color: "#1E2D2A",
                  margin: "0 0 10px", lineHeight: 1.2
                }}>
                  {s.title}
                </h3>
                <p style={{
                  color: "#5A6B60", fontSize: "0.9rem",
                  lineHeight: 1.75, margin: "0 0 20px"
                }}>
                  {s.desc}
                </p>
                <span style={{
                  fontSize: "0.78rem", fontWeight: "700",
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  color: s.accent, fontFamily: "Roboto, sans-serif",
                  borderBottom: `1px solid ${s.accent}50`, paddingBottom: "2px"
                }}>
                  {s.cta} →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. PORTFOLIO — grelha de quadros reais
          ⚠ Substitua os src pelas suas fotos reais
      ═══════════════════════════════════════ */}
      <section
        aria-label="Portfólio de preservações botânicas"
        style={{
          padding: "0 20px 72px",
          backgroundColor: "#FAF7F0"
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "36px" }}
          >
            <span className="section-eyebrow">O nosso trabalho</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              color: "#1E2D2A", margin: "0 0 12px", lineHeight: 1.1
            }}>
              Cada quadro conta uma história
            </h2>
            <p style={{ color: "#5A6B60", fontSize: "0.92rem", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto" }}>
              Preservações reais feitas no nosso atelier em Ceira, Coimbra.
            </p>
          </motion.div>

          <div className="portfolio-grid">
            {portfolio.map((item, i) => (
              <PortfolioItem key={i} {...item} delay={i * 0.08} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <a
              href="https://instagram.com/floresabeirario"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: "#3D6B5E", fontSize: "0.82rem", fontWeight: "600",
                letterSpacing: "1.5px", textTransform: "uppercase",
                textDecoration: "none", fontFamily: "Roboto, sans-serif",
                borderBottom: "1px solid rgba(61,107,94,0.3)", paddingBottom: "2px"
              }}
            >
              <IconInstagram/> Ver mais no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. 3 PASSOS — resumo visual
      ═══════════════════════════════════════ */}
      <section
        aria-label="Como funciona a preservação de flores em 3 passos"
        style={{
          padding: "60px 20px 68px",
          background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)"
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <span className="section-eyebrow">Simples assim</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              color: "#1E2D2A", margin: 0, lineHeight: 1.1
            }}>
              Três passos para a sua arte
            </h2>
          </motion.div>

          <div className="steps-grid">
            {[
              {
                n: "01",
                t: "Reserve a sua data",
                d: "As vagas são limitadas. Reserve com antecedência para garantir que as suas flores chegam ao nosso atelier no momento certo.",
                link: "/passo-a-passo"
              },
              {
                n: "02",
                t: "Envie as flores",
                d: "Entrega em mãos no atelier, envio por CTT ou recolha no evento. Preferencialmente até 3 dias após o grande dia.",
                link: "/passo-a-passo"
              },
              {
                n: "03",
                t: "Recebe a sua obra",
                d: "Após aprovação da composição, o quadro é emoldurado e enviado para casa — ou levantado em Coimbra.",
                link: "/passo-a-passo"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                style={{
                  padding: "36px 32px",
                  borderLeft: i > 0 ? "1px solid rgba(61,107,94,0.1)" : "none",
                  position: "relative"
                }}
              >
                {/* Number */}
                <span style={{
                  display: "block",
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "3.5rem", color: "#3D6B5E",
                  opacity: 0.15, lineHeight: 1, marginBottom: "16px"
                }}>
                  {step.n}
                </span>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.45rem", color: "#1E2D2A",
                  margin: "0 0 10px", lineHeight: 1.2
                }}>
                  {step.t}
                </h3>
                <p style={{
                  color: "#5A6B60", lineHeight: 1.78,
                  fontSize: "0.9rem", margin: "0 0 16px"
                }}>
                  {step.d}
                </p>
                <a href={step.link} style={{
                  color: "#3D6B5E", fontSize: "0.78rem",
                  fontWeight: "700", letterSpacing: "1.5px",
                  textTransform: "uppercase", textDecoration: "none",
                  fontFamily: "Roboto, sans-serif",
                  borderBottom: "1px solid rgba(61,107,94,0.3)", paddingBottom: "2px"
                }}>
                  Saber mais →
                </a>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <a href="/passo-a-passo" className="btn-primary">
              Ver o Processo Completo
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. REVIEWS — TrustIndex
      ═══════════════════════════════════════ */}
      <section
        aria-label="Avaliações de clientes"
        style={{
          padding: "60px 20px 68px",
          backgroundColor: "#1E2D2A",
          color: "#FAF7F0",
          textAlign: "center"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <span style={{
            display: "block", fontSize: "0.58rem", fontWeight: "700",
            letterSpacing: "3.5px", textTransform: "uppercase",
            color: "#8BA888", marginBottom: "12px",
            fontFamily: "Roboto, sans-serif"
          }}>
            Clientes felizes
          </span>
          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            margin: "0 0 36px", lineHeight: 1.1,
            color: "#FAF7F0"
          }}>
            O que dizem quem confiou em nós
          </h2>
          <div ref={reviewRef} style={{ minHeight: "180px" }}/>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          6. SUSTENTABILIDADE — bloco de valores
      ═══════════════════════════════════════ */}
      <section
        aria-label="Preservação consciente e sustentável"
        style={{
          padding: "64px 20px 72px",
          background: "linear-gradient(135deg, #FAF7F0 0%, #EDF2E8 100%)",
          position: "relative", overflow: "hidden"
        }}
      >
        <div aria-hidden="true" className="drift-a" style={{
          position: "absolute", right: "3%", top: "10%",
          color: "#3D6B5E", width: "clamp(80px,12vw,140px)",
          opacity: 0.07, pointerEvents: "none"
        }}>
          <BotanicalBloom style={{ width: "100%" }}/>
        </div>
        <div aria-hidden="true" className="drift-b" style={{
          position: "absolute", left: "2%", bottom: "8%",
          color: "#B8954A", width: "clamp(50px,8vw,90px)",
          opacity: 0.08, pointerEvents: "none"
        }}>
          <BotanicalLeaf style={{ width: "100%" }}/>
        </div>

        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gold-line" style={{ marginBottom: "28px" }}/>
            <span className="section-eyebrow">A nossa filosofia</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              color: "#1E2D2A", margin: "0 0 20px", lineHeight: 1.1
            }}>
              Preservação consciente,<br/>
              <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>sem plásticos</em>
            </h2>
            <p style={{
              color: "#5A6B60", fontSize: "clamp(0.95rem,2vw,1.05rem)",
              lineHeight: 1.9, margin: "0 0 18px"
            }}>
              Enquanto a resina epóxi é um polímero sintético, a nossa prensagem botânica
              celebra a flor de forma 100% orgânica — sem químicos agressivos,
              sem microplásticos. A natureza preservada pela própria natureza.
            </p>
            <p style={{
              color: "#5A6B60", fontSize: "clamp(0.9rem,1.8vw,0.98rem)",
              lineHeight: 1.85
            }}>
              Cada quadro é feito à mão no nosso atelier em Ceira, Coimbra,
              com materiais de qualidade museológica que garantem décadas de preservação.
            </p>
            <div className="gold-line" style={{ marginTop: "28px" }}/>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. CTA DUPLO — noiva + presente
      ═══════════════════════════════════════ */}
      <section
        aria-label="Começar a preservação das suas flores"
        style={{
          padding: "0 20px 0",
          backgroundColor: "#FAF7F0"
        }}
      >
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr",
          gap: "0"
        }}>
          {/* CTA A — Noiva */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "linear-gradient(135deg, #1E2D2A 0%, #2D5045 100%)",
              padding: "clamp(48px,8vw,80px) clamp(24px,6vw,64px)",
              position: "relative", overflow: "hidden",
              textAlign: "center"
            }}
          >
            <div aria-hidden="true" className="drift-a" style={{
              position: "absolute", right: "5%", top: "10%",
              color: "#8BA888", width: "clamp(80px,12vw,130px)", opacity: 0.12, pointerEvents: "none"
            }}>
              <BotanicalBloom style={{ width: "100%" }}/>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{
                display: "block", fontSize: "0.58rem", fontWeight: "700",
                letterSpacing: "3.5px", textTransform: "uppercase",
                color: "#8BA888", marginBottom: "12px",
                fontFamily: "Roboto, sans-serif"
              }}>
                Para noivas
              </span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
                color: "#FAF7F0", margin: "0 0 14px", lineHeight: 1.1
              }}>
                Vai casar em breve?
              </h2>
              <p style={{
                color: "rgba(250,247,240,0.72)", fontSize: "0.95rem",
                lineHeight: 1.82, margin: "0 auto 28px", maxWidth: "460px"
              }}>
                Reserve a sua vaga com antecedência — as datas em época de casamentos
                esgotam rapidamente. Garantimos que o seu bouquet é preservado
                nas melhores condições possíveis.
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <a href="https://wa.me/351934680300?text=Olá!%20Vou%20casar%20em%20breve%20e%20gostaria%20de%20reservar%20a%20preservação%20do%20meu%20bouquet." target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    backgroundColor: "#25D366", color: "#fff",
                    padding: "14px 30px", borderRadius: "100px",
                    textDecoration: "none", fontWeight: "600",
                    fontSize: "0.78rem", letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    boxShadow: "0 6px 22px rgba(37,211,102,0.28)",
                    transition: "all 0.3s ease",
                    fontFamily: "Roboto, sans-serif"
                  }}
                >
                  <IconWhatsApp/> Reservar via WhatsApp
                </a>
                <a href="/passo-a-passo" className="btn-ghost-light">
                  Ver como funciona
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA B — Presente */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "linear-gradient(135deg, #F0EBE0 0%, #EDF2E8 100%)",
              padding: "clamp(48px,8vw,80px) clamp(24px,6vw,64px)",
              textAlign: "center",
              position: "relative", overflow: "hidden"
            }}
          >
            <div aria-hidden="true" className="drift-b" style={{
              position: "absolute", left: "4%", bottom: "8%",
              color: "#B8954A", width: "clamp(65px,10vw,110px)", opacity: 0.1, pointerEvents: "none"
            }}>
              <BotanicalLeaf style={{ width: "100%" }}/>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{
                display: "block", fontSize: "0.58rem", fontWeight: "700",
                letterSpacing: "3.5px", textTransform: "uppercase",
                color: "#B8954A", marginBottom: "12px",
                fontFamily: "Roboto, sans-serif"
              }}>
                Presente especial
              </span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
                color: "#1E2D2A", margin: "0 0 14px", lineHeight: 1.1
              }}>
                Ofereça memórias eternas
              </h2>
              <p style={{
                color: "#5A6B60", fontSize: "0.95rem",
                lineHeight: 1.82, margin: "0 auto 28px", maxWidth: "460px"
              }}>
                Desde bodas de prata até aniversários — ofereça um vale-presente
                ou a recriação do bouquet de alguém especial.
                O presente mais único e emocionante que pode dar.
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <a href="/vale-presente" className="btn-primary">
                  Vale-Presente
                </a>
                <a href="/recriacao" className="btn-outline">
                  Recriação de Bouquet
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. FOOTER
      ═══════════════════════════════════════ */}
      <footer style={{ backgroundColor: "#1E2D2A", color: "#FAF7F0", position: "relative", marginTop: "0" }}>
        {/* Wave top */}
        <div aria-hidden="true" style={{ position: "absolute", top: "-42px", left: 0, width: "100%", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "100%", height: "44px" }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.1,107.53,258.83,93.72,284.59,63.29,321.39,56.44Z" fill="#1E2D2A"/>
          </svg>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 36px" }}>
          <div className="footer-grid" style={{ marginBottom: "56px" }}>

            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "2.4rem", color: "#FAF7F0",
                margin: "0 0 6px", lineHeight: 1.1
              }}>
                Flores à<br/>Beira-Rio
              </h2>
              <p style={{
                fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase",
                color: "#8BA888", margin: "0 0 22px",
                fontFamily: "Roboto, sans-serif"
              }}>
                Atelier · Ceira, Coimbra
              </p>
              <div style={{ display: "flex", gap: "18px" }}>
                {[
                  { href: "https://instagram.com/floresabeirario", icon: <IconInstagram/>, label: "Instagram" },
                  { href: "https://facebook.com/floresabeirario",  icon: <IconFacebook/>,  label: "Facebook" },
                  { href: "https://wa.me/351934680300",             icon: <IconWhatsApp/>,  label: "WhatsApp" },
                  { href: "mailto:info@floresabeirario.pt",         icon: <IconEmail/>,     label: "Email" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer" aria-label={s.label}
                    style={{ color: "rgba(250,247,240,0.6)", transition: "color 0.3s ease" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.6)"}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span style={{
                fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase",
                color: "rgba(250,247,240,0.45)", marginBottom: "4px",
                fontFamily: "Roboto, sans-serif"
              }}>
                Explorar
              </span>
              {[
                { href: "/passo-a-passo",        label: "Como Funciona" },
                { href: "/opcoes-e-precos",       label: "Opções e Preços" },
                { href: "/recriacao",             label: "Recriação de Bouquet" },
                { href: "/vale-presente",         label: "Vale-Presente" },
                { href: "/perguntas-frequentes",  label: "Perguntas Frequentes" },
                { href: "/contactos",             label: "Contactos e Equipa" },
              ].map((l, i) => (
                <a key={i} href={l.href} className="footer-link">{l.label}</a>
              ))}
            </div>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <span style={{
                fontSize: "0.6rem", letterSpacing: "2.5px", textTransform: "uppercase",
                color: "rgba(250,247,240,0.45)", marginBottom: "4px",
                fontFamily: "Roboto, sans-serif"
              }}>
                Contacto
              </span>
              <a href="https://wa.me/351934680300" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  backgroundColor: "#25D366", color: "#fff",
                  padding: "12px 24px", borderRadius: "100px",
                  textDecoration: "none", fontWeight: "600",
                  fontSize: "0.78rem", letterSpacing: "1px",
                  transition: "all 0.3s ease",
                  fontFamily: "Roboto, sans-serif"
                }}
              >
                <IconWhatsApp/> +351 934 680 300
              </a>
              <a href="mailto:info@floresabeirario.pt" className="footer-link" style={{ marginTop: "4px" }}>
                info@floresabeirario.pt
              </a>
              <p style={{ color: "rgba(250,247,240,0.45)", fontSize: "0.82rem", margin: "8px 0 0", lineHeight: 1.6 }}>
                Ceira, Coimbra<br/>Portugal
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: "1px solid rgba(250,247,240,0.08)",
            paddingTop: "24px",
            display: "flex", justifyContent: "space-between",
            flexWrap: "wrap", gap: "12px",
            fontSize: "0.62rem", letterSpacing: "1px",
            color: "rgba(250,247,240,0.35)",
            fontFamily: "Roboto, sans-serif"
          }}>
            <span>© 2026 FLORES À BEIRA-RIO. TODOS OS DIREITOS RESERVADOS.</span>
            <div style={{ display: "flex", gap: "20px" }}>
              <a href="/politica-de-privacidade"
                style={{ color: "rgba(250,247,240,0.35)", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(250,247,240,0.7)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.35)"}
              >
                POLÍTICA DE PRIVACIDADE
              </a>
              <a href="/termos-e-condicoes"
                style={{ color: "rgba(250,247,240,0.35)", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(250,247,240,0.7)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.35)"}
              >
                TERMOS E CONDIÇÕES
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
