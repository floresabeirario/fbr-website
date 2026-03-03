"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
};

function Reveal({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? "show" : "hidden"} transition={{ delay }}
      style={style} className={className}>
      {children}
    </motion.div>
  );
}

function Label({ children, light }) {
  return (
    <p style={{
      fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase",
      color: light ? "rgba(250,247,240,0.5)" : "#B8954A",
      fontFamily: "Roboto, sans-serif", margin: "0 0 20px", fontWeight: 500
    }}>
      {children}
    </p>
  );
}

function Flower({ cx, cy, scale = 1, rotate = 0, opacity = 0.45, dark = false }) {
  const r = dark ? `rgba(15,30,26,${opacity})` : `rgba(250,247,240,${opacity})`;
  const rs = dark ? `rgba(15,30,26,${opacity * 0.7})` : `rgba(250,247,240,${opacity * 0.75})`;
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${rotate}) scale(${scale}) translate(-100, -125)`}>
      <path
        d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
        stroke={r} strokeWidth="1.5" fill="none"
        strokeLinejoin="round" strokeLinecap="round"
      />
      <path
        d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
        stroke={rs} strokeWidth="1" strokeLinecap="round"
      />
      <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)"
        stroke={r} strokeWidth="1.5" fill="none"
      />
    </g>
  );
}

function FrameSVG({ vw, vh, flowers, svgWidth, label, dark = false }) {
  const stroke1 = dark ? "rgba(15,30,26,0.45)" : "rgba(250,247,240,0.55)";
  const stroke2 = dark ? "rgba(15,30,26,0.22)" : "rgba(250,247,240,0.28)";
  const strokeGlass = dark ? "rgba(15,30,26,0.14)" : "rgba(250,247,240,0.18)";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${vw} ${vh}`}
      style={{ width: svgWidth, height: "auto", display: "block" }}
      aria-label={`Ilustração moldura ${label}`}
    >
      <rect x="10" y="10" width={vw - 20} height={vh - 20}
        stroke={stroke1} strokeWidth="2" fill="none" />
      <rect x="18" y="18" width={vw - 36} height={vh - 36}
        stroke={stroke2} strokeWidth="1.2" fill="none" />
      <line x1="32" y1={vh * 0.28} x2={vw * 0.42} y2="28"
        stroke={strokeGlass} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="48" y1={vh * 0.38} x2={vw * 0.56} y2="44"
        stroke={strokeGlass} strokeWidth="1.1" strokeLinecap="round" />
      <line x1={vw - 44} y1={vh - 60} x2={vw - 24} y2={vh - 82}
        stroke={strokeGlass} strokeWidth="1.3" strokeLinecap="round" />
      {flowers.map((f, i) => (
        <Flower key={i} {...f} dark={dark} />
      ))}
    </svg>
  );
}

function OrnamentSVG({ svgWidth, light = false }) {
  const s = light ? "rgba(250,247,240,0.55)" : "rgba(15,30,26,0.45)";
  const s2 = light ? "rgba(250,247,240,0.35)" : "rgba(15,30,26,0.28)";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"
      style={{ width: svgWidth, height: "auto", display: "block" }}
      aria-label="Ilustração ornamento de natal">
      <path d="M 130 -10 Q 165 70 192 145" stroke={s} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 270 -10 Q 235 70 208 145" stroke={s} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 160 -10 Q 185 60 198 135" stroke={s2} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 240 -10 Q 215 60 202 135" stroke={s2} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="200" cy="142" r="8" stroke={s} strokeWidth="2.5" fill="none"/>
      <circle cx="200" cy="280" r="130" stroke={s} strokeWidth="2.5" fill="none"/>
      <circle cx="200" cy="280" r="120" stroke={s2} strokeWidth="1.5" fill="none"/>
      <line x1="120" y1="210" x2="160" y2="170" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="135" y1="235" x2="175" y2="195" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="240" y1="360" x2="280" y2="320" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <g transform="translate(200, 280) scale(1.6) translate(-100, -125)">
        <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
          stroke={s} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
          stroke={s2} strokeWidth="1" strokeLinecap="round"/>
        <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)" stroke={s} strokeWidth="1.5" fill="none"/>
      </g>
    </svg>
  );
}

