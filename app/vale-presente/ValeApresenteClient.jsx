"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ValeApresenteForm from "./ValeApresenteForm";
import "./ValeApresenteClient.css";

export default function ValeApresenteClient() {
  const t = useTranslations("vale");
  const locale = useLocale();
  const STEPS = t.raw("passos");
  const ofereceHref = locale === "en" ? "/en/gift-preservation" : "/oferecer-preservacao";
  return (
    // <div> em vez de <main>: o layout já embrulha as páginas num <main>.
    <div className="vp-page">

      {/* ── HERO ── */}
      <div className="vp-hero">
        <div className="vp-hero-bg" aria-hidden="true">
          <Image
            src="/vale1.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>
        <div className="vp-hero-overlay" aria-hidden="true" />
        <motion.div
          className="vp-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="vp-eyebrow">{t("eyebrow")}</span>
          <h1 className="vp-title">
            {t("h1")}
          </h1>
          <p className="vp-sub">
            {t("heroDesc")}
          </p>
          <Link href={ofereceHref} className="vp-info-link">
            {t("saberMais")} <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ── PASSOS ── */}
      <motion.div
        className="vp-steps-bar"
        aria-label={t("comoFuncionaLabel")}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <ol className="vp-steps">
          {STEPS.map((s, i) => (
            <li key={i} className="vp-step">
              <span className="vp-step-n" aria-hidden="true">{s.n}</span>
              <p className="vp-step-title">{s.titulo}</p>
              <p className="vp-step-text">{s.texto}</p>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* ── FORMULÁRIO ── */}
      <section className="vp-form-wrap" aria-label={t("formTitle")}>
        <div className="vp-form-lead">
          <h2 className="vp-form-lead-title">{t("formTitle")}</h2>
          <p className="vp-form-lead-sub">{t("formSub")}</p>
        </div>
        <ValeApresenteForm />
      </section>

    </div>
  );
}
