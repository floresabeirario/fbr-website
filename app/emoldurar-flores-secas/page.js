"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const F = "https://wkf.ms/3RfoNAc";
const W = "https://wa.me/351934680300";

export default function Page() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <main style={{ backgroundColor: "#0A1628", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100svh",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/quadrovidrosobrevidro.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Dark overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.62) 60%, rgba(10,22,40,0.88) 100%)",
          }}
        />

        {/* Hero text — fades + moves on scroll */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              display: "block",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#A8C4D4",
              marginBottom: "18px",
              fontFamily: "Roboto, sans-serif",
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            Preservação Botânica · Coimbra
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'TAN-MEMORIES', Georgia, serif",
              fontSize: "clamp(2.8rem, 9vw, 6rem)",
              color: "#F0EDE6",
              margin: "0 0 16px",
              lineHeight: 1.0,
              textShadow: "0 4px 32px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)",
              maxWidth: "700px",
            }}
          >
            Emoldurar<br />
            <em style={{ fontStyle: "italic", color: "#A8D4C2" }}>Flores Secas</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38 }}
            style={{
              color: "#D8E8E4",
              fontSize: "clamp(0.95rem, 2.2vw, 1.12rem)",
              lineHeight: 1.9,
              maxWidth: "520px",
              margin: "0 auto 40px",
              textShadow: "0 2px 16px rgba(0,0,0,0.65)",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 300,
            }}
          >
            Preserve o seu ramo seco num quadro feito à medida,<br />
            com vidro museu anti-UV. Atelier em Coimbra.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}
          >
            <a
              href={F}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#1B4B6B",
                color: "#F0EDE6",
                padding: "15px 36px",
                borderRadius: "100px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.78rem",
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                fontFamily: "Roboto, sans-serif",
                border: "1px solid rgba(168,196,212,0.35)",
                backdropFilter: "blur(4px)",
              }}
            >
              Reservar Data
            </a>
            <a
              href={W}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(37,211,102,0.9)",
                color: "#fff",
                padding: "15px 28px",
                borderRadius: "100px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.78rem",
                fontFamily: "Roboto, sans-serif",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.836L.057 23.998l6.306-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.733.979.998-3.648-.235-.374A9.818 9.818 0 1112 21.818z"/>
              </svg>
              WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ color: "rgba(240,237,230,0.5)", fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif" }}>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(240,237,230,0.5), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ backgroundColor: "#0A1628", padding: "clamp(80px,12vw,140px) 20px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
        >
          <p style={{ color: "#7EA8C0", fontSize: "clamp(1.05rem,2.4vw,1.25rem)", lineHeight: 2, fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
            Muitos ramos de flores acabam por secar naturalmente com o passar do tempo. Alguns foram guardados com carinho depois de um casamento, outros já foram criados originalmente com flores secas.
          </p>
          <p style={{ color: "#A8C4D4", fontSize: "clamp(1.05rem,2.4vw,1.22rem)", lineHeight: 2, fontFamily: "Roboto, sans-serif", fontWeight: 300, marginTop: "24px" }}>
            Na Flores à Beira-Rio, podemos transformar esse ramo numa peça artística emoldurada, pensada para preservar a memória e permitir que continue a fazer parte da sua casa.
          </p>
          <div style={{ width: "40px", height: "2px", backgroundColor: "#1B4B6B", margin: "48px auto 0", borderRadius: "2px" }} />
        </motion.div>
      </section>

      {/* ── TRÊS OPÇÕES ── */}
      <section style={{ backgroundColor: "#0D1E35", padding: "clamp(80px,12vw,130px) 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "72px" }}
          >
            <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#5A8FA8", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>Como Funciona</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: "#F0EDE6", margin: 0 }}>Três Possibilidades</h2>
          </motion.div>

          {[
            {
              num: "01",
              title: "Emoldurar o ramo original",
              sub: "Preservação 3D",
              desc: "Utilizamos o ramo seco exatamente como está, criando uma composição artística dentro de uma moldura profunda com 4,5 cm de altura útil. O ramo mantém o seu volume natural.",
              tags: ["Bouquets já secos", "Ramos com volume", "Memórias tal como estão"],
              time: "até 3 meses",
            },
            {
              num: "02",
              title: "Recriação e prensagem",
              sub: "Resultado como no dia",
              desc: "Recriamos o seu bouquet em conjunto com uma florista. As flores frescas são depois preservadas por prensagem, mantendo melhor as cores naturais. O resultado é bidimensional, num quadro plano.",
              tags: ["Cores preservadas", "Composição plana", "Recriação fiel"],
              time: "até 6 meses",
              link: true,
            },
            {
              num: "03",
              title: "Combinação de originais e prensadas",
              sub: "O melhor dos dois mundos",
              desc: "Aproveitamos as flores do ramo que ainda estão em bom estado e substituímos as restantes por flores semelhantes preservadas por prensagem. O quadro final equilibra volume e plano.",
              tags: ["Flores originais", "Substituição harmoniosa", "Composição mista"],
              time: "até 6 meses",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "32px",
                marginBottom: "56px",
                paddingBottom: "56px",
                borderBottom: i < 2 ? "1px solid rgba(168,196,212,0.1)" : "none",
                alignItems: "start",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "2.8rem", color: "rgba(91,143,168,0.25)", lineHeight: 1 }}>{item.num}</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#5A8FA8", marginBottom: "8px", fontFamily: "Roboto, sans-serif" }}>{item.sub}</span>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(1.3rem,3vw,1.8rem)", color: "#F0EDE6", margin: "0 0 16px" }}>{item.title}</h3>
                <p style={{ color: "#7EA8C0", lineHeight: 1.85, fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.98rem", margin: "0 0 20px", maxWidth: "560px" }}>{item.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  {item.tags.map((tag, j) => (
                    <span key={j} style={{ backgroundColor: "rgba(27,75,107,0.4)", color: "#A8C4D4", fontSize: "0.72rem", padding: "5px 14px", borderRadius: "100px", fontFamily: "Roboto, sans-serif", border: "1px solid rgba(168,196,212,0.15)" }}>{tag}</span>
                  ))}
                </div>
                <span style={{ fontSize: "0.72rem", color: "#5A8FA8", fontFamily: "Roboto, sans-serif", letterSpacing: "1px" }}>Tempo de produção: <strong style={{ color: "#A8C4D4" }}>{item.time}</strong></span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOTOGRAFIA ── */}
      <section style={{ backgroundColor: "#0A1628", padding: "clamp(60px,10vw,110px) 20px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
        >
          <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#5A8FA8", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>Opcional</span>
          <h2 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: "#F0EDE6", margin: "0 0 24px" }}>Incluir uma Fotografia</h2>
          <p style={{ color: "#7EA8C0", lineHeight: 1.9, fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1rem" }}>
            Em qualquer uma das opções, podemos incluir uma fotografia na composição do quadro. Muitos clientes escolhem integrar uma fotografia do casamento, uma imagem atual ou uma foto com significado especial.
          </p>
        </motion.div>
      </section>

      {/* ── MATERIAIS ── */}
      <section style={{ backgroundColor: "#0D1E35", padding: "clamp(80px,12vw,130px) 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#5A8FA8", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>Qualidade</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: "#F0EDE6", margin: 0 }}>Molduras Feitas à Medida</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px" }}>
            {[
              { icon: "◈", title: "Vidro Museu Anti-UV", desc: "Vidro UltraVue® 70 — o mesmo usado em museus. Bloqueia os raios ultravioleta que provocam o desbotamento das cores." },
              { icon: "◻", title: "Moldura Feita à Medida", desc: "Todas as molduras são produzidas por uma molduraria em Coimbra, especificamente para cada quadro." },
              { icon: "◈", title: "Composição Artística", desc: "Cada quadro é desenhado como uma composição equilibrada, pensada para valorizar as flores e a memória que representam." },
              { icon: "◻", title: "Aprovação Antes de Selar", desc: "Enviamos fotografias da composição. Terá 72 horas para aprovar ou pedir alterações. Nada é definitivo sem o seu acordo." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{ backgroundColor: "rgba(27,75,107,0.15)", border: "1px solid rgba(168,196,212,0.1)", borderRadius: "16px", padding: "32px 28px" }}
              >
                <div style={{ fontSize: "1.4rem", color: "#5A8FA8", marginBottom: "16px" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "Roboto, sans-serif", fontWeight: 600, fontSize: "1rem", color: "#F0EDE6", margin: "0 0 12px", letterSpacing: "0.3px" }}>{item.title}</h3>
                <p style={{ color: "#7EA8C0", lineHeight: 1.8, fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.92rem", margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREÇOS ── */}
      <section style={{ backgroundColor: "#0A1628", padding: "clamp(80px,12vw,130px) 20px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#5A8FA8", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>Investimento</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: "#F0EDE6", margin: 0 }}>Tamanhos e Preços</h2>
          </motion.div>
          {[
            { size: "30 × 40 cm", price: "200€" },
            { size: "40 × 50 cm", price: "270€" },
            { size: "50 × 70 cm", price: "360€" },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", marginBottom: "12px", backgroundColor: "rgba(27,75,107,0.2)", borderRadius: "12px", border: "1px solid rgba(168,196,212,0.1)" }}
            >
              <span style={{ fontFamily: "Roboto, sans-serif", color: "#A8C4D4", fontSize: "1.05rem", fontWeight: 300 }}>{row.size}</span>
              <span style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", color: "#F0EDE6", fontSize: "1.6rem" }}>{row.price}</span>
            </motion.div>
          ))}
          <p style={{ color: "#5A8FA8", fontSize: "0.82rem", textAlign: "center", marginTop: "24px", lineHeight: 1.7, fontFamily: "Roboto, sans-serif" }}>Todos os quadros incluem vidro museu anti-UV, moldura feita à medida e design artístico da composição.</p>
        </div>
      </section>

      {/* ── PAGAMENTO ── */}
      <section style={{ backgroundColor: "#0D1E35", padding: "clamp(60px,10vw,100px) 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <h2 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: "#F0EDE6", margin: 0 }}>Pagamento em 3 Fases</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {[
              { pct: "30%", label: "Reserva", desc: "Sinal que garante a sua vaga. Não reembolsável." },
              { pct: "40%", label: "Início do Trabalho", desc: "Quando o ramo chega e iniciamos o processo." },
              { pct: "30%", label: "Antes da Entrega", desc: "Após o quadro estar emoldurado e antes do envio." },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                style={{ textAlign: "center", padding: "32px 20px", backgroundColor: "rgba(10,22,40,0.5)", borderRadius: "16px", border: "1px solid rgba(168,196,212,0.1)" }}
              >
                <div style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "2.6rem", color: "#7EA8C0", marginBottom: "10px" }}>{p.pct}</div>
                <div style={{ fontFamily: "Roboto, sans-serif", fontWeight: 600, color: "#F0EDE6", fontSize: "0.9rem", marginBottom: "10px" }}>{p.label}</div>
                <p style={{ color: "#5A8FA8", fontSize: "0.82rem", fontFamily: "Roboto, sans-serif", fontWeight: 300, margin: 0, lineHeight: 1.7 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENVIO ── */}
      <section style={{ backgroundColor: "#0A1628", padding: "clamp(60px,10vw,100px) 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#5A8FA8", marginBottom: "14px", fontFamily: "Roboto, sans-serif" }}>Logística</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: "#F0EDE6", margin: "0 0 16px" }}>Como Enviar o Ramo</h2>
            <p style={{ color: "#7EA8C0", fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1rem" }}>Recebemos ramos de toda a Europa.</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {[
              { title: "Entrega em Mãos", desc: "Gratuitamente no nosso atelier em Coimbra, mediante agendamento." },
              { title: "Envio por Correio", desc: "Pode enviar o ramo por CTT — correio frágil e urgente. Os custos de envio são a cargo do cliente." },
              { title: "Acompanhamento", desc: "Pode acompanhar o estado do seu quadro em qualquer momento em status.floresabeirario.pt" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                style={{ padding: "28px 24px", backgroundColor: "rgba(27,75,107,0.12)", borderRadius: "14px", border: "1px solid rgba(168,196,212,0.1)" }}
              >
                <h3 style={{ fontFamily: "Roboto, sans-serif", fontWeight: 600, color: "#F0EDE6", fontSize: "0.95rem", margin: "0 0 10px" }}>{item.title}</h3>
                <p style={{ color: "#7EA8C0", fontSize: "0.88rem", fontFamily: "Roboto, sans-serif", fontWeight: 300, margin: 0, lineHeight: 1.75 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "#0D1E35", padding: "clamp(80px,12vw,130px) 20px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(2rem,5vw,3rem)", color: "#F0EDE6", margin: 0 }}>Perguntas Frequentes</h2>
          </motion.div>
          {[
            { q: "Posso emoldurar um bouquet de noiva seco?", a: "Sim. Muitos dos ramos que recebemos já foram secos naturalmente após o casamento. Podemos criar uma composição com o ramo original ou trabalhar numa recriação com flores prensadas." },
            { q: "Recebem ramos de outras cidades ou países?", a: "Sim. Recebemos ramos enviados por correio de toda a Europa." },
            { q: "O ramo tem de estar perfeito?", a: "Não. Se algumas flores já não estiverem em bom estado, podemos substituir esses elementos e preservá-los através de prensagem." },
            { q: "Quanto tempo demora o processo?", a: "Depende da opção: emoldurar o ramo seco demora até 3 meses. Recriação ou substituição com prensagem demora até 6 meses." },
          ].map((faq, i) => (
            <FAQItem key={i} faq={faq} i={i} />
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ backgroundColor: "#1B4B6B", padding: "clamp(80px,14vw,140px) 20px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <h2 style={{ fontFamily: "'TAN-MEMORIES', Georgia, serif", fontSize: "clamp(2.2rem,6vw,4rem)", color: "#F0EDE6", margin: "0 0 24px", lineHeight: 1.1 }}>
            Preserve a sua<br /><em style={{ color: "#A8D4C2" }}>Memória</em>
          </h2>
          <p style={{ color: "#A8C4D4", fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1.02rem", lineHeight: 1.85, marginBottom: "40px" }}>
            Atelier em Coimbra. Recebemos ramos de toda a Europa.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
            <a
              href={F}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", backgroundColor: "#F0EDE6", color: "#0A1628", padding: "16px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "1.6px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif" }}
            >
              Reservar Data
            </a>
            <a
              href={W}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(37,211,102,0.9)", color: "#fff", padding: "16px 32px", borderRadius: "100px", textDecoration: "none", fontWeight: 600, fontSize: "0.8rem", fontFamily: "Roboto, sans-serif" }}
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function FAQItem({ faq, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      style={{ borderBottom: "1px solid rgba(168,196,212,0.12)", marginBottom: "4px" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "24px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, color: "#F0EDE6", fontSize: "1rem", lineHeight: 1.5 }}>{faq.q}</span>
        <span style={{ color: "#5A8FA8", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </button>
      {open && (
        <p style={{ color: "#7EA8C0", fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.85, padding: "0 0 24px", margin: 0 }}>{faq.a}</p>
      )}
    </motion.div>
  );
}
