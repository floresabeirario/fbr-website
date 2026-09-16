"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

/* Faixa de alcance geográfico.
   Existe por uma razão concreta e medida: muitos clientes liam "Coimbra" no
   hero e desistiam, convencidos de que teriam de trazer as flores em mãos.
   Aparece imediatamente a seguir ao hero, que é o primeiro scroll no
   telemóvel (95% do tráfego), e responde à objecção antes que ela se forme.
   A ordem das três colunas é deliberada: recolha, correio e só depois o
   atelier, para que a barreira caia antes de Coimbra ser mencionada. */

const IconVan = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 16V7a1 1 0 0 1 1-1h10v10" />
    <path d="M13 9h4.5l3.5 4v3h-2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M9 17h6" />
  </svg>
);

const IconBox = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5 12 4l9 4.5v7L12 20l-9-4.5v-7Z" />
    <path d="M3 8.5 12 13l9-4.5" />
    <path d="M12 13v7" />
    <path d="M7.5 6.2 16.5 10.8" />
  </svg>
);

const IconAtelier = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M12 20v-5" />
    <path d="M12 15c-1.6 0-2.6-1-2.6-2.4 1.6 0 2.6 1 2.6 2.4Z" />
    <path d="M12 15c1.6 0 2.6-1 2.6-2.4-1.6 0-2.6 1-2.6 2.4Z" />
  </svg>
);

const ICONS = [<IconVan key="0" />, <IconBox key="1" />, <IconAtelier key="2" />];

export default function HomeReach() {
  const t = useTranslations("home");
  const itens = t.raw("alcance");

  return (
    <section
      aria-label={t("alcanceTitulo")}
      data-bg="neutral"
      className="reach-section"
    >
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="reach-inner"
      >
        <span className="eyebrow reach-eyebrow">{t("alcanceEyebrow")}</span>
        <h2 className="reach-title">{t("alcanceTitulo")}</h2>

        <ul className="reach-grid" role="list">
          {itens.map((item, i) => (
            <li key={i} className="reach-item">
              <span className="reach-icon" aria-hidden="true">{ICONS[i]}</span>
              <span className="reach-text">
                <span className="reach-item-title">{item.titulo}</span>
                <span className="reach-item-desc">{item.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </m.div>
    </section>
  );
}
