"use client";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL, OPCOES_PRECOS_URL, SOCIAL_CASAMENTOS } from "../_lib/constants";
import { waUrl } from "../_lib/wa";
import { splitTitle } from "../_lib/splitTitle";
import ElfsightReviews from "@/components/ElfsightReviews";
import BouquetNoivaFAQ from "./BouquetNoivaFAQ";
import BeforeAfterSlider from "../BeforeAfterSlider";


// Torna status.floresabeirario.pt clicável quando aparece no texto de um passo
function renderStepDesc(text) {
  const url = "status.floresabeirario.pt";
  if (!text.includes(url)) return text;
  const [before, after] = text.split(url);
  return (
    <>
      {before}
      <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className="bouquet-inline-link">{url}</a>
      {after}
    </>
  );
}

function CheckIcon() {
  return (
    <svg className="momento-feature-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="rgba(196,132,107,0.1)" />
      <path d="M6 10l3 3 5-5" stroke="var(--terra)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="momento-page bouquet-page">

      {/* ── Hero imagem ─────────────────────────────────────── */}
      <section className="bouquet-hero">
        <Image
          src="/quadroflores.webp"
          alt={t("meta.ogImageAlt")}
          fill
          priority
          className="bouquet-hero-img"
          sizes="100vw"
        />
        <div className="bouquet-hero-overlay" aria-hidden="true" />
        <m.div className="bouquet-hero-content hero-enter">
          <span className="bouquet-hero-eyebrow">{t("eyebrow")}</span>
          <h1 className="bouquet-hero-h1">{t("h1")}</h1>
          <p className="bouquet-hero-desc">{t("heroDesc")}</p>
          <div className="bouquet-hero-chips">
            {t.raw("heroDelivery").map((chip, i) => (
              <span key={i} className="bouquet-hero-chip">{chip}</span>
            ))}
          </div>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={waUrl(locale, "noiva")} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
          <p className="bouquet-hero-price">{t("heroPrice")}</p>
        </m.div>
      </section>

      {/* ── Barra de prova social ───────────────────────────── */}
      <div className="bouquet-proof-bar">
        <span className="bouquet-proof-stars" aria-hidden="true">{t("socialProofRating")}</span>
        <span className="bouquet-proof-text">{t("socialProofCount")}</span>
      </div>

      {/* Quem chega a comparar métodos encontra aqui a resposta */}
      <p style={{ textAlign: "center", margin: "14px 20px 0", fontSize: "0.88rem", color: "var(--mid, #5C6152)" }}>
        {t.rich("resinaCompara", {
          l: (chunks) => (
            <Link href={locale === "en" ? "/en/blog/resin-vs-botanical-pressing" : "/blog/resina-vs-prensagem-botanica"}>
              {chunks}
            </Link>
          ),
        })}
      </p>

      {/* ── Antes e depois ─────────────────────────────────── */}
      <section className="bouquet-before-after">
        <m.div
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
          <BeforeAfterSlider
            beforeLabel={t("sliderAntes")}
            afterLabel={t("sliderDepois")}
            dragLabel={t("sliderArraste")}
          />
        </m.div>
      </section>

      {/* ── Já casou? (pós-evento) ──────────────────────────── */}
      <section className="bouquet-postevent">
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bouquet-postevent-inner"
        >
          <h2 className="bouquet-postevent-title">
            {t("postEventTitle")} <em>{t("postEventTitleEm")}</em>
          </h2>
          <p className="bouquet-postevent-desc">{t("postEventDesc")}</p>
          <div className="momento-ctas">
            <a href={waUrl(locale, "urgente")} target="_blank" rel="noopener noreferrer" className="btn-primary">{t("postEventCta")}</a>
          </div>
          <a href={bookHref} className="bouquet-postevent-link">{t("postEventReservar")}</a>
        </m.div>
      </section>

      {/* ── Processo ────────────────────────────────────────── */}
      <section className="bouquet-process">
        <m.div
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
        </m.div>
        <ol className="bouquet-timeline">
          {processSteps.map((step, i) => (
            <m.li
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.65 }}
              className="bouquet-timeline-item"
            >
              <div className="bouquet-timeline-marker" aria-hidden="true">
                <span className="bouquet-timeline-num">{step.num}</span>
              </div>
              <h3 className="bouquet-timeline-title">{step.title}</h3>
              <p className="bouquet-timeline-desc">{renderStepDesc(step.desc)}</p>
            </m.li>
          ))}
        </ol>
      </section>

      {/* ── CTA a meio (reservar) ───────────────────────────── */}
      <section className="bouquet-mid-cta">
        <p className="bouquet-mid-cta-text">{t("midCtaText")}</p>
        <div className="momento-ctas">
          <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
          <a href={waUrl(locale, "noiva")} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
        </div>
      </section>

      {/* ── Garantias de qualidade ──────────────────────────── */}
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
            <p style={{ marginTop: "18px", fontSize: "0.85rem", textAlign: "center", opacity: 0.85 }}>
              {t.rich("reviewsCasamentos", {
                l: (chunks) => <a href={`${SOCIAL_CASAMENTOS}/opinioes`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{chunks}</a>,
              })}
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <BouquetNoivaFAQ />

      {/* ── CTA Opções e Preços ─────────────────────────────── */}
      <section className="bouquet-pricing-cta">
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="bouquet-pricing-cta-inner"
        >
          <span className="momento-eyebrow">{t("pricingEyebrow")}</span>
          <h2 className="bouquet-pricing-cta-title">{t("pricingCtaTitle")}</h2>
          <p className="momento-content-p">{t("pricingCtaDesc")}</p>
          <a href={bookHref} className="btn-primary">{t("pricingCtaBtn")}</a>
          <div>
            <a href={precosHref} className="bouquet-pricing-cta-link">{t("pricingCtaLink")}</a>
          </div>
        </m.div>
      </section>

      {/* ── CTA final ───────────────────────────────────────── */}
      <section className="momento-final-cta">
        <m.div
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
        </m.div>
      </section>

      {/* ── Barra fixa mobile ───────────────────────────────── */}
      <div className="bouquet-sticky-cta">
        <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
        <a href={waUrl(locale, "noiva")} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
      </div>
    </div>
  );
}
