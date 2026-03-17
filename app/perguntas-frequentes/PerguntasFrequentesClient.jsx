// app/perguntas-frequentes/PerguntasFrequentesClient.jsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FORM_URL, WA_NUMBER } from "../_lib/constants";
import { FAQ_DATA } from "./faq-data";
import FaqAccordion from "./FaqAccordion";
import "./PerguntasFrequentesClient.css";

const SchemaScript = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_DATA.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.plain },
        })),
      }),
    }}
  />
);

export default function PerguntasFrequentesClient() {
  const WA   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre a preservação das minhas flores.")}`;
  const FORM = FORM_URL;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.38], [0, 28]);

  return (
    <>
      <SchemaScript />

      <div style={{ backgroundColor: "#FAF7F0" }}>

        {/* Hero */}
        <section
          ref={heroRef}
          aria-label="Perguntas frequentes sobre preservação de flores"
          style={{
            position: "relative",
            height: "100dvh",
            minHeight: "560px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/sandraclose.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }} aria-hidden="true" />

          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(20,8,18,0.28) 0%, rgba(20,8,18,0.55) 55%, rgba(20,8,18,0.82) 100%)",
          }} aria-hidden="true" />

          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroY,
              position: "relative",
              zIndex: 2,
              width: "100%",
              padding: "0 clamp(20px,6vw,80px)",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                display: "inline-block",
                fontSize: "0.68rem", fontWeight: "700",
                letterSpacing: "3.5px", textTransform: "uppercase",
                color: "rgba(250,247,240,0.9)",
                marginBottom: "20px",
                fontFamily: "'Google Sans', Roboto, sans-serif",
              }}>
                Tire as suas dúvidas
              </span>

              <h1 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2.4rem,6vw,5rem)",
                color: "#FAF7F0",
                margin: "0 auto",
                lineHeight: 1.02,
                textShadow: "0 4px 32px rgba(0,0,0,0.3)",
                maxWidth: "800px",
              }}>
                Perguntas<br />
                <em style={{ fontStyle: "italic", color: "#FAF7F0" }}>Frequentes</em>
              </h1>

              <p style={{
                color: "rgba(250,247,240,0.82)",
                fontSize: "clamp(0.9rem,2vw,1.05rem)",
                lineHeight: 1.85,
                maxWidth: "480px",
                margin: "20px auto 0",
                fontFamily: "'Google Sans', Roboto, sans-serif",
              }}>
                Tudo o que precisa de saber sobre preservação de flores,
                processo artesanal, entrega e pagamentos.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <FaqAccordion />

        {/* CTA final — largura total */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{
            background: "linear-gradient(135deg, #2D1B26 0%, #4A1E3A 40%, #3D6B5E 100%)",
            padding: "clamp(56px,8vw,88px) clamp(20px,6vw,80px)",
            textAlign: "center",
          }}
        >
          <span style={{
            display: "inline-block",
            fontSize: "0.65rem", fontWeight: "700",
            letterSpacing: "3px", textTransform: "uppercase",
            color: "rgba(230,180,210,0.85)", marginBottom: "16px",
            fontFamily: "'Google Sans', Roboto, sans-serif",
          }}>
            Apoio personalizado
          </span>

          <h3 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.6rem,4vw,2.6rem)",
            color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.15,
          }}>
            À procura de mais ajuda?
          </h3>

          <p style={{
            color: "rgba(250,247,240,0.8)", fontSize: "clamp(0.88rem,1.8vw,0.97rem)",
            lineHeight: 1.85, margin: "0 auto 36px", maxWidth: "520px",
            fontFamily: "'Google Sans', Roboto, sans-serif",
          }}>
            Agende uma <strong style={{ color: "#FAF7F0" }}>sessão de esclarecimento gratuita</strong> por{" "}
            <strong style={{ color: "#FAF7F0" }}>videochamada</strong> antes de fazer o seu pedido.
            Podemos ajudá-lo a <strong style={{ color: "#FAF7F0" }}>entender o processo de preservação</strong> e a{" "}
            <strong style={{ color: "#FAF7F0" }}>escolher os produtos</strong> que melhor se adequam a si.
            Esta sessão tem a duração aproximada de <strong style={{ color: "#FAF7F0" }}>30 minutos</strong>.
          </p>

          <div className="cta-row" style={{ justifyContent: "center" }}>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.25)",
                color: "#FAF7F0", padding: "14px 32px",
                borderRadius: "100px", textDecoration: "none", fontWeight: "600",
                fontSize: "0.8rem", letterSpacing: "1.2px", textTransform: "uppercase",
                transition: "all 0.3s ease",
                fontFamily: "'Google Sans', Roboto, sans-serif",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            >
              Agendar Sessão Gratuita
            </a>
            <a href={FORM} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Reservar Data
            </a>
          </div>
        </motion.div>

      </div>
    </>
  );
}
