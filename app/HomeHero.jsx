"use client";

import { motion } from "framer-motion";
import { FORM_URL } from "./_lib/constants";

export default function HomeHero() {
  return (
    <section
      aria-label="Flores à Beira-Rio — Preservação de flores de casamento"
      style={{ height: "100dvh", maxHeight: "100dvh", minHeight: "100dvh", position: "relative", overflow: "hidden" }}
    >
      <video autoPlay loop muted playsInline aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      >
        <source src="/hero-video.webm" type="video/webm" />
      </video>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,26,0.2) 0%, rgba(15,30,26,0.5) 60%, rgba(15,30,26,0.82) 100%)" }} />

      {/* Título + subtítulo centrados juntos */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "#FAF7F0", padding: "0 20px" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
          style={{ fontSize: "clamp(0.65rem,1.2vw,0.82rem)", letterSpacing: "clamp(3px,1vw,5px)", textTransform: "uppercase", fontWeight: "700", color: "rgba(250,247,240,0.78)", fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 clamp(10px,2vw,18px)" }}
        >
          Especialistas em preservação de flores
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3.2rem, 11vw, 8rem)", lineHeight: 1.15, margin: 0, textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
        >
          Flores à<br /><span style={{ whiteSpace: "nowrap" }}>Beira&#8209;Rio</span>
        </motion.h1>
      </div>

      {/* Botão — fixo em baixo, independente do título */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
        style={{ position: "absolute", bottom: "clamp(44px,7vh,80px)", left: 0, right: 0, zIndex: 3, display: "flex", justifyContent: "center" }}
      >
        <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="hero-btn">Reservar Data</a>
      </motion.div>
    </section>
  );
}
