// app/perguntas-frequentes/PerguntasFrequentesClient.jsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Cor de destaque: magenta arroxeado
const ACCENT = "#8B3A6B";
const ACCENT_LIGHT = "rgba(139,58,107,0.12)";
const ACCENT_BORDER = "rgba(139,58,107,0.25)";

// ─── Dados ────────────────────────────────────────────────────────────────────

const FAQ_DATA = [
  // PROCESSO
  {
    cat: "processo",
    q: "Quando devo agendar a preservação do meu bouquet?",
    plain:
      "O ideal é agendar assim que souber a data do evento. As vagas são limitadas e em época de maior procura esgotam rapidamente. Se o evento já aconteceu, contacte-nos assim que possível. No caso de o evento ter acontecido há mais de 5 dias e as flores não estiverem em bom estado, podemos fazer uma recriação do bouquet com flores frescas semelhantes, a partir de uma fotografia.",
    a: (
      <>
        O ideal é agendar <strong>assim que souber a data do evento</strong> — não precisa esperar pela data.
        As vagas são limitadas e em meses de maior procura algumas datas esgotam com muita antecedência.
        <br /><br />
        Se o evento já aconteceu, <strong>contacte-nos assim que possível</strong>.
        No caso de o evento ter acontecido há mais de 5 dias e as flores não estiverem em bom estado,
        podemos fazer uma{" "}
        <a href="/recriacao" className="faq-link">recriação do bouquet</a>{" "}
        com flores frescas semelhantes, a partir de uma fotografia.
      </>
    ),
  },
  {
    cat: "processo",
    q: "Quanto tempo demora a preservação?",
    plain:
      "O nosso tempo médio é de até 6 meses desde a recepção das flores até ao quadro emoldurado. Fazemos sempre o possível para ser mais rápidos, mas a prensagem é um processo delicado que não pode ser apressado. Nunca sacrificamos a qualidade em favor da rapidez. No caso de a encomenda incluir vários quadros, é possível que o prazo se estenda um pouco.",
    a: (
      <>
        O nosso tempo médio é de <strong>até 6 meses</strong> desde a recepção das flores até ao quadro emoldurado.
        Fazemos sempre o possível para ser mais rápidos, mas a prensagem é um processo delicado que não pode ser apressado.
        <strong> Nunca sacrificamos a qualidade em favor da rapidez.</strong>
        <br /><br />
        No caso de a encomenda incluir vários quadros, é possível que o prazo se estenda um pouco.
      </>
    ),
  },
  {
    cat: "processo",
    q: "Como funciona o processo completo?",
    plain: "Explicamos o processo todo em detalhe na página Como Funciona.",
    a: (
      <>
        Explicamos o processo todo em detalhe na nossa página dedicada.
        <br /><br />
        <a href="/como-funciona" className="faq-link">Ver o processo passo a passo →</a>
      </>
    ),
  },
  {
    cat: "processo",
    q: "Podem recolher as flores no local do evento?",
    plain:
      "Sim, deslocamo-nos ao local do evento ou hotel para recolher as flores em mãos, mediante orçamento e disponibilidade.",
    a: (
      <>
        Sim. Deslocamo-nos ao local do evento, hotel ou quinta para recolha em mãos.
        É a opção mais recomendada pois as flores chegam no seu melhor estado.
        Esta recolha tem <strong>custo adicional e está sujeita a disponibilidade</strong>.
        Contacte-nos com antecedência para verificar se cobrimos a sua zona.
      </>
    ),
  },
  {
    cat: "processo",
    q: "Posso personalizar o quadro com outros elementos?",
    plain:
      "Sim. Pode adicionar fitas do bouquet, tecido do vestido, convites, cartas ou fotografias impressas. Mencione no formulário de reserva.",
    a: (
      <>
        Sim! Pode personalizar o quadro com elementos que tenham significado especial:
        fitas do bouquet, um pedaço de tecido do vestido ou véu, uma coleira de animal de estimação,
        convites, cartas ou fotografias impressas.
        <br /><br />
        Mencione este detalhe <strong>no formulário de reserva</strong> ou por email após agendar.
      </>
    ),
  },
  {
    cat: "processo",
    q: "Recebem flores de fora de Portugal?",
    plain:
      "Sim, recebemos flores de toda a Europa. O envio internacional é feito por transportadora em correio frágil/urgente e os custos e responsabilidade do envio até ao nosso atelier são do remetente. Recomendamos que o envio seja feito o mais rápido possível após o evento.",
    a: (
      <>
        Sim, recebemos flores de <strong>toda a Europa</strong>.
        O envio internacional é feito por transportadora em correio frágil/urgente
        e os custos e responsabilidade do envio até ao nosso atelier são do remetente.
        <br /><br />
        Recomendamos que o envio seja feito <strong>o mais rápido possível</strong> após o evento.
      </>
    ),
  },

  // FLORES
  {
    cat: "flores",
    q: "Preservam apenas bouquets de casamento?",
    plain:
      "Não. Preservamos flores de qualquer ocasião com significado emocional: batizados, aniversários, bodas de prata e ouro, homenagens e cerimónias fúnebres. O nosso vale-presente é uma forma muito especial de oferecer uma preservação.",
    a: (
      <>
        Não! Preservamos <strong>qualquer flor com significado emocional</strong>:
        ramos de batizado, flores de aniversário, bodas de prata e ouro,
        homenagens e cerimónias fúnebres, ou qualquer flor que mereça ser guardada para sempre.
        <br /><br />
        O nosso <strong>vale-presente</strong> é uma forma muito especial de oferecer uma preservação.
        <br /><br />
        <a href="/vale-presente" className="faq-link">Saber mais sobre o vale-presente →</a>
      </>
    ),
  },
  {
    cat: "flores",
    q: "Preservam todo o tipo de flores?",
    plain:
      "Sim. Após muitas aprendizagens, testes e conclusões, podemos afirmar que preservamos todo o tipo de flores.",
    a: (
      <>
        <strong>Sim.</strong> Após muitas aprendizagens, testes e conclusões ao longo dos anos,
        podemos afirmar com confiança que preservamos todo o tipo de flores.
        Cada espécie tem as suas particularidades e é precisamente essa experiência acumulada
        que nos permite garantir os melhores resultados em qualquer bouquet.
      </>
    ),
  },
  {
    cat: "flores",
    q: "As cores mantêm-se iguais depois de secas?",
    plain:
      "Há sempre alguma mudança de cor, é inevitável quando retiramos toda a humidade da flor. Algumas flores mantêm cores muito vibrantes; outras desbotam ligeiramente. Esta transformação faz parte da beleza natural do processo.",
    a: (
      <>
        Há sempre <strong>alguma mudança de cor</strong> — é inevitável quando retiramos toda a humidade da flor.
        Algumas flores mantêm cores muito vibrantes; outras desbotam ligeiramente
        (rosas vermelhas tornam-se bordô, por exemplo).
        <br /><br />
        Esta transformação faz parte da <strong>beleza natural do processo</strong>.
      </>
    ),
  },
  {
    cat: "flores",
    q: "Tenho flores secas de há vários anos. O que posso fazer?",
    plain:
      "Tem duas opções: a recriação de bouquet, onde reproduzimos o ramo com flores frescas usando fotografias; ou a emolduração das flores originais numa moldura mais funda.",
    a: (
      <>
        Tem duas opções:
        <br /><br />
        <strong>Recriação de bouquet</strong> — reproduzimos o ramo com flores frescas e iguais às originais,
        usando as fotografias do dia como referência.{" "}
        <a href="/recriacao" className="faq-link">Saber mais sobre a recriação de bouquet →</a>
        <br /><br />
        <strong>Emolduração das flores originais</strong> — podemos emoldurar numa moldura mais funda
        as flores originais e fazer uma composição com elas tal como estão.{" "}
        <a href="https://fbr-website.vercel.app/emoldurar-flores-secas" className="faq-link">Saber mais sobre emoldurar flores já secas →</a>
      </>
    ),
  },
  {
    cat: "flores",
    q: "E se não conseguir entregar as flores dentro de 5 dias?",
    plain:
      "Cada caso é avaliado individualmente. Se o prazo de 5 dias já tiver passado, não conseguimos garantir a viabilidade da preservação e recomendamos o nosso serviço de recriação de bouquet.",
    a: (
      <>
        Cada situação é avaliada <strong>caso a caso</strong> — contacte-nos assim que possível.
        <br /><br />
        Se o prazo de 5 dias já tiver passado, não conseguimos garantir a viabilidade da preservação.
        Nesse caso, recomendamos o nosso{" "}
        <a href="/recriacao" className="faq-link">serviço de recriação de bouquet</a>.
      </>
    ),
  },
  {
    cat: "flores",
    q: "Porque não preservam flores em resina?",
    plain:
      "A resina é um plástico de origem petroquímica, não biodegradável e de difícil reciclagem. A nossa abordagem é 100% artesanal e sustentável.",
    a: (
      <>
        A resina é um <strong>plástico de origem petroquímica</strong>: não é biodegradável,
        não é reciclável e o seu processo de cura liberta compostos voláteis nocivos.
        <br /><br />
        A nossa preservação é <strong>100% natural</strong>: prensagem artesanal, moldura de madeira
        e vidro museu, sem químicos, sem plástico.
      </>
    ),
  },
  {
    cat: "flores",
    q: "Porque não fazem preservação de flores em 3D?",
    plain:
      "A preservação em 3D utiliza gel de sílica em grandes quantidades, com elevado consumo energético. A prensagem artesanal é a forma mais sustentável e duradoura.",
    a: (
      <>
        A preservação em 3D habitualmente utiliza <strong>gel de sílica em grandes quantidades</strong>:
        um material produzido industrialmente, com elevado consumo energético e impacto ambiental considerável.
        <br /><br />
        A <strong>prensagem artesanal</strong> que praticamos é a forma mais sustentável, duradoura
        e esteticamente rica de eternizar as suas flores.
      </>
    ),
  },
  {
    cat: "flores",
    q: "Quanto tempo as flores podem estar sem ser entregues?",
    plain:
      "Recomendamos 1 a 3 dias após o evento, no máximo 5 dias. Enquanto não as entrega, guarde num vaso com água fresca, longe de calor e da luz solar.",
    a: (
      <>
        Recomendamos que as flores cheguem até nós <strong>preferencialmente 1 a 3 dias</strong> após o evento,
        no máximo 5 dias. Quanto mais frescas chegarem, melhor o resultado final.
        <br /><br />
        Enquanto não as entrega, guarde as flores <strong>num vaso com água fresca</strong>,
        longe de calor e da luz solar.
      </>
    ),
  },

  // ENTREGA
  {
    cat: "entrega",
    q: "Consigo acompanhar o estado da minha encomenda?",
    plain:
      "Sim. Após a confirmação, receberá um link personalizado para acompanhar o estado do seu quadro em tempo real em status.floresabeirario.pt.",
    a: (
      <>
        Sim. Após a confirmação da encomenda, receberá um <strong>link personalizado</strong> para
        acompanhar o estado do seu quadro em tempo real em{" "}
        <a href="https://status.floresabeirario.pt" className="faq-link" target="_blank" rel="noopener noreferrer">
          status.floresabeirario.pt
        </a>
        , desde a receção do bouquet até à entrega do quadro concluído.
      </>
    ),
  },
  {
    cat: "entrega",
    q: "Como faço chegar as flores ao atelier?",
    plain:
      "Três opções: entrega em mãos no atelier em Ceira (Coimbra); envio por CTT em correio frágil e urgente; ou recolha no local do evento sujeita a orçamento.",
    a: (
      <>
        Tem três opções:
        <br /><br />
        <strong>Entrega em mãos</strong> — gratuita, no nosso atelier em Ceira, Coimbra, mediante agendamento prévio.
        <br /><br />
        <strong>Envio por CTT</strong> — correio frágil e urgente, custos a cargo do cliente.
        <br /><br />
        <strong>Recolha no evento</strong> — deslocamo-nos ao local, sujeito a orçamento e disponibilidade.
      </>
    ),
  },
  {
    cat: "entrega",
    q: "Como é entregue o quadro final?",
    plain:
      "O quadro pode ser enviado para casa via transportadora com rastreio, ou levantado no atelier em Ceira, Coimbra. O envio só acontece após o pagamento total.",
    a: (
      <>
        O quadro pode ser:
        <br /><br />
        <strong>Enviado para casa</strong> via transportadora com rastreio e embalagem especial para peças frágeis.
        <br /><br />
        <strong>Levantado no atelier</strong> em Ceira, Coimbra, num horário a agendar.
        <br /><br />
        O envio ou levantamento só acontece após <strong>o pagamento total da encomenda</strong>.
      </>
    ),
  },

  // PAGAMENTOS
  {
    cat: "pagamentos",
    q: "Quanto custa a preservação?",
    plain:
      "Os preços começam nos 300€ e incluem sempre o emolduramento com vidro museu anti-reflexo e proteção UV.",
    a: (
      <>
        Os preços <strong>começam nos 300€</strong> e incluem sempre o emolduramento artesanal
        com vidro museu anti-reflexo e proteção UV.
        <br /><br />
        <a href="/opcoes-e-precos" className="faq-link">Ver todos os preços e tamanhos →</a>
      </>
    ),
  },
  {
    cat: "pagamentos",
    q: "Como funciona o pagamento?",
    plain:
      "O pagamento divide-se em três prestações: 30% de sinal na reserva, 40% na recepção das flores, e 30% antes do envio do quadro.",
    a: (
      <>
        O pagamento divide-se em <strong>três prestações</strong>:
        <br /><br />
        <span style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
          <strong style={{ color: ACCENT, flexShrink: 0 }}>30%</strong>
          Sinal no momento da reserva (não reembolsável).
        </span>
        <span style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
          <strong style={{ color: ACCENT, flexShrink: 0 }}>40%</strong>
          Na recepção e início da preservação das flores.
        </span>
        <span style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <strong style={{ color: ACCENT, flexShrink: 0 }}>30%</strong>
          Antes do envio ou levantamento do quadro final.
        </span>
        Em caso de reagendamento, os valores já pagos podem ser transferidos para a nova data,
        desde que haja disponibilidade.
      </>
    ),
  },
  {
    cat: "pagamentos",
    q: "Posso cancelar ou obter reembolso?",
    plain:
      "O sinal de 30% não é reembolsável. Se o evento for reagendado, o sinal pode ser transferido para outra data mediante disponibilidade.",
    a: (
      <>
        O sinal de 30% <strong>não é reembolsável</strong> em caso de cancelamento.
        <br /><br />
        Se o evento for reagendado, o sinal <strong>pode ser transferido</strong> para uma nova data,
        mediante contacto prévio e disponibilidade da nossa agenda.
      </>
    ),
  },
  {
    cat: "pagamentos",
    q: "Aceitam devoluções?",
    plain:
      "Não aceitamos devoluções em encomendas personalizadas. Cada quadro é único e feito à mão.",
    a: (
      <>
        Não aceitamos devoluções em pedidos personalizados.
        Cada quadro é criado exclusivamente para si — é uma obra <strong>única e irrepetível</strong>.
        <br /><br />
        Por isso enviamos sempre uma fotografia da composição para aprovação
        <strong> antes de selar a moldura</strong>.
      </>
    ),
  },
];

