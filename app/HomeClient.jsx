"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IconWhatsApp } from "./_components/Icons";
import { FORM_URL, WA_URL, WA_URL_NOIVA } from "./_lib/constants";

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Flores à Beira-Rio",
        description:
          "Atelier de preservação botânica artesanal em Coimbra. Transformamos bouquets de casamento em quadros de arte botânica que duram décadas.",
        image: "https://floresabeirario.pt/fotoquadro1.webp",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Coimbra",
          addressRegion: "Coimbra",
          addressCountry: "PT",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "40.2033",
          longitude: "-8.4103",
        },
        telephone: "+351934680300",
        email: "info@floresabeirario.pt",
        priceRange: "€€€",
        openingHours: "Mo-Fr 10:00-18:00",
        sameAs: [
          "https://instagram.com/floresabeirario",
          "https://facebook.com/floresabeirario",
        ],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "300",
          offers: [
            {
              "@type": "Offer",
              name: "Preservação de Bouquet 30×40cm",
              price: "300",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              name: "Preservação de Bouquet 40×50cm",
              price: "400",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              name: "Preservação de Bouquet 50×70cm",
              price: "500",
              priceCurrency: "EUR",
            },
          ],
        },
      }),
    }}
  />
);

// ─── SVG Icons preenchidos para secção Tracking ──────────────────────────────
const IconFlower = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {/* pétala cima */}
    <ellipse cx="12" cy="6.5" rx="2.5" ry="4" />
    {/* pétala baixo */}
    <ellipse cx="12" cy="17.5" rx="2.5" ry="4" />
    {/* pétala esq */}
    <ellipse cx="6.5" cy="12" rx="4" ry="2.5" />
    {/* pétala dir */}
    <ellipse cx="17.5" cy="12" rx="4" ry="2.5" />
    {/* centro */}
    <circle cx="12" cy="12" r="3" fill="white" opacity="0.6" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
);

const IconFrame = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {/* moldura exterior */}
    <rect x="2" y="2" width="20" height="20" rx="2.5" />
    {/* janela interior — recorte com fill branco semitransparente */}
    <rect x="6" y="6" width="12" height="12" rx="1.5" fill="white" opacity="0.55" />
    {/* pequena flor no centro */}
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9" />
  </svg>
);

const IconPackage = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {/* tampa */}
    <path d="M12 2 L22 7 L12 12 L2 7 Z" />
    {/* lado esquerdo */}
    <path d="M2 7 L2 17 L12 22 L12 12 Z" opacity="0.7" />
    {/* lado direito */}
    <path d="M22 7 L22 17 L12 22 L12 12 Z" opacity="0.85" />
  </svg>
);

