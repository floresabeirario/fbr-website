"use client";
import { motion } from "framer-motion";
import { FORM_URL, WA_URL } from "../_lib/constants";

const anim = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

const FEATURES = [
  {
    title: "Flores da cerimónia e do hospital",
    desc: "Preservamos ramos do batizado, flores do hospital, arranjos do quarto do bebé. Qualquer flor desse início de vida.",
  },
  {
    title: "Arte que cresce com o seu filho",
    desc: "A peça que hoje decora o quarto do bebé torna-se, com o tempo, numa memória de adulto cheia de significado.",
  },
  {
    title: "Materiais de arquivo profissional",
    desc: "Vidro museu anti-UV e técnicas de conservação que garantem décadas de durabilidade sem perda de cor.",
  },
];

function CheckIcon() {
  return (
    <svg className="momento-feature-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="rgba(196,132,107,0.1)" />
      <path d="M6 10l3 3 5-5" stroke="var(--terra)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BatizadoNascimentoClient() {
  return (
    <div className="momento-page">
      <section className="momento-hero">
        <motion.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">Batizado e Nascimento</span>
          <h1 className="momento-h1">
            Preservar Flores de<br />
            <em>Batizado e Nascimento</em>
          </h1>
          <p className="momento-desc">
            As flores do batizado ou do nascimento merecem ser guardadas para sempre. Preservamos cada pétala em arte botânica que acompanha o seu filho ao longo da vida.
          </p>
          <div className="momento-ctas">
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp</a>
          </div>
        </motion.div>
      </section>

      <section className="momento-content momento-content--warm">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="momento-content-inner"
        >
          <span className="momento-eyebrow">O início de tudo</span>
          <h2 className="momento-content-h2">
            O primeiro ramo<br />
            <em>de uma vida inteira</em>
          </h2>
          <p className="momento-content-p">
            Há momentos que marcam o início de tudo. O nascimento de um filho, o dia do batizado, a primeira vez que os pais seguraram as flores ao lado do berço. São memórias que merecem existir para além de uma fotografia.
          </p>
          <p className="momento-content-p">
            Transformamos as flores desse dia numa obra de arte botânica feita à mão, emoldurada com vidro museu, pronta a ocupar o seu lugar em casa durante as próximas décadas.
          </p>
        </motion.div>
      </section>

      <section className="momento-features">
        <div className="momento-features-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className="momento-feature-item"
            >
              <CheckIcon />
              <div>
                <h3 className="momento-feature-title">{f.title}</h3>
                <p className="momento-feature-desc">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="momento-final-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="momento-final-cta-inner"
        >
          <h2 className="momento-final-cta-h2">
            Preserve o início<br />
            <em>da história</em>
          </h2>
          <p className="momento-final-cta-p">
            As flores do batizado ou do nascimento não precisam de ficar apenas na memória. Reserve a sua vaga e garanta que esse dia fica para sempre em casa.
          </p>
          <div className="momento-ctas">
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp</a>
          </div>
          <div className="momento-links">
            {[
              { href: "/como-funciona", label: "Como funciona" },
              { href: "/opcoes-e-precos", label: "Ver preços" },
              { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="momento-link">{l.label}</a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
