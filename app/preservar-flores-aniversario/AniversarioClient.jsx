"use client";
import { motion } from "framer-motion";
import { FORM_URL, WA_URL } from "../_lib/constants";

const anim = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

const FEATURES = [
  {
    title: "Para qualquer aniversário",
    desc: "Seja o vigésimo-quinto, o quinquagésimo ou qualquer outro. Cada data tem o seu significado e merece ser guardada.",
  },
  {
    title: "Ramo completo ou flores escolhidas",
    desc: "Trabalhamos com o ramo inteiro ou apenas com as flores que deseja preservar. A escolha é sua.",
  },
  {
    title: "Composição personalizada",
    desc: "Desenhamos a composição à medida do espaço e do gosto, e enviamos fotografia para aprovação antes de selar.",
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
            Guarde para sempre as flores de um aniversário especial. Uma memória transformada em arte botânica, emoldurada com vidro museu.
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
            Flores de aniversário duram, em média, uma semana. A emoção que representam pode durar toda uma vida. Preservamos essas flores numa obra de arte botânica feita à mão, para que a memória desse dia não se perca com elas.
          </p>
          <p className="momento-content-p">
            Seja um aniversário redondo, um momento pessoal importante ou simplesmente um ramo com significado, tratamos cada peça com o mesmo cuidado artesanal e os mesmos materiais de qualidade museu.
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
            As flores ficam. A data fica. Reserve a sua vaga e garanta que esse aniversário especial tem um lugar permanente em casa.
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
