"use client";

import { motion } from "framer-motion";

const Schema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Preservacao Botanica Sustentavel - Flores a Beira-Rio",
        "description": "A filosofia de sustentabilidade da Flores a Beira-Rio: prensagem botanica artesanal, materiais de qualidade museu e parceria solidaria com a Associacao de Paralisia Cerebral de Coimbra.",
        "author": { "@type": "Organization", "name": "Flores a Beira-Rio" },
        "publisher": {
          "@type": "Organization",
          "name": "Flores a Beira-Rio",
          "logo": { "@type": "ImageObject", "url": "https://floresabeirario.pt/logo.webp" }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://floresabeirario.pt/sustentabilidade" }
      })
    }}
  />
);

const METHODS = [
  {
    id:        "prensagem",
    tag:       "O que fazemos",
    tagColor:  "#2D4A3E",
    border:    "rgba(45,74,62,0.22)",
    bg:        "#fff",
    shadow:    "0 8px 32px rgba(45,74,62,0.10)",
    title:     "Prensagem Bot\u00e2nica",
    subtitle:  "Artesanal. Natural.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4 C9 4 5 8 5 13 C5 20 14 26 14 26 C14 26 23 20 23 13 C23 8 19 4 14 4Z"
          stroke="#2D4A3E" strokeWidth="1.6" fill="rgba(45,74,62,0.12)" strokeLinejoin="round"/>
        <path d="M14 26 L14 13 M14 13 C10 11 8 8 9 5 M14 13 C18 11 20 8 19 5"
          stroke="#2D4A3E" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    points: [
      { good: true,  text: "100% natural, sem solventes, sem emiss\u00f5es." },
      { good: true,  text: "Flores mant\u00eam a sua ess\u00eancia real e org\u00e2nica." },
      { good: true,  text: "N\u00e3o h\u00e1 exposi\u00e7\u00e3o a produtos qu\u00edmicos perigosos." },
      { good: true,  text: "Processo 100% mec\u00e2nico. N\u00e3o gera res\u00edduos t\u00f3xicos." },
      { good: true,  text: "Materiais biodegrad\u00e1veis no fim de vida \u00fatil." },
    ],
    verdict:      "A escolha mais sustent\u00e1vel e mais cuidadosa para as flores e para o planeta.",
    verdictColor: "#2D4A3E",
    highlight:    true,
  },
  {
    id:        "resina",
    tag:       "Alternativa comum",
    tagColor:  "#C4846B",
    border:    "rgba(196,132,107,0.18)",
    bg:        "rgba(196,132,107,0.03)",
    shadow:    "none",
    title:     "Resina Ep\u00f3xi",
    subtitle:  "Pl\u00e1stico petroqu\u00edmico encapsulado.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 22 L10 6 L14 10 L18 6 L20 22 Z"
          stroke="#C4846B" strokeWidth="1.6" fill="rgba(196,132,107,0.1)" strokeLinejoin="round"/>
        <path d="M8 22 L20 22" stroke="#C4846B" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    points: [
      { good: false, text: "Pol\u00edmero sint\u00e9tico derivado do petr\u00f3leo, n\u00e3o biodegrad\u00e1vel." },
      { good: false, text: "Liberta COVs t\u00f3xicos durante a cura e produ\u00e7\u00e3o." },
      { good: false, text: "Permanece no ambiente durante centenas de anos." },
      { good: false, text: "Dif\u00edcil ou imposs\u00edvel de restaurar se danificado." },
      { good: false, text: "Exige EPI rigoroso: m\u00e1scara com filtro de vapores qu\u00edmicos, luvas de nitrilo e \u00f3culos de prote\u00e7\u00e3o." },
    ],
    verdict:      "Nociva para a sa\u00fade e para o ambiente.",
    verdictColor: "#C4846B",
    highlight:    false,
  },
  {
    id:        "silica",
    tag:       "Preserva\u00e7\u00e3o 3D",
    tagColor:  "#9BA89F",
    border:    "rgba(155,168,159,0.18)",
    bg:        "rgba(155,168,159,0.03)",
    shadow:    "none",
    title:     "Gel de S\u00edlica",
    subtitle:  "Industrial. Fr\u00e1gil. Exigente.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="#9BA89F" strokeWidth="1.6" fill="rgba(155,168,159,0.08)"/>
        <circle cx="14" cy="14" r="2" fill="#9BA89F" opacity="0.4"/>
      </svg>
    ),
    points: [
      { good: false, text: "Produ\u00e7\u00e3o industrial com elevado consumo energ\u00e9tico." },
      { good: false, text: "Vers\u00f5es com cloreto de cobalto s\u00e3o t\u00f3xicas para a vida aqu\u00e1tica." },
      { good: false, text: "Exige o uso de m\u00e1scara durante o manuseio." },
      { good: false, text: "Perdem cor rapidamente sem prote\u00e7\u00e3o UV adequada." },
      { good: false, text: "A secagem ao ar livre \u00e9 uma alternativa, mas n\u00e3o preserva as cores originais, pelo que n\u00e3o a consideramos um m\u00e9todo de preserva\u00e7\u00e3o compar\u00e1vel aos m\u00e9todos profissionais." },
    ],
    verdict:      "Tecnicamente interessante, ecologicamente question\u00e1vel.",
    verdictColor: "#9BA89F",
    highlight:    false,
  },
];

