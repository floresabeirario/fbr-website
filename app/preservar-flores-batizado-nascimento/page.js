// app/preservar-flores-batizado-nascimento/page.js
import { SITE_URL } from "../_lib/constants";
import BatizadoNascimentoClient from "./BatizadoNascimentoClient";

export const metadata = {
  title: "Preservar Flores de Batizado e Nascimento | Flores à Beira-Rio",
  description:
    "As flores do batizado ou do nascimento merecem ser guardadas para sempre. Arte botânica artesanal feita em Coimbra que acompanha o seu filho ao longo da vida.",
  keywords: [
    "preservar flores batizado",
    "flores nascimento",
    "quadro flores prensadas batizado",
    "Coimbra",
  ],
  alternates: { canonical: `${SITE_URL}/preservar-flores-batizado-nascimento` },
  openGraph: {
    title: "Preservar Flores de Batizado e Nascimento | Flores à Beira-Rio",
    description:
      "As flores do batizado ou do nascimento merecem ser guardadas para sempre.",
    url: `${SITE_URL}/preservar-flores-batizado-nascimento`,
    images: [{ url: "/og-homepage.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <BatizadoNascimentoClient />;
}
