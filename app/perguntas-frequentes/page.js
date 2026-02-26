"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ÍCONE BOLD ---
const PlusIcon = ({ isOpen }) => (
  <motion.div
    animate={{ 
      backgroundColor: isOpen ? '#1a1a1a' : 'transparent',
      rotate: isOpen ? 135 : 0 
    }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    style={{ 
      width: '34px', height: '34px',
      borderRadius: '50%', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '2px solid #1a1a1a', flexShrink: 0
    }}
  >
    <svg 
      width="16" height="16" viewBox="0 0 20 20" fill="none" 
      stroke={isOpen ? '#fff' : '#1a1a1a'} strokeWidth="2.5" strokeLinecap="round"
    >
      <path d="M10 3V17M3 10H17"/>
    </svg>
  </motion.div>
);

// --- COMPONENTE DA PERGUNTA (DESIGN NEO-BRUTALISTA) ---
const FAQItem = ({ q, a, index, bgColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="faq-item-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: bgColor, 
        borderRadius: '12px', // Cantos ligeiramente mais retos para um look mais arrojado
        border: '2px solid #1a1a1a', // Borda grossa preta (Super moderno)
        // Sombra dura que reage ao rato para dar um efeito tátil
        boxShadow: isHovered || isOpen ? '6px 6px 0px #1a1a1a' : '3px 3px 0px #1a1a1a',
        transform: isHovered || isOpen ? 'translate(-3px, -3px)' : 'translate(0px, 0px)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        cursor: 'pointer',
        width: '100%',
        marginBottom: '10px' // Espaço para a sombra não cortar
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="faq-btn" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h3 className="faq-title" style={{ 
          margin: 0, 
          color: '#1a1a1a',
          fontFamily: "'TAN-MEMORIES', serif",
          lineHeight: '1.2'
        }}>
          {q}
        </h3>
        <PlusIcon isOpen={isOpen} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="faq-answer">
              <div style={{ 
                color: '#1a1a1a', // Texto a preto para contraste máximo com as cores vibrantes
                lineHeight: '1.6', 
                fontWeight: '500', // Um pouco mais forte para acompanhar o estilo bold
                borderTop: '2px solid #1a1a1a', // Linha divisória sólida e arrojada
                paddingTop: '16px',
                whiteSpace: 'pre-line' 
              }}>
                {a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function PerguntasFrequentes() {
  const faqCategories = [
    {
      title: "O Processo & As Flores",
      bgColor: "#00E676", // VERDE ELÉTRICO VIBRANTE
      items: [
        {
          q: "Apenas preservam bouquets de casamento?",
          a: "Não, preservamos e emolduramos todos os tipos de flores de ocasiões especiais, incluindo: cerimónias de batizado, aniversários, comemorações de bodas, homenagens e cerimónias fúnebres, ramos oferecidos em datas marcantes ou flores espontâneas com valor sentimental."
        },
        {
          q: "Preservam todo o tipo de flores?",
          a: "A grande maioria das flores reage muito bem à prensagem e secagem. No entanto, algumas flores com elevado teor de água (como suculentas ou antúrios) ou formatos muito espessos podem ser mais desafiantes ou não manter a sua forma original. Caso tenha dúvidas sobre flores específicas, não hesite em contactar-nos."
        },
        {
          q: "Como funciona o processo?",
          a: "Tudo começa com a reserva da sua vaga. Depois, deve enviar ou entregar as flores até 2 a 3 dias após o evento. As flores são cuidadosamente prensadas e secas. Criamos uma composição e enviamos uma fotografia para aprovação antes de selarmos a moldura."
        },
        {
          q: "As cores vão ser as mesmas quando estiverem secas?",
          a: "Inevitavelmente, haverá alguma mudança de cor assim que toda a humidade for removida da flor. Algumas mantêm as cores vibrantes, outras desbotam (as rosas vermelhas tornam-se bordô, por exemplo). Esta é a beleza do processo: a essência natural para guardar para sempre."
        }
      ]
    },
    {
      title: "Reservas & Envios",
      bgColor: "#FF2A85", // ROSA CHOQUE / MAGENTA VIBRANTE
      items: [
        {
          q: "Quando devo agendar a preservação das minhas flores?",
          a: "O ideal é agendar a preservação com antecedência, assim que souber a data do seu evento. As vagas são limitadas e, em épocas de maior procura, algumas datas esgotam rapidamente. \n\nSe o evento já tiver ocorrido e as flores não estiverem em bom estado, é possível fazermos uma recriação do bouquet com flores semelhantes."
        },
        {
          q: "Como vos posso entregar as minhas flores?",
          a: "Recomendamos que nos faça chegar as flores assim que possível, preferencialmente dentro de 2-3 dias e, no máximo, 5 dias após o evento. \n\n• Entrega em mãos em estúdio (Coimbra).\n• Envio por CTT/transportadora.\n• Recolha no evento (mediante custo adicional)."
        },
        {
          q: "Quanto tempo demora a preservação?",
          a: "O nosso tempo médio de processamento desde o momento em que recebemos as suas flores é de aproximadamente até 6 meses. Faremos o possível para concluir o seu design o mais rapidamente possível, no entanto, o processo é delicado, pelo que nunca iremos sacrificar a qualidade do design final em favor da rapidez."
        }
      ]
    },
    {
      title: "Detalhes & Valores",
      bgColor: "#00CCFF", // AZUL CIANO VIBRANTE
      items: [
        {
          q: "E se eu quiser adicionar algo especial no quadro?",
          a: "Pode personalizar o seu quadro com elementos que tenham significado especial como fitas do bouquet, um pedaço de tecido do vestido, uma coleira, convites, cartas, ou até fotos impressas. Mencione este detalhe no formulário de reserva."
        },
        {
          q: "Quanto é que um quadro custa?",
          a: "O valor depende do tamanho e tipo de moldura. Os preços da preservação começam nos 300€, com emolduramento incluído. É necessário o pagamento de um sinal de 30% para garantir a vaga, que será deduzido no pagamento final."
        },
        {
          q: "Posso devolver o quadro?",
          a: "Infelizmente, não aceitamos devoluções em nenhum dos nossos pedidos personalizados. Cada peça exige muito tempo, cuidado e atenção para ser criada."
        }
      ]
    }
  ];

  return (
    <main style={{ paddingTop: '110px', paddingBottom: '100px', backgroundColor: '#FCFBF9', minHeight: '100vh' }}>
      
      {/* LÓGICA RESPONSIVA E DE DESIGN BOLD */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* BASE (TELEMOVEL) */
        .faq-grid { 
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          align-items: start;
        }
        
        .faq-btn { padding: 18px 20px; }
        .faq-title { font-size: 1.25rem; }
        .plus-icon-wrapper { margin-left: 12px; }
        .faq-answer { padding: 0 20px 20px 20px; font-size: 1rem; }

        .faq-header-title { font-size: 2.8rem; }
        .faq-header-container { margin-bottom: 50px; }
        
        /* ETIQUETA DA CATEGORIA BOLD */
        .category-title { 
          display: inline-block;
          font-size: 0.8rem; 
          text-transform: uppercase; 
          letter-spacing: 2px; 
          font-weight: 700;
          color: #fff; 
          background-color: #1a1a1a;
          padding: 8px 16px;
          border-radius: 4px;
          margin-bottom: 20px; 
          box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
        }
        .category-section { margin-bottom: 60px; }

        /* DESKTOP */
        @media (min-width: 768px) {
          .faq-grid { 
            grid-template-columns: repeat(2, 1fr);
            gap: 24px; 
          }
          
          .faq-btn { padding: 22px 28px; }
          .faq-title { font-size: 1.35rem; }
          .plus-icon-wrapper { margin-left: 20px; }
          .faq-answer { padding: 0 28px 28px 28px; font-size: 1.05rem; }

          .faq-header-title { font-size: clamp(3.5rem, 6vw, 5rem); }
          .faq-header-container { margin-bottom: 80px; }
          
          .category-title { font-size: 0.9rem; margin-bottom: 24px; }
          .category-section { margin-bottom: 80px; }
        }
      `}} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div 
          className="faq-header-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          <h1 className="faq-header-title" style={{ margin: 0, letterSpacing: '-1px', fontFamily: "'TAN-MEMORIES', serif" }}>
            Perguntas Frequentes
          </h1>
        </motion.div>
        
        {faqCategories.map((category, catIndex) => (
          <motion.div 
            key={catIndex} 
            className="category-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Título de categoria estilo etiqueta preta bold */}
            <h2 className="category-title">{category.title}</h2>
            
            <div className="faq-grid">
              {category.items.map((item, index) => (
                <FAQItem 
                  key={index} 
                  q={item.q} 
                  a={item.a} 
                  index={index} 
                  bgColor={category.bgColor} 
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
