"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── SEO ─────────────────────────────────────────────────────────────────────
export const metadata = {
  title: "Opções e Preços | Flores à Beira-Rio",
  description:
    "Descubra os tipos de fundo, tamanhos e preços dos quadros de flores preservadas da Flores à Beira-Rio. Feitos à mão em Coimbra, com materiais de conservação museu.",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

function Reveal({ children, delay = 0, className, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p style={{
      fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase",
      color: "#B8954A", fontFamily: "Roboto, sans-serif",
      margin: "0 0 20px", fontWeight: "500"
    }}>
      {children}
    </p>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      height: "1px",
      background: "linear-gradient(to right, transparent, rgba(26,26,26,0.12), transparent)",
      margin: "0"
    }} />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OpcoesEPrecos() {
  return (
    <div style={{ backgroundColor: "#FAF7F0", color: "#1a1a1a" }}>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop: "clamp(120px, 18vw, 180px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        paddingLeft: "24px", paddingRight: "24px",
        textAlign: "center",
        maxWidth: "900px", margin: "0 auto"
      }}>
        <Reveal>
          <Label>O seu bouquet, para sempre</Label>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            lineHeight: 0.95, margin: "0 0 32px",
            color: "#1a1a1a", fontWeight: 400
          }}>
            Opções<br/>
            <em style={{ color: "#3D6B5E" }}>& Preços</em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{
            fontFamily: "Roboto, sans-serif", fontWeight: 300,
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            lineHeight: 1.75, color: "rgba(26,26,26,0.65)",
            maxWidth: "580px", margin: "0 auto"
          }}>
            Cada quadro é uma peça única, feita à mão em Coimbra.
            Escolha o fundo, o tamanho e os elementos que tornam
            a sua composição verdadeiramente sua.
          </p>
        </Reveal>
      </section>

      <Divider/>

      {/* ══════════════════════════════════════════════════════════
          TIPOS DE FUNDO
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(60px,10vw,120px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

          <Reveal>
            <div style={{ marginBottom: "56px" }}>
              <Label>Personalização</Label>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400, margin: 0, lineHeight: 1.1
              }}>
                Tipos de Fundo
              </h2>
            </div>
          </Reveal>

          {/* Grid 2x2 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
            gap: "2px",
            backgroundColor: "rgba(26,26,26,0.06)"
          }}>
            {[
              {
                img: "/quadrovidrosobrevidro.webp",
                title: "Vidro sobre Vidro",
                subtitle: "Efeito flutuante",
                desc: "As flores ficam suspensas entre dois vidros, sem fundo opaco — criando um efeito leve e moderno que permite ver através da moldura. Ideal para ambientes luminosos ou para quem procura um visual mais contemporâneo.",
                tag: "fundo transparente"
              },
              {
                img: "/quadrobranco.webp",
                title: "Fundo Branco",
                subtitle: "Minimalismo atemporal",
                desc: "Uma opção minimalista e intemporal que realça naturalmente as cores e formas das flores. Ideal para quem prefere um estilo mais limpo e elegante.",
                tag: "mais popular"
              },
              {
                img: "/quadropreto.webp",
                title: "Fundo Preto ou Colorido",
                subtitle: "Drama e intensidade",
                desc: "Podemos aplicar uma cor de fundo escolhida para realçar a beleza das flores. Se quiser, sugerimos tonalidades que combinem com a paleta de cores do seu bouquet e valorizem a composição final.",
                tag: "personalizável"
              },
              {
                img: "/quadrofoto.webp",
                title: "Fundo com Fotografia",
                subtitle: "A sua memória como cenário",
                desc: "Escolha uma fotografia para servir de fundo — uma paisagem, um retrato ou qualquer imagem com significado especial. A imagem será profissionalmente impressa.",
                tag: "custo adicional",
                extra: true
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="fundo-card" style={{ backgroundColor: "#FAF7F0" }}>
                  {/* Imagem */}
                  <div style={{
                    aspectRatio: "4/3", overflow: "hidden",
                    backgroundColor: "rgba(26,26,26,0.04)"
                  }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.7s ease"
                      }}
                      className="fundo-img"
                    />
                  </div>
                  {/* Texto */}
                  <div style={{ padding: "32px 32px 36px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
                      <h3 style={{
                        fontFamily: "'TAN-MEMORIES', serif",
                        fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                        fontWeight: 400, margin: 0, lineHeight: 1.1
                      }}>
                        {item.title}
                      </h3>
                      <span style={{
                        fontSize: "0.58rem", letterSpacing: "2px",
                        textTransform: "uppercase", fontFamily: "Roboto, sans-serif",
                        backgroundColor: item.extra ? "rgba(184,149,74,0.1)" : "rgba(61,107,94,0.1)",
                        color: item.extra ? "#B8954A" : "#3D6B5E",
                        padding: "5px 10px", borderRadius: "100px",
                        whiteSpace: "nowrap", flexShrink: 0
                      }}>
                        {item.tag}
                      </span>
                    </div>
                    <p style={{
                      fontSize: "0.78rem", fontWeight: 500,
                      letterSpacing: "1.5px", textTransform: "uppercase",
                      color: "#3D6B5E", fontFamily: "Roboto, sans-serif",
                      margin: "0 0 14px"
                    }}>
                      {item.subtitle}
                    </p>
                    <p style={{
                      fontFamily: "Roboto, sans-serif", fontWeight: 300,
                      fontSize: "0.92rem", lineHeight: 1.75,
                      color: "rgba(26,26,26,0.65)", margin: 0
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider/>

      {/* ══════════════════════════════════════════════════════════
          ELEMENTOS ADICIONAIS
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(60px,10vw,120px) 24px",
        maxWidth: "1200px", margin: "0 auto"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center"
        }}>
          {/* Texto */}
          <div>
            <Reveal>
              <Label>Personalização extra</Label>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 400, margin: "0 0 24px", lineHeight: 1.1
              }}>
                Elementos com<br/>
                <em style={{ color: "#3D6B5E" }}>valor simbólico</em>
              </h2>
              <p style={{
                fontFamily: "Roboto, sans-serif", fontWeight: 300,
                fontSize: "0.95rem", lineHeight: 1.8,
                color: "rgba(26,26,26,0.65)", margin: "0 0 28px"
              }}>
                É possível integrar elementos adicionais com significado
                especial na sua composição, tornando cada peça
                verdadeiramente única.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul style={{
                listStyle: "none", padding: 0, margin: "0 0 28px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px 24px"
              }}>
                {[
                  "Convite do casamento",
                  "Votos manuscritos",
                  "Joias ou medalhas",
                  "Fitas, tecidos ou rendas",
                  "Coleiras de animais",
                  "Cartas e bilhetes",
                  "Objetos pessoais",
                ].map((item, i) => (
                  <li key={i} style={{
                    fontFamily: "Roboto, sans-serif", fontWeight: 300,
                    fontSize: "0.88rem", lineHeight: 1.5,
                    color: "rgba(26,26,26,0.75)",
                    paddingLeft: "16px", position: "relative"
                  }}>
                    <span style={{
                      position: "absolute", left: 0, top: "7px",
                      width: "5px", height: "5px", borderRadius: "50%",
                      backgroundColor: "#B8954A"
                    }}/>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{
                backgroundColor: "rgba(184,149,74,0.08)",
                borderLeft: "2px solid #B8954A",
                padding: "16px 20px", borderRadius: "0 8px 8px 0"
              }}>
                <p style={{
                  fontFamily: "Roboto, sans-serif", fontWeight: 400,
                  fontSize: "0.82rem", lineHeight: 1.7,
                  color: "rgba(26,26,26,0.7)", margin: 0
                }}>
                  <strong style={{ color: "#1a1a1a" }}>Nota:</strong> Se os acessórios forem mais
                  volumosos do que as flores prensadas, poderá ser necessário
                  aumentar a profundidade da moldura. O orçamento será
                  ajustado conforme as características da peça.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Vídeo */}
          <Reveal delay={0.1}>
            <div style={{
              borderRadius: "16px", overflow: "hidden",
              aspectRatio: "9/16", maxHeight: "600px",
              backgroundColor: "rgba(26,26,26,0.04)"
            }}>
              <video
                src="/quadroconvite.webm"
                autoPlay muted loop playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Divider/>

      {/* ══════════════════════════════════════════════════════════
          TAMANHOS E PREÇOS
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(60px,10vw,120px) 24px",
        backgroundColor: "#0F1E1A"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <Label>Investimento</Label>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1,
                color: "#FAF7F0"
              }}>
                Tamanhos & Preços
              </h2>
              <p style={{
                fontFamily: "Roboto, sans-serif", fontWeight: 300,
                fontSize: "0.95rem", lineHeight: 1.75,
                color: "rgba(250,247,240,0.55)",
                maxWidth: "480px", margin: "0 auto"
              }}>
                Cada quadro que criamos é único — feito à mão, com
                atenção aos detalhes e dedicação à história por detrás das flores.
              </p>
            </div>
          </Reveal>

          {/* 3 pricing cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "2px",
            marginBottom: "48px"
          }}>
            {[
              { size: "30×40", unit: "cm", price: "300", popular: false, desc: "Perfeito para peças mais íntimas ou como elemento de conjunto." },
              { size: "40×50", unit: "cm", price: "400", popular: true,  desc: "O formato mais escolhido. Equilibra presença e elegância." },
              { size: "50×70", unit: "cm", price: "500", popular: false, desc: "Uma peça de destaque, que domina qualquer parede." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  backgroundColor: item.popular ? "#3D6B5E" : "rgba(250,247,240,0.04)",
                  border: item.popular ? "none" : "1px solid rgba(250,247,240,0.08)",
                  padding: "48px 36px",
                  position: "relative",
                  transition: "background 0.3s"
                }}>
                  {item.popular && (
                    <span style={{
                      position: "absolute", top: "20px", right: "20px",
                      fontSize: "0.55rem", letterSpacing: "2.5px",
                      textTransform: "uppercase", fontFamily: "Roboto, sans-serif",
                      backgroundColor: "rgba(250,247,240,0.15)",
                      color: "#FAF7F0", padding: "5px 12px", borderRadius: "100px"
                    }}>
                      Mais popular
                    </span>
                  )}
                  <p style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                    color: "#FAF7F0", margin: "0", lineHeight: 1
                  }}>
                    {item.size}
                    <span style={{ fontSize: "1rem", fontFamily: "Roboto, sans-serif", fontWeight: 300, marginLeft: "4px", opacity: 0.5 }}>
                      {item.unit}
                    </span>
                  </p>
                  <p style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                    color: item.popular ? "#FAF7F0" : "#8BA888",
                    margin: "16px 0 20px"
                  }}>
                    {item.price}€
                  </p>
                  <p style={{
                    fontFamily: "Roboto, sans-serif", fontWeight: 300,
                    fontSize: "0.88rem", lineHeight: 1.7,
                    color: "rgba(250,247,240,0.55)", margin: "0"
                  }}>
                    {item.desc}
                  </p>
                  <div style={{
                    marginTop: "32px", paddingTop: "24px",
                    borderTop: `1px solid ${item.popular ? "rgba(250,247,240,0.15)" : "rgba(250,247,240,0.06)"}`
                  }}>
                    <p style={{
                      fontFamily: "Roboto, sans-serif", fontWeight: 300,
                      fontSize: "0.78rem", lineHeight: 1.5,
                      color: "rgba(250,247,240,0.35)", margin: 0
                    }}>
                      Inclui vidro UltraVue® UV70, moldura de nogueira e cartão de pH neutro
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{
              textAlign: "center",
              padding: "32px",
              border: "1px solid rgba(250,247,240,0.08)",
              borderRadius: "4px"
            }}>
              <p style={{
                fontFamily: "Roboto, sans-serif", fontWeight: 300,
                fontSize: "0.92rem", lineHeight: 1.75,
                color: "rgba(250,247,240,0.5)", margin: "0 0 20px"
              }}>
                Pretende outro formato ou uma composição diferente? Entre em contacto connosco.
              </p>
              <a href="/contactos" style={{
                display: "inline-block",
                color: "#FAF7F0", fontFamily: "Roboto, sans-serif",
                fontSize: "0.72rem", fontWeight: 600,
                letterSpacing: "2px", textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(250,247,240,0.3)",
                paddingBottom: "2px",
                transition: "border-color 0.3s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(250,247,240,0.3)"}
              >
                Falar connosco →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MATERIAIS E QUALIDADE
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(60px,10vw,120px) 24px",
        maxWidth: "1200px", margin: "0 auto"
      }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Label>Feito para durar</Label>
            <h2 style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400, margin: "0 0 20px", lineHeight: 1.1
            }}>
              Materiais & Qualidade
            </h2>
            <p style={{
              fontFamily: "Roboto, sans-serif", fontWeight: 300,
              fontSize: "0.95rem", lineHeight: 1.75,
              color: "rgba(26,26,26,0.55)",
              maxWidth: "520px", margin: "0 auto"
            }}>
              Cada peça é produzida com materiais de conservação museu,
              selecionados para garantir que as suas flores permanecem
              belas ao longo dos anos.
            </p>
          </div>
        </Reveal>

        {/* Materiais em grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: "1px",
          backgroundColor: "rgba(26,26,26,0.08)",
          marginBottom: "80px"
        }}>
          {[
            {
              icon: "🪵",
              title: "Moldura de Nogueira",
              desc: "Folheada de nogueira, feita artesanalmente em Coimbra por carpinteiros locais."
            },
            {
              icon: "📄",
              title: "Cartão pH Neutro",
              desc: "Base de conservação a longo prazo, idêntica à usada em museus e arquivos."
            },
            {
              icon: "🌿",
              title: "Cola pH Neutro",
              desc: "Segura para flores prensadas e elementos delicados, sem amarelecer com o tempo."
            },
            {
              icon: "✨",
              title: "Vidro UltraVue® UV70",
              desc: "Anti-reflexo quase invisível, filtra 70% dos raios UV para conservação máxima."
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{
                backgroundColor: "#FAF7F0",
                padding: "36px 28px"
              }}>
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "16px" }}>
                  {item.icon}
                </span>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.1rem", fontWeight: 400,
                  margin: "0 0 12px", lineHeight: 1.2
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "Roboto, sans-serif", fontWeight: 300,
                  fontSize: "0.88rem", lineHeight: 1.7,
                  color: "rgba(26,26,26,0.6)", margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* UltraVue deep dive + comparação */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center"
        }}>
          <Reveal>
            <div>
              <Label>Vidro museu</Label>
              <h3 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
                fontWeight: 400, margin: "0 0 20px", lineHeight: 1.15
              }}>
                UltraVue® UV70 —<br/>
                <em style={{ color: "#3D6B5E" }}>clareza verdadeiramente incrível</em>
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Praticamente elimina reflexos",
                  "Filtra até 70% dos raios UV nocivos",
                  "Vidro Water White — transmissão de cores cristalinas",
                  "Ilumina cores e níveis de contraste",
                  "Superfície duradoura e de fácil limpeza",
                ].map((feat, i) => (
                  <li key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: "12px",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(26,26,26,0.06)",
                    fontFamily: "Roboto, sans-serif", fontWeight: 300,
                    fontSize: "0.92rem", lineHeight: 1.6,
                    color: "rgba(26,26,26,0.75)"
                  }}>
                    <span style={{ color: "#3D6B5E", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Comparação lado a lado */}
          <Reveal delay={0.1}>
            <div style={{ borderRadius: "12px", overflow: "hidden" }}>
              <img
                src="/ladoalado.webp"
                alt="Comparação entre vidro normal e vidro UltraVue® anti-reflexo"
                loading="lazy"
                style={{ width: "100%", display: "block" }}
              />
              <div style={{
                backgroundColor: "rgba(26,26,26,0.04)",
                padding: "16px 20px",
                display: "flex", justifyContent: "space-between"
              }}>
                <span style={{
                  fontFamily: "Roboto, sans-serif", fontSize: "0.72rem",
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  color: "rgba(26,26,26,0.4)", fontWeight: 500
                }}>
                  Vidro Normal
                </span>
                <span style={{
                  fontFamily: "Roboto, sans-serif", fontSize: "0.72rem",
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  color: "#3D6B5E", fontWeight: 600
                }}>
                  UltraVue® UV70
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider/>

      {/* ══════════════════════════════════════════════════════════
          ADD-ONS
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(60px,10vw,120px) 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <Reveal>
            <div style={{ marginBottom: "64px" }}>
              <Label>Extras</Label>
              <h2 style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400, margin: "0 0 16px", lineHeight: 1.1
              }}>
                Add-ons &<br/>
                <em style={{ color: "#3D6B5E" }}>Presentes</em>
              </h2>
              <p style={{
                fontFamily: "Roboto, sans-serif", fontWeight: 300,
                fontSize: "0.95rem", lineHeight: 1.75,
                color: "rgba(26,26,26,0.55)",
                maxWidth: "480px"
              }}>
                Para além do seu quadro principal, pode encomendar peças adicionais —
                presentes pessoais e cheios de significado para quem ama.
              </p>
            </div>
          </Reveal>

          {/* ── Mini Quadros ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
            marginBottom: "clamp(60px, 10vw, 100px)",
            paddingBottom: "clamp(60px, 10vw, 100px)",
            borderBottom: "1px solid rgba(26,26,26,0.08)"
          }}>
            <Reveal>
              <img
                src="/miniquadros.webp"
                alt="Mini quadros de flores preservadas como presentes"
                loading="lazy"
                style={{ width: "100%", borderRadius: "12px", display: "block" }}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <Label>Para oferecer</Label>
                <h3 style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                  fontWeight: 400, margin: "0 0 8px", lineHeight: 1.1
                }}>
                  Mini Quadros
                </h3>
                <p style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "1.6rem", color: "#3D6B5E",
                  margin: "0 0 20px"
                }}>
                  20×25 cm — 90€
                </p>
                <p style={{
                  fontFamily: "Roboto, sans-serif", fontWeight: 300,
                  fontSize: "0.95rem", lineHeight: 1.8,
                  color: "rgba(26,26,26,0.65)", margin: "0 0 16px"
                }}>
                  Molduras mais pequenas com as flores do seu bouquet —
                  uma forma bonita de partilhar um pedaço do seu dia
                  especial com as pessoas que mais ama.
                </p>
                <p style={{
                  fontFamily: "Roboto, sans-serif", fontWeight: 400,
                  fontSize: "0.82rem", letterSpacing: "0.5px",
                  color: "rgba(26,26,26,0.5)", margin: 0
                }}>
                  Emoldurado com vidro museu UltraVue®
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Ornamentos + Pendentes ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: "clamp(40px, 5vw, 60px)"
          }}>

            {/* Ornamentos */}
            <Reveal>
              <div style={{
                border: "1px solid rgba(26,26,26,0.1)",
                borderRadius: "12px", overflow: "hidden"
              }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "2px", backgroundColor: "rgba(26,26,26,0.08)"
                }}>
                  <img src="/ornamento1.webp" alt="Ornamento de natal rectangular com flores prensadas" loading="lazy"
                    style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }}/>
                  <img src="/ornamento2.webp" alt="Ornamento de natal circular com flores prensadas" loading="lazy"
                    style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }}/>
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <span style={{
                    fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase",
                    fontFamily: "Roboto, sans-serif", color: "#B8954A", fontWeight: 500,
                    display: "block", marginBottom: "10px"
                  }}>
                    Sazonal
                  </span>
                  <h3 style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "1.5rem", fontWeight: 400, margin: "0 0 6px"
                  }}>
                    Ornamentos de Natal
                  </h3>
                  <p style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "1.2rem", color: "#3D6B5E", margin: "0 0 16px"
                  }}>
                    Aprox. 8 cm — 35€
                  </p>
                  <p style={{
                    fontFamily: "Roboto, sans-serif", fontWeight: 300,
                    fontSize: "0.88rem", lineHeight: 1.7,
                    color: "rgba(26,26,26,0.6)", margin: "0 0 16px"
                  }}>
                    Vidro sobre vidro soldado sem chumbo com prata.
                    Formatos à escolha: circular, quadrado ou rectangular.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Pendentes */}
            <Reveal delay={0.08}>
              <div style={{
                border: "1px solid rgba(26,26,26,0.1)",
                borderRadius: "12px", overflow: "hidden"
              }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "2px", backgroundColor: "rgba(26,26,26,0.08)"
                }}>
                  <img src="/pendente1.webp" alt="Pendente de flores prensadas em vidro" loading="lazy"
                    style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }}/>
                  <img src="/pendente2.webp" alt="Pendente floral em vidro soldado com prata" loading="lazy"
                    style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }}/>
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <span style={{
                    fontSize: "0.58rem", letterSpacing: "2px", textTransform: "uppercase",
                    fontFamily: "Roboto, sans-serif", color: "#B8954A", fontWeight: 500,
                    display: "block", marginBottom: "10px"
                  }}>
                    Joalharia botânica
                  </span>
                  <h3 style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "1.5rem", fontWeight: 400, margin: "0 0 6px"
                  }}>
                    Pendentes para Colar
                  </h3>
                  <p style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "1.2rem", color: "#3D6B5E", margin: "0 0 16px"
                  }}>
                    Aprox. 3 cm — 35€
                  </p>
                  <p style={{
                    fontFamily: "Roboto, sans-serif", fontWeight: 300,
                    fontSize: "0.88rem", lineHeight: 1.7,
                    color: "rgba(26,26,26,0.6)", margin: "0 0 16px"
                  }}>
                    Vidro sobre vidro soldado sem chumbo com prata.
                    Formatos à escolha: circular, quadrado ou rectangular.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider/>

      {/* ══════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(80px,12vw,140px) 24px",
        textAlign: "center",
        maxWidth: "700px", margin: "0 auto"
      }}>
        <Reveal>
          <Label>Próximo passo</Label>
          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 400, margin: "0 0 24px", lineHeight: 1.05
          }}>
            Pronta para preservar
            <br/>
            <em style={{ color: "#3D6B5E" }}>o seu bouquet?</em>
          </h2>
          <p style={{
            fontFamily: "Roboto, sans-serif", fontWeight: 300,
            fontSize: "0.95rem", lineHeight: 1.8,
            color: "rgba(26,26,26,0.55)", margin: "0 0 40px"
          }}>
            Reserve a sua data o mais cedo possível — as vagas são limitadas
            e os bouquets devem ser enviados dentro de poucos dias após o evento.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wkf.ms/3RfoNAc"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#3D6B5E", color: "#FAF7F0",
                padding: "16px 40px", borderRadius: "100px",
                textDecoration: "none", fontWeight: 600,
                fontSize: "0.78rem", letterSpacing: "1.5px",
                textTransform: "uppercase", fontFamily: "Roboto, sans-serif",
                boxShadow: "0 6px 24px rgba(61,107,94,0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(61,107,94,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(61,107,94,0.3)"; }}
            >
              Reservar Data
            </a>
            <a
              href="/perguntas-frequentes"
              style={{
                display: "inline-block",
                backgroundColor: "transparent", color: "#1a1a1a",
                padding: "16px 40px", borderRadius: "100px",
                textDecoration: "none", fontWeight: 500,
                fontSize: "0.78rem", letterSpacing: "1.5px",
                textTransform: "uppercase", fontFamily: "Roboto, sans-serif",
                border: "1.5px solid rgba(26,26,26,0.2)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#1a1a1a"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(26,26,26,0.2)"}
            >
              Ver Perguntas Frequentes
            </a>
          </div>
        </Reveal>
      </section>

      {/* ══ CSS ══ */}
      <style jsx global>{`
        .fundo-card:hover .fundo-img {
          transform: scale(1.04);
        }

        @media (max-width: 600px) {
          /* pricing cards full width on small phones */
        }
      `}</style>
    </div>
  );
}
