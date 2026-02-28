"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─────────────────────────────────────────────
// SVG Botanical Decorations (inline, zero-weight)
// ─────────────────────────────────────────────
const BotanicalSprig = ({ style }) => (
  <svg viewBox="0 0 100 200" style={style} fill="none" aria-hidden="true">
    <path d="M50 190 C50 190 50 10 50 10" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    <ellipse cx="30" cy="60" rx="18" ry="28" fill="currentColor" opacity="0.18" transform="rotate(-30 30 60)"/>
    <ellipse cx="70" cy="90" rx="18" ry="28" fill="currentColor" opacity="0.18" transform="rotate(30 70 90)"/>
    <ellipse cx="28" cy="130" rx="15" ry="22" fill="currentColor" opacity="0.14" transform="rotate(-20 28 130)"/>
    <ellipse cx="72" cy="155" rx="15" ry="22" fill="currentColor" opacity="0.14" transform="rotate(25 72 155)"/>
  </svg>
);

const BotanicalBloom = ({ style }) => (
  <svg viewBox="0 0 140 140" style={style} fill="none" aria-hidden="true">
    {[0,45,90,135,180,225,270,315].map((r, i) => (
      <ellipse key={i} cx="70" cy="70" rx="16" ry="38"
        fill="currentColor" opacity="0.12"
        transform={`rotate(${r} 70 70) translate(0 -22)`}/>
    ))}
    <circle cx="70" cy="70" r="10" fill="currentColor" opacity="0.22"/>
  </svg>
);

const BotanicalLeaf = ({ style }) => (
  <svg viewBox="0 0 80 120" style={style} fill="none" aria-hidden="true">
    <path d="M40 115 C8 80 10 35 40 8 C70 35 72 80 40 115Z" fill="currentColor" opacity="0.2"/>
    <path d="M40 115 C40 115 40 8 40 8" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <path d="M40 60 C20 55 15 45 22 35" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
    <path d="M40 60 C60 55 65 45 58 35" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
  </svg>
);

// ─────────────────────────────────────────────
// Parallax: image always fills container
// small shift so top/bottom never exposed
// ─────────────────────────────────────────────
function useImageParallax(ref, px = 40) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  return useTransform(scrollYProgress, [0, 1], [`${px}px`, `-${px}px`]);
}

// ─────────────────────────────────────────────
// Step Card
// ─────────────────────────────────────────────
const StepCard = ({ imageSrc, number, title, desc, delay }) => {
  const ref = useRef(null);
  const imgY = useImageParallax(ref, 30);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative" }}
    >
      {/* "Passo N" badge */}
      <div style={{
        position: "absolute", top: "-16px", left: "50%",
        transform: "translateX(-50%)", zIndex: 10,
        backgroundColor: "#3D6B5E", color: "#FAF7F0",
        padding: "6px 20px", borderRadius: "50px",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 16px rgba(61,107,94,0.35)"
      }}>
        <span style={{
          fontSize: "0.6rem", fontWeight: "700",
          letterSpacing: "2.5px", textTransform: "uppercase",
          fontFamily: "Roboto, sans-serif"
        }}>
          Passo {number}
        </span>
      </div>

      <div style={{
        borderRadius: "20px", overflow: "hidden",
        boxShadow: "0 16px 50px rgba(30,45,42,0.1)",
        backgroundColor: "#fff",
        border: "1px solid rgba(61,107,94,0.1)"
      }}>
        {/* Image — oversized height so parallax never shows edges */}
        <div style={{
          height: "240px", overflow: "hidden",
          position: "relative", backgroundColor: "#D4DECC"
        }}>
          <motion.img
            src={imageSrc}
            alt={`Passo ${number} da recriação de bouquet: ${title}`}
            style={{
              width: "100%",
              height: "calc(100% + 60px)",
              objectFit: "cover",
              display: "block",
              position: "absolute",
              top: "-30px",
              left: 0,
              y: imgY
            }}
            loading="lazy"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 55%, rgba(30,45,42,0.2))"
          }}/>
        </div>

        <div style={{ padding: "28px 22px 26px", textAlign: "center" }}>
          <h3 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "1.25rem", color: "#1E2D2A",
            margin: "0 0 10px", lineHeight: "1.2"
          }}>
            {title}
          </h3>
          <p style={{ color: "#5A6B60", lineHeight: "1.75", fontSize: "0.9rem", margin: 0 }}>
            {desc}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

