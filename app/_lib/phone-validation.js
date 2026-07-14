// Validação do comprimento do número de telefone consoante o indicativo.
// Usado pelos formulários públicos (reserva de preservação e vale-presente)
// para apanhar números com algarismos a mais ou a menos antes de submeter.

// Nº de algarismos do número NACIONAL (sem indicativo), min/max inclusivos.
// Países fora desta lista caem no intervalo genérico.
const GENERIC = { min: 6, max: 14 };

const LENGTHS = {
  // ── Mais comuns para este serviço ──
  "+351": { min: 9, max: 9 },   // Portugal
  "+55":  { min: 10, max: 11 }, // Brasil
  "+34":  { min: 9, max: 9 },   // Espanha
  "+44":  { min: 9, max: 10 },  // Reino Unido (telemóveis: 10)
  "+33":  { min: 9, max: 9 },   // França
  "+49":  { min: 7, max: 11 },  // Alemanha (comprimento variável)
  "+41":  { min: 9, max: 9 },   // Suíça
  "+43":  { min: 7, max: 13 },  // Áustria (comprimento variável)
  "+31":  { min: 9, max: 9 },   // Países Baixos
  "+32":  { min: 8, max: 9 },   // Bélgica
  "+39":  { min: 6, max: 11 },  // Itália (fixos incluem o 0 inicial)
  "+352": { min: 6, max: 9 },   // Luxemburgo
  "+353": { min: 7, max: 9 },   // Irlanda
  // ── Resto da Europa ──
  "+46":  { min: 7, max: 9 },   // Suécia
  "+45":  { min: 8, max: 8 },   // Dinamarca
  "+47":  { min: 8, max: 8 },   // Noruega
  "+358": { min: 5, max: 12 },  // Finlândia
  "+354": { min: 7, max: 7 },   // Islândia
  "+30":  { min: 10, max: 10 }, // Grécia
  "+357": { min: 8, max: 8 },   // Chipre
  "+356": { min: 8, max: 8 },   // Malta
  "+48":  { min: 9, max: 9 },   // Polónia
  "+420": { min: 9, max: 9 },   // Chéquia
  "+421": { min: 9, max: 9 },   // Eslováquia
  "+36":  { min: 8, max: 9 },   // Hungria
  "+40":  { min: 9, max: 9 },   // Roménia
  "+359": { min: 8, max: 9 },   // Bulgária
  "+385": { min: 8, max: 9 },   // Croácia
  "+386": { min: 8, max: 8 },   // Eslovénia
  "+372": { min: 7, max: 8 },   // Estónia
  "+371": { min: 8, max: 8 },   // Letónia
  "+370": { min: 8, max: 8 },   // Lituânia
  "+381": { min: 8, max: 9 },   // Sérvia
  "+389": { min: 8, max: 8 },   // Macedónia do Norte
  "+355": { min: 8, max: 9 },   // Albânia
  "+387": { min: 8, max: 8 },   // Bósnia-Herzegovina
  "+382": { min: 8, max: 8 },   // Montenegro
  "+383": { min: 8, max: 8 },   // Kosovo
  "+373": { min: 8, max: 8 },   // Moldávia
  "+380": { min: 9, max: 9 },   // Ucrânia
  "+375": { min: 9, max: 9 },   // Bielorrússia
  // ── Américas ──
  "+1":   { min: 10, max: 10 }, // EUA / Canadá
  "+52":  { min: 10, max: 10 }, // México
  "+54":  { min: 10, max: 11 }, // Argentina (telemóveis com o 9)
  "+57":  { min: 10, max: 10 }, // Colômbia
  "+56":  { min: 9, max: 9 },   // Chile
  "+51":  { min: 9, max: 9 },   // Peru
  "+58":  { min: 10, max: 10 }, // Venezuela
  "+598": { min: 8, max: 8 },   // Uruguai
  "+595": { min: 9, max: 9 },   // Paraguai
  "+591": { min: 8, max: 8 },   // Bolívia
  "+593": { min: 8, max: 9 },   // Equador
  // ── África ──
  "+244": { min: 9, max: 9 },   // Angola
  "+258": { min: 8, max: 9 },   // Moçambique
  "+238": { min: 7, max: 7 },   // Cabo Verde
  "+239": { min: 7, max: 7 },   // S. Tomé e Príncipe
  "+245": { min: 7, max: 9 },   // Guiné-Bissau
  "+240": { min: 9, max: 9 },   // Guiné Equatorial
  "+27":  { min: 9, max: 9 },   // África do Sul
  "+234": { min: 8, max: 10 },  // Nigéria
  "+254": { min: 6, max: 10 },  // Quénia
  "+233": { min: 9, max: 9 },   // Gana
  "+212": { min: 9, max: 9 },   // Marrocos
  // ── Ásia / Médio Oriente ──
  "+971": { min: 8, max: 9 },   // Emirados Árabes
  "+966": { min: 8, max: 9 },   // Arábia Saudita
  "+974": { min: 8, max: 8 },   // Catar
  "+972": { min: 8, max: 9 },   // Israel
  "+90":  { min: 10, max: 10 }, // Turquia
  "+91":  { min: 10, max: 10 }, // Índia
  "+86":  { min: 10, max: 12 }, // China
  "+81":  { min: 9, max: 10 },  // Japão
  "+82":  { min: 8, max: 11 },  // Coreia do Sul
  "+65":  { min: 8, max: 8 },   // Singapura
  "+60":  { min: 9, max: 10 },  // Malásia
  "+66":  { min: 8, max: 9 },   // Tailândia
  "+852": { min: 8, max: 8 },   // Hong Kong
  // ── Oceânia ──
  "+61":  { min: 9, max: 9 },   // Austrália
  "+64":  { min: 8, max: 10 },  // Nova Zelândia
  // ── Outros relevantes (os restantes caem no intervalo genérico) ──
  "+853": { min: 8, max: 8 },   // Macau
  "+670": { min: 7, max: 8 },   // Timor-Leste
  "+7":   { min: 10, max: 10 }, // Rússia / Cazaquistão
  "+376": { min: 6, max: 9 },   // Andorra
  "+377": { min: 8, max: 9 },   // Mónaco
  "+423": { min: 7, max: 7 },   // Liechtenstein
  "+350": { min: 8, max: 8 },   // Gibraltar
  "+20":  { min: 8, max: 10 },  // Egipto
  "+53":  { min: 8, max: 8 },   // Cuba
  "+62":  { min: 8, max: 12 },  // Indonésia
  "+63":  { min: 8, max: 10 },  // Filipinas
  "+84":  { min: 9, max: 10 },  // Vietname
  "+886": { min: 8, max: 9 },   // Taiwan
  "+92":  { min: 9, max: 10 },  // Paquistão
  "+880": { min: 8, max: 10 },  // Bangladesh
  "+94":  { min: 9, max: 9 },   // Sri Lanka
  "+98":  { min: 6, max: 10 },  // Irão
};

