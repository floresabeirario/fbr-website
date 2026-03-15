// app/perguntas-frequentes/PerguntasFrequentesClient.jsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FORM_URL, WA_NUMBER } from "../_lib/constants";
import "./PerguntasFrequentesClient.css";

const ACCENT = "#8B3A6B";
const ACCENT_LIGHT = "rgba(139,58,107,0.12)";
const ACCENT_BORDER = "rgba(139,58,107,0.25)";

const FAQ_DATA = [
  {
    cat: "processo",
    q: "Quando devo agendar a preservação do meu bouquet?",
    plain:
      "O ideal é agendar assim que souber a data do evento. As vagas são limitadas e em época de maior procura esgotam rapidamente. Se o evento já aconteceu, contacte-nos assim que possível. No caso de o evento ter acontecido há mais de 5 dias e as flores não estiverem em bom estado, podemos fazer uma recriação do bouquet com flores frescas semelhantes, a partir de uma fotografia.",
    a: (
      <>
        O ideal é agendar <strong>assim que souber a data do evento</strong>, não precisa esperar pela data.
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
        Há sempre <strong>alguma mudança de cor</strong>, é inevitável quando retiramos toda a humidade da flor.
        Algumas flores mantêm cores muito vibrantes, outras desbotam ligeiramente
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
        <strong>Recriação de bouquet</strong>, onde reproduzimos o ramo com flores frescas e iguais às originais,
        usando as fotografias do dia como referência.{" "}
        <a href="/recriacao" className="faq-link">Saber mais sobre a recriação de bouquet →</a>
        <br /><br />
        <strong>Emolduração das flores originais</strong>, onde podemos emoldurar numa moldura mais funda
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
        Cada situação é avaliada <strong>caso a caso</strong>, por isso contacte-nos assim que possível.
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
        A preservação em 3D habitualmente utiliza <strong>gel de sílica em grandes quantidades</strong>,
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
        <strong>Entrega em mãos</strong>, gratuita, no nosso atelier em Ceira, Coimbra, mediante agendamento prévio.
        <br /><br />
        <strong>Envio por CTT</strong>, correio frágil e urgente, custos a cargo do cliente.
        <br /><br />
        <strong>Recolha no evento</strong>, deslocamo-nos ao local, sujeito a orçamento e disponibilidade.
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
        Cada quadro é criado exclusivamente para si, é uma obra <strong>única e irrepetível</strong>.
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

  const WA   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre a preservação das minhas flores.")}`;
  const FORM = FORM_URL;

  return (
    <>
      <SchemaScript />

      <main style={{ backgroundColor: "#FAF7F0" }}>

        {/* Hero */}
        <section
          aria-label="Perguntas frequentes sobre preservação de flores"
          style={{
            position: "relative",
            height: "100dvh",
            minHeight: "560px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/sandraclose.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }} aria-hidden="true" />

          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(20,8,18,0.28) 0%, rgba(20,8,18,0.55) 55%, rgba(20,8,18,0.82) 100%)",
          }} aria-hidden="true" />

          <div style={{
            position: "relative", zIndex: 2,
            width: "100%",
            padding: "0 clamp(20px,6vw,80px)",
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
                color: "rgba(250,247,240,0.9)",
                marginBottom: "20px",
                fontFamily: "'Google Sans', Roboto, sans-serif",
              }}>
                Tire as suas dúvidas
              </span>

              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(3rem,10vw,6.5rem)",
                color: "#FAF7F0",
                margin: "0 auto",
                lineHeight: 1.02,
                textShadow: "0 4px 32px rgba(0,0,0,0.3)",
                maxWidth: "800px",
              }}>
                Perguntas<br />
                <em style={{ fontStyle: "italic", color: "rgba(230,180,210,0.95)" }}>Frequentes</em>
              </h1>

              <p style={{
                color: "rgba(250,247,240,0.82)",
                fontSize: "clamp(0.9rem,2vw,1.05rem)",
                lineHeight: 1.85,
                maxWidth: "480px",
                margin: "20px auto 0",
                fontFamily: "'Google Sans', Roboto, sans-serif",
              }}>
                Tudo o que precisa de saber sobre preservação de flores,
                processo artesanal, entrega e pagamentos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Conteúdo principal */}
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "44px 20px clamp(56px,8vw,88px)" }}>

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

        </div>

        {/* CTA final — largura total */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{
            background: "linear-gradient(135deg, #2D1B26 0%, #4A1E3A 40%, #3D6B5E 100%)",
            padding: "clamp(56px,8vw,88px) clamp(20px,6vw,80px)",
            textAlign: "center",
          }}
        >
          <span style={{
            display: "inline-block",
            fontSize: "0.65rem", fontWeight: "700",
            letterSpacing: "3px", textTransform: "uppercase",
            color: "rgba(230,180,210,0.85)", marginBottom: "16px",
            fontFamily: "'Google Sans', Roboto, sans-serif",
          }}>
            Apoio personalizado
          </span>

          <h3 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.6rem,4vw,2.6rem)",
            color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.15,
          }}>
            À procura de mais ajuda?
          </h3>

          <p style={{
            color: "rgba(250,247,240,0.8)", fontSize: "clamp(0.88rem,1.8vw,0.97rem)",
            lineHeight: 1.85, margin: "0 auto 36px", maxWidth: "520px",
            fontFamily: "'Google Sans', Roboto, sans-serif",
          }}>
            Agende uma <strong style={{ color: "#FAF7F0" }}>sessão de esclarecimento gratuita</strong> por{" "}
            <strong style={{ color: "#FAF7F0" }}>videochamada</strong> antes de fazer o seu pedido.
            Podemos ajudá-lo a <strong style={{ color: "#FAF7F0" }}>entender o processo de preservação</strong> e a{" "}
            <strong style={{ color: "#FAF7F0" }}>escolher os produtos</strong> que melhor se adequam a si.
            Esta sessão tem a duração aproximada de <strong style={{ color: "#FAF7F0" }}>30 minutos</strong>.
          </p>

          <div className="cta-row" style={{ justifyContent: "center" }}>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.25)",
                color: "#FAF7F0", padding: "14px 32px",
                borderRadius: "100px", textDecoration: "none", fontWeight: "600",
                fontSize: "0.8rem", letterSpacing: "1.2px", textTransform: "uppercase",
                transition: "all 0.3s ease",
                fontFamily: "'Google Sans', Roboto, sans-serif",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            >
              Agendar Sessão Gratuita
            </a>
            <a href={FORM} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Reservar Data
            </a>
          </div>
        </motion.div>

      </main>
    </>
  );
}
