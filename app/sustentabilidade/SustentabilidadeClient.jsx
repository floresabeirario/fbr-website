"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL } from "../_lib/constants";
import PageHero from "@/components/PageHero";
import "./SustentabilidadeClient.css";

const Schema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Preservacao Botanica Sustentavel - Flores a Beira-Rio",
        "description": "A filosofia de sustentabilidade da Flores a Beira-Rio: prensagem botanica artesanal, materiais de qualidade museu e parceria solidaria com a Associacao de Paralisia Cerebral de Coimbra.",
        "author": { "@type": "Organization", "name": "Flores a Beira-Rio" },
        "publisher": {
          "@type": "Organization",
          "name": "Flores a Beira-Rio",
          "logo": { "@type": "ImageObject", "url": "https://floresabeirario.pt/logo.webp" }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://floresabeirario.pt/sustentabilidade" }
      })
    }}
  />
);

// ─── Static visual config (no text) ──────────────────────────────────────────
const METHOD_VISUALS = [
  {
    id:        "prensagem",
    tagColor:  "var(--green)",
    border:    "rgba(61,107,94,0.22)",
    bg:        "#fff",
    shadow:    "0 8px 32px rgba(61,107,94,0.10)",
    highlight: true,
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4 C9 4 5 8 5 13 C5 20 14 26 14 26 C14 26 23 20 23 13 C23 8 19 4 14 4Z"
          stroke="var(--green)" strokeWidth="1.6" fill="rgba(61,107,94,0.12)" strokeLinejoin="round"/>
        <path d="M14 26 L14 13 M14 13 C10 11 8 8 9 5 M14 13 C18 11 20 8 19 5"
          stroke="var(--green)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:        "resina",
    tagColor:  "var(--terra)",
    border:    "rgba(196,132,107,0.18)",
    bg:        "rgba(196,132,107,0.03)",
    shadow:    "none",
    highlight: false,
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 22 L10 6 L14 10 L18 6 L20 22 Z"
          stroke="var(--terra)" strokeWidth="1.6" fill="rgba(196,132,107,0.1)" strokeLinejoin="round"/>
        <path d="M8 22 L20 22" stroke="var(--terra)" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:        "silica",
    tagColor:  "var(--mid-l)",
    border:    "rgba(155,168,159,0.18)",
    bg:        "rgba(155,168,159,0.03)",
    shadow:    "none",
    highlight: false,
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="var(--mid-l)" strokeWidth="1.6" fill="rgba(155,168,159,0.08)"/>
        <circle cx="14" cy="14" r="2" fill="var(--mid-l)" opacity="0.4"/>
      </svg>
    ),
  },
];

