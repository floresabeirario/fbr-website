// app/_lib/supabase-mappings.js
// ============================================================
// Mapeia os "valor" dos formulários públicos (PT/EN) para os
// enums internos da base de dados Supabase (admin.floresabeirario.pt).
//
// Os ficheiros messages/pt.json e messages/en.json partilham o
// mesmo `valor` (em PT) — o `label` é que muda. Por isso este
// mapping é monolingue: chave = string PT.
//
// Server-only (não importar do browser).
// ============================================================

// Os mapas partilhados com o resumo da encomenda do formulário (tamanho,
// fundo, vidro, extras, envio) vivem em form-enums.js, que é puro e vai
// para o browser. Aqui só ficam os que a API usa em exclusivo.
import {
  COMO_ENVIAR_FLORES,
  COMO_RECEBER_QUADRO,
  TAMANHO_MOLDURA,
  TIPO_FUNDO,
  VIDRO_MUSEU,
  SIM_NAO_INFO,
  DRIED_APPROACH,
} from "./form-enums";

// ── Reserva de Preservação ──────────────────────────────────

const MEIO_CONTACTO = {
  "E-mail":   "email",
  "WhatsApp": "whatsapp",
};

const COMO_CONHECEU_RESERVA = {
  "Ofereceram-me um Vale-Presente para preservação":                       "vale_presente",
  "Através do Instagram":                                                  "instagram",
  "Através do Facebook":                                                   "facebook",
  "Através do casamentos.pt":                                              "casamentos_pt",
  "Pesquisa no Google":                                                    "google",
  "Recomendação de florista":                                              "florista",
  "Recomendação de Wedding Planner":                                       "wedding_planner",
  "Recomendação de alguém que já contratou o serviço anteriormente":       "recomendacao",
  "Recomendação de uma IA (ChatGPT, Gemini, etc.)":                        "recomendacao_ia",
  "Outro (especificar abaixo)":                                            "outro",
};

const TIPO_EVENTO = {
  "Casamento":           "casamento",
  "Batizado":            "batizado",
  "Funeral":             "funeral",
  "Pedido de Casamento": "pedido_casamento",
  "Outro":               "outro",
};

// ── Emoldurar Flores Secas ──────────────────────────────────
// Estado actual das flores já secas.
const DRIED_CONDITION = {
  "Em bom estado, mantêm a forma e a cor":                 "bom_estado",
  "Com algumas partes frágeis, partidas ou desbotadas":    "frageis",
  "Bastante danificadas ou desfeitas":                     "danificadas",
  "Prefiro que avaliem vocês":                             "avaliar",
};

// ── Vale-Presente ───────────────────────────────────────────

const VALE_MEIO_CONTACTO = MEIO_CONTACTO;

const VALE_DELIVERY_RECIPIENT = {
  "remetente":    "remetente",
  "destinatario": "destinatario",
};

const VALE_DELIVERY_FORMAT = {
  "digital": "digital",
  "fisico":  "fisico",
};

// O contacto digital pode ser email ou whatsapp — inferido do conteúdo
// do contactoDestinatario (se inclui "@", é email; senão whatsapp).
function inferDeliveryChannel(contactoDestinatario) {
  if (!contactoDestinatario) return null;
  return contactoDestinatario.includes("@") ? "email" : "whatsapp";
}

const VALE_COMO_CONHECEU = {
  "recomendacao-cliente": "recomendacao",
  "recomendacao-ia":      "recomendacao_ia",
  "instagram":            "instagram",
  "facebook":             "facebook",
  "casamentos":           "casamentos_pt",
  "google":               "google",
  "florista":             "florista",
  "wedding-planner":      "wedding_planner",
  "outro":                "outro",
};

// ── Helpers públicos ────────────────────────────────────────

function lookup(map, value) {
  if (!value) return null;
  return map[value] ?? null;
}

