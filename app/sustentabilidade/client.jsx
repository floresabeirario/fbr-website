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
    tagColor:  "#3D6B5E",
    border:    "rgba(61,107,94,0.22)",
    bg:        "#fff",
    shadow:    "0 8px 32px rgba(61,107,94,0.10)",
    title:     "Prensagem Bot\u00e2nica",
    subtitle:  "Artesanal. Natural.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4 C9 4 5 8 5 13 C5 20 14 26 14 26 C14 26 23 20 23 13 C23 8 19 4 14 4Z"
          stroke="#3D6B5E" strokeWidth="1.6" fill="rgba(61,107,94,0.12)" strokeLinejoin="round"/>
        <path d="M14 26 L14 13 M14 13 C10 11 8 8 9 5 M14 13 C18 11 20 8 19 5"
          stroke="#3D6B5E" strokeWidth="1.2" strokeLinecap="round"/>
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
    verdictColor: "#3D6B5E",
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
    subtitle:  "Industrial.",
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
      { good: false, text: "A secagem ao ar livre \u00e9 uma alternativa, mas n\u00e3o preserva as cores originais, pelo que n\u00e3o a consideramos um m\u00e9todo de preserva\u00e7\u00e3o compar\u00e1vel aos m\u00e9todos profissionais." },
    ],
    verdict:      "Tecnicamente interessante, ecologicamente question\u00e1vel.",
    verdictColor: "#9BA89F",
    highlight:    false,
  },
];

