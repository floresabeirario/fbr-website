"use client";

import { motion } from "framer-motion";

export default function Sustentabilidade() {
  const FORM = "https://wkf.ms/3RfoNAc";
  const WA = "https://wa.me/351934680300?text=" +
    encodeURIComponent("Olá! Gostaria de saber mais sobre a sustentabilidade da Flores à Beira-Rio.");

  return (
    <main style={{ backgroundColor: "#FAF7F0", minHeight: "100vh" }}>
      <section style={{
        paddingTop: "clamp(140px,18vw,200px)",
        paddingBottom: "clamp(80px,12vw,140px)",
        paddingLeft: "20px", paddingRight: "20px",
        background: "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)",
        textAlign: "center"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "640px", margin: "0 auto" }}
        >
          <span style={{
            display: "block", fontSize: "0.58rem", fontWeight: 700,
            letterSpacing: "3.5px", textTransform: "uppercase",
            color: "#C4846B", marginBottom: "14px",
            fontFamily: "Roboto, sans-serif"
          }}>
            Os Nossos Valores
          </span>
          <h1 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2.6rem,8vw,5rem)",
            color: "#1E2D2A", margin: "0 0 20px", lineHeight: 1.02
          }}>
            Sustentabilidade<br/>
            <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>e Consciência</em>
          </h1>
          <p style={{
            color: "#5A6B60",
            fontSize: "clamp(0.95rem,2vw,1.08rem)",
            lineHeight: 1.88, maxWidth: "520px",
            margin: "0 auto 36px"
          }}>
            Acreditamos que a preservação de memórias não deve custar ao planeta. Sem químicos, sem plásticos, sem resina — apenas técnicas artesanais de prensagem botânica, materiais de conservação museu e embalagens feitas à mão pela APCC Coimbra.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a href={FORM} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", backgroundColor: "#3D6B5E", color: "#FAF7F0",
              padding: "15px 34px", borderRadius: "100px", textDecoration: "none",
              fontWeight: 600, fontSize: "0.82rem", letterSpacing: "1.4px",
              textTransform: "uppercase", fontFamily: "Roboto, sans-serif",
              boxShadow: "0 6px 22px rgba(61,107,94,0.28)", transition: "all 0.3s ease"
            }}>
              Reservar Data
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "#25D366", color: "#fff",
              padding: "15px 28px", borderRadius: "100px", textDecoration: "none",
              fontWeight: 600, fontSize: "0.82rem", letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease"
            }}>
              WhatsApp
            </a>
          </div>
          <div style={{
            marginTop: "48px", display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: "20px", fontSize: "0.82rem"
          }}>
            {[
              { href: "/como-funciona", label: "Como funciona" },
              { href: "/opcoes-e-precos", label: "Ver preços" },
              { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
            ].map((l, i) => (
              <a key={i} href={l.href} style={{
                color: "#3D6B5E", fontWeight: 600, textDecoration: "none",
                borderBottom: "1px solid rgba(61,107,94,0.3)", paddingBottom: "1px",
                fontFamily: "Roboto, sans-serif"
              }}>
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
