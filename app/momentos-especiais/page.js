
"use client";

import { motion } from "framer-motion";
import { FORM_URL, WA_NUMBER } from "../_lib/constants";

export default function MomentosEspeciais() {
  const FORM = FORM_URL;
  const WA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de preservar flores de um momento especial.")}`;

  return (
    <main style={{ backgroundColor: "#FAF7F0", minHeight: "100vh" }}>
      <section style={{
        paddingTop: "clamp(140px,18vw,200px)",
        paddingBottom: "clamp(60px,8vw,88px)",
        paddingLeft: "20px", paddingRight: "20px",
        background: "linear-gradient(175deg, #EDF2E8 0%, #FAF7F0 100%)",
        textAlign: "center"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "680px", margin: "0 auto" }}
        >
          <span style={{
            display: "block", fontSize: "0.58rem", fontWeight: 700,
            letterSpacing: "3.5px", textTransform: "uppercase",
            color: "#C4846B", marginBottom: "14px",
            fontFamily: "Roboto, sans-serif"
          }}>
            Para cada ocasião
          </span>
          <h1 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2.6rem,8vw,5.2rem)",
            color: "#1E2D2A", margin: "0 0 20px", lineHeight: 1.02
          }}>
            Momentos<br/>
            <em style={{ fontStyle: "italic", color: "#3D6B5E" }}>Especiais</em>
          </h1>
          <p style={{
            color: "#5A6B60",
            fontSize: "clamp(0.95rem,2vw,1.08rem)",
            lineHeight: 1.88, maxWidth: "540px",
            margin: "0 auto 40px"
          }}>
            Preservamos flores de casamentos, batizados, homenagens fúnebres,
            aniversários, pedidos de casamento e qualquer momento
            que mereça ser eternizado.
          </p>
        </motion.div>
      </section>

      {/* Cards dos momentos */}
      <section style={{
        padding: "0 20px clamp(80px,12vw,120px)",
        backgroundColor: "#FAF7F0"
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "16px"
        }}>
          {[
            { href: "/preservacao-bouquet-noiva", title: "Bouquet de Noiva", desc: "O serviço mais procurado. Preservamos o bouquet de casamento numa obra de arte botânica.", accent: "#3D6B5E" },
            { href: "/preservar-flores-luto-homenagem", title: "Homenagem e Luto", desc: "Eternize as flores de uma cerimónia fúnebre como forma de homenagem duradoura.", accent: "#5A6B8A" },
            { href: "/preservar-flores-batizado-nascimento", title: "Batizado e Nascimento", desc: "Guarde as flores do batizado ou da maternidade para recordar esse momento único.", accent: "#B8954A" },
            { href: "/preservar-flores-aniversario", title: "Aniversário", desc: "Transforme flores de aniversário numa memória permanente, cheia de significado.", accent: "#C4846B" },
            { href: "/preservar-flores-pedido-casamento", title: "Pedido de Casamento", desc: "As flores do pedido merecem ser preservadas tanto quanto as do casamento.", accent: "#8B7B9E" },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.65 }}
              style={{
                display: "block", textDecoration: "none",
                backgroundColor: "#fff", borderRadius: "18px",
                padding: "28px 24px",
                border: `1px solid ${item.accent}18`,
                boxShadow: "0 4px 18px rgba(30,45,42,0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(30,45,42,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(30,45,42,0.06)"; }}
            >
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "1.2rem", color: "#1E2D2A",
                margin: "0 0 10px", lineHeight: 1.2
              }}>
                {item.title}
              </h2>
              <p style={{
                color: "#5A6B60", fontSize: "0.88rem",
                lineHeight: 1.72, margin: "0 0 14px"
              }}>
                {item.desc}
              </p>
              <span style={{
                fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "1.5px", textTransform: "uppercase",
                color: item.accent, fontFamily: "Roboto, sans-serif"
              }}>
                Saber mais →
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "clamp(60px,10vw,100px) 20px",
        background: "linear-gradient(140deg, #EDF2E8 0%, #FAF7F0 55%, #F0EBE0 100%)",
        textAlign: "center"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: "540px", margin: "0 auto" }}
        >
          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.8rem,4.5vw,3rem)",
            color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1
          }}>
            Reserve a sua vaga
          </h2>
          <p style={{
            color: "#5A6B60", lineHeight: 1.85,
            fontSize: "clamp(0.9rem,2vw,1rem)",
            margin: "0 0 32px"
          }}>
            As vagas são limitadas — garanta a preservação das suas flores
            com a antecedência necessária.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a href={FORM} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", backgroundColor: "#3D6B5E", color: "#FAF7F0",
              padding: "15px 34px", borderRadius: "100px", textDecoration: "none",
              fontWeight: 600, fontSize: "0.82rem", letterSpacing: "1.4px",
              textTransform: "uppercase", fontFamily: "Roboto, sans-serif",
              boxShadow: "0 6px 22px rgba(61,107,94,0.28)", transition: "all 0.3s ease"
            }}>
              Reservar Data
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "#25D366", color: "#fff",
              padding: "15px 28px", borderRadius: "100px", textDecoration: "none",
              fontWeight: 600, fontSize: "0.82rem", letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease"
            }}>
              WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
