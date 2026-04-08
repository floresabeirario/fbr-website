"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePathname as useIntlPathname, useRouter } from "@/navigation";
import { IconInstagram, IconFacebook, IconWhatsApp, IconEmail, FlagPT, FlagEN } from "./Icons";
import { FORM_URL, WA_URL, EMAIL, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK } from "@/app/_lib/constants";
import { TRACKING_URL } from "@/app/_lib/constants";

const FONT = "var(--font-google-sans), 'Google Sans', sans-serif";

const FooterAccordion = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const id = `footer-acc-${label.toLowerCase().replace(/\s/g, "-")}`;
  return (
    <div style={{ borderBottom: "1px solid rgba(250,247,240,0.07)" }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={id}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "14px 0",
          background: "none", border: "none", cursor: "pointer",
        }}
      >
        <span style={{
          fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase",
          color: "rgba(250,247,240,0.75)", fontFamily: FONT, fontWeight: 500,
        }}>
          {label}
        </span>
        <motion.svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <path d="M2 4.5L6 8.5L10 4.5" stroke="rgba(250,247,240,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "14px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const linkStyle = {
  color: "rgba(250,247,240,0.5)", textDecoration: "none",
  fontSize: "0.84rem", fontWeight: "300", lineHeight: 1,
  transition: "color 0.25s ease", fontFamily: FONT, display: "inline-block",
};

const labelStyle = {
  fontSize: "0.52rem", letterSpacing: "3.5px", textTransform: "uppercase",
  color: "rgba(250,247,240,0.22)", margin: "0 0 18px",
  fontFamily: FONT, display: "block",
};

function renderLinks(list) {
  return list.map((l, i) => (
    <a key={i} href={l.href}
      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={linkStyle}
      className="footer-nav-link"
    >
      {l.label}
    </a>
  ));
}

function LangSwitcher({ style = {} }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = useIntlPathname();

  function switchLocale(next) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div style={{ display: "flex", gap: "14px" }}>
      <button
        type="button"
        onClick={() => switchLocale("pt")}
        aria-current={locale === "pt" ? "true" : undefined}
        style={{
          ...linkStyle, ...style,
          color: locale === "pt" ? "var(--cream)" : "rgba(250,247,240,0.4)",
          fontWeight: locale === "pt" ? "600" : "300",
          fontSize: "0.72rem", letterSpacing: "1.5px",
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center",
        }}
      >
        PT <FlagPT />
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        aria-current={locale === "en" ? "true" : undefined}
        style={{
          ...linkStyle, ...style,
          color: locale === "en" ? "var(--cream)" : "rgba(250,247,240,0.4)",
          fontWeight: locale === "en" ? "600" : "300",
          fontSize: "0.72rem", letterSpacing: "1.5px",
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center",
        }}
      >
        EN <FlagEN />
      </button>
    </div>
  );
}

