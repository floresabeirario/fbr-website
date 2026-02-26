"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PlusIcon = ({ isOpen }) => (
  <motion.svg 
    width="20" height="20" viewBox="0 0 20 20" fill="none" 
    initial={false}
    animate={{ rotate: isOpen ? 45 : 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    style={{ marginLeft: '15px', flexShrink: 0, color: '#1a1a1a' }}
  >
    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </motion.svg>
);

const FAQItem = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{ 
        borderRadius: '4px',
        backgroundColor: '#fff', // Fundo branco na caixa para contrastar com a página
        border: '1px solid rgba(26, 26, 26, 0.08)',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)' // Sombra muito subtil
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '20px 25px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isOpen ? '#FCFBF9' : '#fff',
          transition: 'background-color 0.3s ease'
        }}
      >
        <h3 style={{ 
          fontSize: '1.2rem', 
          margin: 0, 
          color: '#1a1a1a',
          fontFamily: "'TAN-MEMORIES', serif",
          lineHeight: '1.4'
        }}>
          {q}
        </h3>
        <PlusIcon isOpen={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div style={{ padding: '0 25px 25px 25px', borderTop: '1px solid rgba(26, 26, 26, 0.05)' }}>
              <div style={{ 
                color: '#444', 
                lineHeight: '1.7', 
                fontSize: '1rem',
                fontWeight: '400',
                marginTop: '15px',
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
    // Nova cor de fundo (#F4F1EE) aplicada na main
    <main style={{ paddingTop: '110px', paddingBottom: '120px', backgroundColor: '#F4F1EE', minHeight: '100vh' }}>
      {/* Max width aumentado para 1000px para as duas colunas respirarem bem */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          {/* Subtítulo removido */}
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', margin: 0 }}>
            Perguntas Frequentes
          </h1>
        </motion.div>
        
        {/* Nova Grelha Responsiva (2 colunas no PC, 1 no Telemóvel) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '20px',
          alignItems: 'start' // Garante que a abertura de um não estica a caixa do lado
        }}>
          {faqs.map((item, index) => (
            <FAQItem key={index} q={item.q} a={item.a} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
