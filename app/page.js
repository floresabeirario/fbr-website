"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IconInstagram = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const IconFacebook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const IconWhatsApp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>;
const IconEmail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

export default function Home() {
  const { scrollY } = useScroll();

  // Animações baseadas no scroll
  const titleScale = useTransform(scrollY, [0, 200], [1, 0.4]); // Diminui o tamanho
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0]); // Desaparece
  const titleY = useTransform(scrollY, [0, 200], [0, -100]); // Sobe

  useEffect(() => {
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      
      {/* 1. HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
        
        <motion.div 
          style={{ zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 20px', scale: titleScale, opacity: titleOpacity, y: titleY }}
        >
          <h1 style={{ fontSize: 'clamp(3.5rem, 12vw, 6.5rem)', marginBottom: '0' }}>
            Flores à Beira-Rio
          </h1>
          <p style={{ fontSize: '1.1rem', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.9, marginTop: '20px' }}>
            Especialistas em preservação de flores
          </p>
        </motion.div>
      </section>

      {/* 2. OS 3 PASSOS */}
      <section style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3.2rem', textAlign: 'center', marginBottom: '80px' }}>
          Três passos para a sua arte
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          {[
            { n: "01", t: "Encomenda", d: "Reserve a sua data com antecedência para garantirmos a disponibilidade da nossa prensa botânica." },
            { n: "02", t: "Entrega", d: "Envie por transportadora ou entregue no nosso atelier até 3 dias após o seu evento especial." },
            { n: "03", t: "Recebe a sua Arte", d: "Após o processo artesanal de secagem e composição, enviamos a sua peça eternizada." }
          ].map((step, i) => (
            <div key={i} style={{ borderLeft: '1px solid #1a1a1a', paddingLeft: '30px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '600', opacity: 0.3 }}>{step.n}</span>
              <h3 style={{ fontSize: '2.2rem', margin: '20px 0' }}>{step.t}</h3>
              <p style={{ color: '#555', lineHeight: '1.7', fontSize: '0.95rem' }}>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GOOGLE REVIEWS */}
      <section style={{ padding: '100px 20px', backgroundColor: '#1a1a1a', color: '#FCFBF9', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.8rem', marginBottom: '40px' }}>O que dizem as nossas noivas</h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.8rem', lineHeight: '1.3', fontStyle: 'italic', fontFamily: "'TAN-MEMORIES', serif" }}>
            "Fiquei sem palavras quando recebi o meu quadro. A delicadeza da preservação é incrível, as cores mantiveram-se vibrantes. Uma equipa fantástica!"
          </p>
          <div style={{ marginTop: '30px', opacity: 0.5, fontSize: '0.7rem', letterSpacing: '2px' }}>GOOGLE REVIEWS ★★★★★</div>
        </motion.div>
      </section>

      {/* 4. SUSTENTABILIDADE */}
      <section style={{ padding: '120px 20px', textAlign: 'center', backgroundColor: '#F4F1EE' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.2rem', marginBottom: '30px' }}>Beira-Rio: Preservação Consciente</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.9', color: '#333' }}>
            A natureza não precisa de plásticos. Enquanto a resina epóxi é um polímero sintético que oculta a textura orgânica, a nossa <strong>prensagem botânica</strong> celebra a alma da flor. 
          </p>
        </div>
      </section>

      {/* 5. VALE-PRESENTEAR & AJUDA */}
      <section style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '100px' }}>
          <div>
            <h3 style={{ fontSize: '2.6rem', marginBottom: '25px' }}>Vale-Presente</h3>
            <p style={{ marginBottom: '40px', color: '#555', lineHeight: '1.7' }}>Deixe que os noivos escolham a preservação ao seu gosto.</p>
            <button style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '20px 40px', border: 'none', cursor: 'pointer', width: '100%', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '600' }}>Oferecer Vale-Presente</button>
          </div>
          <div>
            <h3 style={{ fontSize: '2.6rem', marginBottom: '25px' }}>Videochamada</h3>
            <p style={{ marginBottom: '40px', color: '#555', lineHeight: '1.7' }}>Agende uma sessão gratuita de 30 min para entender o processo.</p>
            <button style={{ backgroundColor: 'transparent', color: '#1a1a1a', padding: '20px 40px', border: '1px solid #1a1a1a', cursor: 'pointer', width: '100%', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '600' }}>Agendar Agora</button>
          </div>
        </div>
      </section>

      {/* RODAPÉ ONDULADO */}
      <footer style={{ position: 'relative', backgroundColor: '#1a1a1a', color: '#FCFBF9', marginTop: '120px' }}>
        <div style={{ position: 'absolute', top: '-48px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '50px' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.1,107.53,258.83,93.72,284.59,63.29,321.39,56.44Z" fill="#1a1a1a"></path>
          </svg>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 50px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3.8rem', marginBottom: '50px' }}>Flores à Beira-Rio</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '80px' }}>
            <a href="#" style={{ color: '#FCFBF9' }}><IconInstagram /></a>
            <a href="#" style={{ color: '#FCFBF9' }}><IconFacebook /></a>
            <a href="#" style={{ color: '#FCFBF9' }}><IconWhatsApp /></a>
            <a href="#" style={{ color: '#FCFBF9' }}><IconEmail /></a>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '50px' }}>
            <p style={{ fontSize: '0.65rem', opacity: 0.3, letterSpacing: '1.5px' }}>© 2026 FLORES À BEIRA-RIO. COIMBRA, PORTUGAL.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
