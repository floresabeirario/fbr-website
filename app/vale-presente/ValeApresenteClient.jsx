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
    <main className="vale-layout">

      {/* ── PAINEL ESQUERDO ── */}
      <aside className="vale-panel" aria-label="Vale presente — informações">
        <div
          className="vale-panel-bg"
          aria-hidden="true"
          style={{ backgroundImage: "url('/vale1.webp')" }}
        />
        <div className="vale-panel-overlay" aria-hidden="true" />

        <div className="vale-panel-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="vale-eyebrow">Vale Presente</span>
            <h1 className="vale-panel-title">
              Oferecer uma memória<br />
              <em className="vale-panel-em">que dura para sempre</em>
            </h1>
            <p className="vale-panel-sub">
              Flores preservadas e emolduradas à mão, em Coimbra.
              A partir de 300€, sem data de validade.
            </p>
          </motion.div>

          <motion.ol
            className="vale-steps"
            aria-label="Como funciona"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {STEPS.map((s, i) => (
              <li key={i} className="vale-step">
                <div className="vale-step-left" aria-hidden="true">
                  <span className="vale-step-n">{s.n}</span>
                  <span className="vale-step-line" />
                </div>
                <div>
                  <p className="vale-step-title">{s.title}</p>
                  <p className="vale-step-text">{s.text}</p>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </aside>

      {/* ── PAINEL DIREITO: FORMULÁRIO ── */}
      <section
        className="vale-form-panel"
        aria-label="Formulário do vale presente"
      >
        <ValeApresenteForm />
      </section>

    </main>
  );
}
