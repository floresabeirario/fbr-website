// app/_components/Nav.jsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FlagPT, FlagEN, IconWhatsApp } from "./Icons";
import { NAV_PRESERVACAO, NAV_MOMENTOS, NAV_RIGHT } from "../_lib/data/navigation";
import { FORM_URL } from "../_lib/constants";

// Mapeamento de páginas para cores do botão CTA
const PAGE_COLORS = {
  "/oferecer-preservacao":              { bg: "#4A7BA8", hover: "#2D5C82", shadow: "rgba(74,123,168,0.32)" },
  "/preservar-bouquet-noiva":           { bg: "#A87B8C", hover: "#82576A", shadow: "rgba(168,123,140,0.32)" },
  "/preservar-flores-luto-homenagem":   { bg: "#6B7A8D", hover: "#4A5768", shadow: "rgba(107,122,141,0.32)" },
  "/preservar-flores-batizado-nascimento": { bg: "#7BA88C", hover: "#578268", shadow: "rgba(123,168,140,0.32)" },
  "/preservar-flores-aniversario":      { bg: "#A8886B", hover: "#826448", shadow: "rgba(168,136,107,0.32)" },
  "/preservar-flores-pedido-casamento": { bg: "#A86B7B", hover: "#824857", shadow: "rgba(168,107,123,0.32)" },
  "/recriacao":                         { bg: "#8B6BA8", hover: "#674882", shadow: "rgba(139,107,168,0.32)" },
};

const DEFAULT_CTA_COLOR = { bg: "#3D6B5E", hover: "#1E2D2A", shadow: "rgba(61,107,94,0.32)" };

const MOBILE_ICONS = {
  "/preservacao-de-flores": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C12 2 6 6 6 12a6 6 0 0 0 12 0c0-6-6-10-6-10z"/>
      <path d="M12 12V22"/>
    </svg>
  ),
  "/momentos-especiais": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  "/recriacao": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  ),
  "/oferecer-preservacao": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 1 4 0"/>
      <path d="M12 12v5M9.5 14.5l2.5-2.5 2.5 2.5"/>
    </svg>
  ),
  "/perguntas-frequentes": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2"/>
    </svg>
  ),
  "/contactos": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  "/blog": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      <line x1="8" y1="7" x2="16" y2="7"/>
      <line x1="8" y1="11" x2="16" y2="11"/>
      <line x1="8" y1="15" x2="12" y2="15"/>
    </svg>
  ),
};

