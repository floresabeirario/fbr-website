"use client";

export default function OferecePreservacao() {
  const formUrl =
    "https://forms.monday.com/forms/10354340f7be1b415ba4cf84fce6a05c?r=euc1";

  // Azul do voucher
  const azulVoucher = "#7B8FC7";
  const azulClaro = "#B8C4E8";
  const azulFundo = "#E8ECF8";

  const ocasioes = [
    {
      emoji: "💍",
      titulo: "Casamento",
      descricao:
        "O bouquet de noiva passou meses a ser pensado ao pormenor. Transforme-o numa obra de arte que vai durar para sempre na parede da casa do casal.",
    },
    {
      emoji: "🍼",
      titulo: "Batizado",
      descricao:
        "As flores do altar, do vestido ou da decoração do batizado podem tornar-se numa recordação permanente deste dia tão especial na vida de uma família.",
    },
    {
      emoji: "🌸",
      titulo: "Aniversário de casamento",
      descricao:
        "Ofereça ao casal a possibilidade de preservar as flores do seu aniversário, criando uma nova memória para celebrar os anos juntos.",
    },
    {
      emoji: "🎓",
      titulo: "Formatura",
      descricao:
        "Anos de esforço e dedicação merecem ser celebrados. As flores da cerimónia de formatura preservadas num quadro são um símbolo de conquista.",
    },
    {
      emoji: "🕊️",
      titulo: "Homenagem e Luto",
      descricao:
        "Em momentos de perda, as flores carregam uma carga emocional enorme. Preservá-las é uma forma de manter viva a memória de alguém amado.",
    },
    {
      emoji: "💛",
      titulo: "Simplesmente Porque Sim",
      descricao:
        "Não é preciso uma ocasião especial para dar um presente especial. Um vale oferta é um gesto de amor puro, sem data marcada.",
    },
  ];

  return (
    <main
      style={{
        backgroundColor: "#FAF7F0",
        fontFamily: "'Roboto', sans-serif",
        color: "#0F1E1A",
        overflowX: "hidden",
      }}
    >
      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "7rem 1.5rem 5rem",
          background: `linear-gradient(160deg, ${azulFundo} 0%, #FAF7F0 60%)`,
          position: "relative",
        }}
      >
        <h1
          style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2.4rem, 7vw, 5.2rem)",
            lineHeight: 1.1,
            color: "#0F1E1A",
            maxWidth: "800px",
            marginBottom: "1.8rem",
          }}
        >
          Ofereça uma memória que dura para sempre
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            lineHeight: 1.8,
            maxWidth: "560px",
            color: "#3D6B5E",
            marginBottom: "3rem",
          }}
        >
          O vale oferta da Flores à Beira-Rio transforma flores reais em arte
          emoldurada feita à mão, guardando para sempre as memórias de um dia
          especial.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#0F1E1A",
              color: "#FAF7F0",
              padding: "1rem 2.4rem",
              borderRadius: "60px",
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#3D6B5E";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#0F1E1A";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Encomendar Vale Oferta
          </a>

          <a
            href="/como-funciona"
            style={{
              display: "inline-block",
              backgroundColor: "transparent",
              color: "#0F1E1A",
              padding: "1rem 2.4rem",
              borderRadius: "60px",
              border: "1.5px solid rgba(15,30,26,0.25)",
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#3D6B5E";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(15,30,26,0.25)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Como Funciona
          </a>
        </div>

        <p
          style={{
            marginTop: "1.2rem",
            fontSize: "0.8rem",
            color: "#8BA888",
            letterSpacing: "0.05em",
          }}
        >
          A partir de 300€ · Sem data de validade
        </p>
      </section>

      {/* ─── FOTOS DO VALE ─── */}
      <section
        style={{
          padding: "5rem 1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(15,30,26,0.12)",
              aspectRatio: "3/4",
              background: azulFundo,
            }}
          >
            <img
              src="/images/vale1.webp"
              alt="Cartão presente da Flores à Beira-Rio versão colorida com ilustrações de flores"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(15,30,26,0.12)",
              aspectRatio: "3/4",
              background: azulFundo,
            }}
          >
            <img
              src="/images/vale2.webp"
              alt="Cartão presente da Flores à Beira-Rio verso com detalhes do vale oferta"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ padding: "1rem 0" }}>
            <h2
              style={{
                fontFamily: "'TAN-MEMORIES', serif",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                lineHeight: 1.2,
                marginBottom: "1.4rem",
                color: "#0F1E1A",
              }}
            >
              Um cartão ilustrado por uma artista local
            </h2>
            <p
              style={{
                lineHeight: 1.8,
                fontSize: "1rem",
                color: "#3D6B5E",
                marginBottom: "1.2rem",
              }}
            >
              O cartão presente é desenhado à mão por uma artista de Coimbra,
              e existe em duas versões: uma colorida e alegre, outra em tons
              neutros e elegantes, para se adaptar a qualquer ocasião.
            </p>
            <p style={{ lineHeight: 1.8, fontSize: "1rem", color: "#3D6B5E" }}>
              Pode ser enviado por email gratuitamente, ou entregue fisicamente
              por 5€ mais portes. A recolha em Coimbra é gratuita.
            </p>
          </div>
        </div>
      </section>

      {/* ─── OCASIÕES — fundo azul do voucher ─── */}
      <section
        style={{
          padding: "5rem 1.5rem",
          backgroundColor: azulVoucher,
          color: "#FAF7F0",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "0.8rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(250,247,240,0.65)",
              textAlign: "center",
              marginBottom: "0.8rem",
            }}
          >
            Momentos especiais
          </p>
          <h2
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              textAlign: "center",
              marginBottom: "0.8rem",
              lineHeight: 1.2,
              color: "#FAF7F0",
            }}
          >
            Para cada momento da vida
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "rgba(250,247,240,0.8)",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "520px",
              margin: "0 auto 3.5rem",
            }}
          >
            Um presente que vai muito além das flores. É uma forma de dizer
            que aquele momento merece durar para sempre.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {ocasioes.map((item, i) => (
              <article
                key={i}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "16px",
                  padding: "2rem 1.6rem",
                  transition: "background 0.2s, border-color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                }}
              >
                <div
                  style={{ fontSize: "2rem", marginBottom: "0.8rem" }}
                  aria-hidden="true"
                >
                  {item.emoji}
                </div>
                <h3
                  style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "1.1rem",
                    marginBottom: "0.6rem",
                    color: "#FAF7F0",
                  }}
                >
                  {item.titulo}
                </h3>
                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    color: "rgba(250,247,240,0.85)",
                  }}
                >
                  {item.descricao}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA — fundo azul claro ─── */}
      <section
        style={{
          padding: "6rem 1.5rem",
          backgroundColor: azulFundo,
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "0.8rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: azulVoucher,
              textAlign: "center",
              marginBottom: "0.8rem",
            }}
          >
            Como funciona
          </p>
          <h2
            style={{
              fontFamily: "'TAN-MEMORIES', serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              textAlign: "center",
              marginBottom: "3.5rem",
              lineHeight: 1.2,
              color: "#0F1E1A",
            }}
          >
            Simples e cheio de significado
          </h2>

          {[
            {
              n: "01",
              titulo: "Escolha o valor",
              texto:
                "O vale pode ter o valor que quiser, com um mínimo de 300€ (que corresponde à nossa moldura mais pequena). Pode personalizar o valor para se adaptar ao serviço que deseja oferecer.",
            },
            {
              n: "02",
              titulo: "Receba o cartão ilustrado",
              texto:
                "Enviamos o cartão por email de forma gratuita, ou fisicamente por 5€ mais portes. Se preferir levantar em Coimbra, a recolha é gratuita.",
            },
            {
              n: "03",
              titulo: "Ofereça com amor",
              texto:
                "O cartão tem campos para escrever de quem é e para quem é. Pode oferecer em mão ou enviar diretamente à pessoa presenteada.",
            },
            {
              n: "04",
              titulo: "A pessoa usa quando quiser",
              texto:
                "O vale não tem data de validade. A pessoa contacta-nos quando estiver pronta, pelo site ou pelo WhatsApp, e trata de tudo connosco.",
            },
          ].map((passo, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1.8rem",
                alignItems: "flex-start",
                marginBottom: "3rem",
                background: "#fff",
                borderRadius: "16px",
                padding: "1.8rem 1.6rem",
                boxShadow: "0 2px 16px rgba(123,143,199,0.12)",
              }}
            >
              <div
                style={{
                  fontFamily: "'TAN-MEMORIES', serif",
                  fontSize: "2.2rem",
                  color: azulVoucher,
                  lineHeight: 1,
                  minWidth: "52px",
                  opacity: 0.7,
                }}
                aria-hidden="true"
              >
                {passo.n}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'TAN-MEMORIES', serif",
                    fontSize: "1.1rem",
                    marginBottom: "0.5rem",
                    color: "#0F1E1A",
                  }}
                >
                  {passo.titulo}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#3D6B5E" }}>
                  {passo.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CITAÇÃO ─── */}
      <section
        style={{
          padding: "5rem 2rem",
          background: `linear-gradient(135deg, ${azulVoucher} 0%, #0F1E1A 100%)`,
          textAlign: "center",
          color: "#FAF7F0",
        }}
      >
        <blockquote
          style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
            lineHeight: 1.5,
            maxWidth: "680px",
            margin: "0 auto 1rem",
            fontStyle: "normal",
          }}
        >
          "... as flores são cor da lembrança."
        </blockquote>
        <cite
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            color: azulClaro,
            fontStyle: "normal",
          }}
        >
          Alberto Caeiro
        </cite>
      </section>

      {/* ─── CONDIÇÕES ─── */}
      <section
        style={{
          padding: "5rem 1.5rem",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Informações sobre o vale
        </h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {[
            "Valor mínimo de 300€, correspondente à nossa moldura mais pequena para preservação floral",
            "Sem data de validade — pode ser usado quando quiser",
            "Não é reembolsável",
            "Válido exclusivamente para os serviços da Flores à Beira-Rio",
            "Entrega digital gratuita por email",
            "Entrega física por 5€ mais portes de envio",
            "Recolha gratuita em Coimbra",
          ].map((cond, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "0.8rem",
                alignItems: "flex-start",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "#3D6B5E",
              }}
            >
              <span
                style={{ color: azulVoucher, marginTop: "2px", flexShrink: 0 }}
                aria-hidden="true"
              >
                ✦
              </span>
              {cond}
            </li>
          ))}
        </ul>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section
        style={{
          padding: "6rem 1.5rem",
          textAlign: "center",
          backgroundColor: azulFundo,
        }}
      >
        <h2
          style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
            lineHeight: 1.2,
            maxWidth: "640px",
            margin: "0 auto 1.4rem",
            color: "#0F1E1A",
          }}
        >
          Um dia especial merece uma recordação especial
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "#3D6B5E",
            maxWidth: "460px",
            margin: "0 auto 2.5rem",
          }}
        >
          Transforme um momento efémero numa obra de arte feita à mão, para
          durar uma vida inteira.
        </p>
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            backgroundColor: azulVoucher,
            color: "#FAF7F0",
            padding: "1.1rem 2.6rem",
            borderRadius: "60px",
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            letterSpacing: "0.08em",
            textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#5c70b0";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = azulVoucher;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Encomendar Vale Oferta
        </a>
        <p style={{ marginTop: "1.2rem", fontSize: "0.8rem", color: "#8BA888" }}>
          Tem dúvidas?{" "}
          <a
            href="https://wa.me/351934680300"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3D6B5E", textDecoration: "underline" }}
          >
            Fale connosco pelo WhatsApp
          </a>
        </p>
      </section>
    </main>
  );
}
