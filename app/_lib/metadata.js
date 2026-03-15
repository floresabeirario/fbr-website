// app/_lib/metadata.js
// Helpers para construir openGraph e twitter card com defaults consistentes

const SITE_NAME = "Flores à Beira-Rio";

/**
 * Devolve um objecto openGraph completo com defaults.
 * imagePath: caminho relativo ("/imagem.webp") ou URL absoluta.
 */
export function buildOpenGraph({ title, description, url, imagePath, imageAlt, type = "website", locale = "pt_PT" }) {
  const og = { title, description, url, siteName: SITE_NAME, locale, type };
  if (imagePath) {
    og.images = [{ url: imagePath, width: 1200, height: 630, alt: imageAlt ?? "" }];
  }
  return og;
}

/**
 * Devolve um objecto twitter card com defaults.
 * imagePath: caminho relativo ("/imagem.webp") ou URL absoluta.
 */
export function buildTwitterCard({ title, description, imagePath }) {
  const tw = { card: "summary_large_image", title, description };
  if (imagePath) {
    tw.images = [imagePath];
  }
  return tw;
}
