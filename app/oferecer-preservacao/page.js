// app/oferecer-preservacao/page.js
// Server Component — NÃO tem "use client"

import OfereceClient from "./OfereceClient";
import { buildOpenGraph, buildTwitterCard } from "../_lib/metadata";

export const metadata = {
  title: "Vale Oferta de Preservação de Flores | Flores à Beira-Rio — Presente Único para Casamento, Batizado e Mais",
  description:
    "Ofereça uma memória que dura para sempre. O vale oferta da Flores à Beira-Rio é o presente perfeito para casamento, batizado, aniversário ou homenagem. As flores são preservadas e emolduradas à mão, em Coimbra. A partir de 300€, sem data de validade.",
  keywords: [
    "vale oferta preservação flores",
    "presente casamento original Portugal",
    "presente batizado especial",
    "preservação flores casamento",
    "flores emolduradas presente",
    "vale presente flores Coimbra",
    "presente único casamento",
    "preservação bouquet casamento",
    "arte floral presente",
    "quadro flores presente casamento",
  ],
  openGraph: buildOpenGraph({
    title: "Vale Oferta de Preservação de Flores | Flores à Beira-Rio",
    description: "Transforme um momento efémero numa obra de arte feita à mão. O vale oferta perfeito para casamento, batizado, aniversário e muito mais.",
    url: "https://floresabeirario.pt/oferecer-preservacao",
    imagePath: "https://floresabeirario.pt/images/vale1.webp",
    imageAlt: "Vale oferta de preservação de flores da Flores à Beira-Rio",
  }),
  twitter: buildTwitterCard({
    title: "Vale Oferta de Preservação de Flores | Flores à Beira-Rio",
    description: "O presente perfeito para casamento, batizado ou homenagem. Flores preservadas e emolduradas à mão.",
    imagePath: "https://floresabeirario.pt/images/vale1.webp",
  }),
  alternates: {
    canonical: "https://floresabeirario.pt/oferecer-preservacao",
  },
};

export default function OferecePreservacaoPage() {
  return <OfereceClient />;
}
