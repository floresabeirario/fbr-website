"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO (MAIS COMPACTO E DIRETO) ---
const StepCard = ({ imageSrc, number, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    style={{ 
      backgroundColor: '#FFFFFF', 
      borderRadius: '12px', 
      border: '1px solid rgba(26,26,26,0.04)',
      overflow: 'hidden', 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 4px 15px rgba(0,0,0,0.03)' // Sombra um pouco mais subtil e próxima
    }}
  >
    <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#F4F1EE', position: 'relative', overflow: 'hidden' }}>
      <img 
        src={imageSrc} 
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      <div style={{
        position: 'absolute', top: '12px', left: '16px', color: '#FFFFFF',
        fontSize: '3.5rem', /* Número ligeiramente menor para ser mais proporcional ao layout apertado */
        fontWeight: '400', fontFamily: "'TAN-MEMORIES', serif",
        lineHeight: '1', textShadow: '0px 3px 10px rgba(0,0,0,0.4)'
      }}>
        {number}
      </div>
    </div>
    
    {/* TEXTO - ESPAÇAMENTO REDUZIDO DRÁSTICAMENTE AQUI */}
    <div style={{ padding: '16px 20px 24px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <h3 style={{ fontSize: '1.3rem', fontFamily: "'TAN-MEMORIES', serif", margin: '0 0 10px 0', color: '#1a1a1a' }}>
        {title}
      </h3>
      <p style={{ color: '#555', lineHeight: '1.5', fontSize: '0.95rem', margin: 0 }}>
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
      title: "A Recriação das Flores",
      desc: "Em parceria com uma florista local, enviamos as imagens e reencaminhamos-lhe o orçamento das flores frescas. Após a sua aprovação, a florista cria a réplica perfeita e entrega-a diretamente no nosso estúdio."
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "3",
      title: "A Preservação",
      desc: "Quando as flores chegam às nossas mãos, iniciamos o delicado processo de prensagem de cada flor, trabalhando com o máximo cuidado para eternizar a cor e o formato original de cada elemento."
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "4",
      title: "A Obra de Arte",
      desc: "Por fim, a composição é meticulosamente criada e enviada para a sua aprovação. Só depois o quadro é emoldurado, devolvendo-lhe um pedaço de história para pendurar na parede."
    }
  ];

  return (
    <main style={{ 
      background: 'linear-gradient(to bottom, #F4F1EE 0%, #E6E9E3 30%, #EFE6E4 70%, #F4F1EE 100%)', 
      minHeight: '100vh', 
      paddingBottom: '60px' // Reduzido o espaço no fundo da página
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* ESPAÇAMENTOS APERTADOS (MOBILE FIRST) */
        .hero-padding { padding-top: 100px; }
        
        .steps-grid { display: grid; grid-template-columns: 1fr; gap: 16px; } /* Gap menor */
        
        .cta-button {
          display: inline-block; background-color: #1a1a1a; color: #FCFBF9;
          padding: 16px 36px; border-radius: 30px; text-decoration: none;
          font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
          font-size: 0.85rem; transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .cta-button:hover { transform: translateY(-3px); background-color: #333; }

        .inspiration-container { display: flex; flex-direction: column; gap: 24px; }
        .inspiration-item {
          border-bottom: 1px solid rgba(26,26,26,0.1);
          padding-bottom: 20px; margin-bottom: 20px;
        }
        .inspiration-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .inspiration-title { font-family: 'TAN-MEMORIES', serif; font-size: 1.3rem; color: #1a1a1a; margin-bottom: 8px; }
        .inspiration-desc { color: #555; font-size: 0.95rem; line-height: 1.5; margin: 0; }

        .section-margin { margin-bottom: 60px; } /* Margem padrão compactada */

        /* TABLET */
        @media (min-width: 768px) {
          .hero-padding { padding-top: 130px; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .section-margin { margin-bottom: 80px; }
        }

        /* DESKTOP */
        @media (min-width: 1024px) {
          .steps-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
          
          .inspiration-container { 
            flex-direction: row; 
            align-items: flex-start;
            gap: 60px;
          }
          .inspiration-left { width: 40%; position: sticky; top: 100px; }
          .inspiration-right { width: 60%; }
          .inspiration-title { font-size: 1.5rem; }
          
          .section-margin { margin-bottom: 100px; }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="hero-padding section-margin" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a', opacity: 0.5, marginBottom: '16px' }}>
            Uma segunda oportunidade
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 20px 0', lineHeight: '1.1' }}>
            Recriação de Bouquet
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#555', lineHeight: '1.6', margin: '0 auto', maxWidth: '700px' }}>
            O seu dia especial já passou e não teve a oportunidade de preservar o seu bouquet? 
            Com apenas uma fotografia, recriamos a magia do seu ramo com flores frescas e eternizamo-las numa obra de arte.
          </p>
        </motion.div>
      </section>

      {/* GRELHA DOS 4 PASSOS */}
      <section className="section-margin" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              imageSrc={step.imageSrc} 
              number={step.number} 
              title={step.title} 
              desc={step.desc} 
              delay={index * 0.1} 
            />
          ))}
        </div>
      </section>

      {/* HISTÓRIAS QUE MERECEM SER EMOLDURADAS */}
      <section className="section-margin" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div 
          className="inspiration-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inspiration-left">
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', lineHeight: '1.1', margin: '0 0 15px 0' }}>
              Histórias que merecem ser emolduradas
            </h2>
            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
              A recriação é a escolha perfeita para resgatar memórias inesquecíveis que o tempo não conseguiu apagar.
            </p>
          </div>

          <div className="inspiration-right">
            <div className="inspiration-item">
              <h4 className="inspiration-title">A "Segunda Oportunidade"</h4>
              <p className="inspiration-desc">
                Para as noivas que descobriram a preservação botânica tarde demais ou cujo bouquet original, infelizmente, não sobreviveu ao próprio dia do casamento.
              </p>
            </div>
            <div className="inspiration-item">
              <h4 className="inspiration-title">Aniversários & Surpresas</h4>
              <p className="inspiration-desc">
                O presente mais romântico e inesperado que pode oferecer à sua cara-metade no vosso primeiro (ou décimo!) aniversário de casamento.
              </p>
            </div>
            <div className="inspiration-item">
              <h4 className="inspiration-title">Bodas de Ouro e Prata</h4>
              <p className="inspiration-desc">
                Um presente indescritível dos filhos para os pais, trazendo literalmente à vida o ramo de noiva de um casamento celebrado há décadas.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRANSPARÊNCIA DE VALORES */}
      <section className="section-margin" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '16px', 
            padding: '40px 30px', /* Padding reduzido para a caixa de preços não parecer tão gigante */
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.9)'
          }}
        >
          <h3 style={{ fontSize: '1.6rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 15px 0' }}>
            Transparência nos Valores
          </h3>
          <p style={{ color: '#444', lineHeight: '1.6', fontSize: '1rem', margin: '0 auto 15px auto', maxWidth: '700px' }}>
            Acreditamos que a beleza está na transparência. O valor da recriação de um bouquet divide-se em duas partes simples: o <strong>custo das flores frescas</strong> (orçamentado pela nossa florista parceira) e o <strong>valor da preservação</strong>.
          </p>
          <p style={{ color: '#444', lineHeight: '1.6', fontSize: '1rem', margin: '0 auto', maxWidth: '700px' }}>
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
