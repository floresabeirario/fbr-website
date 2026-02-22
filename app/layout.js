"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ícone da Bandeira (SVG)
const FlagEN = () => (
  <svg width="16" height="12" viewBox="0 0 640 480" style={{ marginLeft: '8px', borderRadius: '2px', verticalAlign: 'middle' }}>
    <path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 245 180L565 0h75v56L396 240l244 184v56h-75L320 300 75 480H0v-56l244-184L0 56V0h75z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM216 199 0 40V0l271 199h-55zm-216 241 216-159h55L0 480v-40zm640 0L424 281h55l161 119v40zM0 190h640v100H0z"/><path fill="#FFF" d="M270 0h100v480H270z"/><path fill="#C8102E" d="M0 210h640v60H0zM300 0h40v480h-40z"/>
  </svg>
);

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { name: "FAQ", href: "/faq" },
    { name: "Contactos e Equipa", href: "/contactos" },
    { name: "EN", href: "/en", hasFlag: true },
  ];

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
          backgroundColor: scrolled ? 'rgba(252, 251, 249, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.4s ease',
          padding: scrolled ? '15px 0' : '30px 0'
        }}>
          <div style={{ 
            maxWidth: '1400px', margin: '0 auto', padding: '0 40px', 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
          }}>
            
            <div className="desktop-only" style={{ display: 'flex', gap: '25px', flex: 1 }}>
              {menuLeft.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="nav-link"
                  style={{ 
                    fontSize: '0.7rem', fontWeight: '500', 
                    textTransform: 'uppercase', letterSpacing: '1.5px',
                    color: scrolled ? '#1a1a1a' : '#fff'
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <motion.a 
              href="/" 
              initial={{ opacity: 0 }}
              animate={{ opacity: scrolled ? 1 : 0 }}
              className="nav-link"
              style={{ 
                color: scrolled ? '#1a1a1a' : '#fff', 
                fontSize: '1.6rem', fontFamily: "'TAN-MEMORIES', serif", 
                textAlign: 'center', flex: '0 0 auto', padding: '0 40px',
                pointerEvents: scrolled ? 'auto' : 'none'
              }}>
              Flores à Beira-Rio
            </motion.a>

            <div className="desktop-only" style={{ display: 'flex', gap: '25px', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              {menuRight.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="nav-link"
                  style={{ 
                    fontSize: '0.7rem', fontWeight: '500', 
                    textTransform: 'uppercase', letterSpacing: '1.5px',
                    color: scrolled ? '#1a1a1a' : '#fff',
                    display: 'flex', alignItems: 'center'
                  }}
                >
                  {item.name} {item.hasFlag && <FlagEN />}
                </a>
              ))}
            </div>

            <button className="mobile-only" onClick={() => setIsOpen(true)} style={{ 
              background: 'none', border: 'none', cursor: 'pointer',
              color: scrolled ? '#1a1a1a' : '#fff',
              fontSize: '0.8rem', fontWeight: '500', letterSpacing: '2px'
            }}>
              MENU
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, backgroundColor: '#FCFBF9', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer' }}>FECHAR</button>
              {[...menuLeft, ...menuRight].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)} 
                  className="nav-link"
                  style={{ 
                    color: '#1a1a1a', fontSize: '1.8rem', margin: '15px 0', fontFamily: "'TAN-MEMORIES', serif", display: 'flex', alignItems: 'center'
                  }}
                >
                  {item.name} {item.hasFlag && <FlagEN />}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main>{children}</main>

        <style jsx global>{`
          @media (max-width: 1023px) { .desktop-only { display: none !important; } }
          @media (min-width: 1024px) { .mobile-only { display: none !important; } }
          h1, h2, h3, .serif { font-family: 'TAN-MEMORIES', serif !important; font-weight: 400; line-height: 1.1; }
          .italic { font-style: italic !important; }
          
          /* O SEGREDO ESTÁ AQUI: Controlamos o sublinhado à força no CSS */
          .nav-link {
            text-decoration: none !important; 
            text-underline-offset: 6px;
            text-decoration-thickness: 1px;
            transition: all 0.3s ease;
          }
          .nav-link:hover {
            text-decoration: underline !important;
          }
        `}</style>
      </body>
    </html>
  );
}
