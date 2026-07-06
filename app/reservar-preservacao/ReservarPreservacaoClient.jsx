"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ReservarPreservacaoForm from "./ReservarPreservacaoForm";
import "./ReservarPreservacaoClient.css";

export default function ReservarPreservacaoClient() {
  const t = useTranslations("reservar");
  const locale = useLocale();
  const STEPS = t.raw("passos");
  const comoFuncionaHref = locale === "en" ? "/en/how-it-works" : "/como-funciona";
  return (
    <main className="rp-page">

      {/* ── HERO ── */}
      <div className="rp-hero">
        <div className="rp-hero-bg" aria-hidden="true">
          <Image
            src="/moldurapreta.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        </div>
        <div className="rp-hero-overlay" aria-hidden="true" />
        <m.div
          className="rp-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="rp-eyebrow">{t("eyebrow")}</span>
          <h1 className="rp-title">
            {t("h1")}
          </h1>
          <p className="rp-sub">
            {t("heroSub")}
          </p>
          <Link href={comoFuncionaHref} className="rp-info-link">
            {t("infoLink")} <span aria-hidden="true">→</span>
          </Link>
        </m.div>
      </div>

      {/* ── PASSOS ── */}
      <m.div
        className="rp-steps-bar"
        aria-label={t("comoFuncionaLabel")}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <ol className="rp-steps">
          {STEPS.map((s, i) => (
            <li key={i} className="rp-step">
              <span className="rp-step-n" aria-hidden="true">{s.n}</span>
              <p className="rp-step-title">{s.titulo}</p>
              <p className="rp-step-text">{s.texto}</p>
            </li>
          ))}
        </ol>
      </m.div>

      {/* ── FORMULÁRIO ── */}
      <section className="rp-form-wrap" aria-label={t("formTitle")}>
        <div className="rp-form-lead">
          <h2 className="rp-form-lead-title">{t("formTitle")}</h2>
          <p className="rp-form-lead-sub">{t("formSub")}</p>
        </div>
        <ReservarPreservacaoForm />
      </section>

    </main>
  );
}
