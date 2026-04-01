// app/recriacao/RecriacaoClient.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { WA_URL_RECRIACAO, EMAIL } from "../_lib/constants";
import PageHero from "@/components/PageHero";
import "./RecriacaoClient.css";

const STEP_IMAGES = [
  "/recriacao-passo1-foto.jpg",
  "/recriacao-passo2-flores.jpg",
  "/recriacao-passo3-prensagem.jpg",
  "/recriacao-passo4-quadro.jpg",
];

const USE_CASE_IMAGES = [
  "/historia-casamento-antigo.jpg",
  "/historia-casamento-recente.jpg",
  "/historia-aniversario-flores.jpg",
];

const BotanicalBloom = ({ style }) => (
  <svg viewBox="0 0 140 140" style={style} fill="none" aria-hidden="true">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((r, i) => (
      <ellipse key={i} cx="70" cy="70" rx="16" ry="38"
        fill="currentColor" opacity="0.12"
        transform={`rotate(${r} 70 70) translate(0 -22)`} />
    ))}
    <circle cx="70" cy="70" r="10" fill="currentColor" opacity="0.22" />
  </svg>
);

const StepArrowRight = () => (
  <div aria-hidden="true" className="step-arrow-right">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M6 16 H26 M18 8 L26 16 L18 24"
        stroke="#8B6914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  </div>
);

const StepArrowDown = () => (
  <div aria-hidden="true" className="step-arrow-down">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 6 V26 M8 18 L16 26 L24 18"
        stroke="#8B6914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  </div>
);

