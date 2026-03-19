"use client";

import { useState } from "react";

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

  const set = (key, val) => {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === "meioContacto" && val !== "WhatsApp") next.telefone = "";
      if (key === "entrega" || key === "tipoVale") {
        next.morada = "";
        next.contactoDestinatario = "";
        next.dataEnvio = "";
      }
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

  const showTelefone = form.meioContacto === "WhatsApp";
  const showMorada = form.entrega === "Diretamente ao destinatário" && form.tipoVale === "Físico cartão com envelope";
  const showContactoDestinatario = form.entrega === "Diretamente ao destinatário" && form.tipoVale === "Por email/WhatsApp";
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
    if (showMorada && !form.morada.trim()) e.morada = "Campo obrigatório.";
    if (showContactoDestinatario && !form.contactoDestinatario.trim()) e.contactoDestinatario = "Campo obrigatório.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector(".vf-input-err, [role='alert']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
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
      console.log("[vale-presente] API response:", res.status, json);
      if (!res.ok) throw new Error(JSON.stringify(json));
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("[vale-presente] submit error:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="vf-success" role="status">
        <div className="vf-success-icon" aria-hidden="true">✓</div>
        <h2 className="vf-success-title">Formulário enviado!</h2>
        <p className="vf-success-text">
          Receberá em breve um e-mail com a confirmação dos dados e as instruções
          de pagamento. Obrigada por escolher a Flores à Beira-Rio.
        </p>
      </div>
    );
  }

  return (
    <form className="vale-form" onSubmit={handleSubmit} noValidate>

      {/* ── REMETENTE ── */}
      <div className="vf-section">
        <h3 className="vf-section-title">Dados do remetente</h3>

        <Field label="Nome" required error={errors.nome}>
          <input type="text" {...inp("nome")} placeholder="O seu nome completo" autoComplete="name" />
        </Field>

        <Field label="Como prefere que comuniquemos consigo?" required error={errors.meioContacto}>
          <select {...inp("meioContacto")}>
            <option value="">Escolha...</option>
            <option value="Email">E-mail</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </Field>

        {showTelefone && (
          <Field
            label="Número de telemóvel"
            required
            error={errors.telefone}
            hint="Todas as comunicações serão feitas para este número. Certifique-se de que o introduz correctamente."
          >
            <input type="tel" {...inp("telefone")} placeholder="+351 912 345 678" autoComplete="tel" />
          </Field>
        )}

        <Field
          label="E-mail de contacto"
          required
          error={errors.email}
          hint={
            form.meioContacto === "WhatsApp"
              ? "Mesmo preferindo WhatsApp, pedimos um e-mail como contacto alternativo."
              : "Todas as comunicações serão feitas para este e-mail. Certifique-se de que o introduz correctamente."
          }
        >
          <input type="email" {...inp("email")} placeholder="email@exemplo.pt" autoComplete="email" />
        </Field>
      </div>

      {/* ── O VALE ── */}
      <div className="vf-section">
        <h3 className="vf-section-title">O vale</h3>

        <Field
          label="Nome da(s) pessoa(s) a quem se destina o vale"
          required
          error={errors.nomeDestinatario}
          hint="Este nome será utilizado para personalizar o vale."
        >
          <input type="text" {...inp("nomeDestinatario")} placeholder="Nome do destinatário" />
        </Field>

        <Field
          label="Mensagem personalizada (opcional)"
          hint="Esta mensagem será incluída no vale, se desejado."
        >
          <textarea
            {...inp("mensagem")}
            rows={4}
            placeholder="Ex: Para a Inês: Que as tuas flores durem tanto quanto a memória deste dia especial."
          />
        </Field>

        <Field
          label="Valor do vale (€)"
          required
          error={errors.valorVale}
          hint="Valor mínimo: 300€. Consulte as opções e preços no nosso site."
        >
          <input type="number" {...inp("valorVale")} min={300} step={1} placeholder="300" />
        </Field>
      </div>

      {/* ── ENTREGA ── */}
      <div className="vf-section">
        <h3 className="vf-section-title">Entrega</h3>

        <Field label="Quero que o vale seja entregue" required error={errors.entrega}>
          <select {...inp("entrega")}>
            <option value="">Escolha...</option>
            <option value="Ao remetente">Ao remetente</option>
            <option value="Diretamente ao destinatário">Diretamente ao destinatário</option>
          </select>
        </Field>

        <Field
          label="Tipo de vale"
          required
          error={errors.tipoVale}
          hint="Enviamos o vale por e-mail/WhatsApp gratuitamente, ou fisicamente por 9€ + portes (envelope incluído). Levantamento em Coimbra: 9€ sem portes."
        >
          <select {...inp("tipoVale")}>
            <option value="">Escolha...</option>
            <option value="Por email/WhatsApp">Digital — por e-mail ou WhatsApp (gratuito)</option>
            <option value="Físico cartão com envelope">Físico — cartão com envelope (9€ + portes)</option>
          </select>
        </Field>

        {showMorada && (
          <Field label="Morada de envio do destinatário" required error={errors.morada}>
            <textarea
              {...inp("morada")}
              rows={3}
              placeholder="Rua, número, andar, código postal, localidade"
            />
          </Field>
        )}

        {showContactoDestinatario && (
          <Field
            label="E-mail ou WhatsApp do destinatário"
            required
            error={errors.contactoDestinatario}
            hint="Este contacto será utilizado apenas para enviar o vale."
          >
            <input
              type="text"
              {...inp("contactoDestinatario")}
              placeholder="email@exemplo.pt ou +351 912 345 678"
            />
          </Field>
        )}

        {showDataEnvio && (
          <Field
            label={
              showMorada
                ? "Data ideal para envio do vale físico por correio"
                : "Data ideal para envio do vale digital"
            }
            hint="Caso seja indiferente, deixe em branco."
          >
            <input type="date" {...inp("dataEnvio")} min={today} />
          </Field>
        )}
      </div>

      {/* ── OUTROS ── */}
      <div className="vf-section">
        <h3 className="vf-section-title">Outros</h3>

        <Field label="Comentários ou pedidos especiais (opcional)">
          <textarea
            {...inp("comentarios")}
            rows={4}
            placeholder="Se tiver algum comentário ou pedido especial, escreva aqui."
          />
        </Field>

        <Field label="Como conheceu a Flores à Beira-Rio?">
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

      {status === "error" && (
        <p className="vf-submit-error" role="alert">
          Ocorreu um erro ao enviar o formulário. Por favor, tente novamente ou
          contacte-nos directamente.
        </p>
      )}

      <button type="submit" className="vf-btn" disabled={status === "loading"}>
        {status === "loading" ? "A enviar..." : "Enviar pedido"}
      </button>
    </form>
  );
}
