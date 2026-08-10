"use client";

import { useRef, useState, useEffect } from "react";
import { m, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import PageHero from "@/components/PageHero";
import "./OfereceClient.css";

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
      className={className}
    >
      {children}
    </m.div>
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

// ─── Constantes ───────────────────────────────────────────────────────────────
const AZUL     = "#7B8FC7";
const AZUL_ESC = "#5A6BA6";
const AZUL_CLR = "#B8C4E8";
const AZUL_FND = "#E8ECF8";
const CREME    = "var(--cream)";
const ESCURO   = "var(--dark)";


// ─── Vale Slider ──────────────────────────────────────────────────────────────
const VALE_SLIDES = ["/vale2.webp", "/vale1.webp"];

function ValeSlider({ alt }) {
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
          <Image fill src={src} alt={alt} sizes="(max-width: 768px) 100vw, 42vw" style={{ objectFit: "cover" }} />
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

const OCASIOES_IMGS = ["/casamento.webp", "/batizado.webp", "/aniversariocasamento.webp", "/formatura.webp", "/luto.webp", "/porquesim.webp"];
const ENTREGA_ICONS = ["✉️", "📦", "📍"];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OfereceClient() {
  const t = useTranslations("oferecer");
  const locale = useLocale();
  const ocasioes = t.raw("ocasioes");
  const passos = t.raw("passos");
  const condicoesCartao = t.raw("condicoes");
  const entrega = t.raw("entrega");
  const valeHref = locale === "en" ? "/en/gift-voucher" : "/vale-presente";
  const precosHref = locale === "en" ? "/en/options-and-pricing" : "/opcoes-e-precos";
  // Vale de demonstração no site do voucher (cartão digital real, dados
  // fictícios de um casal). O código EXEMPLO é tratado em voucher.*.
  const exemploHref = locale === "en"
    ? "https://voucher.floresabeirario.pt/EXEMPLO?lang=en"
    : "https://voucher.floresabeirario.pt/EXEMPLO";
  return (
    <div style={{ backgroundColor: CREME, fontFamily: "'Google Sans', sans-serif", color: ESCURO, overflowX: "clip" }}>

      {/* HERO com foto vale1.webp de fundo */}
      <PageHero
        src="/vale1.webp"
        imgFetchPriority="high"
        imgPosition="center"
        gradient="linear-gradient(to top, rgba(10,20,16,0.88) 0%, rgba(10,20,16,0.55) 45%, rgba(10,20,16,0.15) 100%)"
        ariaLabel="Oferecer preservação de flores, Vale Oferta"
      >
        <m.div
          className="hero-enter"
          style={{ maxWidth: "640px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Eyebrow light>{t("eyebrow")}</Eyebrow>
          <h1 className="hero-titulo" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.05, color: CREME, margin: "0 0 clamp(1.2rem, 2.5vw, 1.8rem)" }}>
            {t("h1")}
          </h1>
          <p className="hero-texto" style={{ fontSize: "clamp(0.93rem, 1.8vw, 1.08rem)", lineHeight: 1.85, maxWidth: "460px", color: "rgba(250,247,240,0.88)", margin: "0 0 clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            {t("heroDesc")}
          </p>
          <div className="cta-row-vale" style={{ marginBottom: "1.4rem", justifyContent: "center" }}>
            <Link href={valeHref} className="btn-primary-vale">{t("ctaEncomendar")}</Link>
          </div>
        </m.div>
      </PageHero>

      {/* CARTÃO com slider vale */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div className="cartao-grid">
            <div className="cartao-foto-wrap">
              <div className="cartao-foto">
                <ValeSlider alt={t("valeAlt")} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={AZUL}>{t("cartaoLabel")}</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.15, margin: "0 0 0.3rem", color: ESCURO }}>{t("cartaoTitulo")}</h2>
              <p style={{ fontSize: "0.78rem", color: AZUL, letterSpacing: "0.05em", marginBottom: "1.4rem", fontFamily: "'Google Sans', sans-serif" }}>
                {t("cartaoCredito").split("@damais_cenas")[0]}
                <a href="https://www.instagram.com/damais_cenas" target="_blank" rel="noopener noreferrer" style={{ color: AZUL, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${AZUL}66`, paddingBottom: "1px" }}>@damais_cenas</a>
                {t("cartaoCredito").split("@damais_cenas")[1]}
              </p>

              <div style={{ marginBottom: "1.6rem" }}>
                {condicoesCartao.map((cond, i) => (
                  <div key={i} className="cond-cartao-item">
                    <span style={{ color: AZUL, marginTop: "3px", flexShrink: 0, fontSize: "0.75rem" }} aria-hidden="true">✦</span>
                    <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--mid)", margin: 0 }}>{cond}</p>
                  </div>
                ))}
              </div>

              <div className="entrega-lista">
                {entrega.map((item, i) => (
                  <div key={i} className="entrega-item">
                    <span className="entrega-icon" aria-hidden="true">{ENTREGA_ICONS[i]}</span>
                    <div className="entrega-texto">
                      <strong>{item.titulo}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={exemploHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-border-full"
                style={{ display: "inline-flex", alignItems: "center", marginTop: "1.6rem", fontSize: "0.82rem", fontWeight: 600, color: AZUL, textDecoration: "none", letterSpacing: "0.03em", borderBottom: `1px solid ${AZUL}55`, paddingBottom: "2px" }}
              >
                {t("verExemplo")}
              </a>
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
              <Eyebrow light>{t("momentosTitulo")}</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, margin: "0 0 0.9rem" }}>{t("momentosSubtitulo")}</h2>
              <p style={{ color: "rgba(250,247,240,0.75)", fontSize: "clamp(0.88rem, 1.6vw, 1rem)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto" }}>
                {t("momentosDesc")}
              </p>
            </div>
          </Reveal>
          <div className="ocasioes-grid">
            {ocasioes.map((item, i) => (
              <Reveal key={i} delay={i * 0.06} className="ocasiao-reveal">
                <article className="ocasiao-card">
                  <div className="ocasiao-img">
                    <Image fill src={OCASIOES_IMGS[i]} alt={item.titulo} sizes="(max-width: 640px) 50vw, 18vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="ocasiao-content">
                    <h3 className="ocasiao-titulo">{item.titulo}</h3>
                    <p className="ocasiao-desc">{item.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
              <Link href={valeHref}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: CREME, color: AZUL_ESC, padding: "15px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', sans-serif", transition: "all 0.3s ease", boxShadow: "0 6px 24px rgba(15,30,26,0.2)" }}
                className="hover-lift"
              >
                {t("ctaEncomendar")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CITAÇÃO */}
      <section style={{ padding: "clamp(52px,8vw,80px) clamp(20px,5vw,48px)", textAlign: "center", background: CREME }}>
        <Reveal>
          <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 2rem", background: `linear-gradient(to right, transparent, ${AZUL}, transparent)` }} />
          <blockquote style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem, 4vw, 2.8rem)", lineHeight: 1.45, maxWidth: "700px", margin: "0 auto 1rem", fontStyle: "italic", color: ESCURO }}>
            &ldquo;{t("citacao")}&rdquo;
          </blockquote>
          <cite style={{ fontSize: "0.82rem", letterSpacing: "0.18em", color: AZUL, fontStyle: "normal", fontFamily: "'Google Sans', sans-serif" }}>{t("citacaoAutor")}</cite>
        </Reveal>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: "clamp(64px,10vw,100px) clamp(20px,5vw,48px)", background: AZUL_FND }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <Eyebrow color={AZUL}>{t("comoFunciona")}</Eyebrow>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, margin: 0, color: ESCURO }}>{t("comoFuncionaTitle")}</h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {passos.map((passo, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="passo-card">
                  <div style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: AZUL, lineHeight: 1, minWidth: "60px", opacity: 0.7 }} aria-hidden="true">0{i + 1}</div>
                  <div>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", marginBottom: "0.5rem", color: ESCURO, lineHeight: 1.2 }}>{passo.titulo}</h3>
                    <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--mid)", margin: passo.linkHref ? "0 0 0.7rem" : "0" }}>{passo.desc}</p>
                    {passo.linkHref && (
                      <a href={passo.linkHref} style={{ fontSize: "0.78rem", fontWeight: 600, color: AZUL, textDecoration: "none", letterSpacing: "0.05em", borderBottom: `1px solid ${AZUL}44`, paddingBottom: "1px", transition: "border-color 0.2s" }}
                        className="hover-border-full"
                      >{passo.linkLabel} →</a>
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
        <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
          <Image src="/sunset.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 2rem", background: `linear-gradient(to right, transparent, ${AZUL_CLR}, transparent)` }} />
          <Eyebrow light>{t("ctaFinalTitle")}</Eyebrow>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5.5vw, 3.8rem)", lineHeight: 1.1, maxWidth: "660px", margin: "0 auto 1.2rem", color: CREME }}>{t("ctaFinalSub")}</h2>
          <p style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)", lineHeight: 1.85, color: "rgba(250,247,240,0.82)", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            {t("ctaFinalDesc")}
          </p>
          <div className="cta-row-vale" style={{ marginBottom: "1.2rem" }}>
            <Link href={valeHref} className="btn-azul-vale">{t("ctaEncomendar")}</Link>
            {/* Antes apontava para o formulário de reserva — o rótulo diz
                "Ver preços", por isso leva à página de Opções e Preços. */}
            <Link href={precosHref} className="btn-primary-vale">{t("verPrecos")}</Link>
          </div>
          <p style={{ fontSize: "0.8rem", color: "rgba(250,247,240,0.55)" }}>{t("apartirDe")}</p>
        </Reveal>
      </section>
    </div>
  );
}