const StepCard = ({ imageSrc, stepLabel, number, title, desc, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5%" }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", paddingLeft: "2px" }}>
      <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "0.6rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", color: "#8B6914" }}>
        {stepLabel} {number}
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(139,105,20,0.2)" }} />
    </div>
    <div style={{ borderRadius: "18px", overflow: "hidden", boxShadow: "0 14px 44px rgba(30,20,10,0.13)", width: "100%", position: "relative" }}>
      <div style={{ height: "360px", overflow: "hidden", position: "relative", backgroundColor: "#D4C8B0" }}>
        <Image fill src={imageSrc} alt={`${stepLabel} ${number}: ${title}`} sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(20,12,4,0.94) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px 22px" }}>
          <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.25rem", color: "#FAF5EC", margin: "0 0 8px", lineHeight: 1.15, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
            {title}
          </h3>
          <p style={{ color: "rgba(250,245,236,0.82)", lineHeight: 1.68, fontSize: "0.82rem", margin: 0, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  </motion.article>
);

const UseCaseCard = ({ imageSrc, tag, title, desc, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 14px 44px rgba(30,20,10,0.1)", backgroundColor: "#fff", border: "1px solid rgba(139,105,20,0.08)" }}
  >
    <div style={{ height: "250px", overflow: "hidden", position: "relative", backgroundColor: "#C8B890" }}>
      <Image fill src={imageSrc} alt={title} sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,12,4,0.04) 0%, rgba(20,12,4,0.62) 100%)" }} />
      <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
        {tag && (
          <span style={{ display: "inline-block", fontSize: "0.55rem", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(250,230,160,0.85)", border: "1px solid rgba(250,230,160,0.35)", padding: "3px 10px", borderRadius: "50px", marginBottom: "8px", fontFamily: "Roboto, sans-serif" }}>
            {tag}
          </span>
        )}
        <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.3rem", color: "var(--cream)", margin: 0, lineHeight: 1.15, textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          {title}
        </h3>
      </div>
    </div>
    <div style={{ padding: "20px 20px 24px" }}>
      <p style={{ color: "#5A4A30", lineHeight: 1.78, fontSize: "0.9rem", margin: 0 }}>{desc}</p>
    </div>
  </motion.article>
);

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

export default function RecriacaoClient() {
  const t = useTranslations("recriacao");
  const locale = useLocale();
  const passos = t.raw("passos");
  const casosUso = t.raw("casosUso");

  const precosHref = locale === "en" ? "/en/pricing-options" : "/opcoes-e-precos";

  return (
    <div style={{ backgroundColor: "#FAF5EC", overflowX: "clip" }}>

      {/* 1. HERO */}
      <PageHero
        src="/sandra2.webp"
        gradient="linear-gradient(to top, rgba(20,12,4,0.85) 0%, rgba(20,12,4,0.45) 50%, rgba(20,12,4,0.2) 100%)"
        ariaLabel={t("h1")}
      >
        <div style={{ maxWidth: "640px", textAlign: "center", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            style={{ fontSize: "clamp(0.52rem,1.3vw,0.62rem)", letterSpacing: "4px", textTransform: "uppercase", fontWeight: "700", marginBottom: "16px", color: "rgba(250,247,240,0.88)", fontFamily: "'Google Sans', Roboto, sans-serif" }}
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.05, margin: "0 0 clamp(1rem,2.5vw,1.6rem)", color: "var(--cream)" }}
          >
            {t("h1").split(" ").slice(0, -1).join(" ")}<br />
            <em style={{ fontStyle: "italic", color: "var(--cream)" }}>{t("h1").split(" ").slice(-1)[0]}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            style={{ fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.85, maxWidth: "460px", margin: "0 auto clamp(1.8rem,3.5vw,2.6rem)", color: "rgba(250,247,240,0.88)", fontWeight: "300" }}
          >
            {t("heroDesc")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a href={WA_URL_RECRIACAO} target="_blank" rel="noopener noreferrer" className="btn-wa-hero">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
              {t("ctaEnviarFotos")}
            </a>
          </motion.div>
        </div>
      </PageHero>

      {/* 2. PASSOS */}
      <section
        aria-label={t("ctaComoFunciona")}
        style={{ padding: "64px 20px 80px", background: "linear-gradient(180deg, #FAF5EC 0%, #F0E8D0 50%, #FAF5EC 100%)", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(70px,12vw,130px)", color: "rgba(139,105,20,0.05)", whiteSpace: "nowrap", pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>
          Processo
        </div>
        <div style={{ maxWidth: "1260px", margin: "0 auto", position: "relative" }}>
          <motion.header initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-eyebrow">{t("ctaComoFunciona")}</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.9rem,5vw,3.2rem)", color: "#2A1E0A", margin: 0, lineHeight: 1.1 }}>
              {t("quatroPassos")}
            </h2>
          </motion.header>

          <div className="steps-wrapper">
            {passos.map((step, i) => (
              <>
                <div key={`step-${i}`} className="step-item">
                  <StepCard imageSrc={STEP_IMAGES[i]} stepLabel={t("stepLabel")} number={String(i + 1)} title={step.titulo} desc={step.desc} delay={i * 0.1} />
                </div>
                {i < passos.length - 1 && (
                  <>
                    <StepArrowRight key={`arrow-right-${i}`} />
                    <StepArrowDown key={`arrow-down-${i}`} />
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PARA QUEM E */}
      <section
        aria-label={t("paraQuemTitle")}
        style={{ padding: "36px 20px 76px", backgroundColor: "#FAF5EC" }}
      >
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <motion.header initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "28px" }}>
            <span className="section-eyebrow">{t("paraQuemTitle")}</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,3rem)", color: "#2A1E0A", margin: 0, lineHeight: 1.1 }}>
              {t("memorias")}
            </h2>
          </motion.header>
          <div className="cases-grid">
            {casosUso.map((c, i) => (
              <UseCaseCard key={i} imageSrc={USE_CASE_IMAGES[i]} tag={c.tag} title={c.titulo} desc={c.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRECOS */}
      <section
        aria-label={t("precosTitle")}
        style={{ padding: "56px 20px 76px", background: "linear-gradient(135deg, #F0E8D0 0%, #FAF5EC 60%, #EDE0C4 100%)", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden="true" className="drift-b" style={{ position: "absolute", right: "-14px", bottom: "8%", color: "#8B6914", width: "90px", opacity: 0.07, pointerEvents: "none" }}>
          <BotanicalBloom style={{ width: "100%" }} />
        </div>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: "#fff", borderRadius: "24px", padding: "clamp(24px,5vw,48px) clamp(18px,4vw,42px)", boxShadow: "0 12px 48px rgba(30,20,5,0.08)", border: "1px solid rgba(139,105,20,0.1)", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: "-32px", right: "-32px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,164,74,0.12) 0%, transparent 70%)" }} />
            <div style={{ textAlign: "center", marginBottom: "26px" }}>
              <span className="section-eyebrow">{t("precosTitle")}</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.45rem,3.5vw,2.3rem)", color: "#2A1E0A", margin: "0 0 10px" }}>
                {t("precosDesc")}
              </h2>
              <p style={{ color: "#5A4A30", fontSize: "0.88rem", lineHeight: 1.75, maxWidth: "480px", margin: "0 auto" }}>
                {t("precosSub")}
              </p>
            </div>
            <div className="pricing-cols" style={{ marginBottom: "22px" }}>
              <div style={{ backgroundColor: "rgba(139,105,20,0.05)", borderRadius: "12px", padding: "20px 16px", border: "1px solid rgba(139,105,20,0.1)" }}>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem", color: "#2A1E0A", margin: "0 0 7px" }}>{t("floresFrescas")}</h3>
                <p style={{ color: "#5A4A30", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>{t("floresFrescasDesc")}</p>
              </div>
              <div style={{ backgroundColor: "rgba(196,164,74,0.07)", borderRadius: "12px", padding: "20px 16px", border: "1px solid rgba(196,164,74,0.14)" }}>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem", color: "#2A1E0A", margin: "0 0 7px" }}>{t("preservacaoMoldura")}</h3>
                <p style={{ color: "#5A4A30", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>{t("preservacaoMolduraDesc")}</p>
              </div>
            </div>
            <div style={{ textAlign: "center", paddingTop: "18px", borderTop: "1px solid rgba(139,105,20,0.1)" }}>
              <a href={precosHref} style={{ color: "#8B6914", fontWeight: "600", fontSize: "0.85rem", textDecoration: "none", borderBottom: "1px solid rgba(139,105,20,0.35)", paddingBottom: "2px" }}>
                {t("verPrecos")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section
        aria-label={t("recriarTitle")}
        style={{ padding: "80px 20px", background: "linear-gradient(140deg, #1A0E02 0%, #2E1E06 40%, #4A3010 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}
      >
        {[
          { cls: "drift-a", top: "10%",    left: "4%",   w: "clamp(75px,10vw,115px)", op: 0.13, d: "0s"   },
          { cls: "drift-c", bottom: "8%",  right: "5%",  w: "clamp(65px,9vw,100px)",  op: 0.11, d: "1.5s" },
          { cls: "drift-b", top: "22%",    right: "11%", w: "clamp(48px,7vw,75px)",   op: 0.09, d: "0.5s" },
          { cls: "drift-a", bottom: "22%", left: "9%",   w: "clamp(52px,7vw,80px)",   op: 0.1,  d: "3s"   },
        ].map((b, i) => (
          <div aria-hidden="true" key={i} className={b.cls} style={{ position: "absolute", color: "#C4A44A", width: b.w, opacity: b.op, pointerEvents: "none", animationDelay: b.d, ...(b.top ? { top: b.top } : {}), ...(b.bottom ? { bottom: b.bottom } : {}), ...(b.left ? { left: b.left } : {}), ...(b.right ? { right: b.right } : {}) }}>
            <BotanicalBloom style={{ width: "100%" }} />
          </div>
        ))}

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 2, maxWidth: "660px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.55rem", letterSpacing: "4px", textTransform: "uppercase", fontWeight: "700", color: "#C4A44A", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>
            {t("recriarTitle")}
          </p>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,5.5vw,3.6rem)", color: "#FAF5EC", margin: "0 0 16px", lineHeight: 1.1 }}>
            {t("recriarSub")}
          </h2>
          <p style={{ color: "rgba(250,245,236,0.66)", fontSize: "clamp(0.88rem,2vw,0.98rem)", lineHeight: 1.85, margin: "0 auto 34px", maxWidth: "480px" }}>
            {t("recriarDesc")}
          </p>
          <div className="cta-row">
            <a href={WA_URL_RECRIACAO} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
              {t("ctaWA")}
            </a>
            <a href={`mailto:${EMAIL}?subject=Or%C3%A7amento%20Recria%C3%A7%C3%A3o%20de%20Bouquet`} className="btn-outline-light">
              {t("ctaEmail")}
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
