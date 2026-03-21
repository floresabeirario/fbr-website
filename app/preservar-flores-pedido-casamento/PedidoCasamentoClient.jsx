"use client";
import { motion } from "framer-motion";
import { FORM_URL, WA_URL } from "../_lib/constants";

const anim = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

const FEATURES = [
  {
    title: "O início de uma história",
    desc: "As flores do pedido de casamento marcam o dia em que disseram 'sim' pela primeira vez. Esse momento merece existir para além da memória.",
  },
  {
    title: "Preserve antes do casamento",
    desc: "Não precisa de esperar pelo casamento. As flores do pedido merecem o mesmo cuidado e podem ser preservadas de imediato.",
  },
  {
    title: "Uma peça que conta dois capítulos",
    desc: "O quadro do pedido e, mais tarde, o do bouquet. Juntos formam a história completa desde o primeiro 'sim'.",
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

export default function PedidoCasamentoClient() {
  return (
    <div className="momento-page">
      <section className="momento-hero">
        <motion.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">Pedido de Casamento</span>
          <h1 className="momento-h1">
            Preservar Flores do<br />
            <em>Pedido de Casamento</em>
          </h1>
          <p className="momento-desc">
            As flores do pedido de casamento marcam o início de uma história. Preserve esse momento numa obra de arte botânica que acompanha toda a vossa vida juntos.
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
          <span className="momento-eyebrow">Antes de Tudo o Resto</span>
          <h2 className="momento-content-h2">
            Onde tudo<br />
            <em>começou</em>
          </h2>
          <p className="momento-content-p">
            Há uma data anterior ao casamento que muitas vezes se perde: o dia do pedido. O momento em que tudo começou. As flores que estiveram presentes nessa noite merecem ser guardadas com o mesmo cuidado que o bouquet de noiva.
          </p>
          <p className="momento-content-p">
            Preservamos as flores do pedido de casamento numa obra de arte botânica feita à mão, emoldurada com vidro museu anti-UV, para que esse primeiro capítulo da vossa história nunca desapareça.
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
            Reserve para o<br />
            <em>vosso primeiro sim</em>
          </h2>
          <p className="momento-final-cta-p">
            As vagas são limitadas. Garanta a preservação das flores do pedido enquanto ainda estão frescas.
          </p>
          <div className="momento-ctas">
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp</a>
          </div>
          <div className="momento-links">
            {[
              { href: "/como-funciona", label: "Como funciona" },
              { href: "/opcoes-e-precos", label: "Ver preços" },
              { href: "/preservar-bouquet-noiva", label: "Bouquet de noiva" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="momento-link">{l.label}</a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
