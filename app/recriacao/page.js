"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// Note: useScroll/useTransform used only for hero parallax (1 instance = smooth)

// ─────────────────────────────────────────────
// SVG Botanical Decorations
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

// Arrow between steps (desktop only)
const StepArrow = () => (
  <div aria-hidden="true" className="step-arrow">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M6 16 H26 M18 8 L26 16 L18 24"
        stroke="#3D6B5E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
    </svg>
  </div>
);

// ─────────────────────────────────────────────
// Parallax: image always fills container
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// Step Card — CSS hover, no scroll listeners = no lag
// ─────────────────────────────────────────────
const StepCard = ({ imageSrc, number, title, desc, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5%" }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    style={{ position: "relative" }}
  >
    <div style={{
      position: "absolute", top: "-15px", left: "50%",
      transform: "translateX(-50%)", zIndex: 10,
      backgroundColor: "#3D6B5E", color: "#FAF7F0",
      padding: "5px 18px", borderRadius: "50px",
      whiteSpace: "nowrap",
      boxShadow: "0 4px 14px rgba(61,107,94,0.32)"
    }}>
      <span style={{
        fontSize: "0.58rem", fontWeight: "700",
        letterSpacing: "2.5px", textTransform: "uppercase",
        fontFamily: "Roboto, sans-serif"
      }}>
        Passo {number}
      </span>
    </div>

    <div style={{
      borderRadius: "18px", overflow: "hidden",
      boxShadow: "0 14px 44px rgba(30,45,42,0.1)",
      backgroundColor: "#fff",
      border: "1px solid rgba(61,107,94,0.09)"
    }}>
      <div style={{
        height: "220px", overflow: "hidden",
        position: "relative", backgroundColor: "#D4DECC"
      }}>
        <img
          src={imageSrc}
          alt={`Passo ${number} da recriação de bouquet: ${title}`}
          className="step-img"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transition: "transform 0.6s ease",
            willChange: "transform"
          }}
          loading="lazy"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 55%, rgba(30,45,42,0.18))"
        }}/>
      </div>

      <div style={{ padding: "24px 20px 22px", textAlign: "center" }}>
        <h3 style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "1.2rem", color: "#1E2D2A",
          margin: "0 0 9px", lineHeight: "1.2"
        }}>
          {title}
        </h3>
        <p style={{ color: "#5A6B60", lineHeight: "1.72", fontSize: "0.88rem", margin: 0 }}>
          {desc}
        </p>
      </div>
    </div>
  </motion.article>
);

