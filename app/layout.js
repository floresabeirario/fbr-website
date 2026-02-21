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
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#FCFBF9' }}>
        
        {/* NAV FIXA NO TOPO */}
        <nav style={{ 
          position: 'fixed', 
          top: 0, 
          width: '100%', 
          zIndex: 100, 
          backgroundColor: 'rgba(252, 251, 249, 0.9)', 
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
            {/* LOGO */}
            <a href="/" style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: '500', fontSize: '1.1rem', letterSpacing: '1px' }}>
              FLORES À BEIRA RIO
            </a>

            {/* MENU DESKTOP (Invisível no telemóvel) */}
            <div className="desktop-menu" style={{ display: 'none', gap: '20px' }}>
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '0.8rem', fontWeight: '500', textTransform: 'uppercase' }}>
                  {item.name}
                </a>
              ))}
            </div>

            {/* BOTÃO HAMBÚRGUER (Mobile) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', zIndex: 101 }}
            >
              <div style={{ width: '25px', height: '2px', backgroundColor: '#1a1a1a', margin: '6px 0', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
              <div style={{ width: '25px', height: '2px', backgroundColor: '#1a1a1a', margin: '6px 0', opacity: isOpen ? 0 : 1 }} />
              <div style={{ width: '25px', height: '2px', backgroundColor: '#1a1a1a', margin: '6px 0', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(6px, -7px)' : '' }} />
            </button>
          </div>
        </nav>

        {/* OVERLAY DO MENU MOBILE (Abre quando clicas no hambúrguer) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              style={{ 
                position: 'fixed', 
                top: 0, 
                right: 0, 
                width: '100%', 
                height: '100vh', 
                backgroundColor: '#FCFBF9', 
                zIndex: 99, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: '40px' 
              }}
            >
              {menuItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    textDecoration: 'none', 
                    color: '#1a1a1a', 
                    fontSize: '1.8rem', 
                    margin: '10px 0', 
                    fontWeight: '300' 
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTEÚDO DA PÁGINA (Com margem para não ficar por baixo do menu fixo) */}
        <div style={{ paddingTop: '60px' }}>
          {children}
        </div>

        {/* ESTILO PARA MOSTRAR MENU NO PC */}
        <style jsx global>{`
          @media (min-width: 1024px) {
            .desktop-menu { display: flex !important; }
            button { display: none !important; }
          }
        `}</style>
      </body>
    </html>
  );
}
