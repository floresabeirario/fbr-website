// app/[locale]/layout.js
// Locale-aware layout — html lang, providers, Nav, Footer
import { Google_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getPrecos } from "@/app/_lib/precos";
import { PrecosProvider } from "@/app/_components/PrecosProvider";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/app/_lib/constants";
import NavClient from "@/components/Nav";
import FooterClient from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import MotionProvider from "@/app/MotionProvider";
import { AltLocaleHrefProvider } from "@/app/_components/AltLocaleHref";
import Analytics from "@/app/_components/Analytics";
import TrackClicks from "@/app/_components/TrackClicks";
import "@/app/globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-google-sans",
  display: "swap",
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | Flores à Beira-Rio`,
    },
    description: t("description"),
    authors: [{ name: "Flores à Beira-Rio" }],
    creator: "Flores à Beira-Rio",
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_GB" : "pt_PT",
      alternateLocale: locale === "en" ? "pt_PT" : "en_GB",
      url: SITE_URL,
      siteName: "Flores à Beira-Rio",
    },
    robots: {
      index: true,
      follow: true,
      // max-image-preview:large — sem isto o Google mostra as fotos dos quadros
      // em miniatura reduzida no separador Imagens; queremos preview grande.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon/favicon.ico" },
        { url: "/favicon/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/favicon/apple-touch-icon.png",
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Preços da tabela de Finanças, lidos uma vez por pedido e postos à
  // disposição de toda a árvore (ver PrecosProvider). Evita passá-los à
  // mão por cada página só para uma frase dizer "a partir de 300€".
  const precos = await getPrecos();

  return (
    <html lang={locale} className={googleSans.variable}>
      <body style={{ fontFamily: "var(--font-google-sans), sans-serif" }}>
        {/* Preload da fonte dos títulos (declarada via @font-face em globals.css,
            que o browser só descobriria depois de processar o CSS). O React
            eleva este <link> para o <head>. crossOrigin é obrigatório em
            preloads de fontes, mesmo sendo o mesmo domínio. */}
        <link
          rel="preload"
          href="/fonts/TAN-MEMORIES.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <NextIntlClientProvider>
          <PrecosProvider precos={precos}>
          <AltLocaleHrefProvider>
            <MotionProvider>
              <NavClient />
              <main>{children}</main>
              <FooterClient />
              <CookieConsent />
              <Analytics />
              <TrackClicks />
            </MotionProvider>
          </AltLocaleHrefProvider>
          </PrecosProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
