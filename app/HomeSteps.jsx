"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FORM_URL } from "./_lib/constants";

const steps = [
  {
    number: "01",
    title: "Reserve a sua data",
    desc: "Preencha o formulário de reserva para garantir a sua vaga com antecedência. As vagas são limitadas.",
    imageSrc: "/calendario.webp",
    imgAlt: "Calendário de marcação de reserva de preservação de flores",
  },
  {
    number: "02",
    title: "Entregue as flores",
    desc: "Entrega em mãos em Coimbra, envio por correio ou recolha no local do evento.",
    imageSrc: "/ramojoana.webp",
    imgAlt: "Ramo de flores frescas para preservação botânica",
  },
  {
    number: "03",
    title: "Recebe a sua obra de arte",
    desc: "Após aprovação da composição, o quadro é emoldurado e entregue.",
    imageSrc: "/joanaceu.webp",
    imgAlt: "Quadro de flores preservadas emoldurado, pronto a entregar",
  },
];

export default function HomeSteps() {
  return (
    <section
      aria-label="Como funciona a preservação de flores em 3 passos"
      className="steps-section"
    >
      {/* Header */}
      <div className="steps-header">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="steps-eyebrow">Do bouquet ao quadro</span>
          <h2 className="steps-heading">O seu quadro em três passos</h2>
          <p className="steps-subheading">
            Um processo simples, com acompanhamento em cada etapa.
          </p>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="steps-grid" role="list">
        {steps.map((step, i) => (
          <motion.article
            key={i}
            role="listitem"
            className="step-item"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="step-image-wrap">
              <Image
                fill
                src={step.imageSrc}
                alt={step.imgAlt}
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="step-body">
              <span className={`step-num step-num--${i + 1}`} aria-hidden="true">
                {step.number}
              </span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* CTAs */}
      <div className="steps-cta">
        <a href="/como-funciona" className="steps-btn-outline">Como Funciona</a>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="steps-btn-primary"
        >
          Reservar a Minha Data
        </a>
        <a href="/perguntas-frequentes" className="steps-btn-outline">Perguntas Frequentes</a>
      </div>
    </section>
  );
}
