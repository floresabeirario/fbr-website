"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const FORM_URL = "https://wkf.ms/3RfoNAc";
const WA_URL   = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre emoldurar flores secas.");

// ─── Paleta ───────────────────────────────────────────────────────────────────
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

// ─── Reveal ───────────────────────────────────────────────────────────────────
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

// ─── Eyebrow ──────────────────────────────────────────────────────────────────
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

// ─── Contador animado ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (1800 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Dados ────────────────────────────────────────────────────────────────────
const opcoes = [
  {
    n: "01", cor: C.azul, sub: "Volume preservado",
    titulo: "O ramo como está",
    desc: "O ramo seco entra na moldura tal como chegou. Mantém o volume, a textura, a história. Ideal para quem quer preservar a memória exatamente como ficou.",
    detalhe: "Moldura profunda com 4,5 cm de altura útil.",
    tags: ["Bouquets secos", "Volume natural", "Fiel ao original"],
    time: "até 3 meses",
  },
  {
    n: "02", cor: C.terra, sub: "Cores mais vivas",
    titulo: "Recriação prensada",
    desc: "Recriamos o bouquet com flores frescas e preservamo-las por prensagem. As cores ficam mais próximas do dia original. O resultado é um quadro plano de grande delicadeza.",
    detalhe: "Feito em conjunto com florista. Composição bidimensional.",
    tags: ["Cores preservadas", "Alta definição", "Resultado refinado"],
    time: "até 6 meses",
    link: { href: "/recriacao-bouquet", label: "Saber mais sobre recriação" },
  },
  {
    n: "03", cor: C.azulClr, sub: "O melhor dos dois",
    titulo: "Combinação mista",
    desc: "Aproveitamos as flores originais que ainda estão bem e substituímos as restantes. O quadro combina elementos reais com flores prensadas numa composição equilibrada.",
    detalhe: "Aplicam-se os preços de preservação de flores.",
    tags: ["Flores originais", "Substituição harmoniosa", "Composição mista"],
    time: "até 6 meses",
    link: { href: "/opcoes-e-precos", label: "Ver preços de preservação" },
  },
];

const processo = [
  { n: "01", titulo: "Envia o ramo",          desc: "Por correio (CTT frágil e urgente) ou em mãos no atelier em Coimbra, mediante agendamento." },
  { n: "02", titulo: "Criamos a composição",  desc: "Trabalhamos a composição artística dentro da moldura feita à medida, com vidro museu anti-UV." },
  { n: "03", titulo: "Aprovação sua",         desc: "Enviamos fotografias antes de selar. Tem 72 horas para aprovar ou pedir alterações. Nada é definitivo sem o seu acordo." },
  { n: "04", titulo: "Entregamos o quadro",   desc: "Por CTT com número de rastreamento, ou recolha no atelier. Acompanhe em status.floresabeirario.pt" },
];

const materiais = [
  { titulo: "Vidro Museu Anti-UV",    desc: "UltraVue® 70 — o mesmo vidro usado em museus internacionais. Bloqueia os raios UV que desbotam as cores ao longo dos anos." },
  { titulo: "Moldura Feita à Medida", desc: "Produzida por molduraria em Coimbra, especificamente para cada quadro. Nunca em stock, sempre personalizada." },
  { titulo: "Composição Artística",   desc: "Cada quadro é desenhado como obra. Não colocamos flores numa moldura — criamos uma composição com intenção e cuidado." },
];

const precos = [
  { size: "30 × 40 cm", price: "200€", popular: false },
  { size: "40 × 50 cm", price: "270€", popular: true  },
  { size: "50 × 70 cm", price: "360€", popular: false },
];

const pagamento = [
  { pct: "30%", label: "Reserva",            desc: "Garante a sua vaga. Não reembolsável." },
  { pct: "40%", label: "Início do trabalho", desc: "Quando o ramo chega ao atelier." },
  { pct: "30%", label: "Antes da entrega",   desc: "Após aprovação da composição final." },
];

