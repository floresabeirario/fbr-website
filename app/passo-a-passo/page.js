"use client";

import { motion } from "framer-motion";

// --- COMPONENTE DE PASSO DA TIMELINE ---
const TimelineStep = ({ number, title, description, isLast, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ delay, duration: 0.6 }}
    style={{ display: 'flex', position: 'relative', marginBottom: isLast ? '0' : '60px' }}
  >
    {/* LINHA VERTICAL (escondida no último passo) */}
    {!isLast && (
      <div style={{
        position: 'absolute',
        left: '28px', // Centrado com o círculo
        top: '60px',
        bottom: '-60px',
        width: '1px',
        backgroundColor: 'rgba(26,26,26,0.1)'
      }} />
    )}

    {/* NÚMERO / CÍRCULO */}
    <div style={{ flexShrink: 0, marginRight: '30px', position: 'relative', zIndex: 2 }}>
      <div style={{
        width: '56px', height: '56px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(26,26,26,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
      }}>
        <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: '1.6rem', color: '#1a1a1a', lineHeight: '1', marginTop: '4px' }}>
          {number}
        </span>
      </div>
    </div>

    {/* CONTEÚDO */}
    <div style={{ paddingTop: '10px' }}>
      <h3 style={{ fontSize: '1.4rem', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', marginBottom: '12px' }}>
        {title}
      </h3>
      <div style={{ color: '#555', lineHeight: '1.7', fontSize: '1rem' }}>
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
          <p style={{ margin: '0 0 10px 0' }}>Explore o nosso portefólio, conheça as opções e valores, e tire todas as suas dúvidas connosco. Se desejar oferecer este serviço, espreite a nossa secção de Cartões-Presente.</p>
          <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic' }}>* Dica: Se precisar de ajuda, pode agendar uma sessão de esclarecimento online gratuita (30 min) para o ajudarmos a escolher as peças perfeitas.</p>
        </>
      )
    },
    {
      number: "2",
      title: "Reserva e Pagamento do Sinal",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>O simples agendamento não confirma a reserva da data. Dentro de 3 dias, receberá um e-mail com a confirmação do orçamento e os dados para pagamento do <strong>sinal de 30%</strong> (não reembolsável).</p>
          <p style={{ margin: 0 }}>Para garantir a sua vaga, este valor deve ser liquidado num prazo de 24 horas.</p>
        </>
      )
    },
    {
      number: "3",
      title: "A Chegada das Flores",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Com a vaga confirmada, é hora de nos fazer chegar as flores (idealmente entre <strong>1 a 3 dias</strong> após o evento, máximo 5 dias). Tem três opções:</p>
          <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
            <li><strong>Entrega em mãos:</strong> Gratuita, no nosso atelier em Coimbra (mediante agendamento).</li>
            <li><strong>Envio por CTT:</strong> Correio frágil e urgente (custos a cargo do cliente).</li>
            <li><strong>Recolha no evento:</strong> Mediante orçamento e disponibilidade.</li>
          </ul>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>* Após os 5 dias, se a viabilidade estiver comprometida, recomendamos o serviço de Recriação de Bouquet.</p>
        </>
      )
    },
    {
      number: "4",
      title: "Início do Processo e 2º Pagamento",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Assim que as flores chegarem, avisamos por e-mail e iniciamos imediatamente o delicado processo de preservação. Nesta fase, será solicitado o <strong>segundo pagamento (40%)</strong> da sua encomenda.</p>
          <p style={{ margin: 0 }}><em>Nota importante:</em> As suas preferências de design devem ser enviadas por escrito <strong>dentro da própria embalagem das flores</strong>, para garantir que nenhum detalhe se perde.</p>
        </>
      )
    },
    {
      number: "5",
      title: "Design Botânico e Aprovação",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Selecionamos as flores que melhor reagiram à preservação e criamos a composição da sua obra de arte. Receberá fotografias do design e terá <strong>72 horas para aprovar</strong> ou pedir alterações.</p>
          <p style={{ margin: 0 }}>Após a sua aprovação final, selamos a moldura e adicionamos todos os detalhes finais.</p>
        </>
      )
    },
    {
      number: "6",
      title: "Toque Final e Último Pagamento",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>A sua peça está concluída! Enviamos-lhe as fotos do resultado final e solicitamos o pagamento da <strong>3ª e última prestação (30%)</strong>.</p>
          <p style={{ margin: 0 }}>Poderá escolher entre receber a encomenda comodamente em casa (via CTT com rastreio) ou levantar pessoalmente no nosso atelier em Coimbra.</p>
        </>
      )
    },
    {
      number: "7",
      title: "Uma Memória Eterna",
      desc: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>A sua obra de arte chega às suas mãos! O quadro é acompanhado por um guia de cuidados para garantir a sua durabilidade ao longo do tempo.</p>
          <p style={{ margin: 0, fontWeight: '500', color: '#1a1a1a' }}>Esperamos que as suas memórias se mantenham floridas por muitos e bons anos.</p>
        </>
      )
    }
  ];

  return (
    <main style={{ 
      backgroundColor: '#FCFBF9', 
      minHeight: '100vh', 
      paddingBottom: '120px' 
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-padding { padding-top: 120px; }
        .section-margin { margin-bottom: 80px; } 

        .timeline-container {
          background-color: #FFFFFF;
          border: 1px solid rgba(26,26,26,0.04);
          border-radius: 20px;
          padding: 40px 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.02);
        }

        /* TABLET & DESKTOP */
        @media (min-width: 768px) {
          .hero-padding { padding-top: 160px; }
          .section-margin { margin-bottom: 100px; } 
          .timeline-container { padding: 80px; }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="hero-padding section-margin" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a', opacity: 0.5, marginBottom: '20px' }}>
            Como Trabalhamos
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'TAN-MEMORIES', serif", color: '#1a1a1a', margin: '0 0 25px 0', lineHeight: '1.1' }}>
            O Processo Passo a Passo
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#555', lineHeight: '1.8', margin: '0 auto' }}>
            A preservação botânica é uma arte que exige tempo, dedicação e muita comunicação. Conheça as 7 etapas que transformam as suas flores numa obra de arte intemporal.
          </p>
        </motion.div>
      </section>

      {/* TIMELINE SECTION */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
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
        <p style={{ color: '#555', fontSize: '1.05rem', marginBottom: '30px' }}>
          Tudo pronto para eternizar as suas memórias?
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/opcoes-e-precos" style={{
            display: 'inline-block', backgroundColor: '#F4F1EE', color: '#1a1a1a',
            padding: '16px 36px', borderRadius: '30px', textDecoration: 'none',
            fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem'
          }}>
            Ver Preços
          </a>
          <a href="#" style={{
            display: 'inline-block', backgroundColor: '#1a1a1a', color: '#FCFBF9',
            padding: '16px 36px', borderRadius: '30px', textDecoration: 'none',
            fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem'
          }}>
            Reservar Data
          </a>
        </div>
      </section>

    </main>
  );
}
