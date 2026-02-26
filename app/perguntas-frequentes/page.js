"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ÍCONE DIVERTIDO E BOLD ---
const PlusIcon = ({ isOpen }) => (
  <motion.div
    animate={{ 
      backgroundColor: isOpen ? '#1a1a1a' : '#FCFBF9',
      rotate: isOpen ? 135 : 0 // Roda mais para dar um efeito "bouncy" divertido
    }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    style={{ 
      width: '40px', height: '40px', borderRadius: '50%', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '2px solid #1a1a1a', flexShrink: 0, marginLeft: '20px'
    }}
  >
    <motion.svg 
      width="16" height="16" viewBox="0 0 20 20" fill="none" 
      animate={{ color: isOpen ? '#fff' : '#1a1a1a' }}
    >
      <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: '#fff',
        borderRadius: '24px', // Cantos bem arredondados (Moderno)
        border: isHovered || isOpen ? '2px solid #1a1a1a' : '2px solid rgba(26, 26, 26, 0.08)',
        boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{
        padding: '25px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h3 style={{ 
          fontSize: '1.3rem', 
          margin: 0, 
          color: '#1a1a1a',
          fontFamily: "'TAN-MEMORIES', serif",
          lineHeight: '1.4'
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
            <div style={{ padding: '0 30px 30px 30px' }}>
              <div style={{ 
                color: '#444', 
                lineHeight: '1.8', 
                fontSize: '1.05rem',
                fontWeight: '400',
                borderTop: '2px dashed rgba(26,26,26,0.1)', // Um detalhe divertido na separação
                paddingTop: '20px',
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
    <main style={{ paddingTop: '110px', paddingBottom: '120px', backgroundColor: '#F4F1EE', minHeight: '100vh' }}>
      
      {/* Estilos Globais Injetados para o Masonry Layout perfeito */}
      <style dangerouslySetInnerHTML={{ __html: `
        .faq-masonry {
          column-count: 1;
          column-gap: 24px;
        }
        @media (min-width: 800px) {
          .faq-masonry {
            column-count: 2;
          }
        }
        .faq-item-wrapper {
          break-inside: avoid;
          page-break-inside: avoid;
          -webkit-column-break-inside: avoid;
          margin-bottom: 24px;
          display: inline-block;
          width: 100%;
        }
      `}} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', margin: 0, letterSpacing: '-1px' }}>
            Perguntas Frequentes
          </h1>
        </motion.div>
        
        {/* Usamos a classe faq-masonry aqui */}
        <div className="faq-masonry">
          {faqs.map((item, index) => (
            <FAQItem key={index} q={item.q} a={item.a} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
