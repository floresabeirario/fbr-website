"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
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
        <m.div className="vp-hero-content hero-enter">
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
        </m.div>
      </div>

      {/* ── PASSOS ── */}
      <m.div className="vp-steps-bar hero-enter hero-enter-3" aria-label={t("comoFuncionaLabel")}>
        <ol className="vp-steps">
          {STEPS.map((s, i) => (
            <li key={i} className="vp-step">
              <span className="vp-step-n" aria-hidden="true">{s.n}</span>
              <p className="vp-step-title">{s.titulo}</p>
              <p className="vp-step-text">{s.texto}</p>
            </li>
          ))}
        </ol>
      </m.div>

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
