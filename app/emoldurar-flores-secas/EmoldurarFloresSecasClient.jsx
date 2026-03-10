"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const FORM_URL = "https://wkf.ms/3RfoNAc";
const WA_URL   = "https://wa.me/351934680300";
const WA_SECAS = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre emoldurar flores secas.");

// ─── Cores ────────────────────────────────────────────────────────────────────
const AZUL_ESC  = "#0A1628";   // fundo escuro (hero, CTA)
const AZUL_MED  = "#1B4B6B";   // destaque principal
const AZUL_CLR  = "#5A8FA8";   // texto secundário/eyebrow
const AZUL_TINT = "#E8F0F5";   // fundo claro alternativo
const CREME     = "#FAF7F0";
const ESCURO    = "#0F1E1A";

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────
function Eyebrow({ children, light, color }) {
  return (
    <p style={{
      fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase",
      color: color || (light ? "rgba(250,247,240,0.55)" : AZUL_CLR),
      fontFamily: "'Google Sans', sans-serif", margin: "0 0 14px", fontWeight: 700,
    }}>
      {children}
    </p>
  );
}

// ─── Dados ────────────────────────────────────────────────────────────────────
const opcoes = [
  {
    n: "01",
    sub: "Preservação 3D",
    titulo: "Emoldurar o ramo original",
    desc: "Utilizamos o ramo seco exatamente como está, criando uma composição artística dentro de uma moldura profunda com 4,5 cm de altura útil. O ramo mantém o seu volume natural.",
    tags: ["Bouquets já secos", "Ramos com volume", "Memórias tal como estão"],
    time: "até 3 meses",
  },
  {
    n: "02",
    sub: "Resultado como no dia",
    titulo: "Recriação e prensagem",
    desc: "Recriamos o seu bouquet em conjunto com uma florista. As flores frescas são depois preservadas por prensagem, mantendo melhor as cores naturais. O resultado é bidimensional, num quadro plano.",
    tags: ["Cores preservadas", "Composição plana", "Recriação fiel"],
    time: "até 6 meses",
    link: { href: "/recriacao-bouquet", label: "Saber mais sobre recriação" },
  },
  {
    n: "03",
    sub: "O melhor dos dois mundos",
    titulo: "Combinação de originais e prensadas",
    desc: "Aproveitamos as flores do ramo que ainda estão em bom estado e substituímos as restantes por flores semelhantes preservadas por prensagem. O quadro final equilibra volume e plano.",
    tags: ["Flores originais", "Substituição harmoniosa", "Composição mista"],
    time: "até 6 meses",
    link: { href: "/opcoes-e-precos", label: "Ver preços de preservação" },
  },
];

const materiais = [
  { icon: "◈", titulo: "Vidro Museu Anti-UV", desc: "Vidro UltraVue® 70 — o mesmo usado em museus. Bloqueia os raios ultravioleta que provocam o desbotamento das cores." },
  { icon: "◻", titulo: "Moldura Feita à Medida", desc: "Todas as molduras são produzidas por uma molduraria em Coimbra, especificamente para cada quadro." },
  { icon: "◈", titulo: "Composição Artística", desc: "Cada quadro é desenhado como uma composição equilibrada, pensada para valorizar as flores e a memória que representam." },
  { icon: "◻", titulo: "Aprovação Antes de Selar", desc: "Enviamos fotografias da composição. Terá 72 horas para aprovar ou pedir alterações. Nada é definitivo sem o seu acordo." },
];

const precos = [
  { size: "30 × 40 cm", price: "200€" },
  { size: "40 × 50 cm", price: "270€" },
  { size: "50 × 70 cm", price: "360€" },
];

const pagamento = [
  { pct: "30%", label: "Reserva",          desc: "Sinal que garante a sua vaga. Não reembolsável." },
  { pct: "40%", label: "Início do Trabalho", desc: "Quando o ramo chega e iniciamos o processo." },
  { pct: "30%", label: "Antes da Entrega", desc: "Após o quadro estar emoldurado e antes do envio." },
];