// Tipo de evento "Outro" tem um campo "Qual?" no formulário. `orders` não
// tem coluna para isso, por isso vai à cabeça das notas, onde a Maria o
// vê logo no workbench. Nunca inventa texto para os outros tipos.
function notasComEvento(data, event_type) {
  const notas = (data.notasAdicionais || "").trim();
  const qual = event_type === "outro" ? (data.tipoEventoOutro || "").trim() : "";
  if (!qual) return notas || null;
  const linha = `Tipo de evento: ${qual}`;
  return notas ? `${linha}\n\n${notas}` : linha;
}

// ── Detalhes da recolha no local ────────────────────────────
// O formulário público pergunta morada/dia/janela horária a quem
// escolhe "Recolha no local". Escrevem nas colunas pickup_* que o
// workbench do admin já mostra (nenhuma coluna nova é precisa).
//
// Cada campo tem um "Ainda não sei" no formulário. As colunas de data
// e hora são DATE/TIME e não guardam texto, por isso o que a cliente
// não sabe fica registado em `pickup_notes` — assim a Maria distingue
// "ainda não sabe" de "não respondeu", que para orçamentar é diferente.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const HHMM     = /^\d{2}:\d{2}$/;

function mapPickupDetails(data, flowerDeliveryMethod) {
  // Fora da recolha no local, todos os campos ficam a null: trocar de
  // opção no formulário nunca deixa dados órfãos na encomenda.
  if (flowerDeliveryMethod !== "recolha_evento") {
    return {
      pickup_address:   null,
      pickup_date:      null,
      pickup_time_from: null,
      pickup_time_to:   null,
      pickup_notes:     null,
    };
  }

  const naoSabe = (flag) => data[flag] === true;

  const address = naoSabe("recolhaMoradaNaoSei")
    ? null
    : (data.recolhaMorada || "").trim() || null;

  const rawDate = naoSabe("recolhaDataNaoSei") ? "" : (data.recolhaData || "");
  const date = ISO_DATE.test(rawDate) ? rawDate : null;

  const rawFrom = naoSabe("recolhaHoraNaoSei") ? "" : (data.recolhaHoraDe || "");
  const rawTo   = naoSabe("recolhaHoraNaoSei") ? "" : (data.recolhaHoraAte || "");
  const from = HHMM.test(rawFrom) ? rawFrom : null;
  const to   = HHMM.test(rawTo)   ? rawTo   : null;

  // Notas: primeiro o que ficou por saber, depois o texto da cliente.
  const porSaber = [];
  if (naoSabe("recolhaDataNaoSei"))   porSaber.push("o dia");
  if (naoSabe("recolhaMoradaNaoSei")) porSaber.push("a morada");
  if (naoSabe("recolhaHoraNaoSei"))   porSaber.push("a hora");

  const linhas = [];
  if (porSaber.length) {
    linhas.push(`A cliente ainda não sabe ${porSaber.join(", ")}.`);
  }
  const notas = (data.recolhaNotas || "").trim();
  if (notas) linhas.push(notas);

  return {
    pickup_address:   address,
    pickup_date:      date,
    pickup_time_from: from,
    pickup_time_to:   to,
    pickup_notes:     linhas.length ? linhas.join("\n") : null,
  };
}

/**
 * Constrói o payload para INSERT em `orders` a partir do body do form
 * de Reserva de Preservação. Devolve `{ payload, errors }` onde
 * `errors` é um array vazio se tudo OK; caso contrário lista nomes
 * de campos inválidos.
 */