const CATEGORIES = [
  { id: "todas",      label: "Todas",      count: FAQ_DATA.length },
  { id: "processo",   label: "Processo",   count: FAQ_DATA.filter(f => f.cat === "processo").length },
  { id: "flores",     label: "Flores",     count: FAQ_DATA.filter(f => f.cat === "flores").length },
  { id: "entrega",    label: "Entrega",    count: FAQ_DATA.filter(f => f.cat === "entrega").length },
  { id: "pagamentos", label: "Pagamentos", count: FAQ_DATA.filter(f => f.cat === "pagamentos").length },
];

const SchemaScript = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_DATA.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.plain },
        })),
      }),
    }}
  />
);

// ─── FAQItem ──────────────────────────────────────────────────────────────────

const FAQItem = ({ faq, isOpen, onToggle, searchTerm }) => {
  const highlight = (text) => {
    if (!searchTerm || searchTerm.length < 2) return text;
    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: "rgba(139,58,107,0.18)", borderRadius: "3px", padding: "0 2px" }}>
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div style={{ borderBottom: "1px solid rgba(139,58,107,0.1)" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          padding: "clamp(18px,3vw,24px) 0",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: "16px",
        }}
      >
        <span style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(1rem,2.2vw,1.18rem)",
          color: isOpen ? ACCENT : "#1E2D2A",
          lineHeight: 1.3, flex: 1,
          transition: "color 0.22s ease",
        }}>
          {highlight(faq.q)}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          style={{
            flexShrink: 0,
            width: "clamp(30px,4vw,36px)", height: "clamp(30px,4vw,36px)",
            borderRadius: "50%",
            backgroundColor: isOpen ? ACCENT : ACCENT_LIGHT,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background-color 0.22s ease",
          }}
          aria-hidden="true"
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none"
            stroke={isOpen ? "#FAF7F0" : ACCENT}
            strokeWidth="2.2" strokeLinecap="round">
            <path d="M10 4V16M4 10H16" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              paddingBottom: "clamp(18px,3vw,24px)",
              color: "#5A6B60", lineHeight: 1.85,
              fontSize: "clamp(0.88rem,1.8vw,0.96rem)",
            }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Page Client ──────────────────────────────────────────────────────────────

