"use client";

import { motion } from "framer-motion";

export default function Blog() {
  const link = "https://www.instagram.com/floresabeirario/";

  return (
    <main style={{ backgroundColor: "#FAF7F0", minHeight: "100vh" }}>
      <section style={{
        paddingTop: "clamp(140px,18vw,200px)",
        paddingBottom: "clamp(80px,12vw,140px)",
        paddingLeft: "20px",
        paddingRight: "20px",
        background: "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)",
        textAlign: "center"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "640px", margin: "0 auto" }}
        >
          <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#C4846B", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>
            Blog
          </span>
          <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.8rem,9vw,5.5rem)", color: "#1E2D2A", margin: "0 0 20px", lineHeight: 1.02 }}>
            Em breve
          </h1>
          <p style={{ color: "#5A6B60", fontSize: "clamp(0.95rem,2vw,1.08rem)", lineHeight: 1.88, maxWidth: "480px", margin: "0 auto 36px" }}>
            Estamos a preparar artigos sobre preservação botânica, dicas para noivas e histórias por detrás das nossas peças. Fique atenta.
          </p>
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", backgroundColor: "#3D6B5E", color: "#FAF7F0", padding: "15px 34px", borderRadius: "100px", textDecoration: "none", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "1.4px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", boxShadow: "0 6px 22px rgba(61,107,94,0.28)", transition: "all 0.3s ease" }}>
            Seguir no Instagram
          </a>
        </motion.div>
      </section>
    </main>
  );
}
