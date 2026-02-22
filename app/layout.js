"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // --- TRANSFORMAÇÕES DE SCROLL CORRIGIDAS ---
  // 1. Posição: Começa em 55vh (mais para baixo que o centro) e vai para 40px (meio da barra)
  const logoTop = useTransform(scrollY, [0, 300], ["55vh", "40px"]);
  
  // 2. Tamanho: AUMENTADO. Começa gigante e encolhe para o menu.
  const logoSize = useTransform(scrollY, [0, 300], ["clamp(4.5rem, 15vw, 9.5rem)", "1.6rem"]);
  
  // 3. Cor: De Branco (#fff) para Preto (#1a1a1a)
  const logoColor = useTransform(scrollY, [0, 300], ["#ffffff", "#1a1a1a"]);
  
  // 4. Subtítulo: Desaparece rápido
  const subtitleOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  
  // 5. Fundo do Menu
  const navBg = useTransform(scrollY, [0, 300], ["rgba(252, 251, 249, 0)", "rgba(252, 251, 249, 0.98)"]);
  const linkColor = useTransform(scrollY, [0, 300], ["#ffffff", "#1a1a1a"]);

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
      <body style={{ margin: 0, backgroundColor: '#FCFBF9', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
        
        {/* BARRA DE NAVEGAÇÃO FIXA */}
        <motion.nav style={{ 
          position: 'fixed', top: 0, width: '100%', zIndex: 100, 
          height: '80px', backgroundColor: navBg,
          display: 'flex', alignItems: 'center'
        }}>
          <div style={{ 
            maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 40px', 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            {/* LINKS ESQUERDA */}
            <div className="desktop-only" style={{ display: 'flex', gap: '30px', flex: 1 }}>
              {menuLeft.map((item) => (
                <motion.a key={item.name} href={item.href} style={{ 
                  textDecoration: 'none', fontSize: '0.7rem', fontWeight: '500', 
                  textTransform: 'uppercase', letterSpacing: '2px', color: linkColor 
                }}>{item.name}</motion.a>
              ))}
            </div>

            {/* ESPAÇO CENTRAL VAZIO PARA O LOGO ENCAIXAR */}
            <div style={{ width: '350px' }} className="desktop-only" />

            {/* LINKS DIREITA */}
            <div className="desktop-only" style={{ display: 'flex', gap: '30px', flex: 1, justifyContent: 'flex-end' }}>
              {menuRight.map((item) => (
                <motion.a key={item.name} href={item.href} style={{ 
                  textDecoration: 'none', fontSize: '0.7rem', fontWeight: '500', 
                  textTransform: 'uppercase', letterSpacing: '2px', color: linkColor 
                }}>{item.name}</motion.a>
              ))}
            </div>

            {/* MOBILE HAMBURGER */}
            <button className="mobile-only" onClick={() => setIsOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: '25px', height: '1px', backgroundColor: '#1a1a1a', margin: '6px 0' }} />
              <div style={{ width: '25px', height: '1px', backgroundColor: '#1a1a1a', margin: '6px 0' }} />
            </button>
          </div>
        </motion.nav>

        {/* O TÍTULO GOSHA-STYLE (Viajante) */}
        <motion.div style={{ 
          position: 'fixed', left: '50%', x: '-50%', zIndex: 110,
          top: logoTop, y: "-50%", // Garante o centro vertical exato no ponto definido pelo 'top'
          textAlign: 'center', pointerEvents: 'none', width: '100%'
        }}>
          <motion.a href="/" style={{ 
            textDecoration: 'none', 
            fontFamily: "'TAN-MEMORIES', serif", 
            fontSize: logoSize,
            color: logoColor,
            whiteSpace: 'nowrap',
            pointerEvents: 'auto',
            display: 'block',
            marginBottom: '0'
          }}>
            Flores à Beira-Rio
          </motion.a>
          
          <motion.p style={{ 
            opacity: subtitleOpacity, color: '#fff', textTransform: 'uppercase', 
            letterSpacing: '8px', fontSize: '1.2rem', marginTop: '20px', fontWeight: '300' 
          }}>
            Especialistas em preservação de flores
          </motion.p>
        </motion.div>

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
          h1, h2, h3, .serif { font-family: 'TAN-MEMORIES', serif !important; font-weight: 400; line-height: 1.1; }
          p, span, a, div { font-family: 'Inter', Helvetica, sans-serif; }
        `}</style>
      </body>
    </html>
  );
}
