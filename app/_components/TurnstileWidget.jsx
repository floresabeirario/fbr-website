"use client";

// ============================================================
// Widget Cloudflare Turnstile (CAPTCHA invisível/managed).
//
// Sem `NEXT_PUBLIC_TURNSTILE_SITE_KEY` definida, este componente
// não renderiza nada e o callback `onToken` nunca é chamado. Os
// forms continuam a submeter `turnstileToken: undefined` e o
// servidor (verifyTurnstile em _lib/turnstile.js) faz no-op
// se `TURNSTILE_SECRET` também não estiver definida.
//
// Quando ambas as env vars estiverem definidas (site key no
// front-end + secret no servidor), o widget aparece, o token é
// gerado e validado em cada submit.
// ============================================================

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Aceita "pt" e "en" do next-intl. "auto" deixa Cloudflare decidir
// com base no header Accept-Language do browser.
export default function TurnstileWidget({ onToken, language = "auto" }) {
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenRef = useRef(onToken);
  const [ready, setReady] = useState(false);

  // Manter callback actualizado sem disparar re-render do widget
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!SITE_KEY) return;
    if (!ready) return;
    if (!widgetRef.current) return;
    if (typeof window === "undefined" || !window.turnstile) return;

    // Cleanup widget anterior se já existia (montagens repetidas)
    if (widgetIdRef.current) {
      try { window.turnstile.remove(widgetIdRef.current); } catch {}
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: SITE_KEY,
      callback: (token) => onTokenRef.current?.(token),
      "error-callback": () => onTokenRef.current?.(null),
      "expired-callback": () => onTokenRef.current?.(null),
      // Forçado a "light" porque o site público tem sempre fundo claro
      // (creme em /reservar-preservacao, azul em /vale-presente).
      // No admin é "auto" porque tem dark mode toggle.
      theme: "light",
      language,
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [ready, language]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        id="cf-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
        onReady={() => setReady(true)}
      />
      <div ref={widgetRef} style={{ display: "flex", justifyContent: "center", margin: "0.5rem 0" }} />
    </>
  );
}

// Helper para resetar o widget (chamar após erro de submit).
// O token só é válido uma vez — após erro, precisamos de um novo.
export function resetTurnstile() {
  if (typeof window !== "undefined" && window.turnstile) {
    try { window.turnstile.reset(); } catch {}
  }
}
