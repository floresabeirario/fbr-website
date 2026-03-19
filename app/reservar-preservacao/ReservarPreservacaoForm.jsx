"use client";

import { useState } from "react";
import Link from "next/link";
import { SOCIAL_INSTAGRAM } from "../_lib/constants";

const ELEMENTOS_OPTIONS = [
  "Não pretendo incluir extras",
  "Votos manuscritos",
  "Convite do casamento",
  "Fitas, tecidos ou rendas",
  "Fotografia",
  "Joia ou medalha",
  "Coleira de animal",
  "Cartas ou bilhetes",
  "Outro (especifique abaixo)",
];

const INIT = {
  nome: "",
  meioContacto: "",
  email: "",
  telefone: "",
  dataEvento: "",
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
  notasAdicionais: "",
  termosCondicoes: false,
};

function Field({ label, required, hint, error, children }) {
  return (
    <div className="pf-group">
      <label className="pf-label">
        {label}
        {required && <span className="pf-req" aria-hidden="true"> *</span>}
      </label>
      {hint && <p className="pf-hint">{hint}</p>}
      {children}
      {error && <p className="pf-error" role="alert">{error}</p>}
    </div>
  );
}

export default function ReservarPreservacaoForm() {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const set = (key, val) => {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === "quadrosExtra" && val !== "Sim, quero acrescentar quadros extra")
        next.quantosQuadros = "";
      if (key === "ornamentosNatal" && val !== "Sim, gostaria de acrescentar ornamentos de natal")
        next.quantosOrnamentos = "";
      if (key === "pendentes" && val !== "Sim, gostaria de acrescentar pendentes")
        next.quantosPendentes = "";
      if (key === "comoConheceu") {
        next.comoConheceuOutro = "";
        next.nomeFlorista = "";
      }
      return next;
    });
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const toggleElemento = (opcao) => {
    setForm((f) => {
      let next;
      if (opcao === "Não pretendo incluir extras") {
        next = { ...f, elementosExtra: ["Não pretendo incluir extras"], elementosExtraOutro: "" };
      } else {
        const semExclusivo = f.elementosExtra.filter((x) => x !== "Não pretendo incluir extras");
        if (semExclusivo.includes(opcao)) {
          const removed = semExclusivo.filter((x) => x !== opcao);
          next = {
            ...f,
            elementosExtra: removed,
            elementosExtraOutro: opcao === "Outro (especifique abaixo)" ? "" : f.elementosExtraOutro,
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

  const showQuantosQuadros = form.quadrosExtra === "Sim, quero acrescentar quadros extra";
  const showQuantosOrnamentos = form.ornamentosNatal === "Sim, gostaria de acrescentar ornamentos de natal";
  const showQuantosPendentes = form.pendentes === "Sim, gostaria de acrescentar pendentes";
  const showComoConheceuOutro = form.comoConheceu === "Outro (especificar abaixo)";
  const showNomeFlorista = form.comoConheceu === "Recomendação de florista";
  const showElementosExtraOutro = form.elementosExtra.includes("Outro (especifique abaixo)");
  const today = new Date().toISOString().split("T")[0];

  function validate() {
    const e = {};
    if (!form.nome.trim()) e.nome = "Campo obrigatório.";
    if (!form.meioContacto) e.meioContacto = "Escolha um meio de contacto.";
    if (!form.email.trim()) e.email = "Campo obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido.";
    if (!form.telefone.trim()) e.telefone = "Campo obrigatório.";
    if (!form.dataEvento) e.dataEvento = "Campo obrigatório.";
    if (!form.comoEnviarFlores) e.comoEnviarFlores = "Campo obrigatório.";
    if (!form.comoReceberQuadro) e.comoReceberQuadro = "Campo obrigatório.";
    if (!form.tamanhoMoldura) e.tamanhoMoldura = "Campo obrigatório.";
    if (!form.tipoFundo) e.tipoFundo = "Campo obrigatório.";
    if (!form.elementosExtra.length) e.elementosExtra = "Seleccione pelo menos uma opção.";
    if (!form.quadrosExtra) e.quadrosExtra = "Campo obrigatório.";
    if (showQuantosOrnamentos && !form.quantosOrnamentos.trim()) e.quantosOrnamentos = "Campo obrigatório.";
    if (!form.ornamentosNatal) e.ornamentosNatal = "Campo obrigatório.";
    if (!form.pendentes) e.pendentes = "Campo obrigatório.";
    if (showQuantosPendentes && !form.quantosPendentes.trim()) e.quantosPendentes = "Campo obrigatório.";
    if (!form.comoConheceu) e.comoConheceu = "Campo obrigatório.";
    if (showNomeFlorista && !form.nomeFlorista.trim()) e.nomeFlorista = "Campo obrigatório.";
    if (showComoConheceuOutro && !form.comoConheceuOutro.trim()) e.comoConheceuOutro = "Campo obrigatório.";
    if (!form.termosCondicoes) e.termosCondicoes = "Deve aceitar os Termos e Condições para continuar.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector(".pf-input-err, [role='alert']")
        ?.closest(".pf-group")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/reservar-preservacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json));
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("[reservar-preservacao] submit error:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="pf-success" role="status">
        <div className="pf-success-icon" aria-hidden="true">✓</div>
        <h2 className="pf-success-title">Pré-reserva registada com sucesso!</h2>
        <p className="pf-success-text">
          Nos próximos 3 dias úteis, receberá uma mensagem com o valor total do serviço de preservação
          e os dados para o pagamento do sinal de 30%.
          Este valor deve ser pago no prazo de 24 horas após o envio do e-mail para garantir a sua vaga.
        </p>
        <p className="pf-success-text">
          A sua reserva só fica confirmada após o pagamento do sinal.
          Caso não receba o e-mail dentro do prazo, verifique a pasta de spam ou entre em contacto connosco.
        </p>
        <p className="pf-success-closing">
          Estamos muito felizes por poder preservar as suas flores e memórias.
          <br />
          <strong>Com carinho, Flores à Beira-Rio</strong>
        </p>
      </div>
    );
  }

  return (
    <form className="preservacao-form" onSubmit={handleSubmit} noValidate>
      <p className="pf-intro">
        Campos assinalados com <span aria-hidden="true" className="pf-req">*</span> são obrigatórios.
      </p>

      {/* ── DADOS PESSOAIS ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-pessoais">
        <h2 className="pf-section-title" id="sec-pessoais">Dados pessoais</h2>

        <Field label="Nome completo" required error={errors.nome}
          hint="Para identificarmos correctamente a sua reserva.">
          <input type="text" {...inp("nome")} placeholder="O seu nome completo" autoComplete="name" />
        </Field>

        <Field label="Como prefere que comuniquemos consigo?" required error={errors.meioContacto}
          hint="Escolha o meio de contacto que lhe for mais conveniente. Pode alterar esta preferência mais tarde.">
          <select {...inp("meioContacto")}>
            <option value="">Escolha...</option>
            <option value="E-mail">E-mail</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </Field>

        <Field label="Endereço de e-mail" required error={errors.email}
          hint="Mesmo que prefira ser contactado/a por WhatsApp, pedimos um e-mail como contacto alternativo.">
          <input type="email" {...inp("email")} placeholder="email@exemplo.pt" autoComplete="email" />
        </Field>

        <Field label="Número de telemóvel" required error={errors.telefone}
          hint="Utilizado para contacto rápido em caso de necessidade, ou como canal principal se optar por WhatsApp.">
          <input type="tel" {...inp("telefone")} placeholder="+351 912 345 678" autoComplete="tel" />
        </Field>
      </div>

      {/* ── O EVENTO ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-evento">
        <h2 className="pf-section-title" id="sec-evento">O evento</h2>

        <Field label="Data do evento" required error={errors.dataEvento}
          hint="Indique a data do casamento, batizado ou outro evento. As flores devem ser enviadas idealmente até 2 a 3 dias após o evento.">
          <input type="date" {...inp("dataEvento")} min={today} />
        </Field>

        <Field label="Tipo de flores no arranjo"
          hint="Indique o tipo de flores e o tipo de arranjo (ex.: bouquet de noiva, coroa, flores soltas). Se ainda não tiver esta informação, deixe em branco.">
          <textarea {...inp("tipoFlores")} rows={4}
            placeholder="Ex.: orquídeas, girassóis, malmequeres — bouquet de noiva." />
        </Field>
      </div>

      {/* ── ENVIO E RECEPÇÃO ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-logistica">
        <h2 className="pf-section-title" id="sec-logistica">Envio e recepção</h2>

        <Field label="Como pretende enviar as flores para nós?" required error={errors.comoEnviarFlores}
          hint={<>Em caso de dúvida, consulte a nossa página{" "}
            <Link href="/como-funciona" className="pf-link" target="_blank" rel="noopener noreferrer">Como Funciona</Link>.
            Após a confirmação da reserva, receberá instruções específicas conforme a opção escolhida.</>}>
          <select {...inp("comoEnviarFlores")}>
            <option value="">Escolha...</option>
            <option value="Entrega em mãos em Coimbra">Entrega em mãos em Coimbra</option>
            <option value="Envio por CTT/transportadora para o estúdio (custos a cargo do cliente)">Envio por CTT/transportadora para o estúdio (custos a cargo do cliente)</option>
            <option value="Recolha no evento por parte da Flores à Beira-Rio - mediante orçamento e disponibilidade">Recolha no evento por parte da Flores à Beira-Rio (mediante orçamento e disponibilidade)</option>
            <option value="Ainda não sei">Ainda não sei</option>
          </select>
        </Field>

        <Field label="Como prefere receber o quadro finalizado?" required error={errors.comoReceberQuadro}
          hint={<>Saiba mais sobre esta etapa na nossa página{" "}
            <Link href="/como-funciona" className="pf-link" target="_blank" rel="noopener noreferrer">Como Funciona</Link>.
            O envio pelos CTT é feito com toda a segurança, devidamente embalado. A recolha em mãos é feita mediante agendamento.</>}>
          <select {...inp("comoReceberQuadro")}>
            <option value="">Escolha...</option>
            <option value="Recolha em mãos em Coimbra">Recolha em mãos em Coimbra</option>
            <option value="Envio por transportadora/CTT para morada (custos a cargo do cliente)">Envio por transportadora/CTT para morada (custos a cargo do cliente)</option>
            <option value="Ainda não sei">Ainda não sei</option>
          </select>
        </Field>
      </div>

      {/* ── O QUADRO ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-quadro">
        <h2 className="pf-section-title" id="sec-quadro">O quadro</h2>

        <Field label="Tamanho de moldura pretendido" required error={errors.tamanhoMoldura}
          hint={<>Consulte exemplos e valores na nossa página{" "}
            <Link href="/opcoes-e-precos" className="pf-link" target="_blank" rel="noopener noreferrer">Opções e Preços</Link>.</>}>
          <select {...inp("tamanhoMoldura")}>
            <option value="">Escolha...</option>
            <option value="30x40cm">30×40 cm</option>
            <option value="40x50cm">40×50 cm</option>
            <option value="50x70cm">50×70 cm</option>
            <option value="Ainda não sei">Ainda não sei</option>
          </select>
        </Field>

        <Field label="Que tipo de fundo gostaria para o seu quadro?" required error={errors.tipoFundo}
          hint={<>Consulte a nossa página{" "}
            <Link href="/opcoes-e-precos" className="pf-link" target="_blank" rel="noopener noreferrer">Opções e Preços</Link>{" "}
            para conhecer cada opção e visite o nosso{" "}
            <a href={SOCIAL_INSTAGRAM} className="pf-link" target="_blank" rel="noopener noreferrer">Instagram</a>.
            Se não tiver a certeza, não precisa de decidir já.</>}>
          <select {...inp("tipoFundo")}>
            <option value="">Escolha...</option>
            <option value="Transparente (vidro sobre vidro)">Transparente (vidro sobre vidro)</option>
            <option value="Preto">Preto</option>
            <option value="Branco">Branco</option>
            <option value="Fotografia (custo adicional da impressão profissional)">Fotografia (custo adicional da impressão profissional)</option>
            <option value="Cor">Cor</option>
            <option value="Gostaria que fossem vocês a escolher">Gostaria que fossem vocês a escolher</option>
            <option value="Ainda não sei">Ainda não sei</option>
          </select>
        </Field>

        <Field label="Gostaria de incluir algum elemento extra no seu quadro?" required error={errors.elementosExtra}
          hint="Pode adicionar itens com valor simbólico ou emocional. Se seleccionar alguma opção, deve entregar os elementos juntamente com as flores.">
          <div className="pf-checkgroup" role="group" aria-label="Elementos extra">
            {ELEMENTOS_OPTIONS.map((opcao) => (
              <label key={opcao} className="pf-check-label">
                <input
                  type="checkbox"
                  className="pf-checkbox"
                  checked={form.elementosExtra.includes(opcao)}
                  onChange={() => toggleElemento(opcao)}
                />
                <span>{opcao}</span>
              </label>
            ))}
          </div>
        </Field>

        {showElementosExtraOutro && (
          <Field label="Especifique o elemento extra" error={errors.elementosExtraOutro}>
            <textarea
              value={form.elementosExtraOutro}
              onChange={(e) => set("elementosExtraOutro", e.target.value)}
              className={`pf-input${errors.elementosExtraOutro ? " pf-input-err" : ""}`}
              rows={2}
              placeholder="Descreva o elemento que pretende incluir."
            />
          </Field>
        )}
      </div>

      {/* ── EXTRAS OPCIONAIS ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-extras">
        <h2 className="pf-section-title" id="sec-extras">Extras opcionais</h2>

        <Field label="Além do quadro principal, gostaria de acrescentar quadros extra em formato mais pequeno?" required error={errors.quadrosExtra}
          hint="Ideais para oferecer a pais, padrinhos, irmãos ou amigos. Cada quadro extra tem o preço de 90€ (20×25 cm).">
          <select {...inp("quadrosExtra")}>
            <option value="">Escolha...</option>
            <option value="Não, apenas o quadro principal">Não, apenas o quadro principal</option>
            <option value="Sim, quero acrescentar quadros extra">Sim, quero acrescentar quadros extra</option>
            <option value="Gostava de receber mais informações">Gostava de receber mais informações</option>
          </select>
        </Field>

        {showQuantosQuadros && (
          <Field label="Quantos quadros extra em formato pequeno gostaria de adicionar?">
            <input type="number" min={1}
              value={form.quantosQuadros}
              onChange={(e) => set("quantosQuadros", e.target.value)}
              className={`pf-input${errors.quantosQuadros ? " pf-input-err" : ""}`}
              placeholder="Ex.: 2" />
          </Field>
        )}

        <Field label="Além do quadro principal, gostaria de acrescentar ornamentos de Natal?" required error={errors.ornamentosNatal}
          hint="Ornamentos de Natal feitos com as suas flores. Ideais para oferecer.">
          <select {...inp("ornamentosNatal")}>
            <option value="">Escolha...</option>
            <option value="Não, apenas o quadro principal">Não, apenas o quadro principal</option>
            <option value="Sim, gostaria de acrescentar ornamentos de natal">Sim, gostaria de acrescentar ornamentos de Natal</option>
            <option value="Gostava de receber mais informações">Gostava de receber mais informações</option>
          </select>
        </Field>

        {showQuantosOrnamentos && (
          <Field label="Quantos ornamentos de Natal gostaria de ter?" required error={errors.quantosOrnamentos}>
            <input type="number" min={1}
              value={form.quantosOrnamentos}
              onChange={(e) => set("quantosOrnamentos", e.target.value)}
              className={`pf-input${errors.quantosOrnamentos ? " pf-input-err" : ""}`}
              placeholder="Ex.: 3" />
          </Field>
        )}

        <Field label="Além do quadro principal, gostaria de acrescentar pendentes para colar?" required error={errors.pendentes}
          hint="Pendentes feitos com as suas flores.">
          <select {...inp("pendentes")}>
            <option value="">Escolha...</option>
            <option value="Não, apenas o quadro principal">Não, apenas o quadro principal</option>
            <option value="Sim, gostaria de acrescentar pendentes">Sim, gostaria de acrescentar pendentes</option>
            <option value="Gostava de receber mais informações">Gostava de receber mais informações</option>
          </select>
        </Field>

        {showQuantosPendentes && (
          <Field label="Quantos pendentes gostaria de ter?" required error={errors.quantosPendentes}>
            <input type="number" min={1}
              value={form.quantosPendentes}
              onChange={(e) => set("quantosPendentes", e.target.value)}
              className={`pf-input${errors.quantosPendentes ? " pf-input-err" : ""}`}
              placeholder="Ex.: 2" />
          </Field>
        )}
      </div>

      {/* ── OUTROS ── */}
      <div className="pf-section" role="group" aria-labelledby="sec-outros">
        <h2 className="pf-section-title" id="sec-outros">Outros</h2>

        <Field label="Como conheceu a Flores à Beira-Rio?" required error={errors.comoConheceu}>
          <select {...inp("comoConheceu")}>
            <option value="">Escolha...</option>
            <option value="Ofereceram-me um Vale-Presente para preservação">Ofereceram-me um Vale-Presente para preservação</option>
            <option value="Através do Instagram">Através do Instagram</option>
            <option value="Através do Facebook">Através do Facebook</option>
            <option value="Através do casamentos.pt">Através do casamentos.pt</option>
            <option value="Pesquisa no Google">Pesquisa no Google</option>
            <option value="Recomendação de florista">Recomendação de florista</option>
            <option value="Recomendação de alguém que já contratou o serviço anteriormente">Recomendação de alguém que já contratou o serviço</option>
            <option value="Outro (especificar abaixo)">Outro (especificar abaixo)</option>
          </select>
        </Field>

        {showNomeFlorista && (
          <Field label="Qual a florista que lhe falou de nós?" required error={errors.nomeFlorista}>
            <textarea {...inp("nomeFlorista")} rows={2} placeholder="Nome da florista." />
          </Field>
        )}

        {showComoConheceuOutro && (
          <Field label="Conte-nos como conheceu a Flores à Beira-Rio" required error={errors.comoConheceuOutro}>
            <textarea {...inp("comoConheceuOutro")} rows={3} />
          </Field>
        )}

        <Field label="Notas adicionais (opcional)">
          <textarea {...inp("notasAdicionais")} rows={4}
            placeholder="Se tiver algum comentário ou pedido especial, escreva aqui." />
        </Field>

        <div className="pf-group">
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
              Concordo com os{" "}
              <Link href="/termos-e-condicoes" className="pf-link" target="_blank" rel="noopener noreferrer">
                Termos e Condições
              </Link>
              <span className="pf-req" aria-hidden="true"> *</span>
            </span>
          </label>
          {errors.termosCondicoes && (
            <p className="pf-error" role="alert">{errors.termosCondicoes}</p>
          )}
        </div>
      </div>

      {status === "error" && (
        <p className="pf-submit-error" role="alert">
          Ocorreu um erro ao enviar. Por favor, tente novamente ou contacte-nos em{" "}
          <a href="mailto:info@floresabeirario.pt">info@floresabeirario.pt</a>.
        </p>
      )}

      <button type="submit" className="pf-btn" disabled={status === "loading"}>
        {status === "loading" ? "A enviar..." : "Submeter pré-reserva"}
      </button>
    </form>
  );
}
