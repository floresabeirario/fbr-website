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
    {/* ÁREA DA IMAGEM - QUADRADO PERFEITO E BLINDADO */}
    <div style={{ 
      width: '100%', 
      aspectRatio: '1 / 1', 
      overflow: 'hidden', // Corta a foto perfeitamente
      borderRadius: '16px 16px 0 0',
      backgroundColor: '#f9f9f9'
    }}>
      <img 
        src={imageSrc} 
        alt={title}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', // Preenche sem distorcer
          display: 'block'
        }} 
      />
    </div>

    {/* ÂNCORA PARA A CÁPSULA - Fica exatamente na linha que separa a foto do texto */}
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* CÁPSULA CENTRADA (TÍTULO) */}
      <div style={{
        position: 'absolute',
        top: '0', 
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        backgroundColor: '#FFFFFF',
        padding: '10px 28px', // Ligeiramente reduzido para acompanhar a letra mais pequena
        borderRadius: '50px', 
        textAlign: 'center',
        whiteSpace: 'nowrap', 
        boxShadow: '0 8px 25px rgba(0,0,0,0.08)', 
        width: 'max-content'
      }}>
        <span style={{ 
          display: 'block', 
          fontSize: '0.65rem', 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          fontWeight: '700', 
          color: '#8DB9F2', 
          marginBottom: '4px' 
        }}>
          Passo {number}
        </span>
        {/* TITULO MENOR COMO PEDIDO (1.15rem) */}
        <h3 style={{ 
          fontSize: '1.15rem', 
          fontFamily: "'TAN-MEMORIES', serif", 
          margin: 0, 
          color: '#1a1a1a',
          lineHeight: '1.1' 
        }}>
          {title}
        </h3>
      </div>
    </div>

    {/* ÁREA DO TEXTO - MENOS ESPAÇO VAZIO (PADDING REDUZIDO) */}
    <div style={{ 
      padding: '45px 20px 25px 20px', // Reduzido o espaço no topo, fundo e lados
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
    // FUNDO COM CORES MAIS SATURADAS (Opacidade aumentada)
    <main style={{ 
      background: 'linear-gradient(to bottom, rgba(141, 185, 242, 0.7) 0%, rgba(231, 197, 224, 0.8) 25%, rgba(75, 131, 242, 0.6) 50%, rgba(151, 197, 64, 0.55) 75%, rgba(229, 203, 35, 0.6) 100%)',
      minHeight: '100vh', 
      paddingBottom: '100px'
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section { padding-top: 140px; padding-bottom: 60px; }
        .section-gap { margin-bottom: 100px; } 
        .steps-grid { display: grid; grid-template-columns: 1fr; gap: 70px 30px; } 
        
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
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', color: '#333', lineHeight: '1.8', margin: '0 auto', maxWidth: '750px' }}>
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

      {/* SECÇÃO HISTÓRIAS */}
      <section className="section-gap" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a' }}>
            Histórias que merecem ser emolduradas
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[
            { t: "A Segunda Oportunidade", d: "Para as noivas que descobriram a preservação botânica tarde demais ou cujo bouquet original não sobreviveu." },
            { t: "Aniversários & Surpresas", d: "O presente mais romântico e inesperado para oferecer no vosso primeiro ou décimo aniversário de casamento." },
            { t: "Bodas de Ouro e Prata", d: "Um presente indescritível dos filhos para os pais, trazendo à vida o ramo de um casamento celebrado há décadas." }
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#FFFFFF', padding: '40px 30px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.4rem', marginBottom: '15px', color: '#1a1a1a' }}>{item.t}</h4>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRANSPARÊNCIA */}
      <section className="section-gap" style={{ padding: '0 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '60px 30px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.8rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '20px' }}>
              Transparência nos Valores
            </h3>
            <p style={{ color: '#444', lineHeight: '1.7', fontSize: '1.05rem', margin: '0 auto 20px auto', maxWidth: '700px' }}>
              Acreditamos que a beleza está na transparência. O valor da recriação de um bouquet divide-se em duas partes simples: o <strong>custo das flores frescas</strong> (orçamentado pela nossa florista parceira) e o <strong>valor da preservação</strong>.
            </p>
            <p style={{ color: '#444', lineHeight: '1.7', fontSize: '1.05rem', margin: '0 auto', maxWidth: '700px' }}>
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
