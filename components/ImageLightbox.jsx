"use client";

// Lightbox mínimo para ampliar imagens (sem dependências novas).
// Nasceu dos dead clicks vistos no Clarity em /opcoes-e-precos: as pessoas
// tocavam nas fotos das molduras à espera de as ver maiores e nada acontecia.
// Fecha com Esc, com o X ou com um clique/toque em qualquer sítio do fundo.

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function ImageLightbox({ src, alt, caption, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    // Trava o scroll da página enquanto o lightbox está aberto.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption || alt}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        backgroundColor: "rgba(15,30,26,0.92)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "clamp(16px, 4vw, 48px)",
        cursor: "zoom-out",
        animation: "lightbox-fade 0.18s ease-out",
      }}
    >
      <style>{`@keyframes lightbox-fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={caption ? `Fechar ${caption}` : "Fechar"}
        style={{
          position: "absolute", top: "14px", right: "14px",
          width: "44px", height: "44px", borderRadius: "50%",
          border: "1px solid rgba(250,247,240,0.35)",
          backgroundColor: "rgba(15,30,26,0.6)", color: "var(--cream)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div
        style={{ position: "relative", width: "100%", height: "100%", maxWidth: "1100px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          fill
          src={src}
          alt={alt}
          sizes="92vw"
          style={{ objectFit: "contain", cursor: "default" }}
        />
      </div>
      {caption ? (
        <p
          onClick={(e) => e.stopPropagation()}
          style={{
            margin: "14px 0 0", color: "rgba(250,247,240,0.85)",
            fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
            fontWeight: 300, fontSize: "0.9rem", textAlign: "center",
            cursor: "default",
          }}
        >
          {caption}
        </p>
      ) : null}
    </div>,
    document.body
  );
}
