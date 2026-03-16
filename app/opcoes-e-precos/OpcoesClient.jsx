"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import { FORM_URL, TRACKING_URL } from "../_lib/constants";

const GS = "var(--font-google-sans), 'Google Sans', sans-serif";
const VERDE_CLARO = "#8BA888";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
};

function Reveal({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? "show" : "hidden"} transition={{ delay }}
      style={style} className={className}>
      {children}
    </motion.div>
  );
}

function Label({ children, light }) {
  return (
    <p style={{
      fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase",
      color: light ? "rgba(250,247,240,0.5)" : VERDE_CLARO,
      fontFamily: GS, margin: "0 0 20px", fontWeight: 500
    }}>
      {children}
    </p>
  );
}

// ── SVG icons para elementos especiais ──────────────────────────────────────
const elementosIcons = {
  convite: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1.5 5l7.5 5.5L16.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  votos: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 3h10a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M6 7h6M6 9.5h6M6 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  joia: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 3.5V1M9 17v-2.5M3.5 9H1M17 9h-2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  fita: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 8.5 C7 7 3.5 5.5 3 3.5 C2.6 2 4 1 5.5 1.5 C7 2 8 4.5 9 8.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
      <path d="M9 8.5 C11 7 14.5 5.5 15 3.5 C15.4 2 14 1 12.5 1.5 C11 2 10 4.5 9 8.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
      <path d="M5 3.5 C5.8 3.8 6.5 4.8 7.2 6.2" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
      <path d="M4.2 4.8 C5.2 5 6 5.8 6.8 7" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
      <path d="M13 3.5 C12.2 3.8 11.5 4.8 10.8 6.2" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
      <path d="M13.8 4.8 C12.8 5 12 5.8 11.2 7" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
      <ellipse cx="9" cy="8.8" rx="1.6" ry="1.1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M7.8 9.6 C7 11.5 6.5 13.5 7 16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
      <path d="M10.2 9.6 C11 11.5 11.5 13.5 11 16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
      <path d="M7.5 11 L7.2 12 M7.2 13 L7 14" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
      <path d="M10.5 11 L10.8 12 M10.8 13 L11 14" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  coleira: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 7 C3 4.8 5.8 3 9 3 C12.2 3 15 4.8 15 7 C15 9.2 12.2 11 9 11 C5.8 11 3 9.2 3 7Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <rect x="7.5" y="5.8" width="3" height="2.4" rx="0.5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
      <line x1="9" y1="5.8" x2="9" y2="8.2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M9 11 L9 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="7.2" cy="15" r="1.1" stroke="currentColor" strokeWidth="1.1" fill="none"/>
      <circle cx="10.8" cy="15" r="1.1" stroke="currentColor" strokeWidth="1.1" fill="none"/>
      <line x1="8.3" y1="14.55" x2="9.7" y2="14.55" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8.3" y1="15.45" x2="9.7" y2="15.45" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  carta: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M1.5 5 L9 10 L16.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M9 8 C9 8 7.2 6.5 7.2 5.4 C7.2 4.6 7.8 4 8.5 4 C8.85 4 9 4.3 9 4.3 C9 4.3 9.15 4 9.5 4 C10.2 4 10.8 4.6 10.8 5.4 C10.8 6.5 9 8 9 8Z" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.25"/>
    </svg>
  ),
  objeto: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.1l-3.7 2.2.7-4.1L3 6.3l4.2-.7L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
};

const elementosEspeciais = [
  { key: "convite", label: "Convite do casamento",  icon: elementosIcons.convite },
  { key: "votos",   label: "Votos manuscritos",     icon: elementosIcons.votos   },
  { key: "joia",    label: "Joias ou medalhas",     icon: elementosIcons.joia    },
  { key: "fita",    label: "Fitas e rendas",        icon: elementosIcons.fita    },
  { key: "coleira", label: "Coleiras de animais",   icon: elementosIcons.coleira },
  { key: "carta",   label: "Cartas e bilhetes",     icon: elementosIcons.carta   },
  { key: "objeto",  label: "Objetos pessoais",      icon: elementosIcons.objeto  },
];

