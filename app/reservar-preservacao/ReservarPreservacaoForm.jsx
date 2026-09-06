"use client";

import { useState, useEffect, useRef, useId, isValidElement, cloneElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { SOCIAL_INSTAGRAM, EMAIL } from "../_lib/constants";
import PhonePrefix from "../_components/PhonePrefix";
import TurnstileWidget, { resetTurnstile } from "../_components/TurnstileWidget";
import { phoneLengthError, normalizePhone, formatPhoneInput } from "../_lib/phone-validation";
import { suggestEmail, cleanEmail } from "../_lib/email-suggest";
import AddressAutocomplete from "../_components/AddressAutocomplete";
import PickupMap from "../_components/PickupMap";
import { PRECOS_FALLBACK } from "../_lib/precos-valores";
import ExemploModal from "../_components/ExemploModal";
import { useRascunho } from "../_lib/use-rascunho";
import { formatEuro, formatDataCurta } from "../_lib/orcamento";
import ResumoEncomenda from "../_components/ResumoEncomenda";
import { eventoDistante } from "../_lib/orcamento";

const TURNSTILE_ENABLED = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

const INIT = {
  nome: "",
  meioContacto: "",
  email: "",
  telefoneIndicativo: "+351",
  telefone: "",
  dataEvento: "",
  tipoEvento: "",
  tipoEventoOutro: "",
  nomeNoivos: "",
  localEvento: "",
  tipoFlores: "",
  comoEnviarFlores: "",
  // Recolha no local — só aparecem quando escolhe essa opção de envio.
  // Todos opcionais: cada um tem um "Ainda não sei" para distinguir
  // "não sabe" de "saltou o campo".
  recolhaData: "",
  recolhaDataNaoSei: false,
  recolhaMorada: "",
  recolhaMoradaNaoSei: false,
  recolhaHoraDe: "",
  recolhaHoraAte: "",
  recolhaHoraNaoSei: false,
  recolhaNotas: "",
  comoReceberQuadro: "",
  tamanhoMoldura: "",
  tipoFundo: "",
  vidroMuseu: "",
  vidroMuseuMini: "",
  elementosExtra: [],
  elementosExtraOutro: "",
  quadrosExtra: "",
  quantosQuadros: "",
  ornamentosNatal: "",
  quantosOrnamentos: "",
  pendentes: "",
  quantosPendentes: "",
  comoConheceu: "",
  comoConheceuOutro: "",
  nomeFlorista: "",
  codigoValePresente: "",
  notasAdicionais: "",
  termosCondicoes: false,
  // Honeypot — invisível para humanos, bots costumam preencher
  website: "",
};

// ─── Field component ────────────────────────────────────────────────────────
function Field({ label, required, hint, error, children, as: Tag, name }) {
  const autoId = useId();
  const dataAttr = name ? { "data-field": name } : {};

  if (Tag === "fieldset") {
    return (
      <fieldset className="pf-group pf-fieldset-group" {...dataAttr}>
        <legend className="pf-label pf-legend">
          {label}
          {required && <span className="pf-req" aria-hidden="true"> *</span>}
        </legend>
        {hint && <p className="pf-hint">{hint}</p>}
        {children}
        {error && <p className="pf-error" role="alert">{error}</p>}
      </fieldset>
    );
  }

  const childType = isValidElement(children) ? children.type : null;
  const isFormControl = childType === "input" || childType === "select" || childType === "textarea";
  const enhanced = isFormControl ? cloneElement(children, { id: autoId }) : children;

  return (
    <div className="pf-group" {...dataAttr}>
      <label
        className="pf-label"
        {...(isFormControl ? { htmlFor: autoId } : {})}
      >
        {label}
        {required && <span className="pf-req" aria-hidden="true"> *</span>}
      </label>
      {hint && <p className="pf-hint">{hint}</p>}
      {enhanced}
      {error && <p className="pf-error" role="alert">{error}</p>}
    </div>
  );
}

export default function ReservarPreservacaoForm({ precos = PRECOS_FALLBACK }) {
  const t = useTranslations("formReserva");
  const locale = useLocale();

  const elementosOpcoes     = t.raw("elementosOpcoes");
  const quadrosExtraOpcoes  = t.raw("quadrosExtraOpcoes");
  const ornamentosOpcoes    = t.raw("ornamentosOpcoes");
  const pendentesOpcoes     = t.raw("pendentesOpcoes");
  const comoConheceuOpcoes  = t.raw("comoConheceuOpcoes");
  const meioContactoOpcoes  = t.raw("meioContactoOpcoes");
  const comoEnviarOpcoes    = t.raw("comoEnviarOpcoes");
  const comoReceberOpcoes   = t.raw("comoReceberOpcoes");
  const tamanhoOpcoes       = t.raw("tamanhoOpcoes");
  const fundoOpcoes         = t.raw("fundoOpcoes");
  const vidroMuseuOpcoes    = t.raw("vidroMuseuOpcoes");
  const tipoEventoOpcoes    = t.raw("tipoEventoOpcoes");

  // "sem extras" (exclusivo) e "Outro" identificados por valor, não por
  // posição — "sem extras" passou a aparecer em último na lista.
  const ELEM_NENHUM = elementosOpcoes.find((o) => o.valor === "Não pretendo incluir extras")?.valor ?? elementosOpcoes[0].valor;
  const ELEM_OUTRO  = elementosOpcoes.find((o) => o.valor.startsWith("Outro"))?.valor ?? elementosOpcoes[elementosOpcoes.length - 1].valor;

  // Valores internos usados para lógica condicional (iguais em PT e EN)
  const QUADROS_SIM    = quadrosExtraOpcoes[1].valor;
  const ORNAMENTOS_SIM = ornamentosOpcoes[1].valor;
  const PENDENTES_SIM  = pendentesOpcoes[1].valor;
  const FLORISTA_VALOR = comoConheceuOpcoes.find((o) => o.valor === "Recomendação de florista")?.valor ?? "Recomendação de florista";
  const OUTRO_VALOR    = comoConheceuOpcoes.find((o) => o.valor === "Outro (especificar abaixo)")?.valor ?? "Outro (especificar abaixo)";
  const VALE_VALOR     = comoConheceuOpcoes.find((o) => o.valor === "Ofereceram-me um Vale-Presente para preservação")?.valor ?? "Ofereceram-me um Vale-Presente para preservação";
  const CASAMENTO_VALOR = tipoEventoOpcoes.find((o) => o.valor === "Casamento")?.valor ?? "Casamento";
  // Identificado por padrão e não por posição — o texto da opção já mudou
  // uma vez e a posição na lista não é garantida.
  const RECOLHA_VALOR   = comoEnviarOpcoes.find((o) => /recolha no local/i.test(o.valor))?.valor ?? "";

  // Hrefs localizados para links internos nos hints
  const comoFuncionaHref = locale === "en" ? "/en/how-it-works" : "/como-funciona";
  const opcoesHref       = locale === "en" ? "/en/options-and-pricing" : "/opcoes-e-precos";
  const termosHref       = locale === "en" ? "/en/terms-and-conditions" : "/termos-e-condicoes";

  const [form, setForm] = useState(INIT);
  // Modal "Ver exemplo" dos extras (minis, ornamentos, pendentes).
  const [exemplo, setExemplo] = useState(null);
  // Vale-presente verificado: { valor, expirado, validade } ou null.
  const [valeInfo, setValeInfo] = useState(null);
  // Rascunho guardado no telemóvel (recupera ao voltar; apaga ao enviar).
  const rascunho = useRascunho("fbr-rascunho-preservacao", form, setForm, INIT);
  const botaoExemplo = (tipo) => (
    <button type="button" className="pf-info-btn" onClick={() => setExemplo(tipo)}>
      <span className="pf-info-icon" aria-hidden="true">i</span>
      {t("exemplos.verExemplo")}
    </button>
  );
  const [errors, setErrors] = useState({});
  const [emailSugestao, setEmailSugestao] = useState(null);
  // Modal "Ver a diferenca" do vidro museu (imagem lado a lado).
  const [vidroModalAberto, setVidroModalAberto] = useState(false);
  const [valeNaoEncontrado, setValeNaoEncontrado] = useState(false);
  const valeVerificadoRef = useRef("");
  const [status, setStatus] = useState("idle");

  // Funil de abandono (Umami): 1 evento na 1ª interacção com cada secção.
  // Comparar as contagens secção a secção (e com "reserva-enviada") mostra
  // onde as pessoas desistem. Sem dados pessoais — só o nome da secção.
  const seccoesVistas = useRef(new Set());
  const marcaSeccao = (nome) => {
    if (seccoesVistas.current.has(nome)) return;
    seccoesVistas.current.add(nome);
    window.umami?.track?.(`reserva-seccao-${nome}`);
  };

  // Quem vem do site do voucher traz ?vale=CODIGO no link ("Reservar agora"):
  // pré-preenche o código e o "como conheceu", eliminando gralhas na origem.
  // Corre uma vez após montar (o URL só existe no browser) e nunca pisa nada
  // que a pessoa já tenha preenchido.
  useEffect(() => {
    const vale = new URLSearchParams(window.location.search).get("vale");
    const codigo = (vale ?? "").trim().toUpperCase().slice(0, 12);
    if (!codigo || !/^[A-Z0-9]+$/.test(codigo)) return;
    setForm((f) => {
      if (f.codigoValePresente.trim() || f.comoConheceu) return f;
      return { ...f, codigoValePresente: codigo, comoConheceu: VALE_VALOR };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Verifica se o código do vale existe (ao sair do campo). Só avisa com a
  // certeza "não existe"; erros de rede/limite ficam em silêncio e nada bloqueia.
  async function verificarVale(valor) {
    const codigo = valor.trim().toUpperCase();
    valeVerificadoRef.current = codigo;
    if (!codigo) {
      setValeNaoEncontrado(false);
      setValeInfo(null);
      return;
    }
    try {
      const res = await fetch("/api/verificar-vale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codigo }),
      });
      const json = res.ok ? await res.json() : null;
      // ignora respostas atrasadas de um código entretanto alterado
      if (valeVerificadoRef.current !== codigo) return;
      setValeNaoEncontrado(json?.existe === false);
      setValeInfo(json?.existe ? { valor: json.valor, expirado: json.expirado, validade: json.validade } : null);
    } catch {
      setValeNaoEncontrado(false);
    }
  }
  // Mapa de confirmação da morada de recolha. Fica fora do `form`
  // porque não é submetido — serve só para ela reconhecer o local.
  // Esc fecha o modal do vidro museu. So regista o listener enquanto
  // esta aberto, para nao apanhar teclas do resto do formulario.
  useEffect(() => {
    if (!vidroModalAberto) return;
    const onKey = (ev) => { if (ev.key === "Escape") setVidroModalAberto(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [vidroModalAberto]);

  const [recolhaCoords, setRecolhaCoords] = useState(null);
  const [moradaEscolhida, setMoradaEscolhida] = useState("");
  const ultimoPlaceIdRef = useRef("");

  // Só há coordenadas para quem escolheu mesmo uma sugestão. Se depois
  // editar o texto à mão, o mapa desaparece sozinho (deixa de haver
  // garantia de que corresponde ao que está escrito).
  async function escolherLugar(sugestao) {
    setMoradaEscolhida(sugestao.full.trim());
    setRecolhaCoords(null);
    ultimoPlaceIdRef.current = sugestao.placeId;
    try {
      const res = await fetch("/api/place-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId: sugestao.placeId, locale }),
      });
      const json = res.ok ? await res.json() : null;
      // Ignora respostas atrasadas de uma morada entretanto trocada.
      if (ultimoPlaceIdRef.current !== sugestao.placeId) return;
      if (json?.location) setRecolhaCoords(json.location);
    } catch {
      // Sem mapa. A morada continua preenchida e nada bloqueia.
    }
  }

  const [turnstileToken, setTurnstileToken] = useState(null);
  const successRef = useRef(null);
  const errorsSummaryRef = useRef(null);

  const FIELD_LABEL_KEYS = {
    nome: "nomeLabel",
    meioContacto: "contactoLabel",
    email: "emailLabel",
    telefone: "telefoneLabel",
    dataEvento: "dataEventoLabel",
    tipoEvento: "tipoEventoLabel", tipoEventoOutro: "tipoEventoOutroLabel",
    nomeNoivos: "nomeNoivosLabel",
    comoEnviarFlores: "enviarFloresLabel",
    recolhaData: "recolhaDataLabel",
    recolhaHora: "recolhaHoraLabel",
    comoReceberQuadro: "receberQuadroLabel",
    tamanhoMoldura: "tamanhoLabel",
    tipoFundo: "fundoLabel",
    vidroMuseu: "vidroMuseuLabel",
    vidroMuseuMini: "vidroMuseuMiniLabel",
    elementosExtra: "elementosLabel",
    elementosExtraOutro: "elementosOutroLabel",
    quadrosExtra: "quadrosExtraLabel",
    quantosQuadros: "quantosQuadrosLabel",
    ornamentosNatal: "ornamentosLabel",
    quantosOrnamentos: "quantosOrnamentosLabel",
    pendentes: "pendentesLabel",
    quantosPendentes: "quantosPendentesLabel",
    comoConheceu: "comoConheceuLabel",
    nomeFlorista: "nomeFlorista",
    comoConheceuOutro: "comoConheceuOutroLabel",
    codigoValePresente: "codigoValeLabel",
    termosCondicoes: "termosResumo",
  };

  const focusField = (key) => {
    const wrapper = document.querySelector(`[data-field="${key}"]`);
    if (!wrapper) return;
    wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
    const focusable = wrapper.querySelector("input, select, textarea");
    focusable?.focus({ preventScroll: true });
  };

  const set = (key, val) => {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === "quadrosExtra"   && val !== QUADROS_SIM)    next.quantosQuadros   = "";
      if (key === "ornamentosNatal" && val !== ORNAMENTOS_SIM) next.quantosOrnamentos = "";
      if (key === "pendentes"       && val !== PENDENTES_SIM)  next.quantosPendentes  = "";
      if (key === "tipoEvento"      && val !== CASAMENTO_VALOR) next.nomeNoivos       = "";
      if (key === "tipoEvento"      && val !== "Outro")           next.tipoEventoOutro  = "";
      // Trocar o método de envio limpa os detalhes da recolha — nunca
      // enviamos dados de uma opção que já não está escolhida.
      if (key === "comoEnviarFlores" && val !== RECOLHA_VALOR) {
        next.recolhaData         = "";
        next.recolhaDataNaoSei   = false;
        next.recolhaMorada       = "";
        next.recolhaMoradaNaoSei = false;
        next.recolhaHoraDe       = "";
        next.recolhaHoraAte      = "";
        next.recolhaHoraNaoSei   = false;
        next.recolhaNotas        = "";
      }
      // "Ainda não sei" esvazia o campo a que pertence.
      if (key === "recolhaDataNaoSei"   && val) next.recolhaData   = "";
      if (key === "recolhaMoradaNaoSei" && val) next.recolhaMorada = "";
      if (key === "recolhaHoraNaoSei"   && val) {
        next.recolhaHoraDe  = "";
        next.recolhaHoraAte = "";
      }
      if (key === "comoConheceu") {
        next.comoConheceuOutro = "";
        next.nomeFlorista = "";
        next.codigoValePresente = "";
      }
      return next;
    });
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
    // Assinalar "Ainda não sei" resolve por si o erro do campo respectivo.
    if (key === "recolhaDataNaoSei" && val) setErrors((e) => { const n = { ...e }; delete n.recolhaData; return n; });
    if (key === "recolhaHoraNaoSei" && val) setErrors((e) => { const n = { ...e }; delete n.recolhaHora; return n; });
  };

  const toggleElemento = (opcao) => {
    setForm((f) => {
      let next;
      if (opcao === ELEM_NENHUM) {
        next = { ...f, elementosExtra: [ELEM_NENHUM], elementosExtraOutro: "" };
      } else {
        const semExclusivo = f.elementosExtra.filter((x) => x !== ELEM_NENHUM);
        if (semExclusivo.includes(opcao)) {
          const removed = semExclusivo.filter((x) => x !== opcao);
          next = {
            ...f,
            elementosExtra: removed,
            elementosExtraOutro: opcao === ELEM_OUTRO ? "" : f.elementosExtraOutro,
          };
        } else {
          next = { ...f, elementosExtra: [...semExclusivo, opcao] };
        }
      }
      return next;
    });
    if (errors.elementosExtra) setErrors((e) => { const n = { ...e }; delete n.elementosExtra; return n; });
  };

  const inp = (key) => ({
    value: form[key],
    onChange: (e) => set(key, e.target.value),
    className: `pf-input${errors[key] ? " pf-input-err" : ""}`,
  });

  const showQuantosQuadros    = form.quadrosExtra    === QUADROS_SIM;
  const showQuantosOrnamentos = form.ornamentosNatal === ORNAMENTOS_SIM;
  const showQuantosPendentes  = form.pendentes       === PENDENTES_SIM;
  const showComoConheceuOutro = form.comoConheceu    === OUTRO_VALOR;
  const showNomeFlorista      = form.comoConheceu    === FLORISTA_VALOR;
  const showCodigoVale        = form.comoConheceu    === VALE_VALOR;
  const valeAplicavel = showCodigoVale && valeInfo && Number.isFinite(valeInfo.valor) && !valeInfo.expirado ? valeInfo.valor : null;
  const showNomeNoivos        = form.tipoEvento      === CASAMENTO_VALOR;
  const showTipoEventoOutro   = form.tipoEvento      === "Outro";
  const showElementosExtraOutro = form.elementosExtra.includes(ELEM_OUTRO);
  const showRecolha           = Boolean(RECOLHA_VALOR) && form.comoEnviarFlores === RECOLHA_VALOR;
  const mostraMapa            = Boolean(recolhaCoords)
    && !form.recolhaMoradaNaoSei
    && form.recolhaMorada.trim() === moradaEscolhida;

  function validate() {
    const e = {};
    if (!form.nome.trim())        e.nome = t("erroCampoObrigatorio");
    if (!form.meioContacto)       e.meioContacto = t("erroEscolhaContacto");
    if (!form.email.trim())       e.email = t("erroCampoObrigatorio");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("erroEmailInvalido");
    if (!form.telefone.trim())    e.telefone = t("erroCampoObrigatorio");
    else if (!/^\+?[\d\s\-()]{1,25}$/.test(form.telefone)) e.telefone = t("erroTelefoneInvalido");
    else {
      const lenErr = phoneLengthError(t, form.telefoneIndicativo, form.telefone);
      if (lenErr) e.telefone = lenErr;
    }
    if (!form.dataEvento)         e.dataEvento = t("erroCampoObrigatorio");
    else {
      const year = parseInt(form.dataEvento.split("-")[0], 10);
      if (isNaN(year) || year < 2020 || year > 2099) e.dataEvento = t("erroDataInvalida");
    }
    if (!form.tipoEvento)         e.tipoEvento = t("erroCampoObrigatorio");
    if (showNomeNoivos && !form.nomeNoivos.trim()) e.nomeNoivos = t("erroCampoObrigatorio");
    if (showTipoEventoOutro && !form.tipoEventoOutro.trim()) e.tipoEventoOutro = t("erroCampoObrigatorio");
    if (!form.comoEnviarFlores)   e.comoEnviarFlores = t("erroCampoObrigatorio");
    // Recolha: nenhum campo é obrigatório. Validamos apenas coerência do
    // que foi preenchido, para não recebermos datas impossíveis.
    if (showRecolha) {
      if (form.recolhaData && form.dataEvento && form.recolhaData < form.dataEvento) {
        e.recolhaData = t("erroRecolhaDataAntesEvento");
      }
      if (form.recolhaHoraDe && form.recolhaHoraAte && form.recolhaHoraAte <= form.recolhaHoraDe) {
        e.recolhaHora = t("erroRecolhaHoraInvertida");
      }
    }
    if (!form.comoReceberQuadro)  e.comoReceberQuadro = t("erroCampoObrigatorio");
    if (!form.tamanhoMoldura)     e.tamanhoMoldura = t("erroCampoObrigatorio");
    if (!form.tipoFundo)          e.tipoFundo = t("erroCampoObrigatorio");
    if (!form.vidroMuseu)         e.vidroMuseu = t("erroCampoObrigatorio");
    // Só obrigatório quando há mini-quadros: o vidro deles é escolha à parte.
    if (showQuantosQuadros && !form.vidroMuseuMini) e.vidroMuseuMini = t("erroCampoObrigatorio");
    if (!form.elementosExtra.length) e.elementosExtra = t("erroSelecioneOpcao");
    if (!form.quadrosExtra)       e.quadrosExtra = t("erroCampoObrigatorio");
    if (showQuantosQuadros) {
      const v = form.quantosQuadros.toString().trim();
      if (!v) e.quantosQuadros = t("erroCampoObrigatorio");
      else if (parseInt(v, 10) < 1) e.quantosQuadros = t("erroQuantidadeMinima");
    }
    if (!form.ornamentosNatal)    e.ornamentosNatal = t("erroCampoObrigatorio");
    if (showQuantosOrnamentos) {
      const v = form.quantosOrnamentos.toString().trim();
      if (!v) e.quantosOrnamentos = t("erroCampoObrigatorio");
      else if (parseInt(v, 10) < 1) e.quantosOrnamentos = t("erroQuantidadeMinima");
    }
    if (!form.pendentes)          e.pendentes = t("erroCampoObrigatorio");
    if (showQuantosPendentes) {
      const v = form.quantosPendentes.toString().trim();
      if (!v) e.quantosPendentes = t("erroCampoObrigatorio");
      else if (parseInt(v, 10) < 1) e.quantosPendentes = t("erroQuantidadeMinima");
    }
    if (!form.comoConheceu)       e.comoConheceu = t("erroCampoObrigatorio");
    if (showNomeFlorista && !form.nomeFlorista.trim())         e.nomeFlorista = t("erroCampoObrigatorio");
    if (showComoConheceuOutro && !form.comoConheceuOutro.trim()) e.comoConheceuOutro = t("erroCampoObrigatorio");
    if (showCodigoVale && !form.codigoValePresente.trim())     e.codigoValePresente = t("erroCampoObrigatorio");
    if (!form.termosCondicoes)    e.termosCondicoes = t("erroTermos");
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      // Que campos travam a submissão (só nomes de campos, sem dados pessoais)
      window.umami?.track?.("reserva-submit-erros", { campos: Object.keys(errs).join(",").slice(0, 400) });
      requestAnimationFrame(() => {
        errorsSummaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        errorsSummaryRef.current?.focus({ preventScroll: true });
      });
      return;
    }
    // Antes o botão ficava disabled sem explicação enquanto o Turnstile não
    // carregava (adblockers/rede lenta deixavam o utilizador preso). Agora o
    // botão está sempre activo e explicamos porque não pode submeter ainda.
    if (TURNSTILE_ENABLED && !turnstileToken) {
      setStatus("turnstile");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/reservar-preservacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          telefone: normalizePhone(form.telefoneIndicativo, form.telefone).full,
          locale,
          turnstileToken,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json));
      rascunho.apagar();
      setStatus("success");
      // Conversão: reserva enviada com sucesso. Aparece no painel do Umami.
      window.umami?.track?.("reserva-enviada");
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (err) {
      console.error("[reservar-preservacao] submit error:", err);
      // Token Turnstile só é válido uma vez — reseta para o cliente
      // conseguir tentar outra vez.
      if (TURNSTILE_ENABLED) {
        resetTurnstile();
        setTurnstileToken(null);
      }
      setStatus("error");
    }
  }

  if (status === "success") {
    const horas = locale === "en" ? "24 hours" : "24 horas";
    return (
      <div className="pf-success" role="status" ref={successRef}>
        <div className="pf-success-icon" aria-hidden="true">✓</div>
        <h2 className="pf-success-title">{t("successTitle")}</h2>
        <p className="pf-success-text">
          {form.meioContacto === "WhatsApp"
            ? t.rich("successContactoWhatsapp", {
                numero: normalizePhone(form.telefoneIndicativo, form.telefone).display,
                email: EMAIL,
                b: (chunks) => <strong>{chunks}</strong>,
              })
            : t.rich("successContactoEmail", {
                email: form.email.trim(),
                emailFbr: EMAIL,
                b: (chunks) => <strong>{chunks}</strong>,
              })}
        </p>
        <p className="pf-success-text">
          {t("successP1", { dias: 3, sinal: "sinal de 30%", horas })}
        </p>
        {eventoDistante(form.dataEvento) && (
          <p className="pf-success-text">{t("successPrioridade")}</p>
        )}
        <p className="pf-success-text">
          {t("successP2")}
        </p>

        <div className="pf-success-resumo">
          <h3 className="pf-success-subtitulo">{t("successResumoTitulo")}</h3>
          <ResumoEncomenda
            form={form}
            precos={precos}
            locale={locale}
            serviceType="preservacao"
            dataEvento={form.dataEvento}
            vale={valeAplicavel}
            codigoVale={form.codigoValePresente}
            semBarra
          />
        </div>
        <div className="pf-success-passos">
          <h3 className="pf-success-subtitulo">{t("successProximosTitulo")}</h3>
          <ol>
            <li>{t("successPasso1")}</li>
            <li>{t("successPasso2")}</li>
            <li>{t("successPasso3")}</li>
          </ol>
        </div>
        <p className="pf-success-closing">
          {t("successClosing")}
          <br />
          <strong>{t("successAssinatura")}</strong>
        </p>
      </div>
    );
  }

  return (
    <>
    <form className="preservacao-form" onSubmit={handleSubmit} noValidate>
      <p className="pf-intro">
        {t("camposObrigatorios")} <span aria-hidden="true" className="pf-req">*</span> {locale === "en" ? "are required." : "são obrigatórios."}
      </p>

      {rascunho.recuperado && (
        <div className="pf-rascunho" role="status">
          <p className="pf-rascunho-texto">
            <strong>{t("rascunhoTitulo")}</strong>
            {t("rascunhoTexto")}
          </p>
          <button type="button" className="pf-rascunho-btn" onClick={rascunho.limpar}>{t("rascunhoLimpar")}</button>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div
          className="pf-errors-summary"
          role="alert"
          tabIndex={-1}
          ref={errorsSummaryRef}
        >
          <p className="pf-errors-summary-title">{t("erroResumoTitulo")}</p>
          <ul className="pf-errors-summary-list">
            {Object.keys(errors).map((key) => {
              const labelKey = FIELD_LABEL_KEYS[key];
              const label = labelKey ? t(labelKey) : key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    className="pf-errors-summary-link"
                    onClick={() => focusField(key)}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ── DADOS PESSOAIS ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-pessoais" onFocus={() => marcaSeccao("pessoais")}>
        <h2 className="pf-section-title" id="sec-pessoais">{t("secDadosPessoais")}</h2>

        <Field name="nome" label={t("nomeLabel")} required error={errors.nome} hint={t("nomeHint")}>
          <input type="text" {...inp("nome")} placeholder={t("nomePlaceholder")} autoComplete="name" />
        </Field>

        <Field name="meioContacto" label={t("contactoLabel")} required error={errors.meioContacto} hint={t("contactoHint")}>
          <select {...inp("meioContacto")}>
            <option value="">{t("escolha")}</option>
            {meioContactoOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field name="email" label={t("emailLabel")} required error={errors.email} hint={t("emailHint")}>
          <div>
            <input
              type="email"
              {...inp("email")}
              onChange={(e) => { set("email", e.target.value); setEmailSugestao(null); }}
              onBlur={() => {
                const limpo = cleanEmail(form.email);
                if (limpo !== form.email) set("email", limpo);
                setEmailSugestao(suggestEmail(limpo));
              }}
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
            />
            {emailSugestao && (
              <button
                type="button"
                className="pf-suggest-btn"
                onClick={() => { set("email", emailSugestao); setEmailSugestao(null); }}
              >
                {t("emailSugestao", { sugestao: emailSugestao })}
              </button>
            )}
          </div>
        </Field>

        <Field name="telefone" label={t("telefoneLabel")} required error={errors.telefone} hint={t("telefoneHint")}>
          <div className="pf-phone-wrap">
            <PhonePrefix
              value={form.telefoneIndicativo}
              onChange={(code) => {
                set("telefoneIndicativo", code);
                if (form.telefone.trim()) {
                  const lenErr = phoneLengthError(t, code, form.telefone);
                  setErrors((prev) => {
                    const n = { ...prev };
                    if (lenErr) n.telefone = lenErr; else delete n.telefone;
                    return n;
                  });
                }
              }}
              btnClassName="pf-input pf-phone-prefix"
            />
            <input
              type="tel"
              {...inp("telefone")}
              onChange={(e) => {
                const el = e.target;
                const r = formatPhoneInput(form.telefoneIndicativo, el.value, form.telefone, el.selectionStart);
                set("telefone", r.value);
                requestAnimationFrame(() => {
                  try { el.setSelectionRange(r.caret, r.caret); } catch {}
                });
              }}
              onBlur={() => {
                if (!form.telefone.trim()) return;
                const lenErr = phoneLengthError(t, form.telefoneIndicativo, form.telefone);
                setErrors((prev) => {
                  const n = { ...prev };
                  if (lenErr) n.telefone = lenErr; else delete n.telefone;
                  return n;
                });
              }}
              className={`pf-input pf-phone-number${errors.telefone ? " pf-input-err" : ""}`}
              placeholder={t("telefonePlaceholder")}
              autoComplete="tel-national"
            />
          </div>
        </Field>
      </div>

      {/* ── O EVENTO ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-evento" onFocus={() => marcaSeccao("evento")}>
        <h2 className="pf-section-title" id="sec-evento">{t("secEvento")}</h2>

        <Field name="dataEvento" label={t("dataEventoLabel")} required error={errors.dataEvento} hint={t("dataEventoHint")}>
          <input type="date" {...inp("dataEvento")} min="2020-01-01" max="2099-12-31" />
        </Field>

        <Field name="tipoEvento" label={t("tipoEventoLabel")} required error={errors.tipoEvento} hint={t("tipoEventoHint")}>
          <select {...inp("tipoEvento")}>
            <option value="">{t("escolha")}</option>
            {tipoEventoOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        {showTipoEventoOutro && (
          <Field name="tipoEventoOutro" label={t("tipoEventoOutroLabel")} required error={errors.tipoEventoOutro}>
            <input type="text" {...inp("tipoEventoOutro")} placeholder={t("tipoEventoOutroPlaceholder")} maxLength={200} />
          </Field>
        )}

        {showNomeNoivos && (
          <Field name="nomeNoivos" label={t("nomeNoivosLabel")} required error={errors.nomeNoivos} hint={t("nomeNoivosHint")}>
            <input type="text" {...inp("nomeNoivos")} placeholder={t("nomeNoivosPlaceholder")} />
          </Field>
        )}

        <Field label={t("localEventoLabel")} error={errors.localEvento} hint={t("localEventoHint")}>
          <input type="text" {...inp("localEvento")} placeholder={t("localEventoPlaceholder")} autoComplete="off" />
        </Field>

        <Field label={t("tipoFloresLabel")} hint={t("tipoFloresHint")}>
          <textarea {...inp("tipoFlores")} rows={4} placeholder={t("tipoFloresPlaceholder")} />
        </Field>
      </div>

      {/* ── ENVIO E RECEPÇÃO ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-logistica" onFocus={() => marcaSeccao("logistica")}>
        <h2 className="pf-section-title" id="sec-logistica">{t("secLogistica")}</h2>

        <Field
          name="comoEnviarFlores"
          label={t("enviarFloresLabel")}
          required
          error={errors.comoEnviarFlores}
          hint={locale === "en"
            ? <>If in doubt, see our <Link href={comoFuncionaHref} className="pf-link" target="_blank" rel="noopener noreferrer">How It Works</Link> page. After booking confirmation, you will receive specific instructions based on the option chosen.</>
            : <>Em caso de dúvida, consulte a nossa página <Link href={comoFuncionaHref} className="pf-link" target="_blank" rel="noopener noreferrer">Como Funciona</Link>. Após a confirmação da reserva, receberá instruções específicas conforme a opção escolhida.</>
          }
        >
          <select {...inp("comoEnviarFlores")}>
            <option value="">{t("escolha")}</option>
            {comoEnviarOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        {/* Detalhes da recolha — só para quem escolhe "Recolha no local".
            Tudo opcional: cada campo tem "Ainda não sei" para separar
            "não sabe" de "saltou", o que a Maria precisa de distinguir
            para orçamentar. Alimentam os campos pickup_* do admin. */}
        {showRecolha && (
          <div className="pf-subblock">
            <h3 className="pf-subblock-title">{t("recolhaTitulo")}</h3>
            <p className="pf-hint">{t("recolhaIntro1")}</p>
            <p className="pf-hint">{t("recolhaIntro2")}</p>

            <Field name="recolhaData" label={t("recolhaDataLabel")} error={errors.recolhaData}>
              <input
                type="date"
                value={form.recolhaData}
                onChange={(e) => set("recolhaData", e.target.value)}
                className={`pf-input${errors.recolhaData ? " pf-input-err" : ""}`}
                // Nunca antes do evento: as flores só existem a partir daí.
                min={form.dataEvento || "2020-01-01"}
                max="2099-12-31"
                disabled={form.recolhaDataNaoSei}
              />
            </Field>
            <label className="pf-check-label pf-naosei">
              <input
                type="checkbox"
                className="pf-checkbox"
                checked={form.recolhaDataNaoSei}
                onChange={(e) => set("recolhaDataNaoSei", e.target.checked)}
              />
              <span>{t("recolhaDataNaoSei")}</span>
            </label>

            <Field
              name="recolhaMorada"
              label={t("recolhaMoradaLabel")}
              hint={form.recolhaMoradaNaoSei ? undefined : t("recolhaMoradaHint")}
            >
              <AddressAutocomplete
                value={form.recolhaMorada}
                onChange={(v) => set("recolhaMorada", v)}
                onSelectPlace={escolherLugar}
                locale={locale}
                placeholder={t("recolhaMoradaPlaceholder")}
                ariaLabel={t("recolhaMoradaLabel")}
                disabled={form.recolhaMoradaNaoSei}
              />
            </Field>

            {/* Mapa de confirmação. Derivado, sem efeitos: basta o texto
                deixar de coincidir com a sugestão escolhida para sumir. */}
            {mostraMapa && (
              <>
                <PickupMap
                  lat={recolhaCoords.lat}
                  lng={recolhaCoords.lng}
                  locale={locale}
                  label={form.recolhaMorada}
                  textoRecentrar={t("recolhaMapaRecentrar")}
                />
                <p className="pf-hint pf-mapa-nota">{t("recolhaMapaNota")}</p>
              </>
            )}
            <label className="pf-check-label pf-naosei">
              <input
                type="checkbox"
                className="pf-checkbox"
                checked={form.recolhaMoradaNaoSei}
                onChange={(e) => set("recolhaMoradaNaoSei", e.target.checked)}
              />
              <span>{t("recolhaMoradaNaoSei")}</span>
            </label>

            <Field
              name="recolhaHora"
              label={t("recolhaHoraLabel")}
              hint={form.recolhaHoraNaoSei ? undefined : t("recolhaHoraHint")}
              error={errors.recolhaHora}
              as="fieldset"
            >
              {/* Cada "palavra + campo" é um par que quebra em conjunto.
                  Sem isto, no telemóvel o "e as" ficava órfão no fim de
                  uma linha e o segundo campo caía sozinho na seguinte. */}
              <div className="pf-hora-wrap">
                <span className="pf-hora-par">
                  <span className="pf-hora-sep">{t("recolhaHoraDe")}</span>
                  <input
                    type="time"
                    aria-label={`${t("recolhaHoraLabel")} ${t("recolhaHoraDe")}`}
                    value={form.recolhaHoraDe}
                    onChange={(e) => set("recolhaHoraDe", e.target.value)}
                    className={`pf-input pf-hora${errors.recolhaHora ? " pf-input-err" : ""}`}
                    disabled={form.recolhaHoraNaoSei}
                  />
                </span>
                <span className="pf-hora-par">
                  <span className="pf-hora-sep">{t("recolhaHoraAte")}</span>
                  <input
                    type="time"
                    aria-label={`${t("recolhaHoraLabel")} ${t("recolhaHoraAte")}`}
                    value={form.recolhaHoraAte}
                    onChange={(e) => set("recolhaHoraAte", e.target.value)}
                    className={`pf-input pf-hora${errors.recolhaHora ? " pf-input-err" : ""}`}
                    disabled={form.recolhaHoraNaoSei}
                  />
                </span>
              </div>
            </Field>
            <label className="pf-check-label pf-naosei">
              <input
                type="checkbox"
                className="pf-checkbox"
                checked={form.recolhaHoraNaoSei}
                onChange={(e) => set("recolhaHoraNaoSei", e.target.checked)}
              />
              <span>{t("recolhaHoraNaoSei")}</span>
            </label>

            <Field name="recolhaNotas" label={t("recolhaNotasLabel")} hint={t("recolhaNotasHint")}>
              <textarea
                value={form.recolhaNotas}
                onChange={(e) => set("recolhaNotas", e.target.value)}
                className="pf-input"
                rows={3}
                placeholder={t("recolhaNotasPlaceholder")}
              />
            </Field>
          </div>
        )}

        <Field
          name="comoReceberQuadro"
          label={t("receberQuadroLabel")}
          required
          error={errors.comoReceberQuadro}
          hint={locale === "en"
            ? <>Learn more about this step on our <Link href={comoFuncionaHref} className="pf-link" target="_blank" rel="noopener noreferrer">How It Works</Link> page. Frames sent by courier are carefully packaged. In-person collection is by appointment.</>
            : <>Saiba mais sobre esta etapa na nossa página <Link href={comoFuncionaHref} className="pf-link" target="_blank" rel="noopener noreferrer">Como Funciona</Link>. O envio pelos CTT é feito com toda a segurança, devidamente embalado. A recolha em mãos é feita mediante agendamento.</>
          }
        >
          <select {...inp("comoReceberQuadro")}>
            <option value="">{t("escolha")}</option>
            {comoReceberOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* ── O QUADRO ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-quadro" onFocus={() => marcaSeccao("quadro")}>
        <h2 className="pf-section-title" id="sec-quadro">{t("secQuadro")}</h2>

        <Field
          name="tamanhoMoldura"
          label={t("tamanhoLabel")}
          required
          error={errors.tamanhoMoldura}
          hint={<>
            {locale === "en" ? "See examples and prices on our " : "Consulte exemplos e valores na nossa página "}
            <Link href={opcoesHref} className="pf-link" target="_blank" rel="noopener noreferrer">
              {locale === "en" ? "Options & Pricing" : "Opções e Preços"}
            </Link>.
          </>}
        >
          <select {...inp("tamanhoMoldura")}>
            <option value="">{t("escolha")}</option>
            {tamanhoOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field
          name="tipoFundo"
          label={t("fundoLabel")}
          required
          error={errors.tipoFundo}
          hint={<>
            {locale === "en" ? "Visit our " : "Consulte a nossa página "}
            <Link href={opcoesHref} className="pf-link" target="_blank" rel="noopener noreferrer">
              {locale === "en" ? "Options & Pricing" : "Opções e Preços"}
            </Link>{" "}
            {t("fundoHintSuffix")}{" "}
            <a href={SOCIAL_INSTAGRAM} className="pf-link" target="_blank" rel="noopener noreferrer">
              {t("fundoHintInstagram")}
            </a>.{" "}
            {t("fundoHintSuffix2")}
          </>}
        >
          <select {...inp("tipoFundo")}>
            <option value="">{t("escolha")}</option>
            {fundoOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field
          name="vidroMuseu"
          label={t("vidroMuseuLabel")}
          required
          error={errors.vidroMuseu}
          hint={<>
            {t("vidroMuseuHint", {
              vidro30x40: precos.vidro30x40,
              vidro40x50: precos.vidro40x50,
              vidro50x70: precos.vidro50x70,
            })}{" "}
            <button
              type="button"
              className="pf-info-btn"
              onClick={() => setVidroModalAberto(true)}
            >
              <span className="pf-info-icon" aria-hidden="true">i</span>
              {t("vidroMuseuVerDiferenca")}
            </button>
          </>}
        >
          <select {...inp("vidroMuseu")}>
            <option value="">{t("escolha")}</option>
            {vidroMuseuOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        {/* Checkbox group — usa fieldset + legend (WCAG) */}
        <Field
          name="elementosExtra"
          label={t("elementosLabel")}
          required
          error={errors.elementosExtra}
          // A frase do custo vai a negrito: é a pergunta que mais fazem.
          hint={t.rich("elementosHint", { b: (chunks) => <strong>{chunks}</strong> })}
          as="fieldset"
        >
          <div className="pf-checkgroup">
            {elementosOpcoes.map((opcao) => (
              <label key={opcao.valor} className="pf-check-label">
                <input
                  type="checkbox"
                  className="pf-checkbox"
                  checked={form.elementosExtra.includes(opcao.valor)}
                  onChange={() => toggleElemento(opcao.valor)}
                />
                <span>{opcao.label}</span>
              </label>
            ))}
          </div>
        </Field>

        {showElementosExtraOutro && (
          <Field name="elementosExtraOutro" label={t("elementosOutroLabel")} error={errors.elementosExtraOutro}>
            <textarea
              value={form.elementosExtraOutro}
              onChange={(e) => set("elementosExtraOutro", e.target.value)}
              className={`pf-input${errors.elementosExtraOutro ? " pf-input-err" : ""}`}
              rows={2}
              placeholder={t("elementosOutroPlaceholder")}
            />
          </Field>
        )}
      </div>

      {/* ── EXTRAS OPCIONAIS ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-extras" onFocus={() => marcaSeccao("extras")}>
        <h2 className="pf-section-title" id="sec-extras">{t("secExtras")}</h2>

        <Field name="quadrosExtra" label={t("quadrosExtraLabel")} required error={errors.quadrosExtra} hint={<>{t("quadrosExtraHint", { mini20x25: precos.mini20x25 })} {botaoExemplo("minis")}</>}>
          <select {...inp("quadrosExtra")}>
            <option value="">{t("escolha")}</option>
            {quadrosExtraOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        {showQuantosQuadros && (
          <Field name="quantosQuadros" label={t("quantosQuadrosLabel")} required error={errors.quantosQuadros}>
            <input type="number" min={1}
              value={form.quantosQuadros}
              onChange={(e) => set("quantosQuadros", e.target.value)}
              className={`pf-input${errors.quantosQuadros ? " pf-input-err" : ""}`}
              placeholder={t("quantosQuadrosPlaceholder")} />
          </Field>
        )}

        {showQuantosQuadros && (
          <Field
            name="vidroMuseuMini"
            label={t("vidroMuseuMiniLabel")}
            required
            error={errors.vidroMuseuMini}
            hint={t("vidroMuseuMiniHint", { vidro20x25: precos.vidro20x25 })}
          >
            <select {...inp("vidroMuseuMini")}>
              <option value="">{t("escolha")}</option>
              {vidroMuseuOpcoes.map((o) => (
                <option key={o.valor} value={o.valor}>{o.label}</option>
              ))}
            </select>
          </Field>
        )}

        <Field name="ornamentosNatal" label={t("ornamentosLabel")} required error={errors.ornamentosNatal} hint={<>{t("ornamentosHint")} {botaoExemplo("ornamentos")}</>}>
          <select {...inp("ornamentosNatal")}>
            <option value="">{t("escolha")}</option>
            {ornamentosOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        {showQuantosOrnamentos && (
          <Field name="quantosOrnamentos" label={t("quantosOrnamentosLabel")} required error={errors.quantosOrnamentos}>
            <input type="number" min={1}
              value={form.quantosOrnamentos}
              onChange={(e) => set("quantosOrnamentos", e.target.value)}
              className={`pf-input${errors.quantosOrnamentos ? " pf-input-err" : ""}`}
              placeholder={t("quantosOrnamentosPlaceholder")} />
          </Field>
        )}

        <Field name="pendentes" label={t("pendentesLabel")} required error={errors.pendentes} hint={<>{t("pendentesHint")} {botaoExemplo("pendentes")}</>}>
          <select {...inp("pendentes")}>
            <option value="">{t("escolha")}</option>
            {pendentesOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        {showQuantosPendentes && (
          <Field name="quantosPendentes" label={t("quantosPendentesLabel")} required error={errors.quantosPendentes}>
            <input type="number" min={1}
              value={form.quantosPendentes}
              onChange={(e) => set("quantosPendentes", e.target.value)}
              className={`pf-input${errors.quantosPendentes ? " pf-input-err" : ""}`}
              placeholder={t("quantosPendentesPlaceholder")} />
          </Field>
        )}
      </div>

      {/* ── OUTROS ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-outros" onFocus={() => marcaSeccao("outros")}>
        <h2 className="pf-section-title" id="sec-outros">{t("secOutros")}</h2>

        <Field name="comoConheceu" label={t("comoConheceuLabel")} required error={errors.comoConheceu}>
          <select {...inp("comoConheceu")}>
            <option value="">{t("escolha")}</option>
            {comoConheceuOpcoes.map((o) => (
              <option key={o.valor} value={o.valor}>{o.label}</option>
            ))}
          </select>
        </Field>

        {showNomeFlorista && (
          <Field name="nomeFlorista" label={t("nomeFlorista")} required error={errors.nomeFlorista}>
            <textarea {...inp("nomeFlorista")} rows={2} placeholder={t("nomeFlorePlaceholder")} />
          </Field>
        )}

        {showComoConheceuOutro && (
          <Field name="comoConheceuOutro" label={t("comoConheceuOutroLabel")} required error={errors.comoConheceuOutro}>
            <textarea {...inp("comoConheceuOutro")} rows={3} />
          </Field>
        )}

        {showCodigoVale && (
          <Field name="codigoValePresente" label={t("codigoValeLabel")} required error={errors.codigoValePresente} hint={t("codigoValeHint")}>
            <div>
              <input
                type="text"
                {...inp("codigoValePresente")}
                onChange={(e) => { set("codigoValePresente", e.target.value); setValeNaoEncontrado(false); setValeInfo(null); }}
                onBlur={() => {
                  const limpo = form.codigoValePresente.trim().toUpperCase().replace(/\s+/g, "");
                  if (limpo !== form.codigoValePresente) set("codigoValePresente", limpo);
                  verificarVale(limpo);
                }}
                placeholder={t("codigoValePlaceholder")}
                autoComplete="off"
                maxLength={20}
              />
              {valeNaoEncontrado && (
                <p className="pf-error" role="status">{t("valeNaoEncontrado")}</p>
              )}
              {valeInfo && valeInfo.valor != null && (
                <p className={valeInfo.expirado ? "pf-error" : "pf-vale-ok"} role="status">
                  {t(valeInfo.expirado ? "valeExpirado" : "valeEncontrado", {
                    valor: formatEuro(valeInfo.valor),
                    validade: formatDataCurta(valeInfo.validade, locale),
                  })}
                </p>
              )}
            </div>
          </Field>
        )}

        <Field label={t("notasLabel")} hint={t("notasHint")}>
          <textarea {...inp("notasAdicionais")} rows={4} placeholder={t("notasPlaceholder")} />
        </Field>
      </div>

      {/* ── RESUMO DA ENCOMENDA ──
          Ao vivo: cada escolha lá em cima aparece aqui com o seu valor, as
          três fases de pagamento e a previsão de entrega. A aceitação dos
          Termos fica aqui, mesmo antes de submeter, para a pessoa ler o
          total e o prazo antes de aceitar. */}
      <div className="pf-section" role="group" aria-labelledby="sec-resumo" onFocus={() => marcaSeccao("resumo")}>
        <h2 className="pf-section-title" id="sec-resumo">{t("resumo.titulo")}</h2>
        <ResumoEncomenda
          form={form}
          precos={precos}
          locale={locale}
          serviceType="preservacao"
          dataEvento={form.dataEvento}
          vale={valeAplicavel}
          codigoVale={form.codigoValePresente}
        />
        <div className="pf-resumo-termos">
        <div className="pf-group" data-field="termosCondicoes">
          <label className="pf-check-label pf-termos-label">
            <input
              type="checkbox"
              className="pf-checkbox"
              checked={form.termosCondicoes}
              onChange={(e) => {
                set("termosCondicoes", e.target.checked);
                if (errors.termosCondicoes) setErrors((err) => { const n = { ...err }; delete n.termosCondicoes; return n; });
              }}
            />
            <span>
              {t("termosLabel")}{" "}
              <Link href={termosHref} className="pf-link" target="_blank" rel="noopener noreferrer">
                {t("termosLink")}
              </Link>
              <span className="pf-req" aria-hidden="true"> *</span>
            </span>
          </label>
          {errors.termosCondicoes && (
            <p className="pf-error" role="alert">{errors.termosCondicoes}</p>
          )}
        </div>
        </div>
      </div>

      {/* Honeypot anti-spam — oculto para utilizadores, visível para bots */}
      <div className="pf-hp-field" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <TurnstileWidget onToken={setTurnstileToken} language={locale} />

      {status === "error" && (
        <p className="pf-submit-error" role="alert">
          {t("erroEnvio")}{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}
      {status === "turnstile" && (
        <p className="pf-submit-error" role="alert">
          {t("erroTurnstile")}
        </p>
      )}

      <button
        type="submit"
        className="pf-btn"
        disabled={status === "loading"}
      >
        {status === "loading" ? t("submitLoading") : t("submitBtn")}
      </button>
    </form>

    {/* Modal "Ver a diferença" do vidro museu. A mesma imagem lado a lado
        que está na página Opções e Preços: à esquerda vidro normal, à
        direita UltraVue®. É a pergunta que os clientes mais fazem sobre
        esta opção, e uma fotografia explica-a melhor do que um parágrafo. */}
    <ExemploModal
      tipo={exemplo}
      onFechar={() => setExemplo(null)}
      titulo={exemplo ? t(`exemplos.${exemplo}Titulo`) : ""}
      desc={exemplo ? t(`exemplos.${exemplo}Desc`) : ""}
      fechar={t("exemplos.fechar")}
    />

    {vidroModalAberto && (
      <div
        className="pf-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vidro-modal-titulo"
        onClick={() => setVidroModalAberto(false)}
      >
        {/* Clique dentro do painel não fecha o modal. */}
        <div className="pf-modal" onClick={(ev) => ev.stopPropagation()}>
          <h2 className="pf-modal-titulo" id="vidro-modal-titulo">
            {t("vidroMuseuModalTitulo")}
          </h2>
          <div className="pf-modal-img">
            <Image
              src="/quadros-flores-preservadas-lado-a-lado.webp"
              alt={t("vidroMuseuModalDesc")}
              width={640}
              height={640}
              sizes="(max-width: 640px) 90vw, 460px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div className="pf-modal-legenda">
              <span>{t("vidroMuseuLabelNormal")}</span>
              <strong>UltraVue®</strong>
            </div>
          </div>
          <p className="pf-modal-desc">{t("vidroMuseuModalDesc")}</p>
          <button
            type="button"
            className="pf-modal-fechar"
            onClick={() => setVidroModalAberto(false)}
          >
            {t("vidroMuseuModalFechar")}
          </button>
        </div>
      </div>
    )}
    </>
  );
}
