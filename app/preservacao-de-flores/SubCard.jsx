"use client";

import { motion } from "framer-motion";

export const SUBPAGES = [
  {
    href: "/opcoes-e-precos",
    tag: "Tamanhos e valores",
    title: "Opções e Preços",
    desc: "Quadros a partir de 300€. Três tamanhos, quatro tipos de fundo e extras personalizados. Vidro museu UltraVue® anti-UV incluído em todas as peças.",
    img: "/fotoquadro1.webp",
    imgAlt: "Quadro de flores prensadas com vidro museu — Opções e Preços",
    cta: "Ver tamanhos e preços",
    accent: "#8BA888",
    n: "01",
  },
  {
    href: "/como-funciona",
    tag: "O processo completo",
    title: "Como Funciona",
    desc: "Cinco passos desde a reserva até ao quadro emoldurado em casa. Pagamento em três prestações e composição aprovada por si antes de selar.",
    img: "/prensa.webp",
    imgAlt: "Processo de prensagem botânica artesanal — Como Funciona",
    cta: "Ver o processo",
    accent: "#C8522A",
    n: "02",
  },
  {
    href: "/sustentabilidade",
    tag: "Os nossos valores",
    title: "Sustentabilidade",
    desc: "Prensagem 100% natural, sem resinas petroquímicas nem sílica industrial. Embalagem artesanal feita pela APCC Coimbra. Materiais de conservação museu.",
    img: "/ines1.webp",
    imgAlt: "Preservação botânica sustentável — Flores à Beira-Rio Coimbra",
    cta: "Conhecer os valores",
    accent: "#3D6B5E",
    n: "03",
  },
  {
    href: "/emoldurar-flores-secas",
    tag: "Ramo já seco",
    title: "Emoldurar Flores Já Secas",
    desc: "O seu bouquet já secou? Emolduramos ramos secos, combinamos originais com réplicas ou recriamos o ramo com flores frescas para que nada se perca.",
    img: "/quadrovidrosobrevidro.webp",
    imgAlt: "Emoldurar ramo de flores secas — bouquet de noiva já seco",
    cta: "Saber mais",
    accent: "#1B4B6B",
    n: "04",
  },
];

const Arrow = ({ color = "#FAF7F0" }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function SubCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={item.href}
        style={{ display: "block", textDecoration: "none", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
        aria-label={`${item.title} — ${item.desc}`}
      >
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
          <img
            src={item.img}
            alt={item.imgAlt}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
            className="subcard-img"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,18,14,0.85) 0%, rgba(10,18,14,0.3) 55%, transparent 100%)" }} aria-hidden="true" />

          <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: item.accent, color: "#FAF7F0", borderRadius: "50px", padding: "4px 13px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.68rem", lineHeight: 1 }}>{item.n}</span>
            <span style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", opacity: 0.85 }}>{item.tag}</span>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(20px,3vw,28px)" }}>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.5rem,3.5vw,2rem)", color: "#FAF7F0", margin: "0 0 8px", lineHeight: 1.1, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
              {item.title}
            </h2>
            <p style={{ color: "rgba(250,247,240,0.82)", fontSize: "clamp(0.82rem,1.5vw,0.92rem)", lineHeight: 1.65, margin: "0 0 14px", fontFamily: "Roboto, sans-serif", maxWidth: "420px" }}>
              {item.desc}
            </p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: item.accent, color: "#FAF7F0", padding: "9px 18px", borderRadius: "100px", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif" }}>
              {item.cta}
              <Arrow />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
