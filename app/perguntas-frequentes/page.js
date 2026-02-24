"use client";

export default function FAQPage() {
  const faqs = [
    {
      q: "Qual é o serviço que oferecem?",
      a: "Preservamos e emolduramos flores naturais de casamentos e outros eventos, criando quadros personalizados que guardam memórias para sempre."
    },
    {
      q: "Com que antecedência devo entrar em contacto?",
      a: "Contacte com a maior antecedência possível. Também aceitamos reservas nos dias seguintes ao evento, dependendo da disponibilidade. As vagas são limitadas."
    },
    {
      q: "Como funciona o processo de trabalho?",
      a: "Recebemos as flores, prensamos e criamos um quadro personalizado. O design final é aprovado pelo cliente antes da entrega. Oferecemos várias opções de envio."
    },
    {
      q: "Quais são as formas de pagamento?",
      a: "Aceitamos transferência bancária e MBWay. É pedido um sinal para reservar a data e o restante pagamento é feito aquando da entrega das flores."
    }
  ];

  return (
    <main style={{ paddingTop: '150px', paddingBottom: '100px', backgroundColor: '#FCFBF9' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '60px' }}>Perguntas Frequentes</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {faqs.map((item, index) => (
            <div key={index} style={{ borderBottom: '1px solid rgba(26, 26, 26, 0.1)', paddingBottom: '30px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{item.q}</h3>
              <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1.1rem' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
