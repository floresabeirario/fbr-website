"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ValeApresenteForm from "./ValeApresenteForm";
import { SOCIAL_GOOGLE_BUSINESS, SOCIAL_CASAMENTOS } from "@/app/_lib/constants";
import { waUrl } from "@/app/_lib/wa";
import "./ValeApresenteClient.css";
import { usePrecos } from "../_components/PrecosProvider";

export default function ValeApresenteClient() {
  const precos = usePrecos();
  const t = useTranslations("vale");
  const locale = useLocale();
  const STEPS = t.raw("passos");
  const ofereceHref = locale === "en" ? "/en/gift-preservation" : "/oferecer-preservacao";
  // Vale de demonstração: mostra o cartão digital real com dados fictícios de
  // um casal (o código EXEMPLO é tratado no site voucher.floresabeirario.pt).
  const exemploHref = locale === "en"
    ? "https://voucher.floresabeirario.pt/EXEMPLO?lang=en"
    : "https://voucher.floresabeirario.pt/EXEMPLO";
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
          <div className="vp-hero-links">
            <Link href={ofereceHref} className="vp-info-link">
              {t("saberMais")} <span aria-hidden="true">→</span>
            </Link>
            <a
              href={exemploHref}
              target="_blank"
              rel="noopener noreferrer"
              className="vp-info-link vp-info-link-alt"
            >
              {t("verExemplo")}
            </a>
          </div>
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
          <p className="vp-form-lead-sub">{t("formSub", { quadro30x40: precos.quadro30x40 })}</p>
          <p style={{ marginTop: "14px", fontSize: "0.82rem", letterSpacing: "0.3px", color: "var(--gold)" }}>
            {t.rich("provaSocial", {
              g: (chunks) => <a href={SOCIAL_GOOGLE_BUSINESS} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{chunks}</a>,
              c: (chunks) => <a href={`${SOCIAL_CASAMENTOS}/opinioes`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{chunks}</a>,
            })}
          </p>
        </div>
        <ValeApresenteForm />
        <p style={{ textAlign: "center", marginTop: "28px", fontSize: "0.92rem" }}>
          {t("duvidaPre")}{" "}
          <a href={waUrl(locale, "vale")} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
            {t("duvidaCTA")}
          </a>
        </p>
      </section>

    </div>
  );
}