function PendantSVG({ svgWidth, light = false }) {
  const s = light ? "rgba(250,247,240,0.55)" : "rgba(15,30,26,0.45)";
  const s2 = light ? "rgba(250,247,240,0.35)" : "rgba(15,30,26,0.28)";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"
      style={{ width: svgWidth, height: "auto", display: "block" }}
      aria-label="Ilustração pendente para colar">
      <path d="M 197 186 L 120 0" stroke={s2} strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M 203 186 L 280 0" stroke={s2} strokeWidth="1" fill="none" strokeLinecap="round"/>
      <circle cx="200" cy="193" r="7" stroke={s} strokeWidth="2" fill="none"/>
      <circle cx="200" cy="300" r="100" stroke={s} strokeWidth="2.5" fill="none"/>
      <circle cx="200" cy="300" r="90" stroke={s2} strokeWidth="1.5" fill="none"/>
      <line x1="140" y1="245" x2="170" y2="215" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="155" y1="265" x2="180" y2="240" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="230" y1="360" x2="260" y2="330" stroke={s2} strokeWidth="1.5" strokeLinecap="round"/>
      <g transform="translate(200, 300) scale(1.2) translate(-100, -125)">
        <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
          stroke={s} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
          stroke={s2} strokeWidth="1" strokeLinecap="round"/>
        <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)" stroke={s} strokeWidth="1.5" fill="none"/>
      </g>
    </svg>
  );
}

const frames = [
  {
    size: "30×40", unit: "cm", price: "300",
    desc: "Perfeito para peças mais íntimas ou como elemento de conjunto.",
    vw: 180, vh: 240, svgWidth: "88px",
    flowers: [
      { cx: 90, cy: 120, scale: 0.9, rotate: -8, opacity: 0.45 },
    ],
  },
  {
    size: "40×50", unit: "cm", price: "400",
    desc: "Equilibra presença e elegância.",
    vw: 200, vh: 250, svgWidth: "118px",
    flowers: [
      { cx: 82,  cy: 118, scale: 0.95, rotate: -15, opacity: 0.48 },
      { cx: 128, cy: 142, scale: 0.85, rotate:  12, opacity: 0.38 },
    ],
  },
  {
    size: "50×70", unit: "cm", price: "500",
    desc: "Uma peça de destaque, que domina qualquer parede.",
    vw: 200, vh: 280, svgWidth: "148px",
    flowers: [
      { cx: 100, cy: 90,  scale: 1.0,  rotate: -10, opacity: 0.5  },
      { cx: 62,  cy: 168, scale: 0.82, rotate:  18, opacity: 0.38 },
      { cx: 148, cy: 188, scale: 0.76, rotate: -22, opacity: 0.32 },
    ],
  },
  {
    size: "20×25", unit: "cm", price: "90",
    desc: "Só disponível em conjunto com a compra de um quadro maior.",
    addon: true,
    vw: 160, vh: 200, svgWidth: "62px",
    flowers: [
      { cx: 80, cy: 100, scale: 0.72, rotate: 6, opacity: 0.42 },
    ],
  },
  {
    size: "Ornamento de Natal", unit: "~8 cm", price: "35",
    desc: "Ornamento de Natal com vidro duplo soldado sem chumbo, com prata. Só disponível em conjunto com a compra de um quadro maior.",
    addon: true,
    addonColor: "#6B1F2A",
    badge: "Para oferecer",
    customSvg: "ornament",
    svgWidth: "72px",
  },
  {
    size: "Pendente para Colar", unit: "~3 cm", price: "35",
    desc: "Pendente com vidro duplo soldado sem chumbo, com prata. Só disponível em conjunto com a compra de um quadro maior.",
    addon: true,
    addonColor: "#3A3050",
    badge: "Joalharia",
    customSvg: "pendant",
    svgWidth: "56px",
  },
];

