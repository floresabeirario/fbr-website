"use client";
import { motion } from "framer-motion";
const F = "https://wkf.ms/3RfoNAc";
const W = "https://wa.me/351934680300";
export default function Page() {
  return (
    <main style={{ backgroundColor: "#FAF7F0", minHeight: "100vh" }}>
      <section style={{ paddingTop: "clamp(140px,18vw,200px)", paddingBottom: "clamp(80px,12vw,140px)", paddingLeft: "20px", paddingRight: "20px", background: "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: "640px", margin: "0 auto" }}>
          <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#C4846B", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>Aniversário</span>
          <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.6rem,8vw,5rem)", color: "#1E2D2A", margin: "0 0 20px", lineHeight: 1.02 }}>Preservar Flores de<br/><em style={{ fontStyle: "italic", color: "#3D6B5E" }}>Aniversário</em></h1>
          <p style={{ color: "#5A6B60", fontSize: "clamp(0.95rem,2vw,1.08rem)", lineHeight: 1.88, maxWidth: "520px", margin: "0 auto 36px" }}>Guarde para sempre as flores de um aniversário especial. Uma memória transformada em arte botânica, emoldurada com vidro museu.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a href={F} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", backgroundColor: "#3D6B5E", color: "#FAF7F0", padding: "15px 34px", borderRadius: "100px", textDecoration: "none", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "1.4px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif" }}>Reservar Data</a>
            <a href={W} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#25D366", color: "#fff", padding: "15px 28px", borderRadius: "100px", textDecoration: "none", fontWeight: 600, fontSize: "0.82rem", fontFamily: "Roboto, sans-serif" }}>WhatsApp</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
