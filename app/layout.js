"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

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
        {/* Este bloco de estilo carrega a tua fonte Tay-Bea oficial */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Tay-Bea';
            src: url('/Tay-Bea.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}} />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#FCFBF9' }}>
        
        <nav style={{ 
          position: 'absolute', 
          top: 0, 
          width: '100%', 
          zIndex: 100, 
          backgroundColor: 'transparent',
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '25px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <a href="/" style={{ 
              textDecoration: 'none', 
              color: '#fff', 
              fontWeight: '400', 
              fontSize: '1.4rem', 
              fontFamily: "'Tay-Bea', serif",
              letterSpacing: '1px' 
            }}>
              FLORES À BEIRA-RIO
            </a>

            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ display: 'none', gap: '20px' }}>
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} style={{ textDecoration: 'none', color: '#fff', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {item.name}
                </a>
              ))}
            </div>

            {/* Hamburger (Branco) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 101, padding: '10px' }}
            >
              <div style={{ width: '25px', height: '1.5px', backgroundColor: '#fff', margin: '5px 0' }} />
              <div style={{ width: '25px', height: '1.5px', backgroundColor: '#fff', margin: '5px 0' }} />
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
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '2rem', margin: '10px 0', fontFamily: "'Tay-Bea', serif" }}>
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
          /* Aplica a tua fonte Tay-Bea a todos os títulos do site */
          h1, h2, h3, .serif { 
            font-family: 'Tay-Bea', serif !important; 
            font-weight: 400; 
          }
        `}</style>
      </body>
    </html>
  );
}
