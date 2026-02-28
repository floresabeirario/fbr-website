"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO (COM CAIXA DE TÍTULO SOBREPOSTA E CORES) ---
const StepCard = ({ imageSrc, number, title, desc, delay, bgColor }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative' // Importante para a sobreposição
    }}
  >
    {/* IMAGEM (Topo) */}
    <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#F4F1EE', overflow: 'hidden' }}>
      <img 
        src={imageSrc} 
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>

    {/* CAIXA DE TÍTULO SOBREPOSTA */}
    <div style={{
      position: 'absolute',
      top: 'calc(50% - 35px)', // Centrado na linha que divide a imagem do texto. Ajustar os 35px consoante a altura da caixa
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: bgColor,
      color: '#FFFFFF',
      padding: '12px 24px',
      borderRadius: '8px',
      textAlign: 'center',
      width: '85%', // Ocupa a maior parte da largura
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      zIndex: 10 // Garante que fica por cima de tudo
    }}>
      <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', opacity: 0.9, marginBottom: '4px' }}>
        Passo {number}
      </span>
      <h3 style={{ fontSize: '1.2rem', fontFamily: "'TAN-MEMORIES', serif", margin: 0, lineHeight: '1.2' }}>
        {title}
      </h3>
    </div>

    {/* CAIXA DE DESCRIÇÃO (Abaixo da Imagem) */}
    <div style={{ 
      backgroundColor: '#FFFFFF', 
      padding: '50px 25px 30px 25px', // Padding extra no topo para acomodar a caixa sobreposta
      display: 'flex', 
      flexDirection: 'column', 
      flexGrow: 1,
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
      border: '1px solid rgba(26,26,26,0.04)',
      borderTop: 'none',
      boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
    }}>
      <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', margin: 0, textAlign: 'center' }}>
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
      desc: "Envie-nos algumas fotografias do dia onde o bouquet seja visível. Quantos mais detalhes e ângulos conseguir reunir ou lembrar-se, mais fiel será a recriação.",
      bgColor: "#4B83F2" // Azul
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "2",
      title: "A Recriação",
      desc: "Em parceria com uma florista local, enviamos as imagens e reencaminhamos-lhe o orçamento das flores frescas. Após a sua aprovação, a florista cria a réplica perfeita.",
      bgColor: "#97C540" // Verde
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "3",
      title: "A Preservação",
      desc: "Quando as flores chegam, iniciamos a prensagem de cada flor, trabalhando com o máximo cuidado para eternizar a cor e o formato original de cada elemento.",
      bgColor: "#E5CB23" // Amarelo
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "4",
      title: "A Obra de Arte",
      desc: "A composição é meticulosamente criada e enviada para a sua aprovação. Só depois o quadro é emoldurado, devolvendo-lhe um pedaço de história.",
      bgColor: "#4B83F2" // Azul (repete para dar ritmo)
    }
  ];

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '100px', backgroundColor: '#FCFBF9' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-padding { padding-top: 100px; }
        .section-margin { margin-bottom: 100px; } 
        
        /* GRELHA DOS PASSOS */
        .steps-grid { display: grid; grid-template-columns: 1fr; gap: 40px; } /* Gap maior para acomodar a sobreposição */
        
        .cta-button {
          display: inline-block; background-color: #1a1a1a; color: #FCFBF9;
          padding: 18px 40px; border-radius: 30px; text-decoration: none;
          font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
          font-size: 0.85rem; transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .cta-button:hover { transform: translateY(-3px); background-color: #333; }

        /* TABLET */
        @media (min-width: 768px) {
          .hero-padding { padding-top: 120px; } 
          .section-margin { margin-bottom: 140px; } 
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 40px 24px; }
        }

        /* DESKTOP */
        @media (min-width: 1024px) {
          .section-margin { margin-bottom: 160px; } 
          .steps-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
        }
      `}} />

      {/* CABEÇALHO (Fundo Azul Claro muito subtil) */}
      <section className="hero-padding section-margin" style={{ backgroundColor: 'rgba(141, 185, 242, 0.05)', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 20px 0', lineHeight: '1.1' }}>
              Recriação de Bouquet
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#555', lineHeight: '1.8', margin: '0 auto', maxWidth: '700px' }}>
              O seu dia especial já passou e não teve a oportunidade de preservar o seu bouquet? 
              Com apenas uma fotografia, recriamos a magia do seu ramo com flores frescas e eternizamo-las numa obra de arte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECÇÃO DOS PASSOS (Fundo Lilás muito subtil) */}
      <section className="section-margin" style={{ backgroundColor: 'rgba(231, 197, 224, 0.2)', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '60px' }}>
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
                bgColor={step.bgColor}
                delay={index * 0.15} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECÇÃO INFERIOR: HISTÓRIAS & DESTAQUE (Fundo Azul Claro muito subtil) */}
      <section className="section-margin" style={{ backgroundColor: 'rgba(141, 185, 242, 0.1)', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', lineHeight: '1.1' }}>
              Histórias que merecem ser emolduradas
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            {/* CAIXA DE DESTAQUE (Com Borda Amarela) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ backgroundColor: '#FFFFFF', padding: '40px 30px', borderRadius: '16px', border: '3px solid #E5CB23', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            >
              <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.5rem', color: '#1a1a1a', margin: '0 0 15px 0' }}>
                A "Segunda Oportunidade"
              </h4>
              <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                Para as noivas que descobriram a preservação botânica tarde demais ou cujo bouquet original, infelizmente, não sobreviveu ao próprio dia do casamento.
              </p>
            </motion.div>

            {/* Outras Histórias (Estilo Limpo) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              style={{ backgroundColor: '#FFFFFF', padding: '40px 30px', borderRadius: '16px', border: '1px solid rgba(26,26,26,0.05)', textAlign: 'center' }}
            >
              <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.4rem', color: '#1a1a1a', margin: '0 0 15px 0' }}>Aniversários & Surpresas</h4>
              <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                O presente mais romântico e inesperado que pode oferecer à sua cara-metade no vosso primeiro (ou décimo!) aniversário de casamento.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              style={{ backgroundColor: '#FFFFFF', padding: '40px 30px', borderRadius: '16px', border: '1px solid rgba(26,26,26,0.05)', textAlign: 'center' }}
            >
              <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.4rem', color: '#1a1a1a', margin: '0 0 15px 0' }}>Bodas de Ouro e Prata</h4>
              <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                Um presente indescritível dos filhos para os pais, trazendo literalmente à vida o ramo de noiva de um casamento celebrado há décadas.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TRANSPARÊNCIA DE VALORES (Mantida como estava) */}
      <section className="section-margin" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', marginTop: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '16px', 
            padding: '60px 40px',
            textAlign: 'center',
            border: '1px solid rgba(26,26,26,0.05)'
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
