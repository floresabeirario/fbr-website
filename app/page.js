"use client";

import { motion } from "framer-motion";

// Estilos comuns para facilitar a leitura e manter a elegância
const sectionStyle = {
  padding: '80px 20px',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const titleStyle = {
  fontSize: '2.2rem',
  lineHeight: '1.1',
  color: '#1a1a1a',
  textAlign: 'center',
  marginBottom: '40px',
  fontWeight: '400',
  letterSpacing: '-1px'
};

const buttonStyle = {
  backgroundColor: '#1a1a1a',
  color: '#fff',
  padding: '20px 40px',
  borderRadius: '0', // Design minimalista usa cantos retos ou muito subtis
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  maxWidth: '300px'
};

export default function Home() {
  return (
    <main style={{ backgroundColor: '#FCFBF9', color: '#1a1a1a' }}>
      
      {/* 1. HERO SECTION COM VÍDEO */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video 
          autoPlay loop muted playsInline 
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1 }} />
        
        <div style={{ zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 20px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '10px' }}
          >
            Flores à Beira Rio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            style={{ fontSize: '1.1rem', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            Especialistas em preservação de flores
          </motion.p>
        </div>
      </section>

      {/* 2. OS 3 PASSOS - UX Mobile Interativa */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Em apenas 3 passos, transformamos as suas flores em arte</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', width: '100%' }}>
          {[
            { n: "01", t: "Faça a sua encomenda", d: "Reserve a sua data com antecedência para garantirmos a disponibilidade da prensa." },
            { n: "02", t: "Entregue-nos as flores", d: "Envie por transportadora ou entregue no nosso atelier até 3 dias após o evento." },
            { n: "03", t: "Receba o seu quadro", d: "Após o processo de secagem e composição, enviamos a sua peça eternizada." }
          ].map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{step.n}</span>
              <h3 style={{ fontSize: '1.5rem', margin: '15px 0' }}>{step.t}</h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>{step.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. GOOGLE REVIEWS - Tipografia de Impacto */}
      <section style={{ ...sectionStyle, backgroundColor: '#1a1a1a', color: '#fff', maxWidth: '100%' }}>
        <h2 style={{ ...titleStyle, color: '#fff' }}>O que dizem as nossas noivas</h2>
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.4rem', maxWidth: '800px' }}
        >
          <p>"Fiquei sem palavras quando recebi o meu quadro. A delicadeza da preservação é incrível, as cores mantiveram-se vibrantes. Uma equipa fantástica!"</p>
          <footer style={{ marginTop: '20px', fontSize: '0.9rem', fontStyle: 'normal', opacity: 0.7 }}>— Google Reviews</footer>
        </motion.div>
      </section>

      {/* 4. DIFERENCIAL SUSTENTÁVEL */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', maxWidth: '700px' }}>
          <span style={{ fontSize: '2rem' }}>🌿</span>
          <h2 style={titleStyle}>Beira Rio: Preservação Consciente</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
            A natureza não precisa de plásticos. Enquanto a resina epóxi é um polímero sintético que esconde a textura real, a nossa <strong>prensagem botânica</strong> celebra a alma da flor. 
            Uma técnica ancestral, 100% orgânica e feita para durar gerações, sem a toxicidade dos químicos.
          </p>
        </div>
      </section>

      {/* 5. VALE PRESENTEAR & AJUDA */}
      <section style={{ ...sectionStyle, borderTop: '1px solid #eaeaea' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Ofereça um Vale Presente</h3>
            <p style={{ marginBottom: '30px', color: '#555' }}>Deixe que os noivos escolham a preservação ao seu gosto. O presente perfeito para um dia inesquecível.</p>
            <button style={buttonStyle}>Oferecer Vale Presente</button>
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Sessão de Esclarecimento</h3>
            <p style={{ marginBottom: '30px', color: '#555' }}>Agende uma videochamada gratuita de 30 min para entender todo o processo e escolher os melhores produtos.</p>
            <button style={{ ...buttonStyle, backgroundColor: 'transparent', color: '#1a1a1a', border: '1px solid #1a1a1a' }}>Agendar Chamada</button>
          </div>
        </div>
      </section>

      {/* FOOTER DIVERTIDO & ELEGANTE */}
      <footer style={{ backgroundColor: '#f4f1ee', padding: '60px 20px', borderRadius: '40px 40px 0 0', marginTop: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ width: '80px', height: '80px', border: '1px dashed #c5a880', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '0.7rem', color: '#c5a880', padding: '10px' }}
          >
            HANDMADE PORTUGAL
          </motion.div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem' }}>
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
            <a href="#">Email</a>
          </div>
          <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>© 2026 Flores à Beira Rio. Privacidade e Termos.</p>
        </div>
      </footer>

    </main>
  );
}
