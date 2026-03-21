// app/politica-de-privacidade/page.js
import { SITE_URL } from "../_lib/constants";
import { buildOpenGraph } from "../_lib/metadata";
import PoliticaPrivacidadeClient from "./PoliticaPrivacidadeClient";

export const metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Flores à Beira-Rio. Como recolhemos, usamos e protegemos os seus dados pessoais, em conformidade com o RGPD.",
  openGraph: buildOpenGraph({
    title: "Política de Privacidade | Flores à Beira-Rio",
    description: "Como recolhemos, usamos e protegemos os seus dados pessoais.",
    url: `${SITE_URL}/politica-de-privacidade`,
  }),
  alternates: {
    canonical: `${SITE_URL}/politica-de-privacidade`,
    languages: { "pt-PT": `${SITE_URL}/politica-de-privacidade` },
  },
};

export default function Page() {
  return <PoliticaPrivacidadeClient />;
}
