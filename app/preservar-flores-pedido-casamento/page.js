// app/preservar-flores-pedido-casamento/page.js
import { SITE_URL } from "../_lib/constants";
import PedidoCasamentoClient from "./PedidoCasamentoClient";

export const metadata = {
  title: "Preservar Flores do Pedido de Casamento | Flores à Beira-Rio",
  description:
    "As flores do pedido de casamento marcam o início de uma história. Preserve esse momento numa obra de arte botânica feita à mão em Coimbra.",
  keywords: [
    "preservar flores pedido casamento",
    "quadro flores prensadas noivado",
    "arte botânica casamento",
    "Coimbra",
  ],
  alternates: { canonical: `${SITE_URL}/preservar-flores-pedido-casamento` },
  openGraph: {
    title: "Preservar Flores do Pedido de Casamento | Flores à Beira-Rio",
    description:
      "As flores do pedido de casamento marcam o início de uma história. Preserve esse momento em arte botânica.",
    url: `${SITE_URL}/preservar-flores-pedido-casamento`,
    images: [{ url: "/og-homepage.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <PedidoCasamentoClient />;
}