// ─── Before/After Slider ──────────────────────────────────────────────────────
const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const getPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    e.preventDefault();
  };
  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    getPosition(e.clientX);
  }, [getPosition]);
  const onMouseUp = () => { isDragging.current = false; };

  const onTouchStart = () => { isDragging.current = true; };
  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    getPosition(e.touches[0].clientX);
  }, [getPosition]);
  const onTouchEnd = () => { isDragging.current = false; };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onTouchMove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="eyebrow">Antes e depois</span>
        <h2
          style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2rem,4.5vw,3.2rem)",
            color: "#1E2D2A",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Do ramo ao quadro
        </h2>
        <p style={{ color: "#5A6B60", fontSize: "0.9rem", marginTop: "12px", letterSpacing: "0.5px" }}>
          Arraste para comparar
        </p>
      </div>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
          aspectRatio: "4/3",
          borderRadius: "20px",
          overflow: "hidden",
          cursor: "ew-resize",
          userSelect: "none",
          boxShadow: "0 24px 64px rgba(30,45,42,0.16)",
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Foto de depois (quadro) */}
        <img
          src="/quadro.webp"
          alt="Quadro de flores preservadas — depois"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          draggable={false}
        />
        {/* Foto de antes (ramo) — recortada pelo clip */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: isDragging.current ? "none" : "clip-path 0.05s",
          }}
        >
          <img
            src="/ramo.webp"
            alt="Ramo de flores — antes"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            draggable={false}
          />
        </div>

        {/* Labels */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            backgroundColor: "rgba(30,45,42,0.75)",
            color: "#FAF7F0",
            padding: "5px 14px",
            borderRadius: "50px",
            fontSize: "0.72rem",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "Roboto, sans-serif",
            backdropFilter: "blur(6px)",
            opacity: position > 15 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          Antes
        </div>
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            backgroundColor: "rgba(61,107,94,0.8)",
            color: "#FAF7F0",
            padding: "5px 14px",
            borderRadius: "50px",
            fontSize: "0.72rem",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "Roboto, sans-serif",
            backdropFilter: "blur(6px)",
            opacity: position < 85 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          Depois
        </div>

        {/* Divisor */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${position}%`,
            transform: "translateX(-50%)",
            width: "2px",
            background: "rgba(250,247,240,0.9)",
            pointerEvents: "none",
          }}
        />
        {/* Handle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${position}%`,
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "#FAF7F0",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D6B5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" style={{ transform: "scaleX(-1)", transformOrigin: "6px 12px" }} />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Step Card ────────────────────────────────────────────────────────────────
const StepCard = ({ number, title, desc, imageSrc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    style={{ borderLeft: "2px solid rgba(61,107,94,0.15)", paddingLeft: "clamp(20px,3vw,32px)" }}
  >
    <span
      style={{
        display: "block",
        fontFamily: "'TAN-MEMORIES', serif",
        fontSize: "clamp(2.5rem,5vw,3.8rem)",
        color: "#3D6B5E",
        opacity: 0.18,
        lineHeight: 1,
        marginBottom: "12px",
      }}
      aria-hidden="true"
    >
      {number}
    </span>

    <div
      style={{
        width: "100%",
        aspectRatio: "4/3",
        borderRadius: "14px",
        overflow: "hidden",
        marginBottom: "20px",
        backgroundColor: "#D4DECC",
      }}
    >
      <img
        src={imageSrc}
        alt={`Passo ${number}: ${title}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.6s ease",
        }}
        loading="lazy"
      />
    </div>

    <h3
      style={{
        fontFamily: "'TAN-MEMORIES', serif",
        fontSize: "clamp(1.3rem,2.5vw,1.6rem)",
        color: "#1E2D2A",
        margin: "0 0 12px",
        lineHeight: 1.2,
      }}
    >
      {title}
    </h3>
    <p style={{ color: "#5A6B60", lineHeight: 1.78, fontSize: "1rem", margin: 0 }}>
      {desc}
    </p>
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HomeClient() {
  const reviewRef = useRef(null);
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const titleY = useTransform(scrollY, [0, 200], [0, -55]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (reviewRef.current && !reviewRef.current.querySelector("script")) {
      const s = document.createElement("script");
      s.src = "https://cdn.trustindex.io/loader.js?6897287659a84643ca864d340dd";
      s.async = true;
      s.defer = true;
      reviewRef.current.appendChild(s);
    }
  }, []);

  const steps = [
    {
      number: "01",
      title: "Reserve a sua data",
      desc: "Preencha o formulário de reserva com os detalhes do seu evento e garantimos a sua vaga com antecedência. As vagas são limitadas.",
      imageSrc: "/calendario.webp",
    },
    {
      number: "02",
      title: "Entregue as flores",
      desc: "Entrega em mãos no atelier, envio por CTT ou recolha no local do evento. Preferencialmente até 3 dias após o grande dia.",
      imageSrc: "/ramojoana.webp",
    },
    {
      number: "03",
      title: "Recebe a sua obra de arte",
      desc: "Após aprovação da composição, o quadro é emoldurado com vidro museu anti-UV e enviado para casa ou levantado no atelier.",
      imageSrc: "/joanaceu.webp",
    },
  ];

  return (
    <>
      <StructuredData />

      <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden", position: "relative" }}>

        {/* Gradiente global subtil a percorrer toda a página */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background:
              "linear-gradient(175deg, rgba(29,52,44,0.07) 0%, rgba(250,247,240,0) 30%, rgba(184,149,74,0.06) 65%, rgba(61,107,94,0.05) 100%)",
          }}
        />
        <style dangerouslySetInnerHTML={{
          __html: `
          * { box-sizing: border-box; }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            video { animation: none !important; }
          }

          @keyframes floatPhone {
            0%,100% { transform: translateY(0px) rotate(-2deg); }
            50%      { transform: translateY(-12px) rotate(-2deg); }
          }
          .phone-float { animation: floatPhone 5s ease-in-out infinite; }

          .steps-grid {
            display: grid; grid-template-columns: 1fr; gap: 48px;
          }
          @media (min-width: 640px) {
            .steps-grid { grid-template-columns: repeat(3,1fr); gap: 0 32px; }
          }

          .services-grid {
            display: grid; grid-template-columns: 1fr; gap: 16px;
          }
          @media (min-width: 640px) {
            .services-grid { grid-template-columns: repeat(2,1fr); }
          }
          @media (min-width: 1024px) {
            .services-grid { grid-template-columns: repeat(3,1fr); }
          }

          .cta-split {
            display: grid; grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .cta-split { grid-template-columns: 1fr 1fr; }
          }

          .vale-grid {
            display: grid; grid-template-columns: 1fr; gap: 44px; align-items: center;
          }
          @media (min-width: 768px) {
            .vale-grid { grid-template-columns: 1fr 1fr; gap: 68px; }
          }

          .tracking-grid {
            display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center;
          }
          @media (min-width: 768px) {
            .tracking-grid { grid-template-columns: 1fr 1fr; gap: 72px; }
          }
          .tracking-title { display: block; }
          @media (min-width: 768px) { .tracking-title { display: none; } }
          .tracking-desktop-title { display: none; }
          @media (min-width: 768px) { .tracking-desktop-title { display: block; } }

          .apcc-grid {
            display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center;
          }
          @media (min-width: 768px) {
            .apcc-grid { grid-template-columns: 1fr 1fr; gap: 80px; }
          }
          .apcc-visual { order: 2; }
          .apcc-text   { order: 1; }
          @media (min-width: 768px) {
            .apcc-visual { order: unset; }
            .apcc-text   { order: unset; }
          }

          /* Hero buttons discretos */
          .hero-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 10px 24px;
            border-radius: 100px;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.78rem;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            font-family: Roboto, sans-serif;
            white-space: nowrap;
            min-height: 40px;
          }
          .hero-btn-outline {
            border: 1px solid rgba(250,247,240,0.55);
            color: rgba(250,247,240,0.9);
            background: rgba(250,247,240,0.07);
            backdrop-filter: blur(6px);
          }
          .hero-btn-outline:hover {
            background: rgba(250,247,240,0.18);
            border-color: rgba(250,247,240,0.9);
            color: #FAF7F0;
            transform: translateY(-2px);
          }

          .hero-cta-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }
        `,
        }} />

        {/* ════ 1. HERO — vídeo ════ */}
        <section
          aria-label="Flores à Beira-Rio — Preservação de flores de casamento"
          style={{
            height: "100vh",
            minHeight: "600px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Vídeo de fundo */}
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src="/hero-video.webm" type="video/webm" />
            {/* fallback imagem se o vídeo não carregar */}
          </video>

          {/* Overlay escuro */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(15,30,26,0.25) 0%, rgba(15,30,26,0.55) 60%, rgba(15,30,26,0.78) 100%)",
            }}
          />

          <motion.div
            style={{
              zIndex: 2,
              textAlign: "center",
              color: "#FAF7F0",
              padding: "0 20px",
              opacity: titleOpacity,
              y: titleY,
              width: "100%",
              maxWidth: "1050px",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              style={{
                fontSize: "clamp(0.7rem,1.2vw,0.85rem)",
                letterSpacing: "clamp(3px,1vw,5px)",
                textTransform: "uppercase",
                fontWeight: "600",
                marginBottom: "clamp(20px,3vw,30px)",
                color: "rgba(250,247,240,0.8)",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Especialistas em preservação de flores
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(3.5rem, 12vw, 8rem)",
                lineHeight: 1.18,
                margin: "0 0 clamp(24px,3.5vw,36px)",
                textShadow: "0 4px 30px rgba(0,0,0,0.3)",
              }}
            >
              Flores à<br />
              <span style={{ whiteSpace: "nowrap" }}>Beira&#8209;Rio</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="hero-cta-row"
            >
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-outline">
                Reservar Data
              </a>
              <a href="/como-funciona" className="hero-btn hero-btn-outline">
                Como Funciona
              </a>
              <a href="/perguntas-frequentes" className="hero-btn hero-btn-outline">
                Perguntas Frequentes
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ════ 2. O QUE FAZEMOS ════ */}
        <section
          aria-label="Serviços de preservação botânica"
          style={{ padding: "80px 20px 76px", background: "linear-gradient(180deg, rgba(29,52,44,0.04) 0%, #FAF7F0 100%)", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "52px" }}
            >
              <span className="eyebrow">O que fazemos</span>
              <h2
                style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "clamp(2.2rem,5vw,3.5rem)",
                  color: "#1E2D2A",
                  margin: "0 0 16px",
                  lineHeight: 1.1,
                }}
              >
                As suas flores, para sempre
              </h2>
              <p
                style={{
                  color: "#5A6B60",
                  fontSize: "clamp(1rem,2vw,1.1rem)",
                  lineHeight: 1.85,
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Transformamos flores com valor emocional em quadros de arte botânica
                que duram décadas. Recebemos flores de Portugal e de toda a Europa
                no nosso estúdio em Coimbra.
              </p>
            </motion.div>

            <div className="services-grid">
              {[
                {
                  href: "/como-funciona",
                  bg: "#EDF2E8",
                  accent: "#3D6B5E",
                  label: "◈",
                  title: "Preservação de Bouquet",
                  desc: "Recebemos as flores até 5 dias após o evento. Prensamos, secamos e emolduramos com vidro museu anti-UV.",
                  cta: "Ver o processo",
                },
                {
                  href: "/recriacao",
                  bg: "#F0EBE0",
                  accent: "#B8954A",
                  label: "✦",
                  title: "Recriação de Bouquet",
                  desc: "Já passou o tempo? Recriamos o bouquet de noiva com flores frescas iguais às originais, a partir de uma fotografia.",
                  cta: "Saber mais",
                },
                {
                  href: "/oferecer-preservacao",
                  bg: "#EEF0F5",
                  accent: "#5A6B8A",
                  label: "◻",
                  title: "Cartão-Oferta",
                  desc: "Ofereça a preservação como prenda. O cartão perfeito para aniversários de casamento, bodas ou datas especiais.",
                  cta: "Ver cartão-oferta",
                },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    backgroundColor: s.bg,
                    borderRadius: "20px",
                    padding: "36px 30px",
                    border: `1px solid ${s.accent}18`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    minHeight: "280px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 16px 44px rgba(30,45,42,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'TAN-MEMORIES', serif",
                      fontSize: "1.8rem",
                      color: s.accent,
                      display: "block",
                      marginBottom: "16px",
                    }}
                    aria-hidden="true"
                  >
                    {s.label}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'TAN-MEMORIES', serif",
                      fontSize: "1.4rem",
                      color: "#1E2D2A",
                      margin: "0 0 12px",
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ color: "#5A6B60", fontSize: "1rem", lineHeight: 1.75, margin: "0 0 20px" }}>
                    {s.desc}
                  </p>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "700",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: s.accent,
                      fontFamily: "Roboto, sans-serif",
                      borderBottom: `1px solid ${s.accent}55`,
                      paddingBottom: "2px",
                    }}
                  >
                    {s.cta} →
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ════ 3. ANTES E DEPOIS ════ */}
        <section
          aria-label="Comparação antes e depois — ramo e quadro de flores preservadas"
          style={{
            padding: "60px 0 72px",
            background: "linear-gradient(180deg, #F4F0E8 0%, #FAF7F0 100%)",
          }}
        >
          <BeforeAfterSlider />
        </section>

        {/* ════ 4. TRÊS PASSOS ════ */}
        <section
          aria-label="Como funciona a preservação de flores em 3 passos"
          style={{
            padding: "76px 20px 84px",
            background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)",
          }}
        >
          <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "64px" }}
            >
              <span className="eyebrow">Do bouquet ao quadro</span>
              <h2
                style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "clamp(2rem,4.5vw,3.2rem)",
                  color: "#1E2D2A",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Três passos para a sua arte
              </h2>
            </motion.div>

            <div className="steps-grid">
              {steps.map((step, i) => (
                <StepCard key={i} {...step} delay={i * 0.12} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "56px" }}>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Reservar a Minha Data
              </a>
            </div>
          </div>
        </section>

        {/* ════ 5. TRACKING ════ */}
        <section
          aria-label="Acompanhe a sua encomenda em tempo real"
          style={{ padding: "88px 20px", backgroundColor: "#FAF7F0" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              className="tracking-title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ marginBottom: "8px" }}
            >
              <span className="eyebrow">Transparência total</span>
              <h2
                style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "clamp(2.2rem,4.5vw,3.4rem)",
                  color: "#1E2D2A",
                  margin: "0 0 4px",
                  lineHeight: 1.1,
                }}
              >
                Acompanhe a sua<br />
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>encomenda ao vivo</em>
              </h2>
            </motion.div>

            <div className="tracking-grid">
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <div
                  className="phone-float"
                  style={{ position: "relative", width: "clamp(200px, 38vw, 280px)", transform: "rotate(-2deg)" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-24px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "70%",
                      height: "40px",
                      background: "radial-gradient(ellipse, rgba(30,45,42,0.18) 0%, transparent 70%)",
                      borderRadius: "50%",
                      zIndex: 0,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      backgroundColor: "#1E2D2A",
                      borderRadius: "42px",
                      padding: "14px 10px",
                      boxShadow:
                        "0 32px 80px rgba(30,45,42,0.35), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "10px",
                        gap: "6px",
                        alignItems: "center",
                      }}
                      aria-hidden="true"
                    >
                      <div style={{ width: "60px", height: "6px", borderRadius: "10px", backgroundColor: "#2D4A40" }} />
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#2D4A40" }} />
                    </div>
                    <div
                      style={{
                        borderRadius: "28px",
                        overflow: "hidden",
                        backgroundColor: "#0f1f1a",
                        aspectRatio: "9/19.5",
                        position: "relative",
                      }}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        aria-label="Vídeo de tracking da encomenda"
                      >
                        <source src="/tracking.webm" type="video/webm" />
                      </video>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }} aria-hidden="true">
                      <div style={{ width: "36px", height: "4px", borderRadius: "10px", backgroundColor: "#2D4A40" }} />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="eyebrow tracking-desktop-title">Transparência total</span>
                <h2
                  className="tracking-desktop-title"
                  style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "clamp(2.2rem,4.5vw,3.4rem)",
                    color: "#1E2D2A",
                    margin: "0 0 20px",
                    lineHeight: 1.1,
                  }}
                >
                  Acompanhe a sua<br />
                  <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>encomenda ao vivo</em>
                </h2>
                <p style={{ color: "#5A6B60", lineHeight: 1.85, fontSize: "clamp(1rem,2vw,1.1rem)", margin: "0 0 36px" }}>
                  Após receber as suas flores, partilhamos consigo cada etapa do processo, da prensagem à composição
                  final. Pode acompanhar tudo em tempo real, sem ter de perguntar.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {[
                    {
                      icon: <IconFlower />,
                      iconColor: "#3D6B5E",
                      title: "Receção das flores",
                      desc: "Confirmamos a chegada e avaliamos o estado das flores no mesmo dia.",
                    },
                    {
                      icon: <IconFrame />,
                      iconColor: "#3D6B5E",
                      title: "Composição aprovada por si",
                      desc: "Enviamos uma fotografia da composição antes de emoldurar. Tem sempre a palavra final.",
                    },
                    {
                      icon: <IconPackage />,
                      iconColor: "#3D6B5E",
                      title: "Envio com rastreio",
                      desc: "A encomenda segue com número de rastreio CTT para acompanhar até à sua porta.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        padding: "18px 0",
                        borderBottom: i < 2 ? "1px solid rgba(61,107,94,0.12)" : "none",
                      }}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #EDF2E8, #D4DECC)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: item.iconColor,
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ margin: "0 0 4px", fontWeight: "700", color: "#1E2D2A", fontSize: "1rem", fontFamily: "Roboto, sans-serif" }}>
                          {item.title}
                        </p>
                        <p style={{ margin: 0, color: "#5A6B60", fontSize: "0.95rem", lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 6. GOOGLE REVIEWS ════ */}
        <section
          aria-label="Avaliações de clientes da Flores à Beira-Rio"
          style={{ padding: "76px 20px", backgroundColor: "#1E2D2A", color: "#FAF7F0", textAlign: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: "940px", margin: "0 auto" }}
          >
            <span style={{ display: "block", fontSize: "0.875rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#8BA888", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>
              Clientes felizes
            </span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", margin: "0 0 40px", lineHeight: 1.1, color: "#FAF7F0" }}>
              O que dizem quem confiou em nós
            </h2>
            <div ref={reviewRef} style={{ minHeight: "200px" }} />
          </motion.div>
        </section>

        {/* ════ 7. APCC ════ */}
        <section
          aria-label="Parceria solidária com a APCC Coimbra"
          style={{ padding: "96px 20px", background: "linear-gradient(160deg, #1E2D2A 0%, #2D4A3E 50%, #1E2D2A 100%)", position: "relative", overflow: "hidden" }}
        >
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(45deg, #8BA888 0px, #8BA888 1px, transparent 1px, transparent 40px)`, pointerEvents: "none" }}
          />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="apcc-grid">
              <motion.div
                className="apcc-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,168,136,0.12)", border: "1px solid rgba(139,168,136,0.25)", borderRadius: "100px", padding: "7px 16px", marginBottom: "20px" }}>
                  <span style={{ color: "#8BA888", fontSize: "0.95rem", lineHeight: 1 }} aria-hidden="true">♥</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", color: "#8BA888", fontFamily: "Roboto, sans-serif" }}>Parceria solidária</span>
                </div>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>
                  Cada detalhe<br />
                  <em style={{ fontStyle: "italic", color: "#8BA888" }}>tem um propósito</em>
                </h2>
                <p style={{ color: "rgba(250,247,240,0.7)", lineHeight: 1.82, fontSize: "0.97rem", margin: "0 0 28px" }}>
                  Parte da embalagem do seu quadro é feita à mão pelos utentes da APCC Coimbra. Cada peça é única, criada com cuidado especialmente para a Flores à Beira-Rio.
                </p>
                {[
                  { icon: "♻️", title: "Pensado para reutilizar", desc: "O saco protege o quadro e pode depois ser usado para guardar roupa, coisas de praia, o que couber." },
                  { icon: "💜", title: "Trabalho com valor social", desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da APCC." },
                  { icon: "🌿", title: "Arte consciente e local", desc: "Artesanato português, embalagem sem desperdício, flores preservadas para durar décadas." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.08, duration: 0.5 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "13px 0", borderBottom: i < 2 ? "1px solid rgba(139,168,136,0.1)" : "none" }}
                  >
                    <span style={{ fontSize: "1.05rem", marginTop: "3px", flexShrink: 0 }} aria-hidden="true">{item.icon}</span>
                    <div>
                      <p style={{ margin: "0 0 2px", fontWeight: "700", color: "#FAF7F0", fontSize: "0.9rem", fontFamily: "Roboto, sans-serif" }}>{item.title}</p>
                      <p style={{ margin: 0, color: "rgba(250,247,240,0.55)", fontSize: "0.86rem", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Link para sustentabilidade */}
                <div style={{ marginTop: "28px" }}>
                  <a
                    href="/sustentabilidade"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#8BA888",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      fontFamily: "Roboto, sans-serif",
                      borderBottom: "1px solid rgba(139,168,136,0.4)",
                      paddingBottom: "2px",
                      transition: "border-color 0.2s ease, color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8BA888"; e.currentTarget.style.color = "#A8C8A5"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(139,168,136,0.4)"; e.currentTarget.style.color = "#8BA888"; }}
                  >
                    Saber mais sobre sustentabilidade →
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="apcc-visual"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <div style={{ position: "relative", maxWidth: "340px", width: "100%" }}>
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0, transform: "translate(12px, 12px) rotate(2deg)", borderRadius: "18px", background: "rgba(139,168,136,0.1)", border: "1px solid rgba(139,168,136,0.15)" }} />
                  <div style={{ position: "relative", transform: "rotate(-1.5deg)", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(139,168,136,0.2)", aspectRatio: "3/4", boxShadow: "0 28px 56px rgba(0,0,0,0.4)" }}>
                    <img src="/oficinaapcc.webp" alt="Utentes da Oficina de Tecelagem de Almalaguês e Costura da APCC Coimbra a produzir as embalagens para a Flores à Beira-Rio" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(15,28,22,0.9) 0%, transparent 100%)" }} aria-hidden="true" />
                    <div style={{ position: "absolute", bottom: "18px", left: "18px", right: "18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#FAF7F0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                          <img src="/apcc.webp" alt="Logótipo da Associação de Paralisia Cerebral de Coimbra" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: "700", color: "#FAF7F0", fontSize: "0.78rem", fontFamily: "Roboto, sans-serif", lineHeight: 1.25 }}>Associação de Paralisia Cerebral de Coimbra</p>
                          <p style={{ margin: "2px 0 0", color: "#8BA888", fontSize: "0.7rem", fontFamily: "Roboto, sans-serif" }}>Oficina de Tecelagem de Almalaguês e Costura</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 8. CARTÃO-OFERTA ════ */}
        <section
          aria-label="Cartão-Oferta — ofereça a preservação de flores"
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "560px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Fundo: foto vale1.webp */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/vale1.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Overlay gradiente */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(100deg, rgba(15,28,22,0.88) 0%, rgba(15,28,22,0.72) 50%, rgba(15,28,22,0.4) 100%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "88px 20px",
              width: "100%",
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(184,149,74,0.15)",
                    border: "1px solid rgba(184,149,74,0.35)",
                    borderRadius: "100px",
                    padding: "6px 16px",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", color: "#D4A84B", fontFamily: "Roboto, sans-serif" }}>
                    O presente mais especial
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
                    color: "#FAF7F0",
                    margin: "0 0 20px",
                    lineHeight: 1.1,
                  }}
                >
                  Ofereça memórias<br />
                  <em style={{ fontStyle: "italic", color: "#D4A84B" }}>que duram para sempre</em>
                </h2>

                <p
                  style={{
                    color: "rgba(250,247,240,0.75)",
                    lineHeight: 1.85,
                    fontSize: "clamp(1rem,2vw,1.08rem)",
                    margin: "0 0 34px",
                  }}
                >
                  Ofereça a preservação das flores na forma do nosso cartão-oferta
                  e deixe que os presenteados escolham a preservação ao seu gosto.
                </p>

                <a
                  href="/oferecer-preservacao"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#D4A84B",
                    color: "#1E2D2A",
                    padding: "14px 34px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "0.8rem",
                    letterSpacing: "1.8px",
                    textTransform: "uppercase",
                    fontFamily: "Roboto, sans-serif",
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 24px rgba(184,149,74,0.35)",
                    minHeight: "48px",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C49A38"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#D4A84B"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Descobrir o Cartão-Oferta
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 9. CTA SPLIT ════ */}
        <div className="cta-split">
          {/* Noivas */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "clamp(64px,9vw,96px) clamp(32px,6vw,72px)",
              textAlign: "center",
              minHeight: "480px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Fundo: foto noiva.webp */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/noiva.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                filter: "brightness(0.55)",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(15,30,26,0.3) 0%, rgba(15,30,26,0.65) 100%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1, maxWidth: "440px", margin: "0 auto" }}>
              <span style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(250,247,240,0.75)", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>Para noivas</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4vw,3.2rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>
                Vai casar em breve?
              </h2>
              <p style={{ color: "rgba(250,247,240,0.8)", fontSize: "1rem", lineHeight: 1.82, margin: "0 0 32px" }}>
                Reserve a sua vaga com antecedência, as datas em época de casamentos esgotam rapidamente.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Reservar Data
                </a>
              </div>
            </div>
          </motion.div>

          {/* Sessão de esclarecimento */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              background: "linear-gradient(140deg, #EDF2E8 0%, #F4F0E8 100%)",
              padding: "clamp(64px,9vw,96px) clamp(32px,6vw,72px)",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ maxWidth: "440px", margin: "0 auto" }}>
              <span style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#3D6B5E", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>
                Apoio personalizado
              </span>
              <h2
                style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  color: "#1E2D2A",
                  margin: "0 0 16px",
                  lineHeight: 1.1,
                }}
              >
                À procura de<br />
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>mais ajuda?</em>
              </h2>
              <p
                style={{
                  color: "#5A6B60",
                  fontSize: "0.97rem",
                  lineHeight: 1.82,
                  margin: "0 0 10px",
                }}
              >
                Agende uma sessão de esclarecimento gratuita por videochamada antes de fazer o seu pedido.
              </p>
              <p
                style={{
                  color: "#5A6B60",
                  fontSize: "0.92rem",
                  lineHeight: 1.75,
                  margin: "0 0 32px",
                }}
              >
                Podemos ajudá-lo a entender o processo de preservação e a escolher os produtos que melhor se adequam a si. Esta sessão tem a duração aproximada de 30 minutos.
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <a href="/contactos" className="btn-primary">
                  Contactos
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#25D366",
                    color: "#fff",
                    padding: "14px 28px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    fontFamily: "Roboto, sans-serif",
                    whiteSpace: "nowrap",
                    minHeight: "48px",
                    boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1da851"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#25D366"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <IconWhatsApp size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
