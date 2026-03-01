"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Flag SVGs ───────────────────────────────────────────────────────────────
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
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconEmail = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// ─── Pressed Botanical Sprig — footer divider ─────────────────────────────────
const PressedSprig = () => (
  <svg viewBox="0 0 200 90" width="110" height="50" fill="none" aria-hidden="true"
    style={{ display: "block", margin: "0 auto", opacity: 0.55 }}>
    <line x1="100" y1="4" x2="100" y2="86" stroke="#8BA888" strokeWidth="0.7"/>
    <ellipse cx="86" cy="24" rx="14" ry="6" fill="#8BA888" opacity="0.35" transform="rotate(-40 86 24)"/>
    <ellipse cx="84" cy="46" rx="11" ry="5" fill="#8BA888" opacity="0.25" transform="rotate(-32 84 46)"/>
    <ellipse cx="87" cy="65" rx="9" ry="4" fill="#8BA888" opacity="0.18" transform="rotate(-28 87 65)"/>
    <ellipse cx="114" cy="34" rx="14" ry="6" fill="#8BA888" opacity="0.35" transform="rotate(40 114 34)"/>
    <ellipse cx="116" cy="55" rx="11" ry="5" fill="#8BA888" opacity="0.25" transform="rotate(32 116 55)"/>
    <circle cx="100" cy="6" r="3.5" fill="#B8954A" opacity="0.4"/>
    <circle cx="100" cy="6" r="1.5" fill="#B8954A" opacity="0.6"/>
  </svg>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
function SiteFooter() {
  const navLinks = [
    { href: "/passo-a-passo",       label: "Como Funciona" },
    { href: "/opcoes-e-precos",     label: "Opções e Preços" },
    { href: "/recriacao",           label: "Recriação de Bouquet" },
    { href: "/vale-presente",       label: "Vale-Presente" },
    { href: "/perguntas-frequentes",label: "Perguntas Frequentes" },
    { href: "/contactos",           label: "Contactos e Equipa" },
  ];

  return (
    <footer style={{ backgroundColor: "#0F1E1A", color: "#FAF7F0", position: "relative" }}>
      <div style={{ paddingTop: "56px", paddingBottom: "8px" }}>
        <PressedSprig/>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 24px 0" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
            color: "#FAF7F0", margin: "0 0 8px", lineHeight: 1.05
          }}>
            Flores à Beira&#8209;Rio
          </h2>
          <p style={{
            fontSize: "0.65rem", letterSpacing: "4px",
            textTransform: "uppercase", color: "#8BA888",
            margin: "0 0 24px", fontFamily: "Roboto, sans-serif"
          }}>
            Atelier de Preservação Botânica · Coimbra, Portugal
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            {[
              { href: "https://instagram.com/floresabeirario", icon: <IconInstagram/>, label: "Instagram" },
              { href: "https://facebook.com/floresabeirario",  icon: <IconFacebook/>,  label: "Facebook" },
              { href: "https://wa.me/351934680300",             icon: <IconWhatsApp/>,  label: "WhatsApp" },
              { href: "mailto:info@floresabeirario.pt",         icon: <IconEmail/>,     label: "Email" },
            ].map((s, i) => (
              <a key={i} href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer" aria-label={s.label}
                style={{ color: "rgba(250,247,240,0.5)", transition: "color 0.25s ease", display: "flex", alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(250,247,240,0.1), transparent)", marginBottom: "44px" }}/>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "36px 48px", marginBottom: "48px" }}>
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(250,247,240,0.35)", marginBottom: "16px", fontFamily: "Roboto, sans-serif" }}>Páginas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {navLinks.map((l, i) => (
                <a key={i} href={l.href} style={{ color: "rgba(250,247,240,0.65)", textDecoration: "none", fontSize: "0.88rem", fontWeight: "300", transition: "color 0.25s ease", lineHeight: 1 }}
                  onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.65)"}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(250,247,240,0.35)", marginBottom: "16px", fontFamily: "Roboto, sans-serif" }}>Contacto</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="https://wa.me/351934680300" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#25D366", color: "#fff", padding: "10px 20px", borderRadius: "100px", textDecoration: "none", fontWeight: "600", fontSize: "0.78rem", letterSpacing: "0.5px", transition: "background-color 0.25s ease", fontFamily: "Roboto, sans-serif", width: "fit-content" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1da851"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#25D366"}
              ><IconWhatsApp/> +351 934 680 300</a>
              <a href="mailto:info@floresabeirario.pt" style={{ color: "rgba(250,247,240,0.6)", fontSize: "0.88rem", textDecoration: "none", fontWeight: "300", transition: "color 0.25s ease" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.6)"}
              >info@floresabeirario.pt</a>
              <p style={{ color: "rgba(250,247,240,0.35)", fontSize: "0.82rem", margin: 0, lineHeight: 1.65, fontWeight: "300" }}>Coimbra, Portugal</p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(250,247,240,0.35)", marginBottom: "16px", fontFamily: "Roboto, sans-serif" }}>Legal</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/politica-de-privacidade", label: "Política de Privacidade" },
                { href: "/termos-e-condicoes",      label: "Termos e Condições" },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{ color: "rgba(250,247,240,0.6)", textDecoration: "none", fontSize: "0.88rem", fontWeight: "300", transition: "color 0.25s ease" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.6)"}
                >{l.label}</a>
              ))}
              <div style={{ marginTop: "8px", display: "flex", gap: "14px" }}>
                <a href="/pt" style={{ color: "#FAF7F0", fontSize: "0.78rem", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center", fontFamily: "Roboto, sans-serif", letterSpacing: "1px" }}>
                  PT <FlagPT/>
                </a>
                <a href="/en" style={{ color: "rgba(250,247,240,0.4)", fontSize: "0.78rem", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center", fontFamily: "Roboto, sans-serif", letterSpacing: "1px", transition: "color 0.25s ease" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(250,247,240,0.8)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.4)"}
                >EN <FlagEN/></a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(250,247,240,0.07)", padding: "20px 0 28px", display: "flex", justifyContent: "center", fontSize: "0.6rem", letterSpacing: "1.5px", color: "rgba(250,247,240,0.25)", fontFamily: "Roboto, sans-serif", textAlign: "center" }}>
          © 2026 FLORES À BEIRA-RIO. TODOS OS DIREITOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const FORM_URL = "https://wkf.ms/3RfoNAc";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLeft = [
    { name: "Como Funciona",        href: "/passo-a-passo" },
    { name: "Opções e Preços",      href: "/opcoes-e-precos" },
    { name: "Recriação de Bouquet", href: "/recriacao" },
  ];
  const menuRight = [
    { name: "Vale-Presente",        href: "/vale-presente" },
    { name: "Perguntas Frequentes", href: "/perguntas-frequentes" },
    { name: "Contactos e Equipa",   href: "/contactos" },
  ];
  const mobileMenu = [...menuLeft, ...menuRight];

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

        {/* ══════ NAV ══════ */}
        <nav style={{
          position: "fixed", top: 0, width: "100%", zIndex: 100,
          backgroundColor: shouldShowScrolled ? "rgba(250,247,240,0.95)" : "transparent",
          backdropFilter: shouldShowScrolled ? "blur(10px)" : "none",
          transition: "all 0.4s ease",
          padding: shouldShowScrolled ? "14px 0" : "24px 0"
        }}>
          {/*
            ── FLEX com logo ABSOLUTE ao centro ──
            As colunas left/right têm flex:1 igual dos dois lados.
            O logo fica position:absolute left:50% — sempre centrado.
            O fundo do logo tapa visualmente qualquer link que passe por baixo.
          */}
          <div className="nav-bar">

            {/* ── ESQUERDA: links desktop ── */}
            <div className="nav-left desktop-only">
              {menuLeft.map(item => (
                <a key={item.name} href={item.href} className="nav-link" style={{
                  fontSize: "0.7rem", fontWeight: "500",
                  textTransform: "uppercase", letterSpacing: "1.3px",
                  color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                  whiteSpace: "nowrap"
                }}>
                  {item.name}
                </a>
              ))}
            </div>

            {/* ── CENTRO: logo — absolute, sempre centrado ── */}
            <motion.a
              href="/"
              className="nav-logo"
              animate={{
                opacity: shouldShowScrolled ? 1 : 0,
                y: shouldShowScrolled ? 0 : 8
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                pointerEvents: shouldShowScrolled ? "auto" : "none",
                /* fundo para tapar links que passem por baixo */
                backgroundColor: shouldShowScrolled
                  ? "rgba(250,247,240,0)" /* transparente — a nav já tem bg */
                  : "transparent"
              }}>
              Flores à Beira&#8209;Rio
            </motion.a>

            {/* ── DIREITA: links desktop + PT/EN + CTA + botão mobile ── */}
            <div className="nav-right-col">
              {/* Links desktop */}
              <div className="nav-right desktop-only">
                {menuRight.map(item => (
                  <a key={item.name} href={item.href} className="nav-link" style={{
                    fontSize: "0.7rem", fontWeight: "500", textTransform: "uppercase",
                    letterSpacing: "1.3px", color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                    whiteSpace: "nowrap"
                  }}>
                    {item.name}
                  </a>
                ))}

                {/* ── PT flag com dropdown EN ── */}
                <div className="lang-container" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <a href="/pt" className="nav-link lang-trigger" style={{
                    fontSize: "0.7rem", fontWeight: "500", textTransform: "uppercase",
                    letterSpacing: "1.3px", color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                    display: "flex", alignItems: "center", cursor: "pointer"
                  }}>
                    PT <FlagPT/>
                  </a>
                  <div className="lang-dropdown">
                    <a href="/en" className="lang-dropdown-item" style={{
                      fontSize: "0.7rem", fontWeight: "500", textTransform: "uppercase",
                      letterSpacing: "1.3px", display: "flex", alignItems: "center",
                      color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                      background: shouldShowScrolled ? "rgba(250,247,240,0.95)" : "rgba(0,0,0,0.2)",
                      backdropFilter: "blur(12px)",
                      padding: "9px 14px", borderRadius: "6px",
                      border: `1px solid ${shouldShowScrolled ? "rgba(26,26,26,0.08)" : "rgba(255,255,255,0.12)"}`,
                      textDecoration: "none", transition: "background 0.3s ease"
                    }}>
                      EN <FlagEN/>
                    </a>
                  </div>
                </div>

                {/* ── CTA ── */}
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

              {/* ── Botão MENU mobile ── */}
              <button className="mobile-only nav-mobile-btn" onClick={() => setIsOpen(true)} style={{
                color: shouldShowScrolled ? "#1a1a1a" : "#fff"
              }}>
                MENU
              </button>
            </div>

          </div>
        </nav>

        {/* ══════ MOBILE MENU ══════ */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "fixed", inset: 0,
                backgroundColor: "#FAF7F0", zIndex: 200,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
              }}
            >
              <button onClick={() => setIsOpen(false)} style={{
                position: "absolute", top: "28px", right: "24px",
                background: "none", border: "none",
                fontSize: "0.82rem", fontWeight: "500",
                letterSpacing: "2px", cursor: "pointer",
                fontFamily: "'Roboto', sans-serif"
              }}>
                FECHAR
              </button>

              {mobileMenu.map(item => (
                <a key={item.name} href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="nav-link"
                  style={{
                    color: "#1a1a1a", fontSize: "clamp(1.3rem,4.5vw,1.8rem)",
                    margin: "11px 0", fontFamily: "'TAN-MEMORIES', serif"
                  }}>
                  {item.name}
                </a>
              ))}

              <a href={FORM_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                style={{
                  display: "inline-block", marginTop: "30px",
                  backgroundColor: "#3D6B5E", color: "#FAF7F0",
                  padding: "15px 38px", borderRadius: "100px",
                  textDecoration: "none", fontWeight: "600",
                  fontSize: "0.8rem", letterSpacing: "1.5px",
                  textTransform: "uppercase", fontFamily: "Roboto, sans-serif",
                  boxShadow: "0 6px 22px rgba(61,107,94,0.28)"
                }}
              >
                Reservar Data
              </a>

              <div style={{
                display: "flex", gap: "24px", marginTop: "26px",
                borderTop: "1px solid rgba(26,26,26,0.08)", paddingTop: "22px"
              }}>
                <a href="/pt" style={{ color: "#1a1a1a", fontSize: "1rem", fontFamily: "'TAN-MEMORIES', serif", display: "flex", alignItems: "center", textDecoration: "none" }}>
                  PT <FlagPT/>
                </a>
                <a href="/en" style={{ color: "#1a1a1a", fontSize: "1rem", fontFamily: "'TAN-MEMORIES', serif", display: "flex", alignItems: "center", textDecoration: "none", opacity: 0.4 }}>
                  EN <FlagEN/>
                </a>
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

          /* ══════════════════════════════════════════════════════════
             NAV BAR — flex com logo ABSOLUTE centrado
             - .nav-left  e .nav-right-col têm flex:1 igual → ocupam o mesmo espaço
             - .nav-logo é position:absolute left:50% transform:translateX(-50%)
               → fica sempre no centro geométrico do ecrã, sem depender dos lados
             - Se os links ultrapassarem o espaço disponível, o overflow:hidden
               na coluna esquerda impede sobreposição visual
          ══════════════════════════════════════════════════════════ */
          .nav-bar {
            position: relative;
            display: flex;
            align-items: center;
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 24px;
            min-height: 32px;
          }
          @media (min-width: 1200px) {
            .nav-bar { padding: 0 32px; }
          }

          /* Esquerda: flex:1 → ocupa metade do espaço disponível */
          .nav-left {
            flex: 1;
            display: flex;
            gap: clamp(10px, 1.4vw, 22px);
            align-items: center;
            justify-content: flex-start;
            overflow: hidden; /* impede links de chegarem ao centro */
          }

          /* Logo — absolute, sempre no centro do ecrã */
          .nav-logo {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: clamp(1rem, 1.5vw, 1.4rem);
            font-family: 'TAN-MEMORIES', serif;
            text-align: center;
            text-decoration: none !important;
            line-height: 1.1;
            letter-spacing: 0.5px;
            white-space: nowrap;
            padding: 4px 12px;
            border-bottom: 1px solid transparent;
            transition: all 0.3s ease;
            z-index: 2;
            /* padding lateral para nunca colidir com links mesmo visualmente */
          }
          .nav-logo:hover {
            border-bottom: 1px solid currentColor;
          }

          /* Direita: flex:1 → ocupa a outra metade, conteúdo alinhado à direita */
          .nav-right-col {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }

          .nav-right {
            display: flex;
            gap: clamp(10px, 1.4vw, 20px);
            align-items: center;
          }

          /* Mobile menu button — alinhado à direita pela nav-right-col */
          .nav-mobile-btn {
            background: none; border: none; cursor: pointer;
            font-size: 0.82rem; font-weight: 500; letter-spacing: 2px;
            padding: 10px 0; font-family: 'Roboto', sans-serif;
          }

          h1, h2, h3, .serif { font-family: 'TAN-MEMORIES', serif !important; font-weight: 400; line-height: 1.1; }
          .italic { font-style: italic !important; }

          .nav-link {
            text-decoration: none !important;
            transition: all 0.3s ease;
            display: inline-block;
            border-bottom: 1px solid transparent;
            line-height: 1.4;
            padding-bottom: 2px;
          }
          .nav-link:hover { border-bottom: 1px solid currentColor; }

          /* Language dropdown — sem sublinhado no hover */
          .lang-trigger { border-bottom: 1px solid transparent !important; }
          .lang-trigger:hover { border-bottom: 1px solid currentColor !important; }

          .lang-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            padding-top: 10px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-6px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
          }
          .lang-container:hover .lang-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: auto;
          }

          /* CTA button */
          .nav-cta {
            display: inline-flex;
            align-items: center;
            font-size: 0.66rem;
            font-weight: 600;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            text-decoration: none !important;
            font-family: Roboto, sans-serif;
            padding: 8px 18px;
            border-radius: 100px;
            transition: all 0.3s ease;
            white-space: nowrap;
          }
          .nav-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(61,107,94,0.32) !important;
          }
        `}</style>
      </body>
    </html>
  );
}