export default function OpcoesClient() {

  // Volta ao topo ao fazer refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: "#FAF7F0", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            backgroundImage: "url('/fotoquadro1.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)"
          }}/>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(15,30,26,0) 0%, rgba(15,30,26,0.2) 35%, rgba(15,30,26,0.75) 100%)"
          }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(80px,12vw,140px) 24px clamp(60px,8vw,90px)" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(250,247,240,0.6)", fontFamily: "Roboto, sans-serif", margin: "0 0 20px", fontWeight: 500 }}>
            O seu bouquet, para sempre
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3.2rem, 11vw, 8rem)", lineHeight: 0.92, margin: "0 0 28px", color: "#FAF7F0", fontWeight: 400, textShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
            Opções<br/>
            <em style={{ color: "#8BA888" }}>&amp; Preços</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.75, color: "rgba(250,247,240,0.75)", maxWidth: "520px", margin: 0 }}>
            Cada quadro é uma peça única, feita à mão em Coimbra.
            Escolha o fundo, o tamanho e os elementos que tornam
            a sua composição verdadeiramente sua.
          </motion.p>
        </div>
      </section>

      {/* TIPOS DE FUNDO */}
      <section style={{ backgroundColor: "#FAF7F0", padding: "clamp(40px,7vw,70px) 0 clamp(50px,8vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px clamp(32px,5vw,48px)" }}>
          <Reveal>
            <Label>Personalização</Label>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: 0, lineHeight: 1.05, color: "#1a1a1a" }}>
              Tipos de Fundo
            </h2>
          </Reveal>
        </div>

        <div style={{ overflowX: "hidden" }}>
          <div className="fundos-track">
            {[
              {
                img: "/quadrovidrosobrevidro.webp",
                alt: "Quadro de flores prensadas em vidro sobre vidro com efeito transparente",
                tag: "Mais popular", tagSolid: true,
                title: "Vidro sobre Vidro",
                desc: "As flores ficam suspensas entre dois vidros, sem fundo opaco. Efeito leve e moderno, ideal para espaços luminosos.",
              },
              {
                img: "/quadrofoto.webp",
                alt: "Quadro de flores prensadas com fotografia personalizada como fundo",
                tag: "Custo adicional", tagSolid: false,
                title: "Fundo com Fotografia",
                desc: "Uma paisagem, um retrato, ou qualquer imagem com significado especial. A fotografia é profissionalmente impressa.",
                note: "O custo varia consoante as dimensões da moldura.",
              },
              {
                img: "/quadropreto.webp",
                alt: "Quadro de flores prensadas com fundo preto ou colorido personalizado",
                tag: null,
                title: "Fundo Colorido",
                desc: "Aplicamos qualquer cor de fundo para realçar as flores. Sugerimos tonalidades que combinem com a paleta do bouquet.",
              },
              {
                img: "/quadrobranco.webp",
                alt: "Quadro de flores prensadas com fundo branco minimalista",
                tag: null,
                title: "Fundo Branco",
                desc: "Minimalista e intemporal. Realça naturalmente as cores e formas das flores com máxima simplicidade.",
              },
            ].map((item, i) => (
              <div key={i} className="fundo-card-new">
                <div style={{ aspectRatio: "4/3", overflow: "hidden", borderRadius: "6px", backgroundColor: "#e0dbd3", position: "relative" }}>
                  <img src={item.img} alt={item.alt} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.9s ease" }}
                    className="fundo-img-new" />
                  {item.tag && (
                    <span style={{
                      position: "absolute", top: "12px", left: "12px",
                      backgroundColor: item.tagSolid ? "#3D6B5E" : "rgba(15,30,26,0.55)",
                      color: "#FAF7F0",
                      fontSize: "0.52rem", letterSpacing: "2px", textTransform: "uppercase",
                      fontFamily: "Roboto, sans-serif", fontWeight: 600,
                      padding: "5px 11px", borderRadius: "100px",
                      backdropFilter: "blur(4px)"
                    }}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <div style={{ padding: "18px 4px 0" }}>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", fontWeight: 400, margin: "0 0 8px", lineHeight: 1.2, color: "#1a1a1a" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.75, color: "rgba(26,26,26,0.58)", margin: 0 }}>
                    {item.desc}
                  </p>
                  {item.note && (
                    <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "0.74rem", color: "rgba(26,26,26,0.36)", margin: "6px 0 0", fontStyle: "italic" }}>
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="slider-hint" aria-live="polite" style={{ color: "rgba(26,26,26,0.28)" }}>deslize para ver mais</p>
      </section>

      {/* PRESENTES PARA OFERECER */}
      <section style={{ backgroundColor: "#F2EDE4", padding: "clamp(36px,5vw,56px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "28px" }}>
              <Label>Para oferecer</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: "0 0 14px", lineHeight: 1.1 }}>
                Presentes com <em style={{ color: "#3D6B5E" }}>memória</em>
              </h2>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(26,26,26,0.55)", maxWidth: "460px", margin: 0 }}>
                Para além do seu quadro principal, pode encomendar peças adicionais. Presentes pessoais e cheios de significado para quem ama.
              </p>
            </div>
          </Reveal>

          <div className="presentes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              {
                img: "/miniquadros.webp",
                alt: "Mini quadros 20x25cm de flores preservadas",
                badge: "Mini quadro", badgeBg: "rgba(61,107,94,0.12)", badgeColor: "#3D6B5E",
                title: "20×25 cm",
                desc: "Uma moldura com as flores do seu bouquet para oferecer a familiares, padrinhos ou damas de honor. Um presente com memória e significado.",
                note: "Só com a compra de um quadro maior.",
              },
              {
                img: "/ornamento1.webp",
                alt: "Ornamento de natal com flores prensadas",
                badge: "Natal", badgeBg: "rgba(107,31,42,0.1)", badgeColor: "#6B1F2A",
                title: "Ornamento de Natal",
                desc: "Para si ou para oferecer — um pedaço do seu dia especial para decorar o Natal de quem ama, ano após ano.",
                note: "Só com a compra de um quadro maior.",
              },
              {
                img: "/pendente1.webp",
                alt: "Pendente floral para colar",
                badge: "Joalharia", badgeBg: "rgba(58,48,80,0.1)", badgeColor: "#3A3050",
                title: "Pendente para Colar",
                desc: "Uma flor do seu bouquet para usar sempre perto do coração. Uma memória que se transforma em joia.",
                note: "Só com a compra de um quadro maior.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 6px 24px rgba(26,26,26,0.08)", backgroundColor: "#FAF7F0" }}>
                  <div style={{ overflow: "hidden" }}>
                    <img src={item.img} alt={item.alt} loading="lazy"
                      style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                      className="presente-img" />
                  </div>
                  <div style={{ padding: "18px 18px 20px" }}>
                    <span style={{ display: "inline-block", backgroundColor: item.badgeBg, color: item.badgeColor, fontSize: "0.5rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", fontWeight: 600, padding: "4px 10px", borderRadius: "100px", marginBottom: "10px" }}>
                      {item.badge}
                    </span>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.1rem", fontWeight: 400, margin: "0 0 8px", color: "#1a1a1a", lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.78rem", lineHeight: 1.6, color: "rgba(26,26,26,0.6)", margin: "0 0 6px" }}>
                      {item.desc}
                    </p>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "0.72rem", color: "rgba(26,26,26,0.35)", margin: 0, fontStyle: "italic" }}>
                      {item.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ELEMENTOS COM VALOR SIMBÓLICO */}
      <section style={{ backgroundColor: "#FAF7F0", borderTop: "1px solid rgba(26,26,26,0.07)", padding: "clamp(40px,6vw,64px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "28px" }}>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
                Pode incluir <em style={{ color: "#3D6B5E" }}>elementos especiais</em> no seu quadro
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {["Convite do casamento","Votos manuscritos","Joias ou medalhas","Fitas e rendas","Coleiras de animais","Cartas e bilhetes","Objetos pessoais"].map((item, i) => (
                <span key={i} style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "0.8rem", color: "rgba(26,26,26,0.75)", backgroundColor: "rgba(26,26,26,0.05)", border: "1px solid rgba(26,26,26,0.1)", padding: "7px 14px", borderRadius: "100px" }}>
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.8rem", lineHeight: 1.7, color: "rgba(26,26,26,0.45)", margin: 0, maxWidth: "640px", fontStyle: "italic" }}>
              Se os acessórios forem mais volumosos, poderá ser necessário aumentar a profundidade da moldura. O orçamento será ajustado conforme as características da peça.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TAMANHOS E PREÇOS */}
      <section style={{ backgroundColor: "#0F1E1A", padding: "clamp(50px,8vw,90px) 24px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,64px)" }}>
              <Label light>Feito à mão, para si</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1, color: "#FAF7F0" }}>
                Tamanhos & Preços
              </h2>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(250,247,240,0.5)", maxWidth: "440px", margin: "0 auto" }}>
                Cada quadro que criamos é único. Feito à mão, com atenção aos detalhes e dedicação à história por detrás das flores.
              </p>
            </div>
          </Reveal>

          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
            {frames.map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 0.1}>
                <div style={{
                  backgroundColor: item.addonColor
                    ? item.addonColor
                    : item.addon
                    ? "#3D6B5E"
                    : i === 0 ? "#FAF7F0" : i === 1 ? "#F2EDE4" : "#EAE3D8",
                  padding: "28px 24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxSizing: "border-box",
                  borderRadius: "4px",
                  border: "none",
                  position: "relative",
                }}>
                  {item.addon && (
                    <span style={{
                      position: "absolute", top: "16px", right: "16px",
                      backgroundColor: "rgba(250,247,240,0.15)",
                      color: "#FAF7F0",
                      fontSize: "0.5rem", letterSpacing: "2px", textTransform: "uppercase",
                      fontFamily: "Roboto, sans-serif", fontWeight: 600,
                      padding: "4px 10px", borderRadius: "100px",
                    }}>
                      {item.badge || "Para oferecer"}
                    </span>
                  )}

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                    <div style={{ flexShrink: 0 }}>
                      {item.customSvg === "ornament" ? (
                        <OrnamentSVG svgWidth={item.svgWidth} light={true} />
                      ) : item.customSvg === "pendant" ? (
                        <PendantSVG svgWidth={item.svgWidth} light={true} />
                      ) : (
                        <FrameSVG
                          vw={item.vw} vh={item.vh}
                          flowers={item.flowers}
                          svgWidth={item.svgWidth}
                          label={item.size}
                          dark={item.addon ? false : true}
                        />
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: "8px" }}>
                      <p style={{
                        fontFamily: "'TAN-MEMORIES', serif",
                        fontSize: item.addon ? "clamp(1.2rem, 2vw, 1.7rem)" : "clamp(1.7rem, 2.6vw, 2.4rem)",
                        color: item.addon ? "#FAF7F0" : "#0F1E1A",
                        margin: "0",
                        lineHeight: 1,
                      }}>
                        {item.size}
                        <span style={{ fontSize: "0.8rem", fontFamily: "Roboto, sans-serif", fontWeight: 400, marginLeft: "4px", color: item.addon ? "rgba(250,247,240,0.45)" : "rgba(15,30,26,0.4)" }}>
                          {item.unit}
                        </span>
                      </p>
                      <p style={{
                        fontFamily: "'TAN-MEMORIES', serif",
                        fontSize: item.addon ? "clamp(1rem, 1.8vw, 1.3rem)" : "clamp(1.2rem, 2vw, 1.6rem)",
                        color: item.addon ? "#8BA888" : "#3D6B5E",
                        margin: "8px 0 10px",
                      }}>
                        {item.price}€
                      </p>
                      <p style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 300,
                        fontSize: "0.75rem",
                        lineHeight: 1.6,
                        color: item.addon ? "rgba(250,247,240,0.5)" : "rgba(15,30,26,0.5)",
                        margin: 0,
                        fontStyle: item.addon ? "italic" : "normal",
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Nota vidro museu */}
          <Reveal>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              margin: "0 0 48px",
              padding: "22px 32px",
              backgroundColor: "rgba(184,149,74,0.1)",
              border: "1px solid rgba(184,149,74,0.3)",
              borderRadius: "4px",
            }}>
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <rect x="1.5" y="1.5" width="15" height="15" rx="1" stroke="#C4A55A" strokeWidth="1.4" fill="none"/>
                <line x1="4" y1="6" x2="8" y2="2" stroke="rgba(196,165,90,0.7)" strokeWidth="1.1" strokeLinecap="round"/>
                <line x1="9" y1="5" x2="11" y2="3" stroke="rgba(196,165,90,0.5)" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              <p style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "0.88rem",
                color: "rgba(250,247,240,0.8)",
                margin: 0,
                letterSpacing: "0.2px",
              }}>
                Todos os quadros são emoldurados com{" "}
                <strong style={{ fontWeight: 700, color: "#C4A55A" }}>
                  vidro museu UltraVue®
                </strong>
                {" "}— praticamente invisível, com proteção UV70
              </p>
            </div>
          </Reveal>

          {/* Linha "Pretende outro formato" */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "28px", padding: "0 0 40px", borderBottom: "1px solid rgba(250,247,240,0.12)" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", fontWeight: 400, color: "rgba(250,247,240,0.6)", margin: 0, lineHeight: 1.4 }}>
                  Pretende outro formato<br/>ou uma composição diferente?
                </p>
              </div>
              <a href="/contactos"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "#FAF7F0", fontFamily: "Roboto, sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", flexShrink: 0, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Falar connosco
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#FAF7F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </Reveal>

          {/* TRACKING */}
          <Reveal>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              padding: "28px 0 40px",
              flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="9" cy="7.5" r="2.5" stroke="#8BA888" strokeWidth="1.3" fill="none"/>
                  <path d="M9 2C5.686 2 3 4.686 3 8c0 4.5 6 9 6 9s6-4.5 6-9c0-3.314-2.686-6-6-6z" stroke="#8BA888" strokeWidth="1.3" fill="none"/>
                </svg>
                <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "rgba(250,247,240,0.45)", margin: 0 }}>
                  Já encomendou? Acompanhe o estado da sua peça em tempo real.
                </p>
              </div>
              
                href="https://status.floresabeirario.pt"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8BA888", fontFamily: "Roboto, sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", flexShrink: 0, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Ver estado
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#8BA888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </Reveal>

        </div>
      </section>

      {/* MATERIAIS E QUALIDADE */}
      <section style={{ backgroundColor: "#FAF7F0", padding: "clamp(50px,8vw,90px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Label>Feito para durar</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1 }}>
                Materiais & Qualidade
              </h2>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(26,26,26,0.5)", maxWidth: "500px", margin: "0 auto" }}>
                Cada peça é produzida com materiais de conservação museu, selecionados para garantir que as suas flores permanecem belas ao longo dos anos.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1px", backgroundColor: "rgba(26,26,26,0.07)", marginBottom: "40px" }}>
            {[
              { img: "/molduranogueira.webp", title: "Moldura de Nogueira" },
              { img: "/moldurabranca.webp",   title: "Moldura Lacada a Branco" },
              { img: "/moldurapreta.webp",    title: "Moldura Lacada a Preto" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ position: "relative", overflow: "hidden", minHeight: "260px" }}>
                  <img src={item.img} alt={item.title} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,26,0.72) 0%, rgba(15,30,26,0.05) 45%, transparent 100%)" }} />
                  <div style={{ position: "relative", padding: "22px 22px 0", minHeight: "260px" }}>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.05rem", fontWeight: 400, margin: 0, lineHeight: 1.2, color: "#FAF7F0", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(26,26,26,0.7)", margin: "0 0 32px", letterSpacing: "0.2px" }}>
              Todas as molduras são feitas <strong style={{ color: "#1a1a1a" }}>à medida</strong> para cada peça, em Coimbra.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "22px 28px", backgroundColor: "rgba(184,149,74,0.07)", border: "1px solid rgba(184,149,74,0.2)", borderRadius: "4px", marginBottom: "56px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                <path d="M10 2 L11.8 7.6 L17.6 7.6 L13 11 L14.8 16.6 L10 13.2 L5.2 16.6 L7 11 L2.4 7.6 L8.2 7.6 Z" stroke="#B8954A" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
              </svg>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.75, color: "rgba(26,26,26,0.65)", margin: 0 }}>
                Todos os quadros utilizam <strong style={{ color: "#1a1a1a", fontWeight: 600 }}>cartão e cola de pH neutro</strong> — os mesmos materiais usados em museus e arquivos para preservar obras ao longo de décadas.
              </p>
            </div>
          </Reveal>

          <div className="ultravue-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
            <Reveal>
              <div>
                <Label>Vidro museu</Label>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.15 }}>
                  UltraVue® UV70<br/><em style={{ color: "#3D6B5E" }}>clareza verdadeiramente incrível</em>
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Praticamente elimina reflexos",
                    "Filtra até 70% dos raios UV nocivos",
                    "Vidro Water White com transmissão de cores cristalinas",
                    "Ilumina cores e níveis de contraste",
                    "Superfície duradoura e de fácil limpeza",
                  ].map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 0", borderBottom: "1px solid rgba(26,26,26,0.07)", fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(26,26,26,0.75)" }}>
                      <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#3D6B5E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }} aria-hidden="true">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#FAF7F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ width: "clamp(200px, 28vw, 340px)", borderRadius: "10px", overflow: "hidden", boxShadow: "0 12px 40px rgba(26,26,26,0.12)", flexShrink: 0 }}>
                <img src="/ladoalado.webp" alt="Comparação entre vidro normal e vidro UltraVue anti-reflexo" loading="lazy" style={{ width: "100%", display: "block" }} />
                <div style={{ backgroundColor: "#F2EDE4", padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "0.62rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(26,26,26,0.38)", fontWeight: 500 }}>Normal</span>
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "0.62rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#3D6B5E", fontWeight: 700 }}>UltraVue®</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div style={{ maxWidth: "720px", margin: "clamp(48px,8vw,80px) auto 0", padding: "0 24px", textAlign: "center" }}>
            <div style={{ backgroundColor: "#3D6B5E", padding: "40px 32px", borderRadius: "12px" }}>
              <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 400, margin: "0 0 14px", lineHeight: 1.15, color: "#FAF7F0" }}>
                Garanta a <em style={{ color: "#8BA888" }}>qualidade museu</em> para o seu quadro
              </h3>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(250,247,240,0.65)", margin: "0 0 28px" }}>
                Materiais premium que preservam as suas flores durante décadas.
              </p>
              <a href="https://wkf.ms/3RfoNAc" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F0", color: "#3D6B5E", padding: "14px 36px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease", minHeight: "52px" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#EDE5D4"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FAF7F0"; }}
              >
                Reservar a Minha Data
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section style={{ backgroundColor: "#3D6B5E", padding: "clamp(60px,10vw,100px) 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <Reveal>
            <Label light>Próximo passo</Label>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.05, color: "#FAF7F0" }}>
              Pronta para preservar<br/><em style={{ color: "#8BA888" }}>o seu bouquet?</em>
            </h2>
            <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(250,247,240,0.65)", margin: "0 0 44px" }}>
              Reserve a sua data o mais cedo possível. As vagas são limitadas e os bouquets devem ser enviados dentro de poucos dias após o evento.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wkf.ms/3RfoNAc" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F0", color: "#3D6B5E", padding: "16px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease", minHeight: "56px" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#EDE5D4"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FAF7F0"; }}
              >
                Reservar Data
              </a>
              <a href="/perguntas-frequentes"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", color: "rgba(250,247,240,0.85)", padding: "16px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", border: "1.5px solid rgba(250,247,240,0.3)", transition: "all 0.3s ease", minHeight: "56px" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(250,247,240,0.7)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(250,247,240,0.3)"}
              >
                Perguntas Frequentes
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        .fundos-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 16px;
          padding: 0 24px 4px;
        }
        .fundos-track::-webkit-scrollbar { display: none; }

        .fundo-card-new {
          flex: 0 0 78vw;
          max-width: 320px;
          scroll-snap-align: start;
        }

        @media (min-width: 900px) {
          .fundos-track {
            overflow-x: visible;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
            gap: 24px;
          }
          .fundo-card-new {
            flex: 1 1 0;
            max-width: none;
            scroll-snap-align: unset;
          }
        }

        .fundo-img-new:hover { transform: scale(1.05); }

        .slider-hint {
          display: block;
          text-align: center;
          font-family: Roboto, sans-serif;
          font-size: 0.6rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 16px 0 0;
          margin: 0;
        }
        @media (min-width: 900px) {
          .slider-hint { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          video { animation: none !important; }
        }

        a:focus-visible,
        button:focus-visible {
          outline: 3px solid #3D6B5E;
          outline-offset: 4px;
          border-radius: 4px;
        }

        .presente-img:hover { transform: scale(1.04); }

        @media (max-width: 640px) {
          .ultravue-grid {
            grid-template-columns: 1fr !important;
          }
          .ultravue-grid > div:last-child {
            width: 100% !important;
            max-width: 360px;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          .presentes-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1023px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