// ── FrameSVG ─────────────────────────────────────────────────────────────────
function Flower({ cx, cy, scale = 1, rotate = 0, opacity = 0.45, dark = false }) {
  const r = dark ? `rgba(15,30,26,${opacity})` : `rgba(250,247,240,${opacity})`;
  const rs = dark ? `rgba(15,30,26,${opacity * 0.7})` : `rgba(250,247,240,${opacity * 0.75})`;
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${rotate}) scale(${scale}) translate(-100, -125)`}>
      <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
        stroke={r} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
        stroke={rs} strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)" stroke={r} strokeWidth="1.5" fill="none" />
    </g>
  );
}

function FrameSVG({ vw, vh, flowers, svgWidth, label, dark = false }) {
  const stroke1 = dark ? "rgba(15,30,26,0.45)" : "rgba(250,247,240,0.55)";
  const stroke2 = dark ? "rgba(15,30,26,0.22)" : "rgba(250,247,240,0.28)";
  const strokeGlass = dark ? "rgba(15,30,26,0.14)" : "rgba(250,247,240,0.18)";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${vw} ${vh}`}
      style={{ width: svgWidth, height: "auto", display: "block" }} aria-label={`Ilustração moldura ${label}`}>
      <rect x="10" y="10" width={vw - 20} height={vh - 20} stroke={stroke1} strokeWidth="2" fill="none" />
      <rect x="18" y="18" width={vw - 36} height={vh - 36} stroke={stroke2} strokeWidth="1.2" fill="none" />
      <line x1="32" y1={vh * 0.28} x2={vw * 0.42} y2="28" stroke={strokeGlass} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="48" y1={vh * 0.38} x2={vw * 0.56} y2="44" stroke={strokeGlass} strokeWidth="1.1" strokeLinecap="round" />
      <line x1={vw - 44} y1={vh - 60} x2={vw - 24} y2={vh - 82} stroke={strokeGlass} strokeWidth="1.3" strokeLinecap="round" />
      {flowers.map((f, i) => <Flower key={i} {...f} dark={dark} />)}
    </svg>
  );
}

function OrnamentSVG({ svgWidth, light = false }) {
  const s = light ? "rgba(250,247,240,0.55)" : "rgba(15,30,26,0.45)";
  const s2 = light ? "rgba(250,247,240,0.35)" : "rgba(15,30,26,0.28)";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"
      style={{ width: svgWidth, height: "auto", display: "block" }} aria-label="Ilustração ornamento de natal">
      <path d="M 130 -10 Q 165 70 192 145" stroke={s} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 270 -10 Q 235 70 208 145" stroke={s} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 160 -10 Q 185 60 198 135" stroke={s2} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 240 -10 Q 215 60 202 135" stroke={s2} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="200" cy="142" r="8" stroke={s} strokeWidth="2.5" fill="none"/>
      <circle cx="200" cy="280" r="130" stroke={s} strokeWidth="2.5" fill="none"/>
      <circle cx="200" cy="280" r="120" stroke={s2} strokeWidth="1.5" fill="none"/>
      <line x1="120" y1="210" x2="160" y2="170" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="135" y1="235" x2="175" y2="195" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="240" y1="360" x2="280" y2="320" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <g transform="translate(200, 280) scale(1.6) translate(-100, -125)">
        <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
          stroke={s} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
          stroke={s2} strokeWidth="1" strokeLinecap="round"/>
        <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)" stroke={s} strokeWidth="1.5" fill="none"/>
      </g>
    </svg>
  );
}

function PendantSVG({ svgWidth, light = false }) {
  const s = light ? "rgba(250,247,240,0.55)" : "rgba(15,30,26,0.45)";
  const s2 = light ? "rgba(250,247,240,0.35)" : "rgba(15,30,26,0.28)";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"
      style={{ width: svgWidth, height: "auto", display: "block" }} aria-label="Ilustração pendente para colar">
      <path d="M 197 186 L 120 0" stroke={s2} strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M 203 186 L 280 0" stroke={s2} strokeWidth="1" fill="none" strokeLinecap="round"/>
      <circle cx="200" cy="193" r="7" stroke={s} strokeWidth="2" fill="none"/>
      <circle cx="200" cy="300" r="100" stroke={s} strokeWidth="2.5" fill="none"/>
      <circle cx="200" cy="300" r="90" stroke={s2} strokeWidth="1.5" fill="none"/>
      <line x1="140" y1="245" x2="170" y2="215" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="155" y1="265" x2="180" y2="240" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="230" y1="360" x2="260" y2="330" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <g transform="translate(200, 300) scale(1.2) translate(-100, -125)">
        <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
          stroke={s} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
          stroke={s2} strokeWidth="1" strokeLinecap="round"/>
        <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)" stroke={s} strokeWidth="1.5" fill="none"/>
      </g>
    </svg>
  );
}

