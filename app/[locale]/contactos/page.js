// app/[locale]/contactos/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL, WA_URL, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK } from "@/app/_lib/constants";
import ContactosClient from "@/app/contactos/ContactosClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Flores à Beira-Rio",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbra",
      addressCountry: "PT",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        availableLanguage: ["Portuguese", "English"],
        areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: WA_URL,
        availableLanguage: ["Portuguese", "English"],
        contactOption: "TollFree",
      },
    ],
    sameAs: [SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK],
    description: isEN
      ? "Contact Flores à Beira-Rio for flower preservation inquiries. We preserve wedding bouquets, memorial flowers, and other special blooms across Europe."
      : "Contacte a Flores à Beira-Rio para preservação de flores. Preservamos bouquets de noiva, flores de homenagem e outras flores especiais em toda a Europa.",
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactos.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/contact` : `${SITE_URL}/contactos`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalPath,
      imagePath: `${SITE_URL}/og-homepage.jpg`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription"),
      imagePath: `${SITE_URL}/og-homepage.jpg`,
    }),
    alternates: buildAlternates("/contactos"),
  };
}

export default async function ContactosPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <ContactosClient />
    </>
  );
}
