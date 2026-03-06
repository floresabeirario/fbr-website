"use client";

import { motion } from "framer-motion";

const Schema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Preservação Botânica Sustentável — Prensagem vs Resina vs Sílica",
        "description": "Comparação entre prensagem botânica artesanal, resina epóxi e preservação 3D com sílica. Porque escolhemos o método mais sustentável, natural e duradouro para eternizar flores.",
        "author": { "@type": "Organization", "name": "Flores à Beira-Rio" },
        "publisher": {
          "@type": "Organization",
          "name": "Flores à Beira-Rio",
          "logo": { "@type": "ImageObject", "url": "https://floresabeirario.pt/logo.webp" }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://floresabeirario.pt/sustentabilidade" }
      })
    }}
  />
);

const METHODS = [
  {
    id:       "prensagem",
    tag:      "O que fazemos",
    tagColor: "#3D6B5E",
    bg:       "rgba(61,107,94,0.05)",
    border:   "rgba(61,107,94,0.18)",
    title:    "Prensagem Botânica",
    subtitle: "Artesanal. Natural. Para sempre.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4 C9 4 5 8 5 13 C5 20 14 26 14 26 C14 26 23 20 23 13 C23 8 19 4 14 4Z"
          stroke="#3D6B5E" strokeWidth="1.6" fill="rgba(61,107,94,0.12)" strokeLinejoin="round"/>
        <path d="M14 26 L14 13 M14 13 C10 11 8 8 9 5 M14 13 C18 11 20 8 19 5"
          stroke="#3D6B5E" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    pros: [
      "100% natural, sem químicos, sem plásticos no processo",
      "Técnica artesanal usada há séculos em botânica",
      "Flores mantêm a sua essência real e orgânica",
      "Resultado artístico, único e intemporalmente belo",
      "Vidro museu anti-UV garante décadas de durabilidade",
      "Materiais biodegradáveis no fim de vida útil",
    ],
    health: {
      label: "Seguro",
      color: "#3D6B5E",
      bg:    "rgba(61,107,94,0.08)",
      text:  "Sem exposição a químicos perigosos. O único cuidado é evitar poeira orgânica se as flores apodrecerem antes de chegarem ao atelier.",
    },
    ecology: {
      label: "Impacto mínimo",
      color: "#3D6B5E",
      bg:    "rgba(61,107,94,0.08)",
      text:  "Processo puramente mecânico. Sem solventes, sem emissões, sem resíduos especiais. Todos os materiais são biodegradáveis ou recicláveis no fim de vida.",
    },
    verdict: "A escolha mais sustentável, mais duradoura e mais cuidadosa para as flores e para o planeta.",
    verdictColor: "#3D6B5E",
    highlight: true,
  },
  {
    id:       "resina",
    tag:      "Alternativa comum",
    tagColor: "#C4846B",
    bg:       "rgba(196,132,107,0.04)",
    border:   "rgba(196,132,107,0.15)",
    title:    "Resina Epóxi",
    subtitle: "Plástico petroquímico encapsulado.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 22 L10 6 L14 10 L18 6 L20 22 Z"
          stroke="#C4846B" strokeWidth="1.6" fill="rgba(196,132,107,0.1)" strokeLinejoin="round"/>
        <path d="M8 22 L20 22" stroke="#C4846B" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M11 14 L17 14" stroke="#C4846B" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    cons: [
      "Polímero sintético derivado do petróleo",
      "Não é biodegradável nem reciclável",
      "Liberta COVs durante a cura",
      "Amarelece ao longo do tempo com a luz UV",
      "Resultado artificial, excessivamente brilhante",
      "Impossível de restaurar se danificado",
    ],
    health: {
      label: "Risco elevado",
      color: "#C4846B",
      bg:    "rgba(196,132,107,0.08)",
      text:  "A resina líquida liberta Compostos Orgânicos Voláteis (COVs). O contacto com a pele pode causar dermatite severa e alergias crónicas. Lixar a resina gera pó tóxico. Exige máscara com filtro químico, luvas de nitrilo e óculos de proteção.",
    },
    ecology: {
      label: "Impacto elevado",
      color: "#C4846B",
      bg:    "rgba(196,132,107,0.08)",
      text:  "Derivada do petróleo, não biodegradável e não reciclável. Emite COVs durante a produção. Permanece no ambiente durante centenas de anos.",
    },
    verdict: "Conveniente, mas incompatível com a nossa filosofia.",
    verdictColor: "#C4846B",
    highlight: false,
  },
  {
    id:       "silica",
    tag:      "Preservação 3D",
    tagColor: "#9BA89F",
    bg:       "rgba(155,168,159,0.04)",
    border:   "rgba(155,168,159,0.14)",
    title:    "Gel de Sílica",
    subtitle: "Industrial. Frágil. Exigente.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="#9BA89F" strokeWidth="1.6" fill="rgba(155,168,159,0.08)"/>
        <path d="M9 14 C9 10 19 10 19 14 C19 18 9 18 9 14Z"
          stroke="#9BA89F" strokeWidth="1" fill="none" opacity="0.5"/>
        <circle cx="14" cy="14" r="2" fill="#9BA89F" opacity="0.4"/>
      </svg>
    ),
    cons: [
      "Produção industrial com elevado consumo energético",
      "Requer grandes quantidades de gel por cada peça",
      "Flores ficam extremamente frágeis após a secagem",
      "Perdem cor rapidamente sem proteção UV adequada",
      "Exigem humidade rigorosamente controlada",
      "Resultado volumoso, difícil de expor com elegância",
    ],
    health: {
      label: "Risco moderado",
      color: "#9BA89F",
      bg:    "rgba(155,168,159,0.1)",
      text:  "O pó fino libertado durante o manuseio irrita as vias respiratórias e os olhos. Exige máscara contra poeira. Alguns tipos contêm cloreto de cobalto, classificado como cancerígeno suspeito.",
    },
    ecology: {
      label: "Impacto moderado",
      color: "#9BA89F",
      bg:    "rgba(155,168,159,0.1)",
      text:  "Produção industrial com elevado consumo energético. Versões com cloreto de cobalto são tóxicas para a vida aquática e classificadas como resíduo especial na União Europeia.",
    },
    verdict: "Tecnicamente interessante, ecologicamente questionável.",
    verdictColor: "#9BA89F",
    highlight: false,
  },
];

