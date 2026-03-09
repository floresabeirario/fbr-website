// app/_components/Nav.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FlagPT, FlagEN, IconWhatsApp } from "./Icons";
import { NAV_PRESERVACAO, NAV_MOMENTOS, NAV_RIGHT } from "../_lib/data/navigation";
import { FORM_URL } from "../_lib/constants";

// ── Cores do botão CTA por página ───────────────────────
const PAGE_COLORS = {
  "/oferecer-preservacao":                 { bg: "#4A7BA8", shadow: "rgba(74,123,168,0.32)" },
  "/preservar-bouquet-noiva":              { bg: "#A87B8C", shadow: "rgba(168,123,140,0.32)" },
  "/preservar-flores-luto-homenagem":      { bg: "#6B7A8D", shadow: "rgba(107,122,141,0.32)" },
  "/preservar-flores-batizado-nascimento": { bg: "#7BA88C", shadow: "rgba(123,168,140,0.32)" },
  "/preservar-flores-aniversario":         { bg: "#A8886B", shadow: "rgba(168,136,107,0.32)" },
  "/preservar-flores-pedido-casamento":    { bg: "#A86B7B", shadow: "rgba(168,107,123,0.32)" },
  "/recriacao":                            { bg: "#F0CC70", shadow: "rgba(240,204,112,0.32)" },
  "/contactos":                            { bg: "#C4846B", shadow: "rgba(196,132,107,0.32)" },
  "/opcoes-e-precos":                      { bg: "#8BA888", shadow: "rgba(139,168,136,0.32)" },
  "/como-funciona":                        { bg: "#C8522A", shadow: "rgba(200,82,42,0.32)" },
};
const DEFAULT_CTA = { bg: "#3D6B5E", shadow: "rgba(61,107,94,0.32)" };

// ── Ícones do menu mobile ────────────────────────────────
const IconFlor6 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2.2"/>
    <ellipse cx="12" cy="6.5" rx="1.5" ry="3" />
    <ellipse cx="12" cy="17.5" rx="1.5" ry="3" />
    <ellipse cx="17.2" cy="9.25" rx="1.5" ry="3" transform="rotate(60 17.2 9.25)" />
    <ellipse cx="6.8"  cy="9.25" rx="1.5" ry="3" transform="rotate(-60 6.8 9.25)" />
    <ellipse cx="17.2" cy="14.75" rx="1.5" ry="3" transform="rotate(-60 17.2 14.75)" />
    <ellipse cx="6.8"  cy="14.75" rx="1.5" ry="3" transform="rotate(60 6.8 14.75)" />
  </svg>
);

const IconCoracao = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconRecriacao = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const IconPresente = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const IconFAQ = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2"/>
  </svg>
);

const IconContactos = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconBlog = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="8" y1="7" x2="16" y2="7"/>
    <line x1="8" y1="11" x2="16" y2="11"/>
    <line x1="8" y1="15" x2="12" y2="15"/>
  </svg>
);

// ── Dropdown desktop com timer (não fecha ao atravessar o gap) ──
const DesktopDropdown = ({ menu, scrolled }) => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const textColor = scrolled ? "#1a1a1a" : "#fff";

  const handleEnter = () => { clearTimeout(timerRef.current); setOpen(true); };
  const handleLeave = () => { timerRef.current = setTimeout(() => setOpen(false), 150); };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      className="desktop-only"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a href={menu.href} className="nav-link" style={{
        fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase",
        letterSpacing: "1.3px", color: textColor,
        display: "inline-flex", alignItems: "center", whiteSpace: "nowrap",
        cursor: "pointer",
      }}>
        {menu.label}
        <motion.svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ marginLeft: "4px", flexShrink: 0 }}
          aria-hidden="true"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 14px)",
              left: "0",
              zIndex: 300,
            }}
          >
            <div style={{
              position: "absolute", top: "-14px", left: 0, right: 0, height: "14px",
            }} />
            <div style={{
              background: "#FAFAF8",
              border: "1px solid rgba(61,107,94,0.13)",
              borderRadius: "16px",
              padding: "6px",
              boxShadow: "0 4px 6px rgba(30,45,42,0.04), 0 12px 32px rgba(30,45,42,0.13), 0 24px 48px rgba(30,45,42,0.07)",
              minWidth: "220px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: "-5px", left: "24px",
                transform: "rotate(45deg)",
                width: "10px", height: "10px",
                background: "#FAFAF8",
                borderLeft: "1px solid rgba(61,107,94,0.13)",
                borderTop: "1px solid rgba(61,107,94,0.13)",
              }} />
              {menu.items.map((item, i) => (
                <a key={i} href={item.href} className="dd-item">{item.name}</a>
              ))}
              <div style={{ margin: "4px 6px 2px", borderTop: "1px solid rgba(61,107,94,0.1)", paddingTop: "4px" }}>
                <a href={menu.href} className="dd-item dd-item-all">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="#3D6B5E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Ver tudo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Acordeão mobile ──────────────────────────────────────
