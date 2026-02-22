"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const IconInstagram = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const IconFacebook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const IconWhatsApp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>;
const IconEmail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

export default function Home() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* 1. HERO SECTION (Apenas o Vídeo de fundo) */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />
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

      {/* 3. GOOGLE REVIEWS */}
      <section style={{ padding: '120px 20px', backgroundColor: '#1a1a1a', color: '#FCFBF9', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>O que dizem as nossas noivas</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '2rem', lineHeight: '1.3', fontStyle: 'italic', fontFamily: "'TAN-MEMORIES', serif" }}>
            "Fiquei sem palavras quando recebi o meu quadro. A delicadeza da preservação é incrível, as cores mantiveram-se vibrantes. Uma equipa fantástica!"
          </p>
          <div style={{ marginTop: '30px', opacity: 0.4, letterSpacing: '2px', fontSize: '0.8rem' }}>GOOGLE REVIEWS ★★★★★</div>
        </div>
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

      {/* RODAPÉ */}
      <footer style={{ position: 'relative', backgroundColor: '#1a1a1a', color: '#FCFBF9', marginTop: '120px' }}>
        <div style={{ position: 'absolute', top: '-48px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '50px' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.1,107.53,258.83,93.72,284.59,63.29,321.39,56.44Z" fill="#1a1a1a"></path>
          </svg>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '4rem', marginBottom: '60px' }}>Flores à Beira-Rio</h2>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', opacity: 0.5, fontSize: '0.7rem' }}>
            © 2026 FLORES À BEIRA-RIO. COIMBRA, PORTUGAL.
          </div>
        </div>
      </footer>
    </main>
  );
}
