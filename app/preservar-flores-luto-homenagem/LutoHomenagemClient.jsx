"use client";
import { motion } from "framer-motion";
import { FORM_URL, WA_URL_LUTO } from "../_lib/constants";

const anim = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

const FEATURES = [
  {
    title: "Com todo o cuidado",
    desc: "Tratamos cada encomenda deste tipo com especial atenção. Sabemos o que representa e trabalhamos com o respeito e a discrição que a circunstância exige.",
  },
  {
    title: "Envie-nos as flores até 5 dias depois",
    desc: "O ideal é entregar as flores nos primeiros 1 a 3 dias após a cerimónia. Se o prazo já tiver passado, contacte-nos para avaliarmos as opções, incluindo a recriação com flores frescas.",
  },
  {
    title: "Sem pressão para decidir",
    desc: "Se ainda não é o momento de pensar nisto, não há pressa para contactar. Quando estiver preparado ou preparada, estamos cá.",
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

export default function LutoHomenagemClient() {
  return (
    <div className="momento-page">
      <section className="momento-hero">
        <motion.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">Homenagem e Luto</span>
          <h1 className="momento-h1">
            Preservar Flores de<br />
            <em>Homenagem e Luto</em>
          </h1>
          <p className="momento-desc">
            Eternize as flores de uma cerimónia fúnebre como forma de homenagem duradoura. Um gesto de carinho permanente, preservado com todo o respeito e sensibilidade.
          </p>
          <div className="momento-ctas">
            <a href={WA_URL_LUTO} target="_blank" rel="noopener noreferrer" className="btn-wa">Falar connosco</a>
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
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
          <span className="momento-eyebrow">Uma memória que permanece</span>
          <h2 className="momento-content-h2">
            Uma homenagem que<br />
            <em>fica para sempre</em>
          </h2>
          <p className="momento-content-p">
            As flores que estiveram presentes numa cerimónia de despedida carregam um significado profundo. Preservá-las é uma forma de manter viva a memória de quem partiu, transformando-as numa peça de arte botânica que pode permanecer em casa como homenagem silenciosa e permanente.
          </p>
          <p className="momento-content-p">
            Cada pétala é tratada individualmente por prensagem artesanal e emoldurada com vidro museu anti-UV e moldura feita à medida em Coimbra. Pode também incluir na composição uma fotografia, um cartão ou qualquer elemento que tenha significado para si.
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
            Quando estiver<br />
            <em>pronto ou pronta</em>
          </h2>
          <p className="momento-final-cta-p">
            Não há urgência. Contacte-nos quando for o momento certo para si. Preços a partir de 300€, com pagamento em três prestações.
          </p>
          <div className="momento-ctas">
            <a href={WA_URL_LUTO} target="_blank" rel="noopener noreferrer" className="btn-wa">Falar connosco</a>
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
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
