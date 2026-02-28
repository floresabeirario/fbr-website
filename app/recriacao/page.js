"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO ---
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
      position: 'relative'
    }}
  >
    <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: '16px 16px 0 0', backgroundColor: '#f9f9f9' }}>
      <img src={imageSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>

    <div style={{ position: 'relative', zIndex: 10 }}>
      <div style={{
        position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)', 
        backgroundColor: '#FFFFFF', padding: '10px 28px', borderRadius: '50px', textAlign: 'center',
        whiteSpace: 'nowrap', boxShadow: '0 8px 25px rgba(0,0,0,0.08)', width: 'max-content'
      }}>
        <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', color: '#8DB9F2', marginBottom: '4px' }}>
          Passo {number}
        </span>
        <h3 style={{ fontSize: '1.15rem', fontFamily: "'TAN-MEMORIES', serif", margin: 0, color: '#1a1a1a', lineHeight: '1.1' }}>
          {title}
        </h3>
      </div>
    </div>

    <div style={{ padding: '45px 20px 25px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
      <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{desc}</p>
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

  const stories = [
    {
      imageSrc: "/historia-casamento-antigo.jpg",
      title: "Bodas de Ouro e Prata",
      desc: "Um presente indescritível dos filhos para os pais, trazendo literalmente à vida o ramo de noiva de um casamento celebrado há décadas."
    },
    {
      imageSrc: "/historia-casamento-recente.jpg",
      title: "A Segunda Oportunidade",
      desc: "Para as noivas que descobriram a preservação tarde demais ou cujo bouquet original, infelizmente, não sobreviveu ao dia do casamento."
    },
    {
      imageSrc: "/historia-aniversario-flores.jpg",
      title: "Aniversários & Surpresas",
      desc: "O presente mais romântico e inesperado para oferecer à sua cara-metade no vosso aniversário. Uma surpresa que perpetua a promessa de amor."
    }
  ];

  return (
    <main style={{ 
      background: 'linear-gradient(to bottom, rgba(141, 185, 242, 0.7) 0%, rgba(231, 197, 224, 0.8) 25%, rgba(75, 131, 242, 0.6) 50%, rgba(151, 197, 64, 0.55) 75%, rgba(229, 203, 35, 0.6) 100%)',
      minHeight: '100vh', 
      paddingBottom: '100px'
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section { padding-top: 140px; padding-bottom: 60px; }
        .section-gap { margin-bottom: 100px; } 
        .steps-grid { display: grid; grid-template-columns: 1fr; gap: 70px 30px; } 
        
        /* -- ESTILOS DAS HISTÓRIAS CIRCULARES -- */
        .circle-stories-grid { display: grid; grid-template-columns: 1fr; gap: 60px; }
        
        .circle-img-container {
          width: 240px; 
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 25px auto;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15); 
          transition: transform 0.4s ease;
        }
        .circle-img-container:hover {
          transform: scale(1.03); 
        }
        .circle-story-text {
          text-align: center;
          padding: 0 15px;
        }

        .cta-button {
          display: inline-block; background-color: #1a1a1a; color: #FCFBF9;
          padding: 18px 40px; border-radius: 30px; text-decoration: none;
          font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
          font-size: 0.85rem; transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .cta-button:hover { transform: translateY(-3px); background-color: #333; box-shadow: 0 6px 20px rgba(0,0,0,0.15); }

        @media (min-width: 768px) {
          .hero-section { padding-top: 180px; } 
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 80px 24px; }
          .circle-stories-grid { grid-template-columns: repeat(3, 1fr); gap: 40px; }
        }

        @media (min-width: 1024px) {
          .section-gap { margin-bottom: 160px; }
          .steps-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
        }
      `}} />

      {/* CABEÇALHO */}
      <section className="hero-section" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.8rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 25px 0', lineHeight: '1.1' }}>
            Recriação de Bouquet
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', color: '#222', lineHeight: '1.8', margin: '0 auto', maxWidth: '750px', fontWeight: '500' }}>
            O seu dia especial já passou e não teve a oportunidade de preservar o seu bouquet? 
            Com apenas uma fotografia, recriamos a magia do seu ramo com flores frescas e eternizamo-las numa obra de arte.
          </p>
        </motion.div>
      </section>

      {/* SECÇÃO DOS PASSOS */}
      <section className="section-gap" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '80px' }}>
          Como funciona
        </h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} delay={index * 0.15} />
          ))}
        </div>
      </section>

      {/* SECÇÃO HISTÓRIAS - ESPAÇO EXTRA (marginTop: 80px) PARA EVITAR SOBREPOSIÇÃO */}
      <section className="section-gap" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          {/* TÍTULO PRINCIPAL A PRETO */}
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', 
            fontFamily: "'TAN-MEMORIES', serif", 
            color: '#1a1a1a', 
            margin: 0
          }}>
            Histórias que merecem ser emolduradas
          </h2>
        </div>
        
        <div className="circle-stories-grid">
          {stories.map((story, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="circle-img-container">
                <img 
                  src={story.imageSrc} 
                  alt={story.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
              </div>
              <div className="circle-story-text">
                {/* TÍTULOS DAS HISTÓRIAS A PRETO, NEGRITO (700), NORMAL (S/ MAIÚSCULAS FORÇADAS) */}
                <h4 style={{ 
                  fontFamily: "'Avenir', sans-serif",
                  fontSize: '1.25rem', 
                  color: '#1a1a1a', 
                  margin: '0 0 15px 0', 
                  fontWeight: '700', 
                  letterSpacing: '0.5px' 
                }}>
                  {story.title}
                </h4>
                {/* TEXTO DESCRITIVO A PRETO/CINZA ESCURO */}
                <p style={{ 
                  color: '#222', 
                  fontSize: '1.05rem', 
                  lineHeight: '1.6', 
                  margin: 0, 
                  fontWeight: '500' 
                }}>
                  {story.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRANSPARÊNCIA */}
      <section className="section-gap" style={{ padding: '0 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '60px 40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '2rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '25px' }}>
              Transparência nos Valores
            </h3>
            <p style={{ color: '#333', lineHeight: '1.7', fontSize: '1.1rem', margin: '0 auto 20px auto', maxWidth: '750px' }}>
              Acreditamos que a beleza está na transparência. O valor da recriação de um bouquet divide-se em duas partes simples: o <strong>custo das flores frescas</strong> (orçamentado pela nossa florista parceira) e o <strong>valor da preservação</strong>.
            </p>
            <p style={{ color: '#333', lineHeight: '1.7', fontSize: '1.1rem', margin: '0 auto', maxWidth: '750px' }}>
              O custo da preservação é <strong>exatamente igual</strong> ao preçário base do nosso atelier. Tem total liberdade para escolher o tamanho e formato de moldura que preferir da nossa página de preços, sabendo que todas as peças já incluem o vidro museu de proteção anti-reflexo e proteção UV.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '0 20px' }}>
        <a href="mailto:info@floresabeirario.pt?subject=Pedido de Orçamento - Recriação de Bouquet" className="cta-button">
          Pedir Orçamento para Recriação
        </a>
      </section>

    </main>
  );
}