const MATERIALS = [
  {
    icon: "🪟",
    title: "Vidro Museu UltraVue® UV70",
    desc: "O mesmo vidro utilizado em museus e galerias de arte. Praticamente elimina reflexos, filtra 70% dos raios UV nocivos e garante que as cores das flores se mantêm vivas durante décadas.",
    accent: "#B8954A",
  },
  {
    icon: "🌲",
    title: "Molduras de Produção Local",
    desc: "As molduras são fabricadas à medida em Portugal, em madeira ou materiais lacados de alta qualidade. Cada moldura é única, produzida especificamente para a peça que vai receber.",
    accent: "#3D6B5E",
  },
  {
    icon: "📄",
    title: "Cartão e Cola de pH Neutro",
    desc: "Os mesmos materiais de preservação utilizados em arquivos e museus para conservar obras ao longo de décadas. Sem ácidos, sem amarelecimento, sem deterioração química.",
    accent: "#3D6B5E",
  },
  {
    icon: "🌿",
    title: "Zero Químicos Agressivos",
    desc: "A prensagem botânica é puramente mecânica. Pressão, temperatura controlada e tempo, sem solventes, sem resinas, sem substâncias que comprometam a integridade da flor ou o ambiente.",
    accent: "#8BA888",
  },
  {
    icon: "♻️",
    title: "Fim de Vida Responsável",
    desc: "No final da vida útil do quadro, todos os componentes podem ser devolvidos à natureza ou reciclados. Sem resíduos plásticos, sem compostos tóxicos. Uma peça que não deixa marcas negativas no planeta.",
    accent: "#3D6B5E",
  },
  {
    icon: "📦",
    title: "Embalagem com Propósito",
    desc: "As embalagens são feitas à mão pelos utentes da APCC Coimbra, com materiais pensados para serem reutilizados, não para serem deitados fora.",
    accent: "#C4846B",
  },
];

const PILLARS = [
  {
    n: "01",
    title: "Artesanal acima de tudo",
    body: "Cada flor é tratada individualmente, com atenção e tempo. Não existe linha de montagem, existe uma pessoa com as mãos nas flores, a tomar decisões estéticas a cada passo.",
    color: "#3D6B5E",
  },
  {
    n: "02",
    title: "Natural e local de origem a destino",
    body: "Da flor fresca ao quadro emoldurado, privilegiamos materiais portugueses e não introduzimos nenhum material sintético no processo de preservação. Madeira, vidro, papel de pH neutro, cola neutra.",
    color: "#8BA888",
  },
  {
    n: "03",
    title: "Feito para durar décadas",
    body: "A melhor forma de ser sustentável é não precisar de substituir. Um quadro feito com os nossos materiais dura décadas, é o oposto do descartável.",
    color: "#B8954A",
  },
  {
    n: "04",
    title: "Impacto social positivo",
    body: "Parte das embalagens é produzida em parceria com a APCC Coimbra, apoiando a autonomia e o trabalho de pessoas com paralisia cerebral. Não é uma ação pontual, é parte do nosso modelo de negócio.",
    color: "#C4846B",
  },
];

