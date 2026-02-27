"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO (ESTILO EDITORIAL / ALTERNADO) ---
const StoryStep = ({ imageSrc, number, title, desc, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="story-step" style={{ 
      display: 'flex', 
      flexDirection: 'column', // Base mobile
      alignItems: 'center',
      marginBottom: '80px',
      position: 'relative'
    }}>
      
      {/* IMAGEM */}
      <motion.div 
        className="story-image-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src={imageSrc} 
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div className="step-number">{number}</div>
      </motion.div>

      {/* TEXTO */}
      <motion.div 
        className="story-text-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 style={{ fontSize: '1.8rem', fontFamily: "'TAN-MEMORIES', serif", marginBottom: '15px', color: '#1a1a1a' }}>
          {title}
        </h3>
        <p style={{ color: '#444', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>
          {desc}
        </p>
      </motion.div>

    </div>
  );
};

export default function RecriacaoBouquet() {
  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "01",
      title: "A Fotografia",
      desc: "Envie-nos algumas fotografias originais do dia do evento onde o bouquet seja visível. Quantos mais detalhes conseguirmos ver, ou se lembrar, mais fiel e exata será a recriação."
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "02",
      title: "A Recriação",
      desc: "Trabalhamos em parceria com uma florista local. Enviamos a fotografia e encaminhamos-lhe o orçamento exato para a recriação do bouquet com flores frescas. Se aprovar o valor das flores, a florista cria a réplica e entrega-a diretamente no nosso estúdio, sem ter que se preocupar com nada."
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "03",
      title: "A Preservação",
      desc: "Iniciamos o delicado processo de preservação das flores na nossa prensa para que mantenham a sua cor e o seu formato ao longo do tempo."
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "04",
      title: "A Arte Final",
      desc: "O design botânico é sempre aprovado pelo cliente antes de ser selado na moldura escolhida. O resultado é uma segunda oportunidade de eternizar um dia feliz."
    }
  ];

  return (
    <main style={{ backgroundColor: '#FCFBF9', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* LÓGICA RESPONSIVA (Mobile-First para o Layout Editorial) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-padding { padding-top: 130px; }
        
        /* --- MOBILE --- */
        .story-image-container {
          width: 100%;
          height: 350px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        .story-text-container {
          width: 90%;
          background-color: #FFFFFF;
          padding: 30px 25px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
          position: relative;
          z-index: 2;
          margin-top: -60px; /* Sobrepõe-se à imagem no mobile! Muito premium */
          text-align: center;
        }
        .step-number {
          position: absolute;
          top: 15px; left: 15px;
          background-color: #FFFFFF; color: #1a1a1a;
          padding: 6px 14px; border-radius: 20px;
          font-size: 0.85rem; font-weight: 700;
          font-family: 'TAN-MEMORIES', serif;
        }

        .cta-button {
          display: inline-block; background-color: #1a1a1a; color: #FCFBF9;
          padding: 18px 40px; border-radius: 30px; text-decoration: none;
          font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
          font-size: 0.85rem; transition: all 0.3s ease;
        }
        .cta-button:hover { transform: translateY(-3px); background-color: #333; }

        /* --- DESKTOP --- */
        @media (min-width: 900px) {
          .hero-padding { padding-top: 180px; }
          
          /* Muda para layout lado-a-lado alternado */
          .story-step {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 120px;
          }
          
          /* Inverte a ordem nos passos pares para criar o ziguezague */
          .story-step:nth-child(even) {
            flex-direction: row-reverse;
          }

          .story-image-container {
            width: 48%;
            height: 500px;
            margin-top: 0;
            border-radius: 20px;
          }
          
          .story-text-container {
            width: 42%;
            margin-top: 0;
            box-shadow: none;
            background-color: transparent;
            padding: 0;
            text-align: left;
          }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="hero-padding" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px', marginBottom: '100px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a', opacity: 0.6, marginBottom: '20px' }}>
            Uma segunda oportunidade
          </p>
          <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 25px 0', lineHeight: '1.1' }}>
            Recriação de Bouquet
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#555', lineHeight: '1.8', margin: '0 auto', maxWidth: '700px' }}>
            O seu dia especial já passou e não teve a oportunidade de preservar o seu bouquet? 
            Com apenas uma fotografia, resgatamos a magia do seu ramo.
          </p>
        </motion.div>
      </section>

      {/* COMO FUNCIONA - STORYTELLING EDITORIAL */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', marginBottom: '80px' }}>
        {steps.map((step, index) => (
          <StoryStep 
            key={index} 
            index={index}
            imageSrc={step.imageSrc} 
            number={step.number} 
            title={step.title} 
            desc={step.desc} 
          />
        ))}
      </section>

      {/* CAIXA DE PREÇOS / COMO FUNCIONAM OS VALORES */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', marginBottom: '100px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            backgroundColor: '#F4F1EE', 
            borderRadius: '20px', 
            padding: '50px 40px',
            textAlign: 'center',
            border: '1px solid rgba(26,26,26,0.05)'
          }}
        >
          <h3 style={{ fontSize: '1.8rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '20px' }}>
            Transparência nos Valores
          </h3>
          <p style={{ color: '#444', lineHeight: '1.7', fontSize: '1.05rem', margin: '0 auto', maxWidth: '700px', marginBottom: '30px' }}>
            Acreditamos na simplicidade. O valor final do serviço de recriação corresponde exatamente à soma do <strong>orçamento das flores frescas</strong> (da florista) com o <strong>valor do quadro que escolher</strong> no nosso catálogo de Opções e Preços.
          </p>
          <p style={{ color: '#444', lineHeight: '1.7', fontSize: '0.95rem', margin: '0 auto', maxWidth: '600px', fontStyle: 'italic', opacity: 0.8 }}>
            Todos os nossos quadros incluem a secagem profissional e a emolduração com acabamentos de excelência, incluindo Vidro Museu. Pode escolher o tamanho e formato ideal para a sua recriação.
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
