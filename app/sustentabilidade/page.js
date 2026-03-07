"use client";

import { motion } from "framer-motion";

const Schema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Preservação Botânica Sustentável — Flores à Beira-Rio",
        "description": "A filosofia de sustentabilidade da Flores à Beira-Rio: prensagem botânica artesanal, materiais de qualidade museu e parceria solidária com a APCC Coimbra.",
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

// ─── Dados ────────────────────────────────────────────────────────────────────

const METHODS = [
  {
    id:        "prensagem",
    tag:       "O que fazemos",
    tagColor:  "#3D6B5E",
    border:    "rgba(61,107,94,0.22)",
    bg:        "#fff",
    shadow:    "0 8px 32px rgba(61,107,94,0.10)",
    title:     "Prensagem Botânica",
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
      { good: true,  text: "100% natural, sem solventes, sem emissões." },
      { good: true,  text: "Flores mantêm a sua essência real e orgânica." },
      { good: true,  text: "Não há exposição a produtos químicos perigosos." },
      { good: true,  text: "Processo 100% mecânico. Não gera resíduos tóxicos." },
      { good: true,  text: "Materiais biodegradáveis no fim de vida útil." },
    ],
    verdict:      "A escolha mais sustentável, mais duradoura e mais cuidadosa para as flores e para o planeta.",
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
    title:     "Resina Epóxi",
    subtitle:  "Plástico petroquímico encapsulado.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 22 L10 6 L14 10 L18 6 L20 22 Z"
          stroke="#C4846B" strokeWidth="1.6" fill="rgba(196,132,107,0.1)" strokeLinejoin="round"/>
        <path d="M8 22 L20 22" stroke="#C4846B" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    points: [
      { good: false, text: "Polímero sintético derivado do petróleo, não biodegradável." },
      { good: false, text: "Liberta COVs tóxicos durante a cura e produção." },
      { good: false, text: "Permanece no ambiente durante centenas de anos." },
      { good: false, text: "Difícil ou impossível de restaurar se danificado." },
      { good: false, text: "Exige EPI rigoroso: máscara com filtro de vapores químicos, luvas de nitrilo e óculos de proteção." },
    ],
    verdict:      "Nociva para a saúde e para o ambiente.",
    verdictColor: "#C4846B",
    highlight:    false,
  },
  {
    id:        "silica",
    tag:       "Preservação 3D",
    tagColor:  "#9BA89F",
    border:    "rgba(155,168,159,0.18)",
    bg:        "rgba(155,168,159,0.03)",
    shadow:    "none",
    title:     "Gel de Sílica",
    subtitle:  "Industrial. Frágil. Exigente.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="#9BA89F" strokeWidth="1.6" fill="rgba(155,168,159,0.08)"/>
        <circle cx="14" cy="14" r="2" fill="#9BA89F" opacity="0.4"/>
      </svg>
    ),
    points: [
      { good: false, text: "Produção industrial com elevado consumo energético." },
      { good: false, text: "Versões com cloreto de cobalto são tóxicas para a vida aquática." },
      { good: false, text: "Exige o uso de máscara durante o manuseio." },
      { good: false, text: "Perdem cor rapidamente sem proteção UV adequada." },
      { good: false, text: "A secagem ao ar livre é uma alternativa, mas não preserva as cores originais. Por isso não a consideramos um método de preservação profissional." },
    ],
    verdict:      "Tecnicamente interessante, ecologicamente questionável.",
    verdictColor: "#9BA89F",
    highlight:    false,
  },
];

