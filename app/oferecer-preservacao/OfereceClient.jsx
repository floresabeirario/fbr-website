"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FORM_URL, FORM_URL_VALE } from "../_lib/constants";
import PageHero from "@/components/PageHero";
import "./OfereceClient.css";

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
    <p style={{ fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase", color: color || (light ? "rgba(250,247,240,0.88)" : "#7B8FC7"), fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 14px", fontWeight: 700, display: "block" }}>
      {children}
    </p>
  );
}

// ─── Dados ────────────────────────────────────────────────────────────────────
const AZUL     = "#7B8FC7";
const AZUL_ESC = "#5A6BA6";
const AZUL_CLR = "#B8C4E8";
const AZUL_FND = "#E8ECF8";
const CREME    = "#FAF7F0";
const ESCURO   = "#0F1E1A";

const ocasioes = [
  { img: "/casamento.webp",           titulo: "Casamento",               descricao: "O bouquet de noiva passou meses a ser pensado ao pormenor. Transforme-o numa obra de arte que vai durar para sempre." },
  { img: "/batizado.webp",            titulo: "Batizado",                descricao: "As flores do altar ou da decoração podem tornar-se numa recordação permanente deste dia especial." },
  { img: "/aniversariocasamento.webp",titulo: "Aniversário de Casamento", descricao: "Preserve as flores do aniversário e crie uma nova memória para celebrar os anos juntos." },
  { img: "/formatura.webp",           titulo: "Formatura",               descricao: "As flores da cerimónia preservadas num quadro são um símbolo de conquista e dedicação." },
  { img: "/luto.webp",                titulo: "Homenagem e Luto",        descricao: "Em momentos de perda, preservar as flores é uma forma de manter viva a memória de alguém amado." },
  { img: "/porquesim.webp",           titulo: "Simplesmente Porque Sim", descricao: "Não é preciso uma ocasião especial para dar um presente especial. Um vale oferta é um gesto de amor puro." },
];

const passos = [
  { n: "01", titulo: "Escolha o valor", texto: "O vale pode ter o valor que quiser, com um mínimo de 300€. Pode personalizar o valor para se adaptar ao serviço que deseja oferecer.", link: { href: "/opcoes-e-precos", label: "Ver preços" } },
  { n: "02", titulo: "Receba e ofereça o cartão", texto: "Enviamos o cartão por email gratuitamente, ou fisicamente por 9€ mais portes, pronto a oferecer com envelope incluído. Se preferir levantar em Coimbra, 9€ com recolha gratuita. O cartão tem campos para escrever de quem é e para quem é, e podemos enviar diretamente à pessoa presenteada." },
  { n: "03", titulo: "A pessoa usa quando quiser", texto: "O vale não tem data de validade. O presenteado deve contactar-nos quando quiser, pelo site ou pelo WhatsApp, e tratamos de tudo juntos. Recomendamos fazer a reserva com o máximo de antecedência para garantir vaga na data desejada.", link: { href: "/como-funciona", label: "Ver processo completo" } },
];

const condicoesCartao = [
  "Valor mínimo de 300€, correspondente à nossa moldura mais pequena",
  "Sem data de validade, pode ser usado quando quiser",
  "Não é reembolsável",
  "Válido exclusivamente para os serviços da Flores à Beira-Rio",
];

// ─── Vale Slider ──────────────────────────────────────────────────────────────
const VALE_SLIDES = ["/vale2.webp", "/vale1.webp"];

function ValeSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  function startTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % VALE_SLIDES.length);
    }, 3200);
  }

  function goTo(i) {
    setCurrent(i);
    startTimer();
  }

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="vale-slider">
      {VALE_SLIDES.map((src, i) => (
        <div
          key={src}
          className="vale-slide"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image fill src={src} alt="Cartão presente da Flores à Beira-Rio" sizes="(max-width: 768px) 100vw, 42vw" style={{ objectFit: "cover" }} />
        </div>
      ))}
      <div className="vale-slider-dots" role="group" aria-label="Selecionar imagem">
        {VALE_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`vale-dot${i === current ? " vale-dot-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Imagem ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OfereceClient() {
  return (
    <main style={{ backgroundColor: CREME, fontFamily: "'Google Sans', sans-serif", color: ESCURO, overflowX: "hidden" }}>

      {/* HERO com foto vale1.webp de fundo */}
      <PageHero
        src="/vale1.webp"
        imgPosition="center"
        gradient="linear-gradient(to top, rgba(10,20,16,0.88) 0%, rgba(10,20,16,0.55) 45%, rgba(10,20,16,0.15) 100%)"
        ariaLabel="Oferecer preservação de flores — Vale Oferta"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "640px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Eyebrow light>Um presente com alma</Eyebrow>
          <h1 className="hero-titulo" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.05, color: CREME, margin: "0 0 clamp(1.2rem, 2.5vw, 1.8rem)" }}>
            Ofereça uma memória<br />
            <em style={{ fontStyle: "italic", color: AZUL_CLR }}>que dura para sempre</em>
          </h1>
          <p className="hero-texto" style={{ fontSize: "clamp(0.93rem, 1.8vw, 1.08rem)", lineHeight: 1.85, maxWidth: "460px", color: "rgba(250,247,240,0.88)", margin: "0 0 clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            O vale oferta da Flores à Beira-Rio permite oferecer a preservação de flores num quadro emoldurado, tornando-se na prenda perfeita para qualquer ocasião.
          </p>
          <div className="cta-row-vale" style={{ marginBottom: "1.4rem", justifyContent: "center" }}>
            <a href={FORM_URL_VALE} target="_blank" rel="noopener noreferrer" className="btn-primary-vale">Encomendar Vale Oferta</a>
          </div>
          <p style={{ fontSize: "0.78rem", color: "rgba(250,247,240,0.72)", letterSpacing: "0.05em", fontFamily: "'Google Sans', Roboto, sans-serif" }}>A partir de 300€ · Sem data de validade · Entrega digital gratuita</p>
        </motion.div>
      </PageHero>

      {/* CARTÃO com slider vale */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div className="cartao-grid">
            <div className="cartao-foto-wrap">
              <div className="cartao-foto">
                <ValeSlider />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={AZUL}>O cartão</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.15, margin: "0 0 0.3rem", color: ESCURO }}>Vale oferta de preservação</h2>
              <p style={{ fontSize: "0.78rem", color: AZUL, letterSpacing: "0.05em", marginBottom: "1.4rem", fontFamily: "'Google Sans', sans-serif" }}>
                Ilustrado pela artista{" "}
                <a href="https://www.instagram.com/damais_cenas" target="_blank" rel="noopener noreferrer" style={{ color: AZUL, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${AZUL}66`, paddingBottom: "1px" }}>@damais_cenas</a>
                {", de Coimbra"}
              </p>

              <div style={{ marginBottom: "1.6rem" }}>
                {condicoesCartao.map((cond, i) => (
                  <div key={i} className="cond-cartao-item">
                    <span style={{ color: AZUL, marginTop: "3px", flexShrink: 0, fontSize: "0.75rem" }} aria-hidden="true">✦</span>
                    <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#5A6B60", margin: 0 }}>{cond}</p>
                  </div>
                ))}
              </div>

              <div className="entrega-lista">
                <div className="entrega-item">
                  <span className="entrega-icon" aria-hidden="true">✉️</span>
                  <div className="entrega-texto">
                    <strong>Envio por email</strong>
                    <span>Gratuito, recebe o cartão em formato digital</span>
                  </div>
                </div>
                <div className="entrega-item">
                  <span className="entrega-icon" aria-hidden="true">📦</span>
                  <div className="entrega-texto">
                    <strong>Envio físico por correio</strong>
                    <span>9€ pelo vale físico, mais portes de envio. Vai pronto a oferecer, com envelope incluído.</span>
                  </div>
                </div>
                <div className="entrega-item">
                  <span className="entrega-icon" aria-hidden="true">📍</span>
                  <div className="entrega-texto">
                    <strong>Recolha em Coimbra</strong>
                    <span>9€ pelo vale físico, recolha gratuita. Vai pronto a oferecer, com envelope incluído.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
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
              <Reveal key={i} delay={i * 0.06} className="ocasiao-reveal">
                <article className="ocasiao-card">
                  <div className="ocasiao-img">
                    <img src={item.img} alt={item.titulo} loading="lazy" />
                  </div>
                  <div className="ocasiao-content">
                    <h3 className="ocasiao-titulo">{item.titulo}</h3>
                    <p className="ocasiao-desc">{item.descricao}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
              <a href={FORM_URL_VALE} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: CREME, color: AZUL_ESC, padding: "15px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', sans-serif", transition: "all 0.3s ease", boxShadow: "0 6px 24px rgba(15,30,26,0.2)" }}
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
          <cite style={{ fontSize: "0.82rem", letterSpacing: "0.18em", color: AZUL, fontStyle: "normal", fontFamily: "'Google Sans', sans-serif" }}>Alberto Caeiro</cite>
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
                    <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "#5A6B60", margin: passo.link ? "0 0 0.7rem" : "0" }}>{passo.texto}</p>
                    {passo.link && (
                      <a href={passo.link.href} style={{ fontSize: "0.78rem", fontWeight: 600, color: AZUL, textDecoration: "none", letterSpacing: "0.05em", borderBottom: `1px solid ${AZUL}44`, paddingBottom: "1px", transition: "border-color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = AZUL}
                        onMouseLeave={e => e.currentTarget.style.borderColor = `${AZUL}44`}
                      >{passo.link.label} →</a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/sunset.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 2rem", background: `linear-gradient(to right, transparent, ${AZUL_CLR}, transparent)` }} />
          <Eyebrow light>Pronto para oferecer?</Eyebrow>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5.5vw, 3.8rem)", lineHeight: 1.1, maxWidth: "660px", margin: "0 auto 1.2rem", color: CREME }}>Um dia especial merece uma recordação especial</h2>
          <p style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)", lineHeight: 1.85, color: "rgba(250,247,240,0.82)", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            Transforme um momento efémero numa obra de arte feita à mão, para durar uma vida inteira.
          </p>
          <div className="cta-row-vale" style={{ marginBottom: "1.2rem" }}>
            <a href={FORM_URL_VALE} target="_blank" rel="noopener noreferrer" className="btn-azul-vale">Encomendar Vale Oferta</a>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-vale">Reservar Data</a>
          </div>
          <p style={{ fontSize: "0.8rem", color: "rgba(250,247,240,0.55)" }}>A partir de 300€ · Sem data de validade</p>
        </Reveal>
      </section>
    </main>
  );
}
