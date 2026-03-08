"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FORM_URL, WA_URL } from "../_lib/constants";

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
    <p style={{ fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase", color: color || (light ? "rgba(250,247,240,0.5)" : "#7B8FC7"), fontFamily: "Roboto, sans-serif", margin: "0 0 14px", fontWeight: 700, display: "block" }}>
      {children}
    </p>
  );
}

// ─── Dados ────────────────────────────────────────────────────────────────────
const AZUL     = "#7B8FC7";
const AZUL_ESC = "#5A6BA6";
const AZUL_CLR = "#B8C4E8";
const AZUL_FND = "#E8ECF8";
const VERDE    = "#3D6B5E";
const CREME    = "#FAF7F0";
const ESCURO   = "#0F1E1A";

const ocasioes = [
  { emoji: "💍", titulo: "Casamento", descricao: "O bouquet de noiva passou meses a ser pensado ao pormenor. Transforme-o numa obra de arte que vai durar para sempre." },
  { emoji: "🍼", titulo: "Batizado", descricao: "As flores do altar ou da decoração podem tornar-se numa recordação permanente deste dia especial." },
  { emoji: "🌸", titulo: "Aniversário de Casamento", descricao: "Preserve as flores do aniversário e crie uma nova memória para celebrar os anos juntos." },
  { emoji: "🎓", titulo: "Formatura", descricao: "As flores da cerimónia preservadas num quadro são um símbolo de conquista e dedicação." },
  { emoji: "🕊️", titulo: "Homenagem e Luto", descricao: "Em momentos de perda, preservar as flores é uma forma de manter viva a memória de alguém amado." },
  { emoji: "💛", titulo: "Simplesmente Porque Sim", descricao: "Não é preciso uma ocasião especial para dar um presente especial. Um vale oferta é um gesto de amor puro." },
];

const passos = [
  { n: "01", titulo: "Escolha o valor", texto: "O vale pode ter o valor que quiser, com um mínimo de 300€. Pode personalizar o valor para se adaptar ao serviço que deseja oferecer." },
  { n: "02", titulo: "Receba o cartão ilustrado", texto: "Enviamos o cartão por email gratuitamente, ou fisicamente por 5€ mais portes. Se preferir levantar em Coimbra, a recolha é gratuita." },
  { n: "03", titulo: "Ofereça com amor", texto: "O cartão tem campos para escrever de quem é e para quem é. Pode oferecer em mão ou enviar diretamente à pessoa presenteada." },
  { n: "04", titulo: "A pessoa usa quando quiser", texto: "O vale não tem data de validade. A pessoa contacta-nos quando estiver pronta, pelo site ou pelo WhatsApp, e tratamos de tudo juntos." },
];

const condicoes = [
  "Valor mínimo de 300€, correspondente à nossa moldura mais pequena",
  "Sem data de validade — pode ser usado quando quiser",
  "Não é reembolsável",
  "Válido exclusivamente para os serviços da Flores à Beira-Rio",
  "Entrega digital gratuita por email",
  "Entrega física por 5€ mais portes de envio",
  "Recolha gratuita em Coimbra",
];