// ─────────────────────────────────────────────
// Use-Case Card (sem parallax, imagem sempre cheia)
// ─────────────────────────────────────────────
const UseCaseCard = ({ imageSrc, emoji, title, desc, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    style={{
      borderRadius: "22px", overflow: "hidden",
      boxShadow: "0 16px 50px rgba(30,45,42,0.1)",
      backgroundColor: "#fff",
      border: "1px solid rgba(61,107,94,0.08)"
    }}
  >
    <div style={{
      height: "260px", overflow: "hidden",
      position: "relative", backgroundColor: "#C8D8C0"
    }}>
      <img
        src={imageSrc}
        alt={title}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", display: "block"
        }}
        loading="lazy"
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(30,45,42,0.05) 0%, rgba(30,45,42,0.62) 100%)"
      }}/>
      <div style={{
        position: "absolute", bottom: "22px", left: "22px", right: "22px"
      }}>
        <span style={{
          fontSize: "1.5rem", display: "block", marginBottom: "8px"
        }}>
          {emoji}
        </span>
        <h3 style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "1.35rem", color: "#FAF7F0",
          margin: 0, lineHeight: "1.15",
          textShadow: "0 2px 8px rgba(0,0,0,0.25)"
        }}>
          {title}
        </h3>
      </div>
    </div>
    <div style={{ padding: "22px 22px 26px" }}>
      <p style={{ color: "#5A6B60", lineHeight: "1.8", fontSize: "0.92rem", margin: 0 }}>
        {desc}
      </p>
    </div>
  </motion.article>
);

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function RecriacaoBouquet() {

  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBgY    = useTransform(heroP, [0, 1], ["0%",  "35%"]);
  const heroTextY  = useTransform(heroP, [0, 1], ["0%",  "50%"]);
  const heroOpacity= useTransform(heroP, [0, 0.85], [1, 0]);

  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "1",
      title: "A Memória",
      desc: "Envie-nos fotografias do dia em que o bouquet seja visível — quanto mais ângulos, mais fiel será a recriação do seu ramo de noiva."
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "2",
      title: "A Recriação",
      desc: "Em parceria com uma florista local, recriamos o seu bouquet com flores frescas. Aprovação prévia do orçamento garantida."
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "3",
      title: "A Prensagem",
      desc: "Cada pétala é prensada com técnicas artesanais de preservação botânica, mantendo forma e cor o máximo possível."
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "4",
      title: "A Obra de Arte",
      desc: "Enviamos fotografia da composição para aprovação. Só depois o quadro é emoldurado com vidro museu anti-reflexo e proteção UV."
    }
  ];

  const useCases = [
    {
      imageSrc: "/historia-casamento-antigo.jpg",
      emoji: "💛",
      title: "Bodas de Ouro ou Prata",
      desc: "O presente mais tocante que os filhos podem oferecer aos pais: recriar o bouquet do casamento deles, com flores frescas, décadas depois.",
      delay: 0
    },
    {
      imageSrc: "/historia-casamento-recente.jpg",
      emoji: "🌿",
      title: "Quando o Tempo Passou",
      desc: "Para noivas que descobriram a preservação botânica tarde demais, ou cujo bouquet de casamento original não sobreviveu ao grande dia.",
      delay: 0.12
    },
    {
      imageSrc: "/historia-aniversario-flores.jpg",
      emoji: "🎁",
      title: "Aniversário de Casamento",
      desc: "Surpreenda a sua cara-metade com o ramo de noiva recriado e eternizado — o presente mais inesperado e romântico para o vosso aniversário.",
      delay: 0.22
    }
  ];

  return (
    <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }
        :root {
          --green:   #3D6B5E;
          --green-d: #1E2D2A;
          --green-l: #8BA888;
          --terra:   #C4846B;
          --gold:    #B8954A;
          --cream:   #FAF7F0;
          --text:    #2C3830;
          --mid:     #5A6B60;
        }

        @keyframes driftA {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-18px) rotate(6deg); }
        }
        @keyframes driftB {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-12px) rotate(-8deg); }
        }
        @keyframes driftC {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-24px) rotate(4deg); }
        }
        .drift-a { animation: driftA 7s ease-in-out infinite; }
        .drift-b { animation: driftB 9s ease-in-out infinite; }
        .drift-c { animation: driftC 6s ease-in-out infinite; }

        /* ── Mobile-first grid ── */
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 52px;
        }
        @media (min-width: 600px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 48px 22px;
          }
        }
        @media (min-width: 1024px) {
          .steps-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 22px;
          }
        }

        .cases-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .cases-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .pricing-cols {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 560px) {
          .pricing-cols { grid-template-columns: repeat(2, 1fr); }
        }

        .cta-row {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 12px;
        }
        @media (min-width: 460px) {
          .cta-row {
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
        }

        /* Buttons */
        .btn-primary {
          display: inline-block;
          background-color: var(--green);
          color: var(--cream);
          padding: 16px 36px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          box-shadow: 0 6px 28px rgba(61,107,94,0.3);
          transition: all 0.3s ease;
          text-align: center;
          font-family: Roboto, sans-serif;
        }
        .btn-primary:hover {
          background-color: var(--green-d);
          transform: translateY(-3px);
          box-shadow: 0 10px 36px rgba(61,107,94,0.38);
        }
        .btn-outline {
          display: inline-block;
          border: 2px solid var(--green);
          color: var(--green);
          padding: 14px 34px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          text-align: center;
          font-family: Roboto, sans-serif;
        }
        .btn-outline:hover {
          background-color: var(--green);
          color: var(--cream);
          transform: translateY(-3px);
        }

        .section-eyebrow {
          display: block;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 14px;
          font-family: Roboto, sans-serif;
        }

        .scroll-hint {
          position: absolute;
          bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          color: rgba(250,247,240,0.55);
          font-size: 0.55rem; letter-spacing: 3px;
          text-transform: uppercase; z-index: 5;
          font-family: Roboto, sans-serif;
        }
        .scroll-line {
          width: 1px; height: 34px;
          background: linear-gradient(to bottom, rgba(250,247,240,0.65), transparent);
          animation: driftA 2.2s ease-in-out infinite;
        }
      `}} />

      {/* ═══════════════════════════════════════════
          1. HERO — parallax botanical, green forest
          h1 with SEO wedding keywords
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        aria-label="Recriação de Bouquet de Casamento"
        style={{
          height: "100vh", minHeight: "580px",
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        {/* Parallax bg */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute", inset: "-25%",
            background: "linear-gradient(155deg, #0F1E1A 0%, #1E3328 20%, #2D5045 45%, #3D6B5E 68%, #6B9B7A 88%, #9EC49A 100%)",
            y: heroBgY
          }}
        />

        {/* Grain texture */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
        }}/>

        {/* Floating botanicals */}
        <div aria-hidden="true" className="drift-a" style={{
          position: "absolute", top: "10%", left: "5%",
          color: "#FAF7F0", width: "clamp(80px,13vw,140px)", opacity: 0.3, zIndex: 2
        }}>
          <BotanicalBloom style={{ width: "100%" }}/>
        </div>
        <div aria-hidden="true" className="drift-b" style={{
          position: "absolute", top: "14%", right: "7%",
          color: "#FAF7F0", width: "clamp(50px,8vw,90px)", opacity: 0.25, zIndex: 2
        }}>
          <BotanicalLeaf style={{ width: "100%" }}/>
        </div>
        <div aria-hidden="true" className="drift-c" style={{
          position: "absolute", bottom: "16%", left: "4%",
          color: "#FAF7F0", width: "clamp(55px,9vw,100px)", opacity: 0.2, zIndex: 2
        }}>
          <BotanicalSprig style={{ width: "100%" }}/>
        </div>
        <div aria-hidden="true" className="drift-a" style={{
          position: "absolute", bottom: "10%", right: "5%",
          color: "#FAF7F0", width: "clamp(65px,10vw,120px)", opacity: 0.25, zIndex: 2,
          animationDelay: "2s"
        }}>
          <BotanicalBloom style={{ width: "100%" }}/>
        </div>

        {/* Text */}
        <motion.div
          style={{
            zIndex: 3, textAlign: "center", color: "#FAF7F0",
            padding: "0 20px", y: heroTextY, opacity: heroOpacity,
            maxWidth: "860px", width: "100%"
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontSize: "clamp(0.58rem, 1.4vw, 0.7rem)",
              letterSpacing: "4px", textTransform: "uppercase",
              fontWeight: "700", marginBottom: "20px",
              opacity: 0.75, fontFamily: "Roboto, sans-serif"
            }}
          >
            Preservação Botânica · Coimbra, Portugal
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(3rem, 10vw, 6.2rem)",
              lineHeight: 1.05, margin: "0 0 22px",
              textShadow: "0 3px 24px rgba(0,0,0,0.2)"
            }}
          >
            Recriação de<br/>
            <em style={{ fontStyle: "italic", color: "#A8C4A0" }}>Bouquet</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
              lineHeight: 1.85, maxWidth: "580px",
              margin: "0 auto 34px", opacity: 0.88, fontWeight: "300"
            }}
          >
            O seu bouquet de noiva não foi preservado a tempo?
            Com apenas uma fotografia, recriamos o ramo com flores frescas
            e eternizamo-lo numa obra de arte botânica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <a
              href="mailto:info@floresabeirario.pt?subject=Orçamento Recriação de Bouquet de Casamento"
              className="btn-primary"
            >
              Pedir Orçamento Gratuito
            </a>
          </motion.div>
        </motion.div>

        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-line"/>
          <span>scroll</span>
        </div>

        {/* Wave */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: -1, left: 0, width: "100%", zIndex: 4
        }}>
          <svg viewBox="0 0 1440 65" fill="none" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "50px" }}>
            <path d="M0 30 C300 65 660 0 1000 38 C1180 56 1340 15 1440 30 L1440 65 L0 65Z" fill="#FAF7F0"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. INTRO — pull quote
      ═══════════════════════════════════════════ */}
      <section
        aria-label="O que é a recriação de bouquet"
        style={{ padding: "80px 20px 88px", position: "relative" }}
      >
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, right: "3%",
          width: "clamp(160px,28vw,300px)", height: "clamp(160px,28vw,300px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,149,74,0.1) 0%, transparent 70%)",
          pointerEvents: "none"
        }}/>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}
        >
          <div aria-hidden="true" style={{
            width: "48px", height: "1px", margin: "0 auto 26px",
            background: "linear-gradient(to right, transparent, #B8954A, transparent)"
          }}/>
          <blockquote style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.35rem, 4vw, 2.3rem)",
            color: "#1E2D2A", lineHeight: 1.35,
            margin: "0 0 20px", fontStyle: "italic"
          }}>
            "Porque algumas flores merecem durar para sempre."
          </blockquote>
          <p style={{
            color: "#5A6B60", lineHeight: 1.85,
            fontSize: "clamp(0.92rem, 2vw, 1.02rem)", margin: 0
          }}>
            Mesmo que o tempo tenha passado, as memórias não têm prazo de validade.
            Recriamos o bouquet de noiva com flores frescas iguais às originais
            e preservamo-lo com técnicas artesanais de botânica — para durar décadas na sua parede.
          </p>
          <div aria-hidden="true" style={{
            width: "48px", height: "1px", margin: "26px auto 0",
            background: "linear-gradient(to right, transparent, #B8954A, transparent)"
          }}/>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          3. COMO FUNCIONA — 4 passos com parallax
      ═══════════════════════════════════════════ */}
      <section
        aria-label="Como funciona a recriação de bouquet de casamento"
        style={{
          padding: "60px 20px 100px",
          background: "linear-gradient(180deg, #FAF7F0 0%, #EDF2E8 50%, #FAF7F0 100%)",
          position: "relative", overflow: "hidden"
        }}
      >
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(70px,12vw,140px)",
          color: "rgba(61,107,94,0.05)",
          whiteSpace: "nowrap", pointerEvents: "none",
          lineHeight: 1, userSelect: "none"
        }}>
          Processo
        </div>

        <div style={{ maxWidth: "1260px", margin: "0 auto", position: "relative" }}>
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "68px" }}
          >
            <span className="section-eyebrow">Como funciona</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              color: "#1E2D2A", margin: 0, lineHeight: 1.1
            }}>
              Quatro passos, uma obra de arte
            </h2>
          </motion.header>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <StepCard key={i} {...step} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. PARA QUEM É — use cases
          sem "história", sem parallax de imagem
      ═══════════════════════════════════════════ */}
      <section
        aria-label="Situações em que se usa a recriação de bouquet"
        style={{ padding: "88px 20px 100px", backgroundColor: "#FAF7F0" }}
      >
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <span className="section-eyebrow">Para quem é este serviço</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.8rem, 4.5vw, 3.1rem)",
              color: "#1E2D2A", margin: 0, lineHeight: 1.1
            }}>
              Memórias que merecem<br/>
              <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>uma segunda vida</em>
            </h2>
          </motion.header>

          <div className="cases-grid">
            {useCases.map((c, i) => (
              <UseCaseCard key={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. PREÇOS — transparência
      ═══════════════════════════════════════════ */}
      <section
        aria-label="Preços da recriação de bouquet"
        style={{
          padding: "60px 20px 96px",
          background: "linear-gradient(135deg, #EDF2E8 0%, #FAF7F0 60%, #F0EBE0 100%)",
          position: "relative", overflow: "hidden"
        }}
      >
        <div aria-hidden="true" className="drift-b" style={{
          position: "absolute", right: "-16px", bottom: "8%",
          color: "#3D6B5E", width: "100px", opacity: 0.07, pointerEvents: "none"
        }}>
          <BotanicalBloom style={{ width: "100%" }}/>
        </div>

        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: "#fff",
              borderRadius: "28px",
              padding: "clamp(26px, 6vw, 52px) clamp(20px, 5vw, 46px)",
              boxShadow: "0 14px 55px rgba(30,45,42,0.08)",
              border: "1px solid rgba(61,107,94,0.1)",
              position: "relative", overflow: "hidden"
            }}
          >
            <div aria-hidden="true" style={{
              position: "absolute", top: "-36px", right: "-36px",
              width: "140px", height: "140px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(184,149,74,0.1) 0%, transparent 70%)"
            }}/>

            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span className="section-eyebrow">Preços transparentes</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                color: "#1E2D2A", margin: "0 0 12px"
              }}>
                Sem surpresas, com todo o cuidado
              </h2>
              <p style={{ color: "#5A6B60", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto" }}>
                O valor da recriação de bouquet divide-se em duas partes simples:
              </p>
            </div>

            <div className="pricing-cols" style={{ marginBottom: "26px" }}>
              <div style={{
                backgroundColor: "rgba(61,107,94,0.05)",
                borderRadius: "14px", padding: "22px 18px",
                border: "1px solid rgba(61,107,94,0.1)"
              }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "9px" }}>🌸</div>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.05rem", color: "#1E2D2A", margin: "0 0 8px"
                }}>
                  Flores Frescas
                </h3>
                <p style={{ color: "#5A6B60", fontSize: "0.87rem", lineHeight: 1.7, margin: 0 }}>
                  Orçamentado pela nossa florista parceira conforme as flores do bouquet original.
                  Valor variável conforme a composição.
                </p>
              </div>

              <div style={{
                backgroundColor: "rgba(184,149,74,0.06)",
                borderRadius: "14px", padding: "22px 18px",
                border: "1px solid rgba(184,149,74,0.12)"
              }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "9px" }}>🖼️</div>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.05rem", color: "#1E2D2A", margin: "0 0 8px"
                }}>
                  Preservação & Moldura
                </h3>
                <p style={{ color: "#5A6B60", fontSize: "0.87rem", lineHeight: 1.7, margin: 0 }}>
                  Igual ao nosso preçário base, a partir de 300€. Vidro museu anti-reflexo
                  e proteção UV incluídos em todos os tamanhos.
                </p>
              </div>
            </div>

            <div style={{
              textAlign: "center", paddingTop: "20px",
              borderTop: "1px solid rgba(61,107,94,0.1)"
            }}>
              <p style={{ color: "#5A6B60", fontSize: "0.87rem", margin: "0 0 4px" }}>
                Escolha o tamanho e moldura que preferir.
              </p>
              <a href="/opcoes-e-precos" style={{
                color: "#3D6B5E", fontWeight: "600",
                fontSize: "0.87rem", textDecoration: "none",
                borderBottom: "1px solid rgba(61,107,94,0.35)", paddingBottom: "2px"
              }}>
                Ver todos os preços e tamanhos →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. CTA FINAL — dark botanical
          Texto com keywords para SEO de casamento
      ═══════════════════════════════════════════ */}
      <section
        aria-label="Pedir orçamento para recriação de bouquet de noiva"
        style={{
          padding: "90px 20px",
          background: "linear-gradient(140deg, #0F1E1A 0%, #1E3328 40%, #2D5045 100%)",
          position: "relative", overflow: "hidden", textAlign: "center"
        }}
      >
        {[
          { cls: "drift-a", top: "10%",   left: "4%",   w: "clamp(80px,11vw,120px)", op: 0.14, d: "0s"   },
          { cls: "drift-c", bottom: "8%", right: "5%",  w: "clamp(70px,9vw,100px)",  op: 0.12, d: "1.5s" },
          { cls: "drift-b", top: "22%",   right: "11%", w: "clamp(50px,7vw,80px)",   op: 0.09, d: "0.5s" },
          { cls: "drift-a", bottom: "22%",left: "9%",   w: "clamp(55px,8vw,85px)",   op: 0.1,  d: "3s"   },
        ].map((b, i) => (
          <div aria-hidden="true" key={i} className={b.cls} style={{
            position: "absolute", color: "#8BA888",
            width: b.w, opacity: b.op, pointerEvents: "none",
            ...(b.top    ? { top: b.top }       : {}),
            ...(b.bottom ? { bottom: b.bottom } : {}),
            ...(b.left   ? { left: b.left }     : {}),
            ...(b.right  ? { right: b.right }   : {}),
            animationDelay: b.d
          }}>
            <BotanicalBloom style={{ width: "100%" }}/>
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto" }}
        >
          <p style={{
            fontSize: "0.6rem", letterSpacing: "4px",
            textTransform: "uppercase", fontWeight: "700",
            color: "#8BA888", marginBottom: "16px",
            fontFamily: "Roboto, sans-serif"
          }}>
            Vamos recriar a sua memória
          </p>

          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.9rem, 6vw, 3.8rem)",
            color: "#FAF7F0", margin: "0 0 18px", lineHeight: 1.1
          }}>
            O seu bouquet de noiva<br/>
            <em style={{ fontStyle: "italic", color: "#A8C4A0" }}>
              merece uma segunda vida.
            </em>
          </h2>

          <p style={{
            color: "rgba(250,247,240,0.68)",
            fontSize: "clamp(0.88rem, 2vw, 1rem)",
            lineHeight: 1.85, margin: "0 auto 38px",
            maxWidth: "500px"
          }}>
            Seja para preservar flores de casamento, oferecer um presente de aniversário
            especial, ou reviver uma memória de décadas atrás —
            basta enviar-nos uma fotografia. Resposta em 24 horas.
          </p>

          <div className="cta-row">
            <a
              href="mailto:info@floresabeirario.pt?subject=Orçamento Recriação de Bouquet de Casamento"
              className="btn-primary"
              style={{
                backgroundColor: "#FAF7F0", color: "#1E2D2A",
                boxShadow: "0 6px 28px rgba(250,247,240,0.18)"
              }}
            >
              Enviar Email com Fotos
            </a>
            <a href="/passo-a-passo" className="btn-outline"
              style={{
                borderColor: "rgba(250,247,240,0.35)",
                color: "rgba(250,247,240,0.8)"
              }}>
              Ver o Processo Completo
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
