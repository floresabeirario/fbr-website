"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FORM_URL } from "./_lib/constants";

export default function HomeSteps() {
  const t = useTranslations("home");

  const steps = [
    {
      number: "01",
      title: t("step1Title"),
      desc: t("step1Desc"),
      imageSrc: "/calendario.webp",
      imgAlt: t("step1ImgAlt"),
      link: FORM_URL,
      linkLabel: t("step1Link"),
      external: false,
    },
    {
      number: "02",
      title: t("step2Title"),
      desc: t("step2Desc"),
      imageSrc: "/ramojoana.webp",
      imgAlt: t("step2ImgAlt"),
      link: "/como-funciona",
      linkLabel: t("step2Link"),
      external: false,
    },
    {
      number: "03",
      title: t("step3Title"),
      desc: t("step3Desc"),
      imageSrc: "/joanaceu.webp",
      imgAlt: t("step3ImgAlt"),
      link: "/perguntas-frequentes",
      linkLabel: t("step3Link"),
      external: false,
    },
  ];

  return (
    <section
      aria-label={t("stepsEyebrow")}
      className="steps-section"
      data-bg="blush"
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
          <span className="steps-eyebrow">{t("stepsEyebrow")}</span>
          <h2 className="steps-heading">
            {t("stepsHeadingLine1")}<br />
            <em className="steps-heading-em">{t("stepsHeadingLine2")}</em>
          </h2>
          <p className="steps-subheading">
            {t("stepsSubheading")}
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
