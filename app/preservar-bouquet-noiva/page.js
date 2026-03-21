// app/preservar-bouquet-noiva/page.js
import { SITE_URL } from "../_lib/constants";
import BouquetNoivaClient from "./BouquetNoivaClient";

export const metadata = {
  title: "Preservar Bouquet de Noiva | Flores à Beira-Rio",
  description:
    "Transformamos o bouquet do seu casamento numa obra de arte botânica que dura décadas. Prensagem artesanal, vidro museu anti-UV e emolduramento feito à mão em Coimbra.",
  keywords: [
    "preservar bouquet de noiva",
    "preservação bouquet casamento",
    "quadro flores prensadas casamento",
    "Coimbra",
  ],
  alternates: { canonical: `${SITE_URL}/preservar-bouquet-noiva` },
  openGraph: {
    title: "Preservar Bouquet de Noiva | Flores à Beira-Rio",
    description:
      "Transformamos o bouquet do seu casamento numa obra de arte botânica que dura décadas.",
    url: `${SITE_URL}/preservar-bouquet-noiva`,
    images: [{ url: "/og-homepage.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <BouquetNoivaClient />;
}
