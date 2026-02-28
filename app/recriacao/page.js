"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Decorative SVG Botanicals ──────────────────────────────────────────────
const Petal = ({ style }) => (
  <svg viewBox="0 0 80 120" style={style} fill="none">
    <path d="M40 110 C10 80 5 40 40 10 C75 40 70 80 40 110Z" fill="currentColor" opacity="0.18"/>
  </svg>
);

const Leaf = ({ style }) => (
  <svg viewBox="0 0 60 100" style={style} fill="none">
    <path d="M30 95 C5 65 8 30 30 5 C52 30 55 65 30 95Z" fill="currentColor" opacity="0.22"/>
    <line x1="30" y1="95" x2="30" y2="5" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
  </svg>
);

const Bloom = ({ style }) => (
  <svg viewBox="0 0 120 120" style={style} fill="none">
    {[0,60,120,180,240,300].map((r,i) => (
      <ellipse key={i} cx="60" cy="60" rx="22" ry="40" fill="currentColor" opacity="0.12"
        transform={`rotate(${r} 60 60) translate(0 -20)`}/>
    ))}
    <circle cx="60" cy="60" r="12" fill="currentColor" opacity="0.2"/>
  </svg>
);

// ── Parallax Section Hook ──────────────────────────────────────────────────
function useParallax(ref, outputRange) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], outputRange);
}

