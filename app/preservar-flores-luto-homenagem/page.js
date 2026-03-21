// app/preservar-flores-luto-homenagem/page.js
import { SITE_URL } from "../_lib/constants";
import LutoHomenagemClient from "./LutoHomenagemClient";

export const metadata = {
  title: "Preservar Flores de Homenagem e Luto | Flores à Beira-Rio",
  description:
    "Eternize as flores de uma cerimónia fúnebre como forma de homenagem duradoura. Arte botânica artesanal feita com respeito e sensibilidade em Coimbra.",
  keywords: [
    "preservar flores luto",
    "flores homenagem",
    "preservação flores funeral",
    "quadro flores prensadas",
    "Coimbra",
  ],
  alternates: { canonical: `${SITE_URL}/preservar-flores-luto-homenagem` },
  openGraph: {
    title: "Preservar Flores de Homenagem e Luto | Flores à Beira-Rio",
    description:
      "Eternize as flores de uma cerimónia fúnebre como forma de homenagem duradoura.",
    url: `${SITE_URL}/preservar-flores-luto-homenagem`,
    images: [{ url: "/og-homepage.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <LutoHomenagemClient />;
}
