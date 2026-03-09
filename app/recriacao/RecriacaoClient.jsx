// app/recriacao/RecriacaoClient.jsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// SVG Decorativos

const BotanicalBloom = ({ style }) => (
  <svg viewBox="0 0 140 140" style={style} fill="none" aria-hidden="true">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((r, i) => (
      <ellipse key={i} cx="70" cy="70" rx="16" ry="38"
        fill="currentColor" opacity="0.12"
        transform={`rotate(${r} 70 70) translate(0 -22)`} />
    ))}
    <circle cx="70" cy="70" r="10" fill="currentColor" opacity="0.22" />
  </svg>
);

const StepArrowRight = () => (
  <div aria-hidden="true" className="step-arrow-right">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M6 16 H26 M18 8 L26 16 L18 24"
        stroke="#8B6914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  </div>
);

const StepArrowDown = () => (
  <div aria-hidden="true" className="step-arrow-down">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 6 V26 M8 18 L16 26 L24 18"
        stroke="#8B6914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  </div>
);

// StepCard: numero no topo discreto, titulo e texto no fundo da foto

const StepCard = ({ imageSrc, number, title, desc, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5%" }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    {/* Numero fora da imagem, bem visivel */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", paddingLeft: "2px" }}>
      <span style={{
        fontFamily: "Roboto, sans-serif",
        fontSize: "0.6rem", fontWeight: "700", letterSpacing: "2.5px",
        textTransform: "uppercase", color: "#8B6914",
      }}>
        Passo {number}
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(139,105,20,0.2)" }} />
    </div>

    <div style={{
      borderRadius: "18px", overflow: "hidden",
      boxShadow: "0 14px 44px rgba(30,20,10,0.13)",
      width: "100%",
      position: "relative",
    }}>
      <div style={{ height: "360px", overflow: "hidden", position: "relative", backgroundColor: "#D4C8B0" }}>
        <img
          src={imageSrc}
          alt={`Passo ${number} da recriacao de bouquet: ${title}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
          loading="lazy"
        />
        {/* gradiente fundo forte para texto */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(20,12,4,0.94) 100%)" }} />

        {/* Titulo e descricao na base da foto */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 20px 22px",
        }}>
          <h3 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "1.25rem",
            color: "#FAF5EC",
            margin: "0 0 8px",
            lineHeight: 1.15,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}>
            {title}
          </h3>
          <p
            style={{
              color: "rgba(250,245,236,0.82)",
              lineHeight: 1.68,
              fontSize: "0.82rem",
              margin: 0,
              textShadow: "0 1px 6px rgba(0,0,0,0.4)",
            }}
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
      </div>
    </div>
  </motion.article>
);

// UseCaseCard

const UseCaseCard = ({ imageSrc, tag, title, desc, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 14px 44px rgba(30,20,10,0.1)", backgroundColor: "#fff", border: "1px solid rgba(139,105,20,0.08)" }}
  >
    <div style={{ height: "250px", overflow: "hidden", position: "relative", backgroundColor: "#C8B890" }}>
      <img src={imageSrc} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,12,4,0.04) 0%, rgba(20,12,4,0.62) 100%)" }} />
      <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
        {tag && (
          <span style={{ display: "inline-block", fontSize: "0.55rem", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(250,230,160,0.85)", border: "1px solid rgba(250,230,160,0.35)", padding: "3px 10px", borderRadius: "50px", marginBottom: "8px", fontFamily: "Roboto, sans-serif" }}>
            {tag}
          </span>
        )}
        <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.3rem", color: "#FAF7F0", margin: 0, lineHeight: 1.15, textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          {title}
        </h3>
      </div>
    </div>
    <div style={{ padding: "20px 20px 24px" }}>
      <p
        style={{ color: "#5A4A30", lineHeight: 1.78, fontSize: "0.9rem", margin: 0 }}
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </div>
  </motion.article>
);

// Page Client

export default function RecriacaoClient() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY     = useTransform(heroP, [0, 1], ["0%", "25%"]);
  const heroTextY   = useTransform(heroP, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroP, [0, 0.85], [1, 0]);

  const whatsappUrl = `https://wa.me/351934680300?text=${encodeURIComponent("Olá! Gostaria que recriassem num quadro o seguinte bouquet. Envio fotografias em anexo.")}`;
  const whatsappUrlRecriacao = `https://wa.me/351934680300?text=${encodeURIComponent("Olá! Gostaria que recriassem num quadro o seguinte bouquet. Envio fotografias em anexo.")}`;

  const steps = [
    {
      imageSrc: "/recriacao-passo1-foto.jpg",
      number: "1",
      title: "A Memória",
      desc: "Envie-nos <strong>fotografias do dia</strong> em que o bouquet seja visível. Quanto mais ângulos, mais fiel será a recriação do seu ramo de noiva.",
    },
    {
      imageSrc: "/recriacao-passo2-flores.jpg",
      number: "2",
      title: "A Recriação",
      desc: "Em parceria com uma <strong>florista local</strong>, recriamos o seu bouquet com flores frescas. Aprovação prévia do orçamento garantida.",
    },
    {
      imageSrc: "/recriacao-passo3-prensagem.jpg",
      number: "3",
      title: "A Prensagem",
      desc: "Cada pétala é prensada com <strong>técnicas artesanais de preservação botânica</strong>, mantendo forma e cor o máximo possível.",
    },
    {
      imageSrc: "/recriacao-passo4-quadro.jpg",
      number: "4",
      title: "A Obra de Arte",
      desc: "Enviamos fotografia da composição para <strong>aprovação prévia</strong>. Só depois o quadro é emoldurado com vidro museu anti-reflexo e proteção UV.",
    },
  ];

  const useCases = [
    {
      imageSrc: "/historia-casamento-antigo.jpg",
      tag: "Presente especial",
      title: "Bodas de Ouro ou Prata",
      desc: "Recriar o bouquet do casamento dos pais, décadas depois, com <strong>flores frescas iguais às originais</strong>. O presente mais tocante que os filhos podem oferecer.",
      delay: 0,
    },
    {
      imageSrc: "/historia-casamento-recente.jpg",
      tag: "Segunda oportunidade",
      title: "Quando o Tempo Passou",
      desc: "Para noivas que descobriram a preservação botânica <strong>tarde demais</strong>, ou cujo bouquet de casamento não sobreviveu ao grande dia.",
      delay: 0.1,
    },
    {
      imageSrc: "/historia-aniversario-flores.jpg",
      tag: "Aniversário",
      title: "Surpreenda a sua cara-metade",
      desc: "O presente mais inesperado e romântico para o vosso aniversário de casamento: o <strong>ramo de noiva recriado e eternizado</strong> numa obra de arte.",
      delay: 0.2,
    },
  ];

  const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

  return (
    <main style={{ backgroundColor: "#FAF5EC", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }
        :root {
          --amber: #8B6914;
          --amber-d: #5C4409;
          --amber-l: #C4A44A;
          --terra: #A0622A;
          --cream: #FAF5EC;
          --mid: #5A4A30;
          --dark: #2A1E0A;
        }

        @keyframes driftA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(6deg)} }
        @keyframes driftB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(-8deg)} }
        @keyframes driftC { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-24px) rotate(4deg)} }
        .drift-a { animation: driftA 7s ease-in-out infinite; }
        .drift-b { animation: driftB 9s ease-in-out infinite; }
        .drift-c { animation: driftC 6s ease-in-out infinite; }

        .steps-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .step-item { width: 100%; max-width: 420px; }
        .step-arrow-right { display: none; }
        .step-arrow-down {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px 0;
        }
        @media (min-width: 1024px) {
          .steps-wrapper {
            display: grid;
            grid-template-columns: 1fr 40px 1fr 40px 1fr 40px 1fr;
            gap: 0;
            align-items: start;
            flex-direction: unset;
          }
          .step-item { max-width: unset; width: 100%; }
          .step-arrow-right {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 180px;
          }
          .step-arrow-down { display: none; }
        }

        .cases-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
        @media (min-width: 768px) { .cases-grid { grid-template-columns: repeat(3,1fr); } }

        .pricing-cols { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 540px) { .pricing-cols { grid-template-columns: repeat(2,1fr); } }

        .cta-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
        @media (min-width: 460px) {
          .cta-row { flex-direction: row; justify-content: center; align-items: center; }
        }

        /* Botao WhatsApp hero: pequeno e discreto */
        .btn-wa-hero {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          background: rgba(250,245,236,0.1);
          color: rgba(250,245,236,0.82);
          padding: 10px 20px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 400;
          font-size: 0.7rem;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          border: 1px solid rgba(250,245,236,0.22);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
          white-space: nowrap;
        }
        .btn-wa-hero:hover { background: rgba(250,245,236,0.18); transform: translateY(-2px); }

        /* WhatsApp nas outras seccoes: verde */
        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background: #25D366;
          color: #fff;
          padding: 13px 26px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          box-shadow: 0 6px 24px rgba(37,211,102,0.3);
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
          white-space: nowrap;
        }
        .btn-whatsapp:hover { background: #1da851; transform: translateY(-2px); }

        .btn-outline-light {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid rgba(250,245,236,0.32);
          color: rgba(250,245,236,0.75);
          padding: 11px 24px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.75rem;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
          white-space: nowrap;
        }
        .btn-outline-light:hover { background: rgba(250,245,236,0.1); transform: translateY(-2px); }

        .section-eyebrow {
          display: block;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 12px;
          font-family: Roboto, sans-serif;
        }
      `}} />

      {/* 1. HERO */}
      <section
        ref={heroRef}
        aria-label="Recriacao de Bouquet de Casamento"
        style={{ height: "100vh", minHeight: "580px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <motion.div
          aria-hidden="true"
          style={{ position: "absolute", inset: "-20%", backgroundImage: "url('/sandra2.webp')", backgroundSize: "cover", backgroundPosition: "center", y: heroBgY }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(20,12,4,0.28) 0%, rgba(20,12,4,0.5) 60%, rgba(20,12,4,0.7) 100%)" }} />

        <motion.div style={{ zIndex: 3, textAlign: "center", color: "#FAF5EC", padding: "0 20px", y: heroTextY, opacity: heroOpacity, maxWidth: "860px", width: "100%" }}>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            style={{ fontSize: "clamp(0.52rem,1.3vw,0.62rem)", letterSpacing: "4px", textTransform: "uppercase", fontWeight: "700", marginBottom: "18px", opacity: 0.6, fontFamily: "Roboto, sans-serif" }}
          >
            A beleza do passado, a florescer no presente
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3rem,10vw,6.2rem)", lineHeight: 1.05, margin: "0 0 20px", textShadow: "0 3px 24px rgba(0,0,0,0.3)" }}
          >
            Recria&ccedil;&atilde;o de<br />
            <em style={{ fontStyle: "italic", color: "#F0CC70" }}>Bouquet</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            style={{ fontSize: "clamp(0.95rem,2.2vw,1.15rem)", lineHeight: 1.85, maxWidth: "560px", margin: "0 auto 30px", opacity: 0.88, fontWeight: "300" }}
          >
            O seu bouquet de noiva n&atilde;o foi preservado a tempo?
            Com apenas uma fotografia, recriamos o ramo com flores frescas
            e eternizamo-lo numa obra de arte bot&acirc;nica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-wa-hero">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
              Envie-nos fotos do seu bouquet
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. PASSOS */}
      <section
        aria-label="Como funciona a recriacao de bouquet de casamento"
        style={{ padding: "64px 20px 80px", background: "linear-gradient(180deg, #FAF5EC 0%, #F0E8D0 50%, #FAF5EC 100%)", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(70px,12vw,130px)", color: "rgba(139,105,20,0.05)", whiteSpace: "nowrap", pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>
          Processo
        </div>
        <div style={{ maxWidth: "1260px", margin: "0 auto", position: "relative" }}>
          <motion.header initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-eyebrow">Como funciona</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.9rem,5vw,3.2rem)", color: "#2A1E0A", margin: 0, lineHeight: 1.1 }}>
              Quatro passos, uma obra de arte
            </h2>
          </motion.header>

          <div className="steps-wrapper">
            {steps.map((step, i) => (
              <>
                <div key={`step-${i}`} className="step-item">
                  <StepCard {...step} delay={i * 0.1} />
                </div>
                {i < steps.length - 1 && (
                  <>
                    <StepArrowRight key={`arrow-right-${i}`} />
                    <StepArrowDown key={`arrow-down-${i}`} />
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PARA QUEM E */}
      <section
        aria-label="Situacoes em que se usa a recriacao de bouquet"
        style={{ padding: "36px 20px 76px", backgroundColor: "#FAF5EC" }}
      >
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <motion.header initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "28px" }}>
            <span className="section-eyebrow">Para quem é este servi&ccedil;o</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,3rem)", color: "#2A1E0A", margin: 0, lineHeight: 1.1 }}>
              Mem&oacute;rias que merecem<br />
              <em style={{ fontStyle: "italic", color: "#8B6914" }}>uma segunda vida</em>
            </h2>
          </motion.header>
          <div className="cases-grid">
            {useCases.map((c, i) => <UseCaseCard key={i} {...c} />)}
          </div>
        </div>
      </section>

      {/* 4. PRECOS */}
      <section
        aria-label="Precos da recriacao de bouquet"
        style={{ padding: "56px 20px 76px", background: "linear-gradient(135deg, #F0E8D0 0%, #FAF5EC 60%, #EDE0C4 100%)", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden="true" className="drift-b" style={{ position: "absolute", right: "-14px", bottom: "8%", color: "#8B6914", width: "90px", opacity: 0.07, pointerEvents: "none" }}>
          <BotanicalBloom style={{ width: "100%" }} />
        </div>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: "#fff", borderRadius: "24px", padding: "clamp(24px,5vw,48px) clamp(18px,4vw,42px)", boxShadow: "0 12px 48px rgba(30,20,5,0.08)", border: "1px solid rgba(139,105,20,0.1)", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: "-32px", right: "-32px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,164,74,0.12) 0%, transparent 70%)" }} />
            <div style={{ textAlign: "center", marginBottom: "26px" }}>
              <span className="section-eyebrow">Pre&ccedil;os transparentes</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.45rem,3.5vw,2.3rem)", color: "#2A1E0A", margin: "0 0 10px" }}>
                Sem surpresas, com todo o cuidado
              </h2>
              <p style={{ color: "#5A4A30", fontSize: "0.88rem", lineHeight: 1.75, maxWidth: "480px", margin: "0 auto" }}>
                O valor divide-se em duas partes simples e sempre comunicadas antes de avan&ccedil;ar:
              </p>
            </div>
            <div className="pricing-cols" style={{ marginBottom: "22px" }}>
              <div style={{ backgroundColor: "rgba(139,105,20,0.05)", borderRadius: "12px", padding: "20px 16px", border: "1px solid rgba(139,105,20,0.1)" }}>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem", color: "#2A1E0A", margin: "0 0 7px" }}>Flores Frescas</h3>
                <p style={{ color: "#5A4A30", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
                  Or&ccedil;amentado pela <strong>florista parceira</strong> com base nas flores do bouquet original. Valor vari&aacute;vel conforme a composi&ccedil;&atilde;o.
                </p>
              </div>
              <div style={{ backgroundColor: "rgba(196,164,74,0.07)", borderRadius: "12px", padding: "20px 16px", border: "1px solid rgba(196,164,74,0.14)" }}>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1rem", color: "#2A1E0A", margin: "0 0 7px" }}>Preserva&ccedil;&atilde;o e Moldura</h3>
                <p style={{ color: "#5A4A30", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
                  Igual ao pre&ccedil;&aacute;rio base da{" "}
                  <a href="/opcoes-e-precos" style={{ color: "#8B6914", fontWeight: "600", textDecoration: "none", borderBottom: "1px solid rgba(139,105,20,0.4)", paddingBottom: "1px" }}>
                    preserva&ccedil;&atilde;o de flores
                  </a>
                  , <strong>a partir de 300&euro;</strong>. Vidro museu anti-reflexo e prote&ccedil;&atilde;o UV inclu&iacute;dos.
                </p>
              </div>
            </div>
            <div style={{ textAlign: "center", paddingTop: "18px", borderTop: "1px solid rgba(139,105,20,0.1)" }}>
              <a href="/opcoes-e-precos" style={{ color: "#8B6914", fontWeight: "600", fontSize: "0.85rem", textDecoration: "none", borderBottom: "1px solid rgba(139,105,20,0.35)", paddingBottom: "2px" }}>
                Ver todos os pre&ccedil;os e tamanhos
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section
        aria-label="Pedir orcamento para recriacao de bouquet de noiva"
        style={{ padding: "80px 20px", background: "linear-gradient(140deg, #1A0E02 0%, #2E1E06 40%, #4A3010 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}
      >
        {[
          { cls: "drift-a", top: "10%",    left: "4%",   w: "clamp(75px,10vw,115px)", op: 0.13, d: "0s"   },
          { cls: "drift-c", bottom: "8%",  right: "5%",  w: "clamp(65px,9vw,100px)",  op: 0.11, d: "1.5s" },
          { cls: "drift-b", top: "22%",    right: "11%", w: "clamp(48px,7vw,75px)",   op: 0.09, d: "0.5s" },
          { cls: "drift-a", bottom: "22%", left: "9%",   w: "clamp(52px,7vw,80px)",   op: 0.1,  d: "3s"   },
        ].map((b, i) => (
          <div aria-hidden="true" key={i} className={b.cls} style={{ position: "absolute", color: "#C4A44A", width: b.w, opacity: b.op, pointerEvents: "none", animationDelay: b.d, ...(b.top ? { top: b.top } : {}), ...(b.bottom ? { bottom: b.bottom } : {}), ...(b.left ? { left: b.left } : {}), ...(b.right ? { right: b.right } : {}) }}>
            <BotanicalBloom style={{ width: "100%" }} />
          </div>
        ))}

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 2, maxWidth: "660px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.55rem", letterSpacing: "4px", textTransform: "uppercase", fontWeight: "700", color: "#C4A44A", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>
            Vamos recriar a sua mem&oacute;ria
          </p>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,5.5vw,3.6rem)", color: "#FAF5EC", margin: "0 0 16px", lineHeight: 1.1 }}>
            O seu bouquet de noiva<br />
            <em style={{ fontStyle: "italic", color: "#F0CC70" }}>merece uma segunda vida.</em>
          </h2>
          <p style={{ color: "rgba(250,245,236,0.66)", fontSize: "clamp(0.88rem,2vw,0.98rem)", lineHeight: 1.85, margin: "0 auto 34px", maxWidth: "480px" }}>
            Seja para preservar flores de casamento, oferecer um <strong style={{ color: "rgba(250,245,236,0.85)" }}>presente de aniversário especial</strong> ou reviver uma memória de décadas atrás,
            basta enviar-nos as fotos.
          </p>
          <div className="cta-row">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
              Enviar Fotos via WhatsApp
            </a>
            <a href="mailto:info@floresabeirario.pt?subject=Or%C3%A7amento%20Recria%C3%A7%C3%A3o%20de%20Bouquet" className="btn-outline-light">
              Enviar por Email
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
