"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL, OPCOES_PRECOS_URL } from "../_lib/constants";
import { waUrl } from "../_lib/wa";
import { splitTitle } from "../_lib/splitTitle";
import ElfsightReviews from "@/components/ElfsightReviews";
import BouquetNoivaFAQ from "./BouquetNoivaFAQ";

const fadeUp = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } };

function CheckIcon() {
  return (
    <svg className="momento-feature-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="rgba(196,132,107,0.1)" />
      <path d="M6 10l3 3 5-5" stroke="var(--terra)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function BouquetNoivaClient() {
  const t = useTranslations("bouquetNoiva");
  const locale = useLocale();
  const features = t.raw("features");
  const processSteps = t.raw("processSteps");

  const bookHref   = locale === "en" ? "/en/book-preservation"   : FORM_URL;
  const precosHref = locale === "en" ? "/en/options-and-pricing" : OPCOES_PRECOS_URL;
  const comoHref   = locale === "en" ? "/en/how-it-works"        : "/como-funciona";
  const faqHref    = locale === "en" ? "/en/faq"                 : "/perguntas-frequentes";
  const [processStart, processEm] = splitTitle(t("processTitle"), t("processEm"));
  const [ctaFinalStart, ctaFinalEm] = splitTitle(t("ctaFinalTitle"), t("ctaFinalEm"));

  return (
    <div className="momento-page">

      {/* ── Hero imagem ─────────────────────────────────────── */}
      <section className="bouquet-hero">
        <Image
          src="/quadroflores.webp"
          alt=""
          fill
          priority
          className="bouquet-hero-img"
          sizes="100vw"
        />
        <div className="bouquet-hero-overlay" aria-hidden="true" />
        <motion.div {...fadeUp} className="bouquet-hero-content">
          <span className="bouquet-hero-eyebrow">{t("eyebrow")}</span>
          <h1 className="bouquet-hero-h1">{t("h1")}</h1>
          <p className="bouquet-hero-desc">{t("heroDesc")}</p>
          <div className="bouquet-weekend-badge" aria-label={t("weekendBadge")}>
            <CalendarIcon />
            <span>{t("weekendBadge")}</span>
          </div>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={waUrl(locale, "noiva")} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
        </motion.div>
      </section>

      {/* ── Barra de prova social ───────────────────────────── */}
      <div className="bouquet-proof-bar">
        <span className="bouquet-proof-stars" aria-hidden="true">{t("socialProofRating")}</span>
        <span className="bouquet-proof-text">{t("socialProofCount")}</span>
      </div>

      {/* ── Antes e depois ─────────────────────────────────── */}
      <section className="bouquet-before-after">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="bouquet-before-after-inner"
        >
          <div>
            <span className="momento-eyebrow">{t("beforeAfterEyebrow")}</span>
            <h2 className="momento-content-h2">{t("beforeAfterTitle")}</h2>
            <p className="momento-content-p">{t("beforeAfterDesc")}</p>
            <div className="bouquet-pricing-note">
              <a href={precosHref} className="bouquet-pricing-note-link">
                {t("pricingNote")}
              </a>
            </div>
          </div>
          <Image
            src="/antesedepois.png"
            alt={t("beforeAfterAlt")}
            width={1200}
            height={700}
            className="bouquet-before-after-img"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </motion.div>
      </section>

      {/* ── Processo ────────────────────────────────────────── */}
      <section className="bouquet-process">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bouquet-process-header"
        >
          <span className="momento-eyebrow">{t("processEyebrow")}</span>
          <h2 className="bouquet-process-title">
            {processStart}{processEm && <em>{processEm}</em>}
          </h2>
        </motion.div>
        <div className="bouquet-process-steps">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.65 }}
              className="bouquet-process-step"
            >
              <div className="bouquet-process-num" aria-hidden="true">{step.num}</div>
              <h3 className="bouquet-process-step-title">{step.title}</h3>
              <p className="bouquet-process-step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Garantias de qualidade ──────────────────────────── */}
      <section className="momento-features">
        <div className="momento-features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className="momento-feature-item"
            >
              <CheckIcon />
              <div>
                <h3 className="momento-feature-title">{f.titulo}</h3>
                <p className="momento-feature-desc">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="bouquet-features-pricing-note">
          <a href={precosHref}>{t("featuresPricingNote")}</a>
        </div>
      </section>

      {/* ── Avaliações Google (Elfsight) ────────────────────── */}
      <section className="bouquet-reviews">
        <div className="bouquet-reviews-layout">
          <div className="bouquet-reviews-inner">
            <span className="momento-eyebrow">{t("reviewsEyebrow")}</span>
            <h2 className="bouquet-reviews-title">{t("reviewsTitle")}</h2>
          </div>
          <div className="bouquet-reviews-widget">
            <ElfsightReviews appId="50e03463-0acc-415f-956d-af31053a03b6" />
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <BouquetNoivaFAQ />

      {/* ── CTA Opções e Preços ─────────────────────────────── */}
      <section className="bouquet-pricing-cta">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="bouquet-pricing-cta-inner"
        >
          <span className="momento-eyebrow">{t("pricingEyebrow")}</span>
          <h2 className="bouquet-pricing-cta-title">{t("pricingCtaTitle")}</h2>
          <p className="momento-content-p">{t("pricingCtaDesc")}</p>
          <a href={precosHref} className="btn-primary">{t("pricingCtaBtn")}</a>
        </motion.div>
      </section>

      {/* ── CTA final ───────────────────────────────────────── */}
      <section className="momento-final-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="momento-final-cta-inner"
        >
          <h2 className="momento-final-cta-h2">
            {ctaFinalStart}{ctaFinalEm && <em>{ctaFinalEm}</em>}
          </h2>
          <p className="momento-final-cta-p">{t("ctaDesc")}</p>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={waUrl(locale, "noiva")} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
          <div className="momento-links">
            {[
              { href: comoHref,   label: t("ctaComoFunciona") },
              { href: precosHref, label: t("ctaPrecos") },
              { href: faqHref,    label: t("ctaFAQ") },
            ].map((l) => (
              <a key={l.href} href={l.href} className="momento-link">{l.label}</a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