// ── Step Card ─────────────────────────────────────────────────────────────
const StepCard = ({ imageSrc, number, title, desc, delay }) => {
  const ref = useRef(null);
  const imgY = useParallax(ref, ["15%", "-15%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative" }}
    >
      {/* Number badge */}
      <div style={{
        position: "absolute", top: "-18px", left: "50%", transform: "translateX(-50%)",
        zIndex: 10, backgroundColor: "#C23B68", color: "#FFF8F0",
        width: "36px", height: "36px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem",
        boxShadow: "0 4px 20px rgba(194,59,104,0.4)"
      }}>
        {number}
      </div>

      <div style={{
        borderRadius: "24px", overflow: "hidden",
        boxShadow: "0 20px 60px rgba(42,31,45,0.12)",
        backgroundColor: "#fff",
        border: "1px solid rgba(194,59,104,0.08)"
      }}>
        {/* Image with parallax */}
        <div style={{ height: "260px", overflow: "hidden", position: "relative", backgroundColor: "#F9E8F0" }}>
          <motion.img
            src={imageSrc}
            alt={title}
            style={{
              width: "100%", height: "130%", objectFit: "cover",
              display: "block", y: imgY, position: "absolute", top: 0, left: 0
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.6))"
          }}/>
        </div>

        <div style={{ padding: "30px 28px 32px", textAlign: "center" }}>
          <h3 style={{
            fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.4rem",
            color: "#2A1F2D", margin: "0 0 12px"
          }}>
            {title}
          </h3>
          <p style={{ color: "#6B4E5E", lineHeight: "1.75", fontSize: "0.95rem", margin: 0 }}>
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ── Story Card ────────────────────────────────────────────────────────────
const StoryCard = ({ imageSrc, title, desc, delay, accent }) => {
  const ref = useRef(null);
  const imgY = useParallax(ref, ["20%", "-20%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative" }}
    >
      <div style={{
        borderRadius: "32px", overflow: "hidden",
        boxShadow: "0 25px 70px rgba(42,31,45,0.14)",
        position: "relative"
      }}>
        {/* Parallax image */}
        <div style={{ height: "380px", overflow: "hidden", position: "relative", backgroundColor: "#F9E8F0" }}>
          <motion.img
            src={imageSrc}
            alt={title}
            style={{
              width: "100%", height: "140%", objectFit: "cover",
              display: "block", y: imgY, position: "absolute", top: 0, left: 0
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(42,31,45,0.05) 0%, rgba(42,31,45,0.65) 100%)"
          }}/>

          {/* Text overlay */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "30px 28px"
          }}>
            <span style={{
              display: "inline-block", backgroundColor: accent,
              color: "#fff", fontSize: "0.65rem", letterSpacing: "2.5px",
              textTransform: "uppercase", padding: "5px 14px", borderRadius: "50px",
              fontWeight: "700", marginBottom: "12px"
            }}>
              história
            </span>
            <h3 style={{
              fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.55rem",
              color: "#fff", margin: "0 0 10px", lineHeight: "1.15",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}>
              {title}
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.88)", fontSize: "0.9rem",
              lineHeight: "1.65", margin: 0
            }}>
              {desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────
export default function RecriacaoBouquet() {

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "60%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "1",
      title: "A Memória",
      desc: "Envie-nos fotografias do dia onde o bouquet seja visível. Quanto mais detalhes reunir, mais fiel e emocionante será a recriação."
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "2",
      title: "A Recriação",
      desc: "Em parceria com uma florista local, enviamos as imagens e reencaminhamos o orçamento. Após aprovação, a florista cria a réplica perfeita."
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "3",
      title: "A Preservação",
      desc: "Quando as flores chegam, iniciamos a prensagem de cada pétala com o máximo cuidado, eternizando cor e forma."
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "4",
      title: "A Obra de Arte",
      desc: "A composição é criada e enviada para aprovação. Só depois o quadro é emoldurado, devolvendo-lhe um pedaço de história para a sua parede."
    }
  ];

  const stories = [
    {
      imageSrc: "/historia-casamento-antigo.jpg",
      title: "Bodas de Ouro e Prata",
      desc: "Um presente indescritível dos filhos para os pais, trazendo literalmente à vida o ramo de noiva de um casamento celebrado há décadas.",
      accent: "#C9975A"
    },
    {
      imageSrc: "/historia-casamento-recente.jpg",
      title: "A Segunda Oportunidade",
      desc: "Para as noivas que descobriram a preservação tarde demais ou cujo bouquet original não sobreviveu ao dia do casamento.",
      accent: "#C23B68"
    },
    {
      imageSrc: "/historia-aniversario-flores.jpg",
      title: "Aniversários & Surpresas",
      desc: "O presente mais romântico e inesperado para oferecer à sua cara-metade. Uma surpresa que perpetua a promessa de amor.",
      accent: "#8BA888"
    }
  ];

  return (
    <main style={{ backgroundColor: "#FFF8F0", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --rose:   #C23B68;
          --blush:  #F0A8C0;
          --gold:   #C9975A;
          --sage:   #8BA888;
          --cream:  #FFF8F0;
          --dark:   #2A1F2D;
          --mid:    #6B4E5E;
          --soft:   #F9E8F0;
        }

        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(8deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-10deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-28px) rotate(5deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%,100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 8s ease-in-out infinite; }
        .float-c { animation: floatC 5s ease-in-out infinite; }

        .cta-pill {
          display: inline-block;
          background: linear-gradient(135deg, var(--rose) 0%, #A02050 100%);
          color: #FFF8F0;
          padding: 18px 44px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          box-shadow: 0 8px 30px rgba(194,59,104,0.35);
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .cta-pill::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .cta-pill:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 14px 40px rgba(194,59,104,0.45);
        }

        .cta-ghost {
          display: inline-block;
          border: 2px solid var(--rose);
          color: var(--rose);
          padding: 16px 40px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .cta-ghost:hover {
          background: var(--rose);
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(194,59,104,0.3);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
        }
        @media (min-width: 640px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 50px 30px; }
        }
        @media (min-width: 1024px) {
          .steps-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
        }

        .stories-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }
        @media (min-width: 768px) {
          .stories-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .section-label {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--rose);
          background: rgba(194,59,104,0.08);
          padding: 7px 18px;
          border-radius: 50px;
          margin-bottom: 22px;
        }

        .pricing-card {
          background: linear-gradient(135deg, #fff 0%, #FDF0F7 100%);
          border-radius: 28px;
          padding: 50px 40px;
          border: 1px solid rgba(194,59,104,0.1);
          box-shadow: 0 20px 60px rgba(42,31,45,0.08);
          position: relative;
          overflow: hidden;
        }
        .pricing-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(240,168,192,0.3) 0%, transparent 70%);
          border-radius: 50%;
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.7);
          font-size: 0.65rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          z-index: 5;
          animation: shimmer 2s ease-in-out infinite;
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.7), transparent);
          animation: floatA 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .pricing-card { padding: 36px 24px; }
        }
      `}} />

      {/* ═══════════════════════════════════════════════════════
          1. HERO — parallax background + floating botanicals
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          height: "100vh", minHeight: "600px",
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        {/* Parallax background */}
        <motion.div
          style={{
            position: "absolute", inset: "-20%",
            background: "linear-gradient(160deg, #8B2252 0%, #C23B68 30%, #E8829A 55%, #F4B8CC 75%, #FDE8E0 100%)",
            y: heroBgY
          }}
        />

        {/* Grain overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
        }}/>

        {/* Floating botanical decorations */}
        <div className="float-a" style={{ position: "absolute", top: "12%", left: "7%", color: "#FFF8F0", width: 120, zIndex: 2, opacity: 0.5 }}>
          <Bloom style={{ width: "100%" }}/>
        </div>
        <div className="float-b" style={{ position: "absolute", top: "18%", right: "9%", color: "#FFF8F0", width: 80, zIndex: 2, opacity: 0.4 }}>
          <Petal style={{ width: "100%" }}/>
        </div>
        <div className="float-c" style={{ position: "absolute", bottom: "22%", left: "5%", color: "#FFF8F0", width: 70, zIndex: 2, opacity: 0.35 }}>
          <Leaf style={{ width: "100%" }}/>
        </div>
        <div className="float-a" style={{ position: "absolute", bottom: "15%", right: "6%", color: "#FFF8F0", width: 100, zIndex: 2, opacity: 0.45, animationDelay: "1s" }}>
          <Bloom style={{ width: "100%" }}/>
        </div>
        <div className="float-b" style={{ position: "absolute", top: "50%", left: "3%", color: "#FFF8F0", width: 55, zIndex: 2, opacity: 0.3, animationDelay: "2s" }}>
          <Petal style={{ width: "100%" }}/>
        </div>

        {/* Hero text */}
        <motion.div
          style={{
            zIndex: 3, textAlign: "center", color: "#fff",
            padding: "0 20px", y: heroTextY, opacity: heroOpacity,
            maxWidth: "900px"
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: "0.75rem", letterSpacing: "4px", textTransform: "uppercase",
              fontWeight: "700", marginBottom: "24px", opacity: 0.85
            }}
          >
            Um serviço especial
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(3.2rem, 9vw, 6.5rem)",
              lineHeight: 1.05, margin: "0 0 28px",
              textShadow: "0 4px 30px rgba(0,0,0,0.15)"
            }}
          >
            Recriação de<br/>
            <em style={{ fontStyle: "italic" }}>Bouquet</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
              lineHeight: 1.85, maxWidth: "680px",
              margin: "0 auto 40px", opacity: 0.92, fontWeight: "300"
            }}
          >
            O seu dia especial já passou e não teve a oportunidade de preservar o seu bouquet?
            Com apenas uma fotografia, recriamos a magia e eternizamos numa obra de arte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <a
              href="mailto:info@floresabeirario.pt?subject=Pedido de Orçamento - Recriação de Bouquet"
              className="cta-pill"
            >
              Pedir Orçamento
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>scroll</span>
        </div>

        {/* Bottom wave */}
        <div style={{
          position: "absolute", bottom: -2, left: 0, width: "100%", zIndex: 4
        }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40 C360 80 720 0 1080 50 C1260 70 1380 30 1440 40 L1440 80 L0 80 Z" fill="#FFF8F0"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. INTRO PULL-QUOTE
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 20px 100px", position: "relative" }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "30px", right: "5%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,168,192,0.25) 0%, transparent 70%)",
          pointerEvents: "none"
        }}/>
        <div style={{
          position: "absolute", bottom: "20px", left: "3%",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,151,90,0.2) 0%, transparent 70%)",
          pointerEvents: "none"
        }}/>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}
        >
          <div style={{
            width: "60px", height: "1px",
            background: "linear-gradient(to right, transparent, #C23B68, transparent)",
            margin: "0 auto 30px"
          }}/>
          <blockquote style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
            color: "#2A1F2D", lineHeight: 1.35,
            margin: "0 0 24px", fontStyle: "italic"
          }}>
            "Porque algumas flores merecem durar para sempre."
          </blockquote>
          <p style={{ color: "#6B4E5E", lineHeight: 1.8, fontSize: "1.05rem" }}>
            Mesmo que o tempo tenha passado, as memórias não têm prazo de validade.
            A nossa recriação transforma uma fotografia numa obra de arte que lhe devolve
            o que pensava ter perdido para sempre.
          </p>
          <div style={{
            width: "60px", height: "1px",
            background: "linear-gradient(to right, transparent, #C23B68, transparent)",
            margin: "30px auto 0"
          }}/>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. COMO FUNCIONA — 4 steps
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: "60px 20px 120px",
        background: "linear-gradient(180deg, #FFF8F0 0%, #FDE8F0 50%, #FFF8F0 100%)",
        position: "relative", overflow: "hidden"
      }}>
        {/* Big decorative text */}
        <div style={{
          position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)",
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "clamp(80px, 15vw, 160px)",
          color: "rgba(194,59,104,0.04)",
          whiteSpace: "nowrap", pointerEvents: "none",
          lineHeight: 1, userSelect: "none"
        }}>
          Recriação
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "80px" }}
          >
            <span className="section-label">Como funciona</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "#2A1F2D", margin: 0, lineHeight: 1.1
            }}>
              Quatro passos, uma obra de arte
            </h2>
          </motion.div>

          <div className="steps-grid" style={{ alignItems: "start" }}>
            {steps.map((step, i) => (
              <StepCard key={i} {...step} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. HISTÓRIAS — full cards com parallax
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 20px 120px", backgroundColor: "#FFF8F0", position: "relative" }}>
        {/* Side decoration */}
        <div className="float-c" style={{
          position: "absolute", left: "-40px", top: "50%",
          color: "#F0A8C0", width: 180, opacity: 0.3, pointerEvents: "none"
        }}>
          <Bloom style={{ width: "100%" }}/>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "70px" }}
          >
            <span className="section-label">Histórias reais</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              color: "#2A1F2D", margin: 0, lineHeight: 1.1
            }}>
              Histórias que merecem<br/>
              <em style={{ fontStyle: "italic", color: "#C23B68" }}>ser emolduradas</em>
            </h2>
          </motion.div>

          <div className="stories-grid">
            {stories.map((story, i) => (
              <StoryCard key={i} {...story} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. TRANSPARÊNCIA — pricing section
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: "60px 20px 120px",
        background: "linear-gradient(135deg, #FDE8F0 0%, #FFF8F0 60%, #FDE8E0 100%)",
        position: "relative", overflow: "hidden"
      }}>
        {/* Decorative elements */}
        <div className="float-b" style={{
          position: "absolute", right: "-30px", bottom: "10%",
          color: "#C23B68", width: 160, opacity: 0.12, pointerEvents: "none"
        }}>
          <Bloom style={{ width: "100%" }}/>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pricing-card"
          >
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="section-label">Preços transparentes</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#2A1F2D", margin: "0 0 20px"
              }}>
                Sem surpresas, com todo o cuidado
              </h2>
            </div>

            {/* Two columns */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px", marginBottom: "36px"
            }}>
              <div style={{
                backgroundColor: "rgba(194,59,104,0.06)",
                borderRadius: "18px", padding: "28px 24px",
                border: "1px solid rgba(194,59,104,0.12)"
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  backgroundColor: "rgba(194,59,104,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "14px"
                }}>
                  <span style={{ fontSize: "1.2rem" }}>🌸</span>
                </div>
                <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.15rem", color: "#2A1F2D", margin: "0 0 10px" }}>
                  Flores Frescas
                </h4>
                <p style={{ color: "#6B4E5E", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  Orçamentado pela nossa florista parceira conforme as flores do seu bouquet original.
                  Valor variável consoante a composição.
                </p>
              </div>

              <div style={{
                backgroundColor: "rgba(201,151,90,0.07)",
                borderRadius: "18px", padding: "28px 24px",
                border: "1px solid rgba(201,151,90,0.15)"
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  backgroundColor: "rgba(201,151,90,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "14px"
                }}>
                  <span style={{ fontSize: "1.2rem" }}>🖼️</span>
                </div>
                <h4 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.15rem", color: "#2A1F2D", margin: "0 0 10px" }}>
                  Preservação & Moldura
                </h4>
                <p style={{ color: "#6B4E5E", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  Exactamente igual ao nosso preçário base. Vidro museu anti-reflexo e proteção UV
                  incluídos em todos os tamanhos.
                </p>
              </div>
            </div>

            <div style={{
              textAlign: "center",
              padding: "24px 0 0",
              borderTop: "1px solid rgba(194,59,104,0.1)"
            }}>
              <p style={{ color: "#6B4E5E", fontSize: "0.95rem", lineHeight: 1.8, margin: "0 0 6px" }}>
                Escolha o tamanho e moldura que preferir — toda a liberdade é sua.
              </p>
              <a
                href="/opcoes-e-precos"
                style={{ color: "#C23B68", fontWeight: "600", fontSize: "0.9rem", textDecoration: "none", borderBottom: "1px solid rgba(194,59,104,0.4)", paddingBottom: "2px" }}
              >
                Ver todos os preços →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. CTA FINAL — full-bleed romantic
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: "100px 20px",
        background: "linear-gradient(135deg, #2A1F2D 0%, #5C1A38 50%, #8B2252 100%)",
        position: "relative", overflow: "hidden", textAlign: "center"
      }}>
        {/* Floating botanicals */}
        <div className="float-a" style={{
          position: "absolute", top: "10%", left: "4%",
          color: "#F0A8C0", width: 140, opacity: 0.2, pointerEvents: "none"
        }}>
          <Bloom style={{ width: "100%" }}/>
        </div>
        <div className="float-c" style={{
          position: "absolute", bottom: "8%", right: "5%",
          color: "#F0A8C0", width: 110, opacity: 0.18, pointerEvents: "none",
          animationDelay: "1.5s"
        }}>
          <Bloom style={{ width: "100%" }}/>
        </div>
        <div className="float-b" style={{
          position: "absolute", top: "20%", right: "12%",
          color: "#F4B8CC", width: 70, opacity: 0.15, pointerEvents: "none"
        }}>
          <Petal style={{ width: "100%" }}/>
        </div>
        <div className="float-a" style={{
          position: "absolute", bottom: "20%", left: "10%",
          color: "#C9975A", width: 60, opacity: 0.2, pointerEvents: "none",
          animationDelay: "3s"
        }}>
          <Leaf style={{ width: "100%" }}/>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <p style={{
            fontSize: "0.75rem", letterSpacing: "4px", textTransform: "uppercase",
            fontWeight: "700", color: "#F0A8C0", marginBottom: "20px"
          }}>
            Vamos começar?
          </p>
          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            color: "#FFF8F0", margin: "0 0 24px", lineHeight: 1.1
          }}>
            A sua memória está<br/>
            <em style={{ fontStyle: "italic", color: "#F0A8C0" }}>à espera de nós.</em>
          </h2>
          <p style={{
            color: "rgba(255,248,240,0.75)", fontSize: "1.05rem",
            lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 44px"
          }}>
            Envie-nos um e-mail com as fotografias e contamos-lhe tudo sobre como
            podemos recriar o seu bouquet especial.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:info@floresabeirario.pt?subject=Pedido de Orçamento - Recriação de Bouquet"
              className="cta-pill"
              style={{ backgroundColor: "transparent",
                background: "linear-gradient(135deg, #F0A8C0 0%, #C23B68 100%)" }}
            >
              Pedir Orçamento por Email
            </a>
            <a href="/passo-a-passo" className="cta-ghost"
              style={{ borderColor: "rgba(240,168,192,0.5)", color: "#F0A8C0" }}>
              Ver o Processo
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
