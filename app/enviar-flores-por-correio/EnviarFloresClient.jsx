"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { SITE_URL } from "../_lib/constants";
import { waUrl } from "../_lib/wa";
import { splitTitle } from "../_lib/splitTitle";
import imgMateriais from "@/public/Envio/1.webp";
import img2 from "@/public/Envio/2.webp";
import img3 from "@/public/Envio/3.webp";
import img4 from "@/public/Envio/4.webp";
import img5 from "@/public/Envio/5.webp";
import img6 from "@/public/Envio/6.webp";
import "./EnviarFloresClient.css";

const STEP_IMAGES = [img2, img3, img4, img5, img6];

const CheckIcon = () => (
  <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "1px" }}>
    <circle cx="10" cy="10" r="10" fill="rgba(184,149,74,0.12)" />
    <path d="M6 10l3 3 5-5" stroke="#9A7B2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "1px" }}>
    <circle cx="10" cy="10" r="10" fill="rgba(184,149,74,0.18)" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
);

const HowToSchema = ({ name, description, materiais, passos, baseUrl }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        supply: materiais.map((m) => ({ "@type": "HowToSupply", name: m })),
        step: passos.map((p, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: p.titulo,
          text: p.corpo,
          url: `${baseUrl}#passo-${i + 1}`,
        })),
      }),
    }}
  />
);

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-6%" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function EnviarFloresClient() {
  const t = useTranslations("enviarCorreio");
  const locale = useLocale();
  const passos = t.raw("passos");
  const materiais = t.raw("materiais");
  const naoItens = t.raw("naoItens");

  const baseUrl = locale === "en" ? `${SITE_URL}/en/how-to-ship-your-flowers` : `${SITE_URL}/enviar-flores-por-correio`;
  const comoFuncionaHref = locale === "en" ? "/en/how-it-works" : "/como-funciona";
  const [h1Start, h1Em] = splitTitle(t("h1"), t("h1Em"));

  return (
    <>
      <HowToSchema name={t("meta.ogTitle")} description={t("meta.description")} materiais={materiais} passos={passos} baseUrl={baseUrl} />

      {/* <div> em vez de <main>: o layout já embrulha as páginas num <main>. */}
      <div className="ship-page" style={{ backgroundColor: "#2E3621", overflowX: "clip" }}>

        {/* ── HEADER BAND ──────────────────────────────────────────── */}
        <header style={{ padding: "clamp(104px,16vw,150px) clamp(20px,5vw,48px) clamp(36px,6vw,56px)", textAlign: "center", background: "linear-gradient(180deg, #3A4528 0%, #2E3621 100%)" }}>
          <m.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: "640px", margin: "0 auto" }}>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5.5vw,3.6rem)", lineHeight: 1.08, color: "var(--cream)", margin: "0 0 clamp(14px,2vw,20px)" }}>
              {h1Start}{h1Em && <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{h1Em}</em>}
            </h1>
            <p style={{ fontSize: "clamp(0.93rem,1.8vw,1.06rem)", lineHeight: 1.8, maxWidth: "520px", color: "rgba(250,247,240,0.82)", margin: "0 auto clamp(12px,2vw,16px)" }}>
              {t("heroDesc")}
            </p>
            <p style={{ fontSize: "clamp(0.86rem,1.6vw,0.96rem)", lineHeight: 1.8, maxWidth: "540px", color: "rgba(250,247,240,0.62)", margin: "0 auto" }}>
              {t("introDesc")}
            </p>
          </m.div>
        </header>

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(36px,6vw,60px) clamp(20px,5vw,40px) 0" }}>

          {/* ── MATERIALS CHECKLIST ─────────────────────────────────── */}
          <m.section {...fadeUp} aria-label={t("materiaisTitle")} style={{ maxWidth: "720px", margin: "0 auto clamp(48px,8vw,72px)", backgroundColor: "var(--cream)", borderRadius: "18px", padding: "clamp(20px,4vw,32px)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}>
            <div className="ship-materials">
              <div className="ship-materials-img">
                <Image src={imgMateriais} alt={t("materiaisAlt")} sizes="(max-width: 600px) 260px, 230px" />
              </div>
              <div>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.3rem,3vw,1.7rem)", color: "#2E3621", margin: "0 0 clamp(14px,2vw,18px)", lineHeight: 1.1 }}>{t("materiaisTitle")}</h2>
                <ul className="ship-materials-list">
                  {materiais.map((m, i) => (
                    <li key={i} className="ship-materials-item"><CheckIcon />{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </m.section>

          {/* ── STEP CARDS ──────────────────────────────────────────── */}
          <section aria-label={t("passosTitle")} style={{ marginBottom: "clamp(48px,8vw,72px)" }}>
            <m.h2 {...fadeUp} style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem,3.6vw,2.3rem)", color: "var(--cream)", textAlign: "center", margin: "0 0 clamp(32px,6vw,52px)", lineHeight: 1.15 }}>
              {t("passosTitle")}
            </m.h2>
            <div className="ship-cards">
              {passos.map((step, i) => (
                <m.article key={i} {...fadeUp} id={`passo-${i + 1}`} className="ship-card" aria-labelledby={`passo-${i + 1}-title`}>
                  <div className="ship-card-img">
                    <span className="ship-card-num" aria-hidden="true">{step.n}</span>
                    <Image fill src={STEP_IMAGES[i]} alt={step.alt} sizes="(max-width: 680px) 100vw, 480px" />
                  </div>
                  <div className="ship-card-body">
                    <h3 id={`passo-${i + 1}-title`} style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.2rem,2.6vw,1.5rem)", color: "#2E3621", margin: "0 0 10px", lineHeight: 1.2 }}>
                      {step.titulo}
                    </h3>
                    <p style={{ color: "var(--mid)", lineHeight: 1.75, fontSize: "clamp(0.88rem,1.7vw,0.96rem)", margin: 0 }}>{step.corpo}</p>
                    {step.nota && (
                      <p style={{ color: "#9A7B2E", fontSize: "clamp(0.8rem,1.5vw,0.86rem)", lineHeight: 1.6, fontStyle: "italic", margin: "12px 0 0" }}>{step.nota}</p>
                    )}
                  </div>
                </m.article>
              ))}
            </div>
          </section>

          {/* ── WHAT TO AVOID ───────────────────────────────────────── */}
          <m.section {...fadeUp} aria-label={t("naoTitle")} style={{ maxWidth: "720px", margin: "0 auto clamp(56px,9vw,84px)", backgroundColor: "rgba(184,149,74,0.08)", borderRadius: "16px", padding: "clamp(20px,4vw,30px)", border: "1px solid rgba(184,149,74,0.22)" }}>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.3rem,3vw,1.7rem)", color: "var(--cream)", margin: "0 0 clamp(16px,3vw,22px)", lineHeight: 1.1 }}>{t("naoTitle")}</h2>
            <ul className="ship-avoid-list">
              {naoItens.map((item, i) => (
                <li key={i} className="ship-avoid-item"><CrossIcon />{item}</li>
              ))}
            </ul>
          </m.section>
        </div>

        {/* ── MORADA + CTA ──────────────────────────────────────────── */}
        <section aria-label={t("ctaTitle")} style={{ padding: "clamp(52px,9vw,80px) clamp(20px,5vw,48px)", background: "linear-gradient(140deg, #3A4528 0%, #2E3621 55%, #262E1B 100%)", textAlign: "center" }}>
          <m.div {...fadeUp} style={{ maxWidth: "560px", margin: "0 auto" }}>
            <div style={{ maxWidth: "500px", margin: "0 auto clamp(34px,6vw,48px)", padding: "clamp(20px,3.5vw,28px) clamp(22px,4vw,32px)", backgroundColor: "rgba(184,149,74,0.1)", border: "1px solid rgba(184,149,74,0.3)", borderRadius: "16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "block", margin: "0 auto 10px" }}>
                <path d="M12 21.5s7-5.8 7-11.5a7 7 0 10-14 0c0 5.7 7 11.5 7 11.5z" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" stroke="var(--gold)" strokeWidth="1.5" />
              </svg>
              <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.1rem,2.4vw,1.35rem)", color: "var(--gold)", margin: "0 0 8px", lineHeight: 1.2 }}>{t("moradaTitle")}</p>
              <p style={{ fontSize: "clamp(0.88rem,1.7vw,0.96rem)", color: "rgba(250,247,240,0.88)", lineHeight: 1.7, margin: 0 }}>{t("moradaDesc")}</p>
            </div>
            <div aria-hidden="true" style={{ width: "40px", height: "1px", margin: "0 auto 24px", background: "linear-gradient(to right, transparent, #B8954A, transparent)" }} />
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4.2vw,2.5rem)", color: "var(--cream)", margin: "0 0 14px", lineHeight: 1.12 }}>{t("ctaTitle")}</h2>
            <p style={{ color: "rgba(250,247,240,0.75)", lineHeight: 1.8, fontSize: "clamp(0.9rem,1.9vw,1rem)", margin: "0 0 28px" }}>{t("ctaDesc")}</p>
            <div className="cta-row" style={{ marginBottom: "22px" }}>
              <a href={waUrl(locale)} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon />{t("ctaWA")}</a>
            </div>
            <a href={comoFuncionaHref} className="text-link">{t("ctaComoFunciona")}</a>
          </m.div>
        </section>

      </div>
    </>
  );
}