const Chevron = ({ open, color, size = 10 }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 10 10" fill="none"
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.22, ease: "easeInOut" }}
    style={{ marginLeft: "4px", flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M2 3.5L5 6.5L8 3.5" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </motion.svg>
);

const DesktopDropdown = ({ menu, scrolled }) => {
  const textColor = scrolled ? "#1a1a1a" : "#fff";
  return (
    <div className="dd-container desktop-only">
      <a href={menu.href} className="nav-link dd-trigger" style={{
        fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase",
        letterSpacing: "1.3px", color: textColor,
        display: "inline-flex", alignItems: "center",
        whiteSpace: "nowrap",
      }}>
        {menu.label}
        <Chevron color={textColor} />
      </a>
      <div className="dd-panel">
        <div className="dd-panel-inner">
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
      </div>
    </div>
  );
};

const MobileAccordion = ({ menu, onClose, delay }) => {
  const [open, setOpen] = useState(false);
  const icon = MOBILE_ICONS[menu.href];
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
        aria-controls={`mobile-menu-${menu.href.replace("/", "")}`}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "16px 28px",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {icon && (
            <span style={{ color: open ? "#8BA888" : "rgba(250,247,240,0.35)", flexShrink: 0, transition: "color 0.2s" }}>
              {icon}
            </span>
          )}
          <span style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
            color: open ? "#8BA888" : "#FAF7F0",
            lineHeight: 1.1, transition: "color 0.2s", letterSpacing: "0.2px",
          }}>
            {menu.label}
          </span>
        </span>
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          style={{ flexShrink: 0, color: open ? "#8BA888" : "rgba(250,247,240,0.35)" }}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`mobile-menu-${menu.href.replace("/", "")}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <a href={menu.href} onClick={onClose} style={{
              display: "block", color: "rgba(139,168,136,0.7)", textDecoration: "none",
              fontSize: "0.72rem", fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif", fontWeight: 600,
              letterSpacing: "1.5px", textTransform: "uppercase",
              padding: "2px 28px 14px 62px", transition: "color 0.18s",
            }}>
              Ver tudo
            </a>
            {menu.items.map((item, i) => (
              <a key={i} href={item.href} onClick={onClose} style={{
                display: "block", color: "rgba(250,247,240,0.5)", textDecoration: "none",
                fontSize: "0.93rem", fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif", fontWeight: 400,
                padding: "12px 28px 12px 62px",
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

function NavCTA({ shouldShowScrolled, pathname }) {
  const pageColor = PAGE_COLORS[pathname] || DEFAULT_CTA_COLOR;
  const bgColor     = shouldShowScrolled ? pageColor.bg : "rgba(250,247,240,0.12)";
  const textColor   = shouldShowScrolled ? "#FAF7F0" : "rgba(250,247,240,0.92)";
  const borderColor = shouldShowScrolled ? `1.5px solid ${pageColor.bg}` : "1.5px solid rgba(250,247,240,0.35)";
  const bdFilter    = shouldShowScrolled ? "none" : "blur(8px)";
  const shadow      = shouldShowScrolled ? `0 3px 14px ${pageColor.shadow}` : "none";

  return (
    <a
      href={FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-cta"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: borderColor,
        backdropFilter: bdFilter,
        boxShadow: shadow,
        transition: "all 0.4s ease",
      }}
    >
      Reservar Data
    </a>
  );
}

export default function NavClient() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname  = usePathname();
  const isHome    = pathname === "/";

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const shouldShowScrolled = scrolled || !isHome;
  const ctaPageColor = PAGE_COLORS[pathname] || DEFAULT_CTA_COLOR;

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navegação principal"
        style={{
          position: "fixed", top: 0, width: "100%", zIndex: 100,
          backgroundColor: shouldShowScrolled ? "rgba(250,247,240,0.95)" : "transparent",
          backdropFilter: shouldShowScrolled ? "blur(10px)" : "none",
          transition: "all 0.4s ease",
          padding: shouldShowScrolled ? "14px 0" : "24px 0",
        }}
      >
        <div className="nav-bar">

          <div className="nav-left">
            <NavCTA shouldShowScrolled={shouldShowScrolled} pathname={pathname} />
            <DesktopDropdown menu={NAV_PRESERVACAO} scrolled={shouldShowScrolled} />
            <DesktopDropdown menu={NAV_MOMENTOS}    scrolled={shouldShowScrolled} />
          </div>

          <motion.a
            href="/"
            className="nav-logo"
            animate={{ opacity: shouldShowScrolled ? 1 : 0, y: shouldShowScrolled ? 0 : 8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ color: shouldShowScrolled ? "#1a1a1a" : "#fff", pointerEvents: shouldShowScrolled ? "auto" : "none" }}
            aria-label="Flores à Beira-Rio — página inicial"
          >
            Flores à Beira&#8209;Rio
          </motion.a>

          <div className="nav-right-col">
            <div className="nav-right desktop-only">
              {NAV_RIGHT.filter(item => item.name !== "Blog").map(item => (
                <a key={item.name} href={item.href} className="nav-link" style={{
                  fontSize: "0.68rem", fontWeight: "500", textTransform: "uppercase",
                  letterSpacing: "1.3px", color: shouldShowScrolled ? "#1a1a1a" : "#fff", whiteSpace: "nowrap",
                }}>
                  {item.name === "Contactos" ? "Contactos e Equipa" : item.name}
                </a>
              ))}
              <div className="lang-container" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <a href="/" className="nav-link lang-trigger" style={{
                  fontSize: "0.68rem", fontWeight: "500", textTransform: "uppercase",
                  letterSpacing: "1.3px", color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                  display: "flex", alignItems: "center", cursor: "pointer",
                }}>
                  PT <FlagPT />
                </a>
                <div className="lang-dropdown" style={{ right: 0, left: "auto" }}>
                  <a href="/en" style={{
                    fontSize: "0.68rem", fontWeight: "500", textTransform: "uppercase",
                    letterSpacing: "1.3px", display: "flex", alignItems: "center",
                    color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                    background: shouldShowScrolled ? "rgba(250,247,240,0.95)" : "rgba(0,0,0,0.2)",
                    backdropFilter: "blur(12px)", padding: "9px 14px", borderRadius: "6px",
                    border: shouldShowScrolled ? "1px solid rgba(26,26,26,0.08)" : "1px solid rgba(255,255,255,0.12)",
                    textDecoration: "none", transition: "background 0.3s ease",
                  }}>
                    EN <FlagEN />
                  </a>
                </div>
              </div>
            </div>

            <button
              className="mobile-only nav-mobile-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={isOpen}
              style={{ color: shouldShowScrolled ? "#1a1a1a" : "#fff", marginLeft: "auto" }}
            >
              MENU
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed", inset: 0,
                backgroundColor: "rgba(15,30,26,0.55)",
                zIndex: 199, backdropFilter: "blur(3px)",
              }}
              aria-hidden="true"
            />
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
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 28px", borderBottom: "1px solid rgba(250,247,240,0.07)", flexShrink: 0,
              }}>
                <a href="/" onClick={() => setIsOpen(false)} style={{
                  fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem",
                  color: "#FAF7F0", textDecoration: "none",
                }}>
                  Flores à Beira&#8209;Rio
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar menu"
                  style={{
                    background: "none", border: "none",
                    color: "rgba(250,247,240,0.45)", cursor: "pointer", padding: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <nav aria-label="Menu móvel" style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
                <MobileAccordion menu={NAV_PRESERVACAO} onClose={() => setIsOpen(false)} delay={0.06} />
                <MobileAccordion menu={NAV_MOMENTOS}    onClose={() => setIsOpen(false)} delay={0.10} />
                {[
                  { name: "Recriação de Bouquet", href: "/recriacao",            delay: 0.15 },
                  { name: "Oferecer Preservação", href: "/oferecer-preservacao", delay: 0.18 },
                  { name: "Perguntas Frequentes", href: "/perguntas-frequentes", delay: 0.21 },
                  { name: "Contactos e Equipa",   href: "/contactos",            delay: 0.24 },
                  { name: "Blog",                 href: "/blog",                 delay: 0.27 },
                ].map((item) => {
                  const icon = MOBILE_ICONS[item.href];
                  return (
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
                      {icon && (
                        <span style={{ color: "rgba(250,247,240,0.35)", flexShrink: 0 }}>
                          {icon}
                        </span>
                      )}
                      <span style={{
                        fontFamily: "'TAN-MEMORIES', serif",
                        fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
                        lineHeight: 1.1, letterSpacing: "0.2px",
                      }}>
                        {item.name}
                      </span>
                    </motion.a>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                style={{
                  padding: "20px 28px 44px",
                  borderTop: "1px solid rgba(250,247,240,0.07)",
                  flexShrink: 0, display: "flex", flexDirection: "column", gap: "10px",
                }}
              >
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundColor: ctaPageColor.bg, color: "#FAF7F0",
                    padding: "15px 24px", borderRadius: "100px", textDecoration: "none",
                    fontWeight: 600, fontSize: "0.76rem", letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
                    transition: "background 0.4s ease",
                  }}
                >
                  Reservar Data
                </a>
                <a href="https://wa.me/351934680300" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                    backgroundColor: "rgba(37,211,102,0.1)",
                    border: "1px solid rgba(37,211,102,0.22)",
                    color: "#25D366", padding: "14px 24px", borderRadius: "100px",
                    textDecoration: "none", fontWeight: 500,
                    fontSize: "0.78rem",
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
