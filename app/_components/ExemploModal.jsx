"use client";

// ============================================================
// Modal "Ver exemplo" dos extras (quadros extra, ornamentos, pendentes).
//
// Os extras eram só texto e a Maria quer vendê-los melhor: uma
// fotografia explica um pendente ou um mini-quadro melhor do que uma
// frase. Mesma ideia do "Ver a diferença" do vidro museu, generalizada.
// Usado pelos dois formulários de reserva. Fecha com Esc, com clique
// fora ou no botão.
// ============================================================

import { useEffect } from "react";
import Image from "next/image";
import "./ExemploModal.css";

export const EXEMPLOS = {
  minis: { src: "/mini-quadros-flores-preservadas.webp" },
  ornamentos: { src: "/ornamento-natal-flores-preservadas.webp" },
  pendentes: { src: "/pendente-colar-flores-preservadas.webp" },
};

export default function ExemploModal({ tipo, onFechar, titulo, desc, fechar }) {
  useEffect(() => {
    if (!tipo) return undefined;
    const onKey = (ev) => { if (ev.key === "Escape") onFechar(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [tipo, onFechar]);

  if (!tipo || !EXEMPLOS[tipo]) return null;
  const { src } = EXEMPLOS[tipo];

  return (
    <div
      className="ex-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ex-modal-titulo"
      onClick={onFechar}
    >
      <div className="ex-modal" onClick={(ev) => ev.stopPropagation()}>
        <h2 className="ex-titulo" id="ex-modal-titulo">{titulo}</h2>
        <div className="ex-img">
          <Image
            src={src}
            alt={titulo}
            width={640}
            height={640}
            sizes="(max-width: 640px) 90vw, 460px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <p className="ex-desc">{desc}</p>
        <button type="button" className="ex-fechar" onClick={onFechar}>{fechar}</button>
      </div>
    </div>
  );
}