// ─── WA URL específico para vale ─────────────────────────────────────────────
const WA_VALE = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre o vale oferta de preservação de flores.");

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OfereceClient() {
  return (
    <main style={{ backgroundColor: CREME, fontFamily: "'Roboto', sans-serif", color: ESCURO, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        * { box-sizing: border-box; }

        .btn-primary-vale {
          display: inline-flex; align-items: center; justify-content: center;
          background: ${ESCURO}; color: ${CREME}; padding: 15px 36px; border-radius: 100px;
          text-decoration: none; font-weight: 600; font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; font-family: Roboto, sans-serif; transition: all 0.3s ease;
          box-shadow: 0 6px 24px rgba(15,30,26,0.22);
        }
        .btn-primary-vale:hover { background: ${AZUL}; transform: translateY(-3px); box-shadow: 0 10px 32px rgba(123,143,199,0.35); }

        .btn-outline-vale {
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: ${ESCURO}; padding: 14px 34px; border-radius: 100px;
          text-decoration: none; font-weight: 500; font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; font-family: Roboto, sans-serif;
          border: 1.5px solid rgba(15,30,26,0.25); transition: all 0.3s ease;
        }
        .btn-outline-vale:hover { border-color: ${AZUL}; color: ${AZUL}; transform: translateY(-3px); }

        .btn-azul-vale {
          display: inline-flex; align-items: center; justify-content: center;
          background: ${AZUL}; color: ${CREME}; padding: 15px 36px; border-radius: 100px;
          text-decoration: none; font-weight: 600; font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; font-family: Roboto, sans-serif; transition: all 0.3s ease;
          box-shadow: 0 6px 24px rgba(123,143,199,0.3);
        }
        .btn-azul-vale:hover { background: ${AZUL_ESC}; transform: translateY(-3px); }

        .btn-wa-vale {
          display: inline-flex; align-items: center; gap: 8px;
          background: #25D366; color: #fff; padding: 14px 28px; border-radius: 100px;
          text-decoration: none; font-weight: 600; font-size: 0.78rem; letter-spacing: 1px;
          font-family: Roboto, sans-serif; transition: all 0.3s ease;
        }
        .btn-wa-vale:hover { background: #1da851; transform: translateY(-3px); }

        .cta-row-vale { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
        @media (min-width: 480px) { .cta-row-vale { flex-direction: row; justify-content: center; align-items: center; } }

        .ocasiao-card {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
          border-radius: 18px; padding: clamp(1.1rem,2vw,1.6rem) clamp(1rem,1.8vw,1.4rem);
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .ocasiao-card:hover { background: rgba(255,255,255,0.24); border-color: rgba(255,255,255,0.45); transform: translateY(-4px); }

        .ocasioes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        @media (min-width: 900px) { .ocasioes-grid { grid-template-columns: 1fr 1fr 1fr; gap: 1rem; } }

        .passo-card {
          display: flex; gap: clamp(1.2rem,2.5vw,1.8rem); align-items: flex-start;
          background: #fff; border-radius: 18px; padding: clamp(1.4rem,2.5vw,1.8rem) clamp(1.2rem,2vw,1.6rem);
          box-shadow: 0 2px 20px rgba(123,143,199,0.12); border: 1px solid rgba(123,143,199,0.12);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .passo-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(123,143,199,0.2); }

        .cond-item { display: flex; gap: 0.9rem; align-items: flex-start; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.12); }
        .cond-item:last-child { border-bottom: none; }

        /* HERO com foto de fundo e texto por cima */
        .hero-layout {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        .hero-foto-bg {
          position: absolute; inset: 0;
        }
        .hero-foto-bg img {
          width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block;
        }
        .hero-foto-bg::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,30,26,0.72) 0%, rgba(15,30,26,0.35) 50%, rgba(15,30,26,0.08) 100%);
        }

        .hero-text-col {
          position: relative; z-index: 2;
          width: 100%;
          padding: clamp(110px,14vw,160px) clamp(24px,5vw,72px) clamp(60px,8vw,90px);
        }

        /* Secção cartão (foto + texto) */
        .cartao-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .cartao-grid {
            flex-direction: row;
            align-items: flex-start;
            gap: 3rem;
          }
        }

        .cartao-foto-wrap {
          width: 100%;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .cartao-foto-wrap { width: 42%; }
        }

        .cartao-foto { border-radius: 20px; overflow: hidden; box-shadow: 0 12px 48px rgba(15,30,26,0.14); aspect-ratio: 4/3; background: ${AZUL_FND}; }
        .cartao-foto img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s ease; }
        .cartao-foto:hover img { transform: scale(1.04); }

        /* Entrega cartão */
        .entrega-lista { display: flex; flex-direction: column; gap: 0; }
        .entrega-item { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.9rem 0; border-bottom: 1px solid rgba(123,143,199,0.12); }
        .entrega-item:last-child { border-bottom: none; }
        .entrega-icon { font-size: 1.2rem; margin-top: 1px; flex-shrink: 0; }
        .entrega-texto strong { display: block; font-weight: 600; font-size: 0.88rem; color: ${ESCURO}; font-family: Roboto, sans-serif; margin-bottom: 2px; }
        .entrega-texto span { font-size: 0.83rem; color: #5A6B60; line-height: 1.5; }

        .foto-moldura { border-radius: 20px; overflow: hidden; box-shadow: 0 12px 48px rgba(15,30,26,0.14); aspect-ratio: 3/4; background: ${AZUL_FND}; }
        .foto-moldura img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s ease; }
        .foto-moldura:hover img { transform: scale(1.04); }

        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
        a:focus-visible, button:focus-visible { outline: 3px solid ${AZUL}; outline-offset: 4px; border-radius: 4px; }
      `,
      }} />

      {/* HERO com foto vale2.webp de fundo */}
      <section className="hero-layout">
        {/* Foto de fundo */}
        <div className="hero-foto-bg">
          <img src="/vale2.webp" alt="" aria-hidden="true" />
        </div>

        {/* Texto por cima */}
        <div className="hero-text-col">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: "640px" }}>
            <Eyebrow light>Um presente com alma</Eyebrow>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.05, color: CREME, margin: "0 0 clamp(1.2rem, 2.5vw, 1.8rem)" }}>
              Ofereça uma memória<br />
              <em style={{ fontStyle: "italic", color: AZUL_CLR }}>que dura para sempre</em>
            </h1>
            <p style={{ fontSize: "clamp(0.93rem, 1.8vw, 1.08rem)", lineHeight: 1.85, maxWidth: "460px", color: "rgba(250,247,240,0.82)", margin: "0 0 clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              O vale oferta da Flores à Beira-Rio transforma flores reais em arte emoldurada feita à mão, guardando para sempre as memórias de um dia especial.
            </p>
            <div className="cta-row-vale" style={{ marginBottom: "1.4rem" }}>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-vale">Encomendar Vale Oferta</a>
              <a href="/como-funciona" className="btn-outline-vale" style={{ color: CREME, borderColor: "rgba(250,247,240,0.35)" }}>Como Funciona</a>
            </div>
            <p style={{ fontSize: "0.78rem", color: "rgba(250,247,240,0.5)", letterSpacing: "0.05em" }}>A partir de 300€ · Sem data de validade · Entrega digital gratuita</p>
          </motion.div>
        </div>
      </section>

      {/* CARTÃO com vale1.webp */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div className="cartao-grid">
            <div className="cartao-foto-wrap">
              <div className="cartao-foto">
                <img src="/vale1.webp" alt="Cartão presente da Flores à Beira-Rio versão colorida com ilustrações de flores" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={AZUL}>O cartão</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.15, margin: "0 0 0.4rem", color: ESCURO }}>O cartão presente</h2>
              <p style={{ fontSize: "0.78rem", color: AZUL, letterSpacing: "0.05em", marginBottom: "1.2rem", fontFamily: "Roboto, sans-serif" }}>Ilustrado por uma artista de Coimbra</p>
              <p style={{ lineHeight: 1.85, fontSize: "0.96rem", color: "#5A6B60", marginBottom: "1.6rem" }}>
                Pode ser enviado por email ou entregue fisicamente. Existe em versão colorida e em tons neutros e elegantes.
              </p>
              <div className="entrega-lista">
                <div className="entrega-item">
                  <span className="entrega-icon" aria-hidden="true">✉️</span>
                  <div className="entrega-texto">
                    <strong>Envio por email</strong>
                    <span>Gratuito — recebe o cartão em formato digital</span>
                  </div>
                </div>
                <div className="entrega-item">
                  <span className="entrega-icon" aria-hidden="true">📦</span>
                  <div className="entrega-texto">
                    <strong>Envio físico por correio</strong>
                    <span>5€ pelo cartão impresso, mais portes de envio do envelope</span>
                  </div>
                </div>
                <div className="entrega-item">
                  <span className="entrega-icon" aria-hidden="true">📍</span>
                  <div className="entrega-texto">
                    <strong>Recolha em Coimbra</strong>
                    <span>Gratuita — levanta o cartão físico sem custos adicionais</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* INFORMAÇÕES SOBRE O VALE — movido para antes das ocasiões */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", background: `linear-gradient(145deg, ${AZUL_ESC} 0%, ${AZUL} 100%)`, color: CREME, position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(184,196,232,0.12) 0%, transparent 50%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <Eyebrow light>Transparência total</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, margin: 0, color: CREME }}>Informações sobre o vale</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "20px", padding: "clamp(1.5rem, 3vw, 2.2rem) clamp(1.2rem, 2.5vw, 2rem)" }}>
              {condicoes.map((cond, i) => (
                <div key={i} className="cond-item">
                  <span style={{ color: AZUL_CLR, marginTop: "3px", flexShrink: 0, fontSize: "0.9rem" }} aria-hidden="true">✦</span>
                  <p style={{ fontSize: "0.94rem", lineHeight: 1.75, color: "rgba(250,247,240,0.8)", margin: 0 }}>{cond}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* OCASIÕES */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", background: `linear-gradient(145deg, ${AZUL} 0%, ${AZUL_ESC} 100%)`, color: CREME, position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "clamp(300px,50vw,700px)", height: "clamp(300px,50vw,700px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
              <Eyebrow light>Momentos especiais</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, margin: "0 0 0.9rem" }}>Para cada momento da vida</h2>
              <p style={{ color: "rgba(250,247,240,0.75)", fontSize: "clamp(0.88rem, 1.6vw, 1rem)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto" }}>
                Um presente que vai muito além das flores.
              </p>
            </div>
          </Reveal>
          <div className="ocasioes-grid">
            {ocasioes.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <article className="ocasiao-card">
                  <div style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }} aria-hidden="true">{item.emoji}</div>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)", marginBottom: "0.45rem", color: CREME, lineHeight: 1.2 }}>{item.titulo}</h3>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(250,247,240,0.78)", margin: 0 }}>{item.descricao}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: CREME, color: AZUL_ESC, padding: "15px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease", boxShadow: "0 6px 24px rgba(15,30,26,0.2)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(15,30,26,0.28)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(15,30,26,0.2)"; }}
              >
                Encomendar Vale Oferta
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CITAÇÃO */}
      <section style={{ padding: "clamp(52px,8vw,80px) clamp(20px,5vw,48px)", textAlign: "center", background: CREME }}>
        <Reveal>
          <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 2rem", background: `linear-gradient(to right, transparent, ${AZUL}, transparent)` }} />
          <blockquote style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem, 4vw, 2.8rem)", lineHeight: 1.45, maxWidth: "700px", margin: "0 auto 1rem", fontStyle: "italic", color: ESCURO }}>
            "... as flores são cor da lembrança."
          </blockquote>
          <cite style={{ fontSize: "0.82rem", letterSpacing: "0.18em", color: AZUL, fontStyle: "normal", fontFamily: "Roboto, sans-serif" }}>Alberto Caeiro</cite>
        </Reveal>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", background: AZUL_FND }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <Eyebrow color={AZUL}>Como funciona</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, margin: 0, color: ESCURO }}>Simples e cheio de significado</h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {passos.map((passo, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="passo-card">
                  <div style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: AZUL, lineHeight: 1, minWidth: "60px", opacity: 0.7 }} aria-hidden="true">{passo.n}</div>
                  <div>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", marginBottom: "0.5rem", color: ESCURO, lineHeight: 1.2 }}>{passo.titulo}</h3>
                    <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "#5A6B60", margin: 0 }}>{passo.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", textAlign: "center", background: `linear-gradient(145deg, ${AZUL_FND} 0%, ${CREME} 60%)` }}>
        <Reveal>
          <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 2rem", background: `linear-gradient(to right, transparent, ${AZUL}, transparent)` }} />
          <Eyebrow color={AZUL}>Pronto para oferecer?</Eyebrow>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5.5vw, 3.8rem)", lineHeight: 1.1, maxWidth: "660px", margin: "0 auto 1.2rem", color: ESCURO }}>Um dia especial merece uma recordação especial</h2>
          <p style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)", lineHeight: 1.85, color: "#5A6B60", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            Transforme um momento efémero numa obra de arte feita à mão, para durar uma vida inteira.
          </p>
          <div className="cta-row-vale" style={{ marginBottom: "1.2rem" }}>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-azul-vale">Encomendar Vale Oferta</a>
            <a href={WA_VALE} target="_blank" rel="noopener noreferrer" className="btn-wa-vale">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar pelo WhatsApp
            </a>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#9BA89F" }}>A partir de 300€ · Sem data de validade</p>
        </Reveal>
      </section>
    </main>
  );
}
