"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ÍCONE SIMPLES (Ganha destaque no fundo branco) ---
const PlusIcon = ({ isOpen }) => (
  <motion.div
    animate={{ 
      rotate: isOpen ? 45 : 0 
    }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    style={{ 
      width: '32px', height: '32px',
      borderRadius: '50%', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: isOpen ? '#1a1a1a' : '#F4F1EE',
      flexShrink: 0
    }}
  >
    <svg 
      width="14" height="14" viewBox="0 0 20 20" fill="none" 
      stroke={isOpen ? '#fff' : '#1a1a1a'} strokeWidth="2" strokeLinecap="round"
    >
      <path d="M10 4V16M4 10H16"/>
    </svg>
  </motion.div>
);

// --- COMPONENTE DA PERGUNTA (SEMPRE BRANCO) ---
const FAQItem = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="faq-item-wrapper"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      style={{ 
        backgroundColor: '#FFFFFF', // CAIXAS SEMPRE A BRANCO
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)', // Sombra elegante para destacar do fundo colorido
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%'
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
          lineHeight: '1.3'
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
                color: '#444', 
                lineHeight: '1.6', 
                fontWeight: '400',
                borderTop: '1px solid rgba(26,26,26,0.06)', // Linha muito subtil
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
  // Categorias com fundos Vibrantes e Bold!
  const faqCategories = [
    {
      title: "O Processo & As Flores",
      bgColor: "#00A859", // Verde Vibrante
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
      bgColor: "#FF3366", // Rosa Vibrante
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
      bgColor: "#007AFF", // Azul Vibrante
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
      
      {/* LÓGICA RESPONSIVA (MOBILE-FIRST) */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* BASE (TELEMOVEL) */
        .category-wrapper {
          padding: 30px 15px;
          border-radius: 24px;
          margin-bottom: 30px;
        }

        .category-title { 
          font-size: 1.8rem; 
          color: #ffffff; 
          font-family: 'TAN-MEMORIES', serif;
          margin-bottom: 25px;
          text-align: center;
        }

        .faq-grid { 
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          align-items: start;
        }
        
        .faq-btn { padding: 18px; }
        .faq-title { font-size: 1.1rem; }
        .plus-icon-wrapper { margin-left: 12px; }
        .faq-answer { padding: 0 18px 18px 18px; font-size: 0.95rem; }

        .faq-header-title { font-size: 2.8rem; }
        .faq-header-container { margin-bottom: 40px; }
        
        /* DESKTOP */
        @media (min-width: 768px) {
          .category-wrapper {
            padding: 60px 40px;
            border-radius: 32px;
            margin-bottom: 50px;
          }

          .category-title { 
            font-size: 2.5rem; 
            margin-bottom: 40px;
          }

          .faq-grid { 
            grid-template-columns: repeat(2, 1fr);
            gap: 20px; 
          }
          
          .faq-btn { padding: 24px 30px; }
          .faq-title { font-size: 1.25rem; }
          .plus-icon-wrapper { margin-left: 20px; }
          .faq-answer { padding: 0 30px 30px 30px; font-size: 1rem; }

          .faq-header-title { font-size: clamp(3.5rem, 6vw, 5rem); }
          .faq-header-container { margin-bottom: 60px; }
        }
      `}} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
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
            className="category-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            style={{ backgroundColor: category.bgColor }} // Aplica a cor de fundo vibrante à secção inteira
          >
            <h2 className="category-title">{category.title}</h2>
            
            <div className="faq-grid">
              {category.items.map((item, index) => (
                <FAQItem 
                  key={index} 
                  q={item.q} 
                  a={item.a} 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
