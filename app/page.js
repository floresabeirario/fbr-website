"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ─── Step Card ────────────────────────────────────────────────────────────────
const StepCard = ({ number, title, desc, imageSrc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    style={{ borderLeft: "1px solid rgba(61,107,94,0.15)", paddingLeft: "clamp(20px,3vw,32px)" }}
  >
    <span style={{
      display: "block",
      fontFamily: "'TAN-MEMORIES', serif",
      fontSize: "clamp(2.5rem,5vw,3.8rem)",
      color: "#3D6B5E", opacity: 0.18,
      lineHeight: 1, marginBottom: "12px"
    }}>
      {number}
    </span>

    {/* Step photo */}
    <div style={{
      width: "100%", aspectRatio: "4/3",
      borderRadius: "14px", overflow: "hidden",
      marginBottom: "20px", backgroundColor: "#D4DECC"
    }}>
      <img
        src={imageSrc}
        alt={title}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          display: "block", transition: "transform 0.6s ease"
        }}
        loading="lazy"
        className="step-photo"
      />
    </div>

    <h3 style={{
      fontFamily: "'TAN-MEMORIES', serif",
      fontSize: "clamp(1.2rem,2.5vw,1.5rem)",
      color: "#1E2D2A", margin: "0 0 10px", lineHeight: 1.2
    }}>
      {title}
    </h3>
    <p style={{ color: "#5A6B60", lineHeight: 1.78, fontSize: "0.92rem", margin: 0 }}>
      {desc}
    </p>
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const reviewRef = useRef(null);
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const titleY       = useTransform(scrollY, [0, 200], [0, -55]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (reviewRef.current && !reviewRef.current.querySelector("script")) {
      const s = document.createElement("script");
      s.src = "https://cdn.trustindex.io/loader.js?6897287659a84643ca864d340dd";
      s.async = true; s.defer = true;
      reviewRef.current.appendChild(s);
    }
  }, []);

  const FORM_URL   = "https://wkf.ms/3RfoNAc";
  const WA_URL     = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre a preservação das minhas flores.");
  const WA_NOIVA   = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Vou casar em breve e gostaria de reservar a preservação do meu bouquet.");

  const steps = [
    {
      number: "01",
      title: "Reserve a sua data",
      desc: "As vagas são limitadas. Preencha o formulário de reserva com os detalhes do seu evento e garantimos a sua vaga com antecedência.",
      imageSrc: "/recriacao-passo1-foto.jpg"
    },
    {
      number: "02",
      title: "Entregue as flores",
      desc: "Entrega em mãos no atelier, envio por CTT ou recolha no local do evento. Preferencialmente até 3 dias após o grande dia.",
      imageSrc: "/recriacao-passo2-flores.jpg"
    },
    {
      number: "03",
      title: "Recebe a sua obra de arte",
      desc: "Após aprovação da composição, o quadro é emoldurado com vidro museu anti-UV e enviado para casa ou levantado no atelier.",
      imageSrc: "/recriacao-passo4-quadro.jpg"
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
          50%      { transform: translateY(-16px) rotate(5deg); }
        }
        .drift-a { animation: driftA 8s ease-in-out infinite; }

        .section-eyebrow {
          display: block;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: var(--terra); margin-bottom: 12px;
          font-family: Roboto, sans-serif;
        }

        /* Ghost buttons — both transparent */
        .btn-ghost {
          display: inline-block;
          border: 1.5px solid rgba(250,247,240,0.55);
          color: rgba(250,247,240,0.92);
          padding: 14px 32px; border-radius: 100px;
          text-decoration: none; font-weight: 600;
          font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; text-align: center;
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
          backdrop-filter: blur(8px);
          background: rgba(250,247,240,0.08);
        }
        .btn-ghost:hover {
          background: rgba(250,247,240,0.2);
          border-color: rgba(250,247,240,0.85);
          color: #FAF7F0;
          transform: translateY(-3px);
        }

        .btn-primary {
          display: inline-block;
          background-color: var(--green); color: var(--cream);
          padding: 15px 34px; border-radius: 100px;
          text-decoration: none; font-weight: 600;
          font-size: 0.8rem; letter-spacing: 1.5px;
          text-transform: uppercase; text-align: center;
          box-shadow: 0 6px 24px rgba(61,107,94,0.28);
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
        }
        .btn-primary:hover {
          background-color: var(--green-d);
          transform: translateY(-3px);
        }
        .btn-outline {
          display: inline-block;
          border: 2px solid var(--green); color: var(--green);
          padding: 13px 32px; border-radius: 100px;
          text-decoration: none; font-weight: 600;
          font-size: 0.8rem; letter-spacing: 1.5px;
          text-transform: uppercase; text-align: center;
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
        }
        .btn-outline:hover {
          background-color: var(--green); color: var(--cream);
          transform: translateY(-3px);
        }
        .btn-ghost-dark {
          display: inline-block;
          border: 1.5px solid rgba(30,45,42,0.25); color: var(--green-d);
          padding: 13px 30px; border-radius: 100px;
          text-decoration: none; font-weight: 600;
          font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; text-align: center;
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
        }
        .btn-ghost-dark:hover {
          background: rgba(30,45,42,0.06);
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-3px);
        }

        /* Step photo hover */
        .step-photo:hover { transform: scale(1.04); }

        /* CTA rows */
        .cta-row {
          display: flex; flex-direction: column;
          align-items: stretch; gap: 12px;
        }
        @media (min-width: 460px) {
          .cta-row { flex-direction: row; justify-content: center; align-items: center; }
        }

        /* Steps grid */
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 640px) {
          .steps-grid { grid-template-columns: repeat(3,1fr); gap: 0; }
        }

        /* Services grid */
        .services-grid {
          display: grid; grid-template-columns: 1fr; gap: 14px;
        }
        @media (min-width: 640px) {
          .services-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (min-width: 1024px) {
          .services-grid { grid-template-columns: repeat(3,1fr); }
        }

        /* CTA Split — full viewport width */
        .cta-split {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .cta-split { grid-template-columns: 1fr 1fr; }
        }

        /* Vale-presente video */
        .vale-grid {
          display: grid; grid-template-columns: 1fr; gap: 40px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .vale-grid { grid-template-columns: 1fr 1fr; gap: 64px; }
        }

        .scroll-hint {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          color: rgba(250,247,240,0.5);
          font-size: 0.54rem; letter-spacing: 3px;
          text-transform: uppercase; z-index: 5;
          font-family: Roboto, sans-serif;
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.5; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(0.7); }
        }
        .scroll-line {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, rgba(250,247,240,0.65), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
      `}} />

      {/* ════════════════════════════════════════════
          1. HERO — video, two ghost buttons, no wave
      ════════════════════════════════════════════ */}
      <section
        aria-label="Flores à Beira-Rio — Preservação de flores de casamento"
        style={{
          height: "100vh", minHeight: "580px",
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        <video
          autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          aria-hidden="true"
        >
          <source src="/hero-video.webm" type="video/webm"/>
          <source src="/hero-video.mp4"  type="video/mp4"/>
        </video>

        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(15,30,26,0.15) 0%, rgba(15,30,26,0.5) 65%, rgba(15,30,26,0.72) 100%)"
        }}/>

        <motion.div
          style={{
            zIndex: 2, textAlign: "center", color: "#FAF7F0",
            padding: "0 20px", opacity: titleOpacity, y: titleY,
            width: "100%", maxWidth: "1050px"
          }}
        >
          {/* Single line above — "Especialistas em preservação de flores" */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            style={{
              fontSize: "clamp(0.62rem,1.5vw,0.78rem)",
              letterSpacing: "clamp(3px,1vw,6px)",
              textTransform: "uppercase", fontWeight: "300",
              marginBottom: "clamp(24px,3.5vw,36px)", opacity: 0.82
            }}
          >
            Especialistas em preservação de flores
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
              lineHeight: 1.0, margin: "0 0 clamp(28px,4vw,44px)",
              textShadow: "0 4px 30px rgba(0,0,0,0.18)"
            }}
          >
            Flores à <span style={{ whiteSpace: "nowrap" }}>Beira&#8209;Rio</span>
          </motion.h1>

          {/* Two ghost CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="cta-row"
            style={{ justifyContent: "center" }}
          >
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Reservar Data
            </a>
            <a href="/passo-a-passo" className="btn-ghost">
              Como Funciona
            </a>
          </motion.div>
        </motion.div>

        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-line"/>
          <span>scroll</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. O QUE FAZEMOS — 3 service cards
      ════════════════════════════════════════════ */}
      <section
        aria-label="Serviços de preservação botânica"
        style={{ padding: "72px 20px 68px", backgroundColor: "#FAF7F0" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "44px" }}
          >
            <span className="section-eyebrow">O que fazemos</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2rem,5vw,3.2rem)",
              color: "#1E2D2A", margin: "0 0 14px", lineHeight: 1.1
            }}>
              As suas flores, para sempre
            </h2>
            <p style={{
              color: "#5A6B60", fontSize: "clamp(0.93rem,2vw,1.03rem)",
              lineHeight: 1.85, maxWidth: "540px", margin: "0 auto"
            }}>
              Transformamos flores com valor emocional em quadros de arte botânica
              que duram décadas. Recebemos de Portugal e de toda a Europa.
            </p>
          </motion.div>

          <div className="services-grid">
            {[
              {
                href: "/passo-a-passo",
                bg: "#EDF2E8",
                accent: "#3D6B5E",
                label: "◈",
                title: "Preservação de Bouquet",
                desc: "Recebemos as flores até 5 dias após o evento. Prensamos, secamos e emolduramos com vidro museu anti-UV.",
                cta: "Ver o processo"
              },
              {
                href: "/recriacao",
                bg: "#F0EBE0",
                accent: "#B8954A",
                label: "✦",
                title: "Recriação de Bouquet",
                desc: "Já passou o tempo? Recriamos o bouquet de noiva com flores frescas iguais às originais, a partir de uma fotografia.",
                cta: "Saber mais"
              },
              {
                href: "/vale-presente",
                bg: "#EEF0F5",
                accent: "#5A6B8A",
                label: "◻",
                title: "Vale-Presente",
                desc: "Ofereça a preservação como prenda. O voucher perfeito para aniversários de casamento, bodas ou datas especiais.",
                cta: "Ver vale-presente"
              }
            ].map((s, i) => (
              <motion.a
                key={i} href={s.href}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block", textDecoration: "none",
                  backgroundColor: s.bg, borderRadius: "20px",
                  padding: "30px 26px",
                  border: `1px solid ${s.accent}18`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 16px 44px rgba(30,45,42,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.5rem", color: s.accent,
                  display: "block", marginBottom: "14px"
                }}>
                  {s.label}
                </span>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.25rem", color: "#1E2D2A",
                  margin: "0 0 9px", lineHeight: 1.2
                }}>
                  {s.title}
                </h3>
                <p style={{
                  color: "#5A6B60", fontSize: "0.88rem",
                  lineHeight: 1.75, margin: "0 0 18px"
                }}>
                  {s.desc}
                </p>
                <span style={{
                  fontSize: "0.76rem", fontWeight: "700",
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  color: s.accent, fontFamily: "Roboto, sans-serif",
                  borderBottom: `1px solid ${s.accent}55`, paddingBottom: "2px"
                }}>
                  {s.cta} →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. TRÊS PASSOS — with photos
      ════════════════════════════════════════════ */}
      <section
        aria-label="Como funciona a preservação de flores em 3 passos"
        style={{
          padding: "64px 20px 72px",
          background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)"
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <span className="section-eyebrow">Simples assim</span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.9rem,4.5vw,3rem)",
              color: "#1E2D2A", margin: 0, lineHeight: 1.1
            }}>
              Três passos para a sua arte
            </h2>
          </motion.div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <StepCard key={i} {...step} delay={i * 0.12}/>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Reservar a Minha Data
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. GOOGLE REVIEWS — credibilidade
      ════════════════════════════════════════════ */}
      <section
        aria-label="Avaliações de clientes da Flores à Beira-Rio"
        style={{
          padding: "64px 20px",
          backgroundColor: "#1E2D2A",
          color: "#FAF7F0", textAlign: "center"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: "940px", margin: "0 auto" }}
        >
          <span style={{
            display: "block", fontSize: "0.58rem", fontWeight: "700",
            letterSpacing: "3.5px", textTransform: "uppercase",
            color: "#8BA888", marginBottom: "12px",
            fontFamily: "Roboto, sans-serif"
          }}>
            Clientes felizes
          </span>
          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.8rem,4.5vw,3rem)",
            margin: "0 0 36px", lineHeight: 1.1, color: "#FAF7F0"
          }}>
            O que dizem quem confiou em nós
          </h2>
          <div ref={reviewRef} style={{ minHeight: "180px" }}/>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          5. VALE-PRESENTE — video + copy
      ════════════════════════════════════════════ */}
      <section
        aria-label="Vale-Presente — ofereça a preservação de flores"
        style={{ padding: "80px 20px", backgroundColor: "#FAF7F0" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="vale-grid">

            {/* Video side */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: "22px", overflow: "hidden",
                boxShadow: "0 20px 60px rgba(30,45,42,0.12)",
                aspectRatio: "9/16",
                maxHeight: "520px",
                backgroundColor: "#D4DECC",
                position: "relative"
              }}
            >
              {/* ⚠ Substitua pelo src do seu vídeo do vale-presente */}
              <video
                autoPlay loop muted playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                aria-label="Vídeo do vale-presente"
              >
                <source src="/vale-presente-video.mp4" type="video/mp4"/>
              </video>
              {/* Overlay badge */}
              <div style={{
                position: "absolute", top: "18px", left: "18px",
                backgroundColor: "#B8954A",
                color: "#FAF7F0", padding: "6px 16px", borderRadius: "50px",
                fontSize: "0.62rem", fontWeight: "700",
                letterSpacing: "2.5px", textTransform: "uppercase",
                fontFamily: "Roboto, sans-serif",
                boxShadow: "0 4px 14px rgba(184,149,74,0.4)"
              }}>
                Vale-Presente
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="section-eyebrow" style={{ color: "#B8954A" }}>
                O presente mais especial
              </span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2rem,4.5vw,3.2rem)",
                color: "#1E2D2A", margin: "0 0 18px", lineHeight: 1.1
              }}>
                Ofereça memórias<br/>
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>que duram para sempre</em>
              </h2>
              <p style={{
                color: "#5A6B60", lineHeight: 1.85,
                fontSize: "clamp(0.92rem,2vw,1.02rem)",
                margin: "0 0 14px"
              }}>
                O vale-presente da Flores à Beira-Rio oferece a quem recebe
                a experiência completa de preservação do seu bouquet —
                da entrega das flores até ao quadro emoldurado em casa.
              </p>
              <p style={{
                color: "#5A6B60", lineHeight: 1.85,
                fontSize: "clamp(0.92rem,2vw,1.02rem)",
                margin: "0 0 30px"
              }}>
                Perfeito para oferecer a noivas, em bodas de prata ou ouro,
                ou simplesmente porque algumas pessoas merecem guardar o melhor
                dos seus momentos.
              </p>

              {/* Highlights */}
              <div style={{
                display: "flex", flexDirection: "column", gap: "10px",
                marginBottom: "32px"
              }}>
                {[
                  "Valor à escolha — cobre qualquer tamanho de moldura",
                  "Enviado por email ou impresso em cartão físico",
                  "Válido 12 meses a partir da data de oferta"
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      backgroundColor: "#B8954A", flexShrink: 0, marginTop: "7px"
                    }}/>
                    <p style={{ color: "#5A6B60", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="cta-row" style={{ justifyContent: "flex-start" }}>
                <a href="/vale-presente" className="btn-primary">
                  Ver Vale-Presente
                </a>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost-dark">
                  Perguntar pelo WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. CTA SPLIT — full viewport width
          Noivas + Presentes
      ════════════════════════════════════════════ */}
      <div className="cta-split">

        {/* A — Noivas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: "linear-gradient(140deg, #1E2D2A 0%, #2D5045 100%)",
            padding: "clamp(56px,9vw,90px) clamp(28px,6vw,72px)",
            textAlign: "center", position: "relative", overflow: "hidden"
          }}
        >
          {/* Decorative bloom */}
          <div aria-hidden="true" className="drift-a" style={{
            position: "absolute", right: "5%", top: "8%",
            width: "clamp(80px,12vw,130px)", opacity: 0.08,
            pointerEvents: "none", color: "#8BA888"
          }}>
            <svg viewBox="0 0 140 140" fill="none" style={{ width: "100%" }}>
              {[0,45,90,135,180,225,270,315].map((r, i) => (
                <ellipse key={i} cx="70" cy="70" rx="16" ry="38"
                  fill="currentColor" opacity="0.3"
                  transform={`rotate(${r} 70 70) translate(0 -22)`}/>
              ))}
              <circle cx="70" cy="70" r="10" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: "440px", margin: "0 auto" }}>
            <span style={{
              display: "block", fontSize: "0.58rem", fontWeight: "700",
              letterSpacing: "3.5px", textTransform: "uppercase",
              color: "#8BA888", marginBottom: "14px",
              fontFamily: "Roboto, sans-serif"
            }}>
              Para noivas
            </span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.9rem,4vw,3rem)",
              color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1
            }}>
              Vai casar em breve?
            </h2>
            <p style={{
              color: "rgba(250,247,240,0.7)", fontSize: "0.95rem",
              lineHeight: 1.82, margin: "0 0 30px"
            }}>
              Reserve a sua vaga com antecedência —
              as datas em época de casamentos esgotam rapidamente.
              Garantimos a preservação nas melhores condições.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer"
                className="btn-ghost">
                Reservar Data
              </a>
              <a href={WA_NOIVA} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  backgroundColor: "#25D366", color: "#fff",
                  padding: "14px 28px", borderRadius: "100px",
                  textDecoration: "none", fontWeight: "600",
                  fontSize: "0.78rem", letterSpacing: "1px",
                  transition: "all 0.3s ease",
                  fontFamily: "Roboto, sans-serif",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1da851"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#25D366"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <IconWhatsApp/> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* B — Presentes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            background: "linear-gradient(140deg, #F0EBE0 0%, #EDF2E8 100%)",
            padding: "clamp(56px,9vw,90px) clamp(28px,6vw,72px)",
            textAlign: "center", position: "relative", overflow: "hidden"
          }}
        >
          <div aria-hidden="true" className="drift-a" style={{
            position: "absolute", left: "5%", bottom: "8%",
            width: "clamp(65px,10vw,110px)", opacity: 0.07,
            pointerEvents: "none", color: "#B8954A", animationDelay: "2s"
          }}>
            <svg viewBox="0 0 80 120" fill="none" style={{ width: "100%" }}>
              <path d="M40 115 C8 80 10 35 40 8 C70 35 72 80 40 115Z" fill="currentColor" opacity="0.8"/>
            </svg>
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: "440px", margin: "0 auto" }}>
            <span style={{
              display: "block", fontSize: "0.58rem", fontWeight: "700",
              letterSpacing: "3.5px", textTransform: "uppercase",
              color: "#B8954A", marginBottom: "14px",
              fontFamily: "Roboto, sans-serif"
            }}>
              Presente especial
            </span>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.9rem,4vw,3rem)",
              color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1
            }}>
              Ofereça memórias eternas
            </h2>
            <p style={{
              color: "#5A6B60", fontSize: "0.95rem",
              lineHeight: 1.82, margin: "0 0 30px"
            }}>
              Desde bodas de prata até aniversários de casamento —
              ofereça um vale-presente ou a recriação do bouquet de alguém especial.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <a href="/vale-presente" className="btn-primary">
                Vale-Presente
              </a>
              <a href="/recriacao" className="btn-outline">
                Recriação de Bouquet
              </a>
            </div>
          </div>
        </motion.div>

      </div>
      {/* Note: Footer is rendered by layout.js — do not add it here */}

    </main>
  );
}
