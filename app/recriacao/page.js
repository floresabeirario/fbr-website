"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO (DESIGN REFINADO COM CAIXA PEQUENA E IMAGEM QUADRADA) ---
const StepCard = ({ imageSrc, number, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    style={{ 
      backgroundColor: '#FFFFFF', 
      borderRadius: '16px', 
      border: '1px solid rgba(26,26,26,0.04)',
      overflow: 'hidden', 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative', // Importante para a sobreposição
      boxShadow: '0 4px 15px rgba(0,0,0,0.03)' // Sombra suave para o cartão flutuar no fundo colorido
    }}
  >
    {/* ÁREA DA IMAGEM - QUADRADO PERFEITO (1:1) */}
    <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#F4F1EE', position: 'relative', overflow: 'hidden' }}>
      <img 
        src={imageSrc} 
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      {/* O Número Grande sobre a foto */}
      <div style={{
        position: 'absolute', top: '12px', left: '16px', color: '#FFFFFF',
        fontSize: '3.5rem', fontWeight: '400', fontFamily: "'TAN-MEMORIES', serif",
        lineHeight: '1', textShadow: '0px 3px 10px rgba(0,0,0,0.4)'
      }}>
        {number}
      </div>
    </div>
    
    {/* A CAIXA PEQUENA NA FRONTEIRA (50% FOTO / 50% TEXTO) */}
    <div style={{
      position: 'absolute',
      top: 'calc(50% - 35px)', // Centrado na linha que divide a imagem do texto.
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#FFFFFF',
      color: '#1a1a1a',
      padding: '10px 24px',
      borderRadius: '30px', // Formato de "pílula" elegante
      textAlign: 'center',
      width: 'max-content',
      maxWidth: '90%',
      whiteSpace: 'nowrap', // Impede que o texto quebre
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      zIndex: 10 // Garante que fica por cima de tudo
    }}>
      <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', color: '#8DB9F2', marginBottom: '2px' }}>
        Passo {number}
      </span>
      <h3 style={{ fontSize: '1.2rem', fontFamily: "'TAN-MEMORIES', serif", margin: 0, lineHeight: '1.2' }}>
        {title}
      </h3>
    </div>

    {/* ÁREA DO TEXTO - ESPAÇAMENTO REAJUSTADO */}
    <div style={{ padding: '40px 20px 24px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
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
      title: "A Recriação",
      desc: "Em parceria com uma florista local, enviamos as imagens e reencaminhamos-lhe o orçamento das flores frescas. Após a sua aprovação, a florista cria a réplica perfeita."
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
    // O MÁGICO FUNDO EM TRANSIÇÃO COM CORES MAIS SATURADAS E VIBRANTES
    // Cores usadas: Azul claro (#8DB9F2), Lilás (#E7C5E0), Azul (#4B83F2), Verde (#97C540), Amarelo (#E5CB23)
    <main style={{ 
      background: 'linear-gradient(to bottom, rgba(141, 185, 242, 0.4) 0%, rgba(231, 197, 224, 0.5) 25%, rgba(75, 131, 242, 0.35) 50%, rgba(151, 197, 64, 0.3) 75%, rgba(229, 203, 35, 0.35) 100%)',
      minHeight: '100vh', 
      paddingBottom: '60px' // Espaço no fundo da página
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* ESPAÇAMENTOS APERTADOS (MOBILE FIRST) */
        .hero-padding { padding-top: 100px; }
        .section-margin { margin-bottom: 60px; } /* Margem padrão compactada */
        
        /* GRELHA DOS PASSOS */
        .steps-grid { display: grid; grid-template-columns: 1fr; gap: 30px; } /* Gap menor para o mobile */
        
        .cta-button {
          display: inline-block; background-color: #1a1a1a; color: #FCFBF9;
          padding: 16px 36px; border-radius: 30px; text-decoration: none;
          font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
          font-size: 0.85rem; transition: transform 0.3s ease, background-color 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .cta-button:hover { transform: translateY(-3px); background-color: #333; }

        .dream-card {
          background-color: rgba(255, 255, 255, 0.7); /* Ligeiramente transparente para mostrar o gradiente do fundo */
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.9);
          padding: 30px;
          border-radius: 12px;
          text-align: left;
          height: 100%;
        }

        /* TABLET */
        @media (min-width: 768px) {
          .hero-padding { padding-top: 130px; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 40px 24px; }
          .section-margin { margin-bottom: 80px; }
        }

        /* DESKTOP (Ecrãs Largos) */
        @media (min-width: 1024px) {
          .section-margin { margin-bottom: 100px; } 
          .steps-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
          .dream-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
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
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '60px' }}>
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
              delay={index * 0.1} 
            />
          ))}
        </div>
      </section>

      {/* HISTÓRIAS QUE MERECEM SER EMOLDURADAS */}
      <section className="section-margin" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', lineHeight: '1.1' }}>
            Histórias que merecem ser emolduradas
          </h2>
        </motion.div>

        <div className="dream-grid">
          <motion.div className="dream-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.4rem', color: '#1a1a1a', margin: '0 0 10px 0' }}>A "Segunda Oportunidade"</h4>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Para as noivas que descobriram a preservação botânica tarde demais ou cujo bouquet original, infelizmente, não sobreviveu ao próprio dia do casamento.
            </p>
          </motion.div>

          <motion.div className="dream-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.4rem', color: '#1a1a1a', margin: '0 0 10px 0' }}>Aniversários & Surpresas</h4>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              O presente mais romântico e inesperado que pode oferecer à sua cara-metade no vosso primeiro (ou décimo!) aniversário de casamento.
            </p>
          </motion.div>

          <motion.div className="dream-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.4rem', color: '#1a1a1a', margin: '0 0 10px 0' }}>Bodas de Ouro e Prata</h4>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Um presente indescritível dos filhos para os pais, trazendo literalmente à vida o ramo de noiva de um casamento celebrado há décadas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TRANSPARÊNCIA DE VALORES */}
      <section className="section-margin" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', marginTop: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '16px', 
            padding: '50px 30px', /* Padding reduzido para a caixa de preços não parecer tão gigante */
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
          }}
        >
          <h3 style={{ fontSize: '1.8rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '20px' }}>
            Transparência nos Valores
          </h3>
          <p style={{ color: '#444', lineHeight: '1.7', fontSize: '1.05rem', margin: '0 auto 20px auto', maxWidth: '700px' }}>
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
