// Sugestão de correcção para gralhas no domínio do email ("gmail.con" →
// "gmail.com?"). Nunca bloqueia nem altera nada sozinho — só sugere, e o
// cliente decide com um clique.

// Domínios frequentes (ordenados por popularidade entre os nossos clientes:
// PT primeiro, depois internacionais). Também servem de lista "é válido,
// não sugerir nada".
const DOMINIOS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "outlook.pt",
  "sapo.pt",
  "meo.pt",
  "netcabo.pt",
  "iol.pt",
  "live.com.pt",
  "live.com",
  "icloud.com",
  "yahoo.com",
  "msn.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "googlemail.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "hotmail.es",
  "hotmail.it",
  "hotmail.de",
  "outlook.fr",
  "outlook.es",
  "outlook.de",
  "yahoo.co.uk",
  "yahoo.fr",
  "yahoo.es",
  "yahoo.de",
  "yahoo.com.br",
  "gmx.de",
  "gmx.net",
  "web.de",
  "orange.fr",
  "wanadoo.fr",
  "free.fr",
  "sfr.fr",
  "libero.it",
  "uol.com.br",
  "bol.com.br",
  "terra.com.br",
  "mail.com",
];

// Distância de Damerau-Levenshtein (OSA): nº mínimo de edições entre duas
// strings, contando a troca de letras adjacentes ("gamil") como 1 edição.
function distancia(a, b) {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) return 99;
  const d = Array.from({ length: m + 1 }, (_, i) => {
    const row = new Array(n + 1).fill(0);
    row[0] = i;
    return row;
  });
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,        // apagar
        d[i][j - 1] + 1,        // inserir
        d[i - 1][j - 1] + custo // substituir
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // trocar adjacentes
      }
    }
  }
  return d[m][n];
}

/**
 * Devolve o email corrigido ("maria@gmail.com") quando o domínio parece uma
 * gralha de um domínio conhecido, ou null quando não há nada a sugerir
 * (email inválido, domínio já conhecido, ou demasiado diferente de todos).
 */
export function suggestEmail(email) {
  const m = String(email ?? "").trim().toLowerCase().match(/^([^@\s]+)@([^@\s]+\.[^@\s]+)$/);
  if (!m) return null;
  const [, local, dominio] = m;
  if (DOMINIOS.includes(dominio)) return null;

  let melhor = null;
  let melhorDist = Infinity;
  for (const candidato of DOMINIOS) {
    const dist = distancia(dominio, candidato);
    if (dist < melhorDist) {
      melhorDist = dist;
      melhor = candidato;
    }
  }
  // 1 edição sugere sempre; 2 edições só em domínios mais compridos, para
  // não sugerir disparates a partir de domínios curtos legítimos.
  const limite = dominio.length >= 8 ? 2 : 1;
  return melhor && melhorDist <= limite ? `${local}@${melhor}` : null;
}