const faqs = [
  { q: "Posso emoldurar um bouquet de noiva que já secou?",
    a: "Sim — e é exatamente para isso que este serviço existe. Muitos ramos chegam-nos anos depois do casamento, e conseguimos trabalhar com eles. Se o ramo já estiver com algumas flores danificadas, podemos combinar os elementos originais com flores prensadas." },
  { q: "Recebem ramos de outras cidades ou países?",
    a: "Sim. Trabalhamos com clientes de toda a Europa. O ramo pode ser enviado por CTT correio frágil e urgente. Os portes de envio ficam a cargo do cliente." },
  { q: "O ramo tem de estar perfeito?",
    a: "Não. Trabalhamos com o que chega. Se algumas flores já não estiverem em bom estado, substituímos esses elementos por flores semelhantes preservadas por prensagem. O resultado final é sempre harmonioso." },
  { q: "Como sei em que fase está o meu quadro?",
    a: "Pode acompanhar o estado da sua encomenda em qualquer momento em status.floresabeirario.pt — uma página dedicada ao acompanhamento de cada trabalho em curso." },
  { q: "Posso incluir uma fotografia no quadro?",
    a: "Sim. Em qualquer das três opções pode pedir que incluamos uma fotografia na composição — do casamento, do batizado, ou outra imagem com significado especial." },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function EmoldurarFloresSecasClient() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const heroScale   = useTransform(scrollY, [0, 420], [1, 1.06]);
  const heroTextY   = useTransform(scrollY, [0, 420], [0, -60]);

  return (
    <main style={{ backgroundColor: C.creme, fontFamily: "'Google Sans', sans-serif", color: C.escuro, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@1&display=swap');
        * { box-sizing: border-box; }

        .btn-esc {
          display: inline-flex; align-items: center; justify-content: center;
          background: ${C.escuro}; color: ${C.creme}; padding: 16px 38px; border-radius: 100px;
          text-decoration: none; font-weight: 600; font-size: 0.76rem; letter-spacing: 1.6px;
          text-transform: uppercase; font-family: 'Google Sans', sans-serif;
          transition: all 0.3s ease; box-shadow: 0 6px 28px rgba(15,30,26,0.22);
        }
        .btn-esc:hover { background: ${C.azul}; transform: translateY(-3px); box-shadow: 0 12px 36px rgba(27,75,107,0.32); }

        .btn-ghost-light {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: transparent; color: ${C.creme}; padding: 15px 32px; border-radius: 100px;
          text-decoration: none; font-weight: 500; font-size: 0.76rem; letter-spacing: 1.4px;
          text-transform: uppercase; font-family: 'Google Sans', sans-serif;
          border: 1.5px solid rgba(250,247,240,0.38); transition: all 0.3s ease;
        }
        .btn-ghost-light:hover { border-color: rgba(250,247,240,0.75); transform: translateY(-3px); }

        .btn-wa {
          display: inline-flex; align-items: center; gap: 8px;
          background: #25D366; color: #fff; padding: 15px 28px; border-radius: 100px;
          text-decoration: none; font-weight: 600; font-size: 0.76rem;
          font-family: 'Google Sans', sans-serif; transition: all 0.3s ease;
        }
        .btn-wa:hover { background: #1da851; transform: translateY(-3px); }

        .cta-row { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
        @media (min-width: 480px) { .cta-row { flex-direction: row; justify-content: center; align-items: center; } }

        .hero-wrap { position: relative; width: 100%; height: 100svh; min-height: 620px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .hero-img { position: absolute; inset: 0; will-change: transform; }
        .hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(170deg, rgba(10,22,40,0.20) 0%, rgba(10,22,40,0.55) 50%, rgba(10,22,40,0.82) 100%); }
        .hero-content { position: relative; z-index: 2; text-align: center; padding: clamp(100px,14vw,160px) clamp(20px,5vw,48px) clamp(60px,8vw,80px); width: 100%; }

        .stats-bar { display: flex; flex-direction: column; }
        @media (min-width: 640px) { .stats-bar { flex-direction: row; } }
        .stat-item { flex: 1; padding: clamp(1.2rem,2.5vw,1.8rem) clamp(1.4rem,3vw,2.2rem); border-bottom: 1px solid rgba(15,30,26,0.07); text-align: center; }
        @media (min-width: 640px) { .stat-item { border-bottom: none; border-right: 1px solid rgba(15,30,26,0.07); text-align: left; } .stat-item:last-child { border-right: none; } }

        .opcao-grid { display: flex; flex-direction: column; gap: 1px; background: rgba(15,30,26,0.06); border-radius: 20px; overflow: hidden; }
        @media (min-width: 860px) { .opcao-grid { flex-direction: row; } }
        .opcao-item { flex: 1; background: ${C.branco}; padding: clamp(1.8rem,3vw,2.4rem) clamp(1.4rem,2.5vw,2rem); transition: background 0.25s; }
        .opcao-item:hover { background: ${C.creEsc}; }

        .processo-grid { display: flex; flex-direction: column; gap: 0; }
        @media (min-width: 768px) { .processo-grid { flex-direction: row; } }
        .processo-item { flex: 1; padding: clamp(1.4rem,2.5vw,2rem) clamp(1.2rem,2vw,1.6rem); position: relative; }
        .processo-linha { display: none; }
        @media (min-width: 768px) {
          .processo-linha { display: block; position: absolute; top: 24px; left: calc(50% + 24px); right: -50%; height: 1px; background: linear-gradient(to right, rgba(250,247,240,0.25), transparent); }
          .processo-item:last-child .processo-linha { display: none; }
        }

        .mat-grid { display: flex; flex-direction: column; gap: 1px; background: rgba(27,75,107,0.12); border-radius: 20px; overflow: hidden; }
        @media (min-width: 768px) { .mat-grid { flex-direction: row; } }
        .mat-item { flex: 1; background: ${C.escuro}; padding: clamp(1.8rem,3vw,2.4rem) clamp(1.4rem,2.5vw,2rem); }

        .preco-card { border-radius: 16px; padding: clamp(1.3rem,2.5vw,1.7rem) clamp(1.2rem,2vw,1.6rem); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; transition: transform 0.22s, box-shadow 0.22s; }
        .preco-card:hover { transform: translateY(-2px); }
        .preco-popular { background: ${C.azul}; box-shadow: 0 8px 32px rgba(27,75,107,0.22); }
        .preco-normal  { background: ${C.branco}; border: 1px solid rgba(15,30,26,0.08); box-shadow: 0 2px 12px rgba(15,30,26,0.06); }

        .pag-grid { display: grid; grid-template-columns: 1fr; gap: 1px; background: rgba(27,75,107,0.1); border-radius: 20px; overflow: hidden; }
        @media (min-width: 600px) { .pag-grid { grid-template-columns: repeat(3, 1fr); } }
        .pag-item { background: ${C.creEsc}; padding: clamp(1.6rem,3vw,2rem) clamp(1.2rem,2vw,1.6rem); text-align: center; }

        .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(27,75,107,0.07); border: 1px solid rgba(27,75,107,0.14); border-radius: 100px; padding: 8px 18px; font-size: 0.72rem; color: ${C.azul}; font-family: 'Google Sans', sans-serif; font-weight: 500; letter-spacing: 0.03em; }

        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
        a:focus-visible, button:focus-visible { outline: 3px solid ${C.azul}; outline-offset: 4px; border-radius: 4px; }
      ` }} />

      {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
      <section className="hero-wrap" ref={heroRef} aria-label="Emoldurar flores secas — hero">
        <motion.div className="hero-img" style={{ scale: heroScale }}>
          <img src="/quadrovidrosobrevidro.webp" alt="Quadro de flores secas emoldurado com vidro museu anti-UV" />
        </motion.div>
        <div className="hero-overlay" />

        <motion.div className="hero-content" style={{ opacity: heroOpacity, y: heroTextY }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: "640px", margin: "0 auto" }}>
            <Eyebrow light>Preservação Botânica · Coimbra</Eyebrow>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.8rem,9vw,5.5rem)", color: C.creme, margin: "0 0 clamp(1rem,2.5vw,1.6rem)", lineHeight: 1.0, textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}>
              O seu ramo merece<br />
              <em style={{ fontStyle: "italic", color: "#A8C4D4" }}>durar para sempre</em>
            </h1>
            <p style={{ fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.88, maxWidth: "460px", color: "rgba(250,247,240,0.86)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}>
              Transformamos ramos secos em peças de arte emolduradas com vidro museu anti-UV — feitas à mão em Coimbra, pensadas para durar décadas.
            </p>
            <div className="cta-row" style={{ justifyContent: "center", marginBottom: "1.6rem" }}>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-esc">Reservar Data</a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
            <p style={{ fontSize: "0.72rem", color: "rgba(250,247,240,0.4)", letterSpacing: "0.06em", fontFamily: "'Google Sans', sans-serif" }}>
              Recebemos ramos de toda a Europa · Atelier em Coimbra
            </p>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", zIndex: 2 }}>
          <span style={{ color: "rgba(250,247,240,0.32)", fontSize: "0.55rem", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Google Sans', sans-serif" }}>scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, rgba(250,247,240,0.35), transparent)" }} />
        </motion.div>
      </section>

      {/* ══ 2. STATS BAR ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creme, borderBottom: "1px solid rgba(15,30,26,0.07)" }} aria-label="Destaques">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="stats-bar">
            {[
              { num: 8,  suf: "+",      label: "anos de experiência" },
              { num: 3,  suf: " países", label: "de onde recebemos ramos" },
              { num: 72, suf: "h",       label: "para aprovar antes de selar" },
            ].map((s, i) => (
              <div key={i} className="stat-item">
                <div style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4vw,2.8rem)", color: C.azul, lineHeight: 1, marginBottom: "4px" }}>
                  <Counter target={s.num} suffix={s.suf} />
                </div>
                <p style={{ fontSize: "0.8rem", color: C.sec, margin: 0, fontWeight: 300 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. TENSÃO EMOCIONAL ═══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creme, padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-tensao">
        <div style={{ maxWidth: "660px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <Divider />
            <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
              <Eyebrow>A verdade sobre os ramos secos</Eyebrow>
              <h2 id="h2-tensao" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.escuro, margin: "0 0 1.4rem", lineHeight: 1.1 }}>
                O tempo não para
              </h2>
              <p style={{ color: C.sec, fontSize: "clamp(1rem,2.2vw,1.18rem)", lineHeight: 2, fontWeight: 300, marginBottom: "2rem" }}>
                Um ramo seco sem proteção perde cor, torna-se frágil, e com o tempo desintegra-se. O que hoje ainda tem forma e memória, amanhã pode ser pó.
              </p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "clamp(1.2rem,2.8vw,1.65rem)", color: C.azul, lineHeight: 1.6, margin: "0 auto", maxWidth: "500px" }}>
                "Preservar não é apenas guardar flores — é garantir que a memória do dia continua visível na sua casa."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 4. TRÊS OPÇÕES ════════════════════════════════════════════════════ */}
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
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                    <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.05rem", color: item.cor, opacity: 0.65 }} aria-hidden="true">{item.n}</span>
                    <div style={{ flex: 1, height: "1px", background: `${item.cor}2A` }} aria-hidden="true" />
                  </div>
                  <Eyebrow color={item.cor}>{item.sub}</Eyebrow>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.1rem,2.2vw,1.4rem)", color: C.escuro, margin: "0 0 0.7rem", lineHeight: 1.15 }}>{item.titulo}</h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: C.sec, margin: "0 0 0.8rem", fontWeight: 300 }}>{item.desc}</p>
                  <p style={{ fontSize: "0.77rem", color: C.azulClr, margin: "0 0 0.9rem", fontStyle: "italic" }}>{item.detalhe}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1rem" }}>
                    {item.tags.map((tag, j) => (
                      <span key={j} style={{ background: `${item.cor}12`, color: item.cor, fontSize: "0.69rem", padding: "4px 10px", borderRadius: "100px", fontFamily: "'Google Sans', sans-serif", border: `1px solid ${item.cor}20` }}>{tag}</span>
                    ))}
                  </div>
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
          <Reveal delay={0.2}>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <span className="badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Aprovação fotográfica antes de selar — sempre
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 5. FOTOGRAFIA OPCIONAL ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creme, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <Divider />
            <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
              <Eyebrow>Detalhe que faz diferença</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: C.escuro, margin: "0 0 1rem" }}>
                Inclua uma fotografia
              </h2>
              <p style={{ color: C.sec, lineHeight: 1.9, fontSize: "0.97rem", fontWeight: 300 }}>
                Em qualquer das três opções, podemos integrar uma fotografia na composição — do casamento, do batizado, ou qualquer imagem com significado especial. O quadro torna-se ainda mais único.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 6. PROCESSO ══════════════════════════════════════════════════════ */}
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
          <div className="processo-grid" role="list">
            {processo.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="processo-item" role="listitem">
                  <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(250,247,240,0.18)", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.82rem", color: "rgba(250,247,240,0.55)" }} aria-hidden="true">{item.n}</span>
                    {i < processo.length - 1 && <div className="processo-linha" aria-hidden="true" />}
                  </div>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem,2vw,1.2rem)", color: C.creme, margin: "0 0 0.6rem", lineHeight: 1.2 }}>{item.titulo}</h3>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(250,247,240,0.62)", margin: 0, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. MATERIAIS ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creEsc, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-materiais">
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <Eyebrow>Qualidade museológica</Eyebrow>
              <h2 id="h2-materiais" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.escuro, margin: 0 }}>
                Materiais que protegem décadas
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mat-grid" role="list">
              {materiais.map((item, i) => (
                <div key={i} className="mat-item" role="listitem">
                  <div style={{ width: "28px", height: "1px", background: `${C.azulClr}50`, marginBottom: "1.4rem" }} aria-hidden="true" />
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem,2vw,1.22rem)", color: C.creme, margin: "0 0 0.7rem", lineHeight: 1.2 }}>{item.titulo}</h3>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.85, color: "rgba(250,247,240,0.58)", margin: 0, fontWeight: 300 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 8. PREÇOS ═════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creme, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-precos">
        <div style={{ maxWidth: "540px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2rem,4vw,3rem)" }}>
              <Eyebrow>Investimento</Eyebrow>
              <h2 id="h2-precos" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: C.escuro, margin: 0 }}>
                Tamanhos e preços
              </h2>
            </div>
          </Reveal>
          {precos.map((row, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`preco-card ${row.popular ? "preco-popular" : "preco-normal"}`} style={{ position: "relative" }}>
                {row.popular && (
                  <span style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: C.terra, color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "3px 12px", borderRadius: "100px", fontFamily: "'Google Sans', sans-serif", whiteSpace: "nowrap" }}>Mais escolhido</span>
                )}
                <span style={{ fontFamily: "'Google Sans', sans-serif", color: row.popular ? "rgba(250,247,240,0.8)" : C.sec, fontSize: "1rem", fontWeight: 300 }}>{row.size}</span>
                <span style={{ fontFamily: "'TAN-MEMORIES', serif", color: row.popular ? C.creme : C.escuro, fontSize: "1.85rem" }}>{row.price}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <p style={{ color: C.azulClr, fontSize: "0.8rem", textAlign: "center", marginTop: "1.4rem", lineHeight: 1.7 }}>
              Todos os quadros incluem vidro museu anti-UV, moldura feita à medida e design artístico da composição.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 9. PAGAMENTO ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creEsc, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)" }} aria-labelledby="h2-pagamento">
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2rem,4vw,3rem)" }}>
              <Eyebrow>Sem surpresas</Eyebrow>
              <h2 id="h2-pagamento" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: C.escuro, margin: 0 }}>
                Pagamento em 3 fases
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pag-grid" role="list">
              {pagamento.map((p, i) => (
                <div key={i} className="pag-item" role="listitem">
                  <div style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4vw,3rem)", color: C.azul, marginBottom: "8px" }}>{p.pct}</div>
                  <div style={{ fontWeight: 600, color: C.escuro, fontSize: "0.88rem", marginBottom: "8px", fontFamily: "'Google Sans', sans-serif" }}>{p.label}</div>
                  <p style={{ color: C.sec, fontSize: "0.82rem", margin: 0, lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 10. FAQ ═══════════════════════════════════════════════════════════ */}
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

      {/* ══ 11. CTA FINAL ═════════════════════════════════════════════════════ */}
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
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-esc" style={{ background: C.creme, color: C.escuro, boxShadow: "none" }}>Reservar Data</a>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Falar pelo WhatsApp
                </a>
              </div>
              <p style={{ fontSize: "0.72rem", color: "rgba(250,247,240,0.35)", letterSpacing: "0.06em", fontFamily: "'Google Sans', sans-serif" }}>
                A partir de 200€ · Vidro museu anti-UV incluído · Aprovação antes de selar
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
