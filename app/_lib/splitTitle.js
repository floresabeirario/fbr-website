// app/_lib/splitTitle.js
// Divide um título no sítio onde entra o destaque em itálico (<em>).
// Guarda contra traduções dessincronizadas: se `em` não existir dentro de
// `full`, devolve o título inteiro e em=null (antes, o split falhado fazia
// o texto do <em> aparecer DUPLICADO no fim do título).
export function splitTitle(full, em) {
  if (!full) return ["", null];
  if (!em) return [full, null];
  const idx = full.indexOf(em);
  if (idx === -1) return [full, null];
  return [full.slice(0, idx), em];
}
