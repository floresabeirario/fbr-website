"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconInstagram = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconEmail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconCasamentos = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const FORM_URL = "https://wkf.ms/3RfoNAc";
const WA_URL   = "https://wa.me/351934680300?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre a preservação das minhas flores.");

const TEAM = [
  {
    name: "Maria João",
    img: "/mj.webp",
    role: "Cofundadora & Designer",
    bio: "A Maria João é a nossa cofundadora e designer. É a mão artística das nossas peças.",
    accent: "#C4846B",
  },
  {
    name: "António",
    img: "/antonio.webp",
    role: "Cofundador & Operações",
    bio: "O António é o nosso cofundador e coordenador de operações. Gere o material, fornecedores, recebimento de flores e envios de quadros e muito mais.",
    accent: "#3D6B5E",
  },
  {
    name: "Ana",
    img: "/ana.webp",
    role: "Comunicação",
    bio: "A Ana é a nossa especialista em comunicação. É quem garante que os nossos clientes estão felizes com o nosso trabalho.",
    accent: "#B8954A",
  },
];

const SOCIALS = [
  {
    icon: <IconInstagram />,
    label: "Instagram",
    handle: "@floresabeirario",
    href: "https://www.instagram.com/floresabeirario/",
    bg: "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)",
  },
  {
    icon: <IconFacebook />,
    label: "Facebook",
    handle: "Flores à Beira-Rio",
    href: "https://www.facebook.com/floresabeirario/",
    bg: "linear-gradient(135deg, #1877F2, #0C5DC7)",
  },
  {
    icon: <IconCasamentos />,
    label: "Casamentos.pt",
    handle: "Perfil verificado",
    href: "https://www.casamentos.pt/ideias-criativas-para-casamentos/flores-a-beira-rio-preservacao-de-flores--e171385",
    bg: "linear-gradient(135deg, #E8927C, #D4735B)",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactosEquipa() {
  return (
    <main style={{ overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(10px, 2vw, 20px);
        }
        .team-grid > *:last-child {
          grid-column: 1 / -1;
          max-width: 50%;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .team-grid { grid-template-columns: repeat(3, 1fr); }
          .team-grid > *:last-child { grid-column: auto; max-width: none; margin: 0; }
        }

        .team-photo { transition: transform 0.7s ease; }
        .team-card:hover .team-photo { transform: scale(1.05); }

        .contact-split {
          display: grid; grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .contact-split { grid-template-columns: 1fr 1fr; }
        }

        .cta-row {
          display: flex; flex-direction: column;
          align-items: stretch; gap: 14px;
        }
        @media (min-width: 460px) {
          .cta-row { flex-direction: row; justify-content: center; align-items: center; }
        }

        .btn-primary-light {
          display: inline-flex; align-items: center; justify-content: center;
          background: #FAF7F0; color: #3D6B5E;
          padding: 16px 38px; border-radius: 100px;
          text-decoration: none; font-weight: 700;
          font-size: 0.78rem; letter-spacing: 1.5px;
          text-transform: uppercase; text-align: center;
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif; min-height: 56px;
        }
        .btn-primary-light:hover { background: #EDE5D4; transform: translateY(-3px); }

        .btn-wa-big {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          background: #25D366; color: #fff;
          padding: 16px 36px; border-radius: 100px;
          text-decoration: none; font-weight: 600;
          font-size: 0.8rem; letter-spacing: 1.5px;
          text-transform: uppercase;
          box-shadow: 0 6px 24px rgba(37,211,102,0.3);
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif; min-height: 56px;
        }
        .btn-wa-big:hover { background: #1da851; transform: translateY(-3px); }


        a:focus-visible, button:focus-visible {
          outline: 3px solid #8BA888;
          outline-offset: 4px;
          border-radius: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}} />

      {/* ════════════════════════════════════════════
          1. HERO — foto de fundo, split layout
      ════════════════════════════════════════════ */}
      <section
        aria-label="Contactos e Equipa — Flores à Beira-Rio"
        style={{
          position: "relative", overflow: "hidden",
          minHeight: "85vh",
          display: "flex", alignItems: "center",
        }}
      >
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/fotoquadro1.webp')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.55) saturate(0.8)",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(15,30,26,0.4) 0%, rgba(15,30,26,0.6) 50%, rgba(15,30,26,0.85) 100%)",
        }} />

        <div style={{
          position: "relative", zIndex: 2, width: "100%",
          maxWidth: "1100px", margin: "0 auto",
          padding: "clamp(140px,18vw,200px) 24px clamp(80px,12vw,120px)",
        }}>
          <div className="contact-split" style={{ gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                display: "inline-block", fontSize: "0.56rem", fontWeight: 700,
                letterSpacing: "3.5px", textTransform: "uppercase",
                color: "#8BA888", marginBottom: 16,
                fontFamily: "Roboto, sans-serif",
              }}>
                Fale connosco
              </span>
              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2.8rem,8vw,5.2rem)",
                color: "#FAF7F0", margin: "0 0 20px",
                lineHeight: 1.02,
              }}>
                Contactos<br />
                <em style={{ fontStyle: "italic", color: "#8BA888" }}>&amp; Equipa</em>
              </h1>
              <p style={{
                color: "rgba(250,247,240,0.72)", fontFamily: "Roboto, sans-serif",
                fontWeight: 300, fontSize: "clamp(0.95rem,2vw,1.08rem)",
                lineHeight: 1.88, maxWidth: 480, margin: "0 0 32px",
              }}>
                Estamos disponíveis para responder a todas as suas dúvidas.
                Adoramos conhecer a história por detrás das flores que nos chegam.
              </p>
            </motion.div>

            {/* Card glassmorphism com contactos */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: "rgba(250,247,240,0.07)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(250,247,240,0.12)",
                borderRadius: 20, padding: "clamp(28px,4vw,40px)",
              }}
            >
              <p style={{
                fontFamily: "Roboto, sans-serif", fontWeight: 700,
                fontSize: "0.56rem", letterSpacing: "3px", textTransform: "uppercase",
                color: "#B8954A", marginBottom: 24,
              }}>
                Contacto direto
              </p>
              {[
                { icon: <IconWhatsApp />, label: "+351 934 680 300", sub: "Respondemos em poucas horas", href: "https://wa.me/351934680300", color: "#25D366" },
                { icon: <IconEmail />, label: "info@floresabeirario.pt", sub: "Resposta em 24 horas", href: "mailto:info@floresabeirario.pt", color: "#8BA888" },
              ].map((item, i) => {
                const Tag = item.href ? "a" : "div";
                return (
                  <Tag key={i}
                    {...(item.href ? { href: item.href, ...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}) } : {})}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(250,247,240,0.08)",
                      textDecoration: "none", color: "inherit",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={item.href ? e => { e.currentTarget.style.opacity = "0.75"; } : undefined}
                    onMouseLeave={item.href ? e => { e.currentTarget.style.opacity = "1"; } : undefined}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: `${item.color}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: item.color,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "'TAN-MEMORIES', serif",
                        fontSize: "0.95rem", color: "#FAF7F0",
                        margin: 0, lineHeight: 1.2,
                      }}>
                        {item.label}
                      </p>
                      <p style={{
                        fontFamily: "Roboto, sans-serif", fontWeight: 300,
                        fontSize: "0.74rem", color: "rgba(250,247,240,0.45)",
                        margin: "3px 0 0",
                      }}>
                        {item.sub}
                      </p>
                    </div>
                  </Tag>
                );
              })}

              {/* Redes sociais */}
              <p style={{
                fontFamily: "Roboto, sans-serif", fontWeight: 700,
                fontSize: "0.56rem", letterSpacing: "3px", textTransform: "uppercase",
                color: "#8BA888", margin: "20px 0 14px",
              }}>
                Siga-nos
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {SOCIALS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                      gap: 8, padding: "12px 8px", borderRadius: 12,
                      background: s.bg, textDecoration: "none", color: "#fff",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>{s.icon}</span>
                    <span style={{
                      fontFamily: "Roboto, sans-serif", fontWeight: 600,
                      fontSize: "0.7rem", letterSpacing: "0.5px",
                    }}>
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. EQUIPA — fundo quente castanho
      ════════════════════════════════════════════ */}
      <section
        aria-label="A nossa equipa"
        style={{
          padding: "clamp(60px,10vw,100px) 24px",
          background: "linear-gradient(165deg, #2D1F14 0%, #3A2A1C 40%, #1E2D2A 100%)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Textura diagonal */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `repeating-linear-gradient(45deg, #B8954A 0px, #B8954A 1px, transparent 1px, transparent 50px)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px,7vw,64px)" }}>
              <span style={{
                display: "inline-block", fontSize: "0.56rem", fontWeight: 700,
                letterSpacing: "3.5px", textTransform: "uppercase",
                color: "#B8954A", marginBottom: 14,
                fontFamily: "Roboto, sans-serif",
              }}>
                Quem somos
              </span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2.2rem,5.5vw,3.8rem)",
                fontWeight: 400, color: "#FAF7F0",
                margin: "0 0 16px", lineHeight: 1.08,
              }}>
                A equipa por detrás<br />
                <em style={{ fontStyle: "italic", color: "#C4846B" }}>de cada peça</em>
              </h2>
              <p style={{
                fontFamily: "Roboto, sans-serif", fontWeight: 300,
                fontSize: "clamp(0.95rem,2vw,1.05rem)",
                lineHeight: 1.85, color: "rgba(250,247,240,0.55)",
                maxWidth: 500, margin: "0 auto",
              }}>
                Somos uma equipa pequena baseada em Coimbra, unida pela paixão
                de transformar flores em memórias que duram para sempre.
              </p>
            </div>
          </Reveal>

          <div className="team-grid">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="team-card" style={{
                  borderRadius: 20, overflow: "hidden",
                  backgroundColor: "rgba(250,247,240,0.04)",
                  border: "1px solid rgba(250,247,240,0.08)",
                  backdropFilter: "blur(4px)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{
                    aspectRatio: "3/4", overflow: "hidden",
                    position: "relative", backgroundColor: "#2A1F16",
                  }}>
                    <img
                      src={member.img}
                      alt={`${member.name} — ${member.role} na Flores à Beira-Rio`}
                      className="team-photo"
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", display: "block",
                      }}
                      loading="lazy"
                    />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                      background: `linear-gradient(to top, rgba(42,31,22,0.95) 0%, rgba(42,31,22,0.4) 60%, transparent 100%)`,
                    }} />
                    <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                      <p style={{
                        fontFamily: "'TAN-MEMORIES', serif",
                        fontSize: "clamp(1.3rem,2.8vw,1.6rem)",
                        color: "#FAF7F0", margin: "0 0 6px", lineHeight: 1.15,
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                      }}>
                        {member.name}
                      </p>
                      <span style={{
                        display: "inline-block",
                        fontSize: "0.5rem", fontWeight: 700,
                        letterSpacing: "2px", textTransform: "uppercase",
                        color: "#FAF7F0", fontFamily: "Roboto, sans-serif",
                        backgroundColor: member.accent,
                        padding: "4px 12px", borderRadius: 100,
                      }}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "20px 20px 24px" }}>
                    <p style={{
                      fontFamily: "Roboto, sans-serif", fontWeight: 300,
                      fontSize: "0.86rem", lineHeight: 1.72,
                      color: "rgba(250,247,240,0.55)", margin: 0,
                    }}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. CTA FINAL — fundo escuro com glow dourado
      ════════════════════════════════════════════ */}
      <section
        aria-label="Iniciar contacto"
        style={{
          padding: "clamp(64px,10vw,100px) 24px",
          background: "linear-gradient(160deg, #1E2D2A 0%, #0F1E1A 100%)",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Glow dourado decorativo */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "clamp(300px,50vw,600px)", height: "clamp(300px,50vw,600px)",
          background: "radial-gradient(circle, rgba(184,149,74,0.06) 0%, transparent 65%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          <div aria-hidden="true" style={{
            width: 44, height: 1, margin: "0 auto 28px",
            background: "linear-gradient(to right, transparent, #B8954A, transparent)",
          }} />
          <span style={{
            display: "block", fontSize: "0.56rem", fontWeight: 700,
            letterSpacing: "3.5px", textTransform: "uppercase",
            color: "#8BA888", marginBottom: 14,
            fontFamily: "Roboto, sans-serif",
          }}>
            Pronta para começar?
          </span>
          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2rem,6vw,3.8rem)",
            fontWeight: 400, margin: "0 0 18px",
            lineHeight: 1.08, color: "#FAF7F0",
          }}>
            Fale connosco<br />
            <em style={{ fontStyle: "italic", color: "#C4846B" }}>sem compromisso</em>
          </h2>
          <p style={{
            fontFamily: "Roboto, sans-serif", fontWeight: 300,
            fontSize: "clamp(0.9rem,2vw,1rem)",
            lineHeight: 1.85, color: "rgba(250,247,240,0.55)",
            margin: "0 0 36px",
          }}>
            Quer saber mais, pedir orçamento ou simplesmente contar-nos
            a história das suas flores? Respondemos sempre com cuidado e atenção.
          </p>

          <div className="cta-row" style={{ marginBottom: 28 }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa-big">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar pelo WhatsApp
            </a>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-light">
              Reservar Data
            </a>
          </div>

          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: 20,
            fontSize: "0.82rem",
          }}>
            {[
              { href: "/como-funciona",        label: "Como funciona" },
              { href: "/opcoes-e-precos",       label: "Ver preços" },
              { href: "/perguntas-frequentes",  label: "Perguntas frequentes" },
            ].map((l, i) => (
              <a key={i} href={l.href} style={{
                color: "rgba(250,247,240,0.45)", fontWeight: 600,
                textDecoration: "none", fontFamily: "Roboto, sans-serif",
                borderBottom: "1px solid rgba(250,247,240,0.15)",
                paddingBottom: 2, transition: "color 0.2s ease, border-color 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#FAF7F0"; e.currentTarget.style.borderColor = "rgba(250,247,240,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(250,247,240,0.45)"; e.currentTarget.style.borderColor = "rgba(250,247,240,0.15)"; }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
