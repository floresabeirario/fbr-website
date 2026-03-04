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
const IconMapPin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
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
  },
  {
    name: "António",
    img: "/antonio.webp",
    role: "Cofundador & Operações",
    bio: "O António é o nosso cofundador e coordenador de operações. Gere o material, fornecedores, recebimento de flores e envios de quadros e muito mais.",
  },
  {
    name: "Ana",
    img: "/ana.webp",
    role: "Comunicação",
    bio: "A Ana é a nossa especialista em comunicação. É quem garante que os nossos clientes estão felizes com o nosso trabalho.",
  },
];

const CHANNELS = [
  {
    icon: <IconWhatsApp />,
    label: "WhatsApp",
    value: "+351 934 680 300",
    href: "https://wa.me/351934680300",
    color: "#25D366",
    desc: "Respondemos em poucas horas",
    external: true,
  },
  {
    icon: <IconEmail />,
    label: "Email",
    value: "info@floresabeirario.pt",
    href: "mailto:info@floresabeirario.pt",
    color: "#3D6B5E",
    desc: "Resposta em 24 horas",
    external: false,
  },
  {
    icon: <IconInstagram />,
    label: "Instagram",
    value: "@floresabeirario",
    href: "https://www.instagram.com/floresabeirario/",
    color: "#E1306C",
    desc: "Portefólio e bastidores",
    external: true,
  },
  {
    icon: <IconFacebook />,
    label: "Facebook",
    value: "Flores à Beira-Rio",
    href: "https://www.facebook.com/floresabeirario/",
    color: "#1877F2",
    desc: "Novidades e partilhas",
    external: true,
  },
  {
    icon: <IconCasamentos />,
    label: "Casamentos.pt",
    value: "Perfil verificado",
    href: "https://www.casamentos.pt/ideias-criativas-para-casamentos/flores-a-beira-rio-preservacao-de-flores--e171385",
    color: "#E8927C",
    desc: "Avaliações de noivas",
    external: true,
  },
  {
    icon: <IconMapPin />,
    label: "Localização",
    value: "Coimbra, Portugal",
    href: null,
    color: "#B8954A",
    desc: "Atelier com agendamento prévio",
    external: false,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactosEquipa() {
  return (
    <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        .eyebrow {
          display: block;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: #C4846B; margin-bottom: 12px;
          font-family: Roboto, sans-serif;
        }

        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) {
          .team-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .team-photo {
          transition: transform 0.6s ease;
        }
        .team-photo:hover { transform: scale(1.04); }

        .channels-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 560px) {
          .channels-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .channels-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .channel-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 22px 20px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid rgba(61,107,94,0.09);
          box-shadow: 0 4px 18px rgba(30,45,42,0.05);
          text-decoration: none;
          color: inherit;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        a.channel-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(30,45,42,0.1);
        }

        .cta-row {
          display: flex; flex-direction: column;
          align-items: stretch; gap: 14px;
        }
        @media (min-width: 460px) {
          .cta-row { flex-direction: row; justify-content: center; align-items: center; }
        }

        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          background: #3D6B5E; color: #FAF7F0;
          padding: 16px 38px; border-radius: 100px;
          text-decoration: none; font-weight: 600;
          font-size: 0.8rem; letter-spacing: 1.5px;
          text-transform: uppercase; text-align: center;
          box-shadow: 0 6px 22px rgba(61,107,94,0.28);
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
          min-height: 56px;
        }
        .btn-primary:hover { background: #1E2D2A; transform: translateY(-3px); }

        .btn-wa {
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          background: #25D366; color: #fff;
          padding: 16px 34px; border-radius: 100px;
          text-decoration: none; font-weight: 600;
          font-size: 0.8rem; letter-spacing: 1.5px;
          text-transform: uppercase;
          box-shadow: 0 6px 22px rgba(37,211,102,0.28);
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
          min-height: 56px;
        }
        .btn-wa:hover { background: #1da851; transform: translateY(-3px); }

        .btn-ghost-dark {
          display: inline-flex; align-items: center; justify-content: center;
          border: 2px solid rgba(30,45,42,0.25); color: #1E2D2A;
          padding: 15px 34px; border-radius: 100px;
          text-decoration: none; font-weight: 600;
          font-size: 0.8rem; letter-spacing: 1.5px;
          text-transform: uppercase; text-align: center;
          transition: all 0.3s ease;
          font-family: Roboto, sans-serif;
          min-height: 56px;
        }
        .btn-ghost-dark:hover {
          background: rgba(30,45,42,0.06); border-color: #3D6B5E;
          color: #3D6B5E; transform: translateY(-3px);
        }

        a:focus-visible, button:focus-visible {
          outline: 3px solid #3D6B5E;
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
          HERO
      ════════════════════════════════════════════ */}
      <section
        aria-label="Contactos e Equipa — Flores à Beira-Rio"
        style={{
          paddingTop: "clamp(110px,16vw,170px)",
          paddingBottom: "clamp(44px,7vw,72px)",
          paddingLeft: "20px",
          paddingRight: "20px",
          background: "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">Fale connosco</span>
            <h1 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2.8rem,9vw,5.8rem)",
              color: "#1E2D2A",
              margin: "0 0 clamp(18px,3vw,28px)",
              lineHeight: 1.0,
            }}>
              Contactos<br />
              <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>&amp; Equipa</em>
            </h1>
            <p style={{
              color: "#5A6B60",
              fontSize: "clamp(0.95rem,2vw,1.08rem)",
              lineHeight: 1.88,
              maxWidth: "540px",
              margin: 0,
            }}>
              Estamos disponíveis para responder a todas as suas dúvidas.
              Adoramos conhecer a história por detrás das flores que nos chegam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CANAIS DE CONTACTO
      ════════════════════════════════════════════ */}
      <section
        aria-label="Canais de contacto"
        style={{
          padding: "clamp(48px,8vw,80px) 20px",
          backgroundColor: "#FAF7F0",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,48px)" }}>
              <span className="eyebrow" style={{ color: "#B8954A" }}>Onde nos encontrar</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                color: "#1E2D2A",
                margin: 0,
                lineHeight: 1.1,
              }}>
                Escolha o canal mais conveniente
              </h2>
            </div>
          </Reveal>

          <div className="channels-grid">
            {CHANNELS.map((ch, i) => {
              const Tag = ch.href ? "a" : "div";
              const linkProps = ch.href
                ? {
                    href: ch.href,
                    ...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
                  }
                : {};

              return (
                <Reveal key={i} delay={i * 0.06}>
                  <Tag className="channel-card" {...linkProps}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: `${ch.color}14`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: ch.color, marginTop: 2,
                    }}>
                      {ch.icon}
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "Roboto, sans-serif", fontWeight: 700,
                        fontSize: "0.72rem", letterSpacing: "1.5px",
                        textTransform: "uppercase", color: ch.color,
                        margin: "0 0 4px",
                      }}>
                        {ch.label}
                      </p>
                      <p style={{
                        fontFamily: "'TAN-MEMORIES', serif",
                        fontSize: "1rem", color: "#1E2D2A",
                        margin: "0 0 4px", lineHeight: 1.25,
                      }}>
                        {ch.value}
                      </p>
                      <p style={{
                        fontFamily: "Roboto, sans-serif", fontWeight: 300,
                        fontSize: "0.78rem", color: "#5A6B60",
                        margin: 0, lineHeight: 1.5,
                      }}>
                        {ch.desc}
                      </p>
                    </div>
                  </Tag>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          EQUIPA
      ════════════════════════════════════════════ */}
      <section
        aria-label="A nossa equipa"
        style={{
          padding: "clamp(48px,8vw,80px) 20px",
          background: "linear-gradient(180deg, #EDF2E8 0%, #FAF7F0 100%)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(36px,6vw,56px)" }}>
              <span className="eyebrow">Quem somos</span>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2rem,5vw,3.5rem)",
                fontWeight: 400,
                color: "#1E2D2A",
                margin: "0 0 16px",
                lineHeight: 1.1,
              }}>
                A equipa por detrás<br />
                <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>de cada peça</em>
              </h2>
              <p style={{
                fontFamily: "Roboto, sans-serif", fontWeight: 300,
                fontSize: "clamp(0.95rem,2vw,1.05rem)",
                lineHeight: 1.85, color: "#5A6B60",
                maxWidth: "520px", margin: "0 auto",
              }}>
                Somos uma equipa pequena baseada em Coimbra, unida pela paixão
                de transformar flores em memórias que duram para sempre.
              </p>
            </div>
          </Reveal>

          <div className="team-grid">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  borderRadius: 20, overflow: "hidden",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(61,107,94,0.09)",
                  boxShadow: "0 8px 32px rgba(30,45,42,0.07)",
                }}>
                  <div style={{
                    aspectRatio: "3/4", overflow: "hidden",
                    backgroundColor: "#D4DECC", position: "relative",
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
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                      background: "linear-gradient(to top, rgba(15,30,26,0.65) 0%, transparent 100%)",
                    }} />
                    <div style={{ position: "absolute", bottom: 18, left: 18 }}>
                      <p style={{
                        fontFamily: "'TAN-MEMORIES', serif",
                        fontSize: "clamp(1.2rem,2.5vw,1.5rem)",
                        color: "#FAF7F0", margin: 0, lineHeight: 1.15,
                        textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                      }}>
                        {member.name}
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <span style={{
                      display: "inline-block",
                      fontSize: "0.52rem", fontWeight: 700,
                      letterSpacing: "2px", textTransform: "uppercase",
                      color: "#3D6B5E", fontFamily: "Roboto, sans-serif",
                      backgroundColor: "rgba(61,107,94,0.08)",
                      padding: "4px 10px", borderRadius: 100,
                      marginBottom: 10,
                    }}>
                      {member.role}
                    </span>
                    <p style={{
                      fontFamily: "Roboto, sans-serif", fontWeight: 300,
                      fontSize: "0.86rem", lineHeight: 1.72,
                      color: "#5A6B60", margin: 0,
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
          HORÁRIO & INFORMAÇÕES
      ════════════════════════════════════════════ */}
      <section
        aria-label="Informações práticas"
        style={{
          padding: "clamp(48px,7vw,72px) 20px",
          backgroundColor: "#FAF7F0",
          borderTop: "1px solid rgba(26,26,26,0.07)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "24px",
            }}
            className="info-grid"
            >
              {/* Horário */}
              <div style={{
                padding: "28px 24px", borderRadius: 16,
                backgroundColor: "rgba(61,107,94,0.04)",
                border: "1px solid rgba(61,107,94,0.1)",
              }}>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.15rem", color: "#1E2D2A",
                  margin: "0 0 12px", lineHeight: 1.2,
                }}>
                  Horário de atendimento
                </h3>
                <p style={{
                  fontFamily: "Roboto, sans-serif", fontWeight: 300,
                  fontSize: "0.88rem", lineHeight: 1.75,
                  color: "#5A6B60", margin: 0,
                }}>
                  Segunda a sexta das 10h às 18h. Respondemos por WhatsApp e email
                  dentro deste período — normalmente em poucas horas.
                  As visitas ao atelier são feitas com agendamento prévio.
                </p>
              </div>

              {/* Entregas */}
              <div style={{
                padding: "28px 24px", borderRadius: 16,
                backgroundColor: "rgba(184,149,74,0.05)",
                border: "1px solid rgba(184,149,74,0.12)",
              }}>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.15rem", color: "#1E2D2A",
                  margin: "0 0 12px", lineHeight: 1.2,
                }}>
                  Entrega de flores
                </h3>
                <p style={{
                  fontFamily: "Roboto, sans-serif", fontWeight: 300,
                  fontSize: "0.88rem", lineHeight: 1.75,
                  color: "#5A6B60", margin: 0,
                }}>
                  Recebemos flores por entrega em mãos no atelier em Coimbra,
                  por envio CTT ou por recolha no local do evento.
                  Recebemos de Portugal e de toda a Europa.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════ */}
      <section
        aria-label="Iniciar contacto"
        style={{
          padding: "clamp(60px,10vw,100px) 20px",
          background: "linear-gradient(140deg, #0F1E1A 0%, #1E3328 40%, #2D5045 100%)",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "620px", margin: "0 auto" }}
        >
          <div aria-hidden="true" style={{
            width: 44, height: 1, margin: "0 auto 28px",
            background: "linear-gradient(to right, transparent, #B8954A, transparent)",
          }} />
          <span style={{
            display: "block", fontSize: "0.58rem", fontWeight: 700,
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
            <em style={{ fontStyle: "italic", color: "#8BA888" }}>sem compromisso</em>
          </h2>
          <p style={{
            fontFamily: "Roboto, sans-serif", fontWeight: 300,
            fontSize: "clamp(0.9rem,2vw,1rem)",
            lineHeight: 1.85, color: "rgba(250,247,240,0.65)",
            margin: "0 0 36px",
          }}>
            Quer saber mais, pedir orçamento ou simplesmente
            contar-nos a história das suas flores?
            Respondemos sempre com cuidado e atenção.
          </p>

          <div className="cta-row" style={{ marginBottom: 24 }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar pelo WhatsApp
            </a>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Reservar Data
            </a>
          </div>

          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: 20,
            fontSize: "0.82rem",
          }}>
            {[
              { href: "/passo-a-passo",        label: "Como funciona" },
              { href: "/opcoes-e-precos",       label: "Ver preços" },
              { href: "/perguntas-frequentes",  label: "Perguntas frequentes" },
            ].map((l, i) => (
              <a key={i} href={l.href} style={{
                color: "rgba(250,247,240,0.55)", fontWeight: 600,
                textDecoration: "none", fontFamily: "Roboto, sans-serif",
                borderBottom: "1px solid rgba(250,247,240,0.2)",
                paddingBottom: 2, transition: "color 0.2s ease, border-color 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#FAF7F0"; e.currentTarget.style.borderColor = "rgba(250,247,240,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(250,247,240,0.55)"; e.currentTarget.style.borderColor = "rgba(250,247,240,0.2)"; }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        @media (min-width: 560px) {
          .info-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
