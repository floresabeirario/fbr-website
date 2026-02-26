"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- ÍCONES DAS BANDEIRAS ---
const FlagPT = () => (
  <svg width="16" height="12" viewBox="0 0 600 400" style={{ marginLeft: '8px', borderRadius: '2px', verticalAlign: 'middle' }}>
    <rect width="240" height="400" fill="#006600"/>
    <rect x="240" width="360" height="400" fill="#ff0000"/>
    <circle cx="240" cy="200" r="80" fill="#ffff00"/>
    <circle cx="240" cy="200" r="50" fill="#ffffff"/>
    <path d="M240 160 v80 M210 200 h60" stroke="#ff0000" strokeWidth="10"/>
  </svg>
);

const FlagEN = () => (
  <svg width="16" height="12" viewBox="0 0 640 480" style={{ marginLeft: '8px', borderRadius: '2px', verticalAlign: 'middle' }}>
    <path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 245 180L565 0h75v56L396 240l244 184v56h-75L320 300 75 480H0v-56l244-184L0 56V0h75z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM216 199 0 40V0l271 199h-55zm-216 241 216-159h55L0 480v-40zm640 0L424 281h55l161 119v40zM0 190h640v100H0z"/><path fill="#FFF" d="M270 0h100v480H270z"/><path fill="#C8102E" d="M0 210h640v60H0zM300 0h40v480h-40z"/>
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
    { name: "PT", href: "/pt", isLang: true }, // Marcador especial para os idiomas
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
                {menuRight.map((item) => {
                  // Se for o botão de Idioma (PT), criamos a estrutura do Dropdown
                  if (item.isLang) {
                    return (
                      <div key={item.name} className="lang-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <a href={item.href} className="nav-link"
                          style={{ fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1.5px', color: shouldShowScrolled ? '#1a1a1a' : '#fff', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          {item.name} <FlagPT />
                        </a>
                        
                        {/* A caixa flutuante com a opção EN */}
                        <div className="lang-dropdown">
                          <a href="/en" className="nav-link" style={{ 
                            fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1.5px', 
                            color: '#1a1a1a', display: 'flex', alignItems: 'center', 
                            background: '#FCFBF9', padding: '12px 20px', 
                            border: '1px solid rgba(26,26,26,0.08)', borderRadius: '4px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                          }}>
                            EN <FlagEN />
                          </a>
                        </div>
                      </div>
                    );
                  }

                  // Renderização normal para os outros links
                  return (
                    <a key={item.name} href={item.href} className="nav-link"
                      style={{ fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1.5px', color: shouldShowScrolled ? '#1a1a1a' : '#fff', display: 'flex', alignItems: 'center' }}>
                      {item.name}
                    </a>
                  );
                })}
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
              
              {/* Renderiza todos os links normais */}
              {[...menuLeft, ...menuRight.filter(i => !i.isLang)].map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="nav-link"
                  style={{ color: '#1a1a1a', fontSize: '1.8rem', margin: '15px 0', fontFamily: "'TAN-MEMORIES', serif", display: 'flex', alignItems: 'center' }}>
                  {item.name}
                </a>
              ))}

              {/* Opções de idioma lado a lado no Mobile */}
              <div style={{ display: 'flex', gap: '30px', marginTop: '40px', borderTop: '1px solid rgba(26,26,26,0.1)', paddingTop: '30px' }}>
                <a href="/pt" className="nav-link" style={{ color: '#1a1a1a', fontSize: '1.3rem', fontFamily: "'TAN-MEMORIES', serif", display: 'flex', alignItems: 'center' }}>
                  PT <FlagPT />
                </a>
                <a href="/en" className="nav-link" style={{ color: '#1a1a1a', fontSize: '1.3rem', fontFamily: "'TAN-MEMORIES', serif", display: 'flex', alignItems: 'center', opacity: 0.5 }}>
                  EN <FlagEN />
                </a>
              </div>
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
          .nav-link:hover { border-bottom: 1px solid currentColor; }

          /* --- ESTILOS DO DROPDOWN DE IDIOMA --- */
          .lang-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            padding-top: 15px; /* Cria a ponte invisível para o rato não "cair" */
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            pointer-events: none; /* Evita cliques acidentais quando está invisível */
          }
          .lang-container:hover .lang-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: auto; /* Reativa os cliques */
          }
        `}</style>
      </body>
    </html>
  );
}
