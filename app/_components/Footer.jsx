// app/_components/Footer.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconInstagram, IconFacebook, IconWhatsApp, IconEmail, FlagPT, FlagEN } from "./Icons";
import { FOOTER_LINKS } from "../_lib/data/navigation";
import { FORM_URL, WA_URL, EMAIL, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK } from "../_lib/constants";

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

const renderLinks = (list) =>
  list.map((l, i) => (
    <a key={i} href={l.href}
      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={linkStyle}
      className="footer-nav-link"
    >
      {l.label}
    </a>
  ));

export default function FooterClient() {
  return (
    <footer style={{ backgroundColor: "#0F1E1A", color: "#FAF7F0", position: "relative" }}>
      <div style={{ textAlign: "center", padding: "72px 24px 56px" }}>
        <h2 style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
          color: "#FAF7F0", margin: "0 0 16px",
          lineHeight: 1.0, fontWeight: 400,
        }}>
          Flores à Beira&#8209;Rio
        </h2>
        <p style={{
          fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase",
          color: "rgba(250,247,240,0.45)", margin: "0 0 36px", fontFamily: FONT,
        }}>
          Especialistas em Preservação de Flores · Coimbra, Portugal
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "40px" }}>
          {[
            { href: SOCIAL_INSTAGRAM,   icon: <IconInstagram size={20} />, label: "Instagram" },
            { href: SOCIAL_FACEBOOK,    icon: <IconFacebook size={20} />,  label: "Facebook" },
            { href: WA_URL,             icon: <IconWhatsApp size={20} />,  label: "WhatsApp" },
            { href: `mailto:${EMAIL}`,  icon: <IconEmail size={20} />,     label: "Email" },
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
            <span style={labelStyle}>Serviços</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(FOOTER_LINKS.servicos)}</div>
          </div>
          <div>
            <span style={labelStyle}>Momentos</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(FOOTER_LINKS.momentos)}</div>
          </div>
          <div>
            <span style={labelStyle}>Ajuda</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(FOOTER_LINKS.ajuda)}</div>
          </div>
          <div>
            <span style={labelStyle}>Legal</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>{renderLinks(FOOTER_LINKS.legal)}</div>
            <div style={{ display: "flex", gap: "14px" }}>
              <a href="/" style={{ ...linkStyle, color: "#FAF7F0", fontWeight: "600", fontSize: "0.72rem", letterSpacing: "1.5px", display: "flex", alignItems: "center" }}>
                PT <FlagPT />
              </a>
              <a href="/en" style={{ ...linkStyle, fontSize: "0.72rem", letterSpacing: "1.5px", display: "flex", alignItems: "center" }}
                className="footer-nav-link"
              >
                EN <FlagEN />
              </a>
            </div>
          </div>
          <div>
            <span style={labelStyle}>Contacto</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href={`mailto:${EMAIL}`} style={linkStyle} className="footer-nav-link">{EMAIL}</a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={linkStyle} className="footer-nav-link">+351 934 680 300</a>
              <span style={{ ...linkStyle, color: "rgba(250,247,240,0.28)", cursor: "default" }}>Coimbra, Portugal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="footer-mobile" style={{ padding: "8px 24px 24px" }}>
        <FooterAccordion label="Serviços">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(FOOTER_LINKS.servicos)}</div>
        </FooterAccordion>
        <FooterAccordion label="Momentos">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(FOOTER_LINKS.momentos)}</div>
        </FooterAccordion>
        <FooterAccordion label="Ajuda">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(FOOTER_LINKS.ajuda)}</div>
        </FooterAccordion>
        <FooterAccordion label="Legal">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{renderLinks(FOOTER_LINKS.legal)}</div>
        </FooterAccordion>
        <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <a href={`mailto:${EMAIL}`} style={{ ...linkStyle, fontSize: "0.8rem" }} className="footer-nav-link">{EMAIL}</a>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: "0.8rem" }} className="footer-nav-link">+351 934 680 300</a>
          <div style={{ display: "flex", gap: "16px", paddingTop: "4px" }}>
            <a href="/" style={{ ...linkStyle, color: "#FAF7F0", fontWeight: "600", fontSize: "0.72rem", letterSpacing: "1.5px", display: "flex", alignItems: "center" }}>PT <FlagPT /></a>
            <a href="/en" style={{ ...linkStyle, fontSize: "0.72rem", letterSpacing: "1.5px", display: "flex", alignItems: "center" }} className="footer-nav-link">EN <FlagEN /></a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(250,247,240,0.07)", padding: "20px 24px 28px", textAlign: "center" }}>
        <p style={{ fontSize: "0.68rem", letterSpacing: "1px", color: "rgba(250,247,240,0.45)", fontFamily: FONT, textTransform: "uppercase", margin: 0 }}>
          © 2026 Flores à Beira-Rio · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
