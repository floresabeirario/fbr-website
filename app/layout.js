"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Ícone da Bandeira de Portugal (SVG Simplificado)
const FlagPT = () => (
  <svg width="16" height="12" viewBox="0 0 600 400" style={{ marginLeft: '8px', borderRadius: '2px', verticalAlign: 'middle' }}>
    <rect width="240" height="400" fill="#006600"/>
    <rect x="240" width="360" height="400" fill="#ff0000"/>
    {/* Versão simplificada do brasão para tamanho pequeno */}
    <circle cx="240" cy="200" r="80" fill="#ffff00"/>
    <circle cx="240" cy="200" r="50" fill="#ffffff"/>
    <path d="M240 160 v80 M210 200 h60" stroke="#ff0000" strokeWidth="10"/>
  </svg>
);

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLeft = [
    { name: "Opções e Preços", href: "/opcoes-e-precos" },
    { name: "Passo a Passo", href: "/passo-a-passo" },
    { name: "Recriação de Bouquet", href: "/recriacao" },
  ];

  const menuRight = [
    { name: "Vale-Presente", href: "/vale-presente" },
    { name: "Perguntas Frequentes", href: "/perguntas-frequentes" },
    { name: "Contactos e Equipa", href: "/contactos" },
    { name: "PT", href: "/pt", hasFlag: true }, // Alterado para PT com bandeira portuguesa
  ];

  const shouldShowScrolled = scrolled || !isHome;

  return (
    <html lang="pt">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
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
        `}} />
      </head>
      <body style={{ margin: 0, backgroundColor: '#FCFBF9', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
        
        <nav style={{ 
          position: 'fixed', top: 0, width: '100%', zIndex: 100, 
          backgroundColor: shouldShowScrolled ? 'rgba(252, 251, 249, 0.95)' : 'transparent',
          backdropFilter: shouldShowScrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.4s ease',
          padding: shouldShowScrolled ? '15px 0' : '25px 0'
        }}>
          <div className="nav-container">
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div className="desktop-only" style={{ display: 'flex', gap: '25px' }}>
                {menuLeft.map((item) => (
                  <a key={item.name} href={item.href} className="nav-link"
                    style={{ fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1.5px', color: shouldShowScrolled ? '#1a1a1a' : '#fff' }}>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <motion.a 
              href="/" 
              initial={{ opacity: isHome ? 0 : 1 }}
              animate={{ opacity: shouldShowScrolled ? 1 : 0 }}
              className="nav-link logo-central"
              style={{ 
                color: shouldShowScrolled ? '#1a1a1a' : '#fff', 
                fontSize: '1.6rem', fontFamily: "'TAN-MEMORIES', serif", 
                textAlign: 'center', flex: '0 0 auto',
                pointerEvents: shouldShowScrolled ? 'auto' : 'none',
                display: shouldShowScrolled ? 'block' : 'none' 
              }}>
              Flores à Beira-Rio
            </motion.a>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div className="desktop-only" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                {menuRight.map((item) => (
                  <a key={item.name} href={item.href} className="nav-link"
                    style={{ fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1.5px', color: shouldShowScrolled ? '#1a1a1a' : '#fff', display: 'flex', alignItems: 'center' }}>
                    {item.name} {item.hasFlag && <FlagPT />}
                  </a>
                ))}
              </div>
              
              <button className="mobile-only" onClick={() => setIsOpen(true)} style={{ 
                background: 'none', border: 'none', cursor: 'pointer',
                color: shouldShowScrolled ? '#1a1a1a' : '#fff',
                fontSize: '0.8rem', fontWeight: '600', letterSpacing: '2px',
                padding: '10px 0'
              }}>
                MENU
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, backgroundColor: '#FCFBF9', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer' }}>FECHAR</button>
              {[...menuLeft, ...menuRight].map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="nav-link"
                  style={{ color: '#1a1a1a', fontSize: '1.8rem', margin: '15px 0', fontFamily: "'TAN-MEMORIES', serif", display: 'flex', alignItems: 'center' }}>
                  {item.name} {item.hasFlag && <FlagPT />}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main>{children}</main>

        <style jsx global>{`
          @media (max-width: 1023px) { .desktop-only { display: none !important; } }
          @media (min-width: 1024px) { .mobile-only { display: none !important; } }
          .nav-container { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
          @media (min-width: 1024px) { .nav-container { padding: 0 40px; } }
          .logo-central { padding: 0 20px; }
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
          .nav-link:hover {
            border-bottom: 1px solid currentColor;
          }
        `}</style>
      </body>
    </html>
  );
}
