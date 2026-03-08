// app/contactos/page.js
// Server Component — NÃO tem "use client"

import ContactosClient from "./ContactosClient";

export const metadata = {
  title: "Contactos e Equipa | Flores à Beira-Rio — Coimbra",
  description:
    "Fale connosco sobre a preservação das suas flores. Equipa da Flores à Beira-Rio disponível por WhatsApp e email. Atelier em Coimbra.",
  keywords: [
    "contactos Flores à Beira-Rio",
    "preservação flores Coimbra contacto",
    "equipa atelier botânico Coimbra",
    "WhatsApp preservação flores",
  ],
  openGraph: {
    title: "Contactos e Equipa | Flores à Beira-Rio",
    description:
      "Fale connosco sobre a preservação das suas flores. Estamos disponíveis por WhatsApp e email.",
    url: "https://floresabeirario.pt/contactos",
    siteName: "Flores à Beira-Rio",
    images: [
      {
        url: "https://floresabeirario.pt/fotoquadro1.webp",
        width: 1200,
        height: 630,
        alt: "Equipa da Flores à Beira-Rio — Atelier de preservação botânica em Coimbra",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactos e Equipa | Flores à Beira-Rio",
    description: "Fale connosco sobre a preservação das suas flores. WhatsApp e email disponíveis.",
    images: ["https://floresabeirario.pt/fotoquadro1.webp"],
  },
  alternates: {
    canonical: "https://floresabeirario.pt/contactos",
  },
};

export default function ContactosPage() {
  return <ContactosClient />;
}
