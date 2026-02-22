"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Ícone da Bandeira SVG
const FlagEN = () => (
  <svg width="16" height="12" viewBox="0 0 640 480" style={{ marginLeft: '8px', borderRadius: '2px', verticalAlign: 'middle' }}>
    <path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 245 180L565 0h75v56L396 240l244 184v56h-75L320 300 75 480H0v-56l244-184L0 56V0h75z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM216 199 0 40V0l271 199h-55zm-216 241 216-159h55L0 480v-40zm640 0L424 281h55l161 119v40zM0 190h640v100H0z"/><path fill="#FFF" d="M270 0h100v480H270z"/><path fill="#C8102E" d="M0 210h640v60H0zM300 0h40v480h-40z"/>
  </svg>
);

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // --- TRANSFORMAÇÕES DE SCROLL ---
  const logoTop = useTransform(scrollY, [0, 400], ["50%", "40px"]);
  const logoSize = useTransform(scrollY, [0, 400], ["clamp(3.5rem, 15vw, 8.5rem)", "1.6rem"]);
  const logoColor = useTransform(scrollY, [0, 300], ["#ffffff", "#1a1a1a"]);
  const subtitleOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const navBg = useTransform(scrollY, [0, 400], ["rgba(252, 251, 249, 0)", "rgba(252, 251, 249, 0.98)"]);
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
    { name: "EN", href: "/en", hasFlag: true },
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
      <body style={{ margin: 0, backgroundColor: '#FCFBF9', color: '#1a1a1a', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
        
        <motion.nav style={{ 
          position: 'fixed', top: 0, width: '100%', zIndex: 100, 
          height: '80px', backgroundColor: navBg,
          display: 'flex', alignItems: 'center'
        }}>
          <div style={{ 
            maxWidth: '1450px', margin: '0 auto', width: '100%', padding: '0 40px', 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div className="desktop-only" style={{ display: 'flex', gap: '30px', flex: 1 }}>
              {menuLeft.map((item) => (
                <motion.a key={item.name} href={item.href} style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px', color: linkColor }}>{item.name}</motion.a>
              ))}
            </div>
            <div style={{ width: '450px' }} className="desktop-only" />
            <div className="desktop-only" style={{ display: 'flex', gap: '30px', flex: 1, justifyContent: 'flex-end' }}>
              {menuRight.map((item) => (
                <a key={item.name} href={item.href} style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px', color: linkColor, display: 'flex', alignItems: 'center' }}>
                  {item.name} {item.hasFlag && <FlagEN />}
                </a>
              ))}
            </div>
            <button className="mobile-only" onClick={() => setIsOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: linkColor, fontSize: '0.8rem', fontWeight: '500', letterSpacing: '2px' }}>
              MENU
            </button>
          </div>
        </motion.nav>

        {/* LOGOTIPO VIAJANTE - CORREÇÃO DE MARGENS E QUEBRA */}
        <motion.div style={{ 
          position: 'fixed', left: '0', right: '0', zIndex: 110,
          top: logoTop, y: "-50%", 
          textAlign: 'center', pointerEvents: 'none',
          padding: '0 30px' // ADICIONADO: Garante que o título nunca toca nas bordas laterais
        }}>
          <motion.a href="/" style={{ 
            textDecoration: 'none', fontFamily: "'TAN-MEMORIES', serif", 
            fontSize: logoSize, color: logoColor,
            pointerEvents: 'auto', display: 'inline-block', lineHeight: '1.1'
          }}>
            Flores à <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Beira-Rio</span>
          </motion.a>
          
          <motion.p style={{ 
            opacity: subtitleOpacity, color: '#ffffff', textTransform: 'uppercase', 
            letterSpacing: '10px', fontSize: '1rem', marginTop: '30px', fontWeight: '300',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Especialistas em preservação de flores
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, backgroundColor: '#FCFBF9', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer' }}>FECHAR</button>
              {[...menuLeft, ...menuRight].map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '2rem', margin: '15px 0', fontFamily: "'TAN-MEMORIES', serif", display: 'flex', alignItems: 'center' }}>
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
        `}</style>
      </body>
    </html>
  );
}
