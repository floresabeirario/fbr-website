// app/vale-presente/page.js
// Server Component — NÃO tem "use client"

import ValeApresenteClient from "./ValeApresenteClient";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";

export const metadata = {
  title: "Reservar Vale Presente | Flores à Beira-Rio",
  description:
    "Ofereça uma memória que dura para sempre. Preencha o formulário para reservar um vale presente de preservação de flores, a partir de 300€, sem data de validade.",
  openGraph: buildOpenGraph({
    title: "Reservar Vale Presente | Flores à Beira-Rio",
    description:
      "Ofereça um vale presente de preservação de flores. A partir de 300€, sem data de validade. Feito à mão em Coimbra.",
    url: "https://floresabeirario.pt/vale-presente",
    imagePath: "https://floresabeirario.pt/og-homepage.jpg",
    imageAlt: "Vale presente de preservação de flores da Flores à Beira-Rio",
  }),
  twitter: buildTwitterCard({
    title: "Reservar Vale Presente | Flores à Beira-Rio",
    description:
      "Ofereça uma memória que dura para sempre. Vale presente de preservação de flores, feito à mão.",
    imagePath: "https://floresabeirario.pt/og-homepage.jpg",
  }),
  alternates: {
    canonical: "https://floresabeirario.pt/vale-presente",
  },
};

export default function ValeApresentePage() {
  return <ValeApresenteClient />;
}
