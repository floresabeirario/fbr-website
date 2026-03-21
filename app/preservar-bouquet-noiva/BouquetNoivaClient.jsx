"use client";
import { motion } from "framer-motion";
import { FORM_URL, WA_URL_NOIVA } from "../_lib/constants";

const anim = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } };

const FEATURES = [
  {
    title: "Entregue o bouquet até 5 dias depois",
    desc: "Após o casamento, envie-nos o bouquet o mais rápido possível. O ideal é 1 a 3 dias; aceitamos até 5 dias após a cerimónia. Enquanto espera, mantenha-o num vaso com água fresca, longe do calor e da luz solar.",
  },
  {
    title: "Aprove a composição antes de selar",
    desc: "Quando a composição estiver pronta, recebe fotografias por e-mail e tem 72 horas para aprovar ou pedir alterações. Nada é definitivo sem o seu acordo.",
  },
  {
    title: "Qualidade museu que dura décadas",
    desc: "Vidro UltraVue® anti-UV, cartão e cola de pH neutro, moldura feita à medida em Coimbra. Os mesmos materiais usados em museus e arquivos profissionais.",
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

export default function BouquetNoivaClient() {
  return (
    <div className="momento-page">
      <section className="momento-hero">
        <motion.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">Bouquet de Noiva</span>
          <h1 className="momento-h1">
            Preservar o<br />
            <em>Bouquet de Noiva</em>
          </h1>
          <p className="momento-desc">
            Transformamos o bouquet do seu casamento numa obra de arte botânica que dura décadas. Prensagem artesanal, vidro museu anti-UV e emolduramento feito à mão em Coimbra.
          </p>
          <div className="momento-ctas">
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
            <a href={WA_URL_NOIVA} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp</a>
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
          <span className="momento-eyebrow">Arte Botânica Artesanal</span>
          <h2 className="momento-content-h2">
            O bouquet que esteve presente<br />
            <em>nos seus votos</em>
          </h2>
          <p className="momento-content-p">
            O bouquet de noiva é, para muitos casais, a peça mais simbólica do dia do casamento. Em vez de o ver murchar ao longo dos dias seguintes, pode transformá-lo num quadro de arte botânica que dura décadas, pronto a pendurar na parede de casa.
          </p>
          <p className="momento-content-p">
            O processo começa com a reserva da data, idealmente assim que souber quando é o casamento. Nos dias seguintes à cerimónia, entrega-nos o bouquet e nós tratamos de tudo: prensagem pétala a pétala, composição artística, aprovação por si, e emolduramento com vidro museu anti-UV. Pode também incluir na composição o convite do casamento, votos manuscritos, fitas, ou qualquer elemento com significado especial.
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
            Reserve antes<br />
            <em>do grande dia</em>
          </h2>
          <p className="momento-final-cta-p">
            As vagas são limitadas, especialmente entre maio e setembro. Recomendamos reservar assim que souber a data do casamento. Preços a partir de 300€, com pagamento em três prestações.
          </p>
          <div className="momento-ctas">
            <a href={FORM_URL} className="btn-primary">Reservar Data</a>
            <a href={WA_URL_NOIVA} target="_blank" rel="noopener noreferrer" className="btn-wa">WhatsApp</a>
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