const VALUE_ICONS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--green)" strokeWidth="1.8" fill="rgba(61,107,94,0.1)"/>
        <rect x="7" y="7" width="10" height="10" rx="1" stroke="var(--green-l)" strokeWidth="1.2"/>
        <circle cx="12" cy="12" r="2" fill="var(--green)"/>
      </svg>
    ),
  },
  {
    title: "Arte local em cada detalhe",
    desc: "Apoiamos artistas portugueses locais que criaram os elementos gr\u00e1ficos da nossa marca, incluindo o cart\u00e3o que acompanha as embalagens e o vale presente.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2Z" stroke="var(--green)" strokeWidth="1.6" fill="rgba(61,107,94,0.18)"/>
        <path d="M12 22 L12 9" stroke="var(--green-l)" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M12 9 C9 7.5 7.5 5 8 3 M12 9 C15 7.5 16.5 5 16 3" stroke="var(--green)" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 L14.5 8.5 L20.5 9.3 L16.2 13.5 L17.3 19.5 L12 16.7 L6.7 19.5 L7.8 13.5 L3.5 9.3 L9.5 8.5 Z" stroke="var(--green)" strokeWidth="1.6" fill="rgba(61,107,94,0.22)" strokeLinejoin="round"/>
        <path d="M12 7 L13.5 10.5 L17 11 L14.5 13.4 L15.2 17 L12 15.2 L8.8 17 L9.5 13.4 L7 11 L10.5 10.5 Z" fill="var(--green)" opacity="0.35"/>
      </svg>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12 C4 8 7 5 11 5 L13 5" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 3 L13 5 L11 7" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(61,107,94,0.3)"/>
        <path d="M20 12 C20 16 17 19 13 19 L11 19" stroke="var(--green-l)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 21 L11 19 L13 17" stroke="var(--green-l)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(139,168,136,0.3)"/>
      </svg>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21 V19 C17 17.9 16.1 17 15 17 H9 C7.9 17 7 17.9 7 19 V21" stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="12" cy="10" r="3" stroke="var(--green)" strokeWidth="1.6" fill="rgba(61,107,94,0.15)"/>
        <path d="M21 21 V19 C21 17.9 20.1 17 19 17 H18" stroke="var(--green-l)" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M3 21 V19 C3 17.9 3.9 17 5 17 H6" stroke="var(--green-l)" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="19" cy="10" r="2" stroke="var(--green-l)" strokeWidth="1.4" fill="rgba(139,168,136,0.1)"/>
        <circle cx="5" cy="10" r="2" stroke="var(--green-l)" strokeWidth="1.4" fill="rgba(139,168,136,0.1)"/>
      </svg>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="var(--mid-l)" strokeWidth="1.6" fill="rgba(155,168,159,0.12)"/>
        <path d="M12 8 L12 12 L15 15" stroke="var(--mid-l)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1.5" fill="var(--mid-l)"/>
      </svg>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="var(--green)" strokeWidth="1.8" fill="rgba(61,107,94,0.14)"/>
        <path d="M4 9 L20 9" stroke="var(--green-l)" strokeWidth="1" opacity="0.5"/>
        <path d="M4 15 L20 15" stroke="var(--green-l)" strokeWidth="1" opacity="0.5"/>
        <path d="M9 4 L9 20" stroke="var(--green-l)" strokeWidth="1" opacity="0.5"/>
        <path d="M15 4 L15 20" stroke="var(--green-l)" strokeWidth="1" opacity="0.5"/>
        <path d="M6 6 L10 10" stroke="var(--cream)" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
        <circle cx="7" cy="7" r="1" fill="var(--green-l)" opacity="0.8"/>
      </svg>
    ),
  },
];

const Dot = ({ good, color }) => (
  <div style={{ flexShrink: 0, marginTop: "3px" }}>
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill={`${color}18`}/>
      {good
        ? <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M7 7l6 6M13 7l-6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      }
    </svg>
  </div>
);