const VALUES = [
  {
    title: "Emolduramento local",
    desc: "Os quadros s\u00e3o emoldurados numa molduraria local portuguesa, com madeira e materiais lacados de alta qualidade. Cada moldura \u00e9 produzida \u00e0 medida para a pe\u00e7a que vai receber.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#3D6B5E" strokeWidth="1.8" fill="rgba(61,107,94,0.1)"/>
        <rect x="7" y="7" width="10" height="10" rx="1" stroke="#8BA888" strokeWidth="1.2"/>
        <circle cx="12" cy="12" r="2" fill="#3D6B5E"/>
      </svg>
    ),
  },
  {
    title: "Arte local em cada detalhe",
    desc: "Apoiamos artistas portugueses locais que criaram os elementos gr\u00e1ficos da nossa marca, incluindo o cart\u00e3o que acompanha as embalagens e o vale presente.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2Z" stroke="#3D6B5E" strokeWidth="1.6" fill="rgba(61,107,94,0.18)"/>
        <path d="M12 22 L12 9" stroke="#8BA888" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M12 9 C9 7.5 7.5 5 8 3 M12 9 C15 7.5 16.5 5 16 3" stroke="#3D6B5E" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Zero qu\u00edmicos agressivos",
    desc: "A prensagem bot\u00e2nica n\u00e3o utiliza solventes, resinas nem subst\u00e2ncias sint\u00e9ticas. O processo combina press\u00e3o, calor controlado e tempo. Nenhuma subst\u00e2ncia \u00e9 adicionada \u00e0 flor.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 L14.5 8.5 L20.5 9.3 L16.2 13.5 L17.3 19.5 L12 16.7 L6.7 19.5 L7.8 13.5 L3.5 9.3 L9.5 8.5 Z" stroke="#3D6B5E" strokeWidth="1.6" fill="rgba(61,107,94,0.22)" strokeLinejoin="round"/>
        <path d="M12 7 L13.5 10.5 L17 11 L14.5 13.4 L15.2 17 L12 15.2 L8.8 17 L9.5 13.4 L7 11 L10.5 10.5 Z" fill="#3D6B5E" opacity="0.35"/>
      </svg>
    ),
  },
  {
    title: "Embalagem pensada para reutilizar",
    desc: "Tentamos que a maior parte dos elementos da embalagem tenham uma segunda vida, e que o m\u00ednimo de res\u00edduos necess\u00e1rios para o embalamento seja logo descartado.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12 C4 8 7 5 11 5 L13 5" stroke="#3D6B5E" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 3 L13 5 L11 7" stroke="#3D6B5E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(61,107,94,0.3)"/>
        <path d="M20 12 C20 16 17 19 13 19 L11 19" stroke="#8BA888" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 21 L11 19 L13 17" stroke="#8BA888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(139,168,136,0.3)"/>
      </svg>
    ),
  },
  {
    title: "Impacto social integrado",
    desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da Associa\u00e7\u00e3o de Paralisia Cerebral de Coimbra. N\u00e3o \u00e9 uma a\u00e7\u00e3o pontual, \u00e9 parte do nosso modelo de neg\u00f3cio.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21 V19 C17 17.9 16.1 17 15 17 H9 C7.9 17 7 17.9 7 19 V21" stroke="#3D6B5E" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="12" cy="10" r="3" stroke="#3D6B5E" strokeWidth="1.6" fill="rgba(61,107,94,0.15)"/>
        <path d="M21 21 V19 C21 17.9 20.1 17 19 17 H18" stroke="#8BA888" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M3 21 V19 C3 17.9 3.9 17 5 17 H6" stroke="#8BA888" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="19" cy="10" r="2" stroke="#8BA888" strokeWidth="1.4" fill="rgba(139,168,136,0.1)"/>
        <circle cx="5" cy="10" r="2" stroke="#8BA888" strokeWidth="1.4" fill="rgba(139,168,136,0.1)"/>
      </svg>
    ),
  },
  {
    title: "O pl\u00e1stico que ainda usamos",
    desc: "Para garantir que o seu quadro chega em perfeitas condi\u00e7\u00f5es, ainda utilizamos enchimento insufl\u00e1vel para proteger o vidro. Estamos ativamente a testar alternativas 100% sustent\u00e1veis.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#9BA89F" strokeWidth="1.6" fill="rgba(155,168,159,0.12)"/>
        <path d="M12 8 L12 12 L15 15" stroke="#9BA89F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1.5" fill="#9BA89F"/>
      </svg>
    ),
  },
  {
    title: "Vidro Museu UltraVue\u00ae UV70",
    desc: "O mesmo vidro utilizado em museus e galerias. Filtra 70% dos raios UV e elimina reflexos, garantindo que as cores se mant\u00eam vivas durante d\u00e9cadas.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="#3D6B5E" strokeWidth="1.8" fill="rgba(61,107,94,0.14)"/>
        <path d="M4 9 L20 9" stroke="#8BA888" strokeWidth="1" opacity="0.5"/>
        <path d="M4 15 L20 15" stroke="#8BA888" strokeWidth="1" opacity="0.5"/>
        <path d="M9 4 L9 20" stroke="#8BA888" strokeWidth="1" opacity="0.5"/>
        <path d="M15 4 L15 20" stroke="#8BA888" strokeWidth="1" opacity="0.5"/>
        <path d="M6 6 L10 10" stroke="#FAF7F0" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
        <circle cx="7" cy="7" r="1" fill="#8BA888" opacity="0.8"/>
      </svg>
    ),
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
            --green:   #3D6B5E;
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
            border-bottom: 1px solid rgba(61,107,94,0.3); padding-bottom: 1px;
            transition: border-color 0.2s ease;
          }
          .text-link:hover { border-color: var(--green); }
          .compare-grid {
            display: grid; grid-template-columns: 1fr; gap: 14px;
          }
          @media (min-width: 768px) {
            .compare-grid { grid-template-columns: repeat(3, 1fr); }
          }
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
            box-shadow: 0 6px 22px rgba(61,107,94,0.32);
            transition: all 0.3s ease; font-family: Roboto, sans-serif;
          }
          .btn-primary:hover { background: var(--green-d); transform: translateY(-3px); }
          .btn-outline {
            display: inline-flex; align-items: center; justify-content: center;
            border: 2px solid rgba(139,168,136,0.5); color: #8BA888;
            padding: 13px 32px; border-radius: 100px; text-decoration: none;
            font-weight: 600; font-size: 0.82rem; letter-spacing: 1.4px;
            text-transform: uppercase; text-align: center;
            transition: all 0.3s ease; font-family: Roboto, sans-serif; background: transparent;
          }
          .btn-outline:hover { background: var(--green); color: var(--cream); border-color: var(--green); transform: translateY(-3px); }
          .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
          .card-hover:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(30,45,42,0.10); }

          /* VALUES GRID */
          .values-grid-wrap {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1px;
            background: rgba(61,107,94,0.15);
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(61,107,94,0.15);
          }
          @media (min-width: 600px) {
            .values-grid-wrap { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 900px) {
            .values-grid-wrap { grid-template-columns: repeat(3, 1fr); }
            /* 7 items = 2 rows of 3 + 1 last. Make last item span all 3 cols */
            .values-grid-wrap > *:last-child { grid-column: 1 / -1; max-width: 380px; margin: 0 auto; width: 100%; }
          }

          /* HERO */
          .hero-sustentabilidade {
            position: relative;
            min-height: 100svh;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
          }
          .hero-foto-bg {
            position: absolute; inset: 0;
          }
          .hero-foto-bg img {
            width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;
          }
          .hero-foto-bg::after {
            content: ''; position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(10,22,18,0.90) 0%, rgba(10,22,18,0.55) 45%, rgba(10,22,18,0.18) 100%);
          }
          .hero-text-col {
            position: relative; z-index: 2; width: 100%;
            padding: clamp(110px,14vw,160px) clamp(24px,5vw,72px) clamp(60px,8vw,90px);
          }



          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          }
        `}} />

        {/* HERO — foto a ecra todo, texto na base */}
        <section
          className="hero-sustentabilidade"
          aria-label="Sustentabilidade e filosofia da Flores a Beira-Rio"
        >
          <div className="hero-foto-bg">
            <img src="/ines1.webp" alt="" aria-hidden="true" />
          </div>

          <div className="hero-text-col">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: "640px", textAlign: "center", margin: "0 auto" }}
            >
              <p style={{ fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(250,247,240,0.5)", fontFamily: "Roboto, sans-serif", margin: "0 0 14px", fontWeight: 700 }}>
                Os nossos valores
              </p>
              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2.4rem,6vw,5rem)",
                color: "#FAF7F0", margin: "0 0 clamp(1.2rem,2.5vw,1.8rem)", lineHeight: 1.05, textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 4px 48px rgba(0,0,0,0.35)",
              }}>
                Sustentabilidade<br/>
                <em style={{ fontStyle: "italic", color: "#5C8A6A" }}>sem compromissos</em>
              </h1>
              <p style={{
                fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.85,
                maxWidth: "460px", color: "rgba(250,247,240,0.82)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)", textShadow: "0 1px 14px rgba(0,0,0,0.6)",
              }}>
                Na Flores &#224; Beira-Rio, preservar flores significa preservar tamb&#233;m
                o planeta. Sem resinas petroqu&#237;micas, sem s&#237;lica industrial,
                apenas prensagem bot&#226;nica artesanal com materiais de conserva&#231;&#227;o museu.
              </p>

            </motion.div>
          </div>


        </section>

        {/* FILOSOFIA */}
        <section
          aria-label="A nossa filosofia de preservacao sustentavel"
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(160deg, #EDF2E8 0%, #F5F9F3 40%, #FAF7F0 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: "-80px", right: "-60px",
            width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(61,107,94,0.07) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative", zIndex: 1 }}>
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
                color: "#1E2D2A", margin: "0 0 clamp(18px,3vw,28px)", lineHeight: 1.1,
              }}>
                Artesanal. Natural. Local.<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>Para durar d&#233;cadas.</em>
              </h2>
              <div style={{ color: "#5A6B60", fontSize: "clamp(0.95rem,1.8vw,1.05rem)", lineHeight: 1.88 }}>
                <p style={{ margin: "0 0 16px" }}>
                  Quando recebemos as flores de um momento marcante, <strong style={{ color: "#1E2D2A", fontWeight: 700 }}>a responsabilidade n&#227;o
                  &#233; s&#243; art&#237;stica, &#233; tamb&#233;m ambiental.</strong>
                </p>
                <p style={{ margin: 0 }}>
                  Por isso escolhemos, e continuaremos a escolher, <strong style={{ color: "#1E2D2A", fontWeight: 700 }}>a prensagem bot&#226;nica
                  artesanal como m&#233;todo exclusivo de trabalho.</strong> &#201; uma t&#233;cnica mais lenta e
                  mais exigente, mas os resultados falam por si: <strong style={{ color: "#3D6B5E", fontWeight: 700 }}>beleza natural, longevidade,
                  e um processo que respeita a integridade da flor e do planeta.</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* APCC */}
        <section
          aria-label="Embalagem artesanal em parceria com a Associacao de Paralisia Cerebral de Coimbra"
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(150deg, #1E2D2A 0%, #243D33 40%, #2A4A3C 70%, #1E2D2A 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #3D6B5E 0px, #3D6B5E 1px, transparent 1px, transparent 50px)",
          }}/>
          <div aria-hidden="true" style={{
            position: "absolute", bottom: "-100px", right: "-80px",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(61,107,94,0.12) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
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
                    borderRadius: "18px", background: "rgba(61,107,94,0.15)",
                    border: "1px solid rgba(61,107,94,0.25)",
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
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
                      background: "linear-gradient(to top, rgba(26,46,38,0.96) 0%, transparent 100%)",
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
                  background: "rgba(61,107,94,0.2)", border: "1px solid rgba(139,168,136,0.3)",
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
                  { title: "Impacto direto e cont\u00ednuo", desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da Associa\u00e7\u00e3o de Paralisia Cerebral de Coimbra. N\u00e3o \u00e9 uma a\u00e7\u00e3o pontual, \u00e9 parte do nosso modelo de neg\u00f3cio.",
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21 C12 21 4 14 4 9 C4 6.2 6.2 4 9 4 C10.5 4 11.8 4.7 12 5 C12.2 4.7 13.5 4 15 4 C17.8 4 20 6.2 20 9 C20 14 12 21 12 21Z" stroke="#8BA888" strokeWidth="1.5" fill="rgba(139,168,136,0.1)" strokeLinejoin="round"/></svg> },
                  { title: "Pensado para reutilizar", desc: "O saco protege o quadro e pode depois ser usado para guardar roupa, coisas de praia, o que couber.",
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12 C4 8 7 5 11 5 L13 5" stroke="#8BA888" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 3 L13 5 L11 7" stroke="#8BA888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 12 C20 16 17 19 13 19 L11 19" stroke="#8BA888" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 21 L11 19 L13 17" stroke="#8BA888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "14px", alignItems: "flex-start", padding: "14px 0",
                    borderBottom: i === 0 ? "1px solid rgba(61,107,94,0.2)" : "none",
                  }}>
                    <div style={{
                      width: "30px", height: "30px", borderRadius: "8px",
                      backgroundColor: "rgba(61,107,94,0.2)", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px",
                    }}>{item.icon}</div>
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

        {/* COMPARACAO */}
        <section
          aria-label="Comparacao entre prensagem botanica, resina epoxi e gel de silica"
          style={{
            padding: "clamp(48px,7vw,76px) clamp(20px,5vw,48px)",
            background: "linear-gradient(180deg, #FAF7F0 0%, #F2F6EF 50%, #FAF7F0 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px", height: "700px",
            background: "radial-gradient(circle, rgba(61,107,94,0.04) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
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
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>e s&#237;lica</em>
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
                      position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                      background: "linear-gradient(to right, transparent, #3D6B5E, transparent)",
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

        {/* VALORES */}
        <section
          aria-label="Os valores e materiais da Flores a Beira-Rio"
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(170deg, #1E2D2A 0%, #243D33 50%, #1E2D2A 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "800px", height: "800px",
            background: "radial-gradient(circle, rgba(61,107,94,0.10) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #3D6B5E 0px, #3D6B5E 1px, transparent 1px, transparent 50px)",
          }}/>
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,60px)" }}
            >
              <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#5C8A6A", marginBottom: "12px", fontFamily: "Roboto, sans-serif" }}>Da flor ao quadro</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                color: "#FAF7F0", margin: 0, lineHeight: 1.1,
              }}>
                O que torna cada pe&#231;a<br/>
                <em style={{ fontStyle: "italic", color: "#5C8A6A" }}>verdadeiramente sustent&#225;vel</em>
              </h2>
            </motion.div>

            <div className="values-grid-wrap">
              {VALUES.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.55 }}
                  style={{
                    background: "rgba(26,45,38,0.95)",
                    padding: "clamp(22px,3vw,32px)",
                    position: "relative", overflow: "hidden",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(36,61,51,0.98)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(26,45,38,0.95)"}
                >
                  <div aria-hidden="true" style={{
                    position: "absolute", top: 0, right: 0, width: "60px", height: "60px",
                    background: "radial-gradient(circle at top right, rgba(61,107,94,0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}/>
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: "rgba(61,107,94,0.2)",
                    border: "1px solid rgba(61,107,94,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "14px", flexShrink: 0,
                  }}>
                    {v.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(0.92rem,1.6vw,1.05rem)",
                    color: "#FAF7F0", margin: "0 0 8px", lineHeight: 1.25,
                  }}>{v.title}</h3>
                  <p style={{ color: "rgba(250,247,240,0.55)", fontSize: "0.83rem", lineHeight: 1.72, margin: 0 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-label="Comecar a preservar as tuas flores"
          style={{
            padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)",
            background: "linear-gradient(150deg, #1E2D2A 0%, #243D33 50%, #2A4A3C 100%)",
            textAlign: "center",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #3D6B5E 0px, #3D6B5E 1px, transparent 1px, transparent 44px)",
          }}/>
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(61,107,94,0.15) 0%, transparent 65%)",
            borderRadius: "50%", pointerEvents: "none",
          }}/>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            style={{ maxWidth: "560px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <div aria-hidden="true" style={{
              width: "44px", height: "1px", margin: "0 auto 28px",
              background: "linear-gradient(to right, transparent, #8BA888, transparent)",
            }}/>
            <span className="eyebrow" style={{ color: "#8BA888" }}>Pronto para preservar?</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2rem,5.5vw,3.5rem)",
              color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1,
            }}>
              Reserve a sua data<br/>
              <em style={{ fontStyle: "italic", color: "#5C8A6A" }}>e tratamos do resto</em>
            </h2>
            <p style={{ color: "rgba(250,247,240,0.65)", lineHeight: 1.88, fontSize: "clamp(0.9rem,2vw,1rem)", margin: "0 0 34px" }}>
              Preenche o formul&#225;rio e entramos em contacto para combinar todos os detalhes.
              Tempo de entrega estimado: 4 a 6 semanas ap&#243;s recebermos as flores.
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
                <a key={i} href={l.href} style={{
                  color: "rgba(139,168,136,0.8)", fontWeight: 600, textDecoration: "none",
                  borderBottom: "1px solid rgba(139,168,136,0.25)", paddingBottom: "1px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#8BA888"; e.currentTarget.style.borderColor = "#8BA888"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(139,168,136,0.8)"; e.currentTarget.style.borderColor = "rgba(139,168,136,0.25)"; }}
                >{l.label}</a>
              ))}
            </div>
          </motion.div>
        </section>

      </main>
    </>
  );
}
