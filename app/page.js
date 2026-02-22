"use client";

import { motion } from "framer-motion";

// SVGs dos Ícones Sociais
const IconInstagram = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const IconFacebook = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const IconWhatsApp = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>;
const IconEmail = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

export default function Home() {
  return (
    <main style={{ color: '#1a1a1a' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
        
        <div style={{ zIndex: 2, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '0' }}>Flores à Beira-Rio</h1>
          <p style={{ fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.9 }}>Especialistas em preservação de flores</p>
        </div>
      </section>

      {/* ... (as outras seções de passos, sustentabilidade e vale presente mantêm-se iguais) ... */}

      {/* FOOTER FINAL PROFISSIONAL */}
      <footer style={{ backgroundColor: '#1a1a1a', color: '#FCFBF9', padding: '80px 20px 40px 20px', borderRadius: '60px 60px 0 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Flores à Beira-Rio</h2>
          
          {/* ÍCONES SOCIAIS */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '50px' }}>
            <a href="#" style={{ color: '#FCFBF9' }}><IconInstagram /></a>
            <a href="#" style={{ color: '#FCFBF9' }}><IconFacebook /></a>
            <a href="#" style={{ color: '#FCFBF9' }}><IconWhatsApp /></a>
            <a href="#" style={{ color: '#FCFBF9' }}><IconEmail /></a>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
              <a href="/politica-privacidade" style={{ color: '#FCFBF9', textDecoration: 'none' }}>Política de Privacidade</a>
              <a href="/termos-condicoes" style={{ color: '#FCFBF9', textDecoration: 'none' }}>Termos e Condições</a>
            </div>
            <p style={{ fontSize: '0.7rem', opacity: 0.4 }}>© 2026 Flores à Beira-Rio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
