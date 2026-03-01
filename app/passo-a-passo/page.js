"use client";

import { motion } from "framer-motion";

// ─── HowTo Schema ─────────────────────────────────────────────────────────────
// Aparece nos resultados do Google como rich snippet com os passos numerados
const HowToSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Como funciona a preservação de flores de casamento",
        "description": "Processo artesanal completo de preservação botânica do bouquet de noiva, desde a reserva até ao quadro emoldurado com vidro museu anti-UV, pronto a pendurar em casa.",
        "totalTime": "P6M",
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "EUR", "value": "300" },
        "supply": [
          { "@type": "HowToSupply", "name": "Bouquet de flores frescas (até 5 dias após o evento)" },
          { "@type": "HowToSupply", "name": "Fotografias do dia (opcional, para referência)" }
        ],
        "tool": [
          { "@type": "HowToTool", "name": "Formulário de reserva online" }
        ],
        "step": [
          {
            "@type": "HowToStep", "position": 1,
            "name": "Reservar a data",
            "text": "Preencha o formulário de reserva com a data do evento e detalhes do bouquet. Pague o sinal de 30% para garantir a sua vaga — essencial em épocas de alta procura.",
            "url": "https://floresabeirario.pt/passo-a-passo#passo-1"
          },
          {
            "@type": "HowToStep", "position": 2,
            "name": "Entregar as flores",
            "text": "Entregue em mãos no atelier (Ceira, Coimbra), envie por CTT correio frágil urgente, ou solicite recolha no local do evento. Preferencialmente até 3 dias após o casamento.",
            "url": "https://floresabeirario.pt/passo-a-passo#passo-2"
          },
          {
            "@type": "HowToStep", "position": 3,
            "name": "Prensagem e secagem artesanal",
            "text": "Cada pétala é prensada e seca individualmente com técnicas de botânica artesanal, sem químicos agressivos, sem plásticos. O processo é feito com calma para preservar cor e forma ao máximo.",
            "url": "https://floresabeirario.pt/passo-a-passo#passo-3"
          },
          {
            "@type": "HowToStep", "position": 4,
            "name": "Composição e aprovação",
            "text": "Criamos a composição artística e enviamos fotografia para aprovação. Pode pedir ajustes antes de selaarmos a moldura definitivamente.",
            "url": "https://floresabeirario.pt/passo-a-passo#passo-4"
          },
          {
            "@type": "HowToStep", "position": 5,
            "name": "Emolduramento e entrega do quadro",
            "text": "O quadro é emoldurado com vidro museu anti-reflexo com proteção UV e enviado por CTT com rastreio, ou levantado no atelier em Coimbra.",
            "url": "https://floresabeirario.pt/passo-a-passo#passo-5"
          }
        ]
      })
    }}
  />
);

