"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { IconInstagram, IconFacebook, IconTikTok, IconWhatsApp, IconEmail, IconCasamentos } from "@/components/Icons";
import { WA_URL, EMAIL, PHONE_DISPLAY, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_TIKTOK, SOCIAL_CASAMENTOS } from "../_lib/constants";
import "./ContactosClient.css";

const GS = "var(--font-google-sans), 'Google Sans', sans-serif";

// Paleta principal
const C = {
  tealDeep:    "#0F2622",
  teal:        "#1E3D38",
  tealMid:     "#2A4F49",
  tealLight:   "#3D6B5E",
  salmon:      "#C4846B",
  salmonLight: "#D9A090",
  gold:        "#B8954A",
  cream:       "#FAF7F0",
};

// ─── Reveal ───────────────────────────────────────────────────────────────────
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

// ─── Dados ────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Maria João",
    img: "/mj.webp",
    imgStyle: {},
    role: "Cofundadora & Designer",
    bio: "A Maria João é a nossa cofundadora e designer. É a mão artística das nossas peças.",
    accent: C.salmon,
  },
  {
    name: "António",
    img: "/antonio.webp",
    imgStyle: {},
    role: "Cofundador & Operações",
    bio: "O António é o nosso cofundador e coordenador de operações. Gere o material, fornecedores, recebimento de flores e envios de quadros e muito mais.",
    accent: C.tealLight,
  },
  {
    name: "Ana",
    img: "/ana.webp",
    // zoom ligeiro para compensar enquadramento mais afastado
    imgStyle: { transform: "scale(1.22)", transformOrigin: "center 28%" },
    role: "Comunicação",
    bio: "A Ana é a nossa especialista em comunicação. É quem garante que os nossos clientes estão felizes com o nosso trabalho.",
    accent: C.gold,
  },
];

