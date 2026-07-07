// Opiniões reais do perfil da FBR no casamentos.pt, em texto próprio
// (o widget oficial deles não encaixa no design do site, e o casamentos.pt
// bloqueia leitura automática, por isso os excertos são mantidos à mão:
// quando chegar uma opinião nova, copiar o texto para aqui, PT e EN).
// As opiniões são escritas em português pelas clientes; na versão inglesa
// mostramos uma tradução (com nota) e mantemos o link para o original.
// Última actualização: 07/07/2026 (3 opiniões, 5,0 de 5).
"use client";
import { useLocale } from "next-intl";
import { SOCIAL_CASAMENTOS } from "@/app/_lib/constants";

const REVIEWS = [
  {
    name: "Carolina",
    date: "18/10/2025",
    title: "Profissionais no que fazem",
    titleEn: "Professionals at what they do",
    quote:
      "Adorei toda a experiência com eles. Para além do resultado final ser bom, o link de acompanhamento que deram fez toda a diferença, porque conseguia consultar facilmente em que fase estava a preservação das minhas flores. Muita organização. Recomendo.",
    quoteEn:
      "I loved the whole experience with them. Beyond the lovely end result, the tracking link they gave me made all the difference, as I could easily check which stage my flowers' preservation was at. So well organised. Highly recommend.",
  },
  {
    name: "Salomé",
    date: "10/04/2026",
    title: "A melhor prenda que recebi",
    titleEn: "The best gift I have received",
    quote:
      "Foi um dos presentes mais especiais que alguma vez recebi. Nunca imaginei que fosse possível guardar as flores em algo tão bonito e cheio de significado. O resultado superou completamente as minhas expectativas, o quadro ficou absolutamente perfeito.",
    quoteEn:
      "It was one of the most special gifts I have ever received. I never imagined it was possible to keep flowers in something so beautiful and full of meaning. The result completely exceeded my expectations, the frame turned out absolutely perfect.",
  },
  {
    name: "Sara",
    date: "05/06/2026",
    title: "Melhor decisão que tomámos",
    titleEn: "The best decision we made",
    quote:
      "Fazer a preservação do meu bouquet de casamento com a Flores à Beira-Rio foi uma das melhores decisões que tomei para o casamento. Desde o primeiro contacto senti muito cuidado e profissionalismo.",
    quoteEn:
      "Preserving my wedding bouquet with Flores à Beira-Rio was one of the best decisions I made for my wedding. From the very first contact I felt real care and professionalism.",
  },
];

export default function CasamentosReviews() {
  const locale = useLocale();
  const isEN = locale === "en";

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
              {isEN ? r.titleEn : r.title}
            </p>
            <blockquote style={{ margin: 0, fontSize: "0.86rem", lineHeight: 1.7, color: "rgba(30,45,40,0.85)" }}>
              “{isEN ? r.quoteEn : r.quote}”
            </blockquote>
            <figcaption style={{ marginTop: "10px", fontSize: "0.76rem", color: "rgba(30,45,40,0.55)" }}>
              {r.name} · {r.date} · casamentos.pt
            </figcaption>
          </figure>
        ))}
      </div>
      {isEN && (
        <p style={{ marginTop: "12px", fontSize: "0.74rem", textAlign: "center", fontStyle: "italic", color: "rgba(30,45,40,0.5)" }}>
          Reviews originally written in Portuguese on casamentos.pt, translated into English.
        </p>
      )}
      <p style={{ marginTop: isEN ? "8px" : "14px", fontSize: "0.82rem", textAlign: "center" }}>
        <a
          href={`${SOCIAL_CASAMENTOS}/opinioes`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", opacity: 0.8 }}
        >
          casamentos.pt ★★★★★ {isEN ? "5.0" : "5,0"} →
        </a>
      </p>
    </div>
  );
}
