"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "EN", href: "/en" },
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
          height: scrolled ? '80px' : '100vh',
          backgroundColor: scrolled ? 'rgba(252, 251, 249, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', alignItems: 'center', pointerEvents: 'none'
        }}>
          <div style={{ 
            maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 40px', 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            pointerEvents: 'auto'
          }}>
            
            {/* MENU ESQUERDA */}
            <div className="desktop-only" style={{ display: 'flex', gap: '30px', flex: 1, opacity: scrolled ? 1 : 0, transition: '0.4s' }}>
              {menuLeft.map((item) => (
                <a key={item.name} href={item.href} style={{ textDecoration: 'none', color: scrolled ? '#1a1a1a' : '#fff', fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{item.name}</a>
              ))}
            </div>

            {/* LOGO CENTRAL (O Título que viaja) */}
            <motion.div
              style={{ 
                position: scrolled ? 'relative' : 'absolute',
                left: scrolled ? 'auto' : '50%',
                top: scrolled ? 'auto' : '50%',
                transform: scrolled ? 'none' : 'translate(-50%, -50%)',
                textAlign: 'center', zIndex: 105
              }}
              animate={{ 
                scale: scrolled ? 0.6 : 1,
                y: scrolled ? 0 : 0, 
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="/" style={{ 
                textDecoration: 'none', 
                color: scrolled ? '#1a1a1a' : '#fff', 
                fontSize: scrolled ? '2rem' : 'clamp(3.5rem, 10vw, 7rem)', 
                fontFamily: "'TAN-MEMORIES', serif",
                whiteSpace: 'nowrap',
                transition: 'color 0.4s'
              }}>
                Flores à Beira-Rio
              </a>
              {!scrolled && (
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '6px', fontSize: '1rem', marginTop: '20px', fontWeight: '300' }}>
                  Especialistas em preservação de flores
                </motion.p>
              )}
            </motion.div>

            {/* MENU DIREITA */}
            <div className="desktop-only" style={{ display: 'flex', gap: '30px', flex: 1, justifyContent: 'flex-end', opacity: scrolled ? 1 : 0, transition: '0.4s' }}>
              {menuRight.map((item) => (
                <a key={item.name} href={item.href} style={{ textDecoration: 'none', color: scrolled ? '#1a1a1a' : '#fff', fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{item.name}</a>
              ))}
            </div>

            {/* HAMBURGER (Mobile) */}
            <button className="mobile-only" onClick={() => setIsOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: '25px', height: '1px', backgroundColor: scrolled ? '#1a1a1a' : '#fff', margin: '6px 0' }} />
              <div style={{ width: '25px', height: '1px', backgroundColor: scrolled ? '#1a1a1a' : '#fff', margin: '6px 0' }} />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, backgroundColor: '#FCFBF9', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', fontSize: '2rem' }}>×</button>
              {[...menuLeft, ...menuRight].map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '2rem', margin: '15px 0', fontFamily: "'TAN-MEMORIES', serif" }}>{item.name}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main>{children}</main>

        <style jsx global>{`
          @media (max-width: 1023px) { .desktop-only { display: none !important; } }
          @media (min-width: 1024px) { .mobile-only { display: none !important; } }
          h1, h2, h3, .serif { font-family: 'TAN-MEMORIES', serif !important; font-weight: 400; }
          .italic { font-style: italic !important; }
        `}</style>
      </body>
    </html>
  );
}
