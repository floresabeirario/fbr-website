// app/[locale]/preservar-bouquet-noiva/page.js
import { getTranslations } from "next-intl/server";
import { buildOpenGraph, buildTwitterCard, buildAlternates, buildBreadcrumbJsonLd } from "@/app/_lib/metadata";
import { SITE_URL, PHONE, EMAIL } from "@/app/_lib/constants";
import BouquetNoivaClient from "@/app/preservar-bouquet-noiva/BouquetNoivaClient";
import { getPrecos } from "@/app/_lib/precos";

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
      ? "Artisan preservation of wedding bouquets into botanical art frames with museum anti-UV glass. Handmade in Coimbra, Portugal. We receive bouquets at the weekend. Ships worldwide."
      : "Preservação artesanal de bouquets de noiva em quadros de arte botânica com vidro museu anti-UV. Feito à mão em Coimbra. Recebemos ao fim de semana. Enviamos para todo o mundo.",
    provider,
    areaServed: "Worldwide",
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
          { "@type": "HowToStep", position: 2, name: "Hand in the bouquet", text: "Hand in the bouquet within 1 to 3 days after the ceremony (up to 6 days). We receive bouquets at the weekend, including Sunday." },
          { "@type": "HowToStep", position: 3, name: "Approve the composition", text: "We send photographs of the composition by email. You have 72 hours to approve or request changes." },
          { "@type": "HowToStep", position: 4, name: "Receive the framed piece", text: "The framed artwork is shipped carefully packaged to anywhere in Europe." },
        ]
      : [
          { "@type": "HowToStep", position: 1, name: "Reservar antes do casamento", text: "Reserve a data assim que souber quando é o casamento. As vagas são limitadas, especialmente entre maio e setembro." },
          { "@type": "HowToStep", position: 2, name: "Entregar o bouquet nos dias seguintes", text: "Entregue o bouquet idealmente em 1 a 3 dias após a cerimónia (até 6 dias). Recebemos ao fim de semana, incluindo ao domingo." },
          { "@type": "HowToStep", position: 3, name: "Aprovação da composição", text: "Enviamos fotografias da composição por e-mail. Tem 72 horas para aprovar ou pedir alterações." },
          { "@type": "HowToStep", position: 4, name: "Receber o quadro em casa", text: "O quadro emoldurado é enviado cuidadosamente embalado para qualquer ponto do mundo." },
        ],
  };

  const faqPT = [
    { q: "O que significa eternizar o bouquet de noiva?", a: "Eternizar (ou preservar) o bouquet de noiva é transformar as flores frescas do casamento numa peça que dura décadas. No nosso atelier fazemo-lo por prensagem botânica: cada flor é prensada e recomposta pétala a pétala, e a composição final é emoldurada com vidro museu anti-UV. O quadro guarda as flores verdadeiras do seu ramo, não uma réplica." },
    { q: "Preservar, eternizar ou conservar o buquê de noiva: é tudo o mesmo?", a: "Sim. Preservar, eternizar e conservar o buquê (ou bouquet) de noiva referem-se todos à mesma ideia: guardar para sempre as flores verdadeiras do seu casamento. Seja um buquê de noiva, um ramo de noiva ou o buquê de casamento, o processo é o mesmo: prensagem botânica pétala a pétala e emolduramento com vidro museu anti-UV. A única coisa que muda é a palavra que cada pessoa usa." },
    { q: "Como posso entregar o bouquet?", a: "Pode entregar em mãos na nossa oficina em Coimbra, enviar por correio registado, ou solicitar recolha no local da cerimónia. Recebemos de segunda a domingo, incluindo fins de semana." },
    { q: "Recebem bouquets de fora de Coimbra? Estou no Porto / Lisboa / Algarve.", a: "Sim. Recebemos bouquets de todo o Portugal continental e ilhas, e a maioria dos nossos clientes está fora de Coimbra. A forma mais confortável é a recolha no local do casamento pela nossa equipa: combinamos data e hora consigo e tratamos do transporte até ao atelier. Em alternativa, pode enviar por correio expresso (CTT, MRW, DHL) com seguro. Trabalhamos regularmente com noivas de Lisboa, Porto, Braga, Algarve e Madeira." },
    { q: "Recebem bouquets ao fim de semana, incluindo ao domingo?", a: "Sim. Sabemos que a maioria dos casamentos acontece ao sábado ou ao domingo, por isso estamos disponíveis ao fim de semana. Não tem de esperar pela segunda-feira para nos contactar ou para fazer a entrega." },
    { q: "Qual o prazo máximo para entregar o bouquet depois do casamento?", a: "Aceitamos bouquets até 6 dias após a cerimónia. O ideal é 1 a 3 dias, quanto mais fresco, mais opções de composição são possíveis." },
    { q: "Como devo conservar o bouquet até o entregar?", a: "Coloque-o num vaso com água fresca, longe do calor e da luz solar directa. Não o coloque no frigorífico. Corte ligeiramente os caules antes de os colocar em água." },
    { q: "O que posso incluir no quadro além das flores?", a: "Pode incluir o convite do casamento, votos manuscritos, fitas, uma fotografia ou qualquer elemento com significado especial." },
    { q: "Quanto tempo demora o processo?", a: "O nosso tempo médio é de cerca de 6 meses desde a recepção das flores até ao quadro emoldurado. A prensagem é um processo delicado que não pode ser apressado, e nunca sacrificamos a qualidade em favor da rapidez." },
    { q: "Qual o preço e como funciona o pagamento?", a: "Os preços começam nos 300€. Consulte a página de opções e preços para ver todos os formatos. O pagamento é feito em três prestações." },
    { q: "Enviam para fora de Portugal?", a: "Sim. Enviamos para todo o mundo: Espanha, França, Reino Unido, Irlanda, Itália, Bélgica, Países Baixos, Alemanha, Áustria e Suíça, entre muitos outros, e também para os Estados Unidos, Canadá e China. O envio é feito com seguro e embalagem especializada." },
    { q: "Aceitam buquês de noivas estrangeiras a casar em Portugal?", a: "Sim. Recebemos buquês de noivas de qualquer nacionalidade que casem em Portugal, e enviamos o quadro emoldurado para o país onde residem. Trabalhamos regularmente com noivas brasileiras, espanholas, francesas, britânicas e irlandesas." },
  ];

  const faqEN = [
    { q: "What does preserving a wedding bouquet actually mean?", a: "Preserving a wedding bouquet means turning the fresh flowers from your wedding into a piece that lasts for decades. At our studio we do it through botanical pressing: each flower is pressed and recomposed petal by petal, and the final composition is framed with anti-UV museum glass. The frame holds the real flowers from your bouquet, not a replica." },
    { q: "How can I hand in the bouquet?", a: "You can hand it in at our studio in Coimbra, send it by registered post, or request collection from your venue. We are open Monday to Sunday, including weekends." },
    { q: "Do you receive bouquets from outside Coimbra? I'm in Porto / Lisbon / the Algarve.", a: "Yes. We receive bouquets from across mainland Portugal and the islands, and most of our clients are based outside Coimbra. The most convenient option is collection at your wedding venue by our team: we arrange the date and time with you and handle transport back to the studio. Alternatively, you can send the bouquet by express courier (CTT, MRW, DHL) with insurance. We regularly work with brides from Lisbon, Porto, Braga, the Algarve and Madeira." },
    { q: "Do you receive bouquets at the weekend, including Sunday?", a: "Yes. We know most weddings take place on Saturdays or Sundays, so we are available at the weekend. You don't need to wait until Monday to contact us or hand in the bouquet." },
    { q: "What is the maximum time to hand in the bouquet after the wedding?", a: "We accept bouquets up to 6 days after the ceremony. Ideally within 1 to 3 days, the fresher the bouquet, the more options are available." },
    { q: "How should I keep the bouquet until I hand it in?", a: "Place it in a vase with fresh water, away from heat and direct sunlight. Do not refrigerate it. Trim the stems slightly before placing them in water." },
    { q: "What else can I include in the frame?", a: "You can include the wedding invitation, handwritten vows, ribbons, a photograph, or any meaningful element." },
    { q: "How long does the process take?", a: "Our average turnaround is around 6 months from when we receive the flowers to the finished framed piece. Pressing is a delicate process that cannot be rushed, and we never sacrifice quality for speed." },
    { q: "What are the prices and how does payment work?", a: "Prices start from €300. See the options and pricing page for all available formats. Payment is made in three instalments." },
    { q: "Do you ship outside Portugal?", a: "Yes. We ship worldwide: Spain, France, United Kingdom, Ireland, Italy, Belgium, Netherlands, Germany, Austria and Switzerland among many others, and also the United States, Canada and China. Shipping includes insurance and specialist packaging." },
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

  // Trilho Início > Momentos Especiais > página (sem @context: já vem do @graph)
  const { "@context": _bcCtx, ...breadcrumb } = buildBreadcrumbJsonLd(isEN
    ? [ { name: "Home", path: "/en" }, { name: "Special Moments", path: "/en/special-moments" }, { name: "Wedding Bouquet", path: "/en/preserve-wedding-bouquet" } ]
    : [ { name: "Início", path: "/" }, { name: "Momentos Especiais", path: "/momentos-especiais" }, { name: "Bouquet de Noiva", path: "/preservar-bouquet-noiva" } ]);

  return {
    "@context": "https://schema.org",
    "@graph": [service, howTo, faqPage, breadcrumb],
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bouquetNoiva.meta" });
  const precosMeta = await getPrecos();
  const ogLocale = locale === "en" ? "en_GB" : "pt_PT";
  const canonicalPath = locale === "en"
    ? `${SITE_URL}/en/preserve-wedding-bouquet`
    : `${SITE_URL}/preservar-bouquet-noiva`;

  return {
    title: t("title"),
    description: t("description", { quadro30x40: precosMeta.quadro30x40 }),
    openGraph: buildOpenGraph({
      title: t("ogTitle"),
      description: t("ogDescription", { quadro30x40: precosMeta.quadro30x40 }),
      url: canonicalPath,
      imagePath: `${SITE_URL}/og-homepage.jpg`,
      imageAlt: t("ogImageAlt"),
      locale: ogLocale,
    }),
    twitter: buildTwitterCard({
      title: t("ogTitle"),
      description: t("ogDescription", { quadro30x40: precosMeta.quadro30x40 }),
      imagePath: `${SITE_URL}/og-homepage.jpg`,
    }),
    alternates: buildAlternates("/preservar-bouquet-noiva", locale),
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
