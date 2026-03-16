"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FORM_URL } from "./_lib/constants";

const steps = [
  {
    number: "01",
    title: "Reserve a sua data",
    desc: "Preencha o formulário de reserva para garantir a sua vaga. As datas esgotam rapidamente.",
    imageSrc: "/calendario.webp",
    imgAlt: "Calendário de marcação de reserva de preservação de flores",
    link: FORM_URL,
    linkLabel: "Reservar a minha data",
    external: true,
  },
  {
    number: "02",
    title: "Entregue as flores",
    desc: "Entrega em mãos em Coimbra, envio por correio ou recolha no local do evento.",
    imageSrc: "/ramojoana.webp",
    imgAlt: "Ramo de flores frescas para preservação botânica",
    link: "/como-funciona",
    linkLabel: "Como funciona",
    external: false,
  },
  {
    number: "03",
    title: "Recebe a sua obra de arte",
    desc: "Após aprovação da composição, o quadro é emoldurado e entregue à sua porta.",
    imageSrc: "/joanaceu.webp",
    imgAlt: "Quadro de flores preservadas emoldurado, pronto a entregar",
    link: "/perguntas-frequentes",
    linkLabel: "Perguntas frequentes",
    external: false,
  },
];

export default function HomeSteps() {
  return (
    <section
      aria-label="Como funciona a preservação de flores em 3 passos"
      className="steps-section"
      data-bg="#F5F8F5"
    >
      {/* Decorative gradient blobs */}
      <div className="steps-blob steps-blob--1" aria-hidden="true" />
      <div className="steps-blob steps-blob--2" aria-hidden="true" />

      {/* Header */}
      <div className="steps-header">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="steps-eyebrow">O seu quadro em três passos</span>
          <h2 className="steps-heading">
            Do bouquet<br />
            <em className="steps-heading-em">ao quadro</em>
          </h2>
          <p className="steps-subheading">
            Um processo artesanal, com acompanhamento em cada etapa.
          </p>
        </motion.div>
      </div>

      {/* Steps grid */}
      <div className="steps-grid" role="list">
        {steps.map((step, i) => (
          <motion.article
            key={i}
            role="listitem"
            className="step-card"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.14, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Photo */}
            <div className="step-photo-wrap">
              <Image
                fill
                src={step.imageSrc}
                alt={step.imgAlt}
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="step-photo-overlay" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="step-content">
              <span className="step-num" aria-hidden="true">{step.number}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              <a
                href={step.link}
                className="step-inline-link"
                {...(step.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {step.linkLabel} <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
