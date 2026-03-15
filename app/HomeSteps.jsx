"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FORM_URL } from "./_lib/constants";

const steps = [
  { number: "01", title: "Reserve a sua data", desc: "Preencha o formulário de reserva para garantir a sua vaga com antecedência. As vagas são limitadas.", imageSrc: "/calendario.webp" },
  { number: "02", title: "Entregue as flores", desc: "Entrega em mãos em Coimbra, envio por correio ou recolha no local do evento.", imageSrc: "/ramojoana.webp" },
  { number: "03", title: "Recebe a sua obra de arte", desc: "Após aprovação da composição, o quadro é emoldurado e entregue.", imageSrc: "/joanaceu.webp" },
];

export default function HomeSteps() {
  return (
    <section
      aria-label="Como funciona a preservação de flores em 3 passos"
      style={{ background: "linear-gradient(180deg, #0B1929 0%, #0D1F22 100%)", position: "relative", zIndex: 1 }}
    >
      {/* Header da secção */}
      <div style={{ padding: "56px 20px 40px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "3.5px", textTransform: "uppercase", color: "#7AADCA", marginBottom: "12px", fontFamily: "'Google Sans', Roboto, sans-serif" }}>
            Do bouquet ao quadro
          </span>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", color: "#FAF7F0", margin: "0 0 12px", lineHeight: 1.1 }}>
            O seu quadro em três passos
          </h2>
          <p style={{ color: "rgba(250,247,240,0.5)", fontSize: "0.9rem", fontFamily: "'Google Sans', Roboto, sans-serif", margin: 0 }}>
            Um processo simples, com acompanhamento em cada etapa.
          </p>
        </motion.div>
      </div>

      {/* Cartões */}
      <div className="steps-stack">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="step-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="step-photo">
              <Image fill src={step.imageSrc} alt={`Passo ${step.number}: ${step.title}`} sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="step-content">
              <span className="step-number" aria-hidden="true">{step.number}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botões — Como Funciona | Reservar | Perguntas */}
      <div style={{ padding: "32px 20px 56px" }}>
        <div className="steps-buttons">
          <a href="/como-funciona"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(90deg, rgba(58,111,191,0.18) 0%, rgba(46,138,114,0.18) 100%)", border: "1.5px solid rgba(100,175,200,0.35)", color: "rgba(250,247,240,0.88)", padding: "0 28px", height: "52px", borderRadius: "100px", textDecoration: "none", fontWeight: "600", fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", transition: "all 0.3s ease", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(58,111,191,0.32) 0%, rgba(46,138,114,0.32) 100%)"; e.currentTarget.style.borderColor = "rgba(100,175,200,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(58,111,191,0.18) 0%, rgba(46,138,114,0.18) 100%)"; e.currentTarget.style.borderColor = "rgba(100,175,200,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Como Funciona
          </a>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer"
            className="steps-btn-reservar"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(90deg, #3A6FBF 0%, #2E8A72 100%)", color: "#FAF7F0", padding: "0 36px", height: "52px", borderRadius: "100px", textDecoration: "none", fontWeight: "700", fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", transition: "all 0.3s ease", boxShadow: "0 6px 28px rgba(46,138,114,0.35)", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(46,138,114,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(46,138,114,0.35)"; }}
          >
            Reservar a Minha Data
          </a>
          <a href="/perguntas-frequentes"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(90deg, rgba(58,111,191,0.18) 0%, rgba(46,138,114,0.18) 100%)", border: "1.5px solid rgba(100,175,200,0.35)", color: "rgba(250,247,240,0.88)", padding: "0 28px", height: "52px", borderRadius: "100px", textDecoration: "none", fontWeight: "600", fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", transition: "all 0.3s ease", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(58,111,191,0.32) 0%, rgba(46,138,114,0.32) 100%)"; e.currentTarget.style.borderColor = "rgba(100,175,200,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(58,111,191,0.18) 0%, rgba(46,138,114,0.18) 100%)"; e.currentTarget.style.borderColor = "rgba(100,175,200,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Perguntas Frequentes
          </a>
        </div>
      </div>
    </section>
  );
}
