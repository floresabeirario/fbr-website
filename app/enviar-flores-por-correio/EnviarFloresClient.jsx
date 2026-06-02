"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { SITE_URL, WA_URL } from "../_lib/constants";
import PageHero from "@/components/PageHero";
import "./EnviarFloresClient.css";

const STEP_IMAGES = ["/Envio/1.png", "/Envio/2.png", "/Envio/3.png", "/Envio/4.png", "/Envio/5.png", "/Envio/6.png"];

// ─── HowTo Schema ─────────────────────────────────────────────────────────────
const HowToSchema = ({ name, description, passos, baseUrl }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: passos.map((p, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: p.titulo,
          text: p.corpo,
          url: `${baseUrl}#passo-${i + 1}`,
        })),
      }),
    }}
  />
);

// ─── Step ─────────────────────────────────────────────────────────────────────
const Step = ({ step, img, index }) => {
  const isEven = index % 2 === 0;
  const id = `passo-${index + 1}`;

  return (
    <article id={id} aria-labelledby={`${id}-title`} style={{ marginBottom: "clamp(56px,10vw,96px)" }}>
      <div aria-hidden="true" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(4.5rem,16vw,12rem)", lineHeight: 0.85, color: "rgba(200,82,42,0.1)", userSelect: "none", pointerEvents: "none", marginBottom: "-1.5rem", paddingLeft: isEven ? "clamp(16px,5vw,48px)" : undefined, paddingRight: !isEven ? "clamp(16px,5vw,48px)" : undefined, textAlign: isEven ? "left" : "right" }}>
        {step.n}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`ship-step-grid${isEven ? " ship-step-grid--even" : " ship-step-grid--odd"}`}
      >
        <div className="ship-photo-wrap">
          <h2 className="ship-title-mobile" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "var(--green-d)", margin: "0 0 clamp(12px,2vw,16px)", lineHeight: 1.1 }}>
            {step.titulo}
          </h2>
          <div className="ship-photo">
            <div className="ship-badge">
              <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.7rem", lineHeight: 1 }}>{step.n}</span>
              <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", opacity: 0.8 }}>{step.tag}</span>
            </div>
            <Image fill src={img} alt={step.alt} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>

        <div className="ship-text">
          <h2 id={`${id}-title`} className="ship-title-desktop" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "var(--green-d)", margin: "0 0 clamp(12px,2vw,18px)", lineHeight: 1.1 }}>
            {step.titulo}
          </h2>
          <p style={{ color: "var(--mid)", lineHeight: 1.88, fontSize: "clamp(0.92rem,1.8vw,1.02rem)", margin: 0 }}>
            {step.corpo}
          </p>
          {step.nota && (
            <div style={{ marginTop: "clamp(14px,2vw,18px)", padding: "clamp(14px,2vw,18px) clamp(16px,2.5vw,22px)", borderRadius: "12px", backgroundColor: "rgba(200,82,42,0.05)", borderLeft: "3px solid rgba(200,82,42,0.25)" }}>
              <p style={{ color: "var(--rust)", lineHeight: 1.78, fontSize: "clamp(0.84rem,1.6vw,0.92rem)", margin: 0, fontStyle: "italic" }}>{step.nota}</p>
            </div>
          )}
        </div>
      </motion.div>
    </article>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function EnviarFloresClient() {
  const t = useTranslations("enviarCorreio");
  const locale = useLocale();
  const passos = t.raw("passos");
  const naoItens = t.raw("naoItens");

  const baseUrl = locale === "en" ? `${SITE_URL}/en/how-to-ship-your-flowers` : `${SITE_URL}/enviar-flores-por-correio`;
  const comoFuncionaHref = locale === "en" ? "/en/how-it-works" : "/como-funciona";

  return (
    <>
      <HowToSchema name={t("meta.ogTitle")} description={t("meta.description")} passos={passos} baseUrl={baseUrl} />

      <div style={{ backgroundColor: "var(--cream)", overflowX: "clip" }}>

        <PageHero
          src="/Envio/4.png"
          imgPosition="center"
          gradient="linear-gradient(to top, rgba(35,15,5,0.88) 0%, rgba(35,15,5,0.5) 45%, rgba(35,15,5,0.12) 100%)"
          ariaLabel={t("eyebrow")}
        >
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: "640px", textAlign: "center", margin: "0 auto" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(250,247,240,0.88)", fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 14px", fontWeight: 700, display: "block" }}>{t("eyebrow")}</p>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.05, color: "var(--cream)", margin: "0 0 clamp(1.2rem,2.5vw,1.8rem)" }}>
              {t("h1").split(t("h1Em"))[0]}<br />
              <em style={{ fontStyle: "italic", color: "var(--cream)" }}>{t("h1Em")}</em>
            </h1>
            <p style={{ fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.85, maxWidth: "480px", color: "rgba(250,247,240,0.88)", margin: "0 auto" }}>
              {t("heroDesc")}
            </p>
          </motion.div>
        </PageHero>

        {/* INTRO */}
        <section aria-label={t("introTitle")} style={{ padding: "clamp(52px,9vw,90px) clamp(20px,5vw,48px) clamp(20px,4vw,40px)" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <span className="eyebrow">{t("introTitle")}</span>
            <p style={{ color: "var(--mid)", lineHeight: 1.9, fontSize: "clamp(0.95rem,2vw,1.1rem)", margin: 0 }}>{t("introDesc")}</p>
          </motion.div>
        </section>

        {/* STEPS */}
        <section aria-label={t("passosTitle")} style={{ padding: "clamp(28px,5vw,56px) clamp(20px,5vw,64px) clamp(40px,8vw,80px)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.7rem,4vw,2.6rem)", color: "var(--green-d)", textAlign: "center", margin: "0 0 clamp(40px,7vw,72px)", lineHeight: 1.1 }}>
              {t("passosTitle")}
            </h2>
            {passos.map((step, i) => (
              <Step key={i} step={step} img={STEP_IMAGES[i]} index={i} />
            ))}
          </div>
        </section>

        {/* O QUE EVITAR */}
        <section aria-label={t("naoTitle")} style={{ padding: "clamp(52px,8vw,84px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #F5EDE0 0%, #FAF7F0 100%)" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,36px)" }}>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "var(--green-d)", margin: 0, lineHeight: 1.1 }}>{t("naoTitle")}</h2>
            </motion.div>
            <div className="ship-avoid-grid">
              {naoItens.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }} style={{ backgroundColor: "#fff", borderRadius: "14px", padding: "clamp(16px,2.5vw,22px)", border: "1px solid rgba(200,82,42,0.09)", boxShadow: "0 3px 14px rgba(160,60,20,0.05)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                    <circle cx="10" cy="10" r="10" fill="rgba(200,82,42,0.1)" />
                    <path d="M7 7l6 6M13 7l-6 6" stroke="var(--rust)" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <p style={{ color: "var(--mid)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PARA ONDE ENVIAR + CTA */}
        <section aria-label={t("moradaTitle")} style={{ padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)", background: "linear-gradient(140deg, #F5EDE0 0%, #FAF7F0 55%, #F0E8D8 100%)", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} style={{ maxWidth: "620px", margin: "0 auto" }}>
            <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 28px", background: "linear-gradient(to right, transparent, #C8522A, transparent)" }} />
            <span className="eyebrow">{t("moradaTitle")}</span>
            <p style={{ color: "var(--mid)", lineHeight: 1.88, fontSize: "clamp(0.92rem,2vw,1.02rem)", margin: "0 0 clamp(28px,5vw,40px)" }}>{t("moradaDesc")}</p>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.7rem,4.5vw,2.8rem)", color: "var(--green-d)", margin: "0 0 14px", lineHeight: 1.1 }}>{t("ctaTitle")}</h2>
            <p style={{ color: "var(--mid)", lineHeight: 1.88, fontSize: "clamp(0.9rem,2vw,1rem)", margin: "0 0 30px" }}>{t("ctaDesc")}</p>
            <div className="cta-row" style={{ marginBottom: "24px" }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t("ctaWA")}
              </a>
            </div>
            <a href={comoFuncionaHref} className="text-link">{t("ctaComoFunciona")}</a>
          </motion.div>
        </section>

      </div>
    </>
  );
}
