// app/[locale]/layout.js
// Locale-aware layout — html lang, providers, Nav, Footer
import { Google_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/app/_lib/constants";
import NavClient from "@/components/Nav";
import FooterClient from "@/components/Footer";
import MotionProvider from "@/app/MotionProvider";
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
      url: SITE_URL,
      siteName: "Flores à Beira-Rio",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} className={googleSans.variable}>
      <body style={{ fontFamily: "var(--font-google-sans), sans-serif" }}>
        <NextIntlClientProvider>
          <MotionProvider>
            <NavClient />
            <main>{children}</main>
            <FooterClient />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
