"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ReservarPreservacaoForm from "./ReservarPreservacaoForm";
import { SOCIAL_GOOGLE_BUSINESS, SOCIAL_CASAMENTOS } from "@/app/_lib/constants";
import { waUrl } from "@/app/_lib/wa";
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
        <m.div className="rp-hero-content hero-enter">
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
      <m.div className="rp-steps-bar hero-enter hero-enter-3" aria-label={t("comoFuncionaLabel")}>
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
          <p className="rp-form-lead-sub" style={{ marginTop: "10px", fontSize: "0.9em", opacity: 0.92 }}>{t("formSemCompromisso")}</p>
          <p style={{ marginTop: "14px", fontSize: "0.82rem", letterSpacing: "0.3px", color: "var(--gold)" }}>
            {t.rich("provaSocial", {
              g: (chunks) => <a href={SOCIAL_GOOGLE_BUSINESS} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{chunks}</a>,
              c: (chunks) => <a href={`${SOCIAL_CASAMENTOS}/opinioes`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{chunks}</a>,
            })}
          </p>
        </div>
        <ReservarPreservacaoForm />
        <p style={{ textAlign: "center", marginTop: "28px", fontSize: "0.92rem" }}>
          {t("duvidaPre")}{" "}
          <a href={waUrl(locale, "duvida")} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
            {t("duvidaCTA")}
          </a>
        </p>
      </section>

    </main>
  );
}
