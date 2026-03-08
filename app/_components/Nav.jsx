// app/_components/Nav.jsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FlagPT, FlagEN, IconWhatsApp } from "./Icons";
import { NAV_PRESERVACAO, NAV_MOMENTOS, NAV_RIGHT } from "../_lib/data/navigation";
import { FORM_URL } from "../_lib/constants";

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
        letterSpacing: "1.3px", color: textColor, whiteSpace: "nowrap",
        display: "inline-flex", alignItems: "center",
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
          justifyContent: "space-between", padding: "18px 28px",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(1.15rem, 4.5vw, 1.45rem)",
          color: open ? "#8BA888" : "#FAF7F0",
          lineHeight: 1.1, transition: "color 0.2s", letterSpacing: "0.2px",
        }}>
          {menu.label}
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
              fontSize: "0.72rem", fontFamily: "Roboto, sans-serif", fontWeight: 600,
              letterSpacing: "1.5px", textTransform: "uppercase",
              padding: "2px 28px 14px", transition: "color 0.18s",
            }}>
              Ver tudo
            </a>
            {menu.items.map((item, i) => (
              <a key={i} href={item.href} onClick={onClose} style={{
                display: "block", color: "rgba(250,247,240,0.5)", textDecoration: "none",
                fontSize: "0.93rem", fontFamily: "Roboto, sans-serif", fontWeight: 400,
                padding: "12px 28px 12px 36px",
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

          {/* LEFT */}
          <div className="nav-left">
            <div className="lang-container desktop-only" style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <a href="/" className="nav-link lang-trigger" style={{
                fontSize: "0.68rem", fontWeight: "500", textTransform: "uppercase",
                letterSpacing: "1.3px", color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                display: "flex", alignItems: "center", cursor: "pointer",
              }}>
                PT <FlagPT />
              </a>
              <div className="lang-dropdown" style={{ left: 0, right: "auto" }}>
                <a href="/en" style={{
                  fontSize: "0.68rem", fontWeight: "500", textTransform: "uppercase",
                  letterSpacing: "1.3px", display: "flex", alignItems: "center",
                  color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                  background: shouldShowScrolled ? "rgba(250,247,240,0.95)" : "rgba(0,0,0,0.2)",
                  backdropFilter: "blur(12px)", padding: "9px 14px", borderRadius: "6px",
                  border: `1px solid ${shouldShowScrolled ? "rgba(26,26,26,0.08)" : "rgba(255,255,255,0.12)"}`,
                  textDecoration: "none", transition: "background 0.3s ease",
                }}>
                  EN <FlagEN />
                </a>
              </div>
            </div>

            <DesktopDropdown menu={NAV_PRESERVACAO} scrolled={shouldShowScrolled} />
            <DesktopDropdown menu={NAV_MOMENTOS}    scrolled={shouldShowScrolled} />
          </div>

          {/* CENTER */}
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

          {/* RIGHT */}
          <div className="nav-right-col">
            <div className="nav-right desktop-only">
              {NAV_RIGHT.map(item => (
                <a key={item.name} href={item.href} className="nav-link" style={{
                  fontSize: "0.68rem", fontWeight: "500", textTransform: "uppercase",
                  letterSpacing: "1.3px", color: shouldShowScrolled ? "#1a1a1a" : "#fff", whiteSpace: "nowrap",
                }}>
                  {item.name}
                </a>
              ))}
              
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
                style={{
                  backgroundColor: shouldShowScrolled ? "#3D6B5E" : "rgba(250,247,240,0.12)",
                  color: shouldShowScrolled ? "#FAF7F0" : "rgba(250,247,240,0.92)",
                  border: shouldShowScrolled
                    ? "1.5px solid #3D6B5E"
                    : "1.5px solid rgba(250,247,240,0.35)",
                  backdropFilter: shouldShowScrolled ? "none" : "blur(8px)",
                  boxShadow: shouldShowScrolled
                    ? "0 3px 14px rgba(61,107,94,0.22)"
                    : "none",
                }}
              >
                Reservar Data
              </a>
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

      {/* Mobile menu */}
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
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: item.delay, duration: 0.24 }}
                    style={{
                      display: "block", color: "#FAF7F0", textDecoration: "none",
                      fontFamily: "'TAN-MEMORIES', serif",
                      fontSize: "clamp(1.15rem, 4.5vw, 1.45rem)",
                      lineHeight: 1.1, letterSpacing: "0.2px",
                      padding: "18px 28px",
                      borderBottom: "1px solid rgba(250,247,240,0.07)",
                      transition: "color 0.18s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#8BA888"}
                    onMouseLeave={e => e.currentTarget.style.color = "#FAF7F0"}
                  >
                    {item.name}
                  </motion.a>
                ))}
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
                    backgroundColor: "#3D6B5E", color: "#FAF7F0",
                    padding: "15px 24px", borderRadius: "100px", textDecoration: "none",
                    fontWeight: 600, fontSize: "0.76rem", letterSpacing: "1.5px",
                    textTransform: "uppercase", fontFamily: "Roboto, sans-serif",
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
                    fontSize: "0.78rem", fontFamily: "Roboto, sans-serif",
                  }}
                >
                  <IconWhatsApp size={20} /> +351 934 680 300
                </a>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                  <a href="/" style={{
                    color: "#FAF7F0", fontSize: "0.66rem", fontFamily: "Roboto, sans-serif",
                    fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase",
                    display: "flex", alignItems: "center", textDecoration: "none",
                  }}>
                    PT <FlagPT />
                  </a>
                  <a href="/en" style={{
                    color: "rgba(250,247,240,0.28)", fontSize: "0.66rem", fontFamily: "Roboto, sans-serif",
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