// Países onde o número nacional se costuma escrever com um 0 inicial
// (trunk prefix) que não conta quando se marca com o indicativo internacional.
// Ex.: Reino Unido "07912 345678" → +44 7912 345678.
// Itália (+39) fica de fora: lá o 0 dos fixos faz parte do número.
const TRUNK_ZERO = new Set([
  "+44", "+33", "+49", "+41", "+43", "+31", "+32", "+353", "+46", "+358",
  "+40", "+385", "+386", "+381", "+389", "+355", "+387", "+382", "+383",
  "+373", "+380", "+375", "+90", "+27", "+254", "+234", "+233", "+212",
  "+971", "+966", "+972", "+81", "+82", "+60", "+66", "+61", "+64", "+54",
  "+20", "+213", "+62", "+63", "+84", "+886", "+92", "+880", "+98", "+94",
  "+95", "+374", "+995", "+994", "+976",
]);

/**
 * Extrai os algarismos do número NACIONAL a partir do que o cliente escreveu.
 * Tolera espaços, hífenes e parêntesis; ignora um 0 inicial nos países com
 * trunk prefix; e detecta o indicativo repetido no próprio número
 * ("+351 912…" ou "00351 912…"), não o contando duas vezes.
 */
function nationalDigits(indicativo, raw) {
  const trimmed = String(raw ?? "").trim();
  let digits = trimmed.replace(/\D/g, "");
  const cc = String(indicativo ?? "").replace(/\D/g, "");

  if (trimmed.startsWith("00")) digits = digits.slice(2);
  if ((trimmed.startsWith("+") || trimmed.startsWith("00")) && cc && digits.startsWith(cc)) {
    digits = digits.slice(cc.length);
  }
  if (TRUNK_ZERO.has(indicativo) && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  // Trunk prefixes que não são "0": Rússia/Cazaquistão usam 8, Hungria usa 06.
  if (indicativo === "+7" && digits.length === 11 && digits.startsWith("8")) {
    digits = digits.slice(1);
  }
  if (indicativo === "+36" && digits.startsWith("06")) {
    digits = digits.slice(2);
  }
  return digits;
}

/**
 * Verifica se o número tem o nº de algarismos esperado para o indicativo.
 *
 * @returns {{ ok: boolean, digits: number, min: number, max: number }}
 */
export function checkPhoneLength(indicativo, raw) {
  const digits = nationalDigits(indicativo, raw);
  const spec = LENGTHS[indicativo] ?? GENERIC;
  return {
    ok: digits.length >= spec.min && digits.length <= spec.max,
    digits: digits.length,
    min: spec.min,
    max: spec.max,
  };
}

// Agrupa algarismos em blocos de 3 para leitura ("912 345 678").
// Grupo final de 1 algarismo lê-se mal — junta-se ao anterior (ex.: 10 → 3+3+4).
function groupDigits(digits) {
  const groups = digits.match(/.{1,3}/g) ?? [];
  if (groups.length > 1 && groups[groups.length - 1].length === 1) {
    const last = groups.pop();
    groups[groups.length - 1] += last;
  }
  return groups.join(" ");
}

/**
 * Número completo normalizado a partir do que o cliente escreveu.
 * `full` é o que se guarda ("+351912345678"); `display` é o mesmo número
 * legível ("+351 912 345 678"). Ambos vazios se não houver algarismos.
 */
export function normalizePhone(indicativo, raw) {
  const digits = nationalDigits(indicativo, raw);
  if (!digits) return { full: "", display: "" };
  return {
    full: `${indicativo}${digits}`,
    display: `${indicativo} ${groupDigits(digits)}`,
  };
}

/**
 * Auto-formatação do campo enquanto o cliente escreve: só algarismos,
 * agrupados com espaços ("912 345 678"). Se colar o número com o indicativo
 * repetido ("+351 912…" ou "00351 912…"), o indicativo é removido logo.
 * Devolve o texto novo e a posição do cursor (para não saltar ao editar
 * a meio); um backspace sobre um espaço apaga também o algarismo anterior,
 * para não ficar preso no separador.
 *
 * @returns {{ value: string, caret: number }}
 */
export function formatPhoneInput(indicativo, rawValue, prevValue, caret) {
  const raw = String(rawValue ?? "");
  const prev = String(prevValue ?? "");
  const at = typeof caret === "number" ? caret : raw.length;
  let digitsBefore = raw.slice(0, at).replace(/\D/g, "").length;

  let digits = raw.replace(/\D/g, "");
  const trimmed = raw.trim();
  const cc = String(indicativo ?? "").replace(/\D/g, "");
  let removedLead = 0;
  if (trimmed.startsWith("00")) {
    digits = digits.slice(2);
    removedLead = 2;
  }
  if ((trimmed.startsWith("+") || trimmed.startsWith("00")) && cc && digits.startsWith(cc)) {
    digits = digits.slice(cc.length);
    removedLead += cc.length;
  }
  digitsBefore = Math.max(0, digitsBefore - removedLead);

  // Backspace/delete que só apagou um espaço: os algarismos ficaram iguais
  // mas o texto encolheu — apaga-se também o algarismo antes do cursor.
  if (digits === prev.replace(/\D/g, "") && raw.length < prev.length && digitsBefore > 0) {
    digits = digits.slice(0, digitsBefore - 1) + digits.slice(digitsBefore);
    digitsBefore -= 1;
  }

  digits = digits.slice(0, 15); // máximo E.164
  if (digitsBefore > digits.length) digitsBefore = digits.length;

  const value = groupDigits(digits);
  let pos = 0;
  let seen = 0;
  while (pos < value.length && seen < digitsBefore) {
    if (value[pos] >= "0" && value[pos] <= "9") seen++;
    pos++;
  }
  return { value, caret: pos };
}

/**
 * Devolve a mensagem de erro traduzida quando o comprimento está errado,
 * ou null quando está tudo bem. `t` é o useTranslations do formulário
 * (precisa das chaves erroTelefoneDigitos / erroTelefoneDigitosIntervalo).
 */
export function phoneLengthError(t, indicativo, raw) {
  const r = checkPhoneLength(indicativo, raw);
  if (!r.ok) {
    return r.min === r.max
      ? t("erroTelefoneDigitos", { code: indicativo, n: r.min, digitos: r.digits })
      : t("erroTelefoneDigitosIntervalo", { code: indicativo, min: r.min, max: r.max, digitos: r.digits });
  }
  // Plano de numeração PT (ANACOM): números de contacto começam por
  // 9 (telemóvel), 2 (fixo geográfico) ou 30 (VoIP nómada, raro).
  // A mensagem só fala dos dois comuns.
  if (indicativo === "+351" && !/^[239]/.test(nationalDigits(indicativo, raw))) {
    return t("erroTelefonePrimeiroDigito");
  }
  return null;
}
