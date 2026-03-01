"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
};

function Reveal({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? "show" : "hidden"} transition={{ delay }}
      style={style} className={className}>
      {children}
    </motion.div>
  );
}

function Label({ children, light }) {
  return (
    <p style={{
      fontSize: "0.875rem", letterSpacing: "3px", textTransform: "uppercase",
      color: light ? "rgba(250,247,240,0.6)" : "#B8954A",
      fontFamily: "Roboto, sans-serif", margin: "0 0 20px", fontWeight: 600
    }}>
      {children}
    </p>
  );
}

export default function OpcoesClient() {
  return (
    <div style={{ backgroundColor: "#FAF7F0", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* ════════════════════════════════════════════
          HERO com IMAGEM DE FUNDO — fotoquadrocloseup1.webp
      ════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>

        {/* Imagem de fundo */}
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            backgroundImage: "url('/fotoquadrocloseup1.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.65)"
          }}/>
          {/* Gradiente escuro em baixo para o texto */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(15,30,26,0.15) 0%, rgba(15,30,26,0.4) 40%, rgba(15,30,26,0.85) 100%)"
          }} />
        </div>

        {/* Conteúdo */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(80px,12vw,140px) 24px clamp(60px,8vw,90px)" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: "0.875rem", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(250,247,240,0.7)", fontFamily: "Roboto, sans-serif", margin: "0 0 20px", fontWeight: 600 }}>
            O seu bouquet, para sempre
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3.5rem, 11vw, 8.5rem)", lineHeight: 0.92, margin: "0 0 28px", color: "#FAF7F0", fontWeight: 400, textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            Opções<br/>
            <em style={{ color: "#8BA888" }}>&amp; Preços</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "clamp(1.05rem, 2vw, 1.2rem)", lineHeight: 1.75, color: "rgba(250,247,240,0.8)", maxWidth: "540px", margin: 0 }}>
            Cada quadro é uma peça única, feita à mão em Coimbra.
            Escolha o fundo, o tamanho e os elementos que tornam
            a sua composição verdadeiramente sua.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TIPOS DE FUNDO
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FAF7F0", padding: "clamp(60px,10vw,100px) 0 clamp(60px,8vw,100px)" }}>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px clamp(32px,5vw,48px)" }}>
          <Reveal>
            <Label>Personalização</Label>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, margin: 0, lineHeight: 1.05 }}>
              Tipos de Fundo
            </h2>
          </Reveal>
        </div>

        <div style={{ overflowX: "hidden" }}>
        <div className="fundos-track">
          {[
            {
              img: "/quadrovidrosobrevidro.webp",
              alt: "Quadro de flores prensadas em vidro sobre vidro com efeito transparente",
              tag: "Mais popular", tagSolid: true,
              title: "Vidro sobre Vidro",
              desc: "As flores ficam suspensas entre dois vidros, sem fundo opaco. Efeito leve e moderno, ideal para espaços luminosos.",
            },
            {
              img: "/quadrofoto.webp",
              alt: "Quadro de flores prensadas com fotografia personalizada como fundo",
              tag: "Custo adicional", tagSolid: false,
              title: "Fundo com Fotografia",
              desc: "Uma paisagem, um retrato, ou qualquer imagem com significado especial. A fotografia é profissionalmente impressa.",
              note: "O custo varia consoante as dimensões da moldura.",
            },
            {
              img: "/quadropreto.webp",
              alt: "Quadro de flores prensadas com fundo preto ou colorido personalizado",
              tag: null,
              title: "Fundo Colorido",
              desc: "Aplicamos qualquer cor de fundo para realçar as flores. Sugerimos tonalidades que combinem com a paleta do bouquet.",
            },
            {
              img: "/quadrobranco.webp",
              alt: "Quadro de flores prensadas com fundo branco minimalista",
              tag: null,
              title: "Fundo Branco",
              desc: "Minimalista e intemporal. Realça naturalmente as cores e formas das flores com máxima simplicidade.",
            },
          ].map((item, i) => (
            <div key={i} className="fundo-card-new">
              <div style={{ aspectRatio: "16/10", overflow: "hidden", borderRadius: "6px", backgroundColor: "#e0dbd3", position: "relative" }}>
                <img src={item.img} alt={item.alt} loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.9s ease" }}
                  className="fundo-img-new" />
                {item.tag && (
                <span style={{
                  position: "absolute", top: "14px", left: "14px",
                  backgroundColor: item.tagSolid ? "#3D6B5E" : "rgba(15,30,26,0.65)",
                  color: "#FAF7F0",
                  fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase",
                  fontFamily: "Roboto, sans-serif", fontWeight: 700,
                  padding: "6px 14px", borderRadius: "100px",
                  backdropFilter: "blur(4px)"
                }}>
                  {item.tag}
                </span>
                )}
              </div>
              <div style={{ padding: "20px 4px 0" }}>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)", fontWeight: 400, margin: "0 0 10px", lineHeight: 1.2, color: "#1a1a1a" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(26,26,26,0.65)", margin: 0 }}>
                  {item.desc}
                </p>
                {item.note && (
                  <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "0.85rem", color: "rgba(26,26,26,0.45)", margin: "8px 0 0", fontStyle: "italic" }}>
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>

        <p className="slider-hint" aria-live="polite">deslize para ver mais</p>

      </section>

      {/* ════════════════════════════════════════════
          ELEMENTOS ADICIONAIS
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FAF7F0", borderTop: "1px solid rgba(26,26,26,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(60px,10vw,120px) 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
            <div>
              <Reveal>
                <Label>Personalização extra</Label>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.1 }}>
                  Elementos com<br/><em style={{ color: "#3D6B5E" }}>valor simbólico</em>
                </h2>
                <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(26,26,26,0.7)", margin: "0 0 32px" }}>
                  É possível integrar elementos adicionais com significado especial na sua composição, tornando cada peça verdadeiramente única.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                  {["Convite do casamento","Votos manuscritos","Joias ou medalhas","Fitas, tecidos ou rendas","Coleiras de animais","Cartas e bilhetes","Objetos pessoais"].map((item, i) => (
                    <li key={i} style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.5, color: "rgba(26,26,26,0.8)", padding: "14px 16px 14px 0", borderBottom: "1px solid rgba(26,26,26,0.07)", display: "flex", alignItems: "center", gap: "12px", minHeight: "56px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#B8954A", flexShrink: 0 }} aria-hidden="true"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.12}>
                <div style={{ backgroundColor: "rgba(184,149,74,0.09)", borderLeft: "3px solid #B8954A", padding: "20px 24px", borderRadius: "0 8px 8px 0" }}>
                  <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(26,26,26,0.75)", margin: 0 }}>
                    <strong style={{ color: "#1a1a1a" }}>Nota:</strong> Se os acessórios forem mais volumosos do que as flores prensadas, poderá ser necessário aumentar a profundidade da moldura. O orçamento será ajustado conforme as características da peça.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "9/16", maxHeight: "600px" }}>
                <video src="/quadroconvite.webm" autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TAMANHOS E PREÇOS
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0F1E1A", padding: "clamp(60px,10vw,120px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <Label light>Investimento</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1, color: "#FAF7F0" }}>
                Tamanhos & Preços
              </h2>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(250,247,240,0.6)", maxWidth: "480px", margin: "0 auto" }}>
                Cada quadro que criamos é único. Feito à mão, com atenção aos detalhes e dedicação à história por detrás das flores.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2px", marginBottom: "48px" }}>
            {[
              { size: "30×40", unit: "cm", price: "300", popular: false, desc: "Perfeito para peças mais íntimas ou como elemento de conjunto." },
              { size: "40×50", unit: "cm", price: "400", popular: true,  desc: "O formato mais escolhido. Equilibra presença e elegância." },
              { size: "50×70", unit: "cm", price: "500", popular: false, desc: "Uma peça de destaque, que domina qualquer parede." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ backgroundColor: item.popular ? "#3D6B5E" : "rgba(250,247,240,0.04)", border: item.popular ? "none" : "1px solid rgba(250,247,240,0.07)", padding: "52px 40px", position: "relative", height: "100%", minHeight: "320px" }}>
                  {item.popular && (
                    <span style={{ position: "absolute", top: "22px", right: "22px", fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", fontWeight: 700, backgroundColor: "rgba(250,247,240,0.15)", color: "#FAF7F0", padding: "6px 14px", borderRadius: "100px" }}>
                      Mais popular
                    </span>
                  )}
                  <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(3rem, 6vw, 4rem)", color: "#FAF7F0", margin: "0", lineHeight: 1 }}>
                    {item.size}<span style={{ fontSize: "1.2rem", fontFamily: "Roboto, sans-serif", fontWeight: 300, marginLeft: "6px", opacity: 0.5 }}>{item.unit}</span>
                  </p>
                  <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem, 4vw, 2.6rem)", color: item.popular ? "#FAF7F0" : "#8BA888", margin: "16px 0 20px" }}>
                    {item.price}€
                  </p>
                  <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.7, color: "rgba(250,247,240,0.6)", margin: "0" }}>
                    {item.desc}
                  </p>
                  <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${item.popular ? "rgba(250,247,240,0.14)" : "rgba(250,247,240,0.06)"}` }}>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(250,247,240,0.4)", margin: 0 }}>
                      Inclui vidro UltraVue® UV70, moldura de nogueira e cartão de pH neutro
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ textAlign: "center", padding: "36px", border: "1px solid rgba(250,247,240,0.07)", borderRadius: "4px" }}>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(250,247,240,0.55)", margin: "0 0 20px" }}>
                Pretende outro formato ou uma composição diferente? Entre em contacto connosco.
              </p>
              <a href="/contactos" style={{ display: "inline-block", color: "#FAF7F0", fontFamily: "Roboto, sans-serif", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", borderBottom: "2px solid rgba(250,247,240,0.3)", paddingBottom: "4px", transition: "border-color 0.3s", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(250,247,240,0.3)"}
              >
                Falar connosco
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MATERIAIS E QUALIDADE
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FAF7F0", padding: "clamp(60px,10vw,120px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <Label>Feito para durar</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1 }}>
                Materiais & Qualidade
              </h2>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(26,26,26,0.6)", maxWidth: "520px", margin: "0 auto" }}>
                Cada peça é produzida com materiais de conservação museu, selecionados para garantir que as suas flores permanecem belas ao longo dos anos.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1px", backgroundColor: "rgba(26,26,26,0.07)", marginBottom: "72px" }}>
            {[
              { bg: "#3D6B5E", textColor: "#FAF7F0", subColor: "rgba(250,247,240,0.65)", title: "Moldura de Nogueira", desc: "Folheada de nogueira, produzida artesanalmente em Coimbra por carpinteiros locais. Material de origem sustentável e regional." },
              { bg: "#FAF7F0", textColor: "#1a1a1a", subColor: "rgba(26,26,26,0.65)", title: "Cartão pH Neutro",    desc: "Base de conservação a longo prazo, idêntica à usada em museus e arquivos. Preserva as flores sem alterar a sua cor." },
              { bg: "#F2EDE4", textColor: "#1a1a1a", subColor: "rgba(26,26,26,0.65)", title: "Cola pH Neutro",      desc: "Segura para flores prensadas e elementos delicados. Não amarelece com o tempo nem danifica materiais frágeis." },
              { bg: "#0F1E1A", textColor: "#FAF7F0", subColor: "rgba(250,247,240,0.65)", title: "Vidro UltraVue® UV70", desc: "Anti-reflexo quase invisível, filtra 70% dos raios UV nocivos. Produzido com vidro Water White de origem certificada." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ backgroundColor: item.bg, padding: "40px 32px", minHeight: "240px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.25rem", fontWeight: 400, margin: "0 0 12px", lineHeight: 1.2, color: item.textColor }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: item.subColor, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
            <Reveal>
              <div>
                <Label>Vidro museu</Label>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.15 }}>
                  UltraVue® UV70<br/><em style={{ color: "#3D6B5E" }}>clareza verdadeiramente incrível</em>
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Praticamente elimina reflexos",
                    "Filtra até 70% dos raios UV nocivos",
                    "Vidro Water White com transmissão de cores cristalinas",
                    "Ilumina cores e níveis de contraste",
                    "Superfície duradoura e de fácil limpeza",
                  ].map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "16px 0", borderBottom: "1px solid rgba(26,26,26,0.07)", fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.7, color: "rgba(26,26,26,0.8)", minHeight: "64px" }}>
                      <span style={{
                        width: "24px", height: "24px", borderRadius: "50%",
                        backgroundColor: "#3D6B5E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px"
                      }} aria-hidden="true">
                        <svg width="11" height="9" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#FAF7F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ width: "clamp(200px, 28vw, 340px)", borderRadius: "10px", overflow: "hidden", boxShadow: "0 12px 40px rgba(26,26,26,0.12)", flexShrink: 0 }}>
                <img src="/ladoalado.webp" alt="Comparação entre vidro normal e vidro UltraVue anti-reflexo" loading="lazy" style={{ width: "100%", display: "block" }} />
                <div style={{ backgroundColor: "#F2EDE4", padding: "14px 18px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(26,26,26,0.45)", fontWeight: 600 }}>Normal</span>
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#3D6B5E", fontWeight: 800 }}>UltraVue®</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ADD-ONS
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F2EDE4", padding: "clamp(60px,10vw,120px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "64px" }}>
              <Label>Extras</Label>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 400, margin: "0 0 16px", lineHeight: 1.1 }}>
                Add-ons &<br/><em style={{ color: "#3D6B5E" }}>Presentes</em>
              </h2>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(26,26,26,0.65)", maxWidth: "480px" }}>
                Para além do seu quadro principal, pode encomendar peças adicionais. Presentes pessoais e cheios de significado para quem ama.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "clamp(40px, 6vw, 80px)", alignItems: "center", marginBottom: "clamp(60px,10vw,100px)", paddingBottom: "clamp(60px,10vw,100px)", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
            <Reveal>
              <div style={{ aspectRatio: "4/3", overflow: "hidden", borderRadius: "12px", boxShadow: "0 16px 48px rgba(26,26,26,0.1)" }}>
                <img src="/miniquadros.webp" alt="Mini quadros 20x25cm de flores preservadas como presentes para padrinhos e damas de honor" loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <Label>Para oferecer</Label>
                <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem, 4vw, 2.7rem)", fontWeight: 400, margin: "0 0 10px", lineHeight: 1.1 }}>Mini Quadros</h3>
                <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "2rem", color: "#3D6B5E", margin: "0 0 24px" }}>20×25 cm — 90€</p>
                <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(26,26,26,0.7)", margin: "0 0 18px" }}>
                  Molduras mais pequenas com as flores do seu bouquet. Uma forma bonita de partilhar um pedaço do seu dia especial com as pessoas que mais ama.
                </p>
                <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.5px", color: "#3D6B5E", margin: 0 }}>
                  Emoldurado com vidro museu UltraVue®
                </p>
              </div>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "clamp(32px, 5vw, 48px)" }}>
            {[
              {
                imgs: [
                  { src: "/ornamento1.webp", alt: "Ornamento de natal rectangular com flores prensadas em vidro soldado com prata" },
                  { src: "/ornamento2.webp", alt: "Ornamento de natal circular com flores prensadas em vidro soldado com prata" },
                ],
                badge: "Sazonal", badgeBg: "rgba(184,149,74,0.15)", badgeColor: "#96722A",
                title: "Ornamentos de Natal",
                price: "Aprox. 8 cm — 35€",
                desc: "Vidro sobre vidro soldado sem chumbo com prata. Formatos à escolha: circular, quadrado ou rectangular.",
              },
              {
                imgs: [
                  { src: "/pendente1.webp", alt: "Pendente de flores prensadas em vidro soldado com prata" },
                  { src: "/pendente2.webp", alt: "Pendente floral circular em vidro soldado com prata" },
                ],
                badge: "Joalharia botânica", badgeBg: "rgba(61,107,94,0.12)", badgeColor: "#3D6B5E",
                title: "Pendentes para Colar",
                price: "Aprox. 3 cm — 35€",
                desc: "Vidro sobre vidro soldado sem chumbo com prata. Formatos à escolha: circular, quadrado ou rectangular.",
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 32px rgba(26,26,26,0.08)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", backgroundColor: "rgba(26,26,26,0.1)" }}>
                    {item.imgs.map((img, j) => (
                      <img key={j} src={img.src} alt={img.alt} loading="lazy"
                        style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
                    ))}
                  </div>
                  <div style={{ padding: "32px 32px 36px", backgroundColor: "#FAF7F0" }}>
                    <span style={{ display: "inline-block", backgroundColor: item.badgeBg, color: item.badgeColor, fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", fontWeight: 700, padding: "6px 14px", borderRadius: "100px", marginBottom: "16px" }}>
                      {item.badge}
                    </span>
                    <h3 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.7rem", fontWeight: 400, margin: "0 0 8px", color: "#1a1a1a" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "1.4rem", color: "#3D6B5E", margin: "0 0 16px" }}>
                      {item.price}
                    </p>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.7, color: "rgba(26,26,26,0.7)", margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#3D6B5E", padding: "clamp(80px,12vw,140px) 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <Reveal>
            <Label light>Próximo passo</Label>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 400, margin: "0 0 24px", lineHeight: 1.05, color: "#FAF7F0" }}>
              Pronta para preservar<br/><em style={{ color: "#8BA888" }}>o seu bouquet?</em>
            </h2>
            <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(250,247,240,0.75)", margin: "0 0 48px" }}>
              Reserve a sua data o mais cedo possível. As vagas são limitadas e os bouquets devem ser enviados dentro de poucos dias após o evento.
            </p>
            <div style={{ display: "flex", gap: "18px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wkf.ms/3RfoNAc" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F0", color: "#3D6B5E", padding: "18px 44px", borderRadius: "100px", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", transition: "all 0.3s ease", minHeight: "60px" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#EDE5D4"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FAF7F0"; }}
              >
                Reservar Data
              </a>
              <a href="/perguntas-frequentes"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", color: "rgba(250,247,240,0.9)", padding: "18px 44px", borderRadius: "100px", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", border: "2px solid rgba(250,247,240,0.35)", transition: "all 0.3s ease", minHeight: "60px" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(250,247,240,0.8)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(250,247,240,0.35)"}
              >
                Perguntas Frequentes
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        .fundos-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 18px;
          padding: 0 24px 4px;
        }
        .fundos-track::-webkit-scrollbar { display: none; }

        .fundo-card-new {
          flex: 0 0 78vw;
          max-width: 340px;
          scroll-snap-align: start;
        }

        @media (min-width: 900px) {
          .fundos-track {
            overflow-x: visible;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
            gap: 28px;
          }
          .fundo-card-new {
            flex: 1 1 0;
            max-width: none;
            scroll-snap-align: unset;
          }
        }

        .fundo-img-new:hover { transform: scale(1.05); }

        .slider-hint {
          display: block;
          text-align: center;
          font-family: Roboto, sans-serif;
          font-size: 0.875rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(26,26,26,0.35);
          padding: 20px 0 0;
          margin: 0;
        }
        @media (min-width: 900px) {
          .slider-hint { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          video {
            animation: none !important;
          }
        }

        a:focus-visible,
        button:focus-visible {
          outline: 3px solid #3D6B5E;
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