export default function PerguntasFrequentesClient() {
  const [openIndex, setOpenIndex]           = useState(null);
  const [activeCategory, setActiveCategory] = useState("todas");
  const [search, setSearch]                 = useState("");

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const filtered = useMemo(() => {
    let list = activeCategory === "todas"
      ? FAQ_DATA
      : FAQ_DATA.filter(f => f.cat === activeCategory);

    if (search.trim().length >= 2) {
      const q = search.toLowerCase();
      list = list.filter(f =>
        f.q.toLowerCase().includes(q) || f.plain.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const WA   = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Tenho uma dúvida sobre a preservação das minhas flores.");
  const FORM = "https://wkf.ms/3RfoNAc";

  return (
    <>
      <SchemaScript />

      <main style={{ backgroundColor: "#FAF7F0", paddingBottom: "clamp(64px,10vw,100px)" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; }

          .faq-link {
            color: ${ACCENT};
            font-weight: 600;
            text-decoration: none;
            border-bottom: 1px solid ${ACCENT_BORDER};
            padding-bottom: 1px;
            transition: border-color 0.2s ease;
          }
          .faq-link:hover { border-color: ${ACCENT}; }

          .pills-row { display: flex; gap: 8px; flex-wrap: wrap; padding-bottom: 2px; }
          .pill {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 9px 18px; border-radius: 100px;
            font-size: 0.72rem; font-weight: 600;
            letter-spacing: 0.8px; text-transform: uppercase;
            font-family: 'Google Sans', Roboto, sans-serif;
            border: 1.5px solid ${ACCENT_BORDER};
            color: #5A6B60; background: transparent;
            cursor: pointer; transition: all 0.2s ease; white-space: nowrap;
          }
          .pill:hover  { border-color: ${ACCENT}; color: ${ACCENT}; }
          .pill.active { background: ${ACCENT}; border-color: ${ACCENT}; color: #FAF7F0; }
          .pill-count  { display: inline-block; font-size: 0.6rem; opacity: 0.6; }
          .pill.active .pill-count { opacity: 0.75; }

          .search-wrap { position: relative; margin-bottom: 24px; }
          .search-input {
            width: 100%; padding: 14px 20px 14px 46px;
            border-radius: 100px; border: 1.5px solid ${ACCENT_BORDER};
            background: #fff; font-size: 0.92rem; color: #1E2D2A;
            font-family: 'Google Sans', Roboto, sans-serif; outline: none;
            transition: border-color 0.22s ease, box-shadow 0.22s ease;
            -webkit-appearance: none;
          }
          .search-input::placeholder { color: #9BA89F; }
          .search-input:focus { border-color: ${ACCENT}; box-shadow: 0 0 0 3px rgba(139,58,107,0.1); }
          .search-icon {
            position: absolute; left: 16px; top: 50%;
            transform: translateY(-50%); color: #9BA89F;
            pointer-events: none; display: flex; align-items: center;
          }
          .search-clear {
            position: absolute; right: 16px; top: 50%;
            transform: translateY(-50%); background: none; border: none;
            cursor: pointer; color: #9BA89F; padding: 4px;
            display: flex; align-items: center; transition: color 0.2s ease;
          }
          .search-clear:hover { color: #1E2D2A; }

          .result-count {
            font-size: 0.72rem; color: #9BA89F;
            font-family: 'Google Sans', Roboto, sans-serif;
            letter-spacing: 0.5px; margin-bottom: 8px; display: block;
          }

          .btn-primary {
            display: inline-block; background: ${ACCENT}; color: #FAF7F0;
            padding: 14px 32px; border-radius: 100px; text-decoration: none;
            font-weight: 600; font-size: 0.8rem; letter-spacing: 1.4px;
            text-transform: uppercase; text-align: center;
            box-shadow: 0 6px 22px rgba(139,58,107,0.26);
            transition: all 0.3s ease;
            font-family: 'Google Sans', Roboto, sans-serif;
          }
          .btn-primary:hover { background: #6B2250; transform: translateY(-3px); }

          .btn-wa {
            display: inline-flex; align-items: center; gap: 8px;
            background: #25D366; color: #fff; padding: 14px 28px;
            border-radius: 100px; text-decoration: none; font-weight: 600;
            font-size: 0.8rem; letter-spacing: 1px;
            transition: all 0.3s ease;
            font-family: 'Google Sans', Roboto, sans-serif;
          }
          .btn-wa:hover { background: #1da851; transform: translateY(-3px); }

          .cta-row { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
          @media (min-width: 460px) {
            .cta-row { flex-direction: row; justify-content: center; align-items: center; }
          }

          .related-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 20px; }
          @media (min-width: 560px) { .related-grid { grid-template-columns: repeat(3, 1fr); } }
          .related-card {
            display: block; text-decoration: none;
            background: rgba(139,58,107,0.05);
            border-radius: 16px; padding: 22px 20px;
            border: 1px solid ${ACCENT_BORDER};
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .related-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(139,58,107,0.1); }

          /* Stat badges no hero */
          .hero-stats {
            display: flex; gap: 12px; flex-wrap: wrap;
            justify-content: center; margin-top: 32px;
          }
          .hero-stat {
            background: rgba(255,255,255,0.12);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.22);
            border-radius: 100px;
            padding: 8px 18px;
            font-family: 'Google Sans', Roboto, sans-serif;
            font-size: 0.78rem;
            color: rgba(250,247,240,0.92);
            letter-spacing: 0.3px;
          }
          .hero-stat strong {
            color: #fff;
            font-weight: 700;
          }
        `}} />

        {/* ── Hero com foto ────────────────────────────────────────────────── */}
        <section
          aria-label="Perguntas frequentes sobre preservação de flores"
          style={{
            position: "relative",
            minHeight: "clamp(420px, 65vh, 680px)",
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
          }}
        >
          {/* Foto de fundo */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/sandraclose.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }} aria-hidden="true" />

          {/* Overlay escuro para legibilidade — mais denso em baixo */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(20,8,18,0.28) 0%, rgba(20,8,18,0.55) 55%, rgba(20,8,18,0.82) 100%)",
          }} aria-hidden="true" />

          {/* Conteúdo do hero */}
          <div style={{
            position: "relative", zIndex: 2,
            width: "100%",
            padding: "clamp(100px,14vw,160px) clamp(20px,6vw,80px) clamp(44px,7vw,72px)",
            textAlign: "center",
          }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                display: "inline-block",
                fontSize: "0.68rem", fontWeight: "700",
                letterSpacing: "3.5px", textTransform: "uppercase",
                color: "rgba(230,180,210,0.9)",
                marginBottom: "16px",
                fontFamily: "'Google Sans', Roboto, sans-serif",
                background: "rgba(139,58,107,0.3)",
                border: "1px solid rgba(230,180,210,0.3)",
                borderRadius: "100px",
                padding: "5px 16px",
              }}>
                Tire as suas dúvidas
              </span>

              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2.8rem,9vw,6rem)",
                color: "#FAF7F0",
                margin: "0 0 16px",
                lineHeight: 1.02,
                textShadow: "0 4px 32px rgba(0,0,0,0.3)",
              }}>
                Perguntas<br />
                <em style={{ fontStyle: "italic", color: "rgba(230,180,210,0.95)" }}>Frequentes</em>
              </h1>

              <p style={{
                color: "rgba(250,247,240,0.82)",
                fontSize: "clamp(0.9rem,2vw,1.05rem)",
                lineHeight: 1.85,
                maxWidth: "500px",
                margin: "0 auto",
                fontFamily: "'Google Sans', Roboto, sans-serif",
              }}>
                Tudo o que precisa de saber sobre preservação de flores,
                processo artesanal, entrega e pagamentos.
              </p>

              {/* Badges de contexto rápido */}
              <div className="hero-stats">
                <span className="hero-stat"><strong>+200</strong> bouquets preservados</span>
                <span className="hero-stat"><strong>Até 6 meses</strong> de prazo</span>
                <span className="hero-stat"><strong>Atelier</strong> em Coimbra</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Conteúdo principal ───────────────────────────────────────────── */}
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "44px 20px 0" }}>

          {/* Pesquisa */}
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              className="search-input"
              placeholder="Pesquisar uma dúvida..."
              value={search}
              onChange={e => { setSearch(e.target.value); setOpenIndex(null); }}
              aria-label="Pesquisar nas perguntas frequentes"
              autoComplete="off"
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")} aria-label="Limpar pesquisa">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 5L5 15M5 5l10 10" />
                </svg>
              </button>
            )}
          </div>

          {/* Filtros */}
          <div className="pills-row" role="tablist" aria-label="Filtrar por categoria" style={{ marginBottom: "28px" }}>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeCategory === c.id}
                className={`pill${activeCategory === c.id ? " active" : ""}`}
                onClick={() => { setActiveCategory(c.id); setOpenIndex(null); }}
              >
                {c.label}
                <span className="pill-count">{c.count}</span>
              </button>
            ))}
          </div>

          {/* Contador de resultados */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="result-count"
              aria-live="polite"
            >
              {filtered.length === 0
                ? "Nenhum resultado encontrado"
                : `${filtered.length} pergunta${filtered.length !== 1 ? "s" : ""}`}
            </motion.span>
          </AnimatePresence>

          {/* Lista de FAQs */}
          <div role="list" aria-label="Perguntas e respostas">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    textAlign: "center", padding: "48px 20px",
                    color: "#9BA89F", fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.2rem",
                  }}
                >
                  Nenhuma pergunta encontrada.<br />
                  <span style={{ fontFamily: "'Google Sans', Roboto, sans-serif", fontSize: "0.88rem", color: "#B8A898" }}>
                    Tente outra pesquisa ou{" "}
                    <button
                      onClick={() => { setSearch(""); setActiveCategory("todas"); }}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: ACCENT, fontWeight: 600, fontSize: "0.88rem", padding: 0,
                        fontFamily: "'Google Sans', Roboto, sans-serif",
                        borderBottom: `1px solid ${ACCENT_BORDER}`,
                      }}
                    >
                      ver todas as perguntas
                    </button>
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key={`${activeCategory}-${search}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {filtered.map((faq) => {
                    const globalIndex = FAQ_DATA.indexOf(faq);
                    return (
                      <div key={globalIndex} role="listitem">
                        <FAQItem
                          faq={faq}
                          isOpen={openIndex === globalIndex}
                          onToggle={() => toggle(globalIndex)}
                          searchTerm={search.trim()}
                        />
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Links relacionados */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase",
              color: "#B8A898", fontFamily: "'Google Sans', Roboto, sans-serif",
              margin: "52px 0 0", textAlign: "center",
            }}>
              Explorar
            </p>
            <div className="related-grid">
              {[
                { href: "/como-funciona",   label: "Como Funciona",        desc: "O processo passo a passo da preservação" },
                { href: "/opcoes-e-precos", label: "Preços e Tamanhos",    desc: "Escolha a moldura e formato certos" },
                { href: "/recriacao",       label: "Recriação de Bouquet", desc: "Quando o tempo já passou" },
              ].map((l, i) => (
                <a key={i} href={l.href} className="related-card">
                  <span style={{ display: "block", fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem", color: "#1E2D2A", marginBottom: "6px" }}>{l.label}</span>
                  <span style={{ display: "block", fontSize: "0.82rem", color: "#5A6B60", lineHeight: 1.6 }}>{l.desc} →</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* CTA final */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ textAlign: "center", marginTop: "56px" }}
          >
            <div aria-hidden="true" style={{
              width: "44px", height: "1px", margin: "0 auto 28px",
              background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
            }} />
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.7rem,4vw,2.6rem)",
              color: "#1E2D2A", margin: "0 0 12px", lineHeight: 1.15,
            }}>
              Ainda tem dúvidas?
            </h2>
            <p style={{
              color: "#5A6B60", fontSize: "clamp(0.9rem,2vw,0.97rem)",
              lineHeight: 1.82, margin: "0 auto 28px", maxWidth: "460px",
              fontFamily: "'Google Sans', Roboto, sans-serif",
            }}>
              Fale connosco directamente. Respondemos em poucas horas
              e adoramos ajudar a encontrar a opção certa para si.
            </p>
            <div className="cta-row">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Perguntar pelo WhatsApp
              </a>
              <a href={FORM} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Reservar Data
              </a>
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
}
