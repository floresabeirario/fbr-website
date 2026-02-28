"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO (FOTOS QUADRADAS COM NÚMERO GRANDE) ---
const StepCard = ({ imageSrc, number, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ 
      backgroundColor: '#FFFFFF', 
      borderRadius: '12px', 
      border: '1px solid rgba(26,26,26,0.04)',
      overflow: 'hidden', 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
    }}
  >
    {/* IMAGEM QUADRADA COM NÚMERO OVERLAY */}
    <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#F4F1EE', position: 'relative', overflow: 'hidden' }}>
      <img 
        src={imageSrc} 
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      {/* O Número Grande sobre a foto */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '20px',
        color: '#FFFFFF',
        fontSize: '4.5rem',
        fontWeight: '400',
        fontFamily: "'TAN-MEMORIES', serif",
        lineHeight: '1',
        textShadow: '0px 4px 15px rgba(0,0,0,0.4)' // Sombra para garantir leitura em fundos claros
      }}>
        {number}
      </div>
    </div>

    {/* TEXTO REESCRITO E PREMIUM */}
    <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "1",
      title: "O Resgate da Memória",
      desc: "Envie-nos algumas fotografias originais do grande dia onde o seu bouquet seja visível. Quantos mais detalhes e ângulos conseguir reunir, mais fiel e exata será a nossa recriação."
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "2",
      title: "As Novas Flores",
      desc: "Em parceria com uma florista local de excelência, avaliamos as imagens e enviamos-lhe o orçamento exato das flores frescas. Após a sua aprovação, a florista cria a réplica perfeita e entrega-a diretamente no nosso estúdio."
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "3",
      title: "A Preservação",
      desc: "Assim que as flores chegam às nossas mãos, iniciamos o delicado processo de prensagem botânica, trabalhando com o máximo cuidado para eternizar a cor e o formato original de cada flor."
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "4",
      title: "A Obra de Arte",
      desc: "O design botânico da composição é meticulosamente criado e enviado para a sua aprovação. Só depois selamos as flores na moldura, devolvendo-lhe um pedaço de história para pendurar na parede."
    }
  ];

  return (
    <main style={{ backgroundColor: '#FCFBF9', minHeight: '100vh', paddingBottom: '100px' }}>
      
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

        .dream-card {
          background-color: #FFFFFF;
          border: 1px solid rgba(26,26,26,0.06);
          padding: 30px;
          border-radius: 12px;
          text-align: left;
          height: 100%;
        }

        /* TABLET (2 colunas) */
        @media (min-width: 768px) {
          .hero-padding { padding-top: 160px; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }

        /* DESKTOP LARGOS (4 colunas para passos, 3 para sonhos) */
        @media (min-width: 1100px) {
          .steps-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
          .dream-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="hero-padding" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px', marginBottom: '80px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a', opacity: 0.5, marginBottom: '20px' }}>
            O tempo não apaga emoções
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 25px 0', lineHeight: '1.1' }}>
            Recriação de Bouquet
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#555', lineHeight: '1.8', margin: '0 auto', maxWidth: '700px' }}>
            O seu evento já passou e não teve a oportunidade de preservar as suas flores? 
            Com apenas uma fotografia, devolvemos-lhe a magia do seu ramo original e eternizamo-lo numa obra de arte botânica.
          </p>
        </motion.div>
      </section>

      {/* A MAGIA DE RECRIAR (FAZER O CLIENTE SONHAR) */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginBottom: '100px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 style={{ fontSize: '2.2rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '15px' }}>
            Quando a memória pede uma segunda oportunidade
          </h2>
          <p style={{ color: '#555', fontSize: '1.05rem', margin: '0 auto', maxWidth: '700px' }}>
            A recriação é um dos serviços mais emocionantes do nosso estúdio. É a escolha perfeita para resgatar histórias únicas:
          </p>
        </motion.div>

        <div className="dream-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          <div className="dream-card">
            <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.3rem', color: '#1a1a1a', margin: '0 0 10px 0' }}>A "Segunda Oportunidade"</h4>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Para as noivas que descobriram a preservação botânica tarde demais ou cujo bouquet não sobreviveu ao próprio dia do casamento.
            </p>
          </div>

          <div className="dream-card">
            <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.3rem', color: '#1a1a1a', margin: '0 0 10px 0' }}>Aniversários & Surpresas</h4>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              O presente mais romântico e inesperado que pode oferecer à sua cara-metade no vosso primeiro (ou décimo!) aniversário de casamento.
            </p>
          </div>

          <div className="dream-card">
            <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.3rem', color: '#1a1a1a', margin: '0 0 10px 0' }}>Bodas de Ouro e Prata</h4>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Um presente indescritível dos filhos para os pais, trazendo à vida o ramo de noiva de um casamento celebrado há décadas.
            </p>
          </div>

        </div>
      </section>

      {/* GRELHA DOS 4 PASSOS */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', marginBottom: '100px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '40px' }}>
          Como funciona o processo?
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

      {/* TRANSPARÊNCIA DE VALORES (TEXTO CORRIGIDO E ELEGANTE) */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', marginBottom: '80px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            backgroundColor: '#F4F1EE', 
            borderRadius: '16px', 
            padding: '50px 40px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ fontSize: '1.8rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '20px' }}>
            Transparência nos Valores
          </h3>
          <p style={{ color: '#444', lineHeight: '1.7', fontSize: '1.05rem', margin: '0 auto', maxWidth: '700px', marginBottom: '20px' }}>
            Acreditamos que a beleza está na transparência. O valor da recriação de um bouquet divide-se em duas partes simples: o <strong>custo das flores frescas</strong> (orçamentado pela nossa florista parceira) e o <strong>valor da preservação</strong>.
          </p>
          <p style={{ color: '#444', lineHeight: '1.7', fontSize: '1.05rem', margin: '0 auto', maxWidth: '700px' }}>
            O custo da preservação é <strong>exatamente igual</strong> ao preçário base do nosso atelier. Tem total liberdade para escolher o tamanho e formato de moldura que preferir da nossa página de preços, sabendo que todas as peças já incluem o vidro museu de proteção anti-reflexo e proteção UV.
          </p>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section style={{ textAlign: 'center', padding: '0 20px' }}>
        <a href="mailto:info@floresabeirario.pt?subject=Pedido de Orçamento - Recriação de Bouquet" className="cta-button">
          Pedir Orçamento para Recriação
        </a>
      </section>

    </main>
  );
}
