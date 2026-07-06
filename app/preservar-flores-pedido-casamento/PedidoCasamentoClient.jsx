"use client";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL } from "../_lib/constants";
import { waUrl } from "../_lib/wa";
import { splitTitle } from "../_lib/splitTitle";
import MomentoFAQ from "../_components/MomentoFAQ";

const anim = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

function CheckIcon() {
  return (
    <svg className="momento-feature-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="rgba(196,132,107,0.1)" />
      <path d="M6 10l3 3 5-5" stroke="var(--terra)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PedidoCasamentoClient() {
  const t = useTranslations("pedidoCasamento");
  const locale = useLocale();
  const features = t.raw("features");
  const [h1Start, h1Em] = splitTitle(t("h1"), t("eyebrow"));
  const [contentStart, contentEm] = splitTitle(t("contentTitle"), t("contentEm"));
  const [ctaStart, ctaEm] = splitTitle(t("ctaFinalTitle"), t("ctaFinalEm"));

  const bookHref = locale === "en" ? "/en/book-preservation" : FORM_URL;
  const comoHref = locale === "en" ? "/en/how-it-works" : "/como-funciona";
  const precosHref = locale === "en" ? "/en/options-and-pricing" : "/opcoes-e-precos";
  const bouquetHref = locale === "en" ? "/en/preserve-wedding-bouquet" : "/preservar-bouquet-noiva";

  return (
    <div className="momento-page">
      <section className="momento-hero">
        <m.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">{t("eyebrow")}</span>
          <h1 className="momento-h1">
            {h1Start}{h1Em && <><br /><em>{h1Em}</em></>}
          </h1>
          <p className="momento-desc">{t("heroDesc")}</p>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={waUrl(locale)} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
        </m.div>
      </section>

      <section className="momento-content momento-content--warm">
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="momento-content-inner"
        >
          <span className="momento-eyebrow">{t("eyebrow2")}</span>
          <h2 className="momento-content-h2">
            {contentStart}{contentEm && <><br /><em>{contentEm}</em></>}
          </h2>
          <p className="momento-content-p">{t("p1")}</p>
          <p className="momento-content-p">{t("p2")}</p>
        </m.div>
      </section>

      <section className="momento-features">
        <div className="momento-features-grid">
          {features.map((f, i) => (
            <m.div
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
            </m.div>
          ))}
        </div>
      </section>

      <MomentoFAQ namespace="pedidoCasamento" />

      <section className="momento-final-cta">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="momento-final-cta-inner"
        >
          <h2 className="momento-final-cta-h2">
            {ctaStart}{ctaEm && <><br /><em>{ctaEm}</em></>}
          </h2>
          <p className="momento-final-cta-p">{t("ctaDesc")}</p>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={waUrl(locale)} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
          <div className="momento-links">
            {[
              { href: comoHref,   label: t("linkComoFunciona") },
              { href: precosHref, label: t("linkPrecos") },
              { href: bouquetHref, label: t("ctaBouquet") },
            ].map((l) => (
              <a key={l.href} href={l.href} className="momento-link">{l.label}</a>
            ))}
          </div>
        </m.div>
      </section>
    </div>
  );
}
