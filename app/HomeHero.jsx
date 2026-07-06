"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { FORM_URL } from "./_lib/constants";

export default function HomeHero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const bookHref = locale === "en" ? "/en/book-preservation" : FORM_URL;
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.38], [0, 28]);

  return (
    <section
      ref={heroRef}
      aria-label="Flores à Beira-Rio"
      data-bg="neutral"
      style={{ height: "100dvh", maxHeight: "100dvh", minHeight: "100dvh", position: "relative", overflow: "hidden" }}
    >
      {/* Hero: imagem em todos os dispositivos */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          fill
          src="/ritaherophoto.webp"
          alt={t("meta.ogImageAlt")}
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,26,0.15) 0%, rgba(15,30,26,0.48) 60%, rgba(15,30,26,0.82) 100%)" }} />

      <m.div
        style={{
          opacity,
          y,
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "var(--cream)",
          padding: "0 20px",
        }}
      >
        {/* SEO: o h1 é a eyebrow com a keyword ("Especialistas em preservação
            de flores"); o nome da marca mantém exactamente o mesmo aspecto
            visual mas passa a <p>. O Google lê o tema da página no h1. */}
        {/* Entrada em CSS (.hero-enter) e não framer-motion: o título é o
            elemento LCP da página e com framer ficava invisível (opacity:0
            vindo do servidor) até o JS hidratar — péssimo em redes lentas. */}
        <h1
          className="hero-enter hero-enter-1"
          style={{ fontSize: "clamp(0.65rem,1.2vw,0.82rem)", letterSpacing: "clamp(3px,1vw,5px)", textTransform: "uppercase", fontWeight: "700", color: "rgba(250,247,240,0.88)", fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 clamp(10px,2vw,18px)", lineHeight: 1.4 }}
        >
          {t("heroEyebrow")}
        </h1>

        <p
          className="hero-enter hero-enter-2"
          style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3.2rem, 11vw, 8rem)", lineHeight: 1.15, margin: 0 }}
        >
          Flores à<br /><span style={{ whiteSpace: "nowrap" }}>Beira&#8209;Rio</span>
        </p>

        <div
          className="hero-enter hero-enter-3"
          style={{ position: "absolute", bottom: "clamp(44px,7vh,80px)", left: 0, right: 0, display: "flex", justifyContent: "center" }}
        >
          {/* "Reservar eternização de flores" — o "Reservar Data" já existe
              na nav em cima à esquerda; aqui o botão diz o que se reserva. */}
          <Link href={bookHref} className="hero-btn">{t("heroCTALong")}</Link>
        </div>
      </m.div>
    </section>
  );
}
