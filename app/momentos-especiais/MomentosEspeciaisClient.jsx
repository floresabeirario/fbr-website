"use client";
import { motion } from "framer-motion";
import { FORM_URL, WA_URL } from "../_lib/constants";

const MOMENTOS = [
  {
    href: "/preservar-bouquet-noiva",
    title: "Bouquet de Noiva",
    desc: "O serviço mais procurado. Preservamos o bouquet de casamento numa obra de arte botânica que dura décadas.",
  },
  {
    href: "/preservar-flores-luto-homenagem",
    title: "Homenagem e Luto",
    desc: "Eternize as flores de uma cerimónia fúnebre como forma de homenagem duradoura.",
  },
  {
    href: "/preservar-flores-batizado-nascimento",
    title: "Batizado e Nascimento",
    desc: "Guarde as flores do batizado ou da maternidade para recordar esse momento único.",
  },
  {
    href: "/preservar-flores-aniversario",
    title: "Aniversário",
    desc: "Transforme flores de aniversário numa memória permanente, cheia de significado.",
  },
  {
    href: "/preservar-flores-pedido-casamento",
    title: "Pedido de Casamento",
    desc: "As flores do pedido merecem ser preservadas tanto quanto as do casamento.",
  },
];

const anim = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export default function MomentosEspeciaisClient() {
  return (
    <main className="momento-page">
      <section className="momento-hero">
        <motion.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">Para cada ocasião</span>
          <h1 className="momento-h1">
            Momentos<br />
            <em>Especiais</em>
          </h1>
          <p className="momento-desc">
            Preservamos flores de casamentos, batizados, homenagens fúnebres,
            aniversários, pedidos de casamento e qualquer momento
            que mereça ser eternizado.
          </p>
          <div className="momento-ctas">
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp</a>
          </div>
        </motion.div>
      </section>

      <section className="momentos-hub-section">
        <div className="momentos-hub-grid">
          {MOMENTOS.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="momentos-hub-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.65 }}
            >
              <h2 className="momentos-hub-card-title">{item.title}</h2>
              <p className="momentos-hub-card-desc">{item.desc}</p>
              <span className="momentos-hub-card-cta">Saber mais →</span>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="momentos-hub-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="momentos-hub-cta-inner"
        >
          <h2 className="momentos-hub-cta-h2">Reserve a sua vaga</h2>
          <p className="momentos-hub-cta-p">
            As vagas são limitadas, garanta a preservação das suas flores
            com a antecedência necessária.
          </p>
          <div className="momento-ctas">
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
