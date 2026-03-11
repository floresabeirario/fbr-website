"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FORM_URL, WA_URL } from "./_lib/constants";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const StructuredData = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      description: "Atelier de preservação botânica artesanal em Coimbra. Transformamos bouquets de casamento em quadros de arte botânica que duram décadas.",
      image: "https://floresabeirario.pt/fotoquadro1.webp",
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressRegion: "Coimbra", addressCountry: "PT" },
      geo: { "@type": "GeoCoordinates", latitude: "40.2033", longitude: "-8.4103" },
      telephone: "+351934680300", email: "info@floresabeirario.pt",
      priceRange: "€€€", openingHours: "Mo-Fr 10:00-18:00",
      sameAs: ["https://instagram.com/floresabeirario", "https://facebook.com/floresabeirario"],
      offers: {
        "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: "300",
        offers: [
          { "@type": "Offer", name: "Preservação de Bouquet 30×40cm", price: "300", priceCurrency: "EUR" },
          { "@type": "Offer", name: "Preservação de Bouquet 40×50cm", price: "400", priceCurrency: "EUR" },
          { "@type": "Offer", name: "Preservação de Bouquet 50×70cm", price: "500", priceCurrency: "EUR" },
        ],
      },
    }),
  }} />
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconFlower = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <ellipse cx="12" cy="6.5" rx="2.5" ry="4" /><ellipse cx="12" cy="17.5" rx="2.5" ry="4" />
    <ellipse cx="6.5" cy="12" rx="4" ry="2.5" /><ellipse cx="17.5" cy="12" rx="4" ry="2.5" />
    <circle cx="12" cy="12" r="3" fill="white" opacity="0.6" /><circle cx="12" cy="12" r="1.5" />
  </svg>
);
const IconFrame = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="2.5" />
    <rect x="6" y="6" width="12" height="12" rx="1.5" fill="white" opacity="0.55" />
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9" />
  </svg>
);
// Ícone reutilização — duas setas circulares
const IconReuse = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconLeaf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);
const IconWA = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.555 4.116 1.524 5.847L.057 23.58a.75.75 0 0 0 .916.919l5.849-1.519A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.734 9.734 0 0 1-4.967-1.36l-.355-.213-3.693.959.984-3.588-.233-.369A9.72 9.72 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
);

