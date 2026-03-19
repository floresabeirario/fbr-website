"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ReservarPreservacaoForm from "./ReservarPreservacaoForm";
import "./ReservarPreservacaoClient.css";

const STEPS = [
  {
    n: "01",
    title: "Preenchimento",
    text: "Preencha o formulário com os seus dados e preferências. O processo demora apenas alguns minutos.",
  },
  {
    n: "02",
    title: "Confirmação e orçamento",
    text: "Nos próximos 3 dias úteis, recebe um e-mail com o valor total e os dados para pagamento do sinal.",
  },
  {
    n: "03",
    title: "Pagamento do sinal",
    text: "O sinal de 30% deve ser pago em 24 horas para garantir a sua vaga. Só após o pagamento a reserva fica confirmada.",
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
          style={{ backgroundImage: "url('/reserva.webp')" }}
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
            Garanta a sua vaga<br />
            <em className="rp-em">e preserve a memória</em>
          </h1>
          <p className="rp-sub">
            Preencha o formulário abaixo para iniciar a reserva do seu serviço de preservação de flores.
            Entramos em contacto nos próximos 3 dias úteis com o orçamento e os dados para pagamento do sinal.
          </p>
          <Link href="/como-funciona" className="rp-info-link">
            Saber mais sobre como funciona <span aria-hidden="true">→</span>
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
            Olá e obrigado por escolher a Flores à Beira-Rio!
            Este formulário serve para garantir a sua vaga no nosso serviço de preservação de flores.
            O preenchimento leva apenas alguns minutos e ajuda-nos a oferecer um serviço mais personalizado e cuidadoso.
          </p>
          <p className="rp-form-lead-sub">
            Após a submissão, receberá um e-mail com os próximos passos, incluindo a confirmação do orçamento
            e os dados para o pagamento do sinal.
            Em caso de dúvidas, estamos sempre disponíveis através de{" "}
            <a href="mailto:info@floresabeirario.pt" className="rp-form-link">
              info@floresabeirario.pt
            </a>.
          </p>
        </div>
        <ReservarPreservacaoForm />
      </section>

    </main>
  );
}
