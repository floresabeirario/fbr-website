// app/termos-e-condicoes/page.js
import { SITE_URL } from "../_lib/constants";
import { buildOpenGraph } from "../_lib/metadata";
import TermosCondicoesClient from "./TermosCondicoesClient";

export const metadata = {
  title: "Termos e Condições",
  description:
    "Termos e Condições dos serviços de preservação de flores da Flores à Beira-Rio. Pagamentos, prazos, entregas, cancelamentos e cuidados com a peça.",
  openGraph: buildOpenGraph({
    title: "Termos e Condições | Flores à Beira-Rio",
    description: "Termos e Condições dos serviços de preservação de flores da Flores à Beira-Rio.",
    url: `${SITE_URL}/termos-e-condicoes`,
  }),
  alternates: {
    canonical: `${SITE_URL}/termos-e-condicoes`,
    languages: { "pt-PT": `${SITE_URL}/termos-e-condicoes` },
  },
};

export default function Page() {
  return <TermosCondicoesClient />;
}
