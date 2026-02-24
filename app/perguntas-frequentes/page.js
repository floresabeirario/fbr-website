"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Componente para o ícone de Mais/Menos
const PlusIcon = ({ isOpen }) => (
  <motion.svg 
    width="20" height="20" viewBox="0 0 20 20" fill="none" 
    initial={false}
    animate={{ rotate: isOpen ? 45 : 0 }} // Roda 45 graus se estiver aberto
    transition={{ duration: 0.3, ease: "easeInOut" }}
    style={{ marginLeft: '15px', flexShrink: 0, color: '#1a1a1a' }}
  >
    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </motion.svg>
);

// Componente Individual para cada Pergunta/Resposta
const FAQItem = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }} // Efeito de cascata ao carregar a página
      style={{ 
        marginBottom: '20px', 
        borderRadius: '8px',
        backgroundColor: '#fff',
        border: '1px solid rgba(26, 26, 26, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* O botão da pergunta */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '25px 30px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isOpen ? '#F4F1EE' : '#fff', // Muda a cor se estiver aberto
          transition: 'background-color 0.3s ease'
        }}
      >
        <h3 style={{ 
          fontSize: '1.4rem', 
          margin: 0, 
          color: '#1a1a1a',
          fontFamily: "'TAN-MEMORIES', serif", // A tua fonte de marca
          letterSpacing: '0.5px'
        }}>
          {q}
        </h3>
        <PlusIcon isOpen={isOpen} />
      </button>

      {/* A resposta com animação */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div style={{ padding: '0 30px 30px 30px', borderTop: '1px solid rgba(26, 26, 26, 0.05)' }}>
              <p style={{ 
                color: '#555', 
                lineHeight: '1.8', 
                fontSize: '1.05rem',
                fontWeight: '300',
                marginTop: '20px'
              }}>
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


// A Página Principal
export default function PerguntasFrequentes() {
  const faqs = [
    {
      q: "Em que consiste o vosso trabalho?",
      a: "Eternizamos memórias através da preservação e emolduramento de flores naturais (de casamentos, batizados ou outros eventos especiais), criando peças de arte botânica únicas."
    },
    {
      q: "Com que antecedência devo fazer a reserva?",
      a: "O ideal é reservar com a maior antecedência possível para garantir vaga na nossa prensa botânica. No entanto, se o evento já passou, contacte-nos de imediato para verificarmos disponibilidade de última hora."
    },
    {
      q: "Como é que as flores chegam até vocês?",
      a: "Podem ser entregues em mão no nosso atelier em Coimbra ou enviadas por transportadora (até 3 dias após o evento). Nós explicamos todo o processo de embalamento após a reserva."
    },
    {
      q: "Todas as flores podem ser preservadas?",
      a: "A maioria das flores reage bem à prensagem, embora algumas mudem ligeiramente de tom (as brancas podem tornar-se creme e as vermelhas mais escuras). Algumas flores muito volumosas precisam de ser trabalhadas pétala a pétala."
    },
    {
      q: "Quanto tempo demora o processo?",
      a: "A secagem e preservação artesanal é um processo lento que garante a qualidade da peça. O tempo médio de entrega varia entre 8 a 12 semanas, dependendo da época do ano."
    },
    {
      q: "Quais são as formas de pagamento?",
      a: "Trabalhamos com transferência bancária ou MB Way. Normalmente é solicitado um valor de reserva, sendo o restante liquidado durante o processo."
    }
  ];

  return (
    <main style={{ 
      paddingTop: '160px', 
      paddingBottom: '120px', 
      backgroundColor: '#FCFBF9',
      backgroundImage: 'radial-gradient(circle at top right, rgba(26, 26, 26, 0.03) 0%, transparent 40%)' // Um toque subtil no fundo
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 25px' }}>
        
        {/* Cabeçalho da Página */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', marginBottom: '20px' }}>
            Dúvidas Comuns
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto', fontWeight: '300' }}>
            Tudo o que precisa de saber sobre o processo de eternizar o seu bouquet.
          </p>
        </motion.div>
        
        {/* Lista de Perguntas (Accordion) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((item, index) => (
            <FAQItem key={index} q={item.q} a={item.a} index={index} />
          ))}
        </div>

        {/* Caixa de Contacto Final */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ 
            marginTop: '100px', 
            textAlign: 'center', 
            backgroundColor: '#F4F1EE', 
            padding: '50px 30px', 
            borderRadius: '8px',
            border: '1px solid rgba(26, 26, 26, 0.05)'
          }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Ainda não encontrou a resposta?</h3>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem', color: '#555' }}>Estamos aqui para ajudar em cada passo do processo.</p>
          <a href="/contactos" className="nav-link" style={{ 
            display: 'inline-block',
            fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#1a1a1a',
            border: '1px solid #1a1a1a', padding: '15px 30px', borderRadius: '4px'
          }}>
            Fale com a equipa
          </a>
        </motion.div>
      </div>
    </main>
  );
}
