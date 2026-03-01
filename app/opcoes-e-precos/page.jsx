// Server Component — exporta metadata SEO + renderiza componente client
import OpcoesClient from "./client";

export const metadata = {
  title: "Opções e Preços | Flores à Beira-Rio",
  description:
    "Descubra os tipos de fundo, tamanhos e preços dos quadros de flores preservadas da Flores à Beira-Rio. Feitos à mão em Coimbra, com materiais de conservação museu.",
};

export default function OpcoesEPrecos() {
  return <OpcoesClient />;
}
