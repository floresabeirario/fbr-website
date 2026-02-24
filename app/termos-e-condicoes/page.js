"use client";

import { motion } from "framer-motion";

export default function TermosCondicoes() {
  const sections = [
    {
      title: "1. Natureza do Serviço",
      content: "A Flores à Beira-Rio dedica-se à preservação artesanal de flores naturais através de técnicas de prensagem e secagem, transformando flores com valor emocional ou simbólico em quadros personalizados. Todas as peças são únicas e feitas à mão. A natureza deste processo implica variabilidade no resultado final, que o cliente aceita no momento da contratação."
    },
    {
      title: "2. Alterações Naturais nas Flores",
      content: "Ao serem prensadas ou secas, as flores podem alterar significativamente de cor, forma ou textura. Alguns tons (vermelhos, púrpuras, rosas fortes e brancas) tendem a escurecer, amarelar ou desvanecer. Estas alterações são naturais e não são consideradas defeitos nem motivos para reembolso."
    },
    {
      title: "3. Envio e Condições das Flores",
      content: "As flores são preservadas no estado em que chegam ao nosso estúdio. O cliente deve enviá-las no prazo recomendado (1 a 3 dias após o evento). Não nos responsabilizamos por danos causados durante o transporte ou atrasos nos CTT."
    },
    {
      title: "4. Instruções e Preferências",
      content: "Pedidos específicos sobre o design devem ser enviados em formato físico dentro da embalagem ou por e-mail antes da receção das flores. A inclusão de todos os elementos não é garantida, dependendo da viabilidade técnica."
    },
    {
      title: "5. Molduras e Composição Final",
      content: "As molduras são feitas à mão com materiais de qualidade museológica. O cliente terá 72 horas para aprovar o design final através de fotografias. Uma vez selada, a moldura não pode ser alterada."
    },
    {
      title: "6. Pagamentos",
      content: "O serviço é pago em três prestações:\n1.ª: 30% no momento da reserva (não reembolsável).\n2.ª: 40% na receção das flores.\n3.ª: 30% antes do envio ou recolha."
    },
    {
      title: "7. Entrega da Peça Final",
      content: "A peça pode ser enviada por CTT com rastreamento ou recolhida em Coimbra. O envio só é efetuado após o pagamento integral."
    },
    {
      title: "8. Danos e Reclamações",
      content: "Caso a moldura chegue danificada, o cliente deve contactar-nos no prazo de 7 dias e conservar a embalagem original para avaliação."
    },
    {
      title: "9. Cancelamentos e Reembolsos",
      content: "O sinal de 30% não é reembolsável em caso de cancelamento pelo cliente. Se o evento for reagendado, o sinal pode ser transferido mediante disponibilidade."
    },
    {
      title: "10. Cuidados com a Peça",
      content: "Evite luz solar direta, humidade (casas de banho/cozinhas) e fontes de calor extremo para garantir a durabilidade da moldura."
    },
    {
      title: "11. Política de Privacidade",
      content: "O tratamento de dados é feito em conformidade com o RGPD. Pode consultar os detalhes na nossa página de Política de Privacidade."
    },
    {
      title: "12. Direitos de Autor",
      content: "Todos os conteúdos do site são propriedade exclusiva da Flores à Beira-Rio. Reservamos o direito de utilizar imagens dos trabalhos para portefólio e marketing."
    },
    {
      title: "13. Disposições Finais",
      content: "A Flores à Beira-Rio reserva-se o direito de atualizar estes Termos e Condições a qualquer momento."
    }
  ];

  return (
    <main style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: '#FCFBF9' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Termos e Condições</h1>
          <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1.1rem' }}>
            Ao contratar os serviços da Flores à Beira-Rio, o cliente declara ter lido, compreendido e aceite os presentes Termos e Condições.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {sections.map((section, index) => (
            <section key={index}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a1a1a', fontFamily: "'TAN-MEMORIES', serif" }}>
                {section.title}
              </h2>
              <p style={{ color: '#555', lineHeight: '1.8', whiteSpace: 'pre-line', fontWeight: '300' }}>
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
