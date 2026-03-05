"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Flag SVGs ────────────────────────────────────────────────────────────────
const FlagPT = () => (
  <svg width="16" height="12" viewBox="0 0 600 400" style={{ marginLeft: "6px", borderRadius: "2px", verticalAlign: "middle" }}>
    <rect width="240" height="400" fill="#006600"/>
    <rect x="240" width="360" height="400" fill="#ff0000"/>
    <circle cx="240" cy="200" r="80" fill="#ffff00"/>
    <circle cx="240" cy="200" r="50" fill="#ffffff"/>
    <path d="M240 160 v80 M210 200 h60" stroke="#ff0000" strokeWidth="10"/>
  </svg>
);
const FlagEN = () => (
  <svg width="16" height="12" viewBox="0 0 640 480" style={{ marginLeft: "6px", borderRadius: "2px", verticalAlign: "middle" }}>
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 245 180L565 0h75v56L396 240l244 184v56h-75L320 300 75 480H0v-56l244-184L0 56V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM216 199 0 40V0l271 199h-55zm-216 241 216-159h55L0 480v-40zm640 0L424 281h55l161 119v40zM0 190h640v100H0z"/>
    <path fill="#FFF" d="M270 0h100v480H270z"/>
    <path fill="#C8102E" d="M0 210h640v60H0zM300 0h40v480h-40z"/>
  </svg>
);

// ─── Social Icons ─────────────────────────────────────────────────────────────
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// ─── Dropdown data ────────────────────────────────────────────────────────────
const NAV_PRESERVACAO = {
  label: "Preservação",
  href: "/preservacao-de-flores",
  items: [
    { name: "Opções e Preços",       href: "/opcoes-e-precos" },
    { name: "Como Funciona",         href: "/como-funciona" },
    { name: "Sustentabilidade",      href: "/sustentabilidade" },
    { name: "Emoldurar Flores Secas", href: "/emoldurar-flores-secas" },
  ]
};

const NAV_MOMENTOS = {
  label: "Momentos Especiais",
  href: "/momentos-especiais",
  items: [
    { name: "Bouquet de Noiva",         href: "/preservacao-bouquet-noiva" },
    { name: "Homenagem e Luto",         href: "/preservar-flores-luto-homenagem" },
    { name: "Batizado e Nascimento",    href: "/preservar-flores-batizado-nascimento" },
    { name: "Aniversário",              href: "/preservar-flores-aniversario" },
    { name: "Pedido de Casamento",      href: "/preservar-flores-pedido-casamento" },
  ]
};

