"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FORM_URL } from "./_lib/constants";

export default function HomeHero() {
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
      aria-label="Flores à Beira-Rio, Preservação de flores de casamento"
      data-bg="neutral"
      style={{ height: "100dvh", maxHeight: "100dvh", minHeight: "100dvh", position: "relative", overflow: "hidden" }}
    >
      {/* Hero: imagem em todos os dispositivos */}
      <div style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        <Image
          fill
          src="/ritaherophoto.webp"
          alt=""
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,26,0.15) 0%, rgba(15,30,26,0.48) 60%, rgba(15,30,26,0.82) 100%)" }} />

      <motion.div
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
          color: "#FAF7F0",
          padding: "0 20px",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          style={{ fontSize: "clamp(0.65rem,1.2vw,0.82rem)", letterSpacing: "clamp(3px,1vw,5px)", textTransform: "uppercase", fontWeight: "700", color: "rgba(250,247,240,0.88)", fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 clamp(10px,2vw,18px)" }}
        >
          Especialistas em preservação de flores
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3.2rem, 11vw, 8rem)", lineHeight: 1.15, margin: 0 }}
        >
          Flores à<br /><span style={{ whiteSpace: "nowrap" }}>Beira&#8209;Rio</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ position: "absolute", bottom: "clamp(44px,7vh,80px)", left: 0, right: 0, display: "flex", justifyContent: "center" }}
        >
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="hero-btn">Reservar Data</a>
        </motion.div>
      </motion.div>
    </section>
  );
}