// ─────────────────────────────────────────────
// Use-Case Card — no emojis, no parallax
// ─────────────────────────────────────────────
const UseCaseCard = ({ imageSrc, tag, title, desc, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    style={{
      borderRadius: "20px", overflow: "hidden",
      boxShadow: "0 14px 44px rgba(30,45,42,0.09)",
      backgroundColor: "#fff",
      border: "1px solid rgba(61,107,94,0.07)"
    }}
  >
    <div style={{
      height: "250px", overflow: "hidden",
      position: "relative", backgroundColor: "#C8D8C0"
    }}>
      <img
        src={imageSrc}
        alt={title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        loading="lazy"
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(30,45,42,0.04) 0%, rgba(30,45,42,0.6) 100%)"
      }}/>
      <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
        {tag && (
          <span style={{
            display: "inline-block",
            fontSize: "0.58rem", fontWeight: "700",
            letterSpacing: "2px", textTransform: "uppercase",
            color: "rgba(250,247,240,0.75)",
            border: "1px solid rgba(250,247,240,0.3)",
            padding: "3px 10px", borderRadius: "50px",
            marginBottom: "8px", fontFamily: "Roboto, sans-serif"
          }}>
            {tag}
          </span>
        )}
        <h3 style={{
          fontFamily: "'TAN-MEMORIES', serif",
          fontSize: "1.3rem", color: "#FAF7F0",
          margin: 0, lineHeight: "1.15",
          textShadow: "0 2px 8px rgba(0,0,0,0.2)"
        }}>
          {title}
        </h3>
      </div>
    </div>
    <div style={{ padding: "20px 20px 24px" }}>
      <p style={{ color: "#5A6B60", lineHeight: "1.78", fontSize: "0.9rem", margin: 0 }}>
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
  const heroBgY     = useTransform(heroP, [0, 1], ["0%",   "35%"]);
  const heroTextY   = useTransform(heroP, [0, 1], ["0%",   "50%"]);
  const heroOpacity = useTransform(heroP, [0, 0.85], [1, 0]);

  // Replace with real WhatsApp number
  const whatsappNumber = "351934680300";
  const whatsappMsg = encodeURIComponent("Olá! Gostaria de pedir um orçamento para recriação de bouquet de casamento. Envio fotografias em anexo.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "1",
      title: "A Memória",
      desc: "Envie-nos fotografias do dia em que o bouquet seja visível. Quanto mais ângulos, mais fiel será a recriação do seu ramo de noiva."
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
      tag: "Presente especial",
      title: "Bodas de Ouro ou Prata",
      desc: "Recriar o bouquet do casamento dos pais, décadas depois, com flores frescas iguais às originais — o presente mais tocante que os filhos podem oferecer.",
      delay: 0
    },
    {
      imageSrc: "/historia-casamento-recente.jpg",
      tag: "Segunda oportunidade",
      title: "Quando o Tempo Passou",
      desc: "Para noivas que descobriram a preservação botânica tarde demais, ou cujo bouquet de casamento não sobreviveu ao grande dia.",
      delay: 0.1
    },
    {
      imageSrc: "/historia-aniversario-flores.jpg",
      tag: "Aniversário",
      title: "Surpreenda a sua cara-metade",
      desc: "O presente mais inesperado e romântico para o vosso aniversário de casamento: o ramo de noiva recriado e eternizado numa obra de arte.",
      delay: 0.2
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

        /* Steps grid with arrows */
        .steps-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 50px;
        }
        .step-arrow { display: none; }

        @media (min-width: 600px) {
          .steps-wrapper {
            grid-template-columns: repeat(2, 1fr);
            gap: 44px 22px;
          }
        }
        @media (min-width: 1024px) {
          .steps-wrapper {
            grid-template-columns: repeat(4, 1fr) ;
            gap: 0;
            align-items: start;
            column-gap: 0;
          }
          /* On desktop, lay out as: card arrow card arrow card arrow card */
          /* We use a different approach: CSS grid with arrow columns */
          .steps-wrapper {
            grid-template-columns: 1fr 40px 1fr 40px 1fr 40px 1fr;
          }
          .step-arrow {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 120px; /* vertically center with card image */
          }
        }

        .cases-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 768px) {
          .cases-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .pricing-cols {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 540px) {
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
          padding: 15px 34px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          box-shadow: 0 6px 24px rgba(61,107,94,0.28);
          transition: all 0.3s ease;
          text-align: center;
          font-family: Roboto, sans-serif;
        }
        .btn-primary:hover {
          background-color: var(--green-d);
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(61,107,94,0.36);
        }
        .btn-outline {
          display: inline-block;
          border: 2px solid var(--green);
          color: var(--green);
          padding: 13px 32px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8rem;
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
        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background-color: #25D366;
          color: #fff;
          padding: 15px 34px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          box-shadow: 0 6px 24px rgba(37,211,102,0.3);
          transition: all 0.3s ease;
          text-align: center;
          font-family: Roboto, sans-serif;
        }
        .btn-whatsapp:hover {
          background-color: #1da851;
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(37,211,102,0.38);
        }

        .section-eyebrow {
          display: block;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 12px;
          font-family: Roboto, sans-serif;
        }

        .scroll-hint {
          position: absolute;
          bottom: 34px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          color: rgba(250,247,240,0.5);
          font-size: 0.54rem; letter-spacing: 3px;
          text-transform: uppercase; z-index: 5;
          font-family: Roboto, sans-serif;
        }
        .scroll-line {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, rgba(250,247,240,0.6), transparent);
          animation: driftA 2.2s ease-in-out infinite;
        }
        .step-img:hover { transform: scale(1.04); }

        /* Divider */
        .gold-divider {
          width: 44px; height: 1px;
          background: linear-gradient(to right, transparent, #B8954A, transparent);
          margin: 0 auto;
        }
      `}} />

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        aria-label="Recriação de Bouquet de Casamento"
        style={{
          height: "100vh", minHeight: "580px",
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute", inset: "-25%",
            background: "linear-gradient(155deg, #0F1E1A 0%, #1E3328 20%, #2D5045 45%, #3D6B5E 68%, #6B9B7A 88%, #9EC49A 100%)",
            y: heroBgY
          }}
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
        }}/>

        {/* Floating botanicals */}
        <div aria-hidden="true" className="drift-a" style={{ position:"absolute", top:"10%", left:"5%", color:"#FAF7F0", width:"clamp(80px,13vw,140px)", opacity:0.3, zIndex:2 }}>
          <BotanicalBloom style={{ width:"100%" }}/>
        </div>
        <div aria-hidden="true" className="drift-b" style={{ position:"absolute", top:"14%", right:"7%", color:"#FAF7F0", width:"clamp(50px,8vw,90px)", opacity:0.25, zIndex:2 }}>
          <BotanicalLeaf style={{ width:"100%" }}/>
        </div>
        <div aria-hidden="true" className="drift-c" style={{ position:"absolute", bottom:"16%", left:"4%", color:"#FAF7F0", width:"clamp(55px,9vw,100px)", opacity:0.2, zIndex:2 }}>
          <BotanicalSprig style={{ width:"100%" }}/>
        </div>
        <div aria-hidden="true" className="drift-a" style={{ position:"absolute", bottom:"10%", right:"5%", color:"#FAF7F0", width:"clamp(65px,10vw,120px)", opacity:0.25, zIndex:2, animationDelay:"2s" }}>
          <BotanicalBloom style={{ width:"100%" }}/>
        </div>

        <motion.div style={{
          zIndex:3, textAlign:"center", color:"#FAF7F0",
          padding:"0 20px", y:heroTextY, opacity:heroOpacity,
          maxWidth:"860px", width:"100%"
        }}>
          <motion.p
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.2, duration:0.7 }}
            style={{ fontSize:"clamp(0.58rem,1.4vw,0.7rem)", letterSpacing:"4px", textTransform:"uppercase", fontWeight:"700", marginBottom:"18px", opacity:0.75, fontFamily:"Roboto, sans-serif" }}
          >
            Preservação Botânica · Coimbra, Portugal
          </motion.p>

          <motion.h1
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.35, duration:0.9, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"'TAN-MEMORIES', serif", fontSize:"clamp(3rem,10vw,6.2rem)", lineHeight:1.05, margin:"0 0 20px", textShadow:"0 3px 24px rgba(0,0,0,0.2)" }}
          >
            Recriação de<br/>
            <em style={{ fontStyle:"italic", color:"#A8C4A0" }}>Bouquet</em>
          </motion.h1>

          <motion.p
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.6, duration:0.8 }}
            style={{ fontSize:"clamp(0.95rem,2.2vw,1.15rem)", lineHeight:1.85, maxWidth:"580px", margin:"0 auto 32px", opacity:0.88, fontWeight:"300" }}
          >
            O seu bouquet de noiva não foi preservado a tempo?
            Com apenas uma fotografia, recriamos o ramo com flores frescas
            e eternizamo-lo numa obra de arte botânica.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:14 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.8, duration:0.7 }}
            className="cta-row"
            style={{ justifyContent:"center" }}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a href="mailto:info@floresabeirario.pt?subject=Orçamento Recriação de Bouquet de Casamento" className="btn-primary" style={{ backgroundColor:"rgba(250,247,240,0.15)", border:"1px solid rgba(250,247,240,0.3)", backdropFilter:"blur(8px)" }}>
              Email
            </a>
          </motion.div>
        </motion.div>

        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-line"/>
          <span>scroll</span>
        </div>

        <div aria-hidden="true" style={{ position:"absolute", bottom:-1, left:0, width:"100%", zIndex:4 }}>
          <svg viewBox="0 0 1440 55" fill="none" preserveAspectRatio="none" style={{ display:"block", width:"100%", height:"44px" }}>
            <path d="M0 28 C300 55 660 0 1000 32 C1180 46 1340 12 1440 28 L1440 55 L0 55Z" fill="#FAF7F0"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. COMO FUNCIONA — 4 passos + arrows
      ══════════════════════════════════════ */}
      <section
        aria-label="Como funciona a recriação de bouquet de casamento"
        style={{
          padding: "64px 20px 80px",
          background: "linear-gradient(180deg, #FAF7F0 0%, #EDF2E8 50%, #FAF7F0 100%)",
          position: "relative", overflow: "hidden"
        }}
      >
        <div aria-hidden="true" style={{
          position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          fontFamily:"'TAN-MEMORIES', serif",
          fontSize:"clamp(70px,12vw,130px)",
          color:"rgba(61,107,94,0.045)",
          whiteSpace:"nowrap", pointerEvents:"none",
          lineHeight:1, userSelect:"none"
        }}>
          Processo
        </div>

        <div style={{ maxWidth:"1260px", margin:"0 auto", position:"relative" }}>
          <motion.header
            initial={{ opacity:0, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            style={{ textAlign:"center", marginBottom:"56px" }}
          >
            <span className="section-eyebrow">Como funciona</span>
            <h2 style={{ fontFamily:"'TAN-MEMORIES', serif", fontSize:"clamp(1.9rem,5vw,3.2rem)", color:"#1E2D2A", margin:0, lineHeight:1.1 }}>
              Quatro passos, uma obra de arte
            </h2>
          </motion.header>

          {/* Steps with arrows injected between on desktop */}
          <div className="steps-wrapper">
            {steps.map((step, i) => (
              <>
                <StepCard key={`step-${i}`} {...step} delay={i * 0.1} />
                {i < steps.length - 1 && <StepArrow key={`arrow-${i}`} />}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. PARA QUEM É — use cases
      ══════════════════════════════════════ */}
      <section
        aria-label="Situações em que se usa a recriação de bouquet"
        style={{ padding: "64px 20px 76px", backgroundColor: "#FAF7F0" }}
      >
        <div style={{ maxWidth:"1160px", margin:"0 auto" }}>
          <motion.header
            initial={{ opacity:0, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            style={{ textAlign:"center", marginBottom:"48px" }}
          >
            <span className="section-eyebrow">Para quem é este serviço</span>
            <h2 style={{ fontFamily:"'TAN-MEMORIES', serif", fontSize:"clamp(1.8rem,4.5vw,3rem)", color:"#1E2D2A", margin:0, lineHeight:1.1 }}>
              Memórias que merecem<br/>
              <em style={{ fontStyle:"italic", color:"#3D6B5E" }}>uma segunda vida</em>
            </h2>
          </motion.header>

          <div className="cases-grid">
            {useCases.map((c, i) => (
              <UseCaseCard key={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. PREÇOS
      ══════════════════════════════════════ */}
      <section
        aria-label="Preços da recriação de bouquet"
        style={{
          padding: "56px 20px 76px",
          background: "linear-gradient(135deg, #EDF2E8 0%, #FAF7F0 60%, #F0EBE0 100%)",
          position: "relative", overflow: "hidden"
        }}
      >
        <div aria-hidden="true" className="drift-b" style={{ position:"absolute", right:"-14px", bottom:"8%", color:"#3D6B5E", width:"90px", opacity:0.07, pointerEvents:"none" }}>
          <BotanicalBloom style={{ width:"100%" }}/>
        </div>

        <div style={{ maxWidth:"840px", margin:"0 auto" }}>
          <motion.div
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{
              backgroundColor:"#fff",
              borderRadius:"24px",
              padding:"clamp(24px,5vw,48px) clamp(18px,4vw,42px)",
              boxShadow:"0 12px 48px rgba(30,45,42,0.07)",
              border:"1px solid rgba(61,107,94,0.09)",
              position:"relative", overflow:"hidden"
            }}
          >
            <div aria-hidden="true" style={{ position:"absolute", top:"-32px", right:"-32px", width:"120px", height:"120px", borderRadius:"50%", background:"radial-gradient(circle, rgba(184,149,74,0.1) 0%, transparent 70%)" }}/>

            <div style={{ textAlign:"center", marginBottom:"26px" }}>
              <span className="section-eyebrow">Preços transparentes</span>
              <h2 style={{ fontFamily:"'TAN-MEMORIES', serif", fontSize:"clamp(1.45rem,3.5vw,2.3rem)", color:"#1E2D2A", margin:"0 0 10px" }}>
                Sem surpresas, com todo o cuidado
              </h2>
              <p style={{ color:"#5A6B60", fontSize:"0.88rem", lineHeight:1.75, maxWidth:"480px", margin:"0 auto" }}>
                O valor divide-se em duas partes simples e sempre comunicadas antes de avançar:
              </p>
            </div>

            <div className="pricing-cols" style={{ marginBottom:"22px" }}>
              <div style={{ backgroundColor:"rgba(61,107,94,0.05)", borderRadius:"12px", padding:"20px 16px", border:"1px solid rgba(61,107,94,0.09)" }}>
                <h3 style={{ fontFamily:"'TAN-MEMORIES', serif", fontSize:"1rem", color:"#1E2D2A", margin:"0 0 7px" }}>
                  Flores Frescas
                </h3>
                <p style={{ color:"#5A6B60", fontSize:"0.85rem", lineHeight:1.7, margin:0 }}>
                  Orçamentado pela florista parceira com base nas flores do bouquet original. Valor variável conforme a composição.
                </p>
              </div>
              <div style={{ backgroundColor:"rgba(184,149,74,0.06)", borderRadius:"12px", padding:"20px 16px", border:"1px solid rgba(184,149,74,0.11)" }}>
                <h3 style={{ fontFamily:"'TAN-MEMORIES', serif", fontSize:"1rem", color:"#1E2D2A", margin:"0 0 7px" }}>
                  Preservação & Moldura
                </h3>
                <p style={{ color:"#5A6B60", fontSize:"0.85rem", lineHeight:1.7, margin:0 }}>
                  Igual ao preçário base do atelier, a partir de 300€. Vidro museu anti-reflexo e proteção UV incluídos.
                </p>
              </div>
            </div>

            <div style={{ textAlign:"center", paddingTop:"18px", borderTop:"1px solid rgba(61,107,94,0.09)" }}>
              <a href="/opcoes-e-precos" style={{ color:"#3D6B5E", fontWeight:"600", fontSize:"0.85rem", textDecoration:"none", borderBottom:"1px solid rgba(61,107,94,0.3)", paddingBottom:"2px" }}>
                Ver todos os preços e tamanhos →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. CTA FINAL
      ══════════════════════════════════════ */}
      <section
        aria-label="Pedir orçamento para recriação de bouquet de noiva"
        style={{
          padding: "80px 20px",
          background: "linear-gradient(140deg, #0F1E1A 0%, #1E3328 40%, #2D5045 100%)",
          position: "relative", overflow: "hidden", textAlign: "center"
        }}
      >
        {[
          { cls:"drift-a", top:"10%",   left:"4%",   w:"clamp(75px,10vw,115px)", op:0.13, d:"0s"   },
          { cls:"drift-c", bottom:"8%", right:"5%",  w:"clamp(65px,9vw,100px)",  op:0.11, d:"1.5s" },
          { cls:"drift-b", top:"22%",   right:"11%", w:"clamp(48px,7vw,75px)",   op:0.09, d:"0.5s" },
          { cls:"drift-a", bottom:"22%",left:"9%",   w:"clamp(52px,7vw,80px)",   op:0.1,  d:"3s"   },
        ].map((b, i) => (
          <div aria-hidden="true" key={i} className={b.cls} style={{
            position:"absolute", color:"#8BA888",
            width:b.w, opacity:b.op, pointerEvents:"none",
            ...(b.top    ? { top:b.top }       : {}),
            ...(b.bottom ? { bottom:b.bottom } : {}),
            ...(b.left   ? { left:b.left }     : {}),
            ...(b.right  ? { right:b.right }   : {}),
            animationDelay:b.d
          }}>
            <BotanicalBloom style={{ width:"100%" }}/>
          </div>
        ))}

        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
          style={{ position:"relative", zIndex:2, maxWidth:"660px", margin:"0 auto" }}
        >
          <p style={{ fontSize:"0.58rem", letterSpacing:"4px", textTransform:"uppercase", fontWeight:"700", color:"#8BA888", marginBottom:"14px", fontFamily:"Roboto, sans-serif" }}>
            Vamos recriar a sua memória
          </p>

          <h2 style={{ fontFamily:"'TAN-MEMORIES', serif", fontSize:"clamp(1.8rem,5.5vw,3.6rem)", color:"#FAF7F0", margin:"0 0 16px", lineHeight:1.1 }}>
            O seu bouquet de noiva<br/>
            <em style={{ fontStyle:"italic", color:"#A8C4A0" }}>merece uma segunda vida.</em>
          </h2>

          <p style={{ color:"rgba(250,247,240,0.66)", fontSize:"clamp(0.88rem,2vw,0.98rem)", lineHeight:1.85, margin:"0 auto 34px", maxWidth:"480px" }}>
            Seja para preservar flores de casamento, oferecer um presente de aniversário
            especial ou reviver uma memória de décadas atrás —
            basta enviar-nos as fotos. Resposta em 24 horas.
          </p>

          <div className="cta-row">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar Fotos via WhatsApp
            </a>
            <a href="mailto:info@floresabeirario.pt?subject=Orçamento Recriação de Bouquet de Casamento" className="btn-outline"
              style={{ borderColor:"rgba(250,247,240,0.3)", color:"rgba(250,247,240,0.75)" }}>
              Enviar por Email
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
