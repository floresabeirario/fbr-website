"use client";

// Widget Elfsight das avaliações Google.
// Decisão da Maria: o widget aparece SEMPRE (não depende do consentimento);
// a caixinha de cookies (components/CookieConsent.jsx) é apenas informativa.
import Script from "next/script";

export default function ElfsightReviews({ appId }) {
  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div className={`elfsight-app-${appId}`} data-elfsight-app-lazy />
    </>
  );
}
