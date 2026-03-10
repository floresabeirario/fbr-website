// app/emoldurar-flores-secas/page.js
// Server Component — NÃO tem "use client"

import EmoldurarFloresSecasClient from "./EmoldurarFloresSecasClient";

export const metadata = {
  title: "Emoldurar Ramo Seco ou Bouquet de Noiva Seco | Flores à Beira-Rio",
  description:
    "Transforme o seu ramo seco num quadro único. Emolduramos bouquets de noiva e flores secas com vidro museu anti-UV. Atelier em Coimbra. Recebemos ramos de toda a Europa.",
  keywords: [
    "emoldurar ramo seco",
    "bouquet de noiva seco",
    "flores secas quadro",
    "preservação flores",
    "quadro flores secas Coimbra",
    "emoldurar bouquet casamento",
  ],
  openGraph: {
    title: "Emoldurar Ramo Seco ou Bouquet de Noiva Seco | Flores à Beira-Rio",
    description:
      "Transforme o seu ramo seco num quadro único. Vidro museu anti-UV. Atelier em Coimbra.",
    url: "https://floresabeirario.pt/emoldurar-flores-secas",
    siteName: "Flores à Beira-Rio",
    locale: "pt_PT",
    type: "website",
  },
  alternates: {
    canonical: "https://floresabeirario.pt/emoldurar-flores-secas",
  },
};

export default function EmoldurarFloresSecasPage() {
  return <EmoldurarFloresSecasClient />;
}
