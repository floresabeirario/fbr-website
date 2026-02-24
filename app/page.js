"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "mramer-motion";

// --- ÍCONES (SVGs leves para o build do Vercel) ---
const IconInstagram = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const IconFacebook = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const IconWhatsApp = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>;
const IconEmail = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1-2-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

export default function Home() {
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 150], [1, 0.7]);
  const titleY = useTransform(scrollY, [0, 150], [0, -50]);

  const reviewRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    if (reviewRef.current && !reviewRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "https://cdn.trustindex.io/loader.js?6897287659a84643ca864d340dd";
      script.async = true;
      script.defer = true;
      reviewRef.current.appendChild(script);
    }
  }, []);

  const footerBg = "#1a1a1a";
  const footerText = "#FCFBF9";

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />
        
        <motion.div style={{ zIndex: 2, textAlign: 'center', color: '#fff', opacity: titleOpacity, scale: titleScale, y: titleY, width: '90%', maxWidth: '1200px' }}>
          <h1 style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', marginBottom: '10px' }}>
            Flores à <span style={{ whiteSpace: 'nowrap' }}>Beira&#8209;Rio</span>
          </h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '6px', textTransform: 'uppercase', fontWeight: '300' }}>
            Especialistas em preservação de flores
          </p>
        </motion.div>
      </section>

      {/* 2. OS 3 PASSOS */}
      <section style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '80px' }}>Três passos para a sua arte</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          {[
            { n: "01", t: "Encomenda", d: "Reserve a sua data com antecedência para garantirmos a nossa prensa botânica." },
            { n: "02", t: "Entrega", d: "Envie por transportadora ou entregue no nosso atelier em Coimbra até 3 dias após o evento." },
            { n: "03", t: "Recebe a sua Arte", d: "Após o processo artesanal de secagem, enviamos a sua peça eternizada." }
          ].map((step, i) => (
            <div key={i} style={{ borderLeft: '1px solid #1a1a1a', paddingLeft: '30px' }}>
              <span style={{ fontSize: '0.7rem', opacity: 0.3, fontWeight: '600' }}>{step.n}</span>
              <h3 style={{ fontSize: '2.5rem', margin: '20px 0' }}>{step.t}</h3>
              <p style={{ color: '#555', lineHeight: '1.8' }}>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. REVIEWS */}
      <section style={{ padding: '60px 20px', backgroundColor: '#1a1a1a', color: '#FCFBF9', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '30px' }}>O que dizem os nossos clientes</h2>
        <div ref={reviewRef} style={{ maxWidth: '1000px', margin: '0 auto', minHeight: '200px' }}></div>
      </section>

      {/* 4. SUSTENTABILIDADE */}
      <section style={{ padding: '120px 20px', textAlign: 'center', backgroundColor: '#F4F1EE' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '30px' }}>Beira-Rio: Preservação Consciente</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '2', color: '#333' }}>
            A natureza não precisa de plásticos. Enquanto a resina epóxi é um polímero sintético, a nossa <strong>prensagem botânica</strong> celebra a alma da flor de forma 100% orgânica.
          </p>
        </div>
      </section>

      {/* 5. RODAPÉ CORRIGIDO */}
      <footer style={{ backgroundColor: footerBg, color: footerText, position: 'relative', marginTop: '120px' }}>
        <div style={{ position: 'absolute', top: '-48px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '50px' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.1,107.53,258.83,93.72,284.59,63.29,321.39,56.44Z" fill={footerBg}></path>
          </svg>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 40px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '80px', textAlign: 'center' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ fontSize: '2.8rem', fontFamily: "'TAN-MEMORIES', serif", marginBottom: '25px', lineHeight: '1' }}>
                Flores à <br/> Beira-Rio
              </h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="https://instagram.com/floresabeirario" target="_blank" className="nav-link" style={{ color: footerText }}><IconInstagram /></a>
                <a href="https://facebook.com/floresabeirario" target="_blank" className="nav-link" style={{ color: footerText }}><IconFacebook /></a>
                <a href="https://wa.me/351" target="_blank" className="nav-link" style={{ color: footerText }}><IconWhatsApp /></a>
                <a href="mailto:info@floresabeirario.pt" className="nav-link" style={{ color: footerText }}><IconEmail /></a>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', opacity: 0.6 }}>Explorar</h4>
              <a href="/passo-a-passo" className="nav-link" style={{ color: footerText, textDecoration: 'none', fontSize: '0.9rem' }}>O Nosso Processo</a>
              <a href="/opcoes-e-precos" className="nav-link" style={{ color: footerText, textDecoration: 'none', fontSize: '0.9rem' }}>Opções e Preços</a>
              <a href="/perguntas-frequentes" className="nav-link" style={{ color: footerText, textDecoration: 'none', fontSize: '0.9rem' }}>Perguntas Frequentes</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', opacity: 0.6 }}>Estúdio</h4>
              <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: '300', opacity: 0.8 }}>Ceira, Coimbra</p>
              <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: '300', opacity: 0.8 }}>Portugal</p>
              <a href="/contactos" className="nav-link" style={{ color: footerText, textDecoration: 'none', fontSize: '0.9rem', marginTop: '10px' }}>Contactos e Equipa</a>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', fontSize: '0.65rem', letterSpacing: '1px', opacity: 0.5 }}>
            <span>© 2026 FLORES À BEIRA-RIO. TODOS OS DIREITOS RESERVADOS.</span>
            <div style={{ display: 'flex', gap: '25px' }}>
              {/* Texto alterado conforme pedido */}
              <a href="/politica-de-privacidade" className="nav-link" style={{ color: footerText }}>POLÍTICA DE PRIVACIDADE</a>
              <a href="/termos-e-condicoes" className="nav-link" style={{ color: footerText }}>TERMOS E CONDIÇÕES</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
