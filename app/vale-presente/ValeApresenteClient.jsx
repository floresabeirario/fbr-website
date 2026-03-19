"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ValeApresenteForm from "./ValeApresenteForm";
import "./ValeApresenteClient.css";

const STEPS = [
  {
    n: "01",
    title: "Preenchimento",
    text: "Preencha o formulário com os seus dados e preferências de entrega.",
  },
  {
    n: "02",
    title: "Confirmação e pagamento",
    text: "Recebe as instruções de pagamento. Só avançamos depois de pago.",
  },
  {
    n: "03",
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="vp-eyebrow">Vale Presente</span>
          <h1 className="vp-title">
            Ofereça a preservação<br />
            <em className="vp-em">de flores</em>
          </h1>
          <p className="vp-sub">
            Preencha o formulário abaixo para encomendar o seu vale.
            Entramos em contacto para confirmar os detalhes e processar o pagamento.
          </p>
          <Link href="/oferecer-preservacao" className="vp-info-link">
            Saber mais sobre como funciona <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ── PASSOS ── */}
      <motion.div
        className="vp-steps-bar"
        aria-label="Como funciona"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
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
      <section className="vp-form-wrap" aria-label="Formulário de encomenda do vale presente">
        <div className="vp-form-lead">
          <h2 className="vp-form-lead-title">Formulário de encomenda</h2>
          <p className="vp-form-lead-sub">
            A partir de 300€, sem data de validade.
            Entrega digital (gratuita) ou em cartão físico (9€ + portes).
          </p>
        </div>
        <ValeApresenteForm />
      </section>

    </main>
  );
}
