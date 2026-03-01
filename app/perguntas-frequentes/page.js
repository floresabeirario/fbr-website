"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD FAQ Schema — aparece directamente nos resultados do Google
// (rich snippets com acordeão nas SERPs)
// ─────────────────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  // ── PROCESSO ──────────────────────────────────────────────────────────────
  {
    cat: "processo",
    q: "Quando devo agendar a preservação do meu bouquet?",
    plain: "O ideal é agendar assim que souber a data do casamento. As vagas são limitadas e em época de casamentos esgotam rapidamente. Se as flores já secaram, podemos fazer uma recriação do bouquet a partir de uma fotografia.",
    a: <>
      O ideal é agendar <strong>assim que souber a data do casamento</strong> — não precisa esperar pela data do evento.
      As vagas são limitadas e em meses de maior procura algumas datas esgotam com muita antecedência.
      <br/><br/>
      Se o evento já ocorreu e as flores não estão em bom estado, podemos fazer uma{" "}
      <a href="/recriacao" className="faq-link">recriação do bouquet</a> com flores frescas semelhantes,
      a partir de uma fotografia.
    </>
  },
  {
    cat: "processo",
    q: "Quanto tempo demora a preservação?",
    plain: "O tempo médio desde a recepção das flores até o quadro pronto é de até 6 meses. Nunca sacrificamos a qualidade em favor da rapidez.",
    a: <>
      O nosso tempo médio é de <strong>até 6 meses</strong> desde a recepção das flores até ao quadro emoldurado.
      Fazemos sempre o possível para ser mais rápidos, mas a prensagem é um processo delicado que não pode ser apressado.
      <strong> Nunca sacrificamos a qualidade em favor da rapidez.</strong>
    </>
  },
  {
    cat: "processo",
    q: "Como funciona o processo completo?",
    plain: "Começa com a reserva da vaga e sinal de 30%. Depois entrega das flores, prensagem artesanal, aprovação da composição por fotografia, e envio do quadro emoldurado.",
    a: <>
      Tudo começa com a <strong>reserva da vaga e pagamento do sinal de 30%</strong>.
      Depois, envie ou entregue as flores preferencialmente até 3 dias após o evento.
      <br/><br/>
      As flores são prensadas e secas artesanalmente. Criamos a composição e enviamos uma
      <strong> fotografia para aprovação</strong> antes de selarmos a moldura.
      Só após a sua aprovação — e pagamento final — o quadro é enviado.
      <br/><br/>
      <a href="/passo-a-passo" className="faq-link">Ver o processo detalhado →</a>
    </>
  },
  {
    cat: "processo",
    q: "Podem recolher as flores no local do casamento?",
    plain: "Sim, deslocamo-nos ao local do evento ou hotel para recolher as flores em mãos, mediante orçamento e disponibilidade.",
    a: <>
      Sim. Deslocamo-nos ao local do evento, hotel ou quinta para recolha em mãos —
      é a opção mais recomendada pois as flores chegam no seu melhor estado.
      Esta recolha tem <strong>custo adicional e está sujeita a disponibilidade</strong>.
      Contacte-nos com antecedência para verificar se cobrimos a sua zona.
    </>
  },
  {
    cat: "processo",
    q: "Posso personalizar o quadro com outros elementos?",
    plain: "Sim. Pode adicionar fitas do bouquet, tecido do vestido, convites, cartas ou fotografias impressas. Mencione no formulário de reserva.",
    a: <>
      Sim! Pode personalizar o quadro com elementos que tenham significado especial:
      fitas do bouquet, um pedaço de tecido do vestido ou véu, uma coleira de animal de estimação,
      convites de casamento, cartas ou fotografias impressas.
      <br/><br/>
      Mencione este detalhe <strong>no formulário de reserva</strong> ou por email após agendar.
    </>
  },
  {
    cat: "processo",
    q: "Recebem flores de fora de Portugal?",
    plain: "Sim, recebemos flores de toda a Europa por CTT ou transportadora. O cliente é responsável pelos custos e condições de envio até ao atelier.",
    a: <>
      Sim, recebemos flores de <strong>toda a Europa</strong>.
      O envio internacional é feito por CTT correio frágil/urgente ou transportadora à escolha do cliente —
      os custos e responsabilidade do envio até ao nosso atelier são do remetente.
      <br/><br/>
      Recomendamos que o envio seja feito <strong>o mais rápido possível</strong> após o evento,
      preferencialmente com gelo seco para conservação.
    </>
  },

  // ── FLORES ─────────────────────────────────────────────────────────────────
  {
    cat: "flores",
    q: "Preservam apenas bouquets de casamento?",
    plain: "Não. Preservamos flores de batizados, aniversários, bodas de prata e ouro, cerimónias fúnebres e qualquer flor com valor sentimental.",
    a: <>
      Não! Preservamos <strong>qualquer flor com significado emocional</strong>:
      ramos de batizado, flores de aniversário, bodas de prata e ouro,
      homenagens e cerimónias fúnebres, ou até flores espontâneas com valor sentimental.
      <br/><br/>
      O nosso vale-presente é especialmente popular para oferecer a noivas —
      <a href="/vale-presente" className="faq-link"> ver o vale-presente</a>.
    </>
  },
  {
    cat: "flores",
    q: "Preservam todo o tipo de flores?",
    plain: "A grande maioria das flores responde bem à prensagem. Flores com muito teor de água como suculentas ou antúrios podem ser mais difíceis de preservar.",
    a: <>
      A <strong>grande maioria</strong> das flores responde muito bem à prensagem.
      No entanto, flores com <strong>elevado teor de água</strong> (suculentas, antúrios, orquídeas carnosas)
      ou formatos muito volumosos podem ser mais difíceis de preservar na sua forma original.
      <br/><br/>
      Em caso de dúvida sobre o seu bouquet específico,{" "}
      <a href="/contactos" className="faq-link">contacte-nos antes de reservar</a> — adoramos ajudar.
    </>
  },
  {
    cat: "flores",
    q: "As cores mantêm-se iguais depois de secas?",
    plain: "Haverá alguma mudança natural de cor pois a humidade é removida. Rosas vermelhas tornam-se bordô, por exemplo. É a beleza do processo artesanal.",
    a: <>
      Haverá sempre <strong>alguma mudança de cor</strong> — é inevitável quando retiramos toda a humidade da flor.
      Algumas flores mantêm cores muito vibrantes; outras desbotam ligeiramente (rosas vermelhas tornam-se bordô, por exemplo).
      <br/><br/>
      Esta transformação faz parte da <strong>beleza natural do processo</strong>:
      a essência autentica da flor, preservada para sempre.
    </>
  },
  {
    cat: "flores",
    q: "Tenho flores de casamento de há vários anos. O que posso fazer?",
    plain: "Flores antigas dificilmente são preserváveis. Mas podemos recriar o bouquet com flores frescas iguais às do dia, usando fotografias como referência.",
    a: <>
      Flores muito antigas dificilmente podem ser preservadas na sua forma original.
      Para estes casos criámos a nossa{" "}
      <a href="/recriacao" className="faq-link">recriação de bouquet</a>:
      reproduzimos o ramo com flores <strong>frescas e iguais às originais</strong>,
      usando as fotografias do dia do casamento como referência.
      <br/><br/>
      É também o presente ideal para filhos que queiram eternizar o bouquet do casamento dos pais, décadas depois.
    </>
  },
  {
    cat: "flores",
    q: "Quanto tempo as flores podem estar sem ser entregues?",
    plain: "Recomendamos entregar as flores preferencialmente 1 a 3 dias após o evento, no máximo 5 dias, para garantir a melhor preservação possível.",
    a: <>
      Recomendamos que as flores cheguem ao atelier <strong>preferencialmente 1 a 3 dias</strong> após o evento,
      no máximo 5 dias. Quanto mais frescas chegarem, melhor o resultado final.
      <br/><br/>
      Enquanto aguarda, guarde as flores <strong>num vaso com água fresca</strong>,
      longe de calor directo e luz solar intensa.
    </>
  },

  // ── ENTREGA ────────────────────────────────────────────────────────────────
  {
    cat: "entrega",
    q: "Como faço chegar as flores ao atelier?",
    plain: "Pode entregar em mãos em Ceira (Coimbra), enviar por CTT correio frágil e urgente, ou pedir recolha no local do evento.",
    a: <>
      Tem três opções:
      <br/><br/>
      <strong>Entrega em mãos</strong> — gratuita, no nosso atelier em Ceira, Coimbra, mediante agendamento prévio.
      <br/>
      <strong>Envio por CTT</strong> — correio frágil e urgente, custos a cargo do cliente.
      <br/>
      <strong>Recolha no evento</strong> — deslocamo-nos ao local, sujeito a orçamento e disponibilidade.
    </>
  },
  {
    cat: "entrega",
    q: "Como é entregue o quadro final?",
    plain: "O quadro é enviado por CTT com rastreio e acondicionamento especial para peças frágeis, ou pode ser levantado pessoalmente no atelier.",
    a: <>
      O quadro pode ser:
      <br/><br/>
      <strong>Enviado para casa</strong> via CTT com rastreio, embalagem especial para peças frágeis
      e seguro de transporte. Os custos de envio são calculados por tamanho e zona.
      <br/>
      <strong>Levantado no atelier</strong> em Ceira, Coimbra, num horário a agendar.
      <br/><br/>
      O envio ou levantamento só acontece após <strong>aprovação da composição e pagamento total</strong>.
    </>
  },

  // ── PAGAMENTOS ─────────────────────────────────────────────────────────────
  {
    cat: "pagamentos",
    q: "Quanto custa a preservação?",
    plain: "Os preços começam nos 300€ com moldura e vidro museu incluídos. O valor varia consoante o tamanho e tipo de moldura escolhida.",
    a: <>
      Os preços <strong>começam nos 300€</strong> e incluem sempre o emolduramento artesanal
      com vidro museu anti-reflexo e proteção UV.
      O valor varia consoante o tamanho e o tipo de moldura escolhida.
      <br/><br/>
      <a href="/opcoes-e-precos" className="faq-link">Ver todos os preços e tamanhos →</a>
    </>
  },
  {
    cat: "pagamentos",
    q: "Como funciona o pagamento?",
    plain: "O pagamento é feito em três prestações: 30% de sinal na reserva, 40% na recepção das flores e 30% antes do envio do quadro.",
    a: <>
      O pagamento divide-se em <strong>três prestações</strong>:
      <br/><br/>
      <span style={{ display:"flex", gap:"10px", marginBottom:"6px" }}>
        <strong style={{ color:"#3D6B5E", flexShrink:0 }}>30%</strong>
        Sinal no momento da reserva (não reembolsável).
      </span>
      <span style={{ display:"flex", gap:"10px", marginBottom:"6px" }}>
        <strong style={{ color:"#3D6B5E", flexShrink:0 }}>40%</strong>
        Na recepção e início da preservação das flores.
      </span>
      <span style={{ display:"flex", gap:"10px" }}>
        <strong style={{ color:"#3D6B5E", flexShrink:0 }}>30%</strong>
        Antes do envio ou levantamento do quadro final.
      </span>
    </>
  },
  {
    cat: "pagamentos",
    q: "Posso cancelar ou obter reembolso?",
    plain: "O sinal de 30% não é reembolsável. Se o evento for reagendado, o sinal pode ser transferido para outra data mediante disponibilidade.",
    a: <>
      O sinal de 30% <strong>não é reembolsável</strong> em caso de cancelamento,
      pois a vaga fica reservada exclusivamente para si.
      <br/><br/>
      Se o evento for reagendado, o sinal <strong>pode ser transferido</strong> para uma nova data,
      mediante contacto prévio e disponibilidade da nossa agenda.
    </>
  },
  {
    cat: "pagamentos",
    q: "Aceitam devoluções?",
    plain: "Não aceitamos devoluções em encomendas personalizadas. Cada quadro é único e feito à mão com tempo e dedicação artesanal.",
    a: <>
      Não aceitamos devoluções em pedidos personalizados.
      Cada quadro é criado exclusivamente para si — é uma obra <strong>única e irrepetível</strong>,
      feita à mão com muito tempo e dedicação.
      <br/><br/>
      Por isso enviamos sempre uma fotografia da composição para aprovação
      <strong> antes de selar a moldura</strong>, garantindo que fica completamente satisfeito/a.
    </>
  },
];