export default function Sustentabilidade() {
  const t = useTranslations("sustentabilidade");
  const locale = useLocale();
  const METHODS_TEXT = t.raw("methods");
  const VALUES_TEXT = t.raw("values");
  const APCC_TOPICS = t.raw("apccTopics");
  const CTA_LINKS = t.raw("ctaLinks");
  const FORM = locale === "en" ? "/en/book-preservation" : FORM_URL;

  return (
    <>
      <Schema />
      <div style={{ backgroundColor: "var(--cream)", overflowX: "clip" }}>


        {/* HERO — foto a ecra todo, texto na base */}
        <PageHero
          src="/ines1.webp"
        imgFetchPriority="high"
          gradient="linear-gradient(to top, rgba(10,22,18,0.90) 0%, rgba(10,22,18,0.55) 45%, rgba(10,22,18,0.18) 100%)"
          ariaLabel={t("h1")}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: "640px", textAlign: "center", margin: "0 auto" }}
          >
              <p style={{ fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(250,247,240,0.88)", fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 14px", fontWeight: 700 }}>
                {t("eyebrow")}
              </p>
              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2.4rem,6vw,5rem)",
                color: "var(--cream)", margin: "0 0 clamp(1.2rem,2.5vw,1.8rem)", lineHeight: 1.05,
              }}>
                {t("h1")}
              </h1>
              <p style={{
                fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.85,
                maxWidth: "460px", color: "rgba(250,247,240,0.88)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)",
              }}>
                {t("heroDesc")}
              </p>

            </motion.div>
        </PageHero>

        {/* FILOSOFIA */}
        <section
          aria-label={t("filosofiaEyebrow")}
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(160deg, #EDF2E8 0%, #F5F9F3 40%, #FAF7F0 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: "-80px", right: "-60px",
            width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(61,107,94,0.07) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <span className="eyebrow eyebrow-green">{t("filosofiaEyebrow")}</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.9rem,4.5vw,3.2rem)",
                color: "var(--green-d)", margin: "0 0 clamp(18px,3vw,28px)", lineHeight: 1.1,
              }}>
                {t("filosofiaH2")}<br/>
                <em style={{ fontStyle: "italic", color: "var(--green)" }}>{t("filosofiaEm")}</em>
              </h2>
              <div style={{ color: "var(--mid)", fontSize: "clamp(0.95rem,1.8vw,1.05rem)", lineHeight: 1.88 }}>
                <p style={{ margin: "0 0 16px" }}>{t("filosofiaP1")}</p>
                <p style={{ margin: 0 }}>{t("filosofiaP2")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* APCC */}
        <section
          aria-label={t("apccH2")}
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(150deg, #1E2D2A 0%, #243D33 40%, #2A4A3C 70%, #1E2D2A 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #3D6B5E 0px, #3D6B5E 1px, transparent 1px, transparent 50px)",
          }}/>
          <div aria-hidden="true" style={{
            position: "absolute", bottom: "-100px", right: "-80px",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(61,107,94,0.12) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <div style={{ maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="apcc-inner">
              <motion.div
                className="apcc-photo"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href="https://apc-coimbra.org.pt/capacitacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Saber mais sobre a APCC, Associação de Paralisia Cerebral de Coimbra"
                  style={{ display: "block", position: "relative", maxWidth: "340px", width: "100%", textDecoration: "none" }}
                  className="apcc-photo-link"
                >
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0,
                    transform: "translate(10px, 10px) rotate(1.5deg)",
                    borderRadius: "18px", background: "rgba(61,107,94,0.15)",
                    border: "1px solid rgba(61,107,94,0.25)",
                  }}/>
                  <div style={{
                    position: "relative", transform: "rotate(-1.5deg)", borderRadius: "18px",
                    overflow: "hidden", border: "1px solid rgba(61,107,94,0.3)",
                    aspectRatio: "3/4", boxShadow: "0 24px 52px rgba(0,0,0,0.4)",
                  }}>
                    <Image fill
                      src="/oficinaapcc.webp"
                      alt="Utentes da Oficina de Tecelagem de Almalaques e Costura da Associacao de Paralisia Cerebral de Coimbra a produzir as embalagens artesanais para a Flores a Beira-Rio"
                      sizes="(max-width: 768px) 100vw, 340px"
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
                      background: "linear-gradient(to top, rgba(26,46,38,0.96) 0%, transparent 100%)",
                    }} aria-hidden="true"/>
                    <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "var(--cream)",
                          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                        }}>
                          <Image src="/apcc.webp" alt="Logotipo Associacao de Paralisia Cerebral de Coimbra" width={24} height={24} style={{ objectFit: "contain" }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: "var(--cream)", fontSize: "clamp(0.78rem,2.5vw,0.88rem)", fontFamily: "Roboto, sans-serif", lineHeight: 1.3 }}>
                            Associa&#231;&#227;o de Paralisia Cerebral de Coimbra
                          </p>
                          <p style={{ margin: "2px 0 0", color: "var(--green-l)", fontSize: "clamp(0.7rem,2vw,0.78rem)", fontFamily: "Roboto, sans-serif" }}>Marca M&#227;o Doida</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>

              <motion.div
                className="apcc-copy"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(61,107,94,0.2)", border: "1px solid rgba(139,168,136,0.3)",
                  borderRadius: "100px", padding: "7px 16px", marginBottom: "20px",
                }}>
                  <span style={{ color: "var(--green-l)", fontSize: "0.9rem" }} aria-hidden="true">&#9829;</span>
                  <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--green-l)", fontFamily: "Roboto, sans-serif" }}>{t("apccLabel")}</span>
                </div>
                <h2 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "clamp(2rem,4.5vw,3rem)",
                  color: "var(--cream)", margin: "0 0 16px", lineHeight: 1.1,
                }}>
                  {t("apccH2")}<br/>
                  <em style={{ fontStyle: "italic", color: "var(--green-l)" }}>{t("apccEm")}</em>
                </h2>
                <p style={{ color: "rgba(250,247,240,0.7)", lineHeight: 1.85, fontSize: "clamp(0.9rem,1.8vw,0.98rem)", margin: 0 }}>
                  {t("apccDesc")}
                </p>
              </motion.div>

              <motion.div
                className="apcc-topics"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {[
                  { ...APCC_TOPICS[0], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21 C12 21 4 14 4 9 C4 6.2 6.2 4 9 4 C10.5 4 11.8 4.7 12 5 C12.2 4.7 13.5 4 15 4 C17.8 4 20 6.2 20 9 C20 14 12 21 12 21Z" stroke="var(--green-l)" strokeWidth="1.5" fill="rgba(139,168,136,0.1)" strokeLinejoin="round"/></svg> },
                  { ...APCC_TOPICS[1], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12 C4 8 7 5 11 5 L13 5" stroke="var(--green-l)" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 3 L13 5 L11 7" stroke="var(--green-l)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 12 C20 16 17 19 13 19 L11 19" stroke="var(--green-l)" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 21 L11 19 L13 17" stroke="var(--green-l)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "14px", alignItems: "flex-start", padding: "14px 0",
                    borderBottom: i === 0 ? "1px solid rgba(61,107,94,0.2)" : "none",
                  }}>
                    <div style={{
                      width: "30px", height: "30px", borderRadius: "8px",
                      backgroundColor: "rgba(61,107,94,0.2)", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px",
                    }}>{item.icon}</div>
                    <div>
                      <p style={{ margin: "0 0 3px", fontWeight: 700, color: "var(--cream)", fontSize: "0.86rem", fontFamily: "Roboto, sans-serif" }}>{item.title}</p>
                      <p style={{ margin: 0, color: "rgba(250,247,240,0.55)", fontSize: "0.82rem", lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMPARACAO */}
        <section
          aria-label={t("comparacaoEyebrow")}
          style={{
            padding: "clamp(48px,7vw,76px) clamp(20px,5vw,48px)",
            background: "linear-gradient(180deg, #FAF7F0 0%, #F2F6EF 50%, #FAF7F0 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px", height: "700px",
            background: "radial-gradient(circle, rgba(61,107,94,0.04) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,44px)" }}
            >
              <span className="eyebrow">{t("comparacaoEyebrow")}</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                color: "var(--green-d)", margin: "0 0 10px", lineHeight: 1.1,
              }}>
                {t("comparacaoH2")}<br/>
                <em style={{ fontStyle: "italic", color: "var(--green)" }}>{t("comparacaoEm")}</em>
              </h2>
              <p style={{ color: "var(--mid)", fontSize: "clamp(0.88rem,1.7vw,0.96rem)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto" }}>
                {t("comparacaoDesc")}
              </p>
            </motion.div>
            <div className="compare-grid">
              {METHOD_VISUALS.map((mv, i) => {
                const mt = METHODS_TEXT[i];
                return (
                  <motion.div
                    key={mv.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09, duration: 0.65 }}
                    className="card-hover"
                    style={{
                      backgroundColor: mv.bg, borderRadius: "18px",
                      padding: "clamp(20px,2.8vw,28px)",
                      border: `1.5px solid ${mv.border}`,
                      boxShadow: mv.shadow, position: "relative", overflow: "hidden",
                    }}
                  >
                    {mv.highlight && (
                      <div aria-hidden="true" style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                        background: "linear-gradient(to right, transparent, #3D6B5E, transparent)",
                      }}/>
                    )}
                    <span style={{
                      display: "inline-block", fontSize: "0.55rem", fontWeight: 700,
                      letterSpacing: "2px", textTransform: "uppercase", color: mv.tagColor,
                      fontFamily: "Roboto, sans-serif", backgroundColor: `${mv.tagColor}12`,
                      padding: "3px 11px", borderRadius: "50px", marginBottom: "12px",
                    }}>{mt.tag}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "4px" }}>
                      {mv.icon}
                      <h3 style={{
                        fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.15rem",
                        color: "var(--green-d)", margin: 0, lineHeight: 1.2,
                      }}>{mt.title}</h3>
                    </div>
                    <p style={{
                      color: "var(--mid-l)", fontSize: "0.74rem", margin: "0 0 16px",
                      fontStyle: "italic", fontFamily: "Roboto, sans-serif",
                    }}>{mt.subtitle}</p>
                    <div style={{ marginBottom: "16px" }}>
                      {mt.points.map((text, j) => (
                        <div key={j} style={{
                          display: "flex", gap: "10px", alignItems: "flex-start", padding: "7px 0",
                          borderBottom: j < mt.points.length - 1 ? "1px solid rgba(0,0,0,0.045)" : "none",
                        }}>
                          <Dot good={mt.pointsGood[j]} color={mv.tagColor} />
                          <p style={{ margin: 0, fontSize: "clamp(0.8rem,1.4vw,0.86rem)", color: "var(--mid)", lineHeight: 1.6 }}>{text}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      padding: "11px 14px", borderRadius: "10px",
                      backgroundColor: `${mv.tagColor}0D`, border: `1px solid ${mv.tagColor}1A`,
                    }}>
                      <p style={{
                        color: mv.tagColor, fontSize: "0.8rem", fontWeight: 600,
                        lineHeight: 1.5, margin: 0, fontFamily: "Roboto, sans-serif", fontStyle: "italic",
                      }}>{mt.verdict}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section
          aria-label={t("valoresEyebrow")}
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(170deg, #1E2D2A 0%, #243D33 50%, #1E2D2A 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "800px", height: "800px",
            background: "radial-gradient(circle, rgba(61,107,94,0.10) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #3D6B5E 0px, #3D6B5E 1px, transparent 1px, transparent 50px)",
          }}/>
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,60px)" }}
            >
              <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#5C8A6A", marginBottom: "12px", fontFamily: "Roboto, sans-serif" }}>{t("valoresEyebrow")}</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                color: "var(--cream)", margin: 0, lineHeight: 1.1,
              }}>
                {t("valoresH2")}<br/>
                <em style={{ fontStyle: "italic", color: "#5C8A6A" }}>{t("valoresEm")}</em>
              </h2>
            </motion.div>

            <div className="values-grid-wrap">
              {VALUE_ICONS.map((v, i) => {
                const vt = VALUES_TEXT[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.55 }}
                    className="value-card"
                    style={{
                      padding: "clamp(22px,3vw,32px)",
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    <div aria-hidden="true" style={{
                      position: "absolute", top: 0, right: 0, width: "60px", height: "60px",
                      background: "radial-gradient(circle at top right, rgba(61,107,94,0.12) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}/>
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "10px",
                      background: "rgba(61,107,94,0.2)",
                      border: "1px solid rgba(61,107,94,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "14px", flexShrink: 0,
                    }}>
                      {v.icon}
                    </div>
                    <h3 style={{
                      fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(0.92rem,1.6vw,1.05rem)",
                      color: "var(--cream)", margin: "0 0 8px", lineHeight: 1.25,
                    }}>{vt.title}</h3>
                    <p style={{ color: "rgba(250,247,240,0.55)", fontSize: "0.83rem", lineHeight: 1.72, margin: 0 }}>{vt.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-label={t("ctaEyebrow")}
          style={{
            padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)",
            background: "linear-gradient(150deg, #1E2D2A 0%, #243D33 50%, #2A4A3C 100%)",
            textAlign: "center",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #3D6B5E 0px, #3D6B5E 1px, transparent 1px, transparent 44px)",
          }}/>
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(61,107,94,0.15) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            style={{ maxWidth: "560px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <div aria-hidden="true" style={{
              width: "44px", height: "1px", margin: "0 auto 28px",
              background: "linear-gradient(to right, transparent, #8BA888, transparent)",
            }}/>
            <span className="eyebrow" style={{ color: "var(--green-l)" }}>{t("ctaEyebrow")}</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2rem,5.5vw,3.5rem)",
              color: "var(--cream)", margin: "0 0 16px", lineHeight: 1.1,
            }}>
              {t("ctaH2")}<br/>
              <em style={{ fontStyle: "italic", color: "#5C8A6A" }}>{t("ctaEm")}</em>
            </h2>
            <p style={{ color: "rgba(250,247,240,0.65)", lineHeight: 1.88, fontSize: "clamp(0.9rem,2vw,1rem)", margin: "0 0 34px" }}>
              {t("ctaDesc")}
            </p>
            <div className="cta-row" style={{ marginBottom: "28px" }}>
              <a href={FORM} className="btn-primary">{t("ctaReservar")}</a>
              <a href={locale === "en" ? "/en/how-it-works" : "/como-funciona"} className="btn-outline">{t("ctaComoFunciona")}</a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.82rem" }}>
              {CTA_LINKS.map((l, i) => (
                <a key={i} href={l.href} style={{
                  color: "rgba(139,168,136,0.8)", fontWeight: 600, textDecoration: "none",
                  borderBottom: "1px solid rgba(139,168,136,0.25)", paddingBottom: "1px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                className="hover-green-link"
                >{l.label}</a>
              ))}
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
}
