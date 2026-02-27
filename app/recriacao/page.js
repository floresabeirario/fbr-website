"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO (AGORA COM FOTOGRAFIA) ---
const StepCard = ({ imageSrc, number, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ 
      backgroundColor: '#FFFFFF', 
      borderRadius: '20px', // Cantos bem redondos e modernos
      overflow: 'hidden', // Garante que a foto respeita os cantos redondos da caixa
      boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
  >
    {/* A FOTOGRAFIA DO PASSO */}
    <div style={{ width: '100%', height: '240px', backgroundColor: '#F4F1EE', position: 'relative' }}>
      <img 
        src={imageSrc} 
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      {/* O Número a flutuar em cima da foto (toque super premium) */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        backgroundColor: '#FFFFFF',
        color: '#1a1a1a',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '700',
        fontFamily: "'TAN-MEMORIES', serif"
      }}>
        {number}
      </div>
    </div>

    {/* O TEXTO EXPLICATIVO */}
    <div style={{ padding: '25px' }}>
      <h3 style={{ fontSize: '1.4rem', fontFamily: "'TAN-MEMORIES', serif", marginBottom: '12px', color: '#1a1a1a' }}>
        {title}
      </h3>
      <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
        {desc}
      </p>
    </div>
  </motion.div>
);

export default function RecriacaoBouquet() {
  // Array atualizado com os caminhos das tuas imagens
  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "Passo 01",
      title: "A Fotografia",
      desc: "Envie-nos algumas fotografias originais do dia do evento onde o bouquet seja visível. Quantos mais detalhes conseguirmos ver, melhor será a recriação."
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "Passo 02",
      title: "A Recriação",
      desc: "Trabalhamos em parceria com uma florista local de excelência. Analisamos a sua fotografia e enviamos-lhe o orçamento exato para a recriação com flores frescas."
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "Passo 03",
      title: "A Prensagem",
      desc: "Se aprovar o valor das flores, a florista cria a réplica e entrega-a diretamente no nosso estúdio, onde iniciamos imediatamente o delicado processo botânico."
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "Passo 04",
      title: "A Arte Final",
      desc: "Transformamos o novo bouquet numa obra de arte emoldurada. Uma segunda oportunidade para guardar a memória de um dia feliz, para sempre."
    }
  ];

  return (
    <main style={{ backgroundColor: '#F4F1EE', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* ESPAÇAMENTO RESPONSIVO DO TOPO (MOBILE-FIRST) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-padding { padding-top: 130px; }
        .steps-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        
        .cta-button {
          display: inline-block;
          background-color: #1a1a1a;
          color: #FCFBF9;
          padding: 18px 40px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.85rem;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .cta-button:hover {
          transform: translateY(-3px);
          background-color: #333;
        }

        /* TABLET */
        @media (min-width: 768px) {
          .hero-padding { padding-top: 160px; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 30px; }
        }

        /* DESKTOP ECRÃS LARGOS */
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
          <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 25px 0', lineHeight: '1.1' }}>
            Recriação de Bouquet
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#555', lineHeight: '1.8', margin: '0 auto', maxWidth: '700px' }}>
            O seu dia especial já passou e não teve a oportunidade de preservar o seu bouquet? 
            Com apenas uma fotografia, recriamos a magia do seu ramo com flores frescas e eternizamo-las numa obra de arte.
          </p>
        </motion.div>
      </section>

      {/* HOW IT WORKS - 4 PASSOS COM FOTOS */}
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

      {/* INSPIRAÇÃO / OCASIÕES */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '100px 20px', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '40px' }}>
            A prenda mais inesquecível
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
            Este serviço é a forma perfeita de resgatar uma memória que parecia perdida no tempo. É o presente ideal para:
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '60px' }}>
            {["Bodas de Ouro e Prata", "Presentes de Filhos para Pais", "Surpresas de Aniversário de Casamento", "Para quem descobriu o nosso estúdio tarde demais"].map((tag, i) => (
              <span key={i} style={{ backgroundColor: '#F4F1EE', color: '#1a1a1a', padding: '10px 20px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: '500' }}>
                {tag}
              </span>
            ))}
          </div>

          <a href="mailto:info@floresabeirario.pt?subject=Pedido de Orçamento - Recriação de Bouquet" className="cta-button">
            Pedir Orçamento para Recriação
          </a>
        </motion.div>
      </section>

    </main>
  );
}
