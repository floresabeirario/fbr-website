"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO DA TIMELINE ---
const TimelineStep = ({ number, title, description, isLast, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ delay, duration: 0.6 }}
    className={`step-container ${isLast ? 'last-step' : ''}`}
    style={{ display: 'flex', position: 'relative' }}
  >
    {/* LINHA VERTICAL (escondida no último passo) */}
    {!isLast && (
      <div className="step-line" style={{
        position: 'absolute',
        width: '2px',
        backgroundColor: 'rgba(140, 98, 74, 0.15)' // Tom earthy suave
      }} />
    )}

    {/* NÚMERO / CÍRCULO */}
    <div style={{ flexShrink: 0, position: 'relative', zIndex: 2 }} className="step-circle-wrapper">
      <div className="step-number" style={{
        borderRadius: '50%',
        backgroundColor: '#8C624A', // Bold earthy (Terracota/Castanho)
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(140, 98, 74, 0.25)'
      }}>
        <span style={{ fontFamily: "'TAN-MEMORIES', serif", color: '#FCFBF9', lineHeight: '1', marginTop: '4px' }}>
          {number}
        </span>
      </div>
    </div>

    {/* CONTEÚDO */}
    <div style={{ paddingTop: '5px' }}>
      <h3 style={{ fontSize: '1.35rem', fontFamily: "'TAN-MEMORIES', serif", color: '#2C2A28', marginBottom: '10px' }}>
        {title}
      </h3>
      <div style={{ color: '#5C554E', lineHeight: '1.7', fontSize: '0.95rem' }}>
        {description}
      </div>
    </div>
  </motion.div>
);