// ─── Dados dos passos ─────────────────────────────────────────────────────────
const STEPS = [
  {
    id:     "passo-1",
    n:      "01",
    tag:    "Antes do evento",
    title:  "Reserve a sua data",
    img:    "/passo-1-reserva.jpg",
    imgAlt: "Calendário com data de casamento marcada para reserva de preservação de bouquet",
    body:   "As vagas são limitadas — especialmente em Abril, Maio, Setembro e Outubro. O processo começa muito antes do casamento: assim que souber a data, garanta a sua vaga com o formulário de reserva.",
    note:   "Respondemos em 24 horas com a confirmação e as instruções de pagamento do sinal de 30%."
  },
  {
    id:     "passo-2",
    n:      "02",
    tag:    "Até 5 dias após",
    title:  "O bouquet chega até nós",
    img:    "/passo-2-entrega.jpg",
    imgAlt: "Bouquet de noiva fresco a ser entregue no atelier para preservação botânica",
    body:   "Depois do grande dia, as flores têm de chegar até nós o mais frescas possível — preferencialmente em 1 a 3 dias, no máximo 5. Enquanto aguarda, mantenha o bouquet num vaso com água fresca longe do sol e do calor.",
    note:   "Pode entregar em mãos no atelier (Ceira, Coimbra), enviar por CTT correio frágil, ou pedir-nos recolha no local do evento. Recebemos de Portugal e de toda a Europa."
  },
  {
    id:     "passo-3",
    n:      "03",
    tag:    "Até 6 meses",
    title:  "Prensagem pétala a pétala",
    img:    "/passo-3-prensagem.jpg",
    imgAlt: "Pétalas de flores de casamento a serem prensadas artesanalmente em papel botânico",
    body:   "É aqui que acontece a magia — e também a parte que não pode ser apressada. Cada pétala, folha e raminho é prensado individualmente em condições controladas de temperatura e humidade, sem químicos, sem plásticos.",
    note:   "Este processo pode demorar vários meses, e é exactamente esse tempo que faz a diferença entre um resultado mediano e uma obra de arte que dura décadas."
  },
  {
    id:     "passo-4",
    n:      "04",
    tag:    "Aprovação sua",
    title:  "Compõe­mos, você aprova",
    img:    "/passo-4-composicao.jpg",
    imgAlt: "Composição artística de flores prensadas do bouquet de noiva dentro de moldura",
    body:   "Com as flores prontas, criamos a composição dentro da moldura escolhida — e só avançamos quando você diz sim. Enviamos fotografia detalhada para aprovação e pode pedir ajustes antes de selarmos definitivamente.",
    note:   "Ninguém deve ficar com um quadro sem o ter aprovado primeiro. Esta etapa existe exactamente para isso."
  },
  {
    id:     "passo-5",
    n:      "05",
    tag:    "A vida toda",
    title:  "O quadro chega a casa",
    img:    "/passo-5-quadro.jpg",
    imgAlt: "Quadro botânico de flores de casamento prensadas emoldurado com vidro museu anti-UV",
    body:   "Após a sua aprovação e o pagamento final, o quadro é selado com vidro museu anti-reflexo e proteção UV — o mesmo vidro usado em museus para proteger obras de arte durante décadas — e enviado para casa com embalagem especial.",
    note:   "Pode também levantar pessoalmente no atelier. O quadro chega pronto a pendurar, com o hardware de montagem incluído."
  }
];

const INCLUDED = [
  { label: "Vidro museu anti-UV", desc: "O mesmo vidro usado em museus. Bloqueia os raios que desbotam as cores." },
  { label: "Aprovação antes de selar", desc: "Enviamos fotografia. Nada é definitivo sem o seu acordo." },
  { label: "Composição artística", desc: "Não é só secar flores — é criar uma composição pensada." },
  { label: "Hardware de montagem", desc: "O quadro chega pronto a pendurar. Sem surpresas." },
  { label: "Acompanhamento completo", desc: "Actualizações ao longo do processo. Nunca fica sem saber o estado." },
  { label: "Envio com rastreio", desc: "Embalagem especial para peças frágeis, com número de rastreio CTT." },
];

const DELIVERY = [
  {
    title: "Entrega em mãos",
    sub:   "Gratuita",
    body:  "No atelier em Ceira, Coimbra. Com agendamento prévio — para garantirmos a melhor recepção das flores.",
    c:     "#3D6B5E"
  },
  {
    title: "Envio por CTT",
    sub:   "Correio frágil",
    body:  "De Portugal ou de qualquer país da Europa. CTT correio frágil e urgente. Custos a cargo do cliente.",
    c:     "#B8954A"
  },
  {
    title: "Recolha no evento",
    sub:   "Sob orçamento",
    body:  "Deslocamo-nos ao local do casamento ou hotel. Sujeito a disponibilidade e orçamento adicional.",
    c:     "#C4846B"
  }
];