const frames = [
  { size: "30×40", unit: "cm", price: "300", desc: "Perfeito para peças mais íntimas ou como elemento de conjunto.", vw: 180, vh: 240, svgWidth: "88px", flowers: [{ cx: 90, cy: 120, scale: 0.9, rotate: -8, opacity: 0.45 }] },
  { size: "40×50", unit: "cm", price: "400", desc: "Equilibra presença e elegância.", vw: 200, vh: 250, svgWidth: "118px", flowers: [{ cx: 82, cy: 118, scale: 0.95, rotate: -15, opacity: 0.48 }, { cx: 128, cy: 142, scale: 0.85, rotate: 12, opacity: 0.38 }] },
  { size: "50×70", unit: "cm", price: "500", desc: "Uma peça de destaque, que domina qualquer parede.", vw: 200, vh: 280, svgWidth: "148px", flowers: [{ cx: 100, cy: 90, scale: 1.0, rotate: -10, opacity: 0.5 }, { cx: 62, cy: 168, scale: 0.82, rotate: 18, opacity: 0.38 }, { cx: 148, cy: 188, scale: 0.76, rotate: -22, opacity: 0.32 }] },
  { size: "20×25", unit: "cm", price: "90", desc: "Só disponível em conjunto com a compra de um quadro maior.", addon: true, vw: 160, vh: 200, svgWidth: "62px", flowers: [{ cx: 80, cy: 100, scale: 0.72, rotate: 6, opacity: 0.42 }] },
  { size: "Ornamento de Natal", unit: "~8 cm", price: "35", desc: "Ornamento de Natal com vidro duplo soldado sem chumbo, com prata. Só disponível em conjunto com a compra de um quadro maior.", addon: true, addonColor: "#6B1F2A", badge: "Para oferecer", customSvg: "ornament", svgWidth: "72px" },
  { size: "Pendente para Colar", unit: "~3 cm", price: "35", desc: "Pendente com vidro duplo soldado sem chumbo, com prata. Só disponível em conjunto com a compra de um quadro maior.", addon: true, addonColor: "#3A3050", badge: "Joalharia", customSvg: "pendant", svgWidth: "56px" },
];

