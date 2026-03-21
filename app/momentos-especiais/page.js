// app/momentos-especiais/page.js
import { SITE_URL } from "../_lib/constants";
import MomentosEspeciaisClient from "./MomentosEspeciaisClient";

export const metadata = {
  title: "Momentos Especiais | Flores à Beira-Rio",
  description:
    "Preservamos flores de casamentos, batizados, homenagens, aniversários e pedidos de casamento. Arte botânica artesanal em Coimbra para cada momento que merece ser eternizado.",
  keywords: [
    "preservar flores momentos especiais",
    "arte botânica Coimbra",
    "preservação flores casamento batizado homenagem",
    "quadro flores prensadas",
  ],
  alternates: { canonical: `${SITE_URL}/momentos-especiais` },
  openGraph: {
    title: "Momentos Especiais | Flores à Beira-Rio",
    description:
      "Preservamos flores de casamentos, batizados, homenagens, aniversários e pedidos de casamento.",
    url: `${SITE_URL}/momentos-especiais`,
    images: [{ url: "/og-homepage.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <MomentosEspeciaisClient />;
}
