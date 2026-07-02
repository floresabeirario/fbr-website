// app/[locale]/not-found.js
// Página 404 com a marca — antes aparecia o 404 default do Next (em inglês,
// sem navegação). Renderiza dentro do layout, por isso mantém Nav e Footer.
"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

const TEXT = {
  pt: {
    eyebrow: "Erro 404",
    title: "Esta página não floresceu",
    desc: "A página que procura não existe ou mudou de sítio. Talvez um destes caminhos ajude:",
    home: "Página inicial",
    faq: "Perguntas frequentes",
    contact: "Contactos",
  },
  en: {
    eyebrow: "Error 404",
    title: "This page didn't bloom",
    desc: "The page you're looking for doesn't exist or has moved. One of these paths might help:",
    home: "Homepage",
    faq: "FAQ",
    contact: "Contact",
  },
};

export default function NotFound() {
  const locale = useLocale();
  const t = TEXT[locale] ?? TEXT.pt;
  const prefix = locale === "en" ? "/en" : "";
  const links = [
    { href: prefix || "/", label: t.home },
    { href: locale === "en" ? "/en/faq" : "/perguntas-frequentes", label: t.faq },
    { href: locale === "en" ? "/en/contact" : "/contactos", label: t.contact },
  ];

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
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              backgroundColor: l.href === (prefix || "/") ? "var(--green)" : "transparent",
              color: l.href === (prefix || "/") ? "var(--cream)" : "var(--green)",
              border: "1.5px solid var(--green)",
              padding: "13px 28px", borderRadius: "100px", textDecoration: "none",
              fontWeight: 600, fontSize: "0.78rem", letterSpacing: "1.2px", textTransform: "uppercase",
              fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif",
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