const Row = ({ text, good, color }) => (
  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "9px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
    <div style={{ flexShrink: 0, marginTop: "2px" }}>
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="10" fill={`${color}18`}/>
        {good
          ? <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M7 7l6 6M13 7l-6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        }
      </svg>
    </div>
    <p style={{ margin: 0, fontSize: "clamp(0.82rem,1.5vw,0.88rem)", color: "#5A6B60", lineHeight: 1.65 }}>
      {text}
    </p>
  </div>
);

const MiniBlock = ({ label, color, bg, text, icon }) => (
  <div style={{ backgroundColor: bg, borderRadius: "10px", padding: "12px 14px", marginTop: "10px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
      <span style={{ fontSize: "0.75rem" }} aria-hidden="true">{icon}</span>
      <span style={{
        fontSize: "0.62rem", fontWeight: 700, letterSpacing: "1.5px",
        textTransform: "uppercase", color: color, fontFamily: "Roboto, sans-serif",
      }}>{label}</span>
    </div>
    <p style={{ margin: 0, fontSize: "0.8rem", color: "#5A6B60", lineHeight: 1.62 }}>{text}</p>
  </div>
);

export default function Sustentabilidade() {
  const FORM = "https://wkf.ms/3RfoNAc";

  return (
    <>
      <Schema />

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
          .eyebrow {
            display: block;
            font-size: 0.58rem; font-weight: 700;
            letter-spacing: 3.5px; text-transform: uppercase;
            color: var(--terra); margin-bottom: 12px;
            font-family: Roboto, sans-serif;
          }
          .eyebrow-green { color: var(--green) !important; }
          .eyebrow-gold  { color: var(--gold)  !important; }
          .text-link {
            color: var(--green); font-weight: 600;
            text-decoration: none;
            border-bottom: 1px solid rgba(61,107,94,0.3);
            padding-bottom: 1px;
            transition: border-color 0.2s ease;
          }
          .text-link:hover { border-color: var(--green); }
          .compare-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
          }
          @media (min-width: 768px) {
            .compare-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
          }
          .materials-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }
          @media (min-width: 560px) {
            .materials-grid { grid-template-columns: 1fr 1fr; }
          }
          @media (min-width: 900px) {
            .materials-grid { grid-template-columns: 1fr 1fr 1fr; }
          }
          .pillars-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
          }
          @media (min-width: 640px) {
            .pillars-grid { grid-template-columns: 1fr 1fr; }
          }
          .apcc-split {
            display: grid;
            grid-template-columns: 1fr;
            gap: 48px;
            align-items: center;
          }
          @media (min-width: 768px) {
            .apcc-split { grid-template-columns: 1fr 1fr; gap: 80px; }
          }
          .lifecycle-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
          }
          @media (min-width: 560px) {
            .lifecycle-grid { grid-template-columns: repeat(5, 1fr); }
          }
          .cta-row {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          @media (min-width: 460px) {
            .cta-row { flex-direction: row; justify-content: center; align-items: center; }
          }
          .btn-primary {
            display: inline-flex; align-items: center; justify-content: center;
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
            display: inline-flex; align-items: center; justify-content: center;
            border: 2px solid var(--green); color: var(--green);
            padding: 13px 32px; border-radius: 100px;
            text-decoration: none; font-weight: 600;
            font-size: 0.82rem; letter-spacing: 1.4px;
            text-transform: uppercase; text-align: center;
            transition: all 0.3s ease;
            font-family: Roboto, sans-serif;
          }
          .btn-outline:hover { background: var(--green); color: var(--cream); transform: translateY(-3px); }
          .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .card-hover:hover { transform: translateY(-4px); box-shadow: 0 18px 48px rgba(30,45,42,0.11); }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          }
        `}} />

        {/* ══════ HERO ══════ */}
        <section
          aria-label="Sustentabilidade e filosofia da Flores à Beira-Rio"
          style={{
            paddingTop:    "clamp(120px,18vw,200px)",
            paddingBottom: "clamp(60px,10vw,100px)",
            paddingLeft:   "clamp(20px,5vw,48px)",
            paddingRight:  "clamp(20px,5vw,48px)",
            background:    "linear-gradient(168deg, #1E2D2A 0%, #2D4A3E 45%, #1E2D2A 100%)",
            position:      "relative",
            overflow:      "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: "repeating-linear-gradient(45deg, #8BA888 0px, #8BA888 1px, transparent 1px, transparent 44px)",
            pointerEvents: "none",
          }}/>
          <div aria-hidden="true" style={{
            position: "absolute", top: "-20%", right: "-5%",
            width: "clamp(280px,45vw,540px)", height: "clamp(280px,45vw,540px)",
            background: "radial-gradient(circle, rgba(139,168,136,0.08) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>

          <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(139,168,136,0.12)",
                border: "1px solid rgba(139,168,136,0.25)",
                borderRadius: "100px", padding: "7px 16px", marginBottom: "24px",
              }}>
                <span style={{ color: "#8BA888", fontSize: "0.9rem" }} aria-hidden="true">♻</span>
                <span style={{
                  fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3px",
                  textTransform: "uppercase", color: "#8BA888", fontFamily: "Roboto, sans-serif",
                }}>Os nossos valores</span>
              </span>

              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize:   "clamp(2.8rem,9vw,5.8rem)",
                color:      "#FAF7F0",
                margin:     "0 0 clamp(18px,3vw,28px)",
                lineHeight: 1.0,
              }}>
                Sustentabilidade<br/>
                <em style={{ fontStyle: "italic", color: "#8BA888" }}>sem compromissos</em>
              </h1>

              <p style={{
                color:      "rgba(250,247,240,0.7)",
                fontSize:   "clamp(0.95rem,2vw,1.1rem)",
                lineHeight: 1.88,
                maxWidth:   "580px",
                margin:     "0 0 clamp(28px,4vw,40px)",
              }}>
                Na Flores à Beira-Rio, preservar flores significa preservar também
                o planeta. Sem resinas petroquímicas, sem sílica industrial,
                apenas prensagem botânica artesanal com materiais de conservação museu.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px,2vw,14px)", alignItems: "center" }}>
                {["Sem resina epóxi", "Sem sílica industrial", "Sem químicos agressivos", "100% artesanal"].map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                    style={{
                      display: "inline-block", fontSize: "0.64rem", fontWeight: 700,
                      letterSpacing: "1.5px", textTransform: "uppercase", color: "#8BA888",
                      fontFamily: "Roboto, sans-serif", backgroundColor: "rgba(139,168,136,0.1)",
                      border: "1px solid rgba(139,168,136,0.2)", padding: "6px 14px", borderRadius: "100px",
                    }}
                  >{tag}</motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════ FILOSOFIA ══════ */}
        <section
          aria-label="A nossa filosofia de preservação sustentável"
          style={{
            padding:    "clamp(60px,10vw,96px) clamp(20px,5vw,48px)",
            background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)",
          }}
        >
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <span className="eyebrow eyebrow-green">A nossa filosofia</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize:   "clamp(1.9rem,4.5vw,3.2rem)",
                color:      "#1E2D2A",
                margin:     "0 0 clamp(20px,3vw,28px)",
                lineHeight: 1.1,
              }}>
                Artesanal. Natural. Local.<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>Para durar décadas.</em>
              </h2>
              <div style={{ color: "#5A6B60", fontSize: "clamp(0.95rem,1.8vw,1.05rem)", lineHeight: 1.88 }}>
                <p style={{ margin: "0 0 18px" }}>
                  Quando recebemos as flores de um momento marcante, a responsabilidade não
                  é só artística, é também ambiental.
                </p>
                <p style={{ margin: 0 }}>
                  Por isso escolhemos, e continuaremos a escolher, a prensagem botânica
                  artesanal como método exclusivo de trabalho. É uma técnica mais lenta e
                  mais exigente, mas os resultados falam por si: beleza natural, longevidade,
                  e um processo que respeita a integridade da flor e do planeta.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════ COMPARAÇÃO ══════ */}
        <section
          aria-label="Comparação entre prensagem botânica, resina epóxi e gel de sílica"
          style={{ padding: "clamp(52px,8vw,84px) clamp(20px,5vw,48px)", backgroundColor: "#FAF7F0" }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,52px)" }}
            >
              <span className="eyebrow">Comparação de técnicas</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize:   "clamp(1.8rem,4.5vw,3rem)",
                color:      "#1E2D2A",
                margin:     "0 0 14px",
                lineHeight: 1.1,
              }}>
                Preservação botânica<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>vs resina vs sílica</em>
              </h2>
              <p style={{
                color: "#5A6B60", fontSize: "clamp(0.9rem,1.8vw,0.98rem)",
                lineHeight: 1.8, maxWidth: "500px", margin: "0 auto",
              }}>
                Três métodos populares de eternizar flores. Só um que nunca coloca
                em risco quem trabalha nem o planeta.
              </p>
            </motion.div>

            <div className="compare-grid">
              {METHODS.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  className="card-hover"
                  style={{
                    backgroundColor: m.highlight ? "#fff" : m.bg,
                    borderRadius:    "20px",
                    padding:         "clamp(22px,3vw,32px)",
                    border:          `1.5px solid ${m.border}`,
                    boxShadow:       m.highlight ? "0 8px 32px rgba(61,107,94,0.1)" : "none",
                    position:        "relative",
                    overflow:        "hidden",
                  }}
                >
                  {m.highlight && (
                    <div aria-hidden="true" style={{
                      position: "absolute", top: 0, right: 0, width: "80px", height: "80px",
                      background: "radial-gradient(circle at top right, rgba(61,107,94,0.08) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}/>
                  )}

                  <div style={{ marginBottom: "16px" }}>
                    <span style={{
                      display: "inline-block", fontSize: "0.56rem", fontWeight: 700,
                      letterSpacing: "2px", textTransform: "uppercase", color: m.tagColor,
                      fontFamily: "Roboto, sans-serif", backgroundColor: `${m.tagColor}14`,
                      padding: "4px 12px", borderRadius: "50px", marginBottom: "12px",
                    }}>{m.tag}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      {m.icon}
                      <h3 style={{
                        fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.25rem",
                        color: "#1E2D2A", margin: 0, lineHeight: 1.2,
                      }}>{m.title}</h3>
                    </div>
                    <p style={{
                      color: "#9BA89F", fontSize: "0.76rem", margin: 0,
                      fontStyle: "italic", fontFamily: "Roboto, sans-serif",
                    }}>{m.subtitle}</p>
                  </div>

                  <div style={{ marginBottom: "6px" }}>
                    {(m.pros || m.cons).map((item, j) => (
                      <Row key={j} text={item} good={!!m.pros} color={m.tagColor} />
                    ))}
                  </div>

                  <MiniBlock icon="🩺" label={"Saúde: " + m.health.label} color={m.health.color} bg={m.health.bg} text={m.health.text} />
                  <MiniBlock icon="🌍" label={"Pegada ecológica: " + m.ecology.label} color={m.ecology.color} bg={m.ecology.bg} text={m.ecology.text} />

                  <div style={{
                    padding: "12px 16px", borderRadius: "10px",
                    backgroundColor: `${m.tagColor}0D`, border: `1px solid ${m.tagColor}20`, marginTop: "14px",
                  }}>
                    <p style={{
                      color: m.verdictColor, fontSize: "0.82rem", fontWeight: 600,
                      lineHeight: 1.5, margin: 0, fontFamily: "Roboto, sans-serif", fontStyle: "italic",
                    }}>{m.verdict}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ POR QUE RECUSAMOS ══════ */}
        <section
          aria-label="Porque não usamos resina epóxi nem gel de sílica"
          style={{
            padding:    "clamp(52px,8vw,84px) clamp(20px,5vw,48px)",
            background: "linear-gradient(175deg, #1E2D2A 0%, #2A3F37 100%)",
            position:   "relative",
            overflow:   "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03,
            backgroundImage: "repeating-linear-gradient(135deg, #8BA888 0px, #8BA888 1px, transparent 1px, transparent 36px)",
            pointerEvents: "none",
          }}/>

          <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}
            >
              <span style={{
                display: "block", fontSize: "0.58rem", fontWeight: 700,
                letterSpacing: "3.5px", textTransform: "uppercase",
                color: "#8BA888", marginBottom: "12px", fontFamily: "Roboto, sans-serif",
              }}>A nossa posição</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize:   "clamp(1.8rem,4.5vw,3rem)",
                color:      "#FAF7F0", margin: 0, lineHeight: 1.1,
              }}>
                Porque dizemos não<br/>
                <em style={{ fontStyle: "italic", color: "#8BA888" }}>à resina e à sílica</em>
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
              {[
                {
                  title: "A resina epóxi é plástico",
                  body: "A resina epóxi é um polímero sintético derivado do petróleo. Não é biodegradável, não é reciclável, e o seu processo de cura liberta compostos orgânicos voláteis (COVs) nocivos para quem trabalha com ela e para o ambiente. O contacto com a pele pode causar dermatite severa e alergias crónicas. A longo prazo, amarelece com a exposição à luz UV, comprometendo a estética da peça que se pretendia preservar para sempre.",
                  accent: "#C4846B", icon: "⚗️",
                },
                {
                  title: "A sílica industrial tem um custo ambiental e humano alto",
                  body: "O gel de sílica é produzido industrialmente com elevado consumo energético. Para cada peça, são necessárias grandes quantidades de gel, que depois precisam de ser tratadas como resíduo especial. Algumas versões contêm cloreto de cobalto, tóxico para a vida aquática e classificado como cancerígeno suspeito na União Europeia. Durante o manuseio, o pó libertado irrita as vias respiratórias e os olhos, exigindo equipamento de proteção.",
                  accent: "#9BA89F", icon: "🧪",
                },
                {
                  title: "A prensagem botânica é a técnica mais respeitosa",
                  body: "A prensagem botânica tem séculos de história, foi usada por botânicos, artistas e naturalistas muito antes da indústria química existir. Não adiciona nada à flor: remove apenas a humidade através de pressão, calor controlado e tempo. Sem químicos, sem riscos para a saúde, sem resíduos especiais. O resultado é uma flor que mantém a sua essência real, encapsulada de forma permanente com materiais que o próprio planeta pode absorver de volta.",
                  accent: "#3D6B5E", icon: "🌿",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65 }}
                  style={{
                    display: "flex", gap: "clamp(16px,3vw,24px)", alignItems: "flex-start",
                    backgroundColor: "rgba(250,247,240,0.05)", borderRadius: "18px",
                    padding: "clamp(20px,3vw,28px)", border: "1px solid rgba(250,247,240,0.07)",
                  }}
                >
                  <div style={{
                    flexShrink: 0, width: "44px", height: "44px", borderRadius: "12px",
                    backgroundColor: `${item.accent}20`, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "1.2rem", marginTop: "2px",
                  }} aria-hidden="true">{item.icon}</div>
                  <div>
                    <h3 style={{
                      fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem,2.2vw,1.25rem)",
                      color: "#FAF7F0", margin: "0 0 10px", lineHeight: 1.2,
                    }}>{item.title}</h3>
                    <p style={{
                      color: "rgba(250,247,240,0.6)", fontSize: "clamp(0.88rem,1.6vw,0.94rem)",
                      lineHeight: 1.82, margin: 0,
                    }}>{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ MATERIAIS ══════ */}
        <section
          aria-label="Materiais de qualidade museu usados na preservação de flores"
          style={{ padding: "clamp(52px,8vw,84px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #FAF7F0 0%, #EDF2E8 100%)" }}
        >
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}
            >
              <span className="eyebrow eyebrow-gold">Qualidade museu</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,3rem)",
                color: "#1E2D2A", margin: 0, lineHeight: 1.1,
              }}>
                Materiais que respeitam<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>a flor e o planeta</em>
              </h2>
            </motion.div>

            <div className="materials-grid">
              {MATERIALS.map((mat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  className="card-hover"
                  style={{
                    backgroundColor: "#fff", borderRadius: "16px",
                    padding: "clamp(18px,2.5vw,26px)", border: "1px solid rgba(61,107,94,0.08)",
                    boxShadow: "0 3px 16px rgba(30,45,42,0.05)",
                  }}
                >
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    backgroundColor: `${mat.accent}12`, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "1.25rem", marginBottom: "14px",
                  }} aria-hidden="true">{mat.icon}</div>
                  <h3 style={{
                    fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem",
                    color: "#1E2D2A", margin: "0 0 8px", lineHeight: 1.25,
                  }}>{mat.title}</h3>
                  <p style={{ color: "#5A6B60", fontSize: "0.86rem", lineHeight: 1.72, margin: 0 }}>{mat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ APCC ══════ */}
        <section
          aria-label="Embalagem artesanal em parceria com a APCC Coimbra"
          style={{
            padding:    "clamp(60px,10vw,96px) clamp(20px,5vw,48px)",
            background: "linear-gradient(155deg, #2D1F14 0%, #3A2A1C 45%, #1E2D2A 100%)",
            position:   "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03,
            backgroundImage: "repeating-linear-gradient(45deg, #B8954A 0px, #B8954A 1px, transparent 1px, transparent 50px)",
            pointerEvents: "none",
          }}/>

          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="apcc-split">
              <motion.div
                initial={{ opacity: 0, x: -22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ position: "relative", maxWidth: "360px", width: "100%" }}>
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0,
                    transform: "translate(10px, 10px) rotate(1.5deg)",
                    borderRadius: "18px", background: "rgba(184,149,74,0.1)",
                    border: "1px solid rgba(184,149,74,0.15)",
                  }}/>
                  <div style={{
                    position: "relative", transform: "rotate(-1.5deg)",
                    borderRadius: "18px", overflow: "hidden",
                    border: "1px solid rgba(184,149,74,0.2)",
                    aspectRatio: "3/4", boxShadow: "0 28px 56px rgba(0,0,0,0.4)",
                  }}>
                    <img
                      src="/oficinaapcc.webp"
                      alt="Utentes da Oficina de Tecelagem de Almalaguês e Costura da APCC Coimbra a produzir as embalagens artesanais para a Flores à Beira-Rio"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      loading="lazy"
                    />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                      background: "linear-gradient(to top, rgba(42,31,22,0.92) 0%, transparent 100%)",
                    }} aria-hidden="true"/>
                    <div style={{ position: "absolute", bottom: "18px", left: "18px", right: "18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "34px", height: "34px", borderRadius: "8px",
                          backgroundColor: "#FAF7F0", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                        }}>
                          <img src="/apcc.webp" alt="Logótipo APCC Coimbra" style={{ width: "26px", height: "26px", objectFit: "contain" }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: "#FAF7F0", fontSize: "0.72rem", fontFamily: "Roboto, sans-serif" }}>APCC Coimbra</p>
                          <p style={{ margin: "2px 0 0", color: "#B8954A", fontSize: "0.62rem", fontFamily: "Roboto, sans-serif" }}>Marca Mão Doida</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(184,149,74,0.1)", border: "1px solid rgba(184,149,74,0.25)",
                  borderRadius: "100px", padding: "7px 16px", marginBottom: "20px",
                }}>
                  <span style={{ color: "#B8954A", fontSize: "0.9rem" }} aria-hidden="true">♥</span>
                  <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#B8954A", fontFamily: "Roboto, sans-serif" }}>Parceria solidária</span>
                </div>

                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4.5vw,3rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>
                  A embalagem que<br/>
                  <em style={{ fontStyle: "italic", color: "#B8954A" }}>conta uma história</em>
                </h2>

                <p style={{ color: "rgba(250,247,240,0.7)", lineHeight: 1.85, fontSize: "clamp(0.92rem,1.8vw,1rem)", margin: "0 0 22px" }}>
                  A embalagem que protege o seu quadro não é comprada a um fornecedor
                  industrial. É feita à mão pelos utentes da Oficina de Tecelagem
                  de Almalaguês e Costura da APCC Coimbra, sob a marca Mão Doida.
                </p>

                <p style={{ color: "rgba(250,247,240,0.7)", lineHeight: 1.85, fontSize: "clamp(0.92rem,1.8vw,1rem)", margin: "0 0 28px" }}>
                  Cada saco é único. É pensado para ser reutilizado, para guardar
                  roupa, coisas de praia, ou o que couber. Não é uma embalagem
                  para deitar fora. É um objeto com alma, feito com cuidado por
                  pessoas que desafiam estigmas e celebram a sua singularidade.
                </p>

                {[
                  { icon: "🤝", title: "Impacto direto e contínuo", desc: "Cada encomenda da FBR apoia diretamente o trabalho e a autonomia dos utentes da APCC. Não é uma ação pontual, é o nosso modelo de negócio." },
                  { icon: "♻️", title: "Embalagem que se reutiliza", desc: "O saco serve o quadro na entrega e serve a vida depois. Zero desperdício por design." },
                  { icon: "🌿", title: "Arte consciente e local", desc: "Artesanato português, materiais sem desperdício, flores preservadas para durar décadas." },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "14px", alignItems: "flex-start", padding: "13px 0",
                    borderBottom: i < 2 ? "1px solid rgba(250,247,240,0.07)" : "none",
                  }}>
                    <span style={{ fontSize: "1.05rem", marginTop: "2px", flexShrink: 0 }} aria-hidden="true">{item.icon}</span>
                    <div>
                      <p style={{ margin: "0 0 3px", fontWeight: 700, color: "#FAF7F0", fontSize: "0.88rem", fontFamily: "Roboto, sans-serif" }}>{item.title}</p>
                      <p style={{ margin: 0, color: "rgba(250,247,240,0.55)", fontSize: "0.84rem", lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════ PILARES ══════ */}
        <section
          aria-label="Os quatro pilares da sustentabilidade da Flores à Beira-Rio"
          style={{ padding: "clamp(52px,8vw,80px) clamp(20px,5vw,48px)", backgroundColor: "#FAF7F0" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,40px)" }}
            >
              <span className="eyebrow">A nossa prática</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,3rem)", color: "#1E2D2A", margin: 0, lineHeight: 1.1 }}>
                Quatro pilares,<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>uma filosofia coerente</em>
              </h2>
            </motion.div>

            <div className="pillars-grid">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.65 }}
                  style={{
                    padding: "clamp(28px,3.5vw,36px) clamp(20px,3vw,32px)",
                    borderBottom: i < 2 ? "1px solid rgba(61,107,94,0.09)" : "none",
                    borderRight:  i % 2 === 0 ? "1px solid rgba(61,107,94,0.09)" : "none",
                  }}
                >
                  <div style={{
                    fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3rem,7vw,5rem)",
                    color: `${p.color}18`, lineHeight: 0.9, marginBottom: "10px", userSelect: "none",
                  }} aria-hidden="true">{p.n}</div>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.1rem,2.2vw,1.4rem)", color: "#1E2D2A", margin: "0 0 12px", lineHeight: 1.2 }}>{p.title}</h3>
                  <p style={{ color: "#5A6B60", fontSize: "clamp(0.88rem,1.6vw,0.94rem)", lineHeight: 1.82, margin: 0 }}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CICLO DE VIDA ══════ */}
        <section
          aria-label="Ciclo de vida de um quadro da Flores à Beira-Rio do bouquet ao planeta"
          style={{ padding: "clamp(52px,8vw,84px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}
            >
              <span className="eyebrow eyebrow-green">Do bouquet ao planeta</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,3rem)", color: "#1E2D2A", margin: 0, lineHeight: 1.1 }}>
                Um ciclo de vida<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>honesto e completo</em>
              </h2>
            </motion.div>

            <div className="lifecycle-grid" style={{ position: "relative" }}>
              {[
                { icon: "🌸", label: "As flores crescem",    desc: "Na natureza, sem intervenção nossa." },
                { icon: "💐", label: "O seu momento especial", desc: "Casamento, batizado, aniversário." },
                { icon: "🤲", label: "Chegam ao atelier",    desc: "Em até 5 dias, ainda frescas." },
                { icon: "🖼️", label: "Arte para décadas",     desc: "Prensagem, composição, moldura museu." },
                { icon: "🌍", label: "Fim de vida digno",     desc: "Madeira, vidro e papel voltam à terra." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{
                    textAlign: "center",
                    padding: "clamp(16px,2.5vw,24px) clamp(10px,2vw,16px)",
                    borderBottom: "1px solid rgba(61,107,94,0.08)",
                  }}
                >
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    backgroundColor: "rgba(61,107,94,0.08)", border: "1.5px solid rgba(61,107,94,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem", margin: "0 auto 12px",
                  }} aria-hidden="true">{step.icon}</div>
                  <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.95rem", color: "#1E2D2A", margin: "0 0 6px", lineHeight: 1.2 }}>{step.label}</p>
                  <p style={{ color: "#9BA89F", fontSize: "0.78rem", lineHeight: 1.6, margin: 0, fontFamily: "Roboto, sans-serif" }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{
                textAlign: "center", marginTop: "clamp(20px,3vw,32px)",
                color: "#9BA89F", fontSize: "0.82rem", lineHeight: 1.7,
                fontStyle: "italic", fontFamily: "Roboto, sans-serif",
              }}
            >
              Nenhum produto petroquímico. Nenhum resíduo tóxico. Nenhum plástico no processo de preservação.
            </motion.p>
          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section
          aria-label="Reservar preservação sustentável de flores"
          style={{
            padding:   "clamp(60px,10vw,100px) clamp(20px,5vw,48px)",
            background:"linear-gradient(140deg, #EDF2E8 0%, #FAF7F0 55%, #F0EBE0 100%)",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            style={{ maxWidth: "580px", margin: "0 auto" }}
          >
            <div aria-hidden="true" style={{
              width: "44px", height: "1px", margin: "0 auto 28px",
              background: "linear-gradient(to right, transparent, #3D6B5E, transparent)",
            }}/>
            <span className="eyebrow eyebrow-green">Pronta para começar?</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5.5vw,3.5rem)", color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1 }}>
              Preserve as suas flores<br/>
              <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>da forma mais cuidadosa</em>
            </h2>
            <p style={{ color: "#5A6B60", lineHeight: 1.88, fontSize: "clamp(0.9rem,2vw,1rem)", margin: "0 0 34px" }}>
              Sem resina, sem sílica, sem compromissos. Apenas flores,
              tempo e artesanato botânico, da forma como sempre deveria ser feito.
            </p>

            <div className="cta-row" style={{ marginBottom: "28px" }}>
              <a href={FORM} target="_blank" rel="noopener noreferrer" className="btn-primary">Reservar a Minha Data</a>
              <a href="/como-funciona" className="btn-outline">Ver Como Funciona</a>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.82rem" }}>
              {[
                { href: "/opcoes-e-precos",      label: "Ver preços" },
                { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
                { href: "/contactos",            label: "Falar connosco" },
              ].map((l, i) => (
                <a key={i} href={l.href} className="text-link">{l.label}</a>
              ))}
            </div>
          </motion.div>
        </section>

      </main>
    </>
  );
}