export default function PassoAPasso() {
  const steps = [
    {
      number: "1",
      title: "Conhecer e Descobrir",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>
            Explore a nossa página de <a href="/opcoes-e-precos" className="earthy-link">Opções e Preços</a>, conheça o nosso portefólio através do <a href="https://instagram.com/floresabeirario" target="_blank" rel="noopener noreferrer" className="earthy-link">Instagram</a>, e tire todas as suas dúvidas connosco através da página de <a href="/contactos" className="earthy-link">Contactos</a>. Se desejar oferecer este serviço a alguém especial, espreite a nossa secção de <a href="/vale-presente" className="earthy-link">Vale-Presente</a>.
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.8 }}>
            * Dica: Se precisar de ajuda, pode agendar uma sessão de esclarecimento online gratuita (30 min) para o ajudarmos a escolher as peças perfeitas.
          </p>
        </>
      )
    },
    {
      number: "2",
      title: "Pedido de Reserva e Sinal",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>O primeiro passo é preencher o nosso formulário com os detalhes do seu evento. <strong style={{color: '#2C2A28'}}>Atenção: o preenchimento do formulário não confirma a sua reserva.</strong> Assim que o recebermos, iremos verificar a nossa agenda e confirmar-lhe a disponibilidade para a data pretendida.</p>
          <p style={{ margin: '0 0 10px 0' }}>Se tivermos vaga, receberá um e-mail com a confirmação do orçamento e os dados para pagamento do <strong style={{color: '#2C2A28'}}>sinal de 30% do valor final da peça</strong>.</p>
          <p style={{ margin: '0 0 15px 0' }}>Este valor deve ser pago no prazo de <strong style={{color: '#2C2A28'}}>24 horas</strong> para garantir a sua reserva. Caso o pagamento não seja efetuado dentro desse prazo, entendemos que desistiu e o agendamento será cancelado. <em>O sinal não é reembolsável.</em></p>
          <a href="https://wkf.ms/3RfoNAc" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block',
            backgroundColor: '#8C624A',
            color: '#FCFBF9',
            padding: '10px 24px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.85rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(140, 98, 74, 0.2)',
            transition: 'all 0.3s ease',
            border: '1px solid transparent'
          }}>
            Formulário de Reserva
          </a>
        </>
      )
    },
    {
      number: "3",
      title: "A Chegada das Flores",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Com a vaga confirmada, é hora de nos fazer chegar as flores (idealmente entre <strong style={{color: '#2C2A28'}}>1 a 3 dias</strong> após o evento, máximo 5 dias). Tem três opções:</p>
          <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}><strong style={{color: '#2C2A28'}}>Recolha no evento (Recomendado):</strong> Para sua total comodidade e para garantir que as flores nos chegam o mais frescas possível, deslocamo-nos ao local do evento ou hotel para fazer a recolha em mãos (mediante orçamento e disponibilidade).</li>
            <li style={{ marginBottom: '8px' }}><strong style={{color: '#2C2A28'}}>Entrega em mãos:</strong> Gratuita, no nosso atelier em Coimbra (mediante agendamento).</li>
            <li><strong style={{color: '#2C2A28'}}>Envio por CTT:</strong> Correio frágil e urgente (custos a cargo do cliente).</li>
          </ul>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>
            * Se já tiverem passado mais de 5 dias após o evento, não conseguimos garantir a viabilidade da preservação e recomendamos o nosso serviço de <a href="/recriacao-de-bouquet" className="earthy-link">Recriação de Bouquet</a>.
          </p>
        </>
      )
    },
    {
      number: "4",
      title: "Início da Preservação e 2º Pagamento",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Assim que as suas flores chegarem até nós, iniciaremos o processo de preservação. Se enviou por CTT, enviaremos um e-mail de confirmação da recepção.</p>
          <p style={{ margin: 0 }}>O pagamento de <strong style={{color: '#2C2A28'}}>40%</strong> da sua encomenda será solicitado nesta fase.</p>
        </>
      )
    },
    {
      number: "5",
      title: "Aprovação da Composição",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Selecionamos as flores que melhor responderam à preservação e criamos a composição do quadro. Receberá fotografias do design e terá <strong style={{color: '#2C2A28'}}>72 horas para aprovar</strong> ou pedir alterações.</p>
          <p style={{ margin: 0 }}>Após a sua aprovação final, colamos as flores, o quadro é emoldurado e preparado para a entrega.</p>
        </>
      )
    },
    {
      number: "6",
      title: "Último Pagamento e Entrega do Quadro",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Chegou o momento de lhe enviarmos o seu quadro. Antes do envio ou da recolha, será solicitado o pagamento da 3ª e última prestação, <strong style={{color: '#2C2A28'}}>30% do valor total</strong>.</p>
          <p style={{ margin: 0 }}>Poderá escolher entre receber a encomenda em casa (via CTT com rastreio e frágil) ou levantar pessoalmente no nosso atelier em Coimbra num horário a agendar.</p>
        </>
      )
    },
    {
      number: "7",
      title: "Uma Memória Eterna",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>A sua obra de arte chega às suas mãos! O quadro é acompanhado por um guia de cuidados para garantir a sua durabilidade ao longo do tempo.</p>
          <p style={{ margin: 0, fontWeight: '600', color: '#8C624A' }}>Esperamos que as suas memórias se mantenham floridas por muitos e bons anos.</p>
        </>
      )
    }
  ];

  return (
    <main style={{ 
      backgroundColor: '#F9F6F0', 
      minHeight: '100vh', 
      paddingBottom: '100px' 
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* ESPAÇAMENTOS REDUZIDOS (MOBILE FIRST) */
        .hero-padding { padding-top: 60px; } 
        .section-margin { margin-bottom: 50px; } 

        .timeline-container {
          background-color: #FFFFFF;
          border: 1px solid rgba(140, 98, 74, 0.1);
          border-radius: 20px;
          padding: 30px 15px; 
          box-shadow: 0 10px 40px rgba(44, 42, 40, 0.04);
        }

        .step-container { margin-bottom: 40px; }
        .last-step { margin-bottom: 0 !important; }
        .step-circle-wrapper { margin-right: 20px; }
        
        .step-number { width: 44px; height: 44px; font-size: 1.3rem; }
        .step-line { left: 21px; top: 50px; bottom: -45px; } 

        /* ESTILO DOS LINKS NO TEXTO */
        .earthy-link {
          color: #8C624A;
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .earthy-link:hover {
          color: #6B4A37;
        }

        /* TABLET & DESKTOP */
        @media (min-width: 768px) {
          .hero-padding { padding-top: 90px; }
          .section-margin { margin-bottom: 75px; } 
          .timeline-container { padding: 80px; }
          
          .step-container { margin-bottom: 60px; }
          .step-circle-wrapper { margin-right: 30px; }
          .step-number { width: 56px; height: 56px; font-size: 1.6rem; }
          .step-line { left: 27px; top: 65px; bottom: -65px; }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="hero-padding section-margin" style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '700', color: '#8C624A', marginBottom: '20px' }}>
            Como Trabalhamos
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#2C2A28', margin: '0 0 25px 0', lineHeight: '1.1' }}>
            O Processo Passo a Passo
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#5C554E', lineHeight: '1.8', margin: '0 auto' }}>
            A preservação botânica é uma arte que exige tempo, dedicação e muita comunicação. Conheça as 7 etapas que transformam as suas flores numa obra de arte intemporal.
          </p>
        </motion.div>
      </section>

      {/* TIMELINE SECTION */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 15px' }}>
        <div className="timeline-container">
          {steps.map((step, index) => (
            <TimelineStep 
              key={index}
              number={step.number}
              title={step.title}
              description={step.desc}
              isLast={index === steps.length - 1}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* CTA PARA SESSÃO DE ESCLARECIMENTO OU RESERVA */}
      <section style={{ textAlign: 'center', padding: '80px 20px 0 20px' }}>
        <p style={{ color: '#5C554E', fontSize: '1.05rem', marginBottom: '30px' }}>
          Tudo pronto para eternizar as suas memórias?
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/opcoes-e-precos" style={{
            display: 'inline-block', backgroundColor: '#EBE5DE', color: '#2C2A28',
            padding: '16px 36px', borderRadius: '30px', textDecoration: 'none',
            fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem',
            transition: 'background-color 0.3s ease'
          }}>
            Ver Preços
          </a>
          <a href="https://wkf.ms/3RfoNAc" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', backgroundColor: '#8C624A', color: '#FCFBF9',
            padding: '16px 36px', borderRadius: '30px', textDecoration: 'none',
            fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem',
            boxShadow: '0 4px 15px rgba(140, 98, 74, 0.3)',
            transition: 'background-color 0.3s ease'
          }}>
            Reservar Data
          </a>
        </div>
      </section>

    </main>
  );
}
