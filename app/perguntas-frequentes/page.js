"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ÍCONE SIMPLES E ELEGANTE (+) ---
const PlusIcon = ({ isOpen }) => (
  <motion.div
    animate={{ 
      backgroundColor: isOpen ? '#1a1a1a' : 'transparent',
      rotate: isOpen ? 45 : 0 
    }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="plus-icon-wrapper"
    style={{ 
      borderRadius: '50%', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '1.5px solid #1a1a1a', flexShrink: 0
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

// --- COMPONENTE DA PERGUNTA ---
const FAQItem = ({ q, a, index }) => {
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
        backgroundColor: '#fff',
        borderRadius: '16px',
        border: isHovered || isOpen ? '1.5px solid #1a1a1a' : '1.5px solid rgba(26, 26, 26, 0.08)',
        boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        width: '100%'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="faq-btn" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isOpen ? '#FCFBF9' : 'transparent',
        transition: 'background-color 0.3s ease'
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
                borderTop: '1px dashed rgba(26,26,26,0.15)',
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
  // Dados divididos por categorias para facilitar a leitura
  const faqCategories = [
    {
      title: "O Processo & As Flores",
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
    <main style={{ paddingTop: '110px', paddingBottom: '100px', backgroundColor: '#F4F1EE', minHeight: '100vh' }}>
      
      {/* LÓGICA RESPONSIVA (MOBILE-FIRST) */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* BASE (TELEMOVEL): Muito compacto, limpo, fonte menor */
        .faq-grid { 
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          align-items: start; /* Impede que um lado estique o outro */
        }
        
        .faq-btn { padding: 16px; }
        .faq-title { font-size: 1.1rem; }
        .plus-icon-wrapper { width: 30px; height: 30px; margin-left: 12px; }
        .faq-answer { padding: 0 16px 16px 16px; font-size: 0.95rem; }

        .faq-header-title { font-size: 2.5rem; }
        .faq-header-container { margin-bottom: 40px; }
        
        .category-title { font-size: 1.8rem; margin-bottom: 20px; color: #1a1a1a; font-family: 'TAN-MEMORIES', serif; border-bottom: 1px solid rgba(26,26,26,0.1); padding-bottom: 10px; }
        .category-section { margin-bottom: 60px; }

        /* DESKTOP: Volta a ganhar espaço e as 2 colunas ativam-se */
        @media (min-width: 768px) {
          .faq-grid { 
            grid-template-columns: repeat(2, 1fr);
            gap: 24px; 
          }
          
          .faq-btn { padding: 22px 28px; }
          .faq-title { font-size: 1.25rem; }
          .plus-icon-wrapper { width: 34px; height: 34px; margin-left: 20px; }
          .faq-answer { padding: 0 28px 28px 28px; font-size: 1.05rem; }

          .faq-header-title { font-size: clamp(3rem, 6vw, 4.5rem); }
          .faq-header-container { margin-bottom: 70px; }
          
          .category-title { font-size: 2.2rem; margin-bottom: 30px; }
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
        
        {/* Renderiza cada categoria com as suas respetivas perguntas */}
        {faqCategories.map((category, catIndex) => (
          <motion.div 
            key={catIndex} 
            className="category-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="category-title">{category.title}</h2>
            <div className="faq-grid">
              {category.items.map((item, index) => (
                <FAQItem key={index} q={item.q} a={item.a} index={index} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
