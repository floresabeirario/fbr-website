"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO (COM CAIXA PEQUENA CENTRADA E FOTOS QUADRADAS) ---
const StepCard = ({ imageSrc, number, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRadius: '16px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
      border: '1px solid rgba(255,255,255,0.5)',
      overflow: 'visible' // Permitir que a cápsula saia para fora da área da imagem
    }}
  >
    {/* ÁREA DA IMAGEM - QUADRADO FORÇADO (1:1) */}
    <div style={{ 
      width: '100%', 
      aspectRatio: '1/1', 
      position: 'relative', 
      overflow: 'hidden', // Corta a imagem mas mantém a div quadrada
      borderRadius: '16px 16px 0 0' 
    }}>
      <img 
        src={imageSrc} 
        alt={title}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', // Garante que a foto preencha o quadrado sem distorcer
          display: 'block'
        }} 
      />
    </div>

    {/* A CÁPSULA (TÍTULO) - POSICIONADA NO CENTRO DA DIVISÃO */}
    <div style={{ position: 'relative', height: '0', zIndex: 10 }}>
        <div style={{
            position: 'absolute',
            top: '0', 
            left: '50%',
            transform: 'translate(-50%, -50%)', // Centralização absoluta
            backgroundColor: '#FFFFFF',
            color: '#1a1a1a',
            padding: '12px 28px',
            borderRadius: '40px', 
            textAlign: 'center',
            whiteSpace: 'nowrap', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            width: 'max-content',
            maxWidth: '90%'
        }}>
            <span style={{ 
                display: 'block', 
                fontSize: '0.65rem', 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                fontWeight: '700', 
                color: '#8DB9F2', 
                marginBottom: '2px' 
            }}>
            Passo {number}
            </span>
            <h3 style={{ 
                fontSize: '1.25rem', 
                fontFamily: "'TAN-MEMORIES', serif", 
                margin: 0, 
                lineHeight: '1.2' 
            }}>
            {title}
            </h3>
        </div>
    </div>

    {/* ÁREA DO TEXTO */}
    <div style={{ 
      padding: '45px 20px 25px 20px', // Aumento do padding superior para não bater na cápsula
      display: 'flex', 
      flexDirection: 'column', 
      flexGrow: 1,
      textAlign: 'center'
    }}>
      <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
        {desc}
      </p>
    </div>
  </motion.div>
);

export default function RecriacaoBouquet() {
  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "1",
      title: "A Memória",
      desc: "Envie-nos algumas fotografias do dia onde o bouquet seja visível. Quantos mais detalhes e ângulos conseguir reunir ou lembrar-se, mais fiel será a recriação."
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "2",
      title: "A Recriação",
      desc: "Em parceria com uma florista local, enviamos as imagens e reencaminhamos-lhe o orçamento das flores frescas. Após a sua aprovação, a florista cria a réplica perfeita."
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "3",
      title: "A Preservação",
      desc: "Quando as flores chegam, iniciamos o delicado processo de prensagem de cada flor, trabalhando com o máximo cuidado para eternizar a cor e o formato original."
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "4",
      title: "A Obra de Arte",
      desc: "A composição é meticulosamente criada e enviada para a sua aprovação. Só depois o quadro é emoldurado, devolvendo-lhe um pedaço de história para a sua parede."
    }
  ];

  return (
    <main style={{ 
      background: 'linear-gradient(to bottom, rgba(141, 185, 242, 0.4) 0%, rgba(231, 197, 224, 0.5) 25%, rgba(75, 131, 242, 0.35) 50%, rgba(151, 197, 64, 0.3) 75%, rgba(229, 203, 35, 0.35) 100%)',
      minHeight: '100vh', 
      paddingBottom: '100px' 
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-padding { padding-top: 100px; }
        .section-gap { margin-bottom: 80px; } 
        .steps-grid { display: grid; grid-template-columns: 1fr; gap: 40px; } 
        
        .cta-button {
          display: inline-block; background-color: #1a1a1a; color: #FCFBF9;
          padding: 18px 40px; border-radius: 30px; text-decoration: none;
          font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
          font-size: 0.85rem; transition: transform 0.3s ease, background-color 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        @media (min-width: 768px) {
          .hero-padding { padding-top: 130px; } 
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 60px 24px; }
        }

        @media (min-width: 1024px) {
          .section-gap { margin-bottom: 160px; }
          .steps-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
        }
      `}} />

      {/* CABEÇALHO */}
      <section className="hero-padding section-gap" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '0 20px' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 20px 0' }}>
          Recriação de Bouquet
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#444', lineHeight: '1.8' }}>
          Com apenas uma fotografia, recriamos a magia do seu ramo com flores frescas e eternizamo-las numa obra de arte.
        </p>
      </section>

      {/* SECÇÃO DOS PASSOS */}
      <section className="section-gap" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontFamily: "'TAN-MEMORIES', serif", marginBottom: '60px' }}>
          Como funciona
        </h2>
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

      {/* CTA FINAL */}
      <section style={{ textAlign: 'center', padding: '0 20px' }}>
        <a href="mailto:info@floresabeirario.pt" className="cta-button">
          Pedir Orçamento para Recriação
        </a>
      </section>

    </main>
  );
}