const VALUES = [
  {
    icon: "\ud83c\udf32",
    title: "Emolduramento local",
    desc: "Os quadros s\u00e3o emoldurados numa molduraria local portuguesa, com madeira e materiais lacados de alta qualidade. Cada moldura \u00e9 produzida \u00e0 medida para a pe\u00e7a que vai receber.",
    accent: "#2D4A3E",
  },
  {
    icon: "\ud83c\udfa8",
    title: "Arte local em cada detalhe",
    desc: "Apoiamos artistas portugueses locais que criaram os elementos gr\u00e1ficos da nossa marca, incluindo o cart\u00e3o que acompanha as embalagens e o vale presente.",
    accent: "#2D4A3E",
  },
  {
    icon: "\ud83c\udf3f",
    title: "Zero qu\u00edmicos agressivos",
    desc: "A prensagem bot\u00e2nica n\u00e3o utiliza solventes, resinas nem subst\u00e2ncias sint\u00e9ticas. O processo combina press\u00e3o, calor controlado e tempo, com recurso a desidratadores e, em alguns casos, microondas para folhagens. Nenhuma subst\u00e2ncia \u00e9 adicionada \u00e0 flor.",
    accent: "#3D6B5E",
  },
  {
    icon: "\ud83d\udd01",
    title: "Embalagem pensada para reutilizar",
    desc: "Tentamos que a maior parte dos elementos da embalagem tenham uma segunda vida, e que o m\u00ednimo de res\u00edduos necess\u00e1rios para o embalamento seja logo descartado. Cada escolha de material come\u00e7a com esta pergunta.",
    accent: "#2D4A3E",
  },
  {
    icon: "\ud83e\udd1d",
    title: "Impacto social integrado",
    desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da Associa\u00e7\u00e3o de Paralisia Cerebral de Coimbra. N\u00e3o \u00e9 uma a\u00e7\u00e3o pontual, \u00e9 parte do nosso modelo de neg\u00f3cio.",
    accent: "#C4846B",
  },
  {
    icon: "\ud83d\udce6",
    title: "O pl\u00e1stico que ainda usamos",
    desc: "Para garantir que o seu quadro chega em perfeitas condi\u00e7\u00f5es, ainda utilizamos enchimento insufl\u00e1vel para proteger o vidro. Atualmente, este \u00e9 o \u00fanico pl\u00e1stico nas nossas embalagens, pois a integridade da sua pe\u00e7a durante o transporte \u00e9 a nossa prioridade. O nosso compromisso mant\u00e9m-se: estamos ativamente a testar e a procurar alternativas 100% sustent\u00e1veis que garantam a mesma seguran\u00e7a.",
    accent: "#9BA89F",
  },
  {
    icon: "\ud83e\ude9f",
    title: "Vidro Museu UltraVue\u00ae UV70",
    desc: "O mesmo vidro utilizado em museus e galerias. Filtra 70% dos raios UV e elimina reflexos, garantindo que as cores se mant\u00eam vivas durante d\u00e9cadas.",
    accent: "#B8954A",
  },
];