const MobileAccordion = ({ menu, onClose, delay, icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.24 }}
      style={{ borderBottom: "1px solid rgba(250,247,240,0.07)" }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "16px 28px",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ color: open ? "#8BA888" : "rgba(250,247,240,0.35)", flexShrink: 0, transition: "color 0.2s", display: "flex" }}>
            {icon}
          </span>
          <span style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
            color: open ? "#8BA888" : "#FAF7F0",
            lineHeight: 1.1, transition: "color 0.2s",
          }}>
            {menu.label}
          </span>
        </span>
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ flexShrink: 0, color: open ? "#8BA888" : "rgba(250,247,240,0.35)" }}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <a
              href={menu.href}
              onClick={onClose}
              style={{
                display: "block", color: "rgba(139,168,136,0.7)", textDecoration: "none",
                fontSize: "0.72rem", fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
                fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase",
                padding: "2px 28px 14px 62px", transition: "color 0.18s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#8BA888"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(139,168,136,0.7)"}
            >
              Ver tudo
            </a>
            {menu.items.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={onClose}
                style={{
                  display: "block", color: "rgba(250,247,240,0.5)", textDecoration: "none",
                  fontSize: "0.93rem", fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
                  fontWeight: 400, padding: "12px 28px 12px 62px",
                  borderTop: "1px solid rgba(250,247,240,0.04)",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#FAF7F0"; e.currentTarget.style.background = "rgba(250,247,240,0.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(250,247,240,0.5)"; e.currentTarget.style.background = "none"; }}
              >
                {item.name}
              </a>
            ))}
            <div style={{ height: "10px" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Divisória vertical ───────────────────────────────────
const NavDivider = ({ scrolled }) => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block", width: "1px", height: "14px", flexShrink: 0,
      alignSelf: "center",
      backgroundColor: scrolled ? "rgba(26,26,26,0.15)" : "rgba(250,247,240,0.2)",
    }}
  />
);

// ── Botão CTA ────────────────────────────────────────────
function NavCTA({ shouldShowScrolled, pathname }) {
  const c = PAGE_COLORS[pathname] || DEFAULT_CTA;
  return (
    <a
      href={FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-cta"
      style={{
        backgroundColor: shouldShowScrolled ? c.bg : "rgba(250,247,240,0.12)",
        color: "#FAF7F0",
        border: shouldShowScrolled ? `1.5px solid ${c.bg}` : "1.5px solid rgba(250,247,240,0.35)",
        backdropFilter: shouldShowScrolled ? "none" : "blur(8px)",
        boxShadow: shouldShowScrolled ? `0 3px 14px ${c.shadow}` : "none",
        transition: "all 0.4s ease",
      }}
    >
      Reservar Data
    </a>
  );
}

// ── Componente principal ─────────────────────────────────
export default function NavClient() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome   = pathname === "/";

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const show = scrolled || !isHome;

  const rightLinks = NAV_RIGHT.filter(item => item.name !== "Blog" && item.name !== "FAQ");

  return (
    <>
      {/* ── BARRA DE NAVEGAÇÃO ── */}
      <nav
        role="navigation"
        aria-label="Navegação principal"
        style={{
          position: "fixed", top: 0, width: "100%", zIndex: 100,
          backgroundColor: scrolled ? "rgba(250,247,240,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
          padding: scrolled ? "14px 0" : "20px 0",
        }}
      >
        <div className="nav-bar">

          {/* ── ESQUERDA (desktop): Reservar Data | FAQ | Preservação | Momentos ── */}
          <div className="nav-left desktop-only">
            <NavCTA shouldShowScrolled={show} pathname={pathname} />
            <NavDivider scrolled={show} />
            <a href="/perguntas-frequentes" className="nav-link" style={{
              fontWeight: "500", textTransform: "uppercase",
              color: show ? "#1a1a1a" : "#fff",
            }}>
              FAQ
            </a>
            <NavDivider scrolled={show} />
            <DesktopDropdown menu={NAV_PRESERVACAO} scrolled={show} />
            <NavDivider scrolled={show} />
            <DesktopDropdown menu={NAV_MOMENTOS} scrolled={show} />
          </div>

          {/* ── CENTRO: Logo ── */}
          <motion.a
            href="/"
            className="nav-logo desktop-only"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              color: show ? "#1a1a1a" : "#fff",
              pointerEvents: show ? "auto" : "none",
            }}
            aria-label="Flores à Beira-Rio — página inicial"
          >
            Flores à Beira&#8209;Rio
          </motion.a>
          <motion.a
            href="/"
            className="nav-logo mobile-only"
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              color: scrolled ? "#1a1a1a" : "#FAF7F0",
              pointerEvents: show ? "auto" : "none",
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
              padding: 0,
            }}
            aria-label="Flores à Beira-Rio — página inicial"
          >
            Flores à Beira&#8209;Rio
          </motion.a>

          {/* ── DIREITA (desktop): links + PT flag | MENU (mobile) ── */}
          <div className="nav-right-col">

            {/* Desktop */}
            <div className="nav-right desktop-only">
              {rightLinks.map((item, i) => (
                <React.Fragment key={item.name}>
                  <a href={item.href} className="nav-link" style={{
                    fontSize: "0.68rem", fontWeight: "500", textTransform: "uppercase",
                    letterSpacing: "1.3px", color: show ? "#1a1a1a" : "#fff", whiteSpace: "nowrap",
                  }}>
                    {item.name === "Contactos" ? "Contactos e Equipa" : item.name}
                  </a>
                  {i < rightLinks.length - 1 && <NavDivider scrolled={show} />}
                </React.Fragment>
              ))}
              <div className="nav-lang-desktop" style={{ display: "inline-flex", alignItems: "center", gap: "inherit" }}>
                <NavDivider scrolled={show} />
                <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
                  className="lang-container"
                >
                  <a href="/" className="nav-link lang-trigger" style={{
                    fontWeight: "500", textTransform: "uppercase",
                    color: show ? "#1a1a1a" : "#fff",
                    display: "flex", alignItems: "center",
                  }}>
                    PT <FlagPT />
                  </a>
                  <div className="lang-dropdown" style={{ right: 0, left: "auto" }}>
                    <a href="/en" style={{
                      fontSize: "0.68rem", fontWeight: "500", textTransform: "uppercase",
                      letterSpacing: "1.3px", display: "flex", alignItems: "center",
                      color: show ? "#1a1a1a" : "#fff",
                      background: show ? "rgba(250,247,240,0.95)" : "rgba(0,0,0,0.2)",
                      backdropFilter: "blur(12px)", padding: "9px 14px", borderRadius: "6px",
                      border: show ? "1px solid rgba(26,26,26,0.08)" : "1px solid rgba(255,255,255,0.12)",
                      textDecoration: "none", transition: "background 0.3s ease",
                    }}>
                      EN <FlagEN />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão MENU — só mobile */}
            <button
              className="mobile-only nav-mobile-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={isOpen}
              style={{ color: scrolled ? "#1a1a1a" : "#FAF7F0", marginLeft: "auto" }}
            >
              MENU
            </button>
          </div>
        </div>
      </nav>

      {/* ── MENU MOBILE (drawer) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fundo escuro */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 199,
                backgroundColor: "rgba(15,30,26,0.55)",
                backdropFilter: "blur(3px)",
              }}
              aria-hidden="true"
            />

            {/* Painel do drawer */}
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(400px, 100vw)",
                backgroundColor: "#0F1E1A",
                zIndex: 200, display: "flex", flexDirection: "column", overflowY: "auto",
              }}
            >
              {/* Cabeçalho do drawer */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 28px", borderBottom: "1px solid rgba(250,247,240,0.07)", flexShrink: 0,
              }}>
                <a
                  href="/"
                  onClick={() => setIsOpen(false)}
                  style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem", color: "#FAF7F0", textDecoration: "none" }}
                >
                  Flores à Beira&#8209;Rio
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar menu"
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: "8px",
                    color: "rgba(250,247,240,0.45)", display: "flex", alignItems: "center",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Links do menu mobile */}
              <nav aria-label="Menu móvel" style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
                <MobileAccordion menu={NAV_PRESERVACAO} onClose={() => setIsOpen(false)} delay={0.06} icon={<IconFlor6 />} />
                <MobileAccordion menu={NAV_MOMENTOS}    onClose={() => setIsOpen(false)} delay={0.10} icon={<IconCoracao />} />

                {[
                  { name: "Recriação de Bouquet", href: "/recriacao",            delay: 0.15, icon: <IconRecriacao /> },
                  { name: "Oferecer Preservação", href: "/oferecer-preservacao", delay: 0.18, icon: <IconPresente /> },
                  { name: "Perguntas Frequentes", href: "/perguntas-frequentes", delay: 0.21, icon: <IconFAQ /> },
                  { name: "Contactos e Equipa",   href: "/contactos",            delay: 0.24, icon: <IconContactos /> },
                  { name: "Blog",                 href: "/blog",                 delay: 0.27, icon: <IconBlog /> },
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: item.delay, duration: 0.24 }}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      color: "#FAF7F0", textDecoration: "none",
                      padding: "16px 28px",
                      borderBottom: "1px solid rgba(250,247,240,0.07)",
                      transition: "color 0.18s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#8BA888"}
                    onMouseLeave={e => e.currentTarget.style.color = "#FAF7F0"}
                  >
                    <span style={{ color: "rgba(250,247,240,0.35)", flexShrink: 0, display: "flex" }}>
                      {item.icon}
                    </span>
                    <span style={{
                      fontFamily: "'TAN-MEMORIES', serif",
                      fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
                      lineHeight: 1.1,
                    }}>
                      {item.name}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Rodapé do drawer */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                style={{
                  padding: "20px 28px 44px",
                  borderTop: "1px solid rgba(250,247,240,0.07)",
                  flexShrink: 0, display: "flex", flexDirection: "column", gap: "10px",
                }}
              >
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundColor: (PAGE_COLORS[pathname] || DEFAULT_CTA).bg,
                    color: "#FAF7F0",
                    padding: "15px 24px", borderRadius: "100px", textDecoration: "none",
                    fontWeight: 600, fontSize: "0.76rem", letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
                    transition: "background 0.4s ease",
                  }}
                >
                  Reservar Data
                </a>
                <a
                  href="https://wa.me/351934680300"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                    backgroundColor: "rgba(37,211,102,0.1)",
                    border: "1px solid rgba(37,211,102,0.22)",
                    color: "#25D366", padding: "14px 24px", borderRadius: "100px",
                    textDecoration: "none", fontWeight: 500, fontSize: "0.78rem",
                    fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
                  }}
                >
                  <IconWhatsApp size={20} /> +351 934 680 300
                </a>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                  <a href="/" style={{
                    color: "#FAF7F0", fontSize: "0.66rem",
                    fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
                    fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase",
                    display: "flex", alignItems: "center", textDecoration: "none",
                  }}>
                    PT <FlagPT />
                  </a>
                  <a href="/en" style={{
                    color: "rgba(250,247,240,0.28)", fontSize: "0.66rem",
                    fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
                    fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase",
                    display: "flex", alignItems: "center", textDecoration: "none",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.28)"}
                  >
                    EN <FlagEN />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
