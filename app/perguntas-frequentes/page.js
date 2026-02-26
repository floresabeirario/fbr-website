"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ÍCONE SIMPLES ---
const PlusIcon = ({ isOpen }) => (
  <motion.div
    animate={{ 
      rotate: isOpen ? 45 : 0 
    }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="plus-icon-wrapper"
    style={{ 
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

// --- COMPONENTE DA PERGUNTA ---
const FAQItem = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="faq-item-wrapper"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      style={{ 
        backgroundColor: '#FFFFFF', 
        borderRadius: '12px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)', 
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%',
        display: 'inline-block', 
        breakInside: 'avoid'
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
          lineHeight: '1.25'
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
            transition={{ duration: 0.25, ease: "easeInOut" }} 
          >
            <div className="faq-answer">
              <div style={{ 
                color: '#444', 
                lineHeight: '1.5', 
                fontWeight: '400',
                borderTop: '1px solid rgba(26,26,26,0.06)', 
                paddingTop: '14px'
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
      a: <>O ideal é agendar a preservação com <strong>antecedência</strong>, assim que souber a data do seu evento. As vagas são limitadas e, em épocas de maior procura, algumas datas <strong>esgotam rapidamente</strong>.<br/><br/>Se o evento já tiver ocorrido e as flores não estiverem em bom estado, é possível fazermos uma recriação do bouquet com flores semelhantes.</>
    },
    {
      q: "Quanto tempo demora a preservação?",
      a: <>O nosso tempo médio de processamento desde o momento em que recebemos as suas flores é de aproximadamente <strong>até 6 meses</strong>. Faremos o possível para concluir o seu design o mais rapidamente possível, no entanto, o processo é delicado, pelo que <strong>nunca iremos sacrificar a qualidade</strong> do design final em favor da rapidez.</>
    },
    {
      q: "Apenas preservam bouquets de casamento?",
      a: <>Não, preservamos e emolduramos <strong>todos os tipos de flores</strong> de ocasiões especiais, incluindo: cerimónias de batizado, aniversários, comemorações de bodas, homenagens e cerimónias fúnebres, ramos oferecidos em datas marcantes ou flores espontâneas com valor sentimental.</>
    },
    {
      q: "Preservam todo o tipo de flores?",
      a: <>A <strong>grande maioria</strong> das flores reage muito bem à prensagem e secagem. No entanto, algumas flores com <strong>elevado teor de água</strong> (como suculentas ou antúrios) ou formatos muito espessos podem ser mais desafiantes ou não manter a sua forma original. Caso tenha dúvidas sobre flores específicas, não hesite em contactar-nos.</>
    },
    {
      q: "Como vos posso entregar as minhas flores?",
      a: <>Recomendamos que nos faça chegar as flores assim que possível, preferencialmente <strong>dentro de 2-3 dias</strong> e, no máximo, 5 dias após o evento.<br/><br/>• Entrega em mãos em estúdio (Coimbra).<br/>• Envio por CTT/transportadora.<br/>• Recolha no evento (mediante custo adicional).</>
    },
    {
      q: "Como funciona o processo?",
      a: <>Tudo começa com a <strong>reserva da sua vaga</strong>. Depois, deve enviar ou entregar as flores até 2 a 3 dias após o evento. As flores são cuidadosamente prensadas e secas. Criamos uma composição e enviamos uma <strong>fotografia para aprovação</strong> antes de selarmos a moldura.</>
    },
    {
      q: "E se eu quiser adicionar algo especial no quadro?",
      a: <>Pode <strong>personalizar o seu quadro</strong> com elementos que tenham significado especial como fitas do bouquet, um pedaço de tecido do vestido, uma coleira, convites, cartas, ou até fotos impressas. Mencione este detalhe no formulário de reserva.</>
    },
    {
      q: "As cores vão ser as mesmas quando estiverem secas?",
      a: <>Inevitavelmente, haverá <strong>alguma mudança de cor</strong> assim que toda a humidade for removida da flor. Algumas mantêm as cores vibrantes, outras desbotam (as rosas vermelhas tornam-se bordô, por exemplo). Esta é a <strong>beleza do processo</strong>: a essência natural para guardar para sempre.</>
    },
    {
      q: "Posso devolver o quadro?",
      a: <>Infelizmente, <strong>não aceitamos devoluções</strong> em nenhum dos nossos pedidos personalizados. Cada peça exige muito tempo, cuidado e atenção para ser criada.</>
    },
    {
      q: "Quanto é que um quadro custa?",
      a: <>O valor depende do tamanho e tipo de moldura. Os preços da preservação <strong>começam nos 300€</strong>, com emolduramento incluído. É necessário o pagamento de um <strong>sinal de 30%</strong> para garantir a vaga, que será deduzido no pagamento final.</>
    }
  ];

  return (
    <main style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#B85D4B', minHeight: '100vh' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. BASE (TELEMOVEL) - 1 Coluna */
        .faq-masonry { 
          column-count: 1; 
          column-gap: 0; 
        }
        
        .faq-item-wrapper { margin-bottom: 10px !important; } 
        .faq-btn { padding: 14px 16px; } 
        .faq-title { font-size: 1.05rem; } 
        .faq-answer { padding: 0 16px 16px 16px; font-size: 0.9rem; } 
        .plus-icon-wrapper { width: 28px; height: 28px; margin-left: 12px; } 

        .faq-header-title { font-size: 2.2rem; color: #FCFBF9; } 
        .faq-header-container { margin-bottom: 30px; }
        
        .faq-answer strong { color: #1a1a1a; font-weight: 600; }

        /* 2. TABLET E PORTÁTEIS (Ecrãs Médios) - 2 Colunas */
        @media (min-width: 768px) {
          .faq-masonry { column-count: 2; column-gap: 20px; }
          .faq-item-wrapper { margin-bottom: 20px !important; border-radius: 16px; }
          .faq-btn { padding: 20px 24px; }
          .faq-title { font-size: 1.15rem; }
          .faq-answer { padding: 0 24px 24px 24px; font-size: 0.95rem; }
          .plus-icon-wrapper { width: 32px; height: 32px; margin-left: 16px; }
          .faq-header-title { font-size: clamp(3rem, 5vw, 4rem); }
          .faq-header-container { margin-bottom: 50px; }
        }

        /* 3. MONITORES GRANDES (PC Desktop) - 3 Colunas */
        @media (min-width: 1100px) {
          .faq-masonry { column-count: 3; column-gap: 24px; }
          .faq-item-wrapper { margin-bottom: 24px !important; }
          .faq-btn { padding: 24px 28px; }
          .faq-title { font-size: 1.25rem; }
          .faq-answer { padding: 0 28px 28px 28px; font-size: 1rem; }
          .plus-icon-wrapper { width: 34px; height: 34px; margin-left: 20px; }
          .faq-header-title { font-size: 4.5rem; }
          .faq-header-container { margin-bottom: 60px; }
        }
      `}} />

      {/* Ajustei o maxWidth para 1300px para que as 3 colunas tenham espaço para respirar bem no PC */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 16px' }}>
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
        
        <div className="faq-masonry">
          {faqs.map((item, index) => (
            <FAQItem 
              key={index} 
              q={item.q} 
              a={item.a} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}
