"use client";

import { motion } from "framer-motion";
import ValeApresenteForm from "./ValeApresenteForm";
import "./ValeApresenteClient.css";

const STEPS = [
  {
    n: "01",
    title: "Preenchimento",
    text: "Preencha o formulário com os seus dados e as preferências de entrega.",
  },
  {
    n: "02",
    title: "Confirmação e pagamento",
    text: "Recebe as instruções de pagamento. Só avançamos depois de pago.",
  },
  {
    n: "03",
    title: "Pré-visualização",
    text: "Envia-lhe uma pré-visualização do vale para aprovação.",
  },
  {
    n: "04",
    title: "Entrega",
    text: "O vale é enviado na data que escolher, só após a sua aprovação.",
  },
];

export default function ValeApresenteClient() {
  return (
    <main className="vp-page">

      {/* ── HERO ── */}
      <div className="vp-hero">
        <div
          className="vp-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: "url('/vale1.webp')" }}
        />
        <div className="vp-hero-overlay" aria-hidden="true" />
        <motion.div
          className="vp-hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="vp-eyebrow">Vale Presente</span>
          <h1 className="vp-title">
            Oferecer uma memória<br />
            <em className="vp-em">que dura para sempre</em>
          </h1>
          <p className="vp-sub">
            Flores preservadas e emolduradas à mão, em Coimbra.
            A partir de 300€, sem data de validade.
          </p>
        </motion.div>
      </div>

      {/* ── BARRA DE PASSOS ── */}
      <motion.div
        className="vp-steps-bar"
        aria-label="Como funciona"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <ol className="vp-steps">
          {STEPS.map((s, i) => (
            <li key={i} className="vp-step">
              <span className="vp-step-n" aria-hidden="true">{s.n}</span>
              <p className="vp-step-title">{s.title}</p>
              <p className="vp-step-text">{s.text}</p>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* ── FORMULÁRIO ── */}
      <section className="vp-form-wrap" aria-label="Formulário do vale presente">
        <ValeApresenteForm />
      </section>

    </main>
  );
}