const VALUES = [
  {
    icon: "🌲",
    title: "Emolduramento local",
    desc: "Os quadros são emoldurados numa molduraria local portuguesa, com madeira e materiais lacados de alta qualidade. Cada moldura é produzida à medida para a peça que vai receber.",
    accent: "#3D6B5E",
  },
  {
    icon: "🎨",
    title: "Arte local em cada detalhe",
    desc: "Apoiamos artistas portugueses locais que criaram os elementos gráficos da nossa marca, incluindo o cartão que acompanha as embalagens e o vale presente.",
    accent: "#3D6B5E",
  },
  {
    icon: "🌿",
    title: "Zero químicos agressivos",
    desc: "A prensagem botânica é puramente mecânica: pressão, temperatura controlada e tempo. Sem solventes, sem resinas, sem substâncias que comprometam a flor ou o ambiente.",
    accent: "#8BA888",
  },
  {
    icon: "🔁",
    title: "Embalagem pensada para reutilizar",
    desc: "Todos os elementos da embalagem foram pensados para ter uma segunda vida. Do saco artesanal ao cartão, nada é feito para ser deitado fora.",
    accent: "#3D6B5E",
  },
  {
    icon: "🤝",
    title: "Impacto social integrado",
    desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da Associação de Paralisia Cerebral de Coimbra. Não é uma ação pontual, é parte do nosso modelo de negócio.",
    accent: "#C4846B",
  },
  {
    icon: "📦",
    title: "O único plástico que não conseguimos evitar",
    desc: "Quando os quadros são enviados por correio, usamos enchimento insuflável para proteger o vidro durante o transporte. A segurança da peça tem de vir primeiro. Estamos ativamente à procura de alternativas sustentáveis para esta situação.",
    accent: "#9BA89F",
  },
  {
    icon: "🪟",
    title: "Vidro Museu UltraVue® UV70",
    desc: "O mesmo vidro utilizado em museus e galerias. Filtra 70% dos raios UV e elimina reflexos, garantindo que as cores se mantêm vivas durante décadas.",
    accent: "#B8954A",
  },
];

// ─── Sub-componentes ──────────────────────────────────────────────────────────

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

