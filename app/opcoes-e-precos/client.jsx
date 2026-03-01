"use client";

import { useRef } from "react";
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

/* SVGs das molduras — cada um com proporção real do tamanho */
function FrameSVG({ ratio, flowerScale, label }) {
  // ratio: largura/altura do viewBox para reflectir proporção real
  const vw = 220;
  const vh = ratio === "3:4" ? 293 : ratio === "4:5" ? 275 : 308; // 30x40, 40x50, 50x70
  const cx = vw / 2;
  const cy = vh / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${vw} ${vh}`}
      style={{ width: "100%", maxWidth: ratio === "4:5" ? "140px" : ratio === "3:4" ? "120px" : "108px", height: "auto", opacity: 0.9 }}
      aria-label={`Ilustração moldura ${label}`}
    >
      {/* Moldura exterior */}
      <rect x="10" y="10" width={vw - 20} height={vh - 20}
        stroke="rgba(250,247,240,0.55)" strokeWidth="2" fill="none" />
      {/* Moldura interior */}
      <rect x="18" y="18" width={vw - 36} height={vh - 36}
        stroke="rgba(250,247,240,0.3)" strokeWidth="1.2" fill="none" />
      {/* Brilhos de vidro */}
      <line x1="32" y1={cy * 0.55} x2={cx * 0.75} y2="30"
        stroke="rgba(250,247,240,0.22)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1={cx * 0.85} y1="22" x2={cx * 0.95} y2="18"
        stroke="rgba(250,247,240,0.22)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="52" y1={cy * 0.7} x2={cx} y2="42"
        stroke="rgba(250,247,240,0.16)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1={vw - 50} y1={vh - 65} x2={vw - 28} y2={vh - 88}
        stroke="rgba(250,247,240,0.22)" strokeWidth="1.4" strokeLinecap="round" />
      {/* Flor central */}
      <g transform={`translate(${cx}, ${cy}) scale(${flowerScale}) translate(-100, -125)`}>
        <path d="M 98 121 C 75 85, 125 85, 102 121 M 104 123 C 145 105, 135 145, 106 127 M 103 128 C 120 175, 80 165, 98 128 M 97 127 C 55 150, 65 110, 95 124 M 95 122 C 55 95, 80 75, 97 120"
          stroke="rgba(250,247,240,0.45)" strokeWidth="1.5" fill="none"
          strokeLinejoin="round" strokeLinecap="round" />
        <path d="M 100 115 L 100 102 M 110 125 L 123 120 M 100 135 L 103 148 M 90 128 L 78 133 M 90 118 L 80 108"
          stroke="rgba(250,247,240,0.35)" strokeWidth="1" strokeLinecap="round" />
        <ellipse cx="100" cy="125" rx="7" ry="5" transform="rotate(-20 100 125)"
          stroke="rgba(250,247,240,0.45)" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}

const frames = [
  {
    ratio: "3:4",
    flowerScale: 1.3,
    size: "30×40",
    unit: "cm",
    price: "300",
    desc: "Perfeito para peças mais íntimas ou como elemento de conjunto.",
  },
  {
    ratio: "4:5",
    flowerScale: 1.5,
    size: "40×50",
    unit: "cm",
    price: "400",
    desc: "O formato mais escolhido. Equilibra presença e elegância.",
  },
  {
    ratio: "5:7",
    flowerScale: 1.6,
    size: "50×70",
    unit: "cm",
    price: "500",
    desc: "Uma peça de destaque, que domina qualquer parede.",
  },
];

export default function OpcoesClient() {
  return (
    <div style={{ backgroundColor: "#FAF7F0", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* ════════════════════════════════════════════
          HERO com IMAGEM DE FUNDO
      ════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            backgroundImage: "url('/fotoquadrocloseup2.webp')",
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

      {/* ════════════════════════════════════════════
          TIPOS DE FUNDO
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FAF7F0", padding: "clamp(40px,7vw,70px) 0 clamp(50px,8vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px clamp(32px,5vw,48px)" }}>
          <Reveal>
            <Label>Personalização</Label>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 400, margin: 0, lineHeight: 1.05, color: "#1a1a1a" }}>
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
                <div style={{ aspectRatio: "16/10", overflow: "hidden", borderRadius: "6px", backgroundColor: "#e0dbd3", position: "relative" }}>
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

        <Reveal delay={0.1}>
          <div style={{ maxWidth: "680px", margin: "clamp(40px,6vw,60px) auto 0", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(26,26,26,0.6)", margin: "0 0 20px" }}>
              As vagas são limitadas. Reserve a sua data o mais cedo possível.
            </p>
            <a href="https://wkf.ms/3RfoNAc" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#3D6B5E", color: "#FAF7F0", padding: "14px 36px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease", minHeight: "52px" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#2F5548"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#3D6B5E"; }}
            >
              Reservar a Minha Data
            </a>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════
          ELEMENTOS ADICIONAIS
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FAF7F0", borderTop: "1px solid rgba(26,26,26,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(50px,8vw,90px) 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
            <div>
              <Reveal>
                <Label>Personalização extra</Label>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.1 }}>
                  Elementos com<br/><em style={{ color: "#3D6B5E" }}>valor simbólico</em>
                </h2>
                <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,26,26,0.65)", margin: "0 0 32px" }}>
                  É possível integrar elementos adicionais com significado especial na sua composição, tornando cada peça verdadeiramente única.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                  {["Convite do casamento","Votos manuscritos","Joias ou medalhas","Fitas, tecidos ou rendas","Coleiras de animais","Cartas e bilhetes","Objetos pessoais"].map((item, i) => (
                    <li key={i} style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.5, color: "rgba(26,26,26,0.75)", padding: "11px 16px 11px 0", borderBottom: "1px solid rgba(26,26,26,0.07)", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#B8954A", flexShrink: 0 }} aria-hidden="true"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.12}>
                <div style={{ backgroundColor: "rgba(184,149,74,0.09)", borderLeft: "3px solid #B8954A", padding: "18px 22px", borderRadius: "0 8px 8px 0" }}>
                  <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "0.83rem", lineHeight: 1.75, color: "rgba(26,26,26,0.7)", margin: 0 }}>
                    <strong style={{ color: "#1a1a1a" }}>Nota:</strong> Se os acessórios forem mais volumosos do que as flores prensadas, poderá ser necessário aumentar a profundidade da moldura. O orçamento será ajustado conforme as características da peça.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "9/16", maxHeight: "600px" }}>
                <video src="/quadroconvite.webm" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div style={{ maxWidth: "680px", margin: "clamp(48px,8vw,70px) auto 0", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(26,26,26,0.6)", margin: "0 0 20px" }}>
              Quer incluir elementos especiais na sua composição?
            </p>
            <a href="https://wkf.ms/3RfoNAc" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#3D6B5E", color: "#FAF7F0", padding: "14px 36px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease", minHeight: "52px" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#2F5548"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#3D6B5E"; }}
            >
              Reservar e Personalizar
            </a>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════
          TAMANHOS E PREÇOS — redesenhado
          SVG integrado em cada cartão, sem "mais popular"
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0F1E1A", padding: "clamp(50px,8vw,90px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Cabeçalho */}
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,64px)" }}>
              <Label light>Investimento</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1, color: "#FAF7F0" }}>
                Tamanhos & Preços
              </h2>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(250,247,240,0.5)", maxWidth: "440px", margin: "0 auto" }}>
                Cada quadro que criamos é único. Feito à mão, com atenção aos detalhes e dedicação à história por detrás das flores.
              </p>
            </div>
          </Reveal>

          {/* Cartões com SVG integrado */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2px", marginBottom: "48px" }}>
            {frames.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  backgroundColor: "rgba(250,247,240,0.04)",
                  border: "1px solid rgba(250,247,240,0.07)",
                  padding: "40px 36px 44px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  height: "100%",
                  position: "relative",
                }}>

                  {/* Ilustração SVG da moldura — no topo de cada cartão */}
                  <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: "32px", opacity: 0.85 }}>
                    <FrameSVG ratio={item.ratio} flowerScale={item.flowerScale} label={item.size} />
                  </div>

                  {/* Dimensão */}
                  <p style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "clamp(2.4rem, 5.5vw, 3.2rem)",
                    color: "#FAF7F0",
                    margin: "0",
                    lineHeight: 1,
                  }}>
                    {item.size}
                    <span style={{ fontSize: "1rem", fontFamily: "Roboto, sans-serif", fontWeight: 300, marginLeft: "5px", opacity: 0.4 }}>
                      {item.unit}
                    </span>
                  </p>

                  {/* Preço */}
                  <p style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                    color: "#8BA888",
                    margin: "12px 0 20px",
                  }}>
                    {item.price}€
                  </p>

                  {/* Descrição */}
                  <p style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.88rem",
                    lineHeight: 1.75,
                    color: "rgba(250,247,240,0.5)",
                    margin: "0",
                    flexGrow: 1,
                  }}>
                    {item.desc}
                  </p>

                  {/* Linha e nota de materiais */}
                  <div style={{ marginTop: "28px", paddingTop: "22px", borderTop: "1px solid rgba(250,247,240,0.06)", width: "100%" }}>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.75rem", lineHeight: 1.6, color: "rgba(250,247,240,0.28)", margin: 0 }}>
                      Inclui vidro UltraVue® UV70, moldura de nogueira e cartão de pH neutro
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ textAlign: "center", padding: "32px", border: "1px solid rgba(250,247,240,0.07)", borderRadius: "4px", marginBottom: "40px" }}>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(250,247,240,0.45)", margin: "0 0 18px" }}>
                Pretende outro formato ou uma composição diferente? Entre em contacto connosco.
              </p>
              <a href="/contactos"
                style={{ display: "inline-flex", alignItems: "center", color: "#FAF7F0", fontFamily: "Roboto, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid rgba(250,247,240,0.25)", paddingBottom: "2px", transition: "border-color 0.3s", minHeight: "44px" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(250,247,240,0.25)"}
              >
                Falar connosco
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ textAlign: "center", padding: "48px 32px", backgroundColor: "rgba(250,247,240,0.04)", borderRadius: "8px" }}>
              <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, margin: "0 0 16px", lineHeight: 1.2, color: "#FAF7F0" }}>
                Pronta para <em style={{ color: "#8BA888" }}>preservar</em> o seu bouquet?
              </h3>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(250,247,240,0.5)", margin: "0 0 28px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
                Os bouquets devem ser enviados dentro de poucos dias após o evento.
              </p>
              <a href="https://wkf.ms/3RfoNAc" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F0", color: "#0F1E1A", padding: "16px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease", minHeight: "56px" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#EDE5D4"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FAF7F0"; }}
              >
                Reservar Agora
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MATERIAIS E QUALIDADE
      ════════════════════════════════════════════ */}
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1px", backgroundColor: "rgba(26,26,26,0.07)", marginBottom: "56px" }}>
            {[
              { bg: "#3D6B5E", textColor: "#FAF7F0", subColor: "rgba(250,247,240,0.55)", title: "Moldura de Nogueira", desc: "Folheada de nogueira, produzida artesanalmente em Coimbra por carpinteiros locais. Material de origem sustentável e regional." },
              { bg: "#FAF7F0", textColor: "#1a1a1a", subColor: "rgba(26,26,26,0.55)", title: "Cartão pH Neutro", desc: "Base de conservação a longo prazo, idêntica à usada em museus e arquivos. Preserva as flores sem alterar a sua cor." },
              { bg: "#F2EDE4", textColor: "#1a1a1a", subColor: "rgba(26,26,26,0.55)", title: "Cola pH Neutro", desc: "Segura para flores prensadas e elementos delicados. Não amarelece com o tempo nem danifica materiais frágeis." },
              { bg: "#0F1E1A", textColor: "#FAF7F0", subColor: "rgba(250,247,240,0.55)", title: "Vidro UltraVue® UV70", desc: "Anti-reflexo quase invisível, filtra 70% dos raios UV nocivos. Produzido com vidro Water White de origem certificada." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ backgroundColor: item.bg, padding: "36px 28px", minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.1rem", fontWeight: 400, margin: "0 0 10px", lineHeight: 1.2, color: item.textColor }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.75, color: item.subColor, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
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

      {/* ════════════════════════════════════════════
          ADD-ONS
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F2EDE4", padding: "clamp(50px,8vw,90px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "48px" }}>
              <Label>Extras</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, margin: "0 0 16px", lineHeight: 1.1 }}>
                Add-ons &<br/><em style={{ color: "#3D6B5E" }}>Presentes</em>
              </h2>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(26,26,26,0.55)", maxWidth: "460px" }}>
                Para além do seu quadro principal, pode encomendar peças adicionais. Presentes pessoais e cheios de significado para quem ama.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "clamp(40px, 6vw, 80px)", alignItems: "center", marginBottom: "clamp(50px,8vw,80px)", paddingBottom: "clamp(50px,8vw,80px)", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
            <Reveal>
              <div style={{ aspectRatio: "4/3", overflow: "hidden", borderRadius: "12px", boxShadow: "0 16px 48px rgba(26,26,26,0.1)" }}>
                <img src="/miniquadros.webp" alt="Mini quadros 20x25cm de flores preservadas como presentes para padrinhos e damas de honor" loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <Label>Para oferecer</Label>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 400, margin: "0 0 8px", lineHeight: 1.1 }}>Mini Quadros</h3>
                <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.8rem", color: "#3D6B5E", margin: "0 0 24px" }}>20×25 cm — 90€</p>
                <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,26,26,0.65)", margin: "0 0 16px" }}>
                  Molduras mais pequenas com as flores do seu bouquet. Uma forma bonita de partilhar um pedaço do seu dia especial com as pessoas que mais ama.
                </p>
                <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "1px", color: "#3D6B5E", margin: 0 }}>
                  Emoldurado com vidro museu UltraVue®
                </p>
              </div>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "clamp(32px, 5vw, 48px)" }}>
            {[
              {
                imgs: [
                  { src: "/ornamento1.webp", alt: "Ornamento de natal rectangular com flores prensadas em vidro soldado com prata" },
                  { src: "/ornamento2.webp", alt: "Ornamento de natal circular com flores prensadas em vidro soldado com prata" },
                ],
                badge: "Sazonal", badgeBg: "rgba(184,149,74,0.15)", badgeColor: "#96722A",
                title: "Ornamentos de Natal",
                price: "Aprox. 8 cm — 35€",
                desc: "Vidro sobre vidro soldado sem chumbo com prata. Formatos à escolha: circular, quadrado ou rectangular.",
              },
              {
                imgs: [
                  { src: "/pendente1.webp", alt: "Pendente de flores prensadas em vidro soldado com prata" },
                  { src: "/pendente2.webp", alt: "Pendente floral circular em vidro soldado com prata" },
                ],
                badge: "Joalharia botânica", badgeBg: "rgba(61,107,94,0.12)", badgeColor: "#3D6B5E",
                title: "Pendentes para Colar",
                price: "Aprox. 3 cm — 35€",
                desc: "Vidro sobre vidro soldado sem chumbo com prata. Formatos à escolha: circular, quadrado ou rectangular.",
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 32px rgba(26,26,26,0.08)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", backgroundColor: "rgba(26,26,26,0.1)" }}>
                    {item.imgs.map((img, j) => (
                      <img key={j} src={img.src} alt={img.alt} loading="lazy"
                        style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
                    ))}
                  </div>
                  <div style={{ padding: "28px 28px 32px", backgroundColor: "#FAF7F0" }}>
                    <span style={{ display: "inline-block", backgroundColor: item.badgeBg, color: item.badgeColor, fontSize: "0.56rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", fontWeight: 600, padding: "5px 12px", borderRadius: "100px", marginBottom: "14px" }}>
                      {item.badge}
                    </span>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.5rem", fontWeight: 400, margin: "0 0 6px", color: "#1a1a1a" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.2rem", color: "#3D6B5E", margin: "0 0 14px" }}>
                      {item.price}
                    </p>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(26,26,26,0.6)", margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════ */}
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
      `}</style>
    </div>
  );
}
