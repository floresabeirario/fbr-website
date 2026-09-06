// app/[locale]/momentos-especiais/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL } from "@/app/_lib/constants";
import MomentosEspeciaisClient from "@/app/momentos-especiais/MomentosEspeciaisClient";
import { getPrecos } from "@/app/_lib/precos";

function buildSchema(locale) {
  const isEN = locale === "en";
  const base = isEN ? `${SITE_URL}/en` : SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isEN ? "Flower Preservation Services by Occasion" : "Serviços de Preservação de Flores por Ocasião",
    description: isEN
      ? "Artisan botanical art frames for every special moment: weddings, baptisms, memorials, anniversaries and proposals."
      : "Quadros de arte botânica artesanal para cada momento especial: casamentos, batizados, homenagens, aniversários e pedidos de casamento.",
    url: isEN ? `${SITE_URL}/en/special-moments` : `${SITE_URL}/momentos-especiais`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEN ? "Wedding Bouquet Preservation" : "Bouquet de Noiva",     url: `${base}/${isEN ? "preserve-wedding-bouquet" : "preservar-bouquet-noiva"}` },
      { "@type": "ListItem", position: 2, name: isEN ? "Memorial Flower Preservation" : "Homenagem e Luto",    url: `${base}/${isEN ? "preserve-memorial-flowers" : "preservar-flores-luto-homenagem"}` },
      { "@type": "ListItem", position: 3, name: isEN ? "Baptism Flower Preservation"  : "Batizado e Nascimento", url: `${base}/${isEN ? "preserve-baptism-flowers" : "preservar-flores-batizado-nascimento"}` },
      { "@type": "ListItem", position: 4, name: isEN ? "Anniversary Flower Preservation" : "Aniversário",      url: `${base}/${isEN ? "preserve-anniversary-flowers" : "preservar-flores-aniversario"}` },
      { "@type": "ListItem", position: 5, name: isEN ? "Proposal Flower Preservation" : "Pedido de Casamento", url: `${base}/${isEN ? "preserve-proposal-flowers" : "preservar-flores-pedido-casamento"}` },
    ],
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "momentos.meta" });
  const precosMeta = await getPrecos();
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en" ? `${SITE_URL}/en/special-moments` : `${SITE_URL}/momentos-especiais`;

  return {
    title: t("title"),
    description: t("description", { quadro30x40: precosMeta.quadro30x40 }),
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
    alternates: buildAlternates("/momentos-especiais", locale),
  };
}

export default async function MomentosEspeciaisPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <MomentosEspeciaisClient />
    </>
  );
}
