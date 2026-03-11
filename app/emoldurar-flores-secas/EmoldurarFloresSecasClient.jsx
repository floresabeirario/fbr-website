"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const WA_URL = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre emoldurar flores secas.");

const C = {
  creme:   "#FAF7F0",
  creEsc:  "#EFF4F7",
  escuro:  "#0F1E1A",
  sec:     "#5A6B60",
  azul:    "#1B4B6B",
  azulClr: "#5A8FA8",
  terra:   "#C4846B",
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


const opcoes = [
  {
    n: "Opção 1", cor: C.azul,
    sub: "O ramo tal como ficou",
    titulo: "Emoldurar ramo original seco",
    desc: "Se secou as suas flores ao ar, ou o seu ramo já era composto de flores secas, podemos emoldurá-lo. Quer em forma de bouquet, quer desconstruído numa composição com as flores à volta de uma fotografia, por exemplo.",
    detalhe: "Moldura profunda com 4,5 cm de altura útil.",
    time: "até 3 meses",
    svg: "op1",
  },
  {
    n: "Opção 2", cor: C.terra,
    sub: "Cores mais vivas",
    titulo: "Recriação do bouquet",
    desc: "Caso já não tenha as suas flores ou se já não estão em bom estado, recriamos o ramo com flores frescas e eternizamo-lo num quadro emoldurado. As cores são preservadas e ficam mais próximas do dia original. Composição bidimensional, moldura pouco funda.",
    detalhe: "Visita a nossa página da recriação para mais detalhes.",
    time: "até 6 meses",
    link: { href: "/recriacao", label: "Saber mais sobre recriação" },
    svg: "op2",
  },
  {
    n: "Opção 3", cor: C.azulClr,
    sub: "O melhor dos dois mundos",
    titulo: "Combinação mista",
    desc: "Se ainda tem flores originais do dia especial, mas algumas não ficaram bem depois de secas, esta é a solução perfeita para si: aproveitamos as flores originais que ainda estão bem e substituímos as restantes. O quadro combina elementos do ramo original com réplicas de flores prensadas numa composição equilibrada.",
    detalhe: "Aplicam-se os preços de preservação de flores.",
    time: "até 6 meses",
    link: { href: "/opcoes-e-precos", label: "Ver preços de preservação" },
    svg: "op2",
  },
];

const processo = [
  { n: "01", titulo: "Entregue-nos o ramo",   desc: "Por correio (Transportador/CTT frágil) ou em mãos no atelier em Coimbra, mediante agendamento." },
  { n: "02", titulo: "Criamos a composição",  desc: "Trabalhamos a composição das flores. Após aprovação do design por si, o quadro é emoldurado, sempre com moldura feita à medida, com vidro museu anti-UV." },
  { n: "03", titulo: "Entregamos o quadro",   desc: "Por correio (Transportador/CTT frágil), ou recolha gratuita em mãos no atelier em Coimbra, mediante agendamento." },
];

const precos = [
  { size: "30 × 40 cm", price: "200€", svgW: "80px" },
  { size: "40 × 50 cm", price: "270€", svgW: "96px" },
  { size: "50 × 70 cm", price: "360€", svgW: "112px" },
];

const pagamento = [
  { pct: "30%", label: "Reserva",            desc: "Garante a sua vaga. Não reembolsável." },
  { pct: "40%", label: "Início do trabalho", desc: "Quando o ramo chega ao atelier." },
  { pct: "30%", label: "Antes da entrega",   desc: "Após aprovação da composição final." },
];

const faqs = [
  { q: "Posso emoldurar um bouquet de noiva que já secou?",
    a: "Sim, e é exatamente para isso que este serviço existe. Muitos ramos chegam-nos anos depois do casamento, e conseguimos trabalhar com eles. Se o ramo já estiver com algumas flores danificadas, podemos combinar os elementos originais com réplicas de flores prensadas que preservam as suas cores originais." },
  { q: "Recebem ramos de outras cidades ou países?",
    a: "Sim. Trabalhamos com clientes de toda a Europa. O ramo pode ser enviado por transportadora ou CTT correio frágil. Os portes de envio ficam a cargo do cliente." },
  { q: "O ramo tem de estar perfeito?",
    a: "Não. Trabalhamos com o que chega. Se algumas flores já não estiverem em bom estado, podemos substituir esses elementos por flores semelhantes preservadas por prensagem. O resultado final é sempre harmonioso. Nestes casos aplicam-se os preços da preservação (ver página opções e preços)." },
  { q: "Como sei em que fase está o meu quadro?",
    a: "Pode acompanhar o estado da sua encomenda em qualquer momento em status.floresabeirario.pt, uma página dedicada ao acompanhamento de cada trabalho em curso." },
  { q: "Posso incluir uma fotografia no quadro?",
    a: "Sim. Em qualquer opção pode pedir que incluamos uma fotografia na composição, do casamento, do batizado, ou outra imagem com significado especial." },
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
              <p style={{ color: C.sec, fontSize: "0.9rem", lineHeight: 1.9, padding: "0 0 22px", margin: 0, fontWeight: 300 }}>{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function EmoldurarFloresSecasClient() {
  return (
    <main style={{ backgroundColor: C.creme, fontFamily: "'Google Sans', sans-serif", color: C.escuro, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@1&display=swap');
        * { box-sizing: border-box; }

        .btn-ghost-light {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: transparent; color: ${C.creme}; padding: 15px 32px; border-radius: 100px;
          text-decoration: none; font-weight: 500; font-size: 0.76rem; letter-spacing: 1.4px;
          text-transform: uppercase; font-family: 'Google Sans', sans-serif;
          border: 1.5px solid rgba(250,247,240,0.38); transition: all 0.3s ease;
        }
        .btn-ghost-light:hover { border-color: rgba(250,247,240,0.75); transform: translateY(-3px); }

        .cta-row { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
        @media (min-width: 480px) { .cta-row { flex-direction: row; justify-content: center; align-items: center; } }

        .hero-wrap { position: relative; width: 100%; height: 100svh; min-height: 620px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .hero-bg { position: absolute; inset: 0; }
        .hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(170deg, rgba(10,22,40,0.20) 0%, rgba(10,22,40,0.55) 50%, rgba(10,22,40,0.82) 100%); }
        .hero-content { position: relative; z-index: 2; text-align: center; padding: clamp(100px,14vw,160px) clamp(20px,5vw,48px) clamp(60px,8vw,80px); width: 100%; }

        .opcao-grid { display: flex; flex-direction: column; gap: 1px; background: rgba(15,30,26,0.06); border-radius: 20px; overflow: hidden; }
        @media (min-width: 860px) { .opcao-grid { flex-direction: row; } }
        .opcao-item { flex: 1; background: ${C.branco}; padding: clamp(1.8rem,3vw,2.4rem) clamp(1.4rem,2.5vw,2rem); transition: background 0.25s; }
        .opcao-item:hover { background: ${C.creEsc}; }

        .processo-steps { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .processo-steps { grid-template-columns: repeat(3, 1fr); } }
        .processo-step { padding: clamp(1.4rem,2.5vw,2rem) clamp(1.2rem,2vw,1.6rem); position: relative; }
        .processo-connector { display: none; }
        @media (min-width: 768px) {
          .processo-connector { display: block; position: absolute; top: calc(clamp(1.4rem,2.5vw,2rem) + 23px); left: calc(50% + 28px); right: -50%; height: 1px; background: linear-gradient(to right, rgba(250,247,240,0.25), transparent); }
          .processo-step:last-child .processo-connector { display: none; }
        }

        .ultravue-box { display: flex; flex-direction: column; gap: clamp(1.8rem,4vw,3rem); align-items: flex-start; padding: clamp(1.8rem,3vw,2.4rem); background: ${C.branco}; border-radius: 16px; border: 1px solid rgba(15,30,26,0.07); margin-top: 1.5rem; }
        @media (min-width: 768px) { .ultravue-box { flex-direction: row; align-items: center; } }
        .ultravue-img { width: 100%; max-width: 260px; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
        @media (max-width: 767px) { .ultravue-img { max-width: 100%; } }

        .pag-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(27,75,107,0.1); border-radius: 20px; overflow: hidden; }
        .pag-item { background: ${C.creEsc}; padding: clamp(1rem,2vw,1.6rem) clamp(0.6rem,1.5vw,1.2rem); text-align: center; }


        @media (min-width: 640px) { .preco-nota { display: block !important; } }

        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
        a:focus-visible, button:focus-visible { outline: 3px solid ${C.azul}; outline-offset: 4px; border-radius: 4px; }
      ` }} />

      {/* ══ 1. HERO — sem paralaxe para evitar lag ═══════════════════════════ */}
      <section className="hero-wrap" aria-label="Emoldurar flores já secas">
        <div className="hero-bg">
          <img src="/quadrovidrosobrevidro.webp" alt="Quadro de flores secas emoldurado com vidro museu anti-UV" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
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
            }}>Dê uma moldura ao capítulo mais bonito da sua história</p>
            <h1 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2.8rem,9vw,5.5rem)",
              color: C.creme,
              margin: "0 0 clamp(1rem,2.5vw,1.6rem)",
              lineHeight: 1.05,
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}>
              Emoldurar<br />
              <em style={{ fontStyle: "italic", color: "#A8C4D4" }}>flores já secas</em>
            </h1>
            <p style={{
              fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.88, maxWidth: "480px",
              color: "rgba(250,247,240,0.86)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight: 300, textShadow: "0 2px 16px rgba(0,0,0,0.4)",
            }}>
              Muitos ramos de flores foram secos naturalmente com o passar do tempo. Alguns foram criados originalmente com flores secas. Na Flores à Beira-Rio, podemos transformar esse ramo numa peça emoldurada.
            </p>
            <div className="cta-row" style={{ justifyContent: "center", marginBottom: "1.6rem" }}>
              <a href="/contactos" className="btn-ghost-light">Falar connosco</a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ══ 2. TRÊS OPÇÕES ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creEsc, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-opcoes">
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <Eyebrow>Como funciona</Eyebrow>
              <h2 id="h2-opcoes" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.escuro, margin: 0, lineHeight: 1.1 }}>
                Três formas de preservar
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="opcao-grid" role="list">
              {opcoes.map((item, i) => (
                <article key={i} className="opcao-item" role="listitem">
                  {item.svg === "op1" ? <SVGOpcao1 width="160px" /> : <SVGOpcao2 width="160px" />}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.1rem", color: item.cor, lineHeight: 1 }}>{item.n}</span>
                    <div style={{ flex: 1, height: "1px", background: `${item.cor}2A` }} aria-hidden="true" />
                  </div>
                  <p style={{ fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase", color: item.cor, fontFamily: "'Google Sans', sans-serif", margin: "0 0 10px", fontWeight: 700 }}>{item.sub}</p>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.1rem,2.2vw,1.4rem)", color: C.escuro, margin: "0 0 0.7rem", lineHeight: 1.15 }}>{item.titulo}</h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: C.sec, margin: "0 0 0.8rem", fontWeight: 300 }}>{item.desc}</p>
                  <p style={{ fontSize: "0.77rem", color: C.azulClr, margin: "0 0 0.9rem", fontStyle: "italic" }}>{item.detalhe}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                    <span style={{ fontSize: "0.72rem", color: C.sec }}>Produção: <strong style={{ color: item.cor }}>{item.time}</strong></span>
                    {item.link && (
                      <a href={item.link.href} style={{ fontSize: "0.74rem", fontWeight: 600, color: item.cor, textDecoration: "none", borderBottom: `1px solid ${item.cor}40`, paddingBottom: "1px" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = item.cor}
                        onMouseLeave={e => e.currentTarget.style.borderColor = `${item.cor}40`}
                      >{item.link.label} →</a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 3. FOTOGRAFIA — fundo com imagem ═════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "380px", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="/photowedding.webp" alt="Casamento"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,22,40,0.80) 0%, rgba(10,22,40,0.50) 55%, rgba(10,22,40,0.25) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", maxWidth: "600px", margin: "0 auto", textAlign: "center", width: "100%" }}>
          <Reveal>
            <Divider light />
            <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
              <Eyebrow light>Detalhe que faz diferença</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: C.creme, margin: "0 0 1rem" }}>
                Inclua uma fotografia
              </h2>
              <p style={{ color: "rgba(250,247,240,0.85)", lineHeight: 1.9, fontSize: "0.97rem", fontWeight: 300 }}>
                Em qualquer das três opções, podemos integrar uma fotografia na composição: do casamento, do batizado, ou qualquer imagem com significado especial. O quadro torna-se ainda mais único.
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
              <Eyebrow light>Da sua casa ao quadro</Eyebrow>
              <h2 id="h2-processo" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.creme, margin: 0 }}>
                O processo, passo a passo
              </h2>
            </div>
          </Reveal>
          <div className="processo-steps" role="list">
            {processo.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="processo-step" role="listitem">
                  <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(250,247,240,0.18)", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.82rem", color: "rgba(250,247,240,0.55)" }} aria-hidden="true">{item.n}</span>
                    {i < processo.length - 1 && <div className="processo-connector" aria-hidden="true" />}
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
                Ao longo de todo o processo, pode sempre acompanhar a sua encomenda em{" "}
                <a href="https://status.floresabeirario.pt" target="_blank" rel="noopener noreferrer"
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
              <Eyebrow>Qualidade museológica</Eyebrow>
              <h2 id="h2-materiais" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.escuro, margin: 0 }}>
                Materiais & Qualidade
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="ultravue-box">
              <div style={{ flex: 1 }}>
                <Eyebrow color={C.azulClr}>Vidro museu</Eyebrow>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: C.escuro, margin: "0 0 1rem", lineHeight: 1.15 }}>
                  UltraVue® UV70<br />
                  <em style={{ fontStyle: "italic", color: C.azulClr }}>clareza verdadeiramente incrível</em>
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Praticamente elimina reflexos",
                    "Filtra até 70% dos raios UV nocivos",
                    "Vidro Water White com transmissão de cores cristalinas",
                    "Ilumina cores e níveis de contraste",
                    "Superfície duradoura e de fácil limpeza",
                  ].map((feat, idx) => (
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
                <img src="/ladoalado.webp" alt="Comparação entre vidro normal e vidro UltraVue anti-reflexo" loading="lazy" style={{ width: "100%", display: "block", borderRadius: "10px 10px 0 0" }} />
                <div style={{ backgroundColor: C.creEsc, padding: "10px 14px", display: "flex", justifyContent: "space-between", borderRadius: "0 0 10px 10px" }}>
                  <span style={{ fontFamily: "'Google Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(15,30,26,0.35)", fontWeight: 500 }}>Normal</span>
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
              <Eyebrow light>Emoldurar flores já secas</Eyebrow>
              <h2 id="h2-precos" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.4rem)", color: C.creme, margin: "0 0 1rem", lineHeight: 1.05 }}>
                Tamanhos e preços
              </h2>
              <p style={{ color: "rgba(250,247,240,0.5)", fontSize: "0.85rem", lineHeight: 1.75, fontWeight: 300, maxWidth: "480px" }}>
                Preços para emoldurar flores já secas. Estes preços não incluem os nossos serviços de preservação. Caso as suas flores estejam frescas e precisem de ser preservadas, visite a{" "}
                <a href="/opcoes-e-precos" style={{ color: C.azulClr, textDecoration: "none", borderBottom: `1px solid ${C.azulClr}50`, paddingBottom: "1px" }}>
                  página opções e preços
                </a>.
              </p>
            </div>
          </Reveal>

          {/* 3 caixas independentes empilhadas */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {precos.map((row, i) => {
              const accent = [C.azulClr, C.terra, C.azul][i];
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "clamp(1.2rem,3vw,2.4rem)",
                    background: "rgba(250,247,240,0.04)",
                    border: `1px solid ${accent}30`,
                    borderRadius: "16px",
                    padding: "clamp(1.4rem,2.5vw,2rem) clamp(1.4rem,2.5vw,2rem)",
                    transition: "background 0.3s, border-color 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(250,247,240,0.07)"; e.currentTarget.style.borderColor = `${accent}60`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(250,247,240,0.04)"; e.currentTarget.style.borderColor = `${accent}30`; }}
                  >
                    {/* SVG lado esquerdo */}
                    <div style={{ flexShrink: 0 }}>
                      <SVGOpcao1Escuro width={row.svgW} accent={accent} />
                    </div>

                    {/* Divisor vertical */}
                    <div style={{ width: "1px", alignSelf: "stretch", background: `${accent}20`, flexShrink: 0 }} aria-hidden="true" />

                    {/* Texto lado direito */}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Google Sans', sans-serif", color: "rgba(250,247,240,0.38)", fontSize: "0.65rem", letterSpacing: "2.5px", textTransform: "uppercase", margin: "0 0 8px", fontWeight: 500 }}>Tamanho</p>
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", color: C.creme, fontSize: "clamp(1rem,2.5vw,1.2rem)", margin: "0 0 12px", lineHeight: 1.1 }}>{row.size}</p>
                      <div style={{ width: "24px", height: "1px", background: `${accent}60`, marginBottom: "12px" }} aria-hidden="true" />
                      <p style={{ fontFamily: "'Google Sans', sans-serif", color: "rgba(250,247,240,0.38)", fontSize: "0.65rem", letterSpacing: "2.5px", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>Preço</p>
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", color: accent, fontSize: "clamp(1.8rem,4vw,2.6rem)", margin: 0, lineHeight: 1 }}>{row.price}</p>
                    </div>

                    {/* Nota canto direito — só desktop */}
                    <div style={{ flexShrink: 0, display: "none", maxWidth: "160px" }} className="preco-nota">
                      <p style={{ fontFamily: "'Google Sans', sans-serif", color: "rgba(250,247,240,0.22)", fontSize: "0.68rem", lineHeight: 1.6, margin: 0, fontWeight: 300, textAlign: "right" }}>
                        Inclui vidro museu anti-UV, moldura à medida e composição artística
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Nota rodapé */}
          <Reveal delay={0.35}>
            <p style={{ fontFamily: "'Google Sans', sans-serif", color: "rgba(250,247,240,0.28)", fontSize: "0.75rem", lineHeight: 1.7, margin: "1.8rem 0 0", fontWeight: 300 }}>
              Todos os quadros incluem vidro museu anti-UV, moldura feita à medida e design artístico da composição.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 7. PAGAMENTO ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creEsc, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-pagamento">
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
              <Eyebrow>Sem surpresas</Eyebrow>
              <h2 id="h2-pagamento" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: C.escuro, margin: 0 }}>
                Pagamento em 3 fases
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pag-grid" role="list">
              {pagamento.map((p, i) => (
                <div key={i} className="pag-item" role="listitem">
                  <div style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem,3.5vw,2.2rem)", color: C.azul, marginBottom: "4px" }}>{p.pct}</div>
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
              <Eyebrow>FAQ</Eyebrow>
              <h2 id="h2-faq" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3rem)", color: C.escuro, margin: 0 }}>
                Perguntas frequentes
              </h2>
            </div>
          </Reveal>
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} i={i} />)}
        </div>
      </section>

      {/* ══ 9. CTA FINAL ══════════════════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(145deg, ${C.escuro} 0%, ${C.azul} 100%)`, padding: "clamp(90px,16vw,150px) clamp(20px,5vw,48px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "clamp(400px,70vw,900px)", height: "clamp(400px,70vw,900px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
        <Reveal>
          <div style={{ position: "relative", zIndex: 1, maxWidth: "580px", margin: "0 auto" }}>
            <Divider light />
            <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
              <Eyebrow light>O momento é agora</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem,7vw,4.5rem)", color: C.creme, margin: "0 0 1.2rem", lineHeight: 1.05 }}>
                Preserve a sua<br />
                <em style={{ color: "#A8C4D4" }}>memória</em>
              </h2>
              <p style={{ color: "rgba(250,247,240,0.7)", fontWeight: 300, fontSize: "clamp(0.93rem,1.8vw,1.05rem)", lineHeight: 1.88, maxWidth: "400px", margin: "0 auto 2.8rem" }}>
                Atelier em Coimbra. Recebemos ramos de toda a Europa. Cada quadro é único e assinado.
              </p>
              <div className="cta-row" style={{ marginBottom: "1.4rem" }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#25D366", color: "#fff", padding: "15px 28px", borderRadius: "100px", textDecoration: "none", fontWeight: 600, fontSize: "0.76rem", fontFamily: "'Google Sans', sans-serif", transition: "all 0.3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#1da851"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.transform = ""; }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Falar pelo WhatsApp
                </a>
                <a href="/contactos" className="btn-ghost-light">Falar connosco</a>
              </div>
              <p style={{ fontSize: "0.72rem", color: "rgba(250,247,240,0.35)", letterSpacing: "0.06em", fontFamily: "'Google Sans', sans-serif" }}>
                A partir de 200€ · Vidro museu anti-UV incluído
              </p>            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
