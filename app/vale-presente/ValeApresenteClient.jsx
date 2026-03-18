"use client";

import { motion } from "framer-motion";
import ValeApresenteForm from "./ValeApresenteForm";
import "./ValeApresenteClient.css";

const STEPS = [
  {
    n: "01",
    text: "Preencha o formulário abaixo com os seus dados e as preferências de entrega do vale.",
  },
  {
    n: "02",
    text: "Receberá um e-mail nosso com a confirmação dos dados e as instruções para pagamento.",
  },
  {
    n: "03",
    text: "Após o pagamento, enviamos uma pré-visualização do vale para a sua aprovação.",
  },
  {
    n: "04",
    text: "Só depois da sua aprovação o vale é enviado ao destinatário, na data que escolher.",
  },
];

export default function ValeApresenteClient() {
  return (
    <div style={{ overflowX: "clip" }}>

      {/* ════ 1. HERO ════ */}
      <section
        aria-label="Vale Presente Flores à Beira-Rio"
        className="vale-hero"
      >
        <div
          aria-hidden="true"
          className="vale-hero-bg"
          style={{ backgroundImage: "url('/vale1.webp')" }}
        />
        <div aria-hidden="true" className="vale-hero-overlay" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="vale-hero-content"
        >
          <span className="vale-eyebrow">Vale Presente</span>
          <h1 className="vale-hero-title">
            Oferecer uma memória<br />
            <em className="vale-hero-em">que dura para sempre</em>
          </h1>
          <p className="vale-hero-sub">
            Preencha o formulário abaixo. Após o envio, receberá por e-mail a
            confirmação e as instruções de pagamento.
          </p>
        </motion.div>
      </section>

      {/* ════ 2. COMO FUNCIONA ════ */}
      <section
        aria-label="Como funciona o vale presente"
        className="vale-steps-section"
      >
        <div className="vale-steps-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="vale-steps-header"
          >
            <span className="vale-eyebrow vale-eyebrow--light">Processo</span>
            <h2 className="vale-steps-title">
              O que acontece<br />
              <em className="vale-hero-em">após o envio</em>
            </h2>
          </motion.div>

          <div className="vale-steps-grid">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                className="vale-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="vale-step-n">{s.n}</span>
                <p className="vale-step-text">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 3. FORMULÁRIO ════ */}
      <section aria-label="Formulário do vale presente" className="vale-form-section">
        <div className="vale-form-header">
          <span className="vale-eyebrow vale-eyebrow--green">Formulário</span>
          <h2 className="vale-form-title">
            Reserve o seu<br />
            <em className="vale-hero-em">vale presente</em>
          </h2>
          <p className="vale-form-intro">
            Campos assinalados com <span aria-hidden="true" style={{ color: "var(--terra)" }}>*</span> são obrigatórios.
          </p>
        </div>
        <ValeApresenteForm />
      </section>

    </div>
  );
}
