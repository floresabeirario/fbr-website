// Opiniões reais do perfil da FBR no casamentos.pt, em texto próprio
// (o widget oficial deles não encaixa no design do site, e o casamentos.pt
// bloqueia leitura automática, por isso os excertos são mantidos à mão:
// quando chegar uma opinião nova, copiar o texto para aqui).
// Última actualização: 06/07/2026 (3 opiniões, 5,0 de 5).
import { SOCIAL_CASAMENTOS } from "@/app/_lib/constants";

const REVIEWS = [
  {
    name: "Carolina",
    date: "18/10/2025",
    title: "Profissionais no que fazem",
    quote:
      "Adorei toda a experiência com eles. Para além do resultado final ser bom, o link de acompanhamento que deram fez toda a diferença, porque conseguia consultar facilmente em que fase estava a preservação das minhas flores. Muita organização. Recomendo.",
  },
  {
    name: "Salomé",
    date: "10/04/2026",
    title: "A melhor prenda que recebi",
    quote:
      "Foi um dos presentes mais especiais que alguma vez recebi. Nunca imaginei que fosse possível guardar as flores em algo tão bonito e cheio de significado. O resultado superou completamente as minhas expectativas, o quadro ficou absolutamente perfeito.",
  },
  {
    name: "Sara",
    date: "05/06/2026",
    title: "Melhor decisão que tomámos",
    quote:
      "Fazer a preservação do meu bouquet de casamento com a Flores à Beira-Rio foi uma das melhores decisões que tomei para o casamento. Desde o primeiro contacto senti muito cuidado e profissionalismo.",
  },
];

export default function CasamentosReviews() {
  return (
    <div style={{ marginTop: "18px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "14px",
          textAlign: "left",
        }}
      >
        {REVIEWS.map((r) => (
          <figure
            key={r.name}
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(15,30,26,0.08)",
              borderRadius: "14px",
              padding: "18px 20px",
              margin: 0,
              boxShadow: "0 2px 10px rgba(15,30,26,0.05)",
            }}
          >
            <div aria-hidden="true" style={{ color: "#C9A24B", fontSize: "0.82rem", letterSpacing: "2px" }}>
              ★★★★★
            </div>
            <p style={{ fontWeight: 700, margin: "8px 0 6px", fontSize: "0.93rem", color: "var(--green-d, #1E3D38)", fontFamily: "var(--font-google-sans), 'Google Sans', sans-serif" }}>
              {r.title}
            </p>
            <blockquote style={{ margin: 0, fontSize: "0.86rem", lineHeight: 1.7, color: "rgba(30,45,40,0.85)" }}>
              “{r.quote}”
            </blockquote>
            <figcaption style={{ marginTop: "10px", fontSize: "0.76rem", color: "rgba(30,45,40,0.55)" }}>
              {r.name} · {r.date} · casamentos.pt
            </figcaption>
          </figure>
        ))}
      </div>
      <p style={{ marginTop: "14px", fontSize: "0.82rem", textAlign: "center" }}>
        <a
          href={`${SOCIAL_CASAMENTOS}/opinioes`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", opacity: 0.8 }}
        >
          casamentos.pt ★★★★★ 5,0 →
        </a>
      </p>
    </div>
  );
}
