"use client";

// Analytics do site. Duas ferramentas, dois níveis de privacidade:
//
//  - Umami (números agregados: visitas, páginas, origens): NÃO usa cookies nem
//    guarda dados pessoais, por isso carrega sempre e não precisa de banner de
//    cookies. É também o que recebe os eventos personalizados (ver TrackClicks).
//
//  - Microsoft Clarity (mapas de calor + gravações de sessão): usa cookies. A
//    caixinha informativa de cookies e a política de privacidade declaram-no;
//    o Clarity oculta automaticamente texto e campos de formulário.
//
// Cada ferramenta só carrega se o respectivo ID estiver definido nas variáveis
// de ambiente NEXT_PUBLIC_*. Assim o site corre em local (e faz build) sem
// qualquer configuração; basta pôr os IDs na Vercel para começar a medir.

import Script from "next/script";

const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const UMAMI_SRC =
  process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function Analytics() {
  return (
    <>
      {UMAMI_ID ? (
        <Script
          src={UMAMI_SRC}
          data-website-id={UMAMI_ID}
          // Web Vitals (LCP/INP/CLS/FCP/TTFB) são opt-in no Umami; sem isto
          // as colunas vêm vazias no export e no separador Performance.
          data-performance="true"
          strategy="afterInteractive"
        />
      ) : null}

      {CLARITY_ID ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      ) : null}
    </>
  );
}
