"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL, WA_URL } from "../_lib/constants";
import PageHero from "@/components/PageHero";
import SubCard, { SUBPAGES } from "./SubCard";
import "./PreservacaoDeFloresClient.css";

const OCASIOES_HREFS_PT = [
  "/como-funciona",
  "/como-funciona",
  "/como-funciona",
  "/como-funciona",
  "/emoldurar-flores-secas",
  "/opcoes-e-precos",
];

const OCASIOES_HREFS_EN = [
  "/en/how-it-works",
  "/en/how-it-works",
  "/en/how-it-works",
  "/en/how-it-works",
  "/en/frame-dried-flowers",
  "/en/options-and-pricing",
];

export default function PreservacaoDeFloresClient() {
  const t = useTranslations("preservacao");
  const locale = useLocale();
  const motivos = t.raw("motivos");
  const ocasioes = t.raw("ocasioes");

  const bookHref = locale === "en" ? "/en/book-preservation" : FORM_URL;
  const precosHref = locale === "en" ? "/en/options-and-pricing" : "/opcoes-e-precos";
  const comoHref = locale === "en" ? "/en/how-it-works" : "/como-funciona";
  const floresSHref = locale === "en" ? "/en/frame-dried-flowers" : "/emoldurar-flores-secas";
  const faqHref = locale === "en" ? "/en/faq" : "/perguntas-frequentes";
  const ocasioesHrefs = locale === "en" ? OCASIOES_HREFS_EN : OCASIOES_HREFS_PT;

  return (
    <>
      <div style={{ backgroundColor: "var(--cream)", overflowX: "clip" }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <PageHero
          src="/joanaceu.webp"
          imgAlt="Quadro de flores preservadas, Flores à Beira-Rio, Coimbra"
          imgFetchPriority="high"
          gradient="linear-gradient(to top, rgba(35,15,5,0.82) 0%, rgba(35,15,5,0.55) 50%, rgba(35,15,5,0.18) 100%)"
          ariaLabel="Preservação de flores, arte botânica artesanal"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: "640px", textAlign: "center", margin: "0 auto" }}
          >
            <p style={{ fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(250,247,240,0.88)", fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 14px", fontWeight: 700 }}>
              {t("tagline")}
            </p>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.03, color: "var(--cream)", margin: "0 0 clamp(1rem,2.5vw,1.6rem)" }}>
              {t("h1").split(t("h1Em"))[0]}<br />
              <em style={{ fontStyle: "italic", color: "var(--cream)" }}>{t("h1Em")}</em>
            </h1>
            <p style={{ fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.88, maxWidth: "480px", color: "rgba(250,247,240,0.88)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)", fontFamily: "'Google Sans', Roboto, sans-serif" }}>
              {t("heroDesc")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.8rem" }}>
              {[
                { href: precosHref,  label: t("ctaPrecos"),        color: "var(--green-l)" },
                { href: comoHref,    label: t("ctaComoFunciona"),   color: "var(--rust)" },
                { href: floresSHref, label: t("ctaFloresSedcas"),   color: "#5A8FA8" },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{ color: l.color, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${l.color}55`, paddingBottom: "1px", fontFamily: "'Google Sans', Roboto, sans-serif", transition: "border-color 0.2s" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        </PageHero>

        {/* ══ INTRO TEXTO SEO ════════════════════════════════════════════════════ */}
        <section
          aria-label={t("oQueTitle")}
          style={{ padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)", background: "linear-gradient(160deg, #F5EDE4 0%, #FAF7F0 60%)" }}
        >
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <span className="eyebrow">{t("tagline")}</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.9rem,4.5vw,3.2rem)", color: "var(--green-d)", margin: "0 0 clamp(16px,2.5vw,24px)", lineHeight: 1.1 }}>
                {t("oQueTitle")}
              </h2>
              <div style={{ color: "var(--mid)", fontSize: "clamp(0.95rem,1.8vw,1.05rem)", lineHeight: 1.9, fontFamily: "Roboto, sans-serif" }}>
                <p style={{ margin: "0 0 16px" }}>{t("oQueP1")}</p>
                <p style={{ margin: "0 0 16px" }}>{t("oQueP2")}</p>
                <p style={{ margin: 0 }}>{t("oQueP3")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ CARDS DAS 4 SUBPÁGINAS ════════════════════════════════════════════ */}
        <section
          aria-label={t("explorar")}
          style={{ padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)", backgroundColor: "var(--cream)" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}
            >
              <span className="eyebrow">{t("explorar")}</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.9rem,4.5vw,3rem)", color: "var(--green-d)", margin: 0, lineHeight: 1.1 }}>
                {t("tudoSaber")}
              </h2>
            </motion.div>

            <div className="subpages-grid">
              {SUBPAGES.map((item, i) => (
                <SubCard key={item.href} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ PARA QUE OCASIÕES ════════════════════════════════════════════════ */}
        <section
          aria-label={t("queTipo")}
          style={{ padding: "clamp(48px,7vw,76px) clamp(20px,5vw,48px)", background: "linear-gradient(170deg, #2D1A08 0%, #3D2210 50%, #2D1A08 100%)", position: "relative", overflow: "hidden" }}
        >
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(196,132,107,0.12) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,44px)" }}
            >
              <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(212,149,106,0.7)", marginBottom: "12px", fontFamily: "Roboto, sans-serif" }}>{t("queTipo")}</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.9rem,4.5vw,3rem)", color: "var(--cream)", margin: 0, lineHeight: 1.1 }}>
                {t("paraCada")}
              </h2>
            </motion.div>

            <div className="ocasioes-grid">
              {ocasioes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
                >
                  <a href={ocasioesHrefs[i]} style={{ display: "block", textDecoration: "none", padding: "clamp(16px,2.5vw,22px)", borderRadius: "14px", backgroundColor: "rgba(250,247,240,0.04)", border: "1px solid rgba(250,247,240,0.07)", transition: "background 0.25s, border-color 0.25s" }}
                    className="hover-terra-occasion"
                  >
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem,2vw,1.2rem)", color: "var(--cream)", margin: "0 0 6px", lineHeight: 1.2 }}>{item.titulo}</h3>
                    <p style={{ color: "rgba(250,247,240,0.5)", fontSize: "0.82rem", lineHeight: 1.65, margin: 0, fontFamily: "Roboto, sans-serif" }}>{item.desc}</p>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MOTIVOS ════════════════════════════════════════════════════════════ */}
        <section
          aria-label={t("porque")}
          style={{ padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #F5EDE0 0%, #FAF7F0 100%)" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}
            >
              <span className="eyebrow">{t("porque")}</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.9rem,4.5vw,3rem)", color: "var(--green-d)", margin: 0, lineHeight: 1.1 }}>
                {t("feitoParaDurar")}
              </h2>
            </motion.div>

            <div className="motivos-grid">
              {motivos.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.07, duration: 0.6 }}
                  style={{ backgroundColor: "#fff", padding: "clamp(20px,2.5vw,28px)", display: "flex", gap: "14px", alignItems: "flex-start" }}
                >
                  <div style={{ flexShrink: 0, marginTop: "3px" }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="10" fill="rgba(196,132,107,0.1)" />
                      <path d="M6 10l3 3 5-5" stroke="var(--terra)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(0.95rem,1.6vw,1.08rem)", color: "var(--green-d)", margin: "0 0 5px", lineHeight: 1.25 }}>{item.titulo}</h3>
                    <p style={{ color: "var(--mid)", fontSize: "0.84rem", lineHeight: 1.65, margin: 0, fontFamily: "Roboto, sans-serif" }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA FINAL com foto graduation ══════════════════════════════════════ */}
        <section className="cta-graduation" aria-label={t("preserve")}>
          <div className="cta-graduation-bg">
            <Image fill src="/graduation.webp" alt="Rapariga com ramo de flores na cerimónia de licenciatura" sizes="100vw" style={{ objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <motion.div
            className="cta-graduation-inner"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 28px", background: "linear-gradient(to right, transparent, #D4956A, transparent)" }} />
            <span className="eyebrow" style={{ color: "rgba(212,149,106,0.85)" }}>{t("preserve")}</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5.5vw,3.5rem)", color: "var(--cream)", margin: "0 0 16px", lineHeight: 1.1, textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
              {t("momentosMerecem")}
            </h2>
            <p style={{ color: "rgba(250,247,240,0.82)", lineHeight: 1.88, fontSize: "clamp(0.9rem,2vw,1rem)", margin: "0 0 34px", fontFamily: "Roboto, sans-serif", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
              {t("momentosMerecemDesc")}
            </p>
            <div className="cta-row" style={{ marginBottom: "28px" }}>
              <a href={bookHref} className="btn-primary">
                {t("cta1")}
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                {t("cta2")}
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.82rem" }}>
              {[
                { href: precosHref, label: t("ctaVerPrecos") },
                { href: comoHref,   label: t("ctaComoFunc") },
                { href: faqHref,    label: t("ctaFAQ") },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{ color: "rgba(212,149,106,0.85)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(212,149,106,0.3)", paddingBottom: "1px", fontFamily: "Roboto, sans-serif" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