export function mapReservaToOrder(data, { ip } = {}) {
  const errors = [];

  // Telefone: o front-end já junta indicativo (+351) com número.
  const phone = (data.telefone || "").trim() || null;

  // Email obrigatório (já validado a montante)
  const email = (data.email || "").trim() || null;

  // Mapeamentos
  const contact_preference     = lookup(MEIO_CONTACTO,         data.meioContacto);
  const event_type             = lookup(TIPO_EVENTO,           data.tipoEvento);
  const flower_delivery_method = lookup(COMO_ENVIAR_FLORES,    data.comoEnviarFlores);
  const frame_delivery_method  = lookup(COMO_RECEBER_QUADRO,   data.comoReceberQuadro);
  const frame_size             = lookup(TAMANHO_MOLDURA,       data.tamanhoMoldura);
  const frame_background       = lookup(TIPO_FUNDO,            data.tipoFundo);
  const museum_glass           = lookup(VIDRO_MUSEU,           data.vidroMuseu);
  const museum_glass_mini      = lookup(VIDRO_MUSEU,           data.vidroMuseuMini);
  const extra_small_frames     = lookup(SIM_NAO_INFO,          data.quadrosExtra);
  const christmas_ornaments    = lookup(SIM_NAO_INFO,          data.ornamentosNatal);
  const necklace_pendants      = lookup(SIM_NAO_INFO,          data.pendentes);
  const how_found_fbr          = lookup(COMO_CONHECEU_RESERVA, data.comoConheceu);

  if (data.meioContacto      && !contact_preference)     errors.push("meioContacto");
  if (data.tipoEvento        && !event_type)             errors.push("tipoEvento");
  if (data.comoEnviarFlores  && !flower_delivery_method) errors.push("comoEnviarFlores");
  if (data.comoReceberQuadro && !frame_delivery_method)  errors.push("comoReceberQuadro");
  if (data.tamanhoMoldura    && !frame_size)             errors.push("tamanhoMoldura");
  if (data.tipoFundo         && !frame_background)       errors.push("tipoFundo");
  if (data.vidroMuseu        && !museum_glass)           errors.push("vidroMuseu");
  if (data.vidroMuseuMini    && !museum_glass_mini)      errors.push("vidroMuseuMini");
  if (data.quadrosExtra      && !extra_small_frames)     errors.push("quadrosExtra");
  if (data.ornamentosNatal   && !christmas_ornaments)    errors.push("ornamentosNatal");
  if (data.pendentes         && !necklace_pendants)      errors.push("pendentes");
  if (data.comoConheceu      && !how_found_fbr)          errors.push("comoConheceu");

  // Quantidades (números positivos opcionais)
  const toIntOrNull = (v) => {
    if (v === undefined || v === null || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.trunc(n) : null;
  };

  // "how_found_fbr_other" usa-se também para o nome da florista,
  // mantendo simetria com a UI do admin (sessão 15).
  let how_found_fbr_other = null;
  if (how_found_fbr === "florista") {
    how_found_fbr_other = (data.nomeFlorista || "").trim() || null;
    if (!how_found_fbr_other) errors.push("nomeFlorista");
  } else if (how_found_fbr === "outro") {
    how_found_fbr_other = (data.comoConheceuOutro || "").trim() || null;
  }

  // gift_voucher_code: só faz sentido quando o cliente diz que veio de
  // um Vale-Presente. Em qualquer outro contexto, ignoramos o que vier
  // (mesmo que o JS do site mande, descartamos).
  const gift_voucher_code =
    how_found_fbr === "vale_presente"
      ? (data.codigoValePresente || "").trim().toUpperCase() || null
      : null;
  if (how_found_fbr === "vale_presente" && !gift_voucher_code) {
    errors.push("codigoValePresente");
  }

  // couple_names: só guardar quando event_type = "casamento". Para
  // outros eventos, o front-end já oculta o campo, mas defendemos a BD
  // caso alguém modifique o JS.
  const couple_names =
    event_type === "casamento"
      ? (data.nomeNoivos || "").trim() || null
      : null;

  // extras_in_frame: lista PT directamente + nota opcional
  const extras_options = Array.isArray(data.elementosExtra)
    ? data.elementosExtra.filter((s) => typeof s === "string" && s.trim())
    : [];
  const extras_in_frame = {
    options: extras_options,
    notes:   (data.elementosExtraOutro || "").trim(),
  };

  const payload = {
    // Cliente
    client_name:       (data.nome || "").trim(),
    contact_preference,
    email,
    phone,
    event_date:        data.dataEvento || null,
    event_type,
    couple_names,
    event_location:    (data.localEvento || "").trim() || null,
    flower_type:       (data.tipoFlores || "").trim() || null,
    flower_delivery_method,
    ...mapPickupDetails(data, flower_delivery_method),
    frame_delivery_method,
    frame_size,
    frame_background,
    // Sem escolha (campo por preencher) → 'nao_sei': nunca cobra
    // suplemento, e a Maria decide com o cliente na fase de design.
    museum_glass:      museum_glass || "nao_sei",
    // Escolha própria dos mini-quadros; o campo só aparece no formulário
    // quando o cliente pede minis, por isso vem vazio no caso normal.
    museum_glass_mini: museum_glass_mini || "nao_sei",
    extras_in_frame,
    extra_small_frames,
    extra_small_frames_qty:    toIntOrNull(data.quantosQuadros),
    christmas_ornaments,
    christmas_ornaments_qty:   toIntOrNull(data.quantosOrnamentos),
    necklace_pendants,
    necklace_pendants_qty:     toIntOrNull(data.quantosPendentes),
    how_found_fbr,
    how_found_fbr_other,
    gift_voucher_code,
    additional_notes:   notasComEvento(data, event_type),
    form_language:      data.locale === "en" ? "en" : "pt",

    // RGPD
    consent_at:         new Date().toISOString(),
    consent_version:    "2.0",
    consent_ip:         ip || null,

    // Os campos administrativos (status, payment_status, contacted,
    // manually_no_response, etc.) ficam ao seu DEFAULT da BD —
    // a policy `orders_public_insert` exige isto.
  };

  return { payload, errors };
}

/**
 * Constrói o payload para INSERT em `orders` a partir do form de
 * "Emoldurar Flores Secas". Variante da preservação (service_type =
 * 'emoldurar_secas') — partilha a maioria dos campos, sem data de evento,
 * com abordagem/estado próprios e fotos do ramo (já carregadas no Storage;
 * `clientPhotos` = [{ path, name }]).
 */
export function mapEmoldurarToOrder(data, { ip, clientPhotos = [] } = {}) {
  const errors = [];

  const phone = (data.telefone || "").trim() || null;
  const email = (data.email || "").trim() || null;

  const contact_preference     = lookup(MEIO_CONTACTO,         data.meioContacto);
  const event_type             = lookup(TIPO_EVENTO,           data.tipoEvento);
  const flower_delivery_method = lookup(COMO_ENVIAR_FLORES,    data.comoEnviarFlores);
  const frame_delivery_method  = lookup(COMO_RECEBER_QUADRO,   data.comoReceberQuadro);
  const frame_size             = lookup(TAMANHO_MOLDURA,       data.tamanhoMoldura);
  const frame_background       = lookup(TIPO_FUNDO,            data.tipoFundo);
  const museum_glass           = lookup(VIDRO_MUSEU,           data.vidroMuseu);
  const museum_glass_mini      = lookup(VIDRO_MUSEU,           data.vidroMuseuMini);
  const extra_small_frames     = lookup(SIM_NAO_INFO,          data.quadrosExtra);
  const christmas_ornaments    = lookup(SIM_NAO_INFO,          data.ornamentosNatal);
  const necklace_pendants      = lookup(SIM_NAO_INFO,          data.pendentes);
  const how_found_fbr          = lookup(COMO_CONHECEU_RESERVA, data.comoConheceu);
  const dried_approach         = lookup(DRIED_APPROACH,        data.abordagem);
  const dried_condition        = lookup(DRIED_CONDITION,       data.estadoFlores);

  if (data.meioContacto      && !contact_preference)     errors.push("meioContacto");
  if (data.tipoEvento        && !event_type)             errors.push("tipoEvento");
  if (data.comoEnviarFlores  && !flower_delivery_method) errors.push("comoEnviarFlores");
  if (data.comoReceberQuadro && !frame_delivery_method)  errors.push("comoReceberQuadro");
  if (data.tamanhoMoldura    && !frame_size)             errors.push("tamanhoMoldura");
  if (data.tipoFundo         && !frame_background)       errors.push("tipoFundo");
  if (data.vidroMuseu        && !museum_glass)           errors.push("vidroMuseu");
  if (data.vidroMuseuMini    && !museum_glass_mini)      errors.push("vidroMuseuMini");
  if (data.quadrosExtra      && !extra_small_frames)     errors.push("quadrosExtra");
  if (data.ornamentosNatal   && !christmas_ornaments)    errors.push("ornamentosNatal");
  if (data.pendentes         && !necklace_pendants)      errors.push("pendentes");
  if (data.comoConheceu      && !how_found_fbr)          errors.push("comoConheceu");
  if (data.abordagem         && !dried_approach)         errors.push("abordagem");
  if (data.estadoFlores      && !dried_condition)        errors.push("estadoFlores");

  const toIntOrNull = (v) => {
    if (v === undefined || v === null || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.trunc(n) : null;
  };

  let how_found_fbr_other = null;
  if (how_found_fbr === "florista") {
    how_found_fbr_other = (data.nomeFlorista || "").trim() || null;
    if (!how_found_fbr_other) errors.push("nomeFlorista");
  } else if (how_found_fbr === "outro") {
    how_found_fbr_other = (data.comoConheceuOutro || "").trim() || null;
  }

  const gift_voucher_code =
    how_found_fbr === "vale_presente"
      ? (data.codigoValePresente || "").trim().toUpperCase() || null
      : null;
  if (how_found_fbr === "vale_presente" && !gift_voucher_code) {
    errors.push("codigoValePresente");
  }

  const couple_names =
    event_type === "casamento"
      ? (data.nomeNoivos || "").trim() || null
      : null;

  const extras_options = Array.isArray(data.elementosExtra)
    ? data.elementosExtra.filter((s) => typeof s === "string" && s.trim())
    : [];
  const extras_in_frame = {
    options: extras_options,
    notes:   (data.elementosExtraOutro || "").trim(),
  };

  const payload = {
    service_type:      "emoldurar_secas",
    client_name:       (data.nome || "").trim(),
    contact_preference,
    email,
    phone,
    // Sem data de evento neste serviço (as flores já estão secas).
    event_type,
    couple_names,
    event_location:    (data.localEvento || "").trim() || null,
    flower_type:       (data.tipoFlores || "").trim() || null,
    dried_approach,
    dried_condition,
    client_photos:     Array.isArray(clientPhotos) ? clientPhotos : [],
    flower_delivery_method,
    frame_delivery_method,
    frame_size,
    frame_background,
    // Sem escolha (campo por preencher) → 'nao_sei': nunca cobra
    // suplemento, e a Maria decide com o cliente na fase de design.
    museum_glass:      museum_glass || "nao_sei",
    // Escolha própria dos mini-quadros; o campo só aparece no formulário
    // quando o cliente pede minis, por isso vem vazio no caso normal.
    museum_glass_mini: museum_glass_mini || "nao_sei",
    extras_in_frame,
    extra_small_frames,
    extra_small_frames_qty:    toIntOrNull(data.quantosQuadros),
    christmas_ornaments,
    christmas_ornaments_qty:   toIntOrNull(data.quantosOrnamentos),
    necklace_pendants,
    necklace_pendants_qty:     toIntOrNull(data.quantosPendentes),
    how_found_fbr,
    how_found_fbr_other,
    gift_voucher_code,
    additional_notes:   notasComEvento(data, event_type),
    form_language:      data.locale === "en" ? "en" : "pt",

    consent_at:         new Date().toISOString(),
    consent_version:    "2.0",
    consent_ip:         ip || null,
  };

  return { payload, errors };
}

/**
 * Constrói o payload para INSERT em `vouchers` a partir do body do
 * form de Vale-Presente.
 */
export function mapValeToVoucher(data, { ip } = {}) {
  const errors = [];

  const sender_contact_pref = lookup(VALE_MEIO_CONTACTO, data.meioContacto);
  const delivery_recipient  = lookup(VALE_DELIVERY_RECIPIENT, data.entrega);
  const delivery_format     = lookup(VALE_DELIVERY_FORMAT, data.tipoVale);
  const how_found_fbr       = lookup(VALE_COMO_CONHECEU, data.comoConheceu);

  if (data.meioContacto && !sender_contact_pref) errors.push("meioContacto");
  if (data.entrega      && !delivery_recipient)  errors.push("entrega");
  if (data.tipoVale     && !delivery_format)     errors.push("tipoVale");
  if (data.comoConheceu && !how_found_fbr)       errors.push("comoConheceu");

  // delivery_channel só faz sentido em digital
  let delivery_channel = null;
  if (delivery_format === "digital" && delivery_recipient === "destinatario") {
    delivery_channel = inferDeliveryChannel(data.contactoDestinatario);
  } else if (delivery_format === "digital" && delivery_recipient === "remetente") {
    // Quando é digital e vai para o próprio remetente, herda o meio de contacto.
    delivery_channel = sender_contact_pref;
  }

  // Validade (admin) — vouchers tem default `current_date + 2 years` na BD.
  // Não definimos aqui; deixamos a BD aplicar.

  // Notas adicionais sobre destinatário (morada / contacto / data ideal)
  // Mapeiam para campos da 011_vouchers_fix_and_extra_fields.sql:
  //   recipient_contact, recipient_address, ideal_send_date
  const recipient_contact = (data.contactoDestinatario || "").trim() || null;
  const recipient_address = (data.morada               || "").trim() || null;
  const ideal_send_date   =  data.dataEnvio || null;

  // how_found_fbr_other: usa nomeFlorista quando comoConheceu="florista";
  // caso contrário, comoConheceuOutro.
  let how_found_fbr_other = null;
  if (how_found_fbr === "florista") {
    how_found_fbr_other = (data.nomeFlorista || "").trim() || null;
    if (!how_found_fbr_other) errors.push("nomeFlorista");
  } else if (how_found_fbr === "outro") {
    how_found_fbr_other = (data.comoConheceuOutro || "").trim() || null;
  }

  // Valor — já validado a montante (mín. 300, máx. 100k)
  const amount = data.valorVale ? Number(data.valorVale) : null;

  const payload = {
    // Remetente
    sender_name:           (data.nome || "").trim(),
    sender_contact_pref,
    sender_email:          (data.email || "").trim() || null,
    sender_phone:          (data.telefone || "").trim() || null,

    // O vale
    recipient_name:        (data.nomeDestinatario || "").trim(),
    message:               (data.mensagem || "").trim() || null,
    amount,

    // Entrega
    delivery_recipient,
    delivery_format,
    delivery_channel,
    recipient_contact,
    recipient_address,
    ideal_send_date,

    // Outros
    comments:              (data.comentarios || "").trim() || null,
    how_found_fbr,
    how_found_fbr_other,
    form_language:         data.locale === "en" ? "en" : "pt",

    // RGPD — o form de vale ainda não tem checkbox dedicada de termos,
    // por isso marcamos como "implicit" (TODO: adicionar checkbox).
    consent_at:            new Date().toISOString(),
    consent_version:       "1.0-implicit",
    consent_ip:            ip || null,
  };

  return { payload, errors };
}