// ─── Dropdown chevron icon ─────────────────────────────────────────────────────
const Chevron = ({ open, color }) => (
  <svg
    width="10" height="10" viewBox="0 0 10 10" fill="none"
    style={{
      marginLeft: "4px", transition: "transform 0.25s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0,
    }}
    aria-hidden="true"
  >
    <path d="M2 3.5L5 6.5L8 3.5" stroke={color || "currentColor"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Desktop Dropdown component ───────────────────────────────────────────────
const DesktopDropdown = ({ menu, scrolled }) => {
  const textColor = scrolled ? "#1a1a1a" : "#fff";
  return (
    <div className="dd-container">
      <a
        href={menu.href}
        className="nav-link dd-trigger desktop-only"
        style={{
          fontSize: "0.7rem", fontWeight: "500", textTransform: "uppercase",
          letterSpacing: "1.3px", color: textColor, whiteSpace: "nowrap",
          display: "inline-flex", alignItems: "center",
        }}
      >
        {menu.label}
        <Chevron color={textColor} />
      </a>
      <div className="dd-panel">
        {menu.items.map((item, i) => (
          <a key={i} href={item.href} className="dd-item">
            <span className="dd-dot" aria-hidden="true"/>
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const FORM_URL = "https://wkf.ms/3RfoNAc";

function SiteFooter() {
  const links = {
    servicos: [
      { href: "/preservacao-de-flores",  label: "Preservação de Flores" },
      { href: "/opcoes-e-precos",        label: "Opções e Preços" },
      { href: "/como-funciona",          label: "Como Funciona" },
      { href: "/emoldurar-flores-secas", label: "Emoldurar Flores Secas" },
      { href: "/recriacao",              label: "Recriação de Bouquet" },
      { href: "/vale-presente",          label: "Vale-Presente" },
    ],
    momentos: [
      { href: "/preservacao-bouquet-noiva",            label: "Bouquet de Noiva" },
      { href: "/preservar-flores-luto-homenagem",      label: "Homenagem e Luto" },
      { href: "/preservar-flores-batizado-nascimento", label: "Batizado e Nascimento" },
      { href: "/preservar-flores-aniversario",         label: "Aniversário" },
      { href: "/preservar-flores-pedido-casamento",    label: "Pedido de Casamento" },
    ],
    ajuda: [
      { href: "/perguntas-frequentes", label: "Perguntas Frequentes" },
      { href: "/contactos",            label: "Contactos e Equipa" },
      { href: "/acompanhar-encomenda", label: "Acompanhar Encomenda" },
      { href: "/blog",                 label: "Blog" },
    ],
    legal: [
      { href: "/politica-de-privacidade", label: "Política de Privacidade" },
      { href: "/termos-e-condicoes",      label: "Termos e Condições" },
    ],
  };

  const linkStyle = {
    color: "rgba(250,247,240,0.5)",
    textDecoration: "none",
    fontSize: "0.84rem",
    fontWeight: "300",
    lineHeight: 1,
    transition: "color 0.25s ease",
    fontFamily: "Roboto, sans-serif",
    display: "inline-block",
  };

  const labelStyle = {
    fontSize: "0.52rem",
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    color: "rgba(250,247,240,0.22)",
    margin: "0 0 18px",
    fontFamily: "Roboto, sans-serif",
    display: "block",
  };

  return (
    <footer style={{ backgroundColor: "#0F1E1A", color: "#FAF7F0", position: "relative" }}>

      <div style={{ textAlign: "center", padding: "72px 24px 56px" }}>
        <h2 style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
          color: "#FAF7F0", margin: "0 0 16px",
          lineHeight: 1.0, fontWeight: 400, letterSpacing: "-0.01em",
        }}>
          Flores à Beira&#8209;Rio
        </h2>
        <p style={{
          fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase",
          color: "rgba(250,247,240,0.45)", margin: "0 0 36px", fontFamily: "Roboto, sans-serif",
        }}>
          Especialistas em Preservação de Flores · Coimbra, Portugal
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "40px" }}>
          {[
            { href: "https://instagram.com/floresabeirario", icon: <IconInstagram/>, label: "Instagram" },
            { href: "https://facebook.com/floresabeirario",  icon: <IconFacebook/>,  label: "Facebook" },
            { href: "https://wa.me/351934680300",             icon: <IconWhatsApp/>,  label: "WhatsApp" },
            { href: "mailto:info@floresabeirario.pt",         icon: <IconEmail/>,     label: "Email" },
          ].map((s, i) => (
            <a key={i} href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer" aria-label={s.label}
              style={{ color: "rgba(250,247,240,0.45)", transition: "color 0.25s ease", display: "flex", alignItems: "center" }}
              onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.45)"}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <a href="https://wa.me/351934680300" target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            backgroundColor: "#25D366", color: "#fff",
            padding: "13px 28px", borderRadius: "100px",
            textDecoration: "none", fontWeight: "600",
            fontSize: "0.75rem", letterSpacing: "0.5px",
            fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(37,211,102,0.2)",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1db954"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#25D366"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <IconWhatsApp/> +351 934 680 300
        </a>
      </div>

      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(250,247,240,0.1), transparent)" }}/>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "36px 32px",
        }}>
          <div>
            <span style={labelStyle}>Serviços</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {links.servicos.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <span style={labelStyle}>Momentos</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {links.momentos.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <span style={labelStyle}>Ajuda</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {links.ajuda.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <span style={labelStyle}>Legal</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {links.legal.map((l, i) => (
                <a key={i} href={l.href} style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
                >{l.label}</a>
              ))}
            </div>
            <div style={{ display: "flex", gap: "14px" }}>
              <a href="/pt" style={{ ...linkStyle, color: "#FAF7F0", fontWeight: "600", fontSize: "0.72rem", letterSpacing: "1.5px", display: "flex", alignItems: "center" }}>
                PT <FlagPT/>
              </a>
              <a href="/en" style={{ ...linkStyle, fontSize: "0.72rem", letterSpacing: "1.5px", display: "flex", alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
              >
                EN <FlagEN/>
              </a>
            </div>
          </div>
          <div>
            <span style={labelStyle}>Contacto</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="mailto:info@floresabeirario.pt" style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
              >info@floresabeirario.pt</a>
              <a href="https://wa.me/351934680300" target="_blank" rel="noopener noreferrer" style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
              >+351 934 680 300</a>
              <span style={{ ...linkStyle, color: "rgba(250,247,240,0.28)", cursor: "default" }}>Coimbra, Portugal</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(250,247,240,0.07)", padding: "20px 24px 28px", textAlign: "center" }}>
        <p style={{
          fontSize: "0.58rem", letterSpacing: "2px",
          color: "rgba(250,247,240,0.2)", fontFamily: "Roboto, sans-serif",
          textTransform: "uppercase", margin: 0,
        }}>
          © 2026 Flores à Beira-Rio · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

// ─── Mobile menu section header ───────────────────────────────────────────────
const MobileSection = ({ label, href, items, onClose, initial, delay }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Parent — clicável para a overview page */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(250,247,240,0.07)",
      }}>
        <a
          href={href}
          onClick={onClose}
          style={{
            display: "block", color: "#FAF7F0", textDecoration: "none",
            fontSize: "clamp(1.5rem, 6vw, 2rem)", fontFamily: "'TAN-MEMORIES', serif",
            lineHeight: 1, padding: "14px 0", flex: 1,
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#8BA888"}
          onMouseLeave={e => e.currentTarget.style.color = "#FAF7F0"}
        >
          {label}
        </a>
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Fechar submenu" : "Abrir submenu"}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(250,247,240,0.4)", padding: "8px",
            display: "flex", alignItems: "center",
          }}
        >
          <Chevron open={open} color="rgba(250,247,240,0.4)" />
        </button>
      </div>
      {/* Sub-items */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {items.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={onClose}
                style={{
                  display: "block", color: "rgba(250,247,240,0.55)",
                  textDecoration: "none", fontSize: "0.88rem",
                  fontFamily: "Roboto, sans-serif", fontWeight: 400,
                  padding: "10px 0 10px 16px",
                  borderBottom: "1px solid rgba(250,247,240,0.04)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#8BA888"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.55)"}
              >
                → {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Links simples do lado direito (sem dropdown)
  const menuRight = [
    { name: "Recriação",           href: "/recriacao" },
    { name: "Oferecer",            href: "/vale-presente" },
    { name: "FAQ",                 href: "/perguntas-frequentes" },
    { name: "Contactos",           href: "/contactos" },
  ];

  const shouldShowScrolled = scrolled || !isHome;

  return (
    <html lang="pt">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"/>
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'TAN-MEMORIES';
            src: url('/TAN-MEMORIES.otf') format('opentype');
            font-weight: normal; font-style: normal; font-display: swap;
          }
          @font-face {
            font-family: 'TAN-MEMORIES';
            src: url('/TAN-MEMORIES-Italic.otf') format('opentype');
            font-weight: normal; font-style: italic; font-display: swap;
          }
        `}}/>
      </head>
      <body style={{ margin: 0, backgroundColor: "#FAF7F0", color: "#1a1a1a", fontFamily: "'Roboto', sans-serif" }}>

        {/* ─── Desktop Nav ─────────────────────────────────────────── */}
        <nav style={{
          position: "fixed", top: 0, width: "100%", zIndex: 100,
          backgroundColor: shouldShowScrolled ? "rgba(250,247,240,0.95)" : "transparent",
          backdropFilter: shouldShowScrolled ? "blur(10px)" : "none",
          transition: "all 0.4s ease",
          padding: shouldShowScrolled ? "14px 0" : "24px 0"
        }}>
          <div className="nav-bar">

            {/* LEFT — Preservação dropdown + Momentos dropdown */}
            <div className="nav-left">
              {/* Language switcher */}
              <div className="lang-container desktop-only" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <a href="/pt" className="nav-link lang-trigger" style={{
                  fontSize: "0.7rem", fontWeight: "500", textTransform: "uppercase",
                  letterSpacing: "1.3px", color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                  display: "flex", alignItems: "center", cursor: "pointer"
                }}>
                  PT <FlagPT/>
                </a>
                <div className="lang-dropdown" style={{ left: 0, right: "auto" }}>
                  <a href="/en" className="lang-dropdown-item" style={{
                    fontSize: "0.7rem", fontWeight: "500", textTransform: "uppercase",
                    letterSpacing: "1.3px", display: "flex", alignItems: "center",
                    color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                    background: shouldShowScrolled ? "rgba(250,247,240,0.95)" : "rgba(0,0,0,0.2)",
                    backdropFilter: "blur(12px)", padding: "9px 14px", borderRadius: "6px",
                    border: `1px solid ${shouldShowScrolled ? "rgba(26,26,26,0.08)" : "rgba(255,255,255,0.12)"}`,
                    textDecoration: "none", transition: "background 0.3s ease"
                  }}>
                    EN <FlagEN/>
                  </a>
                </div>
              </div>

              {/* Dropdown: Preservação de Flores */}
              <DesktopDropdown menu={NAV_PRESERVACAO} scrolled={shouldShowScrolled} />

              {/* Dropdown: Momentos Especiais */}
              <DesktopDropdown menu={NAV_MOMENTOS} scrolled={shouldShowScrolled} />
            </div>

            {/* CENTER — Logo */}
            <motion.a href="/" className="nav-logo"
              animate={{ opacity: shouldShowScrolled ? 1 : 0, y: shouldShowScrolled ? 0 : 8 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ color: shouldShowScrolled ? "#1a1a1a" : "#fff", pointerEvents: shouldShowScrolled ? "auto" : "none" }}>
              Flores à Beira&#8209;Rio
            </motion.a>

            {/* RIGHT — links simples + CTA */}
            <div className="nav-right-col">
              <div className="nav-right desktop-only">
                {menuRight.map(item => (
                  <a key={item.name} href={item.href} className="nav-link" style={{
                    fontSize: "0.7rem", fontWeight: "500", textTransform: "uppercase",
                    letterSpacing: "1.3px", color: shouldShowScrolled ? "#1a1a1a" : "#fff", whiteSpace: "nowrap"
                  }}>
                    {item.name}
                  </a>
                ))}
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="nav-cta" style={{
                  backgroundColor: shouldShowScrolled ? "#3D6B5E" : "rgba(250,247,240,0.12)",
                  color: shouldShowScrolled ? "#FAF7F0" : "rgba(250,247,240,0.92)",
                  border: shouldShowScrolled ? "1.5px solid #3D6B5E" : "1.5px solid rgba(250,247,240,0.35)",
                  backdropFilter: shouldShowScrolled ? "none" : "blur(8px)",
                  boxShadow: shouldShowScrolled ? "0 3px 14px rgba(61,107,94,0.22)" : "none"
                }}>
                  Reservar Data
                </a>
              </div>

              <button className="mobile-only nav-mobile-btn" onClick={() => setIsOpen(true)} style={{
                color: shouldShowScrolled ? "#1a1a1a" : "#fff", marginLeft: "auto"
              }}>
                MENU
              </button>
            </div>
          </div>
        </nav>

        {/* ─── Mobile Menu ─────────────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position: "fixed", inset: 0, backgroundColor: "#0F1E1A", zIndex: 200,
                display: "flex", flexDirection: "column", padding: "0 36px", overflowY: "auto"
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "28px", paddingBottom: "36px" }}>
                <a href="/" onClick={() => setIsOpen(false)} style={{
                  fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.1rem", color: "#FAF7F0",
                  letterSpacing: "0.5px", textDecoration: "none"
                }}>
                  Flores à Beira&#8209;Rio
                </a>
                <button onClick={() => setIsOpen(false)} style={{
                  background: "none", border: "1px solid rgba(250,247,240,0.2)", borderRadius: "100px",
                  color: "#FAF7F0", fontSize: "0.72rem", fontWeight: "500", letterSpacing: "2px",
                  cursor: "pointer", fontFamily: "'Roboto', sans-serif", padding: "8px 16px"
                }}>
                  FECHAR
                </button>
              </div>

              <div style={{ height: "1px", background: "rgba(250,247,240,0.08)", marginBottom: "28px" }}/>

              {/* Menu items */}
              <nav style={{ flex: 1 }}>
                {/* Dropdown expandível: Preservação */}
                <MobileSection
                  label="Preservação de Flores"
                  href={NAV_PRESERVACAO.href}
                  items={NAV_PRESERVACAO.items}
                  onClose={() => setIsOpen(false)}
                  delay={0.08}
                />

                {/* Dropdown expandível: Momentos */}
                <MobileSection
                  label="Momentos Especiais"
                  href={NAV_MOMENTOS.href}
                  items={NAV_MOMENTOS.items}
                  onClose={() => setIsOpen(false)}
                  delay={0.13}
                />

                {/* Links simples */}
                {[
                  { name: "Recriação de Bouquet",  href: "/recriacao",             delay: 0.18 },
                  { name: "Oferecer Preservação",  href: "/vale-presente",          delay: 0.22 },
                  { name: "Perguntas Frequentes",  href: "/perguntas-frequentes",   delay: 0.26 },
                  { name: "Contactos e Equipa",    href: "/contactos",              delay: 0.30 },
                  { name: "Blog",                  href: "/blog",                   delay: 0.34 },
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      display: "block", color: "#FAF7F0", textDecoration: "none",
                      fontSize: "clamp(1.5rem, 6vw, 2rem)", fontFamily: "'TAN-MEMORIES', serif",
                      lineHeight: 1, padding: "14px 0", borderBottom: "1px solid rgba(250,247,240,0.07)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#8BA888"}
                    onMouseLeave={e => e.currentTarget.style.color = "#FAF7F0"}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              {/* CTA + idioma */}
              <div style={{ paddingTop: "36px", paddingBottom: "48px" }}>
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
                  style={{
                    display: "block", textAlign: "center", backgroundColor: "#3D6B5E", color: "#FAF7F0",
                    padding: "17px 38px", borderRadius: "100px", textDecoration: "none", fontWeight: "600",
                    fontSize: "0.8rem", letterSpacing: "1.5px", textTransform: "uppercase",
                    fontFamily: "Roboto, sans-serif", boxShadow: "0 6px 22px rgba(61,107,94,0.35)", marginBottom: "24px"
                  }}
                >
                  Reservar Data
                </a>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                  <a href="/pt" style={{
                    color: "#FAF7F0", fontSize: "0.75rem", fontFamily: "Roboto, sans-serif",
                    fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase",
                    display: "flex", alignItems: "center", textDecoration: "none"
                  }}>PT <FlagPT/></a>
                  <a href="/en" style={{
                    color: "rgba(250,247,240,0.35)", fontSize: "0.75rem", fontFamily: "Roboto, sans-serif",
                    fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase",
                    display: "flex", alignItems: "center", textDecoration: "none", transition: "color 0.25s"
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.35)"}
                  >EN <FlagEN/></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>{children}</main>
        <SiteFooter/>

        <style jsx global>{`
          @media (max-width: 1279px) { .desktop-only { display: none !important; } }
          @media (min-width: 1280px) { .mobile-only  { display: none !important; } }
          * { box-sizing: border-box; }

          .nav-bar {
            display: flex; align-items: center;
            max-width: 1440px; margin: 0 auto; padding: 0 24px;
          }
          @media (min-width: 1280px) { .nav-bar { padding: 0 32px; } }

          .nav-left {
            flex: 1; display: flex; gap: clamp(8px, 1.2vw, 18px);
            align-items: center; justify-content: flex-end;
          }

          .nav-logo {
            flex: 0 0 auto; font-size: clamp(1rem, 1.5vw, 1.4rem);
            font-family: 'TAN-MEMORIES', serif; text-align: center;
            text-decoration: none !important; line-height: 1.1; letter-spacing: 0.5px;
            white-space: nowrap; padding: 2px 20px;
            border-bottom: 1px solid transparent; transition: all 0.3s ease;
          }
          .nav-logo:hover { border-bottom: 1px solid currentColor; }

          .nav-right-col { flex: 1; display: flex; justify-content: flex-start; align-items: center; }
          .nav-right { display: flex; gap: clamp(8px, 1.2vw, 18px); align-items: center; }

          .nav-mobile-btn {
            background: none; border: none; cursor: pointer;
            font-size: 0.82rem; font-weight: 500; letter-spacing: 2px;
            padding: 10px 0; font-family: 'Roboto', sans-serif;
          }

          h1, h2, h3, .serif { font-family: 'TAN-MEMORIES', serif !important; font-weight: 400; line-height: 1.1; }
          .italic { font-style: italic !important; }

          .nav-link {
            text-decoration: none !important; transition: all 0.3s ease;
            display: inline-flex; align-items: center;
            border-bottom: 1px solid transparent;
            line-height: 1.4; padding-bottom: 2px;
          }
          .nav-link:hover { border-bottom: 1px solid currentColor; }

          /* ── Language dropdown ── */
          .lang-trigger { border-bottom: 1px solid transparent !important; }
          .lang-trigger:hover { border-bottom: 1px solid currentColor !important; }
          .lang-dropdown {
            position: absolute; top: 100%; right: 0; padding-top: 10px;
            opacity: 0; visibility: hidden; transform: translateY(-6px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none;
          }
          .lang-container:hover .lang-dropdown {
            opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto;
          }

          /* ── Dropdown menu ── */
          .dd-container {
            position: relative;
            display: inline-flex;
            align-items: center;
          }
          .dd-trigger {
            cursor: pointer;
          }
          .dd-panel {
            position: absolute;
            top: calc(100% + 14px);
            left: 50%;
            transform: translateX(-50%);
            min-width: 210px;
            background: #FAF7F0;
            border: 1px solid rgba(61,107,94,0.12);
            border-radius: 14px;
            padding: 8px 6px;
            box-shadow: 0 12px 40px rgba(30,45,42,0.14);
            opacity: 0;
            visibility: hidden;
            transform: translateX(-50%) translateY(-8px);
            transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            z-index: 200;
          }
          /* Small arrow pointing up */
          .dd-panel::before {
            content: '';
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 12px; height: 12px;
            background: #FAF7F0;
            border-left: 1px solid rgba(61,107,94,0.12);
            border-top: 1px solid rgba(61,107,94,0.12);
            transform: translateX(-50%) rotate(45deg);
          }
          .dd-container:hover .dd-panel,
          .dd-container:focus-within .dd-panel {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
            pointer-events: auto;
          }
          .dd-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 8px;
            text-decoration: none;
            color: #1E2D2A;
            font-size: 0.78rem;
            font-family: Roboto, sans-serif;
            font-weight: 400;
            letter-spacing: 0.3px;
            transition: background 0.18s ease, color 0.18s ease;
            white-space: nowrap;
          }
          .dd-item:hover {
            background: rgba(61,107,94,0.08);
            color: #3D6B5E;
          }
          .dd-dot {
            width: 5px; height: 5px;
            border-radius: 50%;
            background: rgba(61,107,94,0.35);
            flex-shrink: 0;
            transition: background 0.18s ease;
          }
          .dd-item:hover .dd-dot {
            background: #3D6B5E;
          }

          /* ── CTA button ── */
          .nav-cta {
            display: inline-flex; align-items: center; font-size: 0.66rem; font-weight: 600;
            letter-spacing: 1.4px; text-transform: uppercase; text-decoration: none !important;
            font-family: Roboto, sans-serif; padding: 8px 18px; border-radius: 100px;
            transition: all 0.3s ease; white-space: nowrap;
          }
          .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(61,107,94,0.32) !important; }
        `}</style>
      </body>
    </html>
  );
}
