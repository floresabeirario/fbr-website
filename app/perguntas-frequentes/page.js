"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ÍCONE DE FLOR MINIMALISTA ---
const FlowerIcon = ({ isOpen }) => (
  <motion.div
    animate={{ 
      backgroundColor: isOpen ? '#1a1a1a' : '#FCFBF9',
      rotate: isOpen ? 90 : 0 // A flor roda 90 graus suavemente
    }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="flower-icon-wrapper"
    style={{ 
      borderRadius: '50%', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '2px solid #1a1a1a', flexShrink: 0
    }}
  >
    <motion.svg 
      width="55%" height="55%" viewBox="0 0 24 24" fill="none" 
      animate={{ color: isOpen ? '#fff' : '#1a1a1a' }}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    >
      {/* Desenho geométrico e moderno de uma flor */}
      <path d="M12 2c-1.5 0-2.5 2-2.5 4s1 4 2.5 4 2.5-2 2.5-4-1-4-2.5-4z"/>
      <path d="M12 22c-1.5 0-2.5-2-2.5-4s1-4 2.5-4 2.5 2 2.5 4-1 4-2.5 4z"/>
      <path d="M2 12c0-1.5 2-2.5 4-2.5s4 1 4 2.5-2 2.5-4 2.5-4-1-4-2.5z"/>
      <path d="M22 12c0-1.5-2-2.5-4-2.5s-4 1-4 2.5 2 2.5 4 2.5 4-1 4-2.5z"/>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
    </motion.svg>
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
        borderRadius: '16px', // Ligeiramente menos arredondado para encaixar melhor no mobile
        border: isHovered || isOpen ? '2px solid #1a1a1a' : '2px solid rgba(26, 26, 26, 0.08)',
        boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer'
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
        <FlowerIcon isOpen={isOpen} />
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
                lineHeight: '1.7', 
                fontWeight: '400',
                borderTop: '1px dashed rgba(26,26,26,0.15)', // Linha mais subtil no mobile
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
  const faqs = [
    {
      q: "Quando devo agendar a preservação das minhas flores?",
      a: "O ideal é agendar a preservação com antecedência, assim que souber a data do seu evento. As vagas são limitadas e, em épocas de maior procura, algumas datas esgotam rapidamente. \n\nSe o evento já tiver ocorrido e as flores não estiverem em bom estado, é possível fazermos uma recriação do bouquet com flores semelhantes."
    },
    {
      q: "Quanto tempo demora a preservação?",
      a: "O nosso tempo médio de processamento desde o momento em que recebemos as suas flores é de aproximadamente até 6 meses. Faremos o possível para concluir o seu design o mais rapidamente possível, no entanto, o processo é delicado, pelo que nunca iremos sacrificar a qualidade do design final em favor da rapidez."
    },
    {
      q: "Apenas preservam bouquets de casamento?",
      a: "Não, preservamos e emolduramos todos os tipos de flores de ocasiões especiais, incluindo: cerimónias de batizado, aniversários, comemorações de bodas, homenagens e cerimónias fúnebres, ramos oferecidos em datas marcantes ou flores espontâneas com valor sentimental."
    },
    {
      q: "Preservam todo o tipo de flores?",
      a: "A grande maioria das flores reage muito bem à prensagem e secagem. No entanto, algumas flores com elevado teor de água (como suculentas ou antúrios) ou formatos muito espessos podem ser mais desafiantes ou não manter a sua forma original. Caso tenha dúvidas sobre flores específicas, não hesite em contactar-nos."
    },
    {
      q: "Como vos posso entregar as minhas flores?",
      a: "Recomendamos que nos faça chegar as flores assim que possível, preferencialmente dentro de 2-3 dias e, no máximo, 5 dias após o evento. \n\n• Entrega em mãos em estúdio (Coimbra).\n• Envio por CTT/transportadora.\n• Recolha no evento (mediante custo adicional)."
    },
    {
      q: "Como funciona o processo?",
      a: "Tudo começa com a reserva da sua vaga. Depois, deve enviar ou entregar as flores até 2 a 3 dias após o evento. As flores são cuidadosamente prensadas e secas. Criamos uma composição e enviamos uma fotografia para aprovação antes de selarmos a moldura."
    },
    {
      q: "E se eu quiser adicionar algo especial no quadro?",
      a: "Pode personalizar o seu quadro com elementos que tenham significado especial como fitas do bouquet, um pedaço de tecido do vestido, uma coleira, convites, cartas, ou até fotos impressas. Mencione este detalhe no formulário de reserva."
    },
    {
      q: "As cores vão ser as mesmas quando estiverem secas?",
      a: "Inevitavelmente, haverá alguma mudança de cor assim que toda a humidade for removida da flor. Algumas mantêm as cores vibrantes, outras desbotam (as rosas vermelhas tornam-se bordô, por exemplo). Esta é a beleza do processo: a essência natural para guardar para sempre."
    },
    {
      q: "Posso devolver o quadro?",
      a: "Infelizmente, não aceitamos devoluções em nenhum dos nossos pedidos personalizados. Cada peça exige muito tempo, cuidado e atenção para ser criada."
    },
    {
      q: "Quanto é que um quadro custa?",
      a: "O valor depende do tamanho e tipo de moldura. Os preços da preservação começam nos 300€, com emolduramento incluído. É necessário o pagamento de um sinal de 30% para garantir a vaga, que será deduzido no pagamento final."
    }
  ];

  return (
    <main style={{ paddingTop: '110px', paddingBottom: '100px', backgroundColor: '#F4F1EE', minHeight: '100vh' }}>
      
      {/* LÓGICA RESPONSIVA (MOBILE-FIRST) */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* BASE (TELEMOVEL): Muito compacto, limpo, fonte menor */
        .faq-masonry { column-count: 1; column-gap: 16px; }
        .faq-item-wrapper { break-inside: avoid; margin-bottom: 12px; display: inline-block; width: 100%; }
        
        .faq-btn { padding: 16px; }
        .faq-title { font-size: 1.1rem; }
        .flower-icon-wrapper { width: 32px; height: 32px; margin-left: 12px; }
        .faq-answer { padding: 0 16px 16px 16px; font-size: 0.95rem; }

        .faq-header-title { font-size: 2.2rem; }
        .faq-header-container { margin-bottom: 40px; }

        /* DESKTOP: Volta a ganhar espaço, margens e fontes maiores */
        @media (min-width: 768px) {
          .faq-masonry { column-count: 2; column-gap: 24px; }
          .faq-item-wrapper { margin-bottom: 24px; }
          
          .faq-btn { padding: 25px 30px; }
          .faq-title { font-size: 1.3rem; }
          .flower-icon-wrapper { width: 40px; height: 40px; margin-left: 20px; }
          .faq-answer { padding: 0 30px 30px 30px; font-size: 1.05rem; }

          .faq-header-title { font-size: clamp(3rem, 6vw, 4.5rem); }
          .faq-header-container { margin-bottom: 70px; }
        }
      `}} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div 
          className="faq-header-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          <h1 className="faq-header-title" style={{ margin: 0, letterSpacing: '-1px' }}>
            Perguntas Frequentes
          </h1>
        </motion.div>
        
        <div className="faq-masonry">
          {faqs.map((item, index) => (
            <FAQItem key={index} q={item.q} a={item.a} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
