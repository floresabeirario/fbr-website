"use client";

// Contexto para páginas com slugs diferentes por idioma (artigos do blog).
// O switcher PT/EN da Nav usa router.replace(pathname, {locale}), que só
// funciona quando o slug é igual nos dois idiomas — num artigo traduzido
// produzia /en/blog/<slug-pt> → 404. As páginas que sabem o seu URL no
// outro idioma registam-no aqui via <SetAltLocaleHref>, e a Nav usa-o.

import { createContext, useContext, useEffect, useState } from "react";

const AltLocaleHrefContext = createContext(null);

export function AltLocaleHrefProvider({ children }) {
  const [altHref, setAltHref] = useState(null);
  return (
    <AltLocaleHrefContext.Provider value={{ altHref, setAltHref }}>
      {children}
    </AltLocaleHrefContext.Provider>
  );
}

export function useAltLocaleHref() {
  return useContext(AltLocaleHrefContext);
}

/** Regista o URL desta página no OUTRO idioma (limpa ao desmontar). */
export function SetAltLocaleHref({ href }) {
  const ctx = useContext(AltLocaleHrefContext);
  const setAltHref = ctx?.setAltHref;
  useEffect(() => {
    if (!setAltHref) return;
    setAltHref(href);
    return () => setAltHref(null);
  }, [href, setAltHref]);
  return null;
}
