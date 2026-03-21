// app/preservar-flores-aniversario/page.js
import { SITE_URL } from "../_lib/constants";
import AniversarioClient from "./AniversarioClient";

export const metadata = {
  title: "Preservar Flores de Aniversário | Flores à Beira-Rio",
  description:
    "Guarde para sempre as flores de um aniversário especial. Uma memória transformada em arte botânica, emoldurada com vidro museu anti-UV feita em Coimbra.",
  keywords: [
    "preservar flores aniversário",
    "quadro flores prensadas aniversário",
    "arte botânica",
    "Coimbra",
  ],
  alternates: { canonical: `${SITE_URL}/preservar-flores-aniversario` },
  openGraph: {
    title: "Preservar Flores de Aniversário | Flores à Beira-Rio",
    description:
      "Guarde para sempre as flores de um aniversário especial. Uma memória transformada em arte botânica.",
    url: `${SITE_URL}/preservar-flores-aniversario`,
    images: [{ url: "/og-homepage.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <AniversarioClient />;
}