// ─── Página ───────────────────────────────────────────────────────────────────

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
          .values-grid {
            display: grid; grid-template-columns: 1fr; gap: 12px;
          }
          @media (min-width: 560px) { .values-grid { grid-template-columns: 1fr 1fr; } }
          @media (min-width: 900px) { .values-grid { grid-template-columns: 1fr 1fr 1fr; } }
          .apcc-split {
            display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center;
          }
          @media (min-width: 768px) { .apcc-split { grid-template-columns: 1fr 1fr; gap: 72px; } }
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
            box-shadow: 0 6px 22px rgba(61,107,94,0.28);
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

        {/* ══════ HERO ══════ */}
        <section
          aria-label="Sustentabilidade e filosofia da Flores à Beira-Rio"
          style={{
            paddingTop:    "clamp(120px,18vw,200px)",
            paddingBottom: "clamp(60px,10vw,100px)",
            paddingLeft:   "clamp(20px,5vw,48px)",
            paddingRight:  "clamp(20px,5vw,48px)",
            background:    "linear-gradient(168deg, #1E2D2A 0%, #2D4A3E 45%, #1E2D2A 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #8BA888 0px, #8BA888 1px, transparent 1px, transparent 44px)",
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
                background: "rgba(139,168,136,0.12)", border: "1px solid rgba(139,168,136,0.25)",
                borderRadius: "100px", padding: "7px 16px", marginBottom: "24px",
              }}>
                <span style={{ color: "#8BA888", fontSize: "0.9rem" }} aria-hidden="true">♻</span>
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
                color: "rgba(250,247,240,0.7)", fontSize: "clamp(0.95rem,2vw,1.1rem)",
                lineHeight: 1.88, maxWidth: "580px", margin: "0 0 clamp(28px,4vw,40px)",
              }}>
                Na Flores à Beira-Rio, preservar flores significa preservar também
                o planeta. Sem resinas petroquímicas, sem sílica industrial,
                apenas prensagem botânica artesanal com materiais de conservação museu.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px,2vw,14px)", alignItems: "center" }}>
                {["Sem resina epóxi", "Sem sílica industrial", "Sem químicos agressivos", "100% artesanal", "Orgulhosamente de Coimbra"].map((tag, i) => (
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
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>Para durar décadas.</em>
              </h2>
              <div style={{ color: "#5A6B60", fontSize: "clamp(0.95rem,1.8vw,1.05rem)", lineHeight: 1.88 }}>
                <p style={{ margin: "0 0 16px" }}>
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
          style={{ padding: "clamp(48px,7vw,76px) clamp(20px,5vw,48px)", backgroundColor: "#FAF7F0" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,44px)" }}
            >
              <span className="eyebrow">Comparação de técnicas</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                color: "#1E2D2A", margin: "0 0 10px", lineHeight: 1.1,
              }}>
                Prensagem, resina<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>e sílica</em>
              </h2>
              <p style={{ color: "#5A6B60", fontSize: "clamp(0.88rem,1.7vw,0.96rem)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto" }}>
                Os três métodos mais populares para eternizar flores. Eis porque escolhemos a prensagem.
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
                      background: "radial-gradient(circle at top right, rgba(61,107,94,0.07) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}/>
                  )}

                  {/* Cabeçalho */}
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

                  {/* Tópicos */}
                  <div style={{ marginBottom: "16px" }}>
                    {m.points.map((pt, j) => (
                      <div key={j} style={{
                        display: "flex", gap: "10px", alignItems: "flex-start",
                        padding: "7px 0",
                        borderBottom: j < m.points.length - 1 ? "1px solid rgba(0,0,0,0.045)" : "none",
                      }}>
                        <Dot good={pt.good} color={m.tagColor} />
                        <p style={{ margin: 0, fontSize: "clamp(0.8rem,1.4vw,0.86rem)", color: "#5A6B60", lineHeight: 1.6 }}>
                          {pt.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Conclusão */}
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

        {/* ══════ APCC ══════ */}
        <section
          aria-label="Embalagem artesanal em parceria com a APCC Coimbra"
          style={{
            padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)",
            background: "linear-gradient(155deg, #2D1F14 0%, #3A2A1C 45%, #1E2D2A 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(45deg, #B8954A 0px, #B8954A 1px, transparent 1px, transparent 50px)",
          }}/>

          <div style={{ maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="apcc-split">

              {/* Foto */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ position: "relative", maxWidth: "340px", width: "100%" }}>
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0,
                    transform: "translate(10px, 10px) rotate(1.5deg)",
                    borderRadius: "18px", background: "rgba(184,149,74,0.1)",
                    border: "1px solid rgba(184,149,74,0.15)",
                  }}/>
                  <div style={{
                    position: "relative", transform: "rotate(-1.5deg)", borderRadius: "18px",
                    overflow: "hidden", border: "1px solid rgba(184,149,74,0.2)",
                    aspectRatio: "3/4", boxShadow: "0 24px 52px rgba(0,0,0,0.4)",
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
                    <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#FAF7F0",
                          flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                        }}>
                          <img src="/apcc.webp" alt="Logótipo APCC Coimbra" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: "#FAF7F0", fontSize: "0.7rem", fontFamily: "Roboto, sans-serif" }}>Associação de Paralisia Cerebral de Coimbra</p>
                          <p style={{ margin: "1px 0 0", color: "#B8954A", fontSize: "0.6rem", fontFamily: "Roboto, sans-serif" }}>Marca Mão Doida</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Texto */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
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

                <h2 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "clamp(2rem,4.5vw,3rem)",
                  color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1,
                }}>
                  A embalagem que<br/>
                  <em style={{ fontStyle: "italic", color: "#B8954A" }}>conta uma história</em>
                </h2>

                <p style={{ color: "rgba(250,247,240,0.7)", lineHeight: 1.85, fontSize: "clamp(0.9rem,1.8vw,0.98rem)", margin: "0 0 20px" }}>
                  Parte da embalagem que protege o seu quadro é feita à mão pelos utentes da
                  Oficina de Tecelagem de Almalaguês e Costura da Associação de Paralisia Cerebral de Coimbra, sob a marca Mão Doida.
                </p>

                {[
                  { icon: "🤝", title: "Impacto direto e contínuo", desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da Associação de Paralisia Cerebral de Coimbra." },
                  { icon: "♻️", title: "Pensado para reutilizar", desc: "O saco protege o quadro e pode depois ser usado para guardar roupa, coisas de praia, o que couber." },
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

        {/* ══════ VALORES + MATERIAIS ══════ */}
        <section
          aria-label="Os valores e materiais da Flores à Beira-Rio"
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
                O que torna cada peça<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>verdadeiramente sustentável</em>
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
                    border: "1px solid rgba(61,107,94,0.08)",
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

        {/* ══════ CTA ══════ */}
        <section
          aria-label="Reservar preservação sustentável de flores"
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
              background: "linear-gradient(to right, transparent, #3D6B5E, transparent)",
            }}/>
            <span className="eyebrow eyebrow-green">Pronta para começar?</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2rem,5.5vw,3.5rem)",
              color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1,
            }}>
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
