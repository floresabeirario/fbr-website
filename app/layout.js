"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detetar o scroll para mostrar/esconder o nome no menu
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Início", href: "/" },
    { name: "Opções e Preços", href: "/opcoes-e-precos" },
    { name: "Passo a Passo", href: "/passo-a-passo" },
    { name: "Recriação de Bouquet", href: "/recriacao" },
    { name: "Vale-Presente", href: "/vale-presente" },
    { name: "FAQ", href: "/faq" },
    { name: "Contactos e Equipa", href: "/contactos" },
    { name: "EN", href: "/en" },
  ];

  return (
    <html lang="pt">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
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
      <body style={{ margin: 0, fontFamily: "'Inter', sans-serif", backgroundColor: '#FCFBF9', color: '#1a1a1a' }}>
        
        <nav style={{ 
          position: 'fixed', 
          top: 0, width: '100%', zIndex: 100, 
          backgroundColor: scrolled ? 'rgba(252, 251, 249, 0.9)' : 'transparent', 
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.5s ease'
        }}>
          <div style={{ 
            maxWidth: '1200px', margin: '0 auto', padding: '20px 20px', 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
          }}>
            {/* O Nome no menu só aparece quando fazes scroll */}
            <motion.a 
              href="/" 
              initial={{ opacity: 0 }}
              animate={{ opacity: scrolled ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ 
                textDecoration: 'none', color: '#1a1a1a', fontSize: '1.2rem', 
                fontFamily: "'TAN-MEMORIES', serif", letterSpacing: '1px' 
              }}>
              FLORES À BEIRA-RIO
            </motion.a>

            <div className="desktop-menu" style={{ display: 'none', gap: '20px' }}>
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} style={{ 
                  textDecoration: 'none', 
                  color: scrolled ? '#1a1a1a' : '#fff', 
                  fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px',
                  transition: 'color 0.3s ease'
                }}>
                  {item.name}
                </a>
              ))}
            </div>

            <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 101, padding: '10px' }}>
              <div style={{ width: '25px', height: '1.5px', backgroundColor: scrolled ? '#1a1a1a' : '#fff', margin: '5px 0' }} />
              <div style={{ width: '25px', height: '1.5px', backgroundColor: scrolled ? '#1a1a1a' : '#fff', margin: '5px 0' }} />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: '#FCFBF9', zIndex: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
              <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '25px', right: '20px', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#1a1a1a' }}>×</button>
              {menuItems.map((item, i) => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '2rem', margin: '10px 0', fontFamily: "'TAN-MEMORIES', serif" }}>
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main>{children}</main>

        <style jsx global>{`
          @media (min-width: 1024px) {
            .desktop-menu { display: flex !important; }
            nav button { display: none !important; }
          }
          h1, h2, h3, .serif { font-family: 'TAN-MEMORIES', serif !important; font-weight: 400; line-height: 1.1; letter-spacing: -0.5px; }
          p, span, a, button { font-family: 'Inter', sans-serif; font-weight: 400; }
        `}</style>
      </body>
    </html>
  );
}
