// app/layout.js
// Server Component — NÃO tem "use client"
import { Google_Sans } from "next/font/google";
import "./globals.css";
import NavClient from "./_components/Nav";
import FooterClient from "./_components/Footer";
import { SITE_URL } from "./_lib/constants";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flores à Beira-Rio | Preservação de Flores em Coimbra",
    template: "%s | Flores à Beira-Rio",
  },
  description:
    "Atelier de preservação botânica artesanal em Coimbra. Transformamos bouquets de casamento e flores de momentos especiais em quadros de arte que duram décadas.",
  keywords: [
    "preservação de flores",
    "bouquet de noiva",
    "quadros de flores prensadas",
    "Coimbra",
    "flores preservadas casamento",
  ],
  authors: [{ name: "Flores à Beira-Rio" }],
  creator: "Flores à Beira-Rio",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "Flores à Beira-Rio",
    title: "Flores à Beira-Rio | Preservação de Flores em Coimbra",
    description:
      "Transformamos o seu bouquet numa obra de arte botânica que dura décadas. Feito à mão em Coimbra.",
    images: [
      {
        url: "/fotoquadro1.webp",
        width: 1200,
        height: 630,
        alt: "Quadro de flores prensadas — Flores à Beira-Rio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flores à Beira-Rio | Preservação de Flores em Coimbra",
    description:
      "Transformamos o seu bouquet numa obra de arte botânica que dura décadas.",
    images: ["/fotoquadro1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-PT": SITE_URL,
      "en":    `${SITE_URL}/en`,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={googleSans.variable}>
      <body style={{ fontFamily: "var(--font-google-sans), sans-serif" }}>
        <NavClient />
        <main>{children}</main>
        <FooterClient />
      </body>
    </html>
  );
}
