"use client";

import { useState, useRef, useId, isValidElement, cloneElement } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SOCIAL_INSTAGRAM, EMAIL } from "../_lib/constants";
import PhonePrefix from "../_components/PhonePrefix";
import TurnstileWidget, { resetTurnstile } from "../_components/TurnstileWidget";

const TURNSTILE_ENABLED = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

const INIT = {
  nome: "",
  meioContacto: "",
  email: "",
  telefoneIndicativo: "+351",
  telefone: "",
  dataEvento: "",
  tipoEvento: "",
  nomeNoivos: "",
  localEvento: "",
  tipoFlores: "",
  comoEnviarFlores: "",
  comoReceberQuadro: "",
  tamanhoMoldura: "",
  tipoFundo: "",
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

export default function ReservarPreservacaoForm() {
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
  const tipoEventoOpcoes    = t.raw("tipoEventoOpcoes");

  // O primeiro elemento é o exclusivo "sem extras"; o último é "Outro"
  const ELEM_NENHUM = elementosOpcoes[0].valor;
  const ELEM_OUTRO  = elementosOpcoes[elementosOpcoes.length - 1].valor;

  // Valores internos usados para lógica condicional (iguais em PT e EN)
  const QUADROS_SIM    = quadrosExtraOpcoes[1].valor;
  const ORNAMENTOS_SIM = ornamentosOpcoes[1].valor;
  const PENDENTES_SIM  = pendentesOpcoes[1].valor;
  const FLORISTA_VALOR = comoConheceuOpcoes.find((o) => o.valor === "Recomendação de florista")?.valor ?? "Recomendação de florista";
  const OUTRO_VALOR    = comoConheceuOpcoes.find((o) => o.valor === "Outro (especificar abaixo)")?.valor ?? "Outro (especificar abaixo)";
  const VALE_VALOR     = comoConheceuOpcoes.find((o) => o.valor === "Ofereceram-me um Vale-Presente para preservação")?.valor ?? "Ofereceram-me um Vale-Presente para preservação";
  const CASAMENTO_VALOR = tipoEventoOpcoes.find((o) => o.valor === "Casamento")?.valor ?? "Casamento";

  // Hrefs localizados para links internos nos hints
  const comoFuncionaHref = locale === "en" ? "/en/how-it-works" : "/como-funciona";
  const opcoesHref       = locale === "en" ? "/en/options-and-pricing" : "/opcoes-e-precos";
  const termosHref       = locale === "en" ? "/en/terms-and-conditions" : "/termos-e-condicoes";

  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const successRef = useRef(null);
  const errorsSummaryRef = useRef(null);

  const FIELD_LABEL_KEYS = {
    nome: "nomeLabel",
    meioContacto: "contactoLabel",
    email: "emailLabel",
    telefone: "telefoneLabel",
    dataEvento: "dataEventoLabel",
    tipoEvento: "tipoEventoLabel",
    nomeNoivos: "nomeNoivosLabel",
    comoEnviarFlores: "enviarFloresLabel",
    comoReceberQuadro: "receberQuadroLabel",
    tamanhoMoldura: "tamanhoLabel",
    tipoFundo: "fundoLabel",
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
      if (key === "comoConheceu") {
        next.comoConheceuOutro = "";
        next.nomeFlorista = "";
        next.codigoValePresente = "";
      }
      return next;
    });
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
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
  const showNomeNoivos        = form.tipoEvento      === CASAMENTO_VALOR;
  const showElementosExtraOutro = form.elementosExtra.includes(ELEM_OUTRO);

  function validate() {
    const e = {};
    if (!form.nome.trim())        e.nome = t("erroCampoObrigatorio");
    if (!form.meioContacto)       e.meioContacto = t("erroEscolhaContacto");
    if (!form.email.trim())       e.email = t("erroCampoObrigatorio");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("erroEmailInvalido");
    if (!form.telefone.trim())    e.telefone = t("erroCampoObrigatorio");
    else if (!/^\+?[\d\s\-]{7,20}$/.test(form.telefone)) e.telefone = t("erroTelefoneInvalido");
    if (!form.dataEvento)         e.dataEvento = t("erroCampoObrigatorio");
    else {
      const year = parseInt(form.dataEvento.split("-")[0], 10);
      if (isNaN(year) || year < 2020 || year > 2099) e.dataEvento = t("erroDataInvalida");
    }
    if (!form.tipoEvento)         e.tipoEvento = t("erroCampoObrigatorio");
    if (showNomeNoivos && !form.nomeNoivos.trim()) e.nomeNoivos = t("erroCampoObrigatorio");
    if (!form.comoEnviarFlores)   e.comoEnviarFlores = t("erroCampoObrigatorio");
    if (!form.comoReceberQuadro)  e.comoReceberQuadro = t("erroCampoObrigatorio");
    if (!form.tamanhoMoldura)     e.tamanhoMoldura = t("erroCampoObrigatorio");
    if (!form.tipoFundo)          e.tipoFundo = t("erroCampoObrigatorio");
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
      requestAnimationFrame(() => {
        errorsSummaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        errorsSummaryRef.current?.focus({ preventScroll: true });
      });
      return;
    }
    if (TURNSTILE_ENABLED && !turnstileToken) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/reservar-preservacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          telefone: form.telefone.trim()
            ? `${form.telefoneIndicativo}${form.telefone.trim()}`
            : "",
          locale,
          turnstileToken,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json));
      setStatus("success");
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
          {t("successP1", { dias: 3, sinal: "sinal de 30%", horas })}
        </p>
        <p className="pf-success-text">
          {t("successP2")}
        </p>
        <p className="pf-success-closing">
          {t("successClosing")}
          <br />
          <strong>{t("successAssinatura")}</strong>
        </p>
      </div>
    );
  }

  return (
    <form className="preservacao-form" onSubmit={handleSubmit} noValidate>
      <p className="pf-intro">
        {t("camposObrigatorios")} <span aria-hidden="true" className="pf-req">*</span> {locale === "en" ? "are required." : "são obrigatórios."}
      </p>

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
      <div className="pf-section" role="group" aria-labelledby="sec-pessoais">
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
          <input type="email" {...inp("email")} placeholder={t("emailPlaceholder")} autoComplete="email" />
        </Field>

        <Field name="telefone" label={t("telefoneLabel")} required error={errors.telefone} hint={t("telefoneHint")}>
          <div className="pf-phone-wrap">
            <PhonePrefix
              value={form.telefoneIndicativo}
              onChange={(code) => set("telefoneIndicativo", code)}
              btnClassName="pf-input pf-phone-prefix"
            />
            <input
              type="tel"
              {...inp("telefone")}
              className={`pf-input pf-phone-number${errors.telefone ? " pf-input-err" : ""}`}
              placeholder={t("telefonePlaceholder")}
              autoComplete="tel-national"
            />
          </div>
        </Field>
      </div>

      {/* ── O EVENTO ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-evento">
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
      <div className="pf-section" role="group" aria-labelledby="sec-logistica">
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
      <div className="pf-section" role="group" aria-labelledby="sec-quadro">
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

        {/* Checkbox group — usa fieldset + legend (WCAG) */}
        <Field
          name="elementosExtra"
          label={t("elementosLabel")}
          required
          error={errors.elementosExtra}
          hint={t("elementosHint")}
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
      <div className="pf-section" role="group" aria-labelledby="sec-extras">
        <h2 className="pf-section-title" id="sec-extras">{t("secExtras")}</h2>

        <Field name="quadrosExtra" label={t("quadrosExtraLabel")} required error={errors.quadrosExtra} hint={t("quadrosExtraHint")}>
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

        <Field name="ornamentosNatal" label={t("ornamentosLabel")} required error={errors.ornamentosNatal} hint={t("ornamentosHint")}>
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

        <Field name="pendentes" label={t("pendentesLabel")} required error={errors.pendentes} hint={t("pendentesHint")}>
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
      <div className="pf-section" role="group" aria-labelledby="sec-outros">
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
            <input type="text" {...inp("codigoValePresente")} placeholder={t("codigoValePlaceholder")} autoComplete="off" maxLength={20} />
          </Field>
        )}

        <Field label={t("notasLabel")} hint={t("notasHint")}>
          <textarea {...inp("notasAdicionais")} rows={4} placeholder={t("notasPlaceholder")} />
        </Field>

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

      <button
        type="submit"
        className="pf-btn"
        disabled={status === "loading" || (TURNSTILE_ENABLED && !turnstileToken)}
      >
        {status === "loading" ? t("submitLoading") : t("submitBtn")}
      </button>
    </form>
  );
}
