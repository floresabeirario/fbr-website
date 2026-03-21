"use client";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    title: "1. Responsável pelo Tratamento de Dados",
    content: "Flores à Beira-Rio\nNIF: 236533550\nLocalização: Ceira, Coimbra, Portugal\nEmail: info@floresabeirario.pt",
  },
  {
    title: "2. Dados Pessoais Recolhidos",
    content: "Podemos recolher os seguintes dados pessoais, fornecidos diretamente por si:\n• Nome completo\n• Endereço de e-mail\n• Número de telemóvel\n• NIF (apenas se quiser fatura)\n• Fotografias de flores ou quadros (se decidir enviá-las voluntariamente)",
  },
  {
    title: "3. Como Recolhemos os Dados",
    content: "Os seus dados podem ser recolhidos através dos seguintes meios:\n• Formulários de reserva (via Monday.com)\n• Mensagens por WhatsApp, e-mail, telefone ou Messenger",
  },
  {
    title: "4. Finalidades do Tratamento",
    content: "Utilizamos os seus dados apenas para as seguintes finalidades:\n• Processamento e gestão de reservas\n• Comunicação durante o processo de preservação e entrega\n• Emissão de faturas, se solicitado\n• Envio do quadro final pelos CTT (mediante indicação e consentimento do cliente)",
  },
  {
    title: "5. Partilha de Dados com Terceiros",
    content: "Os seus dados não são partilhados com terceiros, exceto nos seguintes casos:\n• CTT (Correios de Portugal): apenas se o cliente optar por receber o quadro por correio, e apenas com os dados estritamente necessários para o envio.",
  },
  {
    title: "6. Conservação dos Dados",
    content: "Os dados serão conservados apenas durante o tempo necessário à prestação do serviço solicitado e serão eliminados logo que deixem de ser necessários para esse fim.",
  },
  {
    title: "7. Os Seus Direitos",
    content: "Nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD), tem o direito de:\n• Aceder aos seus dados pessoais\n• Solicitar a retificação ou eliminação dos seus dados\n• Retirar o seu consentimento a qualquer momento\n• Opor-se ao tratamento dos seus dados\n• Apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD)\n\nPara exercer qualquer um destes direitos, pode contactar-nos para info@floresabeirario.pt.",
  },
  {
    title: "8. Cookies",
    content: "Atualmente, o site da Flores à Beira-Rio não utiliza cookies para recolha de dados.",
  },
];

export default function PoliticaPrivacidadeClient() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="legal-h1">Política de Privacidade</h1>
          <p className="legal-intro">
            Na Flores à Beira-Rio, levamos a sua privacidade a sério. Esta Política de Privacidade explica que dados recolhemos, como os usamos e os seus direitos enquanto titular desses dados.
          </p>
        </motion.div>

        <div className="legal-sections">
          {SECTIONS.map((section, index) => (
            <section key={index}>
              <h2 className="legal-h2">{section.title}</h2>
              <p className="legal-text">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
