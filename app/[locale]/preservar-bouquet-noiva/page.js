// app/[locale]/preservar-bouquet-noiva/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import BouquetNoivaClient from "@/app/preservar-bouquet-noiva/BouquetNoivaClient";

function buildSchema(locale) {
  const isEN = locale === "en";
  const canonicalUrl = isEN
    ? `${SITE_URL}/en/preserve-wedding-bouquet`
    : `${SITE_URL}/preservar-bouquet-noiva`;

  const provider = {
    "@type": "LocalBusiness",
    name: "Flores à Beira-Rio",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressCountry: "PT" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "7",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const service = {
    "@type": "Service",
    name: isEN
      ? "Wedding Bouquet Preservation | Flores à Beira-Rio"
      : "Preservação de Bouquet de Noiva | Flores à Beira-Rio",
    description: isEN
      ? "Artisan preservation of wedding bouquets into botanical art frames with museum anti-UV glass. Handmade in Coimbra, Portugal. We receive bouquets at the weekend. Ships across Europe."
      : "Preservação artesanal de bouquets de noiva em quadros de arte botânica com vidro museu anti-UV. Feito à mão em Coimbra. Recebemos ao fim de semana. Enviamos para toda a Europa.",
    provider,
    areaServed: ["PT", "ES", "FR", "GB", "IE", "IT", "BE", "NL", "DE", "AT", "CH"],
    serviceType: isEN ? "Wedding Bouquet Preservation" : "Preservação de Bouquet de Noiva",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "300",
      highPrice: "500",
      offerCount: "3",
    },
    url: canonicalUrl,
  };

  const howTo = {
    "@type": "HowTo",
    name: isEN
      ? "How to preserve a wedding bouquet in a botanical frame"
      : "Como preservar o bouquet de noiva num quadro botânico",
    description: isEN
      ? "Step-by-step process to turn your wedding bouquet into a lasting botanical art frame."
      : "Processo artesanal de prensagem e emolduramento do bouquet de casamento.",
    step: isEN
      ? [
          { "@type": "HowToStep", position: 1, name: "Book before the wedding", text: "Book your slot as soon as you know the wedding date. Slots are limited, especially May to September." },
          { "@type": "HowToStep", position: 2, name: "Hand in the bouquet", text: "Hand in the bouquet within 1 to 3 days after the ceremony (up to 5 days). We receive bouquets at the weekend, including Sunday." },
          { "@type": "HowToStep", position: 3, name: "Approve the composition", text: "We send photographs of the composition by email. You have 72 hours to approve or request changes." },
          { "@type": "HowToStep", position: 4, name: "Receive the framed piece", text: "The framed artwork is shipped carefully packaged to anywhere in Europe." },
        ]
      : [
          { "@type": "HowToStep", position: 1, name: "Reservar antes do casamento", text: "Reserve a data assim que souber quando é o casamento. As vagas são limitadas, especialmente entre maio e setembro." },
          { "@type": "HowToStep", position: 2, name: "Entregar o bouquet nos dias seguintes", text: "Entregue o bouquet idealmente em 1 a 3 dias após a cerimónia (até 5 dias). Recebemos ao fim de semana, incluindo ao domingo." },
          { "@type": "HowToStep", position: 3, name: "Aprovação da composição", text: "Enviamos fotografias da composição por e-mail. Tem 72 horas para aprovar ou pedir alterações." },
          { "@type": "HowToStep", position: 4, name: "Receber o quadro em casa", text: "O quadro emoldurado é enviado cuidadosamente embalado para qualquer ponto da Europa." },
        ],
  };

  const faqPT = [
    { q: "Como posso entregar o bouquet?", a: "Pode entregar em mãos na nossa oficina em Coimbra, enviar por correio registado, ou solicitar recolha no local da cerimónia. Recebemos de segunda a domingo, incluindo fins de semana." },
    { q: "Recebem bouquets ao fim de semana, incluindo ao domingo?", a: "Sim. Sabemos que a maioria dos casamentos acontece ao sábado ou ao domingo, por isso estamos disponíveis ao fim de semana. Não tem de esperar pela segunda-feira para nos contactar ou para fazer a entrega." },
    { q: "Qual o prazo máximo para entregar o bouquet depois do casamento?", a: "Aceitamos bouquets até 5 dias após a cerimónia. O ideal é 1 a 3 dias, quanto mais fresco, mais opções de composição são possíveis." },
    { q: "Como devo conservar o bouquet até o entregar?", a: "Coloque-o num vaso com água fresca, longe do calor e da luz solar directa. Não o coloque no frigorífico. Corte ligeiramente os caules antes de os colocar em água." },
    { q: "O que posso incluir no quadro além das flores?", a: "Pode incluir o convite do casamento, votos manuscritos, fitas, uma fotografia ou qualquer elemento com significado especial." },
    { q: "Quanto tempo demora o processo?", a: "O processo completo demora entre 6 a 8 semanas: prensagem, composição, aprovação e emolduramento." },
    { q: "Qual o preço e como funciona o pagamento?", a: "Os preços começam nos 300€. Consulte a página de opções e preços para ver todos os formatos. O pagamento é feito em três prestações." },
    { q: "Enviam para fora de Portugal?", a: "Sim. Enviamos para toda a Europa: Espanha, França, Reino Unido, Irlanda, Itália, Bélgica, Países Baixos, Alemanha, Áustria e Suíça, entre outros. Enviamos também para os Estados Unidos, Canadá e China. O envio é feito com seguro e embalagem especializada." },
    { q: "Aceitam buquês de noivas estrangeiras a casar em Portugal?", a: "Sim. Recebemos buquês de noivas de qualquer nacionalidade que casem em Portugal, e enviamos o quadro emoldurado para o país onde residem. Trabalhamos regularmente com noivas brasileiras, espanholas, francesas, britânicas e irlandesas." },
  ];

  const faqEN = [
    { q: "How can I hand in the bouquet?", a: "You can hand it in at our studio in Coimbra, send it by registered post, or request collection from your venue. We are open Monday to Sunday, including weekends." },
    { q: "Do you receive bouquets at the weekend, including Sunday?", a: "Yes. We know most weddings take place on Saturdays or Sundays, so we are available at the weekend. You don't need to wait until Monday to contact us or hand in the bouquet." },
    { q: "What is the maximum time to hand in the bouquet after the wedding?", a: "We accept bouquets up to 5 days after the ceremony. Ideally within 1 to 3 days, the fresher the bouquet, the more options are available." },
    { q: "How should I keep the bouquet until I hand it in?", a: "Place it in a vase with fresh water, away from heat and direct sunlight. Do not refrigerate it. Trim the stems slightly before placing them in water." },
    { q: "What else can I include in the frame?", a: "You can include the wedding invitation, handwritten vows, ribbons, a photograph, or any meaningful element." },
    { q: "How long does the process take?", a: "The full process takes 6 to 8 weeks: pressing, composition, approval and framing." },
    { q: "What are the prices and how does payment work?", a: "Prices start from €300. See the options and pricing page for all available formats. Payment is made in three instalments." },
    { q: "Do you ship outside Portugal?", a: "Yes. We ship across Europe: Spain, France, United Kingdom, Ireland, Italy, Belgium, Netherlands, Germany, Austria and Switzerland, among others. We also ship to the United States, Canada and China. Shipping includes insurance and specialist packaging." },
    { q: "Do you accept bouquets from international brides marrying in Portugal?", a: "Yes. We receive bouquets from brides of any nationality marrying in Portugal and ship the framed artwork to the bride's home country. We regularly work with Brazilian, Spanish, French, British and Irish brides." },
  ];

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: (isEN ? faqEN : faqPT).map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [service, howTo, faqPage],
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bouquetNoiva.meta" });
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en"
    ? `${SITE_URL}/en/preserve-wedding-bouquet`
    : `${SITE_URL}/preservar-bouquet-noiva`;

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
    alternates: buildAlternates("/preservar-bouquet-noiva"),
  };
}

export default async function BouquetNoivaPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      <BouquetNoivaClient />
    </>
  );
}