const Dot = ({ good, color }) => (
  <div style={{ flexShrink: 0, marginTop: "3px" }}>
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill={`${color}18`}/>
      {good
        ? <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M7 7l6 6M13 7l-6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      }
    </svg>
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
            --green:   #2D4A3E;
            --green-m: #3D6B5E;
            --green-d: #1E2D2A;
            --terra:   #C4846B;
            --gold:    #B8954A;
            --cream:   #FAF7F0;
          }
          .eyebrow {
            display: block; font-size: 0.58rem; font-weight: 700;
            letter-spacing: 3.5px; text-transform: uppercase;
            color: var(--terra); margin-bottom: 12px; font-family: Roboto, sans-serif;
          }
          .eyebrow-green { color: var(--green) !important; }
          .eyebrow-gold  { color: var(--gold)  !important; }
          .text-link {
            color: var(--green); font-weight: 600; text-decoration: none;
            border-bottom: 1px solid rgba(45,74,62,0.3); padding-bottom: 1px;
            transition: border-color 0.2s ease;
          }
          .text-link:hover { border-color: var(--green); }
          .compare-grid {
            display: grid; grid-template-columns: 1fr; gap: 14px;
          }
          @media (min-width: 768px) {
            .compare-grid { grid-template-columns: repeat(3, 1fr); }
          }
          .values-grid {
            display: grid; grid-template-columns: 1fr; gap: 12px;
          }
          @media (min-width: 560px) { .values-grid { grid-template-columns: 1fr 1fr; } }
          @media (min-width: 900px) { .values-grid { grid-template-columns: 1fr 1fr 1fr; } }
          .apcc-inner {
            display: grid; grid-template-columns: 1fr; gap: clamp(28px,4vw,44px);
          }
          .apcc-photo  { order: 2; display: flex; justify-content: center; }
          .apcc-copy   { order: 1; }
          .apcc-topics { order: 3; }
          @media (min-width: 768px) {
            .apcc-inner {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: auto auto;
              column-gap: clamp(48px,6vw,72px);
              row-gap: clamp(20px,3vw,32px);
            }
            .apcc-photo  { order: 1; grid-column: 1; grid-row: 1 / 3; align-self: start; }
            .apcc-copy   { order: 2; grid-column: 2; grid-row: 1; align-self: end; }
            .apcc-topics { order: 3; grid-column: 2; grid-row: 2; align-self: start; }
          }
          .cta-row {
            display: flex; flex-direction: column; align-items: stretch; gap: 12px;
          }
          @media (min-width: 460px) {
            .cta-row { flex-direction: row; justify-content: center; align-items: center; }
          }
          .btn-primary {
            display: inline-flex; align-items: center; justify-content: center;
            background: var(--green); color: var(--cream);
            padding: 15px 34px; border-radius: 100px; text-decoration: none;
            font-weight: 600; font-size: 0.82rem; letter-spacing: 1.4px;
            text-transform: uppercase; text-align: center;
            box-shadow: 0 6px 22px rgba(45,74,62,0.32);
            transition: all 0.3s ease; font-family: Roboto, sans-serif;
          }
          .btn-primary:hover { background: var(--green-d); transform: translateY(-3px); }
          .btn-outline {
            display: inline-flex; align-items: center; justify-content: center;
            border: 2px solid var(--green); color: var(--green);
            padding: 13px 32px; border-radius: 100px; text-decoration: none;
            font-weight: 600; font-size: 0.82rem; letter-spacing: 1.4px;
            text-transform: uppercase; text-align: center;
            transition: all 0.3s ease; font-family: Roboto, sans-serif;
          }
          .btn-outline:hover { background: var(--green); color: var(--cream); transform: translateY(-3px); }
          .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
          .card-hover:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(30,45,42,0.10); }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          }
        `}} />

        {/* HERO */}
        <section
          aria-label="Sustentabilidade e filosofia da Flores a Beira-Rio"
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            minHeight: "560px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/ines1.webp"
            alt="Prensagem botanica artesanal na Flores a Beira-Rio"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(30,45,42,0.45) 0%, rgba(30,45,42,0.65) 60%, rgba(30,45,42,0.80) 100%)",
          }}/>
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #8BA888 0px, #8BA888 1px, transparent 1px, transparent 44px)",
          }}/>
          <div style={{
            position: "relative", zIndex: 1, textAlign: "center",
            padding: "0 clamp(20px,5vw,48px)", maxWidth: "860px", width: "100%",
          }}>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(45,74,62,0.35)", border: "1px solid rgba(139,168,136,0.35)",
                borderRadius: "100px", padding: "7px 16px", marginBottom: "24px",
              }}>
                <span style={{ color: "#8BA888", fontSize: "0.9rem" }} aria-hidden="true">&#9851;</span>
                <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#8BA888", fontFamily: "Roboto, sans-serif" }}>Os nossos valores</span>
              </span>
              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2.8rem,9vw,5.8rem)",
                color: "#FAF7F0", margin: "0 0 clamp(18px,3vw,28px)", lineHeight: 1.0,
              }}>
                Sustentabilidade<br/>
                <em style={{ fontStyle: "italic", color: "#8BA888" }}>sem compromissos</em>
              </h1>
              <p style={{
                color: "rgba(250,247,240,0.82)", fontSize: "clamp(0.95rem,2vw,1.1rem)",
                lineHeight: 1.88, maxWidth: "580px", margin: "0 auto clamp(28px,4vw,40px)",
              }}>
                Na Flores &#224; Beira-Rio, preservar flores significa preservar tamb&#233;m
                o planeta. Sem resinas petroqu&#237;micas, sem s&#237;lica industrial,
                apenas prensagem bot&#226;nica artesanal com materiais de conserva&#231;&#227;o museu.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px,2vw,10px)", alignItems: "center", justifyContent: "center" }}>
                {["Sem resina ep&#243;xi", "Sem s&#237;lica industrial", "Sem qu&#237;micos agressivos", "100% artesanal", "Orgulhosamente de Coimbra"].map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                    style={{
                      display: "inline-block", fontSize: "0.64rem", fontWeight: 700,
                      letterSpacing: "1.5px", textTransform: "uppercase", color: "#8BA888",
                      fontFamily: "Roboto, sans-serif", backgroundColor: "rgba(45,74,62,0.35)",
                      border: "1px solid rgba(139,168,136,0.25)", padding: "6px 14px", borderRadius: "100px",
                    }}
                    dangerouslySetInnerHTML={{ __html: tag }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              position: "absolute", bottom: "32px", left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(250,247,240,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* FILOSOFIA */}
        <section
          aria-label="A nossa filosofia de preservacao sustentavel"
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)",
          }}
        >
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <span className="eyebrow eyebrow-green">A nossa filosofia</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.9rem,4.5vw,3.2rem)",
                color: "#1E2D2A", margin: "0 0 clamp(18px,3vw,24px)", lineHeight: 1.1,
              }}>
                Artesanal. Natural. Local.<br/>
                <em style={{ fontStyle: "italic", color: "#2D4A3E" }}>Para durar d&#233;cadas.</em>
              </h2>
              <div style={{ color: "#5A6B60", fontSize: "clamp(0.95rem,1.8vw,1.05rem)", lineHeight: 1.88 }}>
                <p style={{ margin: "0 0 16px" }}>
                  Quando recebemos as flores de um momento marcante, a responsabilidade n&#227;o
                  &#233; s&#243; art&#237;stica, &#233; tamb&#233;m ambiental.
                </p>
                <p style={{ margin: 0 }}>
                  Por isso escolhemos, e continuaremos a escolher, a prensagem bot&#226;nica
                  artesanal como m&#233;todo exclusivo de trabalho. &#201; uma t&#233;cnica mais lenta e
                  mais exigente, mas os resultados falam por si: beleza natural, longevidade,
                  e um processo que respeita a integridade da flor e do planeta.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPARACAO */}
        <section
          aria-label="Comparacao entre prensagem botanica, resina epoxi e gel de silica"
          style={{ padding: "clamp(48px,7vw,76px) clamp(20px,5vw,48px)", backgroundColor: "#FAF7F0" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,44px)" }}
            >
              <span className="eyebrow">Compara&#231;&#227;o de t&#233;cnicas</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                color: "#1E2D2A", margin: "0 0 10px", lineHeight: 1.1,
              }}>
                Prensagem, resina<br/>
                <em style={{ fontStyle: "italic", color: "#2D4A3E" }}>e s&#237;lica</em>
              </h2>
              <p style={{ color: "#5A6B60", fontSize: "clamp(0.88rem,1.7vw,0.96rem)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto" }}>
                Os tr&#234;s m&#233;todos mais populares para eternizar flores. Eis porque escolhemos a prensagem.
              </p>
            </motion.div>
            <div className="compare-grid">
              {METHODS.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.65 }}
                  className="card-hover"
                  style={{
                    backgroundColor: m.bg, borderRadius: "18px",
                    padding: "clamp(20px,2.8vw,28px)",
                    border: `1.5px solid ${m.border}`,
                    boxShadow: m.shadow, position: "relative", overflow: "hidden",
                  }}
                >
                  {m.highlight && (
                    <div aria-hidden="true" style={{
                      position: "absolute", top: 0, right: 0, width: "70px", height: "70px",
                      background: "radial-gradient(circle at top right, rgba(45,74,62,0.07) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}/>
                  )}
                  <span style={{
                    display: "inline-block", fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "2px", textTransform: "uppercase", color: m.tagColor,
                    fontFamily: "Roboto, sans-serif", backgroundColor: `${m.tagColor}12`,
                    padding: "3px 11px", borderRadius: "50px", marginBottom: "12px",
                  }}>{m.tag}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "4px" }}>
                    {m.icon}
                    <h3 style={{
                      fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.15rem",
                      color: "#1E2D2A", margin: 0, lineHeight: 1.2,
                    }}>{m.title}</h3>
                  </div>
                  <p style={{
                    color: "#9BA89F", fontSize: "0.74rem", margin: "0 0 16px",
                    fontStyle: "italic", fontFamily: "Roboto, sans-serif",
                  }}>{m.subtitle}</p>
                  <div style={{ marginBottom: "16px" }}>
                    {m.points.map((pt, j) => (
                      <div key={j} style={{
                        display: "flex", gap: "10px", alignItems: "flex-start", padding: "7px 0",
                        borderBottom: j < m.points.length - 1 ? "1px solid rgba(0,0,0,0.045)" : "none",
                      }}>
                        <Dot good={pt.good} color={m.tagColor} />
                        <p style={{ margin: 0, fontSize: "clamp(0.8rem,1.4vw,0.86rem)", color: "#5A6B60", lineHeight: 1.6 }}>{pt.text}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    padding: "11px 14px", borderRadius: "10px",
                    backgroundColor: `${m.tagColor}0D`, border: `1px solid ${m.tagColor}1A`,
                  }}>
                    <p style={{
                      color: m.verdictColor, fontSize: "0.8rem", fontWeight: 600,
                      lineHeight: 1.5, margin: 0, fontFamily: "Roboto, sans-serif", fontStyle: "italic",
                    }}>{m.verdict}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* APCC */}
        <section
          aria-label="Embalagem artesanal em parceria com a Associacao de Paralisia Cerebral de Coimbra"
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(155deg, #1A2E26 0%, #243D33 45%, #1E2D2A 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #3D6B5E 0px, #3D6B5E 1px, transparent 1px, transparent 50px)",
          }}/>
          <div style={{ maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="apcc-inner">
              <motion.div
                className="apcc-photo"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ position: "relative", maxWidth: "340px", width: "100%" }}>
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0,
                    transform: "translate(10px, 10px) rotate(1.5deg)",
                    borderRadius: "18px", background: "rgba(45,74,62,0.2)",
                    border: "1px solid rgba(61,107,94,0.2)",
                  }}/>
                  <div style={{
                    position: "relative", transform: "rotate(-1.5deg)", borderRadius: "18px",
                    overflow: "hidden", border: "1px solid rgba(61,107,94,0.3)",
                    aspectRatio: "3/4", boxShadow: "0 24px 52px rgba(0,0,0,0.4)",
                  }}>
                    <img
                      src="/oficinaapcc.webp"
                      alt="Utentes da Oficina de Tecelagem de Almalaques e Costura da Associacao de Paralisia Cerebral de Coimbra a produzir as embalagens artesanais para a Flores a Beira-Rio"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      loading="lazy"
                    />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                      background: "linear-gradient(to top, rgba(26,46,38,0.95) 0%, transparent 100%)",
                    }} aria-hidden="true"/>
                    <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#FAF7F0",
                          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                        }}>
                          <img src="/apcc.webp" alt="Logotipo Associacao de Paralisia Cerebral de Coimbra" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: "#FAF7F0", fontSize: "0.68rem", fontFamily: "Roboto, sans-serif", lineHeight: 1.3 }}>
                            Associa&#231;&#227;o de Paralisia Cerebral de Coimbra
                          </p>
                          <p style={{ margin: "2px 0 0", color: "#8BA888", fontSize: "0.6rem", fontFamily: "Roboto, sans-serif" }}>Marca M&#227;o Doida</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="apcc-copy"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(45,74,62,0.35)", border: "1px solid rgba(139,168,136,0.3)",
                  borderRadius: "100px", padding: "7px 16px", marginBottom: "20px",
                }}>
                  <span style={{ color: "#8BA888", fontSize: "0.9rem" }} aria-hidden="true">&#9829;</span>
                  <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#8BA888", fontFamily: "Roboto, sans-serif" }}>Parceria solid&#225;ria</span>
                </div>
                <h2 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "clamp(2rem,4.5vw,3rem)",
                  color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1,
                }}>
                  A embalagem que<br/>
                  <em style={{ fontStyle: "italic", color: "#8BA888" }}>conta uma hist&#243;ria</em>
                </h2>
                <p style={{ color: "rgba(250,247,240,0.7)", lineHeight: 1.85, fontSize: "clamp(0.9rem,1.8vw,0.98rem)", margin: 0 }}>
                  Parte da embalagem que protege o seu quadro &#233; feita &#224; m&#227;o pelos utentes da
                  Oficina de Tecelagem de Almalaqu&#234;s e Costura da Associa&#231;&#227;o de Paralisia Cerebral
                  de Coimbra, sob a marca M&#227;o Doida.
                </p>
              </motion.div>
              <motion.div
                className="apcc-topics"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {[
                  { icon: "\ud83e\udd1d", title: "Impacto direto e cont\u00ednuo", desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da Associa\u00e7\u00e3o de Paralisia Cerebral de Coimbra. N\u00e3o \u00e9 uma a\u00e7\u00e3o pontual, \u00e9 parte do nosso modelo de neg\u00f3cio." },
                  { icon: "\u267b\ufe0f", title: "Pensado para reutilizar", desc: "O saco protege o quadro e pode depois ser usado para guardar roupa, coisas de praia, o que couber." },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0",
                    borderBottom: i === 0 ? "1px solid rgba(250,247,240,0.07)" : "none",
                  }}>
                    <span style={{ fontSize: "1rem", marginTop: "2px", flexShrink: 0 }} aria-hidden="true">{item.icon}</span>
                    <div>
                      <p style={{ margin: "0 0 3px", fontWeight: 700, color: "#FAF7F0", fontSize: "0.86rem", fontFamily: "Roboto, sans-serif" }}>{item.title}</p>
                      <p style={{ margin: 0, color: "rgba(250,247,240,0.55)", fontSize: "0.82rem", lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section
          aria-label="Os valores e materiais da Flores a Beira-Rio"
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(180deg, #FAF7F0 0%, #EDF2E8 100%)",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,44px)" }}
            >
              <span className="eyebrow eyebrow-gold">Da flor ao quadro</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                color: "#1E2D2A", margin: 0, lineHeight: 1.1,
              }}>
                O que torna cada pe&#231;a<br/>
                <em style={{ fontStyle: "italic", color: "#2D4A3E" }}>verdadeiramente sustent&#225;vel</em>
              </h2>
            </motion.div>
            <div className="values-grid">
              {VALUES.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  className="card-hover"
                  style={{
                    backgroundColor: "#fff", borderRadius: "16px",
                    padding: "clamp(18px,2.5vw,24px)",
                    border: "1px solid rgba(45,74,62,0.08)",
                    boxShadow: "0 3px 14px rgba(30,45,42,0.05)",
                  }}
                >
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "12px",
                    backgroundColor: `${v.accent}12`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.2rem", marginBottom: "13px",
                  }} aria-hidden="true">{v.icon}</div>
                  <h3 style={{
                    fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.98rem",
                    color: "#1E2D2A", margin: "0 0 7px", lineHeight: 1.25,
                  }}>{v.title}</h3>
                  <p style={{ color: "#5A6B60", fontSize: "0.84rem", lineHeight: 1.72, margin: 0 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-label="Reservar preservacao sustentavel de flores"
          style={{
            padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)",
            background: "linear-gradient(140deg, #EDF2E8 0%, #FAF7F0 55%, #F0EBE0 100%)",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            style={{ maxWidth: "560px", margin: "0 auto" }}
          >
            <div aria-hidden="true" style={{
              width: "44px", height: "1px", margin: "0 auto 28px",
              background: "linear-gradient(to right, transparent, #2D4A3E, transparent)",
            }}/>
            <span className="eyebrow eyebrow-green">Pronta para come&#231;ar?</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2rem,5.5vw,3.5rem)",
              color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1,
            }}>
              Flores que duram<br/>
              <em style={{ fontStyle: "italic", color: "#2D4A3E" }}>porque o planeta tamb&#233;m importa</em>
            </h2>
            <p style={{ color: "#5A6B60", lineHeight: 1.88, fontSize: "clamp(0.9rem,2vw,1rem)", margin: "0 0 34px" }}>
              Sem resina, sem s&#237;lica, sem compromissos com o ambiente.
              Apenas flores, artesanato bot&#226;nico e materiais de museu,
              feitos para durar d&#233;cadas.
            </p>
            <div className="cta-row" style={{ marginBottom: "28px" }}>
              <a href={FORM} target="_blank" rel="noopener noreferrer" className="btn-primary">Reservar a Minha Data</a>
              <a href="/como-funciona" className="btn-outline">Ver Como Funciona</a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.82rem" }}>
              {[
                { href: "/opcoes-e-precos",      label: "Ver pre\u00e7os" },
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