const CATEGORIES = [
  { id: "todas",      label: "Todas",      count: FAQ_DATA.length },
  { id: "processo",   label: "Processo",   count: FAQ_DATA.filter(f => f.cat === "processo").length },
  { id: "flores",     label: "Flores",     count: FAQ_DATA.filter(f => f.cat === "flores").length },
  { id: "entrega",    label: "Entrega",    count: FAQ_DATA.filter(f => f.cat === "entrega").length },
  { id: "pagamentos", label: "Pagamentos", count: FAQ_DATA.filter(f => f.cat === "pagamentos").length },
];

// Inline JSON-LD — works with "use client" via dangerouslySetInnerHTML
const SchemaScript = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_DATA.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.plain }
        }))
      })
    }}
  />
);

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Accordion Item
// Note: <button> wraps a <span> (not h3) — h3 inside button is invalid HTML
// ─────────────────────────────────────────────────────────────────────────────
const FAQItem = ({ faq, isOpen, onToggle, searchTerm }) => {
  // Highlight matching search term
  const highlight = (text) => {
    if (!searchTerm || searchTerm.length < 2) return text;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} style={{ backgroundColor:"rgba(184,149,74,0.28)", borderRadius:"3px", padding:"0 2px" }}>{part}</mark>
        : part
    );
  };

  return (
    <div style={{ borderBottom: "1px solid rgba(61,107,94,0.11)" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          padding: "clamp(18px,3vw,24px) 0",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: "16px"
        }}
      >
        {/* span, not h3 — button cannot contain interactive/heading elements */}
        <span style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(1rem,2.2vw,1.18rem)",
          color: isOpen ? "#3D6B5E" : "#1E2D2A",
          lineHeight: 1.3, flex: 1,
          transition: "color 0.22s ease"
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
            backgroundColor: isOpen ? "#3D6B5E" : "rgba(61,107,94,0.09)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background-color 0.22s ease"
          }}
          aria-hidden="true"
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none"
            stroke={isOpen ? "#FAF7F0" : "#3D6B5E"}
            strokeWidth="2.2" strokeLinecap="round">
            <path d="M10 4V16M4 10H16"/>
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
              fontSize: "clamp(0.88rem,1.8vw,0.96rem)"
            }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