export default function OpcoesClient() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.38], [0, 28]);

  return (
    <div style={{ backgroundColor: "#FAF7F0", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100svh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        {/* Foto de fundo */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image fill
            src="/fotoquadro1.webp"
            alt=""
            aria-hidden="true"
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,20,16,0.92) 0%, rgba(10,20,16,0.55) 45%, rgba(10,20,16,0.15) 100%)" }} />
        </div>

        {/* Texto alinhado ao fundo, centrado */}
        <motion.div style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 2, width: "100%", padding: "clamp(110px,14vw,160px) clamp(24px,5vw,72px) clamp(60px,8vw,90px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: "640px", textAlign: "center", margin: "0 auto" }}
          >
            <p style={{ fontSize: "0.62rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(250,247,240,0.9)", fontFamily: GS, margin: "0 0 14px", fontWeight: 700 }}>
              Opções e Preços
            </p>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.05, color: "#FAF7F0", margin: "0 0 clamp(1.2rem, 2.5vw, 1.8rem)" }}>
              Preserve as flores<br />
              <em style={{ fontStyle: "italic", color: VERDE_CLARO }}>que contam a sua história</em>
            </h1>
            <p style={{ fontSize: "clamp(0.93rem, 1.8vw, 1.08rem)", lineHeight: 1.85, maxWidth: "460px", color: "rgba(250,247,240,0.88)", margin: "0 auto" }}>
              Cada quadro é uma peça única, feita à mão em Coimbra. Escolha o fundo, o tamanho e os detalhes que tornam a sua composição verdadeiramente sua.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TIPOS DE FUNDO ── */}
      <section style={{ backgroundColor: "#FAF7F0", padding: "clamp(40px,7vw,70px) 0 clamp(50px,8vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px clamp(32px,5vw,48px)" }}>
          <Reveal>
            <Label>Personalização</Label>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: 0, lineHeight: 1.05, color: "#1a1a1a" }}>
              Tipos de Fundo
            </h2>
          </Reveal>
        </div>
        <div style={{ overflowX: "hidden" }}>
          <div className="fundos-track">
            {[
              { img: "/quadrovidrosobrevidro.webp", alt: "Quadro de flores prensadas em vidro sobre vidro com efeito transparente", tag: "Mais popular", tagSolid: true, title: "Vidro sobre Vidro", desc: "As flores ficam suspensas entre dois vidros, sem fundo opaco. Efeito leve e moderno, ideal para espaços luminosos." },
              { img: "/quadrofoto.webp", alt: "Quadro de flores prensadas com fotografia personalizada como fundo", tag: "Custo adicional", tagSolid: false, title: "Fundo com Fotografia", desc: "Uma paisagem, um retrato, ou qualquer imagem com significado especial. A fotografia é profissionalmente impressa." },
              { img: "/quadropreto.webp", alt: "Quadro de flores prensadas com fundo preto ou colorido personalizado", tag: null, title: "Fundo Colorido", desc: "Aplicamos qualquer cor de fundo para realçar as flores. Sugerimos tonalidades que combinem com a paleta do bouquet." },
              { img: "/quadrobranco.webp", alt: "Quadro de flores prensadas com fundo branco minimalista", tag: null, title: "Fundo Branco", desc: "Minimalista e intemporal. Realça naturalmente as cores e formas das flores com máxima simplicidade." },
            ].map((item, i) => (
              <div key={i} className="fundo-card-new">
                <div style={{ aspectRatio: "4/3", overflow: "hidden", borderRadius: "6px", backgroundColor: "#e0dbd3", position: "relative" }}>
                  <Image fill src={item.img} alt={item.alt}
                    sizes="(max-width: 768px) 100vw, 25vw" className="fundo-img-new" style={{ objectFit: "cover", transition: "transform 0.9s ease" }} />
                  {item.tag && (
                    <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: item.tagSolid ? "#3D6B5E" : "rgba(15,30,26,0.55)", color: "#FAF7F0", fontSize: "0.52rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: GS, fontWeight: 600, padding: "5px 11px", borderRadius: "100px", backdropFilter: "blur(4px)" }}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <div style={{ padding: "18px 4px 0" }}>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", fontWeight: 400, margin: "0 0 8px", lineHeight: 1.2, color: "#1a1a1a" }}>{item.title}</h3>
                  <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.75, color: "rgba(26,26,26,0.58)", margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="slider-hint" aria-live="polite" style={{ color: "rgba(26,26,26,0.28)" }}>deslize para ver mais</p>
      </section>

      {/* ── PRESENTES PARA OFERECER ── */}
      <section style={{ backgroundColor: "#F2EDE4", padding: "clamp(36px,5vw,56px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "28px" }}>
              <Label>Para oferecer</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: "0 0 14px", lineHeight: 1.1 }}>
                Presentes com <em style={{ color: VERDE_CLARO }}>memória</em>
              </h2>
              <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(26,26,26,0.55)", maxWidth: "460px", margin: 0 }}>
                Para além do seu quadro principal, pode encomendar peças adicionais. Presentes pessoais e cheios de significado para quem ama.
              </p>
            </div>
          </Reveal>
          <div className="presentes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { img: "/miniquadros.webp", alt: "Mini quadros 20x25cm de flores preservadas", badge: "Mini quadro", badgeBg: "rgba(139,168,136,0.12)", badgeColor: VERDE_CLARO, title: "20×25 cm", desc: "Uma moldura com as flores do seu bouquet para oferecer a familiares, padrinhos ou damas de honor. Um presente com memória e significado.", note: "Só com a compra de um quadro maior." },
              { img: "/ornamento1.webp", alt: "Ornamento de natal com flores prensadas", badge: "Natal", badgeBg: "rgba(107,31,42,0.1)", badgeColor: "#6B1F2A", title: "Ornamento de Natal", desc: "Para si ou para oferecer. Um pedaço do seu dia especial para decorar o Natal de quem ama, ano após ano.", note: "Só com a compra de um quadro maior." },
              { img: "/pendente1.webp", alt: "Pendente floral para colar", badge: "Joalharia", badgeBg: "rgba(58,48,80,0.1)", badgeColor: "#3A3050", title: "Pendente para Colar", desc: "Uma flor do seu bouquet para usar sempre perto do coração. Uma memória que se transforma em joia.", note: "Só com a compra de um quadro maior." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 6px 24px rgba(26,26,26,0.08)", backgroundColor: "#FAF7F0" }}>
                  <div style={{ overflow: "hidden", position: "relative", aspectRatio: "4/3" }}>
                    <Image fill src={item.img} alt={item.alt}
                      sizes="(max-width: 768px) 100vw, 33vw" className="presente-img" style={{ objectFit: "cover", transition: "transform 0.7s ease" }} />
                  </div>
                  <div style={{ padding: "18px 18px 20px" }}>
                    <span style={{ display: "inline-block", backgroundColor: item.badgeBg, color: item.badgeColor, fontSize: "0.5rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: GS, fontWeight: 600, padding: "4px 10px", borderRadius: "100px", marginBottom: "10px" }}>{item.badge}</span>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.1rem", fontWeight: 400, margin: "0 0 8px", color: "#1a1a1a", lineHeight: 1.2 }}>{item.title}</h3>
                    <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.78rem", lineHeight: 1.6, color: "rgba(26,26,26,0.6)", margin: "0 0 6px" }}>{item.desc}</p>
                    <p style={{ fontFamily: GS, fontWeight: 400, fontSize: "0.72rem", color: "rgba(26,26,26,0.35)", margin: 0, fontStyle: "italic" }}>{item.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELEMENTOS ESPECIAIS ── */}
      <section style={{ backgroundColor: "#FAF7F0", borderTop: "1px solid rgba(26,26,26,0.06)", padding: "clamp(28px,4vw,40px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            {/* Título */}
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.2rem, 2.4vw, 1.75rem)", fontWeight: 400, margin: "0 0 6px", color: "#1a1a1a", lineHeight: 1.25 }}>
              Pode incluir <em style={{ color: VERDE_CLARO }}>elementos especiais</em> no seu quadro
            </h2>
            {/* Nota */}
            <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.76rem", color: "rgba(26,26,26,0.4)", fontStyle: "italic", lineHeight: 1.5, margin: "0 0 18px", maxWidth: "560px" }}>
              Se os acessórios forem mais volumosos, a profundidade da moldura será ajustada e o orçamento recalculado.
            </p>
            {/* Grid de pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {elementosEspeciais.map((item) => (
                <span key={item.key} style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: GS, fontWeight: 400, fontSize: "0.82rem", color: "rgba(26,26,26,0.68)", backgroundColor: "rgba(139,168,136,0.06)", border: "1px solid rgba(139,168,136,0.2)", padding: "9px 14px 9px 11px", borderRadius: "10px" }}>
                  <span style={{ color: VERDE_CLARO, display: "flex", alignItems: "center", flexShrink: 0 }}>{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TAMANHOS E PREÇOS ── */}
      <section style={{ backgroundColor: "#0F1E1A", padding: "clamp(50px,8vw,90px) 24px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,64px)" }}>
              <Label light>Feito à mão, para si</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1, color: "#FAF7F0" }}>
                Tamanhos & Preços
              </h2>
              <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(250,247,240,0.5)", maxWidth: "440px", margin: "0 auto" }}>
                Cada quadro que criamos é único. Feito à mão, com atenção aos detalhes e dedicação à história por detrás das flores.
              </p>
            </div>
          </Reveal>
          {/* Grupo principal — quadros */}
          <Reveal>
            <p style={{ fontFamily: GS, fontWeight: 400, fontSize: "clamp(0.88rem, 1.5vw, 1rem)", lineHeight: 1.65, color: "rgba(250,247,240,0.65)", marginBottom: "24px" }}>
              Escolha o tamanho do quadro onde vão ficar as suas flores preservadas.
            </p>
          </Reveal>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
            {frames.slice(0, 3).map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ backgroundColor: i === 0 ? "#FAF7F0" : i === 1 ? "#F2EDE4" : "#EAE3D8", padding: "28px 24px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", borderRadius: "4px", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                    <div style={{ flexShrink: 0 }}>
                      <FrameSVG vw={item.vw} vh={item.vh} flowers={item.flowers} svgWidth={item.svgWidth} label={item.size} dark={true} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: "8px" }}>
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.7rem, 2.6vw, 2.4rem)", color: "#0F1E1A", margin: "0", lineHeight: 1 }}>
                        {item.size}
                        <span style={{ fontSize: "0.8rem", fontFamily: GS, fontWeight: 400, marginLeft: "4px", color: "rgba(15,30,26,0.4)" }}>{item.unit}</span>
                      </p>
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "#3D6B5E", margin: "8px 0 10px" }}>{item.price}€</p>
                      <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.75rem", lineHeight: 1.6, color: "rgba(15,30,26,0.5)", margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Grupo complementar — formatos adicionais */}
          <Reveal>
            <p style={{ fontFamily: GS, fontWeight: 400, fontSize: "clamp(0.88rem, 1.5vw, 1rem)", lineHeight: 1.65, color: "rgba(250,247,240,0.65)", marginBottom: "24px" }}>
              Complemente a sua encomenda com outros formatos, para si ou para oferecer, com as suas flores preservadas.
            </p>
          </Reveal>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
            {frames.slice(3).map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ backgroundColor: item.addonColor ? item.addonColor : "#3D6B5E", padding: "28px 24px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", borderRadius: "4px", position: "relative" }}>
                  <span style={{ position: "absolute", top: "16px", right: "16px", backgroundColor: "rgba(250,247,240,0.15)", color: "#FAF7F0", fontSize: "0.5rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: GS, fontWeight: 600, padding: "4px 10px", borderRadius: "100px" }}>
                    {item.badge || "Para oferecer"}
                  </span>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                    <div style={{ flexShrink: 0 }}>
                      {item.customSvg === "ornament" ? <OrnamentSVG svgWidth={item.svgWidth} light={true} />
                        : item.customSvg === "pendant" ? <PendantSVG svgWidth={item.svgWidth} light={true} />
                        : <FrameSVG vw={item.vw} vh={item.vh} flowers={item.flowers} svgWidth={item.svgWidth} label={item.size} dark={false} />}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: "8px" }}>
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.2rem, 2vw, 1.7rem)", color: "#FAF7F0", margin: "0", lineHeight: 1 }}>
                        {item.size}
                        <span style={{ fontSize: "0.8rem", fontFamily: GS, fontWeight: 400, marginLeft: "4px", color: "rgba(250,247,240,0.45)" }}>{item.unit}</span>
                      </p>
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: "#8BA888", margin: "8px 0 10px" }}>{item.price}€</p>
                      <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.75rem", lineHeight: 1.6, color: "rgba(250,247,240,0.5)", margin: 0, fontStyle: "italic" }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", margin: "0 0 48px", padding: "22px 32px", backgroundColor: "rgba(184,149,74,0.1)", border: "1px solid rgba(184,149,74,0.3)", borderRadius: "4px" }}>
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <rect x="1.5" y="1.5" width="15" height="15" rx="1" stroke="#C4A55A" strokeWidth="1.4" fill="none"/>
                <line x1="4" y1="6" x2="8" y2="2" stroke="rgba(196,165,90,0.7)" strokeWidth="1.1" strokeLinecap="round"/>
                <line x1="9" y1="5" x2="11" y2="3" stroke="rgba(196,165,90,0.5)" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: GS, fontWeight: 400, fontSize: "0.88rem", color: "rgba(250,247,240,0.8)", margin: 0 }}>
                Todos os quadros são emoldurados com{" "}
                <strong style={{ fontWeight: 700, color: "#C4A55A" }}>vidro museu UltraVue®</strong>
                {" "}praticamente invisível, com proteção UV70
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "28px", padding: "0 0 40px", borderBottom: "1px solid rgba(250,247,240,0.12)" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", fontWeight: 400, color: "rgba(250,247,240,0.6)", margin: 0, lineHeight: 1.4 }}>
                  Pretende outro formato<br/>ou uma composição diferente?
                </p>
              </div>
              <a href="/contactos" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "#FAF7F0", fontFamily: GS, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", flexShrink: 0, transition: "opacity 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.65"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                Falar connosco
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#FAF7F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "28px 0 40px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="9" cy="7.5" r="2.5" stroke="#8BA888" strokeWidth="1.3" fill="none"/>
                  <path d="M9 2C5.686 2 3 4.686 3 8c0 4.5 6 9 6 9s6-4.5 6-9c0-3.314-2.686-6-6-6z" stroke="#8BA888" strokeWidth="1.3" fill="none"/>
                </svg>
                <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.82rem", color: "rgba(250,247,240,0.45)", margin: 0 }}>Já encomendou? Acompanhe o estado da sua peça em tempo real.</p>
              </div>
              <a href={TRACKING_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8BA888", fontFamily: GS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", flexShrink: 0, transition: "opacity 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.65"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                Ver estado
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#8BA888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MATERIAIS E QUALIDADE ── */}
      <section style={{ backgroundColor: "#FAF7F0", padding: "clamp(50px,8vw,90px) 24px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Label>Feito para durar</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1 }}>
                Materiais & Qualidade
              </h2>
              <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(26,26,26,0.5)", maxWidth: "500px", margin: "0 auto" }}>
                Cada peça é produzida com materiais de conservação museu, selecionados para garantir que as suas flores permanecem belas ao longo dos anos.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1px", backgroundColor: "rgba(26,26,26,0.07)", marginBottom: "40px" }}>
            {[
              { img: "/molduranogueira.webp", title: "Moldura de Nogueira" },
              { img: "/moldurabranca.webp",   title: "Moldura Lacada a Branco" },
              { img: "/moldurapreta.webp",    title: "Moldura Lacada a Preto" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ position: "relative", overflow: "hidden", minHeight: "260px" }}>
                  <Image fill src={item.img} alt={item.title} sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,26,0.72) 0%, rgba(15,30,26,0.05) 45%, transparent 100%)" }} />
                  <div style={{ position: "relative", padding: "22px 22px 0", minHeight: "260px" }}>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.05rem", fontWeight: 400, margin: 0, lineHeight: 1.2, color: "#FAF7F0", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>{item.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ fontFamily: GS, fontWeight: 500, fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(26,26,26,0.7)", margin: "0 0 32px" }}>
              Todas as molduras são feitas <strong style={{ color: "#1a1a1a" }}>à medida</strong> para cada peça, em Coimbra.
            </p>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "22px 28px", backgroundColor: "rgba(139,168,136,0.08)", border: "1px solid rgba(139,168,136,0.22)", borderRadius: "4px", marginBottom: "56px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                <path d="M10 2 L11.8 7.6 L17.6 7.6 L13 11 L14.8 16.6 L10 13.2 L5.2 16.6 L7 11 L2.4 7.6 L8.2 7.6 Z" stroke={VERDE_CLARO} strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
              </svg>
              <p style={{ fontFamily: GS, fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.75, color: "rgba(26,26,26,0.65)", margin: 0 }}>
                Todos os quadros utilizam <strong style={{ color: "#1a1a1a", fontWeight: 600 }}>cartão e cola de pH neutro,</strong> os mesmos materiais usados em museus e arquivos para preservar obras ao longo de décadas.
              </p>
            </div>
          </Reveal>
          <div className="ultravue-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
            <Reveal>
              <div>
                <Label>Vidro museu</Label>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.15 }}>
                  UltraVue® UV70<br/><em style={{ color: VERDE_CLARO }}>clareza verdadeiramente incrível</em>
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Praticamente elimina reflexos","Filtra até 70% dos raios UV nocivos","Vidro Water White com transmissão de cores cristalinas","Ilumina cores e níveis de contraste","Superfície duradoura e de fácil limpeza"].map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 0", borderBottom: "1px solid rgba(26,26,26,0.07)", fontFamily: GS, fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(26,26,26,0.75)" }}>
                      <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: VERDE_CLARO, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }} aria-hidden="true">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#FAF7F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ width: "clamp(200px, 28vw, 340px)", borderRadius: "10px", overflow: "hidden", boxShadow: "0 12px 40px rgba(26,26,26,0.12)", flexShrink: 0 }}>
                <Image src="/ladoalado.webp" alt="Comparação entre vidro normal e vidro UltraVue anti-reflexo" width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto", display: "block" }} />
                <div style={{ backgroundColor: "#F2EDE4", padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: GS, fontSize: "0.62rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(26,26,26,0.38)", fontWeight: 500 }}>Normal</span>
                  <span style={{ fontFamily: GS, fontSize: "0.62rem", letterSpacing: "1.5px", textTransform: "uppercase", color: VERDE_CLARO, fontWeight: 700 }}>UltraVue®</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* CTA Garanta a qualidade museu */}
        <div style={{ padding: "clamp(48px,8vw,80px) 24px", textAlign: "center" }}>
          <Reveal>
            <div style={{ maxWidth: "780px", margin: "0 auto", backgroundColor: "#3D6B5E", borderRadius: "20px", padding: "clamp(40px,6vw,64px) clamp(32px,5vw,80px)" }}>
              <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, margin: "0 0 16px", lineHeight: 1.1, color: "#FAF7F0" }}>
                Garanta a <em style={{ color: VERDE_CLARO }}>qualidade museu</em> para o seu quadro
              </h3>
              <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(250,247,240,0.65)", margin: "0 0 32px" }}>
                Materiais premium que preservam as suas flores durante décadas.
              </p>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F0", color: "#3D6B5E", padding: "16px 48px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: GS, transition: "all 0.3s ease", minHeight: "54px" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#EDE5D4"; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FAF7F0"; }}>
                Reservar a Minha Data
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA RECRIAÇÃO DO BOUQUET ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(60px,10vw,100px) 24px", textAlign: "center" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/ctaidosos.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,20,16,0.78) 0%, rgba(10,20,16,0.60) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto" }}>
          <Reveal>
            <Label light>Próximo passo</Label>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.05, color: "#FAF7F0" }}>
              Descubra a<br/><em style={{ color: VERDE_CLARO }}>Recriação do Bouquet</em>
            </h2>
            <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(250,247,240,0.7)", margin: "0 0 44px" }}>
              Além da preservação, recriamos o seu bouquet original com flores frescas ou secas, para reviver o momento como se fosse hoje.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/recriacao"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F0", color: "#3D6B5E", padding: "16px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: GS, transition: "all 0.3s ease", minHeight: "56px" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#EDE5D4"; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FAF7F0"; }}>
                Ver Recriação do Bouquet
              </a>
              <a href="/perguntas-frequentes"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", color: "rgba(250,247,240,0.85)", padding: "16px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: GS, border: "1.5px solid rgba(250,247,240,0.4)", transition: "all 0.3s ease", minHeight: "56px" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(250,247,240,0.8)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(250,247,240,0.4)"; }}>
                Perguntas Frequentes
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        .fundos-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; gap: 16px; padding: 0 24px 4px; }
        .fundos-track::-webkit-scrollbar { display: none; }
        .fundo-card-new { flex: 0 0 78vw; max-width: 320px; scroll-snap-align: start; }
        @media (min-width: 900px) {
          .fundos-track { overflow-x: visible; max-width: 1200px; margin: 0 auto; padding: 0 24px; gap: 24px; }
          .fundo-card-new { flex: 1 1 0; max-width: none; scroll-snap-align: unset; }
        }
        .fundo-img-new:hover { transform: scale(1.05); }
        .slider-hint { display: block; text-align: center; font-family: var(--font-google-sans), 'Google Sans', sans-serif; font-size: 0.6rem; letter-spacing: 2.5px; text-transform: uppercase; padding: 16px 0 0; margin: 0; }
        @media (min-width: 900px) { .slider-hint { display: none; } }

        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
        a:focus-visible, button:focus-visible { outline: 3px solid #8BA888; outline-offset: 4px; border-radius: 4px; }
        .presente-img:hover { transform: scale(1.04); }
        @media (max-width: 640px) {
          .ultravue-grid { grid-template-columns: 1fr !important; }
          .ultravue-grid > div:last-child { width: 100% !important; max-width: 360px; margin: 0 auto; }
          .presentes-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 1023px) { .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  );
}