const envio = [
  { icon: "📍", titulo: "Entrega em Mãos",  desc: "Gratuitamente no nosso atelier em Coimbra, mediante agendamento." },
  { icon: "📦", titulo: "Envio por Correio", desc: "Pode enviar o ramo por CTT — correio frágil e urgente. Os custos de envio são a cargo do cliente." },
  { icon: "🔍", titulo: "Acompanhamento",   desc: "Pode acompanhar o estado do seu quadro em qualquer momento em status.floresabeirario.pt" },
];

const faqs = [
  { q: "Posso emoldurar um bouquet de noiva seco?",         a: "Sim. Muitos dos ramos que recebemos já foram secos naturalmente após o casamento. Podemos criar uma composição com o ramo original ou trabalhar numa recriação com flores prensadas." },
  { q: "Recebem ramos de outras cidades ou países?",        a: "Sim. Recebemos ramos enviados por correio de toda a Europa." },
  { q: "O ramo tem de estar perfeito?",                     a: "Não. Se algumas flores já não estiverem em bom estado, podemos substituir esses elementos e preservá-los através de prensagem." },
  { q: "Quanto tempo demora o processo?",                   a: "Depende da opção: emoldurar o ramo seco demora até 3 meses. Recriação ou substituição com prensagem demora até 6 meses." },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ faq, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [open, setOpen] = require("react").useState(false);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      style={{ borderBottom: "1px solid rgba(15,30,26,0.1)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "22px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <span style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 500, color: ESCURO, fontSize: "0.97rem", lineHeight: 1.5 }}>{faq.q}</span>
        <span style={{ color: AZUL_MED, fontSize: "1.3rem", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}>+</span>
      </button>
      {open && (
        <p style={{ color: "#5A6B60", fontFamily: "'Google Sans', sans-serif", fontWeight: 400, fontSize: "0.92rem", lineHeight: 1.85, padding: "0 0 22px", margin: 0 }}>{faq.a}</p>
      )}
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function EmoldurarFloresSecasClient() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const heroY       = useTransform(scrollY, [0, 380], [0, -55]);

  return (
    <main style={{ backgroundColor: CREME, fontFamily: "'Google Sans', sans-serif", color: ESCURO, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; }

        .btn-primary-sec {
          display: inline-flex; align-items: center; justify-content: center;
          background: ${AZUL_ESC}; color: ${CREME}; padding: 15px 36px; border-radius: 100px;
          text-decoration: none; font-weight: 600; font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; font-family: 'Google Sans', sans-serif;
          transition: all 0.3s ease; box-shadow: 0 6px 24px rgba(10,22,40,0.28);
        }
        .btn-primary-sec:hover { background: ${AZUL_MED}; transform: translateY(-3px); box-shadow: 0 10px 32px rgba(27,75,107,0.38); }

        .btn-outline-sec {
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: ${CREME}; padding: 14px 34px; border-radius: 100px;
          text-decoration: none; font-weight: 500; font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; font-family: 'Google Sans', sans-serif;
          border: 1.5px solid rgba(250,247,240,0.35); transition: all 0.3s ease;
        }
        .btn-outline-sec:hover { border-color: rgba(250,247,240,0.75); transform: translateY(-3px); }

        .btn-azul-sec {
          display: inline-flex; align-items: center; justify-content: center;
          background: ${AZUL_MED}; color: ${CREME}; padding: 15px 36px; border-radius: 100px;
          text-decoration: none; font-weight: 600; font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; font-family: 'Google Sans', sans-serif;
          transition: all 0.3s ease; box-shadow: 0 6px 24px rgba(27,75,107,0.32);
        }
        .btn-azul-sec:hover { background: ${AZUL_ESC}; transform: translateY(-3px); }

        .btn-wa-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: #25D366; color: #fff; padding: 14px 28px; border-radius: 100px;
          text-decoration: none; font-weight: 600; font-size: 0.78rem; letter-spacing: 1px;
          font-family: 'Google Sans', sans-serif; transition: all 0.3s ease;
        }
        .btn-wa-sec:hover { background: #1da851; transform: translateY(-3px); }

        .cta-row-sec { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
        @media (min-width: 480px) { .cta-row-sec { flex-direction: row; justify-content: center; align-items: center; } }

        /* Hero */
        .hero-sec {
          position: relative; width: 100%; height: 100svh; min-height: 100vh; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background-image: url('/quadrovidrosobrevidro.webp');
          background-size: cover; background-position: center; background-repeat: no-repeat;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(10,22,40,0.30) 0%, rgba(10,22,40,0.60) 55%, rgba(10,22,40,0.85) 100%);
        }

        /* Opções */
        .opcao-card {
          display: flex; gap: clamp(1.2rem,2.5vw,1.8rem); align-items: flex-start;
          background: #fff; border-radius: 18px; padding: clamp(1.4rem,2.5vw,1.8rem) clamp(1.2rem,2vw,1.6rem);
          box-shadow: 0 2px 20px rgba(27,75,107,0.1); border: 1px solid rgba(27,75,107,0.1);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .opcao-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(27,75,107,0.18); }

        /* Materiais grid */
        .mat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (min-width: 900px) { .mat-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }

        .mat-card {
          background: #fff; border: 1px solid rgba(27,75,107,0.1); border-radius: 16px;
          padding: clamp(1.3rem,2vw,1.7rem) clamp(1.1rem,1.8vw,1.4rem);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .mat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(27,75,107,0.14); }

        /* Preços */
        .preco-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 30px; margin-bottom: 10px;
          background: #fff; border-radius: 12px; border: 1px solid rgba(27,75,107,0.1);
          box-shadow: 0 2px 12px rgba(27,75,107,0.07);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .preco-row:hover { transform: translateY(-2px); box-shadow: 0 6px 22px rgba(27,75,107,0.14); }

        /* Pagamento */
        .pag-card {
          text-align: center; padding: clamp(1.6rem,3vw,2rem) clamp(1.2rem,2vw,1.5rem);
          background: ${AZUL_TINT}; border-radius: 16px; border: 1px solid rgba(27,75,107,0.12);
        }

        /* Envio */
        .envio-item { display: flex; gap: 0.9rem; align-items: flex-start; padding: 1rem 0; border-bottom: 1px solid rgba(15,30,26,0.08); }
        .envio-item:last-child { border-bottom: none; }

        /* Tags */
        .tag {
          display: inline-block; background: ${AZUL_TINT}; color: ${AZUL_MED};
          font-size: 0.72rem; padding: 5px 13px; border-radius: 100px;
          font-family: 'Google Sans', sans-serif; border: 1px solid rgba(27,75,107,0.14);
        }

        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
        a:focus-visible, button:focus-visible { outline: 3px solid ${AZUL_MED}; outline-offset: 4px; border-radius: 4px; }
      ` }} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="hero-sec" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 2, textAlign: "center", padding: "20px", maxWidth: "680px" }}
        >
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
            <Eyebrow light>Preservação Botânica · Coimbra</Eyebrow>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.6rem, 8vw, 5.2rem)", color: CREME, margin: "0 0 clamp(1rem,2.5vw,1.6rem)", lineHeight: 1.02, textShadow: "0 4px 32px rgba(0,0,0,0.55)" }}>
              Emoldurar<br />
              <em style={{ fontStyle: "italic", color: "#A8C4D4" }}>Flores Secas</em>
            </h1>
            <p style={{ fontSize: "clamp(0.93rem, 1.8vw, 1.08rem)", lineHeight: 1.88, maxWidth: "460px", color: "rgba(250,247,240,0.88)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
              Preserve o seu ramo seco num quadro feito à medida,<br />
              com vidro museu anti-UV. Atelier em Coimbra.
            </p>
            <div className="cta-row-sec" style={{ justifyContent: "center", marginBottom: "1.4rem" }}>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-sec">Reservar Data</a>
              <a href={WA_SECAS} target="_blank" rel="noopener noreferrer" className="btn-outline-sec">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "6px" }} aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
            <p style={{ fontSize: "0.75rem", color: "rgba(250,247,240,0.5)", letterSpacing: "0.05em", fontFamily: "'Google Sans', sans-serif" }}>
              Recebemos ramos de toda a Europa
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 2 }}>
          <span style={{ color: "rgba(250,247,240,0.4)", fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Google Sans', sans-serif" }}>scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            style={{ width: "1px", height: "30px", background: "linear-gradient(to bottom, rgba(250,247,240,0.45), transparent)" }} />
        </motion.div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREME, padding: "clamp(80px,12vw,130px) clamp(20px,5vw,48px)" }}>
        <Reveal>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "#5A6B60", fontSize: "clamp(1.05rem,2.4vw,1.22rem)", lineHeight: 2, fontWeight: 300 }}>
              Muitos ramos de flores acabam por secar naturalmente com o passar do tempo. Alguns foram guardados com carinho depois de um casamento, outros já foram criados originalmente com flores secas.
            </p>
            <p style={{ color: ESCURO, fontSize: "clamp(1.05rem,2.4vw,1.22rem)", lineHeight: 2, fontWeight: 400, marginTop: "24px" }}>
              Na Flores à Beira-Rio, podemos transformar esse ramo numa peça artística emoldurada, pensada para preservar a memória e permitir que continue a fazer parte da sua casa.
            </p>
            <div style={{ width: "44px", height: "1px", background: `linear-gradient(to right, transparent, ${AZUL_MED}, transparent)`, margin: "48px auto 0" }} />
          </div>
        </Reveal>
      </section>

      {/* ── TRÊS OPÇÕES ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: AZUL_TINT, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <Eyebrow>Como Funciona</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: ESCURO, margin: 0, lineHeight: 1.1 }}>Três Possibilidades</h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {opcoes.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="opcao-card">
                  <div style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4vw,2.8rem)", color: AZUL_MED, lineHeight: 1, minWidth: "60px", opacity: 0.55 }} aria-hidden="true">{item.n}</div>
                  <div>
                    <Eyebrow>{item.sub}</Eyebrow>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: ESCURO, margin: "0 0 0.65rem", lineHeight: 1.2 }}>{item.titulo}</h3>
                    <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "#5A6B60", margin: "0 0 1rem" }}>{item.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "0.85rem" }}>
                      {item.tags.map((tag, j) => <span key={j} className="tag">{tag}</span>)}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: AZUL_CLR, letterSpacing: "0.04em" }}>
                      Tempo de produção: <strong style={{ color: AZUL_MED }}>{item.time}</strong>
                    </span>
                    {item.link && (
                      <span style={{ display: "block", marginTop: "0.7rem" }}>
                        <a href={item.link.href} style={{ fontSize: "0.78rem", fontWeight: 600, color: AZUL_MED, textDecoration: "none", borderBottom: `1px solid ${AZUL_MED}44`, paddingBottom: "1px", transition: "border-color 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = AZUL_MED}
                          onMouseLeave={e => e.currentTarget.style.borderColor = `${AZUL_MED}44`}
                        >{item.link.label} →</a>
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOTOGRAFIA OPCIONAL ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREME, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)" }}>
        <Reveal>
          <div style={{ maxWidth: "620px", margin: "0 auto", textAlign: "center" }}>
            <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 2rem", background: `linear-gradient(to right, transparent, ${AZUL_MED}, transparent)` }} />
            <Eyebrow>Opcional</Eyebrow>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: ESCURO, margin: "0 0 1.2rem" }}>Incluir uma Fotografia</h2>
            <p style={{ color: "#5A6B60", lineHeight: 1.9, fontSize: "0.98rem", fontWeight: 300 }}>
              Em qualquer uma das opções, podemos incluir uma fotografia na composição do quadro. Muitos clientes escolhem integrar uma fotografia do casamento, uma imagem atual ou uma foto com significado especial.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── MATERIAIS ─────────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(145deg, ${AZUL_ESC} 0%, ${AZUL_MED} 100%)`, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "clamp(300px,50vw,700px)", height: "clamp(300px,50vw,700px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <Eyebrow light>Qualidade</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: CREME, margin: 0 }}>Molduras Feitas à Medida</h2>
            </div>
          </Reveal>
          <div className="mat-grid">
            {materiais.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="mat-card">
                  <div style={{ fontSize: "1.3rem", color: AZUL_CLR, marginBottom: "14px" }} aria-hidden="true">{item.icon}</div>
                  <h3 style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: ESCURO, margin: "0 0 10px" }}>{item.titulo}</h3>
                  <p style={{ color: "#5A6B60", lineHeight: 1.8, fontSize: "0.88rem", margin: 0, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREÇOS ────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREME, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.2rem,4vw,3rem)" }}>
              <Eyebrow>Investimento</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: ESCURO, margin: 0 }}>Tamanhos e Preços</h2>
            </div>
          </Reveal>
          {precos.map((row, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="preco-row">
                <span style={{ fontFamily: "'Google Sans', sans-serif", color: "#5A6B60", fontSize: "1.02rem", fontWeight: 300 }}>{row.size}</span>
                <span style={{ fontFamily: "'TAN-MEMORIES', serif", color: ESCURO, fontSize: "1.7rem" }}>{row.price}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <p style={{ color: AZUL_CLR, fontSize: "0.82rem", textAlign: "center", marginTop: "20px", lineHeight: 1.7 }}>
              Todos os quadros incluem vidro museu anti-UV, moldura feita à medida e design artístico da composição.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PAGAMENTO ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: AZUL_TINT, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.2rem,4vw,3rem)" }}>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: ESCURO, margin: 0 }}>Pagamento em 3 Fases</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {pagamento.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="pag-card">
                  <div style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "2.6rem", color: AZUL_MED, marginBottom: "10px" }}>{p.pct}</div>
                  <div style={{ fontWeight: 600, color: ESCURO, fontSize: "0.9rem", marginBottom: "8px", fontFamily: "'Google Sans', sans-serif" }}>{p.label}</div>
                  <p style={{ color: "#5A6B60", fontSize: "0.82rem", margin: 0, lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENVIO ─────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREME, padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2rem,4vw,3rem)" }}>
              <Eyebrow>Logística</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: ESCURO, margin: "0 0 0.8rem" }}>Como Enviar o Ramo</h2>
              <p style={{ color: "#5A6B60", fontWeight: 300, fontSize: "1rem" }}>Recebemos ramos de toda a Europa.</p>
            </div>
          </Reveal>
          <Reveal>
            <div>
              {envio.map((item, i) => (
                <div key={i} className="envio-item">
                  <span style={{ fontSize: "1.25rem", marginTop: "1px", flexShrink: 0 }} aria-hidden="true">{item.icon}</span>
                  <div>
                    <strong style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: ESCURO, marginBottom: "3px", fontFamily: "'Google Sans', sans-serif" }}>{item.titulo}</strong>
                    <span style={{ fontSize: "0.86rem", color: "#5A6B60", lineHeight: 1.65 }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: AZUL_TINT, padding: "clamp(80px,12vw,120px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,3.5rem)" }}>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5vw,3rem)", color: ESCURO, margin: 0 }}>Perguntas Frequentes</h2>
            </div>
          </Reveal>
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} i={i} />)}
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(145deg, ${AZUL_ESC} 0%, ${AZUL_MED} 100%)`, padding: "clamp(80px,14vw,130px) clamp(20px,5vw,48px)", textAlign: "center" }}>
        <Reveal>
          <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 2rem", background: "linear-gradient(to right, transparent, rgba(250,247,240,0.4), transparent)" }} />
          <Eyebrow light>Pronto para começar?</Eyebrow>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,6vw,4rem)", color: CREME, margin: "0 0 1.2rem", lineHeight: 1.1, maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
            Preserve a sua<br /><em style={{ color: "#A8C4D4" }}>Memória</em>
          </h2>
          <p style={{ color: "rgba(250,247,240,0.75)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.85, marginBottom: "2.5rem", maxWidth: "440px", margin: "0 auto 2.5rem" }}>
            Atelier em Coimbra. Recebemos ramos de toda a Europa.
          </p>
          <div className="cta-row-sec" style={{ marginBottom: "1.2rem" }}>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-sec" style={{ background: CREME, color: AZUL_ESC }}>Reservar Data</a>
            <a href={WA_SECAS} target="_blank" rel="noopener noreferrer" className="btn-wa-sec">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar pelo WhatsApp
            </a>
          </div>
          <p style={{ fontSize: "0.78rem", color: "rgba(250,247,240,0.45)", letterSpacing: "0.05em", fontFamily: "'Google Sans', sans-serif" }}>A partir de 200€ · Vidro museu anti-UV incluído</p>
        </Reveal>
      </section>
    </main>
  );
}