const SOCIALS = [
  { icon: <IconInstagram  size={22} />, label: "Instagram",     href: SOCIAL_INSTAGRAM,  bg: "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)" },
  { icon: <IconFacebook   size={22} />, label: "Facebook",      href: SOCIAL_FACEBOOK,   bg: "linear-gradient(135deg, #1877F2, #0C5DC7)" },
  { icon: <IconTikTok     size={22} />, label: "TikTok",        href: SOCIAL_TIKTOK,     bg: "linear-gradient(135deg, #010101, #2b2b2b)" },
  { icon: <IconCasamentos size={22} />, label: "Casamentos.pt", href: SOCIAL_CASAMENTOS, bg: `linear-gradient(135deg, ${C.salmon}, #C06050)` },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ContactosClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.38], [0, 28]);

  return (
    <div style={{ overflowX: "clip" }}>

      {/* ════ 1. HERO ════ */}
      <section
        ref={heroRef}
        aria-label="Contactos e Equipa, Flores à Beira-Rio"
        style={{ position: "relative", overflow: "hidden", minHeight: "100svh", display: "flex", alignItems: "center" }}
      >
        {/* Foto de fundo */}
        <div
          aria-hidden="true"
          className="hero-bg"
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/juliaquadro2.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            filter: "brightness(0.78) saturate(0.95)",
          }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,22,20,0.45) 0%, rgba(10,22,20,0.30) 45%, rgba(10,22,20,0.60) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 2, width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "clamp(140px,18vw,200px) 24px clamp(80px,12vw,120px)" }}>
          <div className="contact-split" style={{ gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="hero-text-col">
              <span style={{ display: "inline-block", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: C.salmonLight, marginBottom: 16, fontFamily: GS }}>Fale connosco</span>
              <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem,6vw,5rem)", color: C.cream, margin: "0 0 20px", lineHeight: 1.02 }}>
                Contactos<br />
                <em style={{ fontStyle: "italic", color: C.salmon }}>e Equipa</em>
              </h1>
              <p style={{ color: "rgba(250,247,240,0.95)", fontFamily: GS, fontWeight: 300, fontSize: "clamp(0.95rem,2vw,1.08rem)", lineHeight: 1.88, maxWidth: 480, margin: "0 auto 32px", textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}>
                Estamos disponíveis para responder a todas as suas dúvidas. Adoramos conhecer a história por detrás das flores que nos chegam.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="contact-card"
              style={{
                backgroundColor: "rgba(15,38,34,0.60)",
                backdropFilter: "blur(22px)",
                border: `1px solid rgba(196,132,107,0.22)`,
                borderRadius: 20,
                padding: "clamp(20px,4vw,40px)",
              }}
            >
              <p style={{ fontFamily: GS, fontWeight: 700, fontSize: "0.56rem", letterSpacing: "3px", textTransform: "uppercase", color: C.salmon, marginBottom: 24 }}>Contacto direto</p>

              {[
                { icon: <IconWhatsApp size={22} />, label: PHONE_DISPLAY,  sub: "Respondemos em 24 horas", href: WA_URL,                  color: "#25D366" },
                { icon: <IconEmail    size={22} />, label: EMAIL,          sub: "Resposta em 72 horas",   href: `mailto:${EMAIL}`,       color: C.salmonLight },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="contact-direct-link"
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid rgba(196,132,107,0.12)`, textDecoration: "none", color: "inherit", minWidth: 0 }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}>{item.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(0.8rem, 3.5vw, 0.95rem)", color: C.cream, margin: 0, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</p>
                    <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.74rem", color: "rgba(250,247,240,0.45)", margin: "3px 0 0" }}>{item.sub}</p>
                  </div>
                </a>
              ))}

              <p style={{ fontFamily: GS, fontWeight: 700, fontSize: "0.56rem", letterSpacing: "3px", textTransform: "uppercase", color: C.salmonLight, margin: "20px 0 14px" }}>Siga-nos</p>
              <div className="socials-row">
                {SOCIALS.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="social-icon-btn"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, padding: "12px 8px", borderRadius: 12, background: s.bg, textDecoration: "none", color: "#fff", minWidth: 0 }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>{s.icon}</span>
                  <span style={{ fontFamily: GS, fontWeight: 600, fontSize: "0.58rem", letterSpacing: "0px", textAlign: "center", lineHeight: 1.2, whiteSpace: "nowrap" }}>{s.label}</span>  
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ════ 2. EQUIPA ════ */}
      <section
        aria-label="A nossa equipa"
        style={{
          padding: "clamp(60px,10vw,100px) 24px",
          background: `linear-gradient(165deg, ${C.teal} 0%, ${C.tealMid} 40%, ${C.tealDeep} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(45deg, ${C.salmon} 0px, ${C.salmon} 1px, transparent 1px, transparent 50px)`, pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-5%", left: "-5%", width: "clamp(200px,35vw,450px)", height: "clamp(200px,35vw,450px)", background: `radial-gradient(circle, rgba(196,132,107,0.08) 0%, transparent 65%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-5%", right: "-5%", width: "clamp(200px,30vw,380px)", height: "clamp(200px,30vw,380px)", background: `radial-gradient(circle, rgba(196,132,107,0.06) 0%, transparent 65%)`, borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px,7vw,64px)" }}>
              <span style={{ display: "inline-block", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: C.salmonLight, marginBottom: 14, fontFamily: GS }}>Quem somos</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,5.5vw,3.8rem)", fontWeight: 400, color: C.cream, margin: "0 0 16px", lineHeight: 1.08 }}>
                A equipa por detrás<br />
                <em style={{ fontStyle: "italic", color: C.salmon }}>de cada peça</em>
              </h2>
              <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "clamp(0.95rem,2vw,1.05rem)", lineHeight: 1.85, color: "rgba(250,247,240,0.55)", maxWidth: 500, margin: "0 auto" }}>
                Somos uma equipa pequena baseada em Coimbra, unida pela paixão de transformar flores em memórias que duram para sempre.
              </p>
            </div>
          </Reveal>

          <div className="team-list">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="team-card">
                  {/* Foto */}
                  <div className="team-photo-wrap">
                    <img
                      src={member.img}
                      alt={`${member.name}, ${member.role} na Flores à Beira-Rio`}
                      loading="lazy"
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", display: "block",
                        transition: "filter 0.4s ease",
                        ...member.imgStyle,
                      }}
                    />
                    <div className="team-photo-overlay">
                      <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1rem, 3.5vw, 1.6rem)", color: C.cream, margin: "0 0 6px", lineHeight: 1.1, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>{member.name}</p>
                      <span style={{ display: "inline-block", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#fff", fontFamily: GS, backgroundColor: member.accent, padding: "4px 12px", borderRadius: 100 }}>{member.role}</span>
                    </div>
                  </div>

                  {/* Bio lateral — visivel apenas no mobile */}
                  <div className="team-bio-mobile">
                    <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "clamp(0.8rem, 2.2vw, 0.92rem)", lineHeight: 1.75, color: "rgba(250,247,240,0.6)", margin: 0 }}>{member.bio}</p>
                  </div>

                  {/* Bio abaixo — visivel apenas no desktop */}
                  <div className="team-bio-desktop">
                    <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "0.86rem", lineHeight: 1.72, color: "rgba(250,247,240,0.6)", margin: 0 }}>{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 3. NAVEGAÇÃO — 4 QUADRADOS ════ */}
      <section aria-label="Explorar serviços">
        <div className="nav-squares-grid">
          {[
            { href: "/opcoes-e-precos",        label: "Opções e Preços",           img: "/molduranogueira.webp" },
            { href: "/como-funciona",          label: "Como Funciona",              img: "/ramo.webp" },
            { href: "/oferecer-preservacao",   label: "Oferecer Preservação",       img: "/vale1.webp" },
            { href: "/emoldurar-flores-secas", label: "Emoldurar Flores Já Secas",  img: "/fotoquadrocloseup2.webp" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <a href={item.href} className="nav-square">
                <img src={item.img} alt="" aria-hidden="true" className="nav-square-img" />
                <div className="nav-square-overlay">
                  <span className="nav-square-label">{item.label}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
