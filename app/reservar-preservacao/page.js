// app/reservar-preservacao/page.js
// Server Component — NÃO tem "use client"

import ReservarPreservacaoClient from "./ReservarPreservacaoClient";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";

export const metadata = {
  title: "Reservar Preservação de Flores | Flores à Beira-Rio",
  description:
    "Reserve o seu serviço de preservação de flores. Preencha o formulário para garantir a sua vaga e receba o orçamento nos próximos 3 dias úteis.",
  openGraph: buildOpenGraph({
    title: "Reservar Preservação de Flores | Flores à Beira-Rio",
    description:
      "Reserve a preservação das suas flores de casamento, batizado ou evento especial. Feito à mão em Coimbra, com carinho e dedicação.",
    url: "https://floresabeirario.pt/reservar-preservacao",
    imagePath: "https://floresabeirario.pt/og-homepage.jpg",
    imageAlt: "Reserva de preservação de flores da Flores à Beira-Rio",
  }),
  twitter: buildTwitterCard({
    title: "Reservar Preservação de Flores | Flores à Beira-Rio",
    description:
      "Reserve a preservação das suas flores e guarde a memória do seu dia especial para sempre.",
    imagePath: "https://floresabeirario.pt/og-homepage.jpg",
  }),
  alternates: {
    canonical: "https://floresabeirario.pt/reservar-preservacao",
  },
};

export default function ReservarPreservacaoPage() {
  return <ReservarPreservacaoClient />;
}