// ─── Componente Step — layout editorial alternado ─────────────────────────────
const Step = ({ step, index }) => {
  const isEven   = index % 2 === 0;   // imagem à esquerda nos pares
  const delay    = 0.08;

  return (
    <article
      id={step.id}
      aria-labelledby={`${step.id}-title`}
      style={{ marginBottom: "clamp(64px,12vw,110px)" }}
    >
      {/* Large ghost number — decorative, hidden from a11y */}
      <div aria-hidden="true" style={{
        fontFamily: "'TAN-MEMORIES', serif",
        fontSize:   "clamp(5rem,18vw,14rem)",
        lineHeight: 0.85,
        color:      "rgba(61,107,94,0.05)",
        userSelect: "none",
        pointerEvents: "none",
        marginBottom: "-clamp(28px,6vw,55px)",
        paddingLeft:  isEven ? "clamp(16px,5vw,48px)" : undefined,
        paddingRight: !isEven ? "clamp(16px,5vw,48px)" : undefined,
        textAlign:    isEven ? "left" : "right"
      }}>
        {step.n}
      </div>

      {/* Content grid — alternates on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`step-grid${isEven ? " step-grid--even" : " step-grid--odd"}`}
      >
        {/* Photo */}
        <div className="step-photo-wrap">
          <div style={{
            position:     "relative",
            borderRadius: "clamp(14px,2.5vw,22px)",
            overflow:     "hidden",
            backgroundColor: "#D4DECC",
            boxShadow:    "0 16px 48px rgba(30,45,42,0.12)"
          }}>
            {/* Step badge */}
            <div style={{
              position:        "absolute",
              top:             "16px",
              left:            "16px",
              zIndex:          2,
              backgroundColor: "#3D6B5E",
              color:           "#FAF7F0",
              padding:         "5px 14px",
              borderRadius:    "50px",
              display:         "flex",
              alignItems:      "center",
              gap:             "7px"
            }}>
              <span style={{
                fontFamily:    "'TAN-MEMORIES', serif",
                fontSize:      "0.7rem",
                lineHeight:    1
              }}>
                {step.n}
              </span>
              <span style={{
                fontSize:      "0.55rem",
                fontWeight:    700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily:    "Roboto, sans-serif",
                opacity:       0.8
              }}>
                {step.tag}
              </span>
            </div>

            <img
              src={step.img}
              alt={step.imgAlt}
              className="step-img"
              style={{
                width:      "100%",
                aspectRatio: "4/3",
                objectFit:  "cover",
                display:    "block",
                transition: "transform 0.6s ease"
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Text */}
        <div className="step-text">
          <h2
            id={`${step.id}-title`}
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize:   "clamp(1.6rem,4vw,2.5rem)",
              color:      "#1E2D2A",
              margin:     "0 0 clamp(12px,2vw,18px)",
              lineHeight: 1.1
            }}
          >
            {step.title}
          </h2>

          <p style={{
            color:      "#5A6B60",
            lineHeight: 1.88,
            fontSize:   "clamp(0.92rem,1.8vw,1.02rem)",
            margin:     "0 0 clamp(16px,2.5vw,22px)"
          }}>
            {step.body}
          </p>

          {/* Note / detail */}
          <div style={{
            padding:      "clamp(14px,2vw,18px) clamp(16px,2.5vw,22px)",
            borderRadius: "12px",
            backgroundColor: "rgba(61,107,94,0.06)",
            borderLeft:   "3px solid rgba(61,107,94,0.3)"
          }}>
            <p style={{
              color:      "#3D6B5E",
              lineHeight: 1.78,
              fontSize:   "clamp(0.84rem,1.6vw,0.92rem)",
              margin:     0,
              fontStyle:  "italic"
            }}>
              {step.note}
            </p>
          </div>
        </div>
      </motion.div>
    </article>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PassoAPasso() {
  const FORM = "https://wkf.ms/3RfoNAc";
  const WA   = "https://wa.me/351934680300?text=" +
    encodeURIComponent("Olá! Gostaria de reservar a preservação do meu bouquet de casamento.");

  return (
    <>
      <HowToSchema/>

      <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden" }}>

        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; }
          :root {
            --green:   #3D6B5E;
            --green-d: #1E2D2A;
            --terra:   #C4846B;
            --gold:    #B8954A;
            --cream:   #FAF7F0;
            --mid:     #5A6B60;
          }

          /* ── Step layout: editorial alternating ───────────────── */
          .step-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(24px,5vw,48px);
            align-items: center;
          }

          @media (min-width: 768px) {
            .step-grid {
              grid-template-columns: 1fr 1fr;
              gap: clamp(40px,5vw,80px);
            }
            /* odd steps: text left, photo right */
            .step-grid--odd .step-photo-wrap { order: 2; }
            .step-grid--odd .step-text       { order: 1; }
          }

          /* Photo hover */
          .step-img:hover { transform: scale(1.03); }

          /* ── Included grid ────────────────────────────────────── */
          .included-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }
          @media (min-width: 480px) {
            .included-grid { grid-template-columns: 1fr 1fr; }
          }
          @media (min-width: 900px) {
            .included-grid { grid-template-columns: 1fr 1fr 1fr; }
          }

          /* ── Delivery grid ────────────────────────────────────── */
          .delivery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }
          @media (min-width: 600px) {
            .delivery-grid { grid-template-columns: repeat(3, 1fr); }
          }

          /* ── CTA row ──────────────────────────────────────────── */
          .cta-row {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          @media (min-width: 480px) {
            .cta-row {
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
          }

          /* ── Comparison table ─────────────────────────────────── */
          .compare-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }
          @media (min-width: 560px) {
            .compare-grid { grid-template-columns: 1fr 1fr; }
          }

          /* ── Buttons ──────────────────────────────────────────── */
          .btn-primary {
            display: inline-block;
            background: var(--green); color: var(--cream);
            padding: 15px 34px; border-radius: 100px;
            text-decoration: none; font-weight: 600;
            font-size: 0.82rem; letter-spacing: 1.4px;
            text-transform: uppercase; text-align: center;
            box-shadow: 0 6px 22px rgba(61,107,94,0.28);
            transition: all 0.3s ease;
            font-family: Roboto, sans-serif;
          }
          .btn-primary:hover { background: var(--green-d); transform: translateY(-3px); }

          .btn-outline {
            display: inline-block;
            border: 2px solid var(--green); color: var(--green);
            padding: 13px 32px; border-radius: 100px;
            text-decoration: none; font-weight: 600;
            font-size: 0.82rem; letter-spacing: 1.4px;
            text-transform: uppercase; text-align: center;
            transition: all 0.3s ease;
            font-family: Roboto, sans-serif;
          }
          .btn-outline:hover { background: var(--green); color: var(--cream); transform: translateY(-3px); }

          .btn-wa {
            display: inline-flex; align-items: center; gap: 8px;
            background: #25D366; color: #fff;
            padding: 14px 28px; border-radius: 100px;
            text-decoration: none; font-weight: 600;
            font-size: 0.82rem; letter-spacing: 1px;
            transition: all 0.3s ease;
            font-family: Roboto, sans-serif;
            white-space: nowrap;
          }
          .btn-wa:hover { background: #1da851; transform: translateY(-3px); }

          /* Anchor offset for fixed nav */
          [id^="passo-"] { scroll-margin-top: 100px; }

          /* Eyebrow */
          .eyebrow {
            display: block;
            font-size: 0.58rem; font-weight: 700;
            letter-spacing: 3.5px; text-transform: uppercase;
            color: var(--terra); margin-bottom: 12px;
            font-family: Roboto, sans-serif;
          }

          /* Internal links */
          .text-link {
            color: var(--green); font-weight: 600;
            text-decoration: none;
            border-bottom: 1px solid rgba(61,107,94,0.3);
            padding-bottom: 1px;
            transition: border-color 0.2s ease;
          }
          .text-link:hover { border-color: var(--green); }
        `}}/>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section
          aria-label="Como funciona a preservação de flores de casamento"
          style={{
            paddingTop:    "clamp(110px,16vw,170px)",
            paddingBottom: "clamp(52px,8vw,88px)",
            paddingLeft:   "clamp(20px,5vw,48px)",
            paddingRight:  "clamp(20px,5vw,48px)",
            background:    "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)"
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow">O nosso processo</span>

              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize:   "clamp(2.8rem,9vw,5.8rem)",
                color:      "#1E2D2A",
                margin:     "0 0 clamp(18px,3vw,28px)",
                lineHeight: 1.0
              }}>
                Da flor fresca<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>ao quadro para sempre</em>
              </h1>

              <p style={{
                color:      "#5A6B60",
                fontSize:   "clamp(0.95rem,2vw,1.08rem)",
                lineHeight: 1.88,
                maxWidth:   "580px",
                margin:     "0 0 clamp(28px,4vw,40px)"
              }}>
                Cinco passos para transformar o seu bouquet de noiva numa obra de arte
                botânica que dura décadas — explicados com toda a transparência.
              </p>

              {/* Payment anchors — useful context before scrolling */}
              <div style={{
                display:        "flex",
                flexWrap:       "wrap",
                gap:            "clamp(6px,1.5vw,10px)",
                alignItems:     "center"
              }}>
                <a href={FORM} target="_blank" rel="noopener noreferrer"
                  className="btn-primary" style={{ fontSize: "0.78rem" }}>
                  Reservar Data
                </a>
                <a href="/perguntas-frequentes" className="btn-outline"
                  style={{ fontSize: "0.78rem" }}>
                  Ver Perguntas Frequentes
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            STEPS — editorial alternating layout
        ══════════════════════════════════════════════════════ */}
        <section
          aria-label="Os cinco passos da preservação de flores"
          style={{
            padding: "clamp(60px,10vw,110px) clamp(20px,5vw,64px)"
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {STEPS.map((step, i) => (
              <Step key={step.id} step={step} index={i}/>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            O QUE ESTÁ INCLUÍDO — trust builder
        ══════════════════════════════════════════════════════ */}
        <section
          aria-label="O que está incluído na preservação de flores"
          style={{
            padding:    "clamp(52px,8vw,84px) clamp(20px,5vw,48px)",
            background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)"
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}
            >
              <span className="eyebrow">Sem surpresas</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize:   "clamp(1.8rem,4.5vw,3rem)",
                color:      "#1E2D2A",
                margin:     0,
                lineHeight: 1.1
              }}>
                Tudo incluído no preço
              </h2>
            </motion.div>

            <div className="included-grid">
              {INCLUDED.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius:    "14px",
                    padding:         "clamp(16px,2.5vw,22px)",
                    border:          "1px solid rgba(61,107,94,0.09)",
                    boxShadow:       "0 3px 14px rgba(30,45,42,0.05)",
                    display:         "flex",
                    gap:             "14px",
                    alignItems:      "flex-start"
                  }}
                >
                  {/* Checkmark */}
                  <div style={{ flexShrink: 0, marginTop: "2px" }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="10" fill="rgba(61,107,94,0.1)"/>
                      <path d="M6 10l3 3 5-5" stroke="#3D6B5E" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{
                      fontFamily:  "'TAN-MEMORIES', serif",
                      fontSize:    "0.98rem",
                      color:       "#1E2D2A",
                      margin:      "0 0 4px",
                      lineHeight:  1.2
                    }}>
                      {item.label}
                    </p>
                    <p style={{
                      color:      "#5A6B60",
                      fontSize:   "0.84rem",
                      lineHeight: 1.65,
                      margin:     0
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{
              textAlign:   "center",
              marginTop:   "clamp(28px,4vw,40px)",
              fontSize:    "0.88rem",
              color:       "#5A6B60",
              lineHeight:  1.7
            }}>
              Os preços começam em{" "}
              <strong style={{ color: "#1E2D2A" }}>300€</strong>,
              incluindo emolduramento e vidro museu.{" "}
              <a href="/opcoes-e-precos" className="text-link">
                Ver todos os preços e tamanhos →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ENTREGA — 3 opções
        ══════════════════════════════════════════════════════ */}
        <section
          aria-label="Como entregar as flores no atelier"
          style={{
            padding: "clamp(52px,8vw,80px) clamp(20px,5vw,48px)",
            backgroundColor: "#FAF7F0"
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,40px)" }}
            >
              <span className="eyebrow">Logística</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize:   "clamp(1.7rem,4vw,2.8rem)",
                color:      "#1E2D2A",
                margin:     "0 0 12px",
                lineHeight: 1.1
              }}>
                Como nos fazer chegar as flores
              </h2>
              <p style={{
                color:    "#5A6B60",
                fontSize: "clamp(0.9rem,1.8vw,0.98rem)",
                lineHeight: 1.8,
                maxWidth: "480px",
                margin:   "0 auto"
              }}>
                Recebemos flores de toda a Europa.
                Escolha a opção que funciona melhor para si.
              </p>
            </motion.div>

            <div className="delivery-grid">
              {DELIVERY.map((opt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65 }}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius:    "18px",
                    padding:         "clamp(20px,3vw,28px)",
                    border:          `1px solid ${opt.c}18`,
                    boxShadow:       "0 4px 20px rgba(30,45,42,0.06)"
                  }}
                >
                  <span style={{
                    display:         "inline-block",
                    fontSize:        "0.57rem",
                    fontWeight:      700,
                    letterSpacing:   "2px",
                    textTransform:   "uppercase",
                    color:           opt.c,
                    fontFamily:      "Roboto, sans-serif",
                    backgroundColor: `${opt.c}12`,
                    padding:         "4px 12px",
                    borderRadius:    "50px",
                    marginBottom:    "12px"
                  }}>
                    {opt.sub}
                  </span>
                  <h3 style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize:   "1.15rem",
                    color:      "#1E2D2A",
                    margin:     "0 0 8px",
                    lineHeight: 1.2
                  }}>
                    {opt.title}
                  </h3>
                  <p style={{
                    color:      "#5A6B60",
                    fontSize:   "0.88rem",
                    lineHeight: 1.75,
                    margin:     0
                  }}>
                    {opt.body}
                  </p>
                </motion.div>
              ))}
            </div>

            <p style={{
              textAlign:  "center",
              marginTop:  "20px",
              color:      "#9BA89F",
              fontSize:   "0.82rem",
              lineHeight: 1.7
            }}>
              Em caso de dúvida sobre o envio,{" "}
              <a href={WA} target="_blank" rel="noopener noreferrer" className="text-link">
                fale connosco pelo WhatsApp
              </a>.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PAGAMENTO — 3 prestações
        ══════════════════════════════════════════════════════ */}
        <section
          aria-label="Pagamento da preservação em três prestações"
          style={{
            padding:    "clamp(52px,8vw,84px) clamp(20px,5vw,48px)",
            background: "linear-gradient(135deg, #1E2D2A 0%, #2D5045 100%)"
          }}
        >
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <div style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}>
                <span style={{
                  display:       "block",
                  fontSize:      "0.58rem",
                  fontWeight:    700,
                  letterSpacing: "3.5px",
                  textTransform: "uppercase",
                  color:         "#8BA888",
                  marginBottom:  "12px",
                  fontFamily:    "Roboto, sans-serif"
                }}>
                  Transparência total
                </span>
                <h2 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize:   "clamp(1.7rem,4vw,2.8rem)",
                  color:      "#FAF7F0",
                  margin:     "0 0 12px",
                  lineHeight: 1.1
                }}>
                  Pagamento em três momentos
                </h2>
                <p style={{
                  color:      "rgba(250,247,240,0.6)",
                  fontSize:   "clamp(0.88rem,1.8vw,0.96rem)",
                  lineHeight: 1.8,
                  maxWidth:   "440px",
                  margin:     "0 auto"
                }}>
                  Para não pesar no orçamento do casamento — o valor é repartido ao longo do processo.
                </p>
              </div>

              <div style={{
                display:             "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap:                 "clamp(8px,2vw,16px)"
              }}>
                {[
                  {
                    pct:   "30%",
                    label: "Na reserva",
                    desc:  "Sinal que garante a sua vaga. Não reembolsável.",
                    c:     "#8BA888"
                  },
                  {
                    pct:   "40%",
                    label: "Início do trabalho",
                    desc:  "Quando as flores chegam e iniciamos a prensagem.",
                    c:     "#B8954A"
                  },
                  {
                    pct:   "30%",
                    label: "Antes da entrega",
                    desc:  "Após aprovação da composição e antes de enviarmos o quadro.",
                    c:     "#C4846B"
                  }
                ].map((p, i) => (
                  <div key={i} style={{
                    backgroundColor: "rgba(250,247,240,0.06)",
                    borderRadius:    "clamp(12px,2vw,18px)",
                    padding:         "clamp(16px,2.5vw,26px) clamp(12px,2vw,18px)",
                    border:          "1px solid rgba(250,247,240,0.09)",
                    textAlign:       "center"
                  }}>
                    <span style={{
                      display:    "block",
                      fontFamily: "'TAN-MEMORIES', serif",
                      fontSize:   "clamp(1.8rem,4.5vw,2.8rem)",
                      color:      p.c,
                      lineHeight: 1,
                      marginBottom: "6px"
                    }}>
                      {p.pct}
                    </span>
                    <span style={{
                      display:       "block",
                      fontSize:      "0.6rem",
                      fontWeight:    700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color:         "#FAF7F0",
                      fontFamily:    "Roboto, sans-serif",
                      marginBottom:  "8px"
                    }}>
                      {p.label}
                    </span>
                    <p style={{
                      color:      "rgba(250,247,240,0.55)",
                      fontSize:   "clamp(0.75rem,1.4vw,0.84rem)",
                      lineHeight: 1.65,
                      margin:     0
                    }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BOTÂNICA vs RESINA — diferenciador
        ══════════════════════════════════════════════════════ */}
        <section
          aria-label="Diferença entre preservação botânica e resina epóxi"
          style={{
            padding:         "clamp(52px,8vw,84px) clamp(20px,5vw,48px)",
            backgroundColor: "#FAF7F0"
          }}
        >
          <div style={{ maxWidth: "920px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,44px)" }}
            >
              <span className="eyebrow">Porque botânica</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize:   "clamp(1.8rem,4.5vw,3rem)",
                color:      "#1E2D2A",
                margin:     0,
                lineHeight: 1.1
              }}>
                Prensagem botânica<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>vs resina epóxi</em>
              </h2>
            </motion.div>

            <div className="compare-grid">
              {[
                {
                  title:  "Prensagem botânica",
                  tag:    "O que fazemos",
                  tagC:   "#3D6B5E",
                  bg:     "rgba(61,107,94,0.04)",
                  border: "rgba(61,107,94,0.15)",
                  items: [
                    "100% orgânico — sem químicos, sem plásticos",
                    "Resultado mais natural e autêntico",
                    "Vidro museu anti-UV — dura décadas",
                    "A flor mantém a sua essência real",
                    "Estética artística, não industrial"
                  ],
                  check: "#3D6B5E"
                },
                {
                  title:  "Resina epóxi",
                  tag:    "A alternativa",
                  tagC:   "#9BA89F",
                  bg:     "rgba(155,168,159,0.04)",
                  border: "rgba(155,168,159,0.15)",
                  items: [
                    "Polímero sintético (plástico) líquido",
                    "A flor fica encapsulada em resina",
                    "Pode amarelecer ao longo do tempo",
                    "Resultado mais artificial e brilhante",
                    "Difícil de restaurar ou conservar"
                  ],
                  check: "#C4846B"
                }
              ].map((col, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65 }}
                  style={{
                    backgroundColor: col.bg,
                    borderRadius:    "20px",
                    padding:         "clamp(22px,3vw,32px)",
                    border:          `1.5px solid ${col.border}`
                  }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <span style={{
                      display:         "inline-block",
                      fontSize:        "0.57rem",
                      fontWeight:      700,
                      letterSpacing:   "2px",
                      textTransform:   "uppercase",
                      color:           col.tagC,
                      fontFamily:      "Roboto, sans-serif",
                      backgroundColor: `${col.tagC}14`,
                      padding:         "4px 12px",
                      borderRadius:    "50px",
                      marginBottom:    "10px"
                    }}>
                      {col.tag}
                    </span>
                    <h3 style={{
                      fontFamily: "'TAN-MEMORIES', serif",
                      fontSize:   "1.3rem",
                      color:      "#1E2D2A",
                      margin:     0,
                      lineHeight: 1.2
                    }}>
                      {col.title}
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {col.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                          aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                          <circle cx="10" cy="10" r="10" fill={`${col.check}15`}/>
                          {i === 0
                            ? <path d="M6 10l3 3 5-5" stroke={col.check} strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round"/>
                            : <path d="M7 7l6 6M13 7l-6 6" stroke={col.check} strokeWidth="1.8"
                                strokeLinecap="round"/>
                          }
                        </svg>
                        <p style={{
                          color:      "#5A6B60",
                          fontSize:   "0.88rem",
                          lineHeight: 1.65,
                          margin:     0
                        }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════════════ */}
        <section
          aria-label="Reservar preservação de bouquet de casamento"
          style={{
            padding:    "clamp(60px,10vw,100px) clamp(20px,5vw,48px)",
            background: "linear-gradient(140deg, #EDF2E8 0%, #FAF7F0 55%, #F0EBE0 100%)",
            textAlign:  "center"
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            style={{ maxWidth: "580px", margin: "0 auto" }}
          >
            {/* Gold divider */}
            <div aria-hidden="true" style={{
              width:      "44px",
              height:     "1px",
              margin:     "0 auto 28px",
              background: "linear-gradient(to right, transparent, #B8954A, transparent)"
            }}/>

            <span className="eyebrow" style={{ color: "#B8954A" }}>
              Pronta para começar?
            </span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize:   "clamp(2rem,5.5vw,3.5rem)",
              color:      "#1E2D2A",
              margin:     "0 0 16px",
              lineHeight: 1.1
            }}>
              Reserve a sua vaga hoje
            </h2>
            <p style={{
              color:      "#5A6B60",
              lineHeight: 1.88,
              fontSize:   "clamp(0.9rem,2vw,1rem)",
              margin:     "0 0 34px"
            }}>
              Não espere pelo último momento — as vagas em época de casamentos
              esgotam com muita antecedência. O processo começa agora,
              o quadro fica para sempre.
            </p>

            <div className="cta-row" style={{ marginBottom: "28px" }}>
              <a href={FORM} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Preencher Formulário de Reserva
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar pelo WhatsApp
              </a>
            </div>

            {/* Internal links */}
            <div style={{
              display:        "flex",
              flexWrap:       "wrap",
              justifyContent: "center",
              gap:            "20px",
              fontSize:       "0.82rem"
            }}>
              {[
                { href: "/opcoes-e-precos",      label: "Ver preços" },
                { href: "/recriacao",            label: "Recriação de bouquet" },
                { href: "/perguntas-frequentes", label: "Perguntas frequentes" }
              ].map((l, i) => (
                <a key={i} href={l.href} className="text-link">
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        </section>

      </main>
    </>
  );
}
