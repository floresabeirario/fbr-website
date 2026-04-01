"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL, WA_URL } from "../_lib/constants";

const anim = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

function CheckIcon() {
  return (
    <svg className="momento-feature-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="rgba(196,132,107,0.1)" />
      <path d="M6 10l3 3 5-5" stroke="var(--terra)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AniversarioClient() {
  const t = useTranslations("aniversario");
  const locale = useLocale();
  const features = t.raw("features");

  const bookHref = locale === "en" ? "/en/book-preservation" : FORM_URL;
  const comoHref = locale === "en" ? "/en/how-it-works" : "/como-funciona";
  const precosHref = locale === "en" ? "/en/pricing-options" : "/opcoes-e-precos";
  const faqHref = locale === "en" ? "/en/faq" : "/perguntas-frequentes";

  return (
    <div className="momento-page">
      <section className="momento-hero">
        <motion.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">{t("eyebrow")}</span>
          <h1 className="momento-h1">
            {t("h1").split(t("eyebrow"))[0]}<br />
            <em>{t("eyebrow")}</em>
          </h1>
          <p className="momento-desc">{t("heroDesc")}</p>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
        </motion.div>
      </section>

      <section className="momento-content momento-content--warm">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="momento-content-inner"
        >
          <span className="momento-eyebrow">{t("eyebrow2")}</span>
          <h2 className="momento-content-h2">
            {t("contentTitle").split(t("contentEm"))[0]}<br />
            <em>{t("contentEm")}</em>
          </h2>
          <p className="momento-content-p">{t("p1")}</p>
          <p className="momento-content-p">{t("p2")}</p>
        </motion.div>
      </section>

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

      <section className="momento-final-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="momento-final-cta-inner"
        >
          <h2 className="momento-final-cta-h2">
            {t("ctaFinalTitle").split(t("ctaFinalEm"))[0]}<br />
            <em>{t("ctaFinalEm")}</em>
          </h2>
          <p className="momento-final-cta-p">{t("ctaFinalDesc")}</p>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
          <div className="momento-links">
            {[
              { href: comoHref,  label: t("linkComoFunciona") },
              { href: precosHref,label: t("linkPrecos") },
              { href: faqHref,   label: t("linkFAQ") },
            ].map((l) => (
              <a key={l.href} href={l.href} className="momento-link">{l.label}</a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
