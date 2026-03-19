"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ReservarPreservacaoForm from "./ReservarPreservacaoForm";
import "./ReservarPreservacaoClient.css";

const STEPS = [
  {
    n: "01",
    title: "Preenchimento",
    text: "Preencha o formulário com os dados do evento e as suas preferências. O processo demora apenas alguns minutos.",
  },
  {
    n: "02",
    title: "Confirmação e orçamento",
    text: "Nos próximos 3 dias úteis, receberá o valor total do serviço e os dados para pagamento do sinal.",
  },
  {
    n: "03",
    title: "Pagamento do sinal",
    text: "O sinal de 30% deve ser pago em 24 horas. Só após o pagamento a reserva fica confirmada.",
  },
];

export default function ReservarPreservacaoClient() {
  return (
    <main className="rp-page">

      {/* ── HERO ── */}
      <div className="rp-hero">
        <div
          className="rp-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: "url('/quadrovidrosobrevidro.webp')" }}
        />
        <div className="rp-hero-overlay" aria-hidden="true" />
        <motion.div
          className="rp-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="rp-eyebrow">Reserva de Preservação</span>
          <h1 className="rp-title">
            Preserve a memória<br />
            <em className="rp-em">do seu dia especial</em>
          </h1>
          <p className="rp-sub">
            Preencha o formulário para garantir a sua vaga no nosso serviço de preservação de flores,
            feito com dedicação e cuidado, à mão, em Coimbra.
          </p>
          <Link href="/como-funciona" className="rp-info-link">
            Como funciona o processo <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ── PASSOS ── */}
      <motion.div
        className="rp-steps-bar"
        aria-label="Como funciona a reserva"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <ol className="rp-steps">
          {STEPS.map((s, i) => (
            <li key={i} className="rp-step">
              <span className="rp-step-n" aria-hidden="true">{s.n}</span>
              <p className="rp-step-title">{s.title}</p>
              <p className="rp-step-text">{s.text}</p>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* ── FORMULÁRIO ── */}
      <section className="rp-form-wrap" aria-label="Formulário de reserva de preservação">
        <div className="rp-form-lead">
          <h2 className="rp-form-lead-title">Formulário de pré-reserva</h2>
          <p className="rp-form-lead-sub">
            Para garantir a sua vaga, preencha o formulário com os dados do evento e as suas preferências.
            Nos próximos 3 dias úteis, receberá a confirmação do orçamento e as instruções para o pagamento do sinal.
          </p>
        </div>
        <ReservarPreservacaoForm />
      </section>

    </main>
  );
}