export default function PerguntasFrequentes() {
  const [openIndex, setOpenIndex]       = useState(null);
  const [activeCategory, setActiveCategory] = useState("todas");
  const [search, setSearch]             = useState("");

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  // Filter by category AND search
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

  const WA = "https://wa.me/351934680300?text=" +
    encodeURIComponent("Olá! Tenho uma dúvida sobre a preservação das minhas flores.");
  const FORM = "https://wkf.ms/3RfoNAc";

  return (
    <>
      <SchemaScript/>

      <main style={{ backgroundColor: "#FAF7F0", paddingBottom: "clamp(64px,10vw,100px)" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; }

          /* FAQ internal links */
          .faq-link {
            color: #3D6B5E; font-weight: 600;
            text-decoration: none;
            border-bottom: 1px solid rgba(61,107,94,0.35);
            padding-bottom: 1px;
            transition: border-color 0.2s ease;
          }
          .faq-link:hover { border-color: #3D6B5E; }

          /* Category pills */
          .pills-row {
            display: flex; gap: 8px;
            overflow-x: auto; padding-bottom: 2px;
            scrollbar-width: none;
          }
          .pills-row::-webkit-scrollbar { display: none; }
          .pill {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 9px 18px; border-radius: 100px;
            font-size: 0.72rem; font-weight: 600;
            letter-spacing: 0.8px; text-transform: uppercase;
            font-family: Roboto, sans-serif;
            border: 1.5px solid rgba(61,107,94,0.18);
            color: #5A6B60; background: transparent;
            cursor: pointer; transition: all 0.2s ease;
            white-space: nowrap; flex-shrink: 0;
          }
          .pill:hover  { border-color: #3D6B5E; color: #3D6B5E; }
          .pill.active { background: #3D6B5E; border-color: #3D6B5E; color: #FAF7F0; }
          .pill-count {
            display: inline-block;
            font-size: 0.6rem;
            opacity: 0.6;
          }
          .pill.active .pill-count { opacity: 0.75; }

          /* Search bar */
          .search-wrap {
            position: relative; margin-bottom: 24px;
          }
          .search-input {
            width: 100%;
            padding: 14px 20px 14px 46px;
            border-radius: 100px;
            border: 1.5px solid rgba(61,107,94,0.2);
            background: #fff;
            font-size: 0.92rem;
            color: #1E2D2A;
            font-family: Roboto, sans-serif;
            outline: none;
            transition: border-color 0.22s ease, box-shadow 0.22s ease;
            -webkit-appearance: none;
          }
          .search-input::placeholder { color: #9BA89F; }
          .search-input:focus {
            border-color: #3D6B5E;
            box-shadow: 0 0 0 3px rgba(61,107,94,0.1);
          }
          .search-icon {
            position: absolute; left: 16px; top: 50%;
            transform: translateY(-50%);
            color: #9BA89F; pointer-events: none;
            display: flex; align-items: center;
          }
          .search-clear {
            position: absolute; right: 16px; top: 50%;
            transform: translateY(-50%);
            background: none; border: none; cursor: pointer;
            color: #9BA89F; padding: 4px;
            display: flex; align-items: center;
            transition: color 0.2s ease;
          }
          .search-clear:hover { color: #1E2D2A; }

          /* Result count */
          .result-count {
            font-size: 0.72rem; color: #9BA89F;
            font-family: Roboto, sans-serif;
            letter-spacing: 0.5px;
            margin-bottom: 8px; display: block;
          }

          /* Buttons */
          .btn-primary {
            display: inline-block;
            background: #3D6B5E; color: #FAF7F0;
            padding: 14px 32px; border-radius: 100px;
            text-decoration: none; font-weight: 600;
            font-size: 0.8rem; letter-spacing: 1.4px;
            text-transform: uppercase; text-align: center;
            box-shadow: 0 6px 22px rgba(61,107,94,0.26);
            transition: all 0.3s ease;
            font-family: Roboto, sans-serif;
          }
          .btn-primary:hover { background: #1E2D2A; transform: translateY(-3px); }
          .btn-wa {
            display: inline-flex; align-items: center; gap: 8px;
            background: #25D366; color: #fff;
            padding: 14px 28px; border-radius: 100px;
            text-decoration: none; font-weight: 600;
            font-size: 0.8rem; letter-spacing: 1px;
            transition: all 0.3s ease;
            font-family: Roboto, sans-serif;
          }
          .btn-wa:hover { background: #1da851; transform: translateY(-3px); }

          .cta-row {
            display: flex; flex-direction: column;
            align-items: stretch; gap: 12px;
          }
          @media (min-width: 460px) {
            .cta-row { flex-direction: row; justify-content: center; align-items: center; }
          }

          /* Related links grid */
          .related-grid {
            display: grid; grid-template-columns: 1fr;
            gap: 12px; margin-top: 48px;
          }
          @media (min-width: 560px) {
            .related-grid { grid-template-columns: repeat(3, 1fr); }
          }
          .related-card {
            display: block; text-decoration: none;
            background: #EDF2E8; border-radius: 16px;
            padding: 22px 20px;
            border: 1px solid rgba(61,107,94,0.1);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .related-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 36px rgba(30,45,42,0.09);
          }
        `}}/>

        {/* ── PAGE HEADER ─────────────────────────────────── */}
        <section
          aria-label="Perguntas frequentes sobre preservação de flores de casamento"
          style={{
            paddingTop: "clamp(110px,16vw,170px)",
            paddingBottom: "clamp(44px,7vw,72px)",
            paddingLeft: "20px", paddingRight: "20px",
            background: "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)",
            textAlign: "center"
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              display: "block", fontSize: "0.58rem", fontWeight: "700",
              letterSpacing: "3.5px", textTransform: "uppercase",
              color: "#C4846B", marginBottom: "14px",
              fontFamily: "Roboto, sans-serif"
            }}>
              Tire as suas dúvidas
            </span>

            {/* h1 with keyword-rich text for SEO */}
            <h1 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2.6rem,9vw,5.5rem)",
              color: "#1E2D2A", margin: "0 0 20px",
              lineHeight: 1.02
            }}>
              Perguntas<br/>
              <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>Frequentes</em>
            </h1>

            <p style={{
              color: "#5A6B60", fontSize: "clamp(0.94rem,2vw,1.05rem)",
              lineHeight: 1.85, maxWidth: "520px", margin: "0 auto"
            }}>
              Tudo o que precisa de saber sobre preservação de flores de casamento,
              processo artesanal, entrega e pagamentos.
            </p>
          </motion.div>
        </section>

        {/* ── SEARCH + FILTER ──────────────────────────────── */}
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "36px 20px 0" }}>

          {/* Search bar */}
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
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
                  <path d="M15 5L5 15M5 5l10 10"/>
                </svg>
              </button>
            )}
          </div>

          {/* Category pills */}
          <div
            className="pills-row"
            role="tablist"
            aria-label="Filtrar por categoria"
            style={{ marginBottom: "28px" }}
          >
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

          {/* Result count — helpful on mobile */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="result-count"
              aria-live="polite"
            >
              {filtered.length === 0
                ? "Nenhum resultado encontrado"
                : `${filtered.length} pergunta${filtered.length !== 1 ? "s" : ""}`}
            </motion.span>
          </AnimatePresence>

          {/* ── FAQ LIST ───────────────────────────────────── */}
          <div role="list" aria-label="Perguntas e respostas">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    textAlign: "center", padding: "48px 20px",
                    color: "#9BA89F", fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "1.2rem"
                  }}
                >
                  Nenhuma pergunta encontrada.<br/>
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "0.88rem", color: "#B8A898" }}>
                    Tente outra pesquisa ou{" "}
                    <button
                      onClick={() => { setSearch(""); setActiveCategory("todas"); }}
                      style={{ background: "none", border: "none", cursor: "pointer",
                        color: "#3D6B5E", fontWeight: 600, fontSize: "0.88rem",
                        padding: 0, fontFamily: "Roboto, sans-serif",
                        borderBottom: "1px solid rgba(61,107,94,0.35)"
                      }}
                    >
                      ver todas as perguntas
                    </button>
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key={`${activeCategory}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {filtered.map((faq, i) => {
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

          {/* ── RELATED PAGES ─── good for SEO (internal links) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase",
              color: "#B8A898", fontFamily: "Roboto, sans-serif",
              margin: "48px 0 0", textAlign: "center"
            }}>
              Explorar
            </p>
            <div className="related-grid">
              {[
                { href: "/passo-a-passo", label: "Como Funciona", desc: "O processo passo a passo da preservação" },
                { href: "/opcoes-e-precos", label: "Preços e Tamanhos", desc: "Escolha a moldura e formato certos" },
                { href: "/recriacao", label: "Recriação de Bouquet", desc: "Quando o tempo já passou" },
              ].map((l, i) => (
                <a key={i} href={l.href} className="related-card">
                  <span style={{
                    display: "block",
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "1rem", color: "#1E2D2A",
                    marginBottom: "6px"
                  }}>
                    {l.label}
                  </span>
                  <span style={{
                    display: "block",
                    fontSize: "0.82rem", color: "#5A6B60", lineHeight: 1.6
                  }}>
                    {l.desc} →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── BOTTOM CTA ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ textAlign: "center", marginTop: "56px" }}
          >
            <div aria-hidden="true" style={{
              width: "44px", height: "1px", margin: "0 auto 28px",
              background: "linear-gradient(to right, transparent, #B8954A, transparent)"
            }}/>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.7rem,4vw,2.6rem)",
              color: "#1E2D2A", margin: "0 0 12px", lineHeight: 1.15
            }}>
              Ainda tem dúvidas?
            </h2>
            <p style={{
              color: "#5A6B60", fontSize: "clamp(0.9rem,2vw,0.97rem)",
              lineHeight: 1.82, margin: "0 0 28px", maxWidth: "460px",
              marginLeft: "auto", marginRight: "auto"
            }}>
              Fale connosco directamente — respondemos em poucas horas
              e adoramos ajudar a encontrar a opção certa para si.
            </p>
            <div className="cta-row">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
