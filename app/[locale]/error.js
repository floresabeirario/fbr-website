// app/[locale]/error.js
// Página de erro com a marca — apanha erros de runtime nas páginas e oferece
// uma forma de tentar novamente sem perder o utilizador.
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const TEXT = {
  pt: {
    eyebrow: "Algo correu mal",
    title: "Pedimos desculpa",
    desc: "Ocorreu um erro inesperado ao carregar esta página. Pode tentar novamente ou voltar ao início.",
    retry: "Tentar novamente",
    home: "Página inicial",
  },
  en: {
    eyebrow: "Something went wrong",
    title: "We're sorry",
    desc: "An unexpected error occurred while loading this page. You can try again or go back home.",
    retry: "Try again",
    home: "Homepage",
  },
};

export default function ErrorPage({ error, reset }) {
  const locale = useLocale();
  const t = TEXT[locale] ?? TEXT.pt;
  const homeHref = locale === "en" ? "/en" : "/";

  useEffect(() => {
    console.error("[page-error]", error);
  }, [error]);

  return (
    <div style={{
      minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "var(--cream)", padding: "clamp(160px,22vw,220px) 24px clamp(80px,12vw,120px)",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "520px" }}>
        <p style={{
          fontSize: "0.62rem", letterSpacing: "3.5px", textTransform: "uppercase",
          color: "var(--terra)", fontWeight: 700, margin: "0 0 14px",
          fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
        }}>
          {t.eyebrow}
        </p>
        <h1 style={{
          fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,6vw,3.6rem)",
          color: "var(--green-d)", margin: "0 0 16px", lineHeight: 1.1,
        }}>
          {t.title}
        </h1>
        <p style={{
          color: "var(--mid)", fontSize: "clamp(0.95rem,2vw,1.05rem)", lineHeight: 1.85,
          margin: "0 0 32px",
        }}>
          {t.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "var(--green)", color: "var(--cream)",
              border: "1.5px solid var(--green)", cursor: "pointer",
              padding: "13px 28px", borderRadius: "100px",
              fontWeight: 600, fontSize: "0.78rem", letterSpacing: "1.2px", textTransform: "uppercase",
              fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
            }}
          >
            {t.retry}
          </button>
          <Link href={homeHref} style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "transparent", color: "var(--green)",
            border: "1.5px solid var(--green)",
            padding: "13px 28px", borderRadius: "100px", textDecoration: "none",
            fontWeight: 600, fontSize: "0.78rem", letterSpacing: "1.2px", textTransform: "uppercase",
            fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
          }}>
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
