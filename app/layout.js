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
        {/* Importação da fonte elegante (Playfair Display) para substituir a Tay Bea */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#FCFBF9' }}>
        
        <nav style={{ 
          position: 'fixed', 
          top: 0, 
          width: '100%', 
          zIndex: 100, 
          backgroundColor: 'rgba(252, 251, 249, 0.95)', 
          backdropFilter: 'blur(10px)', 
          borderBottom: '1px solid rgba(0,0,0,0.05)' 
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '15px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <a href="/" style={{ 
              textDecoration: 'none', 
              color: '#1a1a1a', 
              fontWeight: '400', 
              fontSize: '1.2rem', 
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '1px' 
            }}>
              FLORES À BEIRA-RIO
            </a>

            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ display: 'none', gap: '20px' }}>
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {item.name}
                </a>
              ))}
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 101, padding: '10px' }}
            >
              <div style={{ width: '25px', height: '1.5px', backgroundColor: '#1a1a1a', margin: '5px 0', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
              <div style={{ width: '25px', height: '1.5px', backgroundColor: '#1a1a1a', margin: '5px 0', opacity: isOpen ? 0 : 1 }} />
              <div style={{ width: '25px', height: '1.5px', backgroundColor: '#1a1a1a', margin: '5px 0', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
            </button>
          </div>
        </nav>

        {/* Overlay Menu Mobile Corrigido */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100vh', 
                backgroundColor: '#FCFBF9', 
                zIndex: 99, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              {menuItems.map((item, i) => (
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    textDecoration: 'none', 
                    color: '#1a1a1a', 
                    fontSize: '1.8rem', 
                    margin: '12px 0', 
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '400'
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ paddingTop: '70px' }}>
          {children}
        </div>

        <style jsx global>{`
          @media (min-width: 1024px) {
            .desktop-menu { display: flex !important; }
            button { display: none !important; }
          }
          h1, h2, h3 { font-family: 'Playfair Display', serif !important; }
        `}</style>
      </body>
    </html>
  );
}