export default function FooterClient() {
  const locale = useLocale();
  const t = useTranslations("footer");

  const prefix = locale === "en" ? "/en" : "";

  const footerLinks = {
    servicos: [
      { href: `${prefix}${locale === "en" ? "/flower-preservation" : "/preservacao-de-flores"}`,  label: locale === "en" ? "Flower Preservation" : "Preservação de Flores" },
      { href: `${prefix}${locale === "en" ? "/options-and-pricing" : "/opcoes-e-precos"}`,              label: locale === "en" ? "Options & Pricing" : "Opções e Preços" },
      { href: `${prefix}${locale === "en" ? "/how-it-works" : "/como-funciona"}`,                  label: locale === "en" ? "How It Works" : "Como Funciona" },
      { href: `${prefix}${locale === "en" ? "/frame-dried-flowers" : "/emoldurar-flores-secas"}`,  label: locale === "en" ? "Frame Dried Flowers" : "Emoldurar Flores Já Secas" },
      { href: `${prefix}${locale === "en" ? "/bouquet-recreation" : "/recriacao"}`,                label: locale === "en" ? "Bouquet Recreation" : "Recriação de Bouquet" },
      { href: `${prefix}${locale === "en" ? "/gift-preservation" : "/oferecer-preservacao"}`,      label: locale === "en" ? "Gift Preservation" : "Oferecer Preservação" },
    ],
    momentos: [
      { href: `${prefix}${locale === "en" ? "/special-moments" : "/momentos-especiais"}`,                           label: locale === "en" ? "Special Occasions" : "Momentos Especiais" },
      { href: `${prefix}${locale === "en" ? "/preserve-wedding-bouquet" : "/preservar-bouquet-noiva"}`,             label: locale === "en" ? "Wedding Bouquet" : "Bouquet de Noiva" },
      { href: `${prefix}${locale === "en" ? "/preserve-memorial-flowers" : "/preservar-flores-luto-homenagem"}`,    label: locale === "en" ? "Memorial & Tribute" : "Homenagem e Luto" },
      { href: `${prefix}${locale === "en" ? "/preserve-baptism-flowers" : "/preservar-flores-batizado-nascimento"}`,label: locale === "en" ? "Baptism & Birth" : "Batizado e Nascimento" },
      { href: `${prefix}${locale === "en" ? "/preserve-anniversary-flowers" : "/preservar-flores-aniversario"}`,    label: locale === "en" ? "Anniversary" : "Aniversário" },
      { href: `${prefix}${locale === "en" ? "/preserve-proposal-flowers" : "/preservar-flores-pedido-casamento"}`,  label: locale === "en" ? "Proposal" : "Pedido de Casamento" },
    ],
    ajuda: [
      { href: `${prefix}${locale === "en" ? "/faq" : "/perguntas-frequentes"}`,  label: locale === "en" ? "FAQ" : "Perguntas Frequentes" },
      { href: `${prefix}${locale === "en" ? "/contact" : "/contactos"}`,          label: locale === "en" ? "Contact & Team" : "Contactos e Equipa" },
      { href: TRACKING_URL, label: locale === "en" ? "Track Order" : "Acompanhar Encomenda", external: true },
      { href: `${prefix}/blog`,                                                   label: "Blog" },
    ],
    legal: [
      { href: `${prefix}${locale === "en" ? "/privacy-policy" : "/politica-de-privacidade"}`,       label: locale === "en" ? "Privacy Policy" : "Política de Privacidade" },
      { href: `${prefix}${locale === "en" ? "/terms-and-conditions" : "/termos-e-condicoes"}`,       label: locale === "en" ? "Terms & Conditions" : "Termos e Condições" },
    ],
  };

  return (
    <footer style={{ backgroundColor: "var(--dark)", color: "var(--cream)", position: "relative" }}>
      <div style={{ textAlign: "center", padding: "72px 24px 56px" }}>
        <h2 style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
          color: "var(--cream)", margin: "0 0 16px",
          lineHeight: 1.0, fontWeight: 400,
        }}>
          Flores à Beira&#8209;Rio
        </h2>
        <p style={{
          fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase",
          color: "rgba(250,247,240,0.45)", margin: "0 0 36px", fontFamily: FONT,
        }}>
          {t("tagline")}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "40px" }}>
          {[
            { href: SOCIAL_INSTAGRAM, icon: <IconInstagram size={20} />, label: "Instagram" },
            { href: SOCIAL_FACEBOOK,  icon: <IconFacebook size={20} />,  label: "Facebook" },
            { href: WA_URL,           icon: <IconWhatsApp size={20} />,  label: "WhatsApp" },
            { href: `mailto:${EMAIL}`,icon: <IconEmail size={20} />,     label: "Email" },
          ].map((s, i) => (
            <a key={i} href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="footer-social-icon"
              style={{ color: "rgba(250,247,240,0.45)", transition: "color 0.25s ease", display: "flex", alignItems: "center" }}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer"
          className="footer-wa-btn"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            backgroundColor: "#25D366", color: "#fff",
            padding: "13px 28px", borderRadius: "100px",
            textDecoration: "none", fontWeight: "600",
            fontSize: "0.75rem", letterSpacing: "0.5px",
            fontFamily: FONT, transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(37,211,102,0.2)",
          }}
        >
          <IconWhatsApp size={20} /> +351 934 680 300
        </a>
      </div>

      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(250,247,240,0.1), transparent)" }} />

      {/* Desktop */}
      <div className="footer-desktop" style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "36px 32px" }}>
          <div>
            <span style={labelStyle}>{t("servicos")}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(footerLinks.servicos)}</div>
          </div>
          <div>
            <span style={labelStyle}>{t("momentos")}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(footerLinks.momentos)}</div>
          </div>
          <div>
            <span style={labelStyle}>{t("ajuda")}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(footerLinks.ajuda)}</div>
          </div>
          <div>
            <span style={labelStyle}>{t("legal")}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>{renderLinks(footerLinks.legal)}</div>
            <LangSwitcher />
          </div>
          <div>
            <span style={labelStyle}>{t("contacto")}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href={`mailto:${EMAIL}`} style={linkStyle} className="footer-nav-link">{EMAIL}</a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={linkStyle} className="footer-nav-link">+351 934 680 300</a>
              <span style={{ ...linkStyle, color: "rgba(250,247,240,0.28)", cursor: "default" }}>{t("localidade")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="footer-mobile" style={{ padding: "8px 24px 24px" }}>
        <FooterAccordion label={t("servicos")}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(footerLinks.servicos)}</div>
        </FooterAccordion>
        <FooterAccordion label={t("momentos")}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(footerLinks.momentos)}</div>
        </FooterAccordion>
        <FooterAccordion label={t("ajuda")}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(footerLinks.ajuda)}</div>
        </FooterAccordion>
        <FooterAccordion label={t("legal")}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(footerLinks.legal)}</div>
        </FooterAccordion>
        <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <a href={`mailto:${EMAIL}`} style={{ ...linkStyle, fontSize: "0.8rem" }} className="footer-nav-link">{EMAIL}</a>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: "0.8rem" }} className="footer-nav-link">+351 934 680 300</a>
          <div style={{ paddingTop: "4px" }}>
            <LangSwitcher />
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(250,247,240,0.07)", padding: "20px 24px 28px", textAlign: "center" }}>
        <p style={{ fontSize: "0.68rem", letterSpacing: "1px", color: "rgba(250,247,240,0.45)", fontFamily: FONT, textTransform: "uppercase", margin: 0 }}>
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