// ─── Before/After Slider ──────────────────────────────────────────────────────
const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const rafRef = useRef(null);

  const applyPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition((Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) * 100);
  }, []);

  const onMouseDown = useCallback((e) => { isDragging.current = true; e.preventDefault(); }, []);
  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyPosition(e.clientX));
  }, [applyPosition]);
  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);
  const onTouchStart = useCallback(() => { isDragging.current = true; }, []);
  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyPosition(e.touches[0].clientX));
  }, [applyPosition]);
  const onTouchEnd = useCallback(() => { isDragging.current = false; }, []);

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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div ref={containerRef}
        style={{ position: "relative", width: "100%", maxWidth: "760px", margin: "0 auto", aspectRatio: "4/3", borderRadius: "20px", overflow: "hidden", cursor: "ew-resize", userSelect: "none", WebkitUserSelect: "none", touchAction: "none", boxShadow: "0 24px 64px rgba(30,45,42,0.16)" }}
        onMouseDown={onMouseDown} onTouchStart={onTouchStart}
      >
        <img src="/quadro.webp" alt="Quadro de flores preservadas — depois" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - position}% 0 0)`, willChange: "clip-path" }}>
          <img src="/ramo.webp" alt="Ramo de flores — antes" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
        </div>
        <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "rgba(30,45,42,0.72)", color: "#FAF7F0", padding: "5px 14px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", backdropFilter: "blur(6px)", opacity: position > 12 ? 1 : 0, transition: "opacity 0.2s", pointerEvents: "none" }}>Antes</div>
        <div style={{ position: "absolute", top: "16px", right: "16px", backgroundColor: "rgba(61,107,94,0.8)", color: "#FAF7F0", padding: "5px 14px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", backdropFilter: "blur(6px)", opacity: position < 88 ? 1 : 0, transition: "opacity 0.2s", pointerEvents: "none" }}>Depois</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${position}%`, transform: "translateX(-50%)", width: "2px", background: "rgba(250,247,240,0.9)", pointerEvents: "none", willChange: "left" }} />
        <div style={{ position: "absolute", top: "50%", left: `${position}%`, transform: "translate(-50%, -50%)", width: "46px", height: "46px", borderRadius: "50%", backgroundColor: "#FAF7F0", boxShadow: "0 4px 20px rgba(0,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", willChange: "left" }}>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="#3D6B5E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="0" y1="7" x2="22" y2="7" /><polyline points="5,1 0,7 5,13" /><polyline points="17,1 22,7 17,13" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(0,0,0,0.42)", color: "#FAF7F0", padding: "4px 14px", borderRadius: "50px", fontSize: "0.68rem", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", backdropFilter: "blur(4px)", pointerEvents: "none", whiteSpace: "nowrap" }}>
          Arraste para comparar
        </div>
      </div>
    </motion.div>
  );
};

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
      s.async = true; s.defer = true;
      reviewRef.current.appendChild(s);
    }
  }, []);

  const steps = [
    { number: "01", title: "Reserve a sua data", desc: "Preencha o formulário de reserva com os detalhes do seu evento e garantimos a sua vaga com antecedência. As vagas são limitadas.", imageSrc: "/calendario.webp" },
    { number: "02", title: "Entregue as flores", desc: "Entrega em mãos no atelier, envio por CTT ou recolha no local do evento. Preferencialmente até 3 dias após o grande dia.", imageSrc: "/ramojoana.webp" },
    { number: "03", title: "Recebe a sua obra de arte", desc: "Após aprovação da composição, o quadro é emoldurado com vidro museu anti-UV e enviado para casa ou levantado no atelier.", imageSrc: "/joanaceu.webp" },
  ];

  const apccItems = [
    { icon: <IconReuse />, title: "Pensado para reutilizar", desc: "O saco protege o quadro e pode depois ser usado para guardar roupa, coisas de praia, o que couber." },
    { icon: <IconHeart />, title: "Trabalho com valor social", desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da APCC." },
    { icon: <IconLeaf />, title: "Arte consciente e local", desc: "Artesanato português, embalagem sem desperdício, flores preservadas para durar décadas." },
  ];

  return (
    <>
      <StructuredData />
      <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
            video { animation: none !important; }
          }
          @keyframes floatPhone {
            0%,100% { transform: translateY(0px) rotate(-2deg); }
            50%      { transform: translateY(-12px) rotate(-2deg); }
          }
          .phone-float { animation: floatPhone 5s ease-in-out infinite; }

          /* ═══ TRÊS PASSOS ═══ */
          /* Mobile: coluna única, cartões com gap */
          .steps-stack {
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 0 16px;
          }
          @media (min-width: 768px) {
            .steps-stack {
              flex-direction: row;
              gap: 20px;
              padding: 0 20px;
              align-items: stretch;
            }
          }

          /* Cartão individual: separado, cantos redondos */
          .step-card {
            position: relative;
            flex: 1;
            overflow: hidden;
            border-radius: 20px;
            /* Mobile: mais horizontal para não ocupar tanto espaço vertical */
            aspect-ratio: 16/10;
            max-width: 100%;
          }

          @media (min-width: 768px) {
            .step-card {
              aspect-ratio: 3/4;
              border-radius: 24px;
              max-width: none;
            }
          }

          /* Foto sem filtro, com zoom suave no hover */
          .step-photo {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }

          .step-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.6s ease;
            transform-origin: center center;
          }

          /* Hover: zoom suave na foto, gradiente fica mais visível */
          .step-card:hover .step-photo img {
            transform: scale(1.06);
          }

          /* Conteúdo sempre sobreposto em baixo */
          .step-content {
            position: absolute;
            inset: 0;
            z-index: 2;
            padding: 20px 22px 26px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            background: linear-gradient(to top, rgba(5,10,20,0.9) 0%, rgba(5,10,20,0.5) 42%, rgba(5,10,20,0.0) 100%);
            transition: background 0.4s ease;
          }
          .step-card:hover .step-content {
            background: linear-gradient(to top, rgba(5,10,20,0.95) 0%, rgba(5,10,20,0.6) 50%, rgba(5,10,20,0.05) 100%);
          }

          /* Número */
          .step-number {
            font-family: 'TAN-MEMORIES', serif;
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            line-height: 1;
            margin-bottom: 6px;
            display: block;
            transition: transform 0.3s ease;
          }
          .step-card:hover .step-number { transform: translateY(-3px); }
          .step-card:nth-child(1) .step-number { color: rgba(140,190,230,0.9); }
          .step-card:nth-child(2) .step-number { color: rgba(100,195,170,0.9); }
          .step-card:nth-child(3) .step-number { color: rgba(100,195,140,0.9); }

          .step-title {
            font-family: 'TAN-MEMORIES', serif;
            font-size: clamp(1.05rem, 2vw, 1.45rem);
            line-height: 1.2;
            color: #FAF7F0;
            margin: 0 0 7px;
            transition: transform 0.3s ease;
          }
          .step-card:hover .step-title { transform: translateY(-2px); }

          .step-desc {
            font-size: 0.86rem;
            line-height: 1.62;
            color: rgba(250,247,240,0.8);
            margin: 0;
            transition: transform 0.3s ease;
          }
          .step-card:hover .step-desc { transform: translateY(-2px); }

          /* ═══ OUTROS ═══ */
          .cta-split { display: grid; grid-template-columns: 1fr; }
          @media (min-width: 768px) { .cta-split { grid-template-columns: 1fr 1fr; } }

          .tracking-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
          @media (min-width: 768px) { .tracking-grid { grid-template-columns: 1fr 1fr; gap: 72px; } }
          .tracking-title { display: block; }
          @media (min-width: 768px) { .tracking-title { display: none; } }
          .tracking-desktop-title { display: none; }
          @media (min-width: 768px) { .tracking-desktop-title { display: block; } }

          .apcc-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: start; }
          @media (min-width: 768px) { .apcc-grid { grid-template-columns: 1fr 1fr; gap: 80px; } }
          .apcc-visual { order: 2; } .apcc-text { order: 1; }
          @media (min-width: 768px) { .apcc-visual { order: unset; } .apcc-text { order: unset; } }

          .hero-btn {
            display: inline-flex; align-items: center; justify-content: center;
            padding: 10px 26px; border-radius: 100px; text-decoration: none;
            font-weight: 500; font-size: 0.78rem; letter-spacing: 1.8px;
            text-transform: uppercase; transition: all 0.3s ease;
            font-family: 'Google Sans', Roboto, sans-serif; white-space: nowrap; min-height: 40px;
            border: 1px solid rgba(250,247,240,0.55); color: rgba(250,247,240,0.9);
            background: rgba(250,247,240,0.07); backdrop-filter: blur(6px);
          }
          .hero-btn:hover { background: rgba(250,247,240,0.18); border-color: rgba(250,247,240,0.9); transform: translateY(-2px); }

          /* Botões CTA split — mesma altura e estilo base */
          .cta-btn-ghost {
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            padding: 0 28px; height: 52px; border-radius: 100px; text-decoration: none;
            font-weight: 600; font-size: 0.82rem; letter-spacing: 1.5px;
            text-transform: uppercase; font-family: 'Google Sans', Roboto, sans-serif;
            transition: all 0.3s ease; white-space: nowrap; flex: 1; min-width: 0;
            border: 1.5px solid rgba(255,255,255,0.35); color: #FAF7F0;
            background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
          }
          .cta-btn-ghost:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.65); transform: translateY(-3px); }

          .cta-btn-wa {
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            padding: 0 28px; height: 52px; border-radius: 100px; text-decoration: none;
            font-weight: 600; font-size: 0.82rem; letter-spacing: 1.5px;
            text-transform: uppercase; font-family: 'Google Sans', Roboto, sans-serif;
            transition: all 0.3s ease; white-space: nowrap; flex: 1; min-width: 0;
            background: #25D366; color: #fff;
            box-shadow: 0 4px 16px rgba(37,211,102,0.3);
          }
          .cta-btn-wa:hover { background: #1da851; transform: translateY(-3px); }

          /* Botão noivas igual ao ghost mas no contexto escuro da foto */
          .btn-noiva-ghost {
            display: inline-flex; align-items: center; justify-content: center;
            padding: 0 36px; height: 52px; border-radius: 100px; text-decoration: none;
            font-weight: 600; font-size: 0.82rem; letter-spacing: 1.5px;
            text-transform: uppercase; font-family: 'Google Sans', Roboto, sans-serif;
            transition: all 0.3s ease; white-space: nowrap;
            border: 1.5px solid rgba(250,247,240,0.6); color: #FAF7F0;
            background: rgba(250,247,240,0.1); backdrop-filter: blur(8px);
          }
          .btn-noiva-ghost:hover { background: rgba(250,247,240,0.22); border-color: rgba(250,247,240,0.9); transform: translateY(-3px); }

          .steps-buttons { display: flex; flex-direction: column; align-items: center; gap: 12px; flex-wrap: wrap; }
          @media (min-width: 480px) { .steps-buttons { flex-direction: row; justify-content: center; } }
        ` }} />

        {/* ════ 1. HERO ════ */}
        <section aria-label="Flores à Beira-Rio — Preservação de flores de casamento"
          style={{
            height: "100dvh",
            maxHeight: "100dvh",
            minHeight: "100dvh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <video autoPlay loop muted playsInline aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src="/hero-video.webm" type="video/webm" />
          </video>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,26,0.2) 0%, rgba(15,30,26,0.5) 60%, rgba(15,30,26,0.82) 100%)" }} />

          {/* Título — absolutamente centrado no ecrã, não sofre parallax */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#FAF7F0",
            padding: "0 20px",
            pointerEvents: "none",
          }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
              style={{ fontSize: "clamp(0.65rem,1.2vw,0.82rem)", letterSpacing: "clamp(3px,1vw,5px)", textTransform: "uppercase", fontWeight: "700", marginBottom: "clamp(14px,2.5vw,22px)", color: "rgba(250,247,240,0.78)", fontFamily: "'Google Sans', Roboto, sans-serif" }}
            >
              Especialistas em preservação de flores
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3.2rem, 11vw, 8rem)", lineHeight: 1.15, margin: 0, textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
            >
              Flores à<br /><span style={{ whiteSpace: "nowrap" }}>Beira&#8209;Rio</span>
            </motion.h1>
          </div>

          {/* Botão — fixo em baixo, independente do título */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
            style={{ position: "absolute", bottom: "clamp(44px,7vh,80px)", left: 0, right: 0, zIndex: 3, display: "flex", justifyContent: "center" }}
          >
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="hero-btn">Reservar Data</a>
          </motion.div>
        </section>

        {/* ════ 2. O QUE FAZEMOS + SLIDER ════ */}
        <section aria-label="Serviços de preservação botânica"
          style={{ padding: "80px 20px 40px", background: "linear-gradient(180deg, rgba(29,52,44,0.05) 0%, #FAF7F0 100%)", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="eyebrow">O que fazemos</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1 }}>As suas flores, para sempre</h2>
              <p style={{ color: "#5A6B60", fontSize: "clamp(1rem,2vw,1.1rem)", lineHeight: 1.85, maxWidth: "600px", margin: "0 auto 48px" }}>
                Transformamos flores com valor emocional em quadros de arte botânica que duram décadas. Recebemos flores de Portugal e de toda a Europa no nosso estúdio em Coimbra.
              </p>
              <BeforeAfterSlider />
            </motion.div>
          </div>
        </section>

        {/* ════ 3. TRÊS PASSOS — bold, transição azul→verde, mobile-first ════ */}
        <section aria-label="Como funciona a preservação de flores em 3 passos"
          style={{ background: "linear-gradient(180deg, #0B1929 0%, #0D1F22 100%)", position: "relative", zIndex: 1 }}
        >
          {/* Header da secção */}
          <div style={{ padding: "56px 20px 40px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "3.5px", textTransform: "uppercase", color: "#7AADCA", marginBottom: "12px", fontFamily: "'Google Sans', Roboto, sans-serif" }}>
                Do bouquet ao quadro
              </span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", color: "#FAF7F0", margin: "0 0 12px", lineHeight: 1.1 }}>
                O seu quadro em três passos
              </h2>
              <p style={{ color: "rgba(250,247,240,0.5)", fontSize: "0.9rem", fontFamily: "'Google Sans', Roboto, sans-serif", margin: 0 }}>
                Um processo simples, com acompanhamento em cada etapa.
              </p>
            </motion.div>
          </div>

          {/* Cartões */}
          <div className="steps-stack">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="step-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Foto */}
                <div className="step-photo">
                  <img src={step.imageSrc} alt={`Passo ${step.number}: ${step.title}`} loading="lazy" />
                </div>
                {/* Conteúdo */}
                <div className="step-content">
                  <span className="step-number" aria-hidden="true">{step.number}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botões — Como Funciona | Reservar | Perguntas */}
          <div style={{ padding: "32px 20px 56px" }}>
            <div className="steps-buttons">
              <a href="/como-funciona"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(90deg, rgba(58,111,191,0.18) 0%, rgba(46,138,114,0.18) 100%)", border: "1.5px solid rgba(100,175,200,0.35)", color: "rgba(250,247,240,0.88)", padding: "0 28px", height: "52px", borderRadius: "100px", textDecoration: "none", fontWeight: "600", fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", transition: "all 0.3s ease", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(58,111,191,0.32) 0%, rgba(46,138,114,0.32) 100%)"; e.currentTarget.style.borderColor = "rgba(100,175,200,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(58,111,191,0.18) 0%, rgba(46,138,114,0.18) 100%)"; e.currentTarget.style.borderColor = "rgba(100,175,200,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Como Funciona
              </a>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(90deg, #3A6FBF 0%, #2E8A72 100%)", color: "#FAF7F0", padding: "0 36px", height: "52px", borderRadius: "100px", textDecoration: "none", fontWeight: "700", fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", transition: "all 0.3s ease", boxShadow: "0 6px 28px rgba(46,138,114,0.35)", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(46,138,114,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(46,138,114,0.35)"; }}
              >
                Reservar a Minha Data
              </a>
              <a href="/perguntas-frequentes"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(90deg, rgba(58,111,191,0.18) 0%, rgba(46,138,114,0.18) 100%)", border: "1.5px solid rgba(100,175,200,0.35)", color: "rgba(250,247,240,0.88)", padding: "0 28px", height: "52px", borderRadius: "100px", textDecoration: "none", fontWeight: "600", fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", transition: "all 0.3s ease", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(58,111,191,0.32) 0%, rgba(46,138,114,0.32) 100%)"; e.currentTarget.style.borderColor = "rgba(100,175,200,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(58,111,191,0.18) 0%, rgba(46,138,114,0.18) 100%)"; e.currentTarget.style.borderColor = "rgba(100,175,200,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Perguntas Frequentes
              </a>
            </div>
          </div>
        </section>

        {/* ════ 4. TRACKING ════ */}
        <section aria-label="Acompanhe a sua encomenda em tempo real"
          style={{ padding: "88px 20px", background: "linear-gradient(180deg, #FAF7F0 0%, #F8F2E4 100%)", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div className="tracking-title" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: "32px" }}>
              <span className="eyebrow">Transparência total</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", color: "#1E2D2A", margin: "0 0 4px", lineHeight: 1.1 }}>
                Acompanhe a sua<br /><em style={{ fontStyle: "italic", color: "#3D6B5E" }}>encomenda ao vivo</em>
              </h2>
            </motion.div>

            <div className="tracking-grid">
              <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="phone-float" style={{ position: "relative", width: "clamp(200px, 38vw, 280px)", transform: "rotate(-2deg)" }}>
                  <div style={{ position: "absolute", bottom: "-24px", left: "50%", transform: "translateX(-50%)", width: "70%", height: "40px", background: "radial-gradient(ellipse, rgba(30,45,42,0.18) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} aria-hidden="true" />
                  <div style={{ position: "relative", zIndex: 1, backgroundColor: "#1E2D2A", borderRadius: "42px", padding: "14px 10px", boxShadow: "0 32px 80px rgba(30,45,42,0.35), 0 0 0 1px rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", gap: "6px", alignItems: "center" }} aria-hidden="true">
                      <div style={{ width: "60px", height: "6px", borderRadius: "10px", backgroundColor: "#2D4A40" }} />
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#2D4A40" }} />
                    </div>
                    <div style={{ borderRadius: "28px", overflow: "hidden", backgroundColor: "#0f1f1a", aspectRatio: "9/19.5" }}>
                      <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} aria-label="Vídeo de tracking da encomenda">
                        <source src="/tracking.webm" type="video/webm" />
                      </video>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }} aria-hidden="true">
                      <div style={{ width: "36px", height: "4px", borderRadius: "10px", backgroundColor: "#2D4A40" }} />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                <span className="eyebrow tracking-desktop-title">Transparência total</span>
                <h2 className="tracking-desktop-title" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", color: "#1E2D2A", margin: "0 0 20px", lineHeight: 1.1 }}>
                  Acompanhe a sua<br /><em style={{ fontStyle: "italic", color: "#3D6B5E" }}>encomenda ao vivo</em>
                </h2>
                <p style={{ color: "#5A6B60", lineHeight: 1.85, fontSize: "clamp(1rem,2vw,1.1rem)", margin: "0 0 36px" }}>
                  Após a reserva estar confirmada, partilhamos consigo cada etapa do processo, da receção das flores à composição final. Pode acompanhar tudo em tempo real, sem ter de perguntar.
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[
                    { icon: <IconFlower />, title: "Receção das flores", desc: "Confirmamos a chegada e avaliamos o estado das flores no mesmo dia." },
                    { icon: <IconFrame />, title: "Composição aprovada por si", desc: "Enviamos uma fotografia da composição antes de emoldurar. Tem sempre a palavra final." },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "18px 0", borderBottom: i === 0 ? "1px solid rgba(61,107,94,0.12)" : "none" }}
                    >
                      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, #EDF2E8, #D4DECC)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3D6B5E", flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
                      <div>
                        <p style={{ margin: "0 0 4px", fontWeight: "700", color: "#1E2D2A", fontSize: "1rem", fontFamily: "'Google Sans', Roboto, sans-serif" }}>{item.title}</p>
                        <p style={{ margin: 0, color: "#5A6B60", fontSize: "0.95rem", lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 5. GOOGLE REVIEWS ════ */}
        <section aria-label="Avaliações de clientes" style={{ padding: "76px 20px", backgroundColor: "#1E2D2A", color: "#FAF7F0", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "940px", margin: "0 auto" }}>
            <span style={{ display: "block", fontSize: "0.875rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#8BA888", marginBottom: "14px", fontFamily: "'Google Sans', Roboto, sans-serif" }}>Clientes felizes</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", margin: "0 0 40px", lineHeight: 1.1, color: "#FAF7F0" }}>O que dizem quem confiou em nós</h2>
            <div ref={reviewRef} style={{ minHeight: "200px" }} />
          </motion.div>
        </section>

        {/* ════ 6. APCC ════ */}
        <section aria-label="Parceria solidária com a APCC Coimbra"
          style={{ padding: "96px 20px", background: "linear-gradient(160deg, #1E2D2A 0%, #2D4A3E 50%, #1E2D2A 100%)", position: "relative", overflow: "hidden" }}
        >
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(45deg, #8BA888 0px, #8BA888 1px, transparent 1px, transparent 40px)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="apcc-grid">
              <motion.div className="apcc-text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,168,136,0.12)", border: "1px solid rgba(139,168,136,0.25)", borderRadius: "100px", padding: "7px 16px", marginBottom: "20px" }}>
                  <span style={{ color: "#8BA888", fontSize: "0.75rem" }} aria-hidden="true">♥</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", color: "#8BA888", fontFamily: "'Google Sans', Roboto, sans-serif" }}>Parceria solidária</span>
                </div>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>
                  Cada detalhe<br /><em style={{ fontStyle: "italic", color: "#8BA888" }}>tem um propósito</em>
                </h2>
                <p style={{ color: "rgba(250,247,240,0.7)", lineHeight: 1.82, fontSize: "0.97rem", margin: "0 0 28px" }}>
                  Parte da embalagem do seu quadro é feita à mão pelos utentes da APCC Coimbra. Cada peça é única, criada com cuidado especialmente para a Flores à Beira-Rio.
                </p>
                {apccItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + i * 0.08, duration: 0.5 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "13px 0", borderBottom: i < 2 ? "1px solid rgba(139,168,136,0.1)" : "none" }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(139,168,136,0.12)", border: "1px solid rgba(139,168,136,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8BA888", flexShrink: 0, marginTop: "2px" }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ margin: "0 0 2px", fontWeight: "700", color: "#FAF7F0", fontSize: "0.9rem", fontFamily: "'Google Sans', Roboto, sans-serif" }}>{item.title}</p>
                      <p style={{ margin: 0, color: "rgba(250,247,240,0.55)", fontSize: "0.86rem", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="apcc-visual" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}
              >
                <div style={{ position: "relative", maxWidth: "340px", width: "100%" }}>
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0, transform: "translate(12px, 12px) rotate(2deg)", borderRadius: "18px", background: "rgba(139,168,136,0.1)", border: "1px solid rgba(139,168,136,0.15)" }} />
                  <div style={{ position: "relative", transform: "rotate(-1.5deg)", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(139,168,136,0.2)", aspectRatio: "3/4", boxShadow: "0 28px 56px rgba(0,0,0,0.4)" }}>
                    <img src="/oficinaapcc.webp" alt="Utentes da Oficina de Tecelagem de Almalaguês e Costura da APCC Coimbra a produzir as embalagens para a Flores à Beira-Rio" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(15,28,22,0.9) 0%, transparent 100%)" }} aria-hidden="true" />
                    <div style={{ position: "absolute", bottom: "18px", left: "18px", right: "18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#FAF7F0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                          <img src="/apcc.webp" alt="Logótipo APCC" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: "700", color: "#FAF7F0", fontSize: "0.78rem", fontFamily: "'Google Sans', Roboto, sans-serif", lineHeight: 1.25 }}>Associação de Paralisia Cerebral de Coimbra</p>
                          <p style={{ margin: "2px 0 0", color: "#8BA888", fontSize: "0.7rem", fontFamily: "'Google Sans', Roboto, sans-serif" }}>Oficina de Tecelagem de Almalaguês e Costura</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="/sustentabilidade"
                  style={{ color: "#8BA888", textDecoration: "none", fontSize: "0.82rem", fontWeight: "600", fontFamily: "'Google Sans', Roboto, sans-serif", borderBottom: "1px solid rgba(139,168,136,0.4)", paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s", maxWidth: "320px", lineHeight: 1.5 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8BA888"; e.currentTarget.style.color = "#A8C8A5"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(139,168,136,0.4)"; e.currentTarget.style.color = "#8BA888"; }}
                >
                  Saiba mais sobre a origem dos nossos materiais e a nossa política de sustentabilidade →
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 7. CARTÃO-OFERTA ════ */}
        <section aria-label="Cartão-Oferta — ofereça a preservação de flores"
          style={{ position: "relative", overflow: "hidden", minHeight: "560px", display: "flex", alignItems: "center" }}
        >
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/vale1.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(15,12,30,0.78) 0%, rgba(15,12,30,0.55) 55%, rgba(15,12,30,0.15) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "88px 20px", width: "100%" }}>
            <div style={{ maxWidth: "580px" }}>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(160,148,220,0.18)", border: "1px solid rgba(160,148,220,0.35)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", color: "#C5BCEF", fontFamily: "'Google Sans', Roboto, sans-serif" }}>O presente mais especial</span>
                </div>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.5rem)", color: "#FAF7F0", margin: "0 0 20px", lineHeight: 1.1 }}>
                  Ofereça memórias<br /><em style={{ fontStyle: "italic", color: "#C5BCEF" }}>que duram para sempre</em>
                </h2>
                <p style={{ color: "rgba(250,247,240,0.78)", lineHeight: 1.85, fontSize: "clamp(1rem,2vw,1.08rem)", margin: "0 0 34px" }}>
                  Ofereça a preservação das flores na forma do nosso cartão-oferta e deixe que os presenteados escolham a preservação ao seu gosto.
                </p>
                <a href="/oferecer-preservacao"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#A094DC", color: "#FAF7F0", padding: "14px 34px", borderRadius: "100px", textDecoration: "none", fontWeight: "700", fontSize: "0.8rem", letterSpacing: "1.8px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", transition: "all 0.3s ease", boxShadow: "0 6px 24px rgba(100,88,180,0.4)", minHeight: "48px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#8878C8"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#A094DC"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Descobrir o Cartão-Oferta
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 8. CTA SPLIT ════ */}
        <div className="cta-split">

          {/* Apoio personalizado — gradiente slate profundo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              background: "linear-gradient(135deg, #0F1923 0%, #1C2E3A 40%, #243545 75%, #2E4255 100%)",
              padding: "clamp(64px,9vw,96px) clamp(32px,6vw,72px)",
              textAlign: "center",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              minHeight: "480px",
            }}
          >
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: `radial-gradient(circle at 20% 80%, rgba(100,180,220,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(60,140,180,0.3) 0%, transparent 55%)`, pointerEvents: "none" }} />
            <div style={{ maxWidth: "440px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
              <span style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(180,210,230,0.7)", marginBottom: "14px", fontFamily: "'Google Sans', Roboto, sans-serif" }}>
                Apoio personalizado
              </span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>
                À procura de<br /><em style={{ fontStyle: "italic", color: "#A8D4E8" }}>mais ajuda?</em>
              </h2>
              <p style={{ color: "rgba(200,225,240,0.78)", fontSize: "0.97rem", lineHeight: 1.82, margin: "0 0 10px" }}>
                Agende uma sessão de esclarecimento gratuita por videochamada antes de fazer o seu pedido.
              </p>
              <p style={{ color: "rgba(200,225,240,0.55)", fontSize: "0.9rem", lineHeight: 1.75, margin: "0 0 32px" }}>
                Podemos ajudá-lo a entender o processo de preservação e a escolher os produtos que melhor se adequam a si. Esta sessão tem a duração aproximada de 30 minutos.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contactos" className="cta-btn-ghost">Contactos</a>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="cta-btn-wa">
                  <IconWA /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Vai casar em breve — foto noiva, botão com mesmo estilo ghost */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ position: "relative", overflow: "hidden", padding: "clamp(64px,9vw,96px) clamp(32px,6vw,72px)", textAlign: "center", minHeight: "480px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/noiva.webp')", backgroundSize: "cover", backgroundPosition: "center top", filter: "brightness(0.52)" }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,26,0.28) 0%, rgba(15,30,26,0.65) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: "440px", margin: "0 auto" }}>
              <span style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(250,247,240,0.75)", marginBottom: "14px", fontFamily: "'Google Sans', Roboto, sans-serif" }}>Para noivas</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4vw,3.2rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>Vai casar em breve?</h2>
              <p style={{ color: "rgba(250,247,240,0.8)", fontSize: "1rem", lineHeight: 1.82, margin: "0 0 32px" }}>
                Reserve a sua vaga com antecedência, as datas em época de casamentos esgotam rapidamente.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-noiva-ghost">Reservar Data</a>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
}
