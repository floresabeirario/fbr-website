"use client";
import { motion } from "framer-motion";
import { FORM_URL, WA_URL } from "../_lib/constants";

const anim = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

const FEATURES = [
  {
    title: "Para qualquer aniversário",
    desc: "De casamento, de nascimento, ou simplesmente um aniversário especial. Cada data tem o seu significado e as flores que a marcaram merecem ser preservadas.",
  },
  {
    title: "Todo o ramo ou apenas algumas flores",
    desc: "Trabalhamos com o bouquet inteiro ou apenas com as flores que deseja preservar. Pode também incluir fotografias, bilhetes ou outros elementos com significado.",
  },
  {
    title: "Composição aprovada por si",
    desc: "Desenhamos a composição à medida e enviamos fotografias para aprovação. Tem 72 horas para aprovar ou pedir alterações antes de selarmos o quadro.",
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

export default function AniversarioClient() {
  return (
    <div className="momento-page">
      <section className="momento-hero">
        <motion.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">Aniversário</span>
          <h1 className="momento-h1">
            Preservar Flores de<br />
            <em>Aniversário</em>
          </h1>
          <p className="momento-desc">
            Guarde para sempre as flores de um aniversário especial. Uma memória transformada em arte botânica, emoldurada com vidro museu anti-UV e feita à mão em Coimbra.
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
          <span className="momento-eyebrow">Arte Botânica para Cada Data</span>
          <h2 className="momento-content-h2">
            Flores que merecem durar<br />
            <em>mais do que uma semana</em>
          </h2>
          <p className="momento-content-p">
            As flores de aniversário duram, em média, uma semana. A emoção que representam pode durar toda uma vida. Através de prensagem botânica artesanal, transformamos essas flores num quadro que fica permanentemente em casa.
          </p>
          <p className="momento-content-p">
            Basta entregar-nos as flores nos dias seguintes ao aniversário (até 5 dias, idealmente 1 a 3). Nós tratamos da prensagem, da composição artística, da aprovação consigo, e do emolduramento com vidro museu anti-UV e moldura feita à medida em Coimbra.
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
            Transforme as flores<br />
            <em>numa memória</em>
          </h2>
          <p className="momento-final-cta-p">
            Reserve a sua vaga e garanta que esse aniversário fica para sempre. Preços a partir de 300€, com pagamento em três prestações.
          </p>
          <div className="momento-ctas">
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp</a>
          </div>
          <div className="momento-links">
            {[
              { href: "/como-funciona", label: "Como funciona" },
              { href: "/opcoes-e-precos", label: "Opções e preços" },
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
