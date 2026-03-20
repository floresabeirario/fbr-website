"use client";

import { useState, useRef } from "react";

const INIT = {
  nome: "",
  meioContacto: "",
  telefone: "",
  email: "",
  nomeDestinatario: "",
  mensagem: "",
  valorVale: "",
  entrega: "",
  tipoVale: "",
  entregaRemetenteComo: "",
  morada: "",
  contactoDestinatario: "",
  dataEnvio: "",
  comentarios: "",
  comoConheceu: "",
  comoConheceuOutro: "",
  nomeFlorista: "",
};

function Field({ label, required, hint, error, children }) {
  return (
    <div className="vf-group">
      <label className="vf-label">
        {label}
        {required && <span className="vf-req" aria-hidden="true"> *</span>}
      </label>
      {hint && <p className="vf-hint">{hint}</p>}
      {children}
      {error && <p className="vf-error" role="alert">{error}</p>}
    </div>
  );
}

export default function ValeApresenteForm() {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const successRef = useRef(null);

  const set = (key, val) => {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === "meioContacto" && val !== "WhatsApp") next.telefone = "";
      if (key === "entrega" || key === "tipoVale") {
        next.entregaRemetenteComo = "";
        next.morada = "";
        next.contactoDestinatario = "";
        next.dataEnvio = "";
      }
      if (key === "entregaRemetenteComo" && val !== "Por correio") next.morada = "";
      if (key === "comoConheceu") {
        next.comoConheceuOutro = "";
        next.nomeFlorista = "";
      }
      return next;
    });
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const inp = (key) => ({
    value: form[key],
    onChange: (e) => set(key, e.target.value),
    className: `vf-input${errors[key] ? " vf-input-err" : ""}`,
  });

  const isFisico = form.tipoVale === "Físico - cartão com envelope";
  const showTelefone = form.meioContacto === "WhatsApp";
  const showEntregaRemetenteComo = form.entrega === "Ao remetente" && isFisico;
  const showMoradaRemetente = showEntregaRemetenteComo && form.entregaRemetenteComo === "Por correio";
  const showMoradaDestinatario = form.entrega === "Diretamente ao destinatário" && isFisico;
  const showMorada = showMoradaRemetente || showMoradaDestinatario;
  const showContactoDestinatario = form.entrega === "Diretamente ao destinatário" && form.tipoVale === "Por email / WhatsApp";
  const showDataEnvio = showMorada || showContactoDestinatario;
  const showComoConheceuOutro = form.comoConheceu === "Outro (especificar abaixo)";
  const showNomeFlorista = form.comoConheceu === "Recomendação de florista";
  const today = new Date().toISOString().split("T")[0];

  function validate() {
    const e = {};
    if (!form.nome.trim()) e.nome = "Campo obrigatório.";
    if (!form.meioContacto) e.meioContacto = "Escolha um meio de contacto.";
    if (showTelefone && !form.telefone.trim()) e.telefone = "Campo obrigatório.";
    if (!form.email.trim()) e.email = "Campo obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido.";
    if (!form.nomeDestinatario.trim()) e.nomeDestinatario = "Campo obrigatório.";
    if (!form.valorVale) e.valorVale = "Campo obrigatório.";
    else if (Number(form.valorVale) < 300) e.valorVale = "O valor mínimo é 300€.";
    if (!form.entrega) e.entrega = "Campo obrigatório.";
    if (!form.tipoVale) e.tipoVale = "Campo obrigatório.";
    if (showEntregaRemetenteComo && !form.entregaRemetenteComo) e.entregaRemetenteComo = "Campo obrigatório.";
    if (showMorada && !form.morada.trim()) e.morada = "Campo obrigatório.";
    if (showContactoDestinatario && !form.contactoDestinatario.trim()) e.contactoDestinatario = "Campo obrigatório.";
    if (form.dataEnvio) {
      const year = parseInt(form.dataEnvio.split("-")[0], 10);
      if (isNaN(year) || year < 2020 || year > 2099) e.dataEnvio = "Data inválida. Verifique o ano introduzido.";
    }
    if (!form.comoConheceu) e.comoConheceu = "Campo obrigatório.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector(".vf-input-err, [role='alert']")
        ?.closest(".vf-group")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/vale-presente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json));
      setStatus("success");
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (err) {
      console.error("[vale-presente] submit error:", err);
      setStatus("error");
    }
  }

  const contactoLabel = form.meioContacto === "WhatsApp" ? "WhatsApp" : "e-mail";

  if (status === "success") {
    return (
      <div className="vf-success" role="status" ref={successRef}>
        <div className="vf-success-icon" aria-hidden="true">✓</div>
        <h2 className="vf-success-title">Pedido enviado!</h2>
        <p className="vf-success-text">
          Entraremos em contacto por {contactoLabel} em breve com a confirmação dos dados
          e as <strong>instruções de pagamento</strong>.
          Só avançamos com a produção do vale <strong>após o pagamento</strong>.{" "}
          Obrigado por escolher a Flores à Beira-Rio.
        </p>
      </div>
    );
  }

  return (
    <form className="vale-form" onSubmit={handleSubmit} noValidate>
      <p className="vf-intro">
        Campos assinalados com <span aria-hidden="true" className="vf-req">*</span> são obrigatórios.
      </p>

      {/* ── REMETENTE ── */}
      <div className="vf-section" role="group" aria-labelledby="sec-remetente">
        <h2 className="vf-section-title" id="sec-remetente">Dados do remetente</h2>

        <Field label="Nome" required error={errors.nome}>
          <input type="text" {...inp("nome")} placeholder="O seu nome completo" autoComplete="name" />
        </Field>

        <Field label="Como prefere ser contactado/a?" required error={errors.meioContacto}>
          <select {...inp("meioContacto")}>
            <option value="">Escolha...</option>
            <option value="E-mail">E-mail</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </Field>

        {showTelefone && (
          <Field label="Número de telemóvel" required error={errors.telefone}
            hint="Todas as comunicações serão feitas para este número.">
            <input type="tel" {...inp("telefone")} placeholder="+351 912 345 678" autoComplete="tel" />
          </Field>
        )}

        <Field label="E-mail de contacto" required error={errors.email}
          hint={form.meioContacto === "WhatsApp" ? "Pedimos um e-mail como contacto alternativo." : undefined}>
          <input type="email" {...inp("email")} placeholder="email@exemplo.pt" autoComplete="email" />
        </Field>
      </div>

      {/* ── O VALE ── */}
      <div className="vf-section" role="group" aria-labelledby="sec-vale">
        <h2 className="vf-section-title" id="sec-vale">O vale</h2>

        <Field label="Nome da(s) pessoa(s) a quem se destina" required error={errors.nomeDestinatario}
          hint="Este nome será utilizado para personalizar o vale.">
          <input type="text" {...inp("nomeDestinatario")} placeholder="Nome do destinatário" />
        </Field>

        <Field label="Mensagem personalizada (opcional)" hint="Será incluída no vale, se desejado.">
          <textarea {...inp("mensagem")} rows={4}
            placeholder="Ex: Para a Inês: Que as tuas flores durem tanto quanto a memória deste dia especial." />
        </Field>

        <Field label="Valor do vale (€)" required error={errors.valorVale}
          hint="Valor mínimo: 300€.">
          <input type="number" {...inp("valorVale")} min={300} step={1} placeholder="300" />
        </Field>
      </div>

      {/* ── ENTREGA ── */}
      <div className="vf-section" role="group" aria-labelledby="sec-entrega">
        <h2 className="vf-section-title" id="sec-entrega">Entrega</h2>

        <Field label="Quero que o vale seja entregue a" required error={errors.entrega}>
          <select {...inp("entrega")}>
            <option value="">Escolha...</option>
            <option value="Ao remetente">Mim (remetente)</option>
            <option value="Diretamente ao destinatário">Diretamente ao destinatário</option>
          </select>
        </Field>

        <Field label="Tipo de vale" required error={errors.tipoVale}
          hint="Digital: gratuito. Físico (cartão com envelope): 9€ + portes ou levantamento em Coimbra (9€).">
          <select {...inp("tipoVale")}>
            <option value="">Escolha...</option>
            <option value="Por email / WhatsApp">Digital - por e-mail ou WhatsApp (gratuito)</option>
            <option value="Físico - cartão com envelope">Físico - cartão com envelope (9€ + portes)</option>
          </select>
        </Field>

        {showEntregaRemetenteComo && (
          <Field label="Como prefere receber o vale físico?" required error={errors.entregaRemetenteComo}>
            <select {...inp("entregaRemetenteComo")}>
              <option value="">Escolha...</option>
              <option value="Em mãos em Coimbra">Levantamento em mãos em Coimbra (gratuito)</option>
              <option value="Por correio">Por correio (portes a cargo do remetente)</option>
            </select>
          </Field>
        )}

        {showMorada && (
          <Field
            label={showMoradaDestinatario ? "Morada de envio do destinatário" : "A sua morada para envio"}
            required error={errors.morada}>
            <textarea {...inp("morada")} rows={3}
              placeholder="Rua, número, andar, código postal, localidade" />
          </Field>
        )}

        {showContactoDestinatario && (
          <Field label="E-mail ou WhatsApp do destinatário" required error={errors.contactoDestinatario}
            hint="Utilizado apenas para enviar o vale.">
            <input type="text" {...inp("contactoDestinatario")}
              placeholder="email@exemplo.pt ou +351 912 345 678" />
          </Field>
        )}

        {showDataEnvio && (
          <Field
            label={showMoradaDestinatario || showMoradaRemetente
              ? "Data ideal para envio por correio"
              : "Data ideal para envio do vale digital"}
            hint="Deixe em branco se for indiferente.">
            <input type="date" {...inp("dataEnvio")} min={today} max="2099-12-31" />
          </Field>
        )}
      </div>

      {/* ── OUTROS ── */}
      <div className="vf-section" role="group" aria-labelledby="sec-outros">
        <h2 className="vf-section-title" id="sec-outros">Outros</h2>

        <Field label="Comentários ou pedidos especiais (opcional)">
          <textarea {...inp("comentarios")} rows={3}
            placeholder="Se tiver algum comentário ou pedido especial, escreva aqui." />
        </Field>

        <Field label="Como conheceu a Flores à Beira-Rio?" required error={errors.comoConheceu}>
          <select {...inp("comoConheceu")}>
            <option value="">Escolha...</option>
            <option value="Recomendação de alguém que já contratou o serviço anteriormente">Recomendação de alguém que já contratou o serviço</option>
            <option value="Através do Instagram">Através do Instagram</option>
            <option value="Através do Facebook">Através do Facebook</option>
            <option value="Através do casamentos.pt">Através do casamentos.pt</option>
            <option value="Pesquisa no Google">Pesquisa no Google</option>
            <option value="Recomendação de florista">Recomendação de florista</option>
            <option value="Outro (especificar abaixo)">Outro (especificar abaixo)</option>
          </select>
        </Field>

        {showNomeFlorista && (
          <Field label="Qual o nome da florista que lhe falou de nós?">
            <textarea {...inp("nomeFlorista")} rows={2} />
          </Field>
        )}

        {showComoConheceuOutro && (
          <Field label="Conte-nos como conheceu a Flores à Beira-Rio">
            <textarea {...inp("comoConheceuOutro")} rows={3} />
          </Field>
        )}
      </div>

      {Object.keys(errors).length > 0 && (
        <p className="vf-errors-summary" role="alert">
          Existem campos por preencher ou com erros. Por favor, verifique o formulário acima antes de submeter.
        </p>
      )}

      {status === "error" && (
        <p className="vf-submit-error" role="alert">
          Ocorreu um erro ao enviar. Por favor, tente novamente ou contacte-nos directamente.
        </p>
      )}

      <button type="submit" className="vf-btn" disabled={status === "loading"}>
        {status === "loading" ? "A enviar..." : "Enviar pedido"}
      </button>
    </form>
  );
}
