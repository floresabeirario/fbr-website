"use client";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL, WA_URL_NOIVA, OPCOES_PRECOS_URL } from "../_lib/constants";
import BouquetNoivaFAQ from "./BouquetNoivaFAQ";

const fadeUp = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } };

const GALLERY = [
  { src: "/fotoquadrocloseup2.webp",        index: 0 },
  { src: "/LaurenJcloseup.webp",            index: 1 },
  { src: "/historia-casamento-recente.jpg", index: 2 },
  { src: "/quadrovidrosobrevidro.webp",     index: 3 },
  { src: "/moldurapreta.webp",              index: 4 },
  { src: "/fotoquadrocloseup3.webp",        index: 5 },
  { src: "/sunset.webp",                    index: 6 },
];

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
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="var(--green)" strokeWidth="1.6" />
      <path d="M3 9h18M8 2v4M16 2v4" stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function BouquetNoivaClient() {
  const t = useTranslations("bouquetNoiva");
  const locale = useLocale();
  const features = t.raw("features");
  const processSteps = t.raw("processSteps");
  const galleryAlts = t.raw("galleryAlts");

  const bookHref   = locale === "en" ? "/en/book-preservation"    : FORM_URL;
  const precosHref = locale === "en" ? "/en/options-and-pricing"  : OPCOES_PRECOS_URL;
  const comoHref   = locale === "en" ? "/en/how-it-works"         : "/como-funciona";
  const faqHref    = locale === "en" ? "/en/faq"                  : "/perguntas-frequentes";

  return (
    <div className="momento-page">

      {/* ── Hero vídeo ─────────────────────────────────────── */}
      <section className="bouquet-hero">
        <video
          className="bouquet-hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/fotoquadrocloseup2.webp"
          aria-hidden="true"
        >
          <source src="/quadrofloresprensadas.webm" type="video/webm" />
        </video>
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
            <a href={WA_URL_NOIVA} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
        </motion.div>
      </section>

      {/* ── Barra de prova social ───────────────────────────── */}
      <div className="bouquet-proof-bar" aria-label={`${t("socialProofRating")} · ${t("socialProofCount")}`}>
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
          </div>
          <div className="bouquet-before-after-img-wrap">
            <Image
              src="/antesedepois.png"
              alt={t("beforeAfterAlt")}
              fill
              className="bouquet-before-after-img"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Galeria ─────────────────────────────────────────── */}
      <section className="bouquet-gallery">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bouquet-gallery-header"
        >
          <span className="momento-eyebrow">{t("galleryEyebrow")}</span>
          <h2 className="bouquet-gallery-title">{t("galleryTitle")}</h2>
        </motion.div>
        <div className="bouquet-gallery-grid">
          {GALLERY.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="bouquet-gallery-item"
            >
              <Image
                src={img.src}
                alt={galleryAlts[img.index] ?? ""}
                fill
                className="bouquet-gallery-img"
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
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
            {t("processTitle").split(t("processEm"))[0]}
            <em>{t("processEm")}</em>
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

      {/* ── Destaque fim de semana ──────────────────────────── */}
      <section className="bouquet-weekend-section">
        <div className="bouquet-weekend-inner">
          <div className="bouquet-weekend-icon"><CalendarIcon /></div>
          <div>
            <h3 className="bouquet-weekend-title">{t("weekendBadge")}</h3>
            <p className="bouquet-weekend-desc">{t("weekendNote")}</p>
          </div>
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
      </section>

      {/* ── Avaliações Google (Elfsight) ────────────────────── */}
      <section className="bouquet-reviews">
        <div className="bouquet-reviews-inner">
          <span className="momento-eyebrow">{t("reviewsEyebrow")}</span>
          <h2 className="bouquet-reviews-title">{t("reviewsTitle")}</h2>
        </div>
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div className="elfsight-app-50e03463-0acc-415f-956d-af31053a03b6" data-elfsight-app-lazy />
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
            {t("ctaFinalTitle").split(t("ctaFinalEm"))[0]}
            <em>{t("ctaFinalEm")}</em>
          </h2>
          <p className="momento-final-cta-p">{t("ctaDesc")}</p>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={WA_URL_NOIVA} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
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
