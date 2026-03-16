"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { IconInstagram, IconFacebook, IconTikTok, IconWhatsApp, IconEmail, IconCasamentos } from "@/components/Icons";
import { FORM_URL, WA_URL, EMAIL, PHONE_DISPLAY, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_TIKTOK, SOCIAL_CASAMENTOS } from "../_lib/constants";
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
    <main style={{ overflowX: "hidden" }}>

      {/* ════ 1. HERO ════ */}
      <section
        ref={heroRef}
        aria-label="Contactos e Equipa — Flores à Beira-Rio"
        style={{ position: "relative", overflow: "hidden", minHeight: "85vh", display: "flex", alignItems: "center" }}
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
            filter: "brightness(0.55) saturate(0.8)",
          }}
        />

        {/* Overlay escuro */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(15,38,34,0.4) 0%, rgba(15,38,34,0.6) 50%, rgba(15,38,34,0.85) 100%)",
          }}
        />

        <motion.div style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 2, width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "clamp(140px,18vw,200px) 24px clamp(80px,12vw,120px)" }}>
          <div className="contact-split" style={{ gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="hero-text-col">
              <span style={{ display: "inline-block", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: C.salmonLight, marginBottom: 16, fontFamily: GS }}>Fale connosco</span>
              <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.8rem,8vw,5.2rem)", color: C.cream, margin: "0 0 20px", lineHeight: 1.02 }}>
                Contactos<br />
                <em style={{ fontStyle: "italic", color: C.salmon }}>e Equipa</em>
              </h1>
              <p style={{ color: "rgba(250,247,240,0.85)", fontFamily: GS, fontWeight: 300, fontSize: "clamp(0.95rem,2vw,1.08rem)", lineHeight: 1.88, maxWidth: 480, margin: "0 0 32px" }}>
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
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid rgba(196,132,107,0.12)`, textDecoration: "none", color: "inherit", transition: "opacity 0.2s", minWidth: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.75"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
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
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, padding: "12px 8px", borderRadius: 12, background: s.bg, textDecoration: "none", color: "#fff", transition: "transform 0.3s ease, box-shadow 0.3s ease", minWidth: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
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
                      alt={`${member.name} — ${member.role} na Flores à Beira-Rio`}
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

      {/* ════ 3. CTA FINAL ════ */}
      <section
        aria-label="Iniciar contacto"
        style={{
          padding: "clamp(64px,10vw,100px) 24px",
          background: `linear-gradient(160deg, ${C.tealMid} 0%, ${C.tealDeep} 100%)`,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "clamp(300px,50vw,600px)", height: "clamp(300px,50vw,600px)", background: `radial-gradient(circle, rgba(196,132,107,0.09) 0%, transparent 65%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "clamp(250px,40vw,500px)", height: "clamp(250px,40vw,500px)", background: `radial-gradient(circle, rgba(196,132,107,0.06) 0%, transparent 65%)`, borderRadius: "50%", pointerEvents: "none" }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          <div aria-hidden="true" style={{ width: 44, height: 1, margin: "0 auto 28px", background: `linear-gradient(to right, transparent, ${C.salmon}, transparent)` }} />
          <span style={{ display: "block", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: C.salmonLight, marginBottom: 14, fontFamily: GS }}>Pronta para começar?</span>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,6vw,3.8rem)", fontWeight: 400, margin: "0 0 18px", lineHeight: 1.08, color: C.cream }}>
            Fale connosco<br />
            <em style={{ fontStyle: "italic", color: C.salmon }}>sem compromisso</em>
          </h2>
          <p style={{ fontFamily: GS, fontWeight: 300, fontSize: "clamp(0.9rem,2vw,1rem)", lineHeight: 1.85, color: "rgba(250,247,240,0.55)", margin: "0 0 36px" }}>
            Quer saber mais, pedir orçamento ou simplesmente contar-nos a história das suas flores? Respondemos sempre com cuidado e atenção.
          </p>

          <div className="cta-row" style={{ marginBottom: 28 }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa-big">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar pelo WhatsApp
            </a>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-light">Reservar Data</a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, fontSize: "0.82rem" }}>
            {[
              { href: "/como-funciona",       label: "Como funciona" },
              { href: "/opcoes-e-precos",      label: "Ver preços" },
              { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
            ].map((l, i) => (
              <a
                key={i}
                href={l.href}
                style={{ color: "rgba(250,247,240,0.45)", fontWeight: 600, textDecoration: "none", fontFamily: GS, borderBottom: `1px solid rgba(196,132,107,0.2)`, paddingBottom: 2, transition: "color 0.2s ease, border-color 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = `rgba(196,132,107,0.6)`; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(250,247,240,0.45)"; e.currentTarget.style.borderColor = `rgba(196,132,107,0.2)`; }}
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
