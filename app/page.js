"use client";

import { motion } from "framer-motion";

// --- ÍCONES SVG ---
const IconInstagram = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const IconFacebook = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const IconWhatsApp = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>;
const IconEmail = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

export default function Home() {
  return (
    <main style={{ color: '#1a1a1a', backgroundColor: '#FCFBF9' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
        
        <div style={{ zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 20px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontFamily: "'Instrument Serif', serif", marginBottom: '0', fontWeight: '400' }}
          >
            Flores à Beira-Rio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.9, marginTop: '10px' }}
          >
            Especialistas em preservação de flores
          </motion.p>
        </div>
      </section>

      {/* 2. GOOGLE REVIEWS (Subiu para 3º lugar conforme pedido) */}
      <section style={{ padding: '80px 20px', backgroundColor: '#1a1a1a', color: '#FCFBF9', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.5rem', marginBottom: '40px', fontWeight: '400' }}>O que dizem as nossas noivas</h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <p style={{ fontSize: '1.4rem', fontStyle: 'italic', lineHeight: '1.6', fontFamily: "'Instrument Serif', serif" }}>
            "Fiquei sem palavras quando recebi o meu quadro. A delicadeza da preservação é incrível, as cores mantiveram-se vibrantes. Uma equipa fantástica!"
          </p>
          <div style={{ marginTop: '20px', opacity: 0.6, fontSize: '0.9rem', letterSpacing: '1px' }}>GOOGLE REVIEWS ★★★★★</div>
        </motion.div>
      </section>

      {/* 3. OS 3 PASSOS */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.8rem', textAlign: 'center', marginBottom: '60px', fontWeight: '400' }}>
          Em apenas 3 passos, transformamos as suas flores em arte
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {[
            { n: "01", t: "Encomenda", d: "Reserve a sua data com antecedência para garantirmos a disponibilidade." },
            { n: "02", t: "Entrega", d: "Envie por transportadora ou entregue no atelier até 3 dias após o evento." },
            { n: "03", t: "Recebe a sua Arte", d: "Após o processo de secagem e composição, enviamos a sua peça eternizada." }
          ].map((step, i) => (
            <div key={i} style={{ borderLeft: '1px solid #1a1a1a', paddingLeft: '25px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.4 }}>{step.n}</span>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.8rem', margin: '15px 0' }}>{step.t}</h3>
              <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem' }}>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIFERENCIAL SUSTENTÁVEL */}
      <section style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#f9f6f2' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.8rem', marginBottom: '25px' }}>Beira-Rio: Preservação Consciente</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444' }}>
            A natureza não precisa de plásticos. Enquanto a resina epóxi é um polímero sintético que esconde a textura real, a nossa <strong>prensagem botânica</strong> celebra a alma da flor. 
            Uma técnica ancestral, 100% orgânica e feita para durar gerações, sem a toxicidade dos químicos.
          </p>
        </div>
      </section>

      {/* 5. VALE PRESENTEAR & AJUDA */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px' }}>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.2rem', marginBottom: '20px' }}>Ofereça um Vale-Presente</h3>
            <p style={{ marginBottom: '30px', color: '#555', lineHeight: '1.6' }}>Deixe que os noivos escolham a preservação ao seu gosto. O presente perfeito para um dia inesquecível.</p>
            <button style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '18px 35px', border: 'none', cursor: 'pointer', width: '100%', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Oferecer Vale-Presente</button>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.2rem', marginBottom: '20px' }}>Sessão de Esclarecimento</h3>
            <p style={{ marginBottom: '30px', color: '#555', lineHeight: '1.6' }}>Agende uma videochamada gratuita de 30 min para entender todo o processo e escolher os melhores produtos.</p>
            <button style={{ backgroundColor: 'transparent', color: '#1a1a1a', padding: '18px 35px', border: '1px solid #1a1a1a', cursor: 'pointer', width: '100%', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Agendar Chamada</button>
          </div>
        </div>
      </section>

      {/* --- RODAPÉ COM ONDAS --- */}
      <footer style={{ position: 'relative', backgroundColor: '#1a1a1a', color: '#FCFBF9', marginTop: '100px' }}>
        
        {/* DIVISOR DE ONDAS (SVG) */}
        <div style={{ position: 'absolute', top: '-48px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '50px' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.1,107.53,258.83,93.72,284.59,63.29,321.39,56.44Z" fill="#1a1a1a"></path>
          </svg>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px 20px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '3rem', marginBottom: '40px', fontWeight: '400' }}>Flores à Beira-Rio</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '35px', marginBottom: '60px' }}>
            <a href="#" style={{ color: '#FCFBF9', transition: '0.3s' }}><IconInstagram /></a>
            <a href="#" style={{ color: '#FCFBF9', transition: '0.3s' }}><IconFacebook /></a>
            <a href="#" style={{ color: '#FCFBF9', transition: '0.3s' }}><IconWhatsApp /></a>
            <a href="#" style={{ color: '#FCFBF9', transition: '0.3s' }}><IconEmail /></a>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              <a href="/politica-privacidade" style={{ color: '#FCFBF9', textDecoration: 'none' }}>Privacidade</a>
              <a href="/termos-condicoes" style={{ color: '#FCFBF9', textDecoration: 'none' }}>Termos</a>
            </div>
            <p style={{ fontSize: '0.7rem', opacity: 0.3, letterSpacing: '1px' }}>© 2026 FLORES À BEIRA-RIO. AVEIRO, PORTUGAL.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
