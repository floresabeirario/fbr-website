"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO (GRELHA PREMIUM) ---
const StepCard = ({ imageSrc, number, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ 
      backgroundColor: '#FFFFFF', 
      borderRadius: '12px', 
      border: '1px solid rgba(26,26,26,0.05)',
      overflow: 'hidden', 
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
  >
    {/* IMAGEM UNIFORME */}
    <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: '#F4F1EE', overflow: 'hidden' }}>
      <img 
        src={imageSrc} 
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>

    {/* TEXTO */}
    <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <span style={{ 
        fontSize: '0.75rem', 
        textTransform: 'uppercase', 
        letterSpacing: '2px', 
        fontWeight: '600', 
        color: '#1a1a1a', 
        opacity: 0.4,
        marginBottom: '10px'
      }}>
        {number}
      </span>
      <h3 style={{ fontSize: '1.4rem', fontFamily: "'TAN-MEMORIES', serif", marginBottom: '15px', color: '#1a1a1a' }}>
        {title}
      </h3>
      <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
        {desc}
      </p>
    </div>
  </motion.div>
);

export default function RecriacaoBouquet() {
  // Os teus textos exatos e as imagens estáticas
  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "Passo 01",
      title: "A Fotografia",
      desc: "Envie-nos algumas fotografias originais do dia do evento onde o bouquet seja visível. Quantos mais detalhes conseguirmos ver, ou se lembrar, mais exata será a recriação."
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "Passo 02",
      title: "A Recriação",
      desc: "Trabalhamos em parceria com uma florista local. Enviamos a fotografia e encaminhamos-lhe o orçamento exato para a recriação do bouquet com flores frescas. Se aprovar o valor das flores, a florista cria a réplica e entrega-a diretamente no nosso estúdio, sem ter que se preocupar com nada."
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "Passo 03",
      title: "A Preservação",
      desc: "Iniciamos o delicado processo de preservação das flores para que mantenham a sua cor e formato originais."
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "Passo 04",
      title: "A Arte Final",
      desc: "O design é sempre aprovado pelo cliente antes de ser emoldurado. Uma obra de arte pensada para eternizar o seu dia."
    }
  ];

  return (
    <main style={{ backgroundColor: '#F4F1EE', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* LÓGICA RESPONSIVA */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-padding { padding-top: 130px; }
        
        /* MOBILE (1 coluna) */
        .steps-grid { 
          display: grid; 
          grid-template-columns: 1fr; 
          gap: 20px; 
        }
        
        .cta-button {
          display: inline-block;
          background-color: #1a1a1a;
          color: #FCFBF9;
          padding: 16px 36px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.85rem;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .cta-button:hover { transform: translateY(-3px); background-color: #333; }

        /* TABLET (2 colunas) */
        @media (min-width: 768px) {
          .hero-padding { padding-top: 160px; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }

        /* DESKTOP LARGOS (4 colunas) */
        @media (min-width: 1100px) {
          .steps-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="hero-padding" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px', marginBottom: '80px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a', opacity: 0.6, marginBottom: '20px' }}>
            Uma segunda oportunidade
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 25px 0', lineHeight: '1.1' }}>
            Recriação de Bouquet
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#555', lineHeight: '1.8', margin: '0 auto', maxWidth: '700px' }}>
            O seu evento já passou e não teve a oportunidade de preservar o seu bouquet? 
            Com apenas uma fotografia, recriamos a magia do seu ramo com flores frescas e eternizamo-las numa obra de arte.
          </p>
        </motion.div>
      </section>

      {/* GRELHA DOS 4 PASSOS */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', marginBottom: '100px' }}>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              imageSrc={step.imageSrc} 
              number={step.number} 
              title={step.title} 
              desc={step.desc} 
              delay={index * 0.15} 
            />
          ))}
        </div>
      </section>

      {/* EXPLICAÇÃO DOS VALORES E MOLDURAS */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', marginBottom: '80px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '16px', 
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}
        >
          <h3 style={{ fontSize: '1.8rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '20px' }}>
            Como funcionam os valores?
          </h3>
          <p style={{ color: '#444', lineHeight: '1.7', fontSize: '1.05rem', margin: '0 auto', maxWidth: '700px', marginBottom: '20px' }}>
            O valor final do serviço corresponde ao <strong>orçamento das flores frescas</strong> (da florista) mais o <strong>valor base do quadro</strong> que escolher no nosso catálogo.
          </p>
          <p style={{ color: '#444', lineHeight: '1.7', fontSize: '0.95rem', margin: '0 auto', maxWidth: '650px' }}>
            Os preços e formatos dos quadros são exatamente os mesmos da nossa página de opções e preços. Pode escolher o tamanho que preferir, sabendo que todos os quadros já incluem vidro museu de proteção anti-reflexo e proteção UV.
          </p>
        </motion.div>
      </section>

      {/* INSPIRAÇÃO E CTA */}
      <section style={{ textAlign: 'center', padding: '0 20px' }}>
        <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '30px' }}>
          O presente perfeito para Bodas de Ouro, Aniversários de Casamento ou surpresas especiais.
        </p>
        <a href="mailto:info@floresabeirario.pt?subject=Pedido de Orçamento - Recriação de Bouquet" className="cta-button">
          Pedir Orçamento para Recriação
        </a>
      </section>

    </main>
  );
}
