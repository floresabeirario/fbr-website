"use client";

// ============================================================
// Resumo da encomenda, ao vivo, no fundo dos formulários de reserva
// (preservação e emoldurar flores secas).
//
// Pedido da Maria (06/09/2026): "tudo o que o cliente escolheu e o preço
// de cada coisa, as três fases de pagamento bem explícitas, tudo
// simplificado, para os clientes não serem surpreendidos". O orçamento
// continua a ser SEMPRE confirmado por ela por mensagem (as notas do
// cliente podem mudar tudo), por isso o resumo diz "estimativa" e a nota
// final explica quando chega a confirmação.
//
// 2.ª ronda (mesmo dia): barra fixa no fundo do telemóvel com o total a
// mudar em tempo real (95% das reservas são no telemóvel); plano de
// pagamentos com as percentagens à frente e um subtítulo em cada fase;
// previsão de entrega num só parágrafo.
//
// O cálculo é o mesmo que a API grava na encomenda (app/_lib/orcamento.js),
// que por sua vez espelha o do admin. Este componente só traduz as linhas
// e acrescenta as linhas informativas (envio, elementos, "a decidir").
// ============================================================

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import "./ResumoEncomenda.css";
import { useConsent } from "../_lib/consent";
import {
  TAMANHO_MOLDURA,
  TIPO_FUNDO,
  VIDRO_MUSEU,
  SIM_NAO_INFO,
  COMO_ENVIAR_FLORES,
  COMO_RECEBER_QUADRO,
  DRIED_APPROACH,
  lookupEnum,
} from "../_lib/form-enums";
import {
  computePricingSnapshot,
  itemsFromPrecos,
  precoNumero,
  fasesPagamento,
  FASES_PAGAMENTO,
  formatEuro,
  mesPrevisaoEntrega,
  formatMesAno,
  eventoDistante,
} from "../_lib/orcamento";

const TAMANHO_LABEL = { "30x40": "30×40", "40x50": "40×50", "50x70": "50×70" };

function toQty(v) {
  const n = parseInt(String(v ?? "").trim(), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Converte o estado do formulário (valores PT) nos enums da BD. */
export function formToPricingInput(form, serviceType) {
  return {
    service_type: serviceType,
    frame_size: lookupEnum(TAMANHO_MOLDURA, form.tamanhoMoldura),
    frame_background: lookupEnum(TIPO_FUNDO, form.tipoFundo),
    museum_glass: lookupEnum(VIDRO_MUSEU, form.vidroMuseu) ?? "nao_sei",
    museum_glass_mini: lookupEnum(VIDRO_MUSEU, form.vidroMuseuMini) ?? "nao_sei",
    pyramid_frame: false,
    extra_small_frames: lookupEnum(SIM_NAO_INFO, form.quadrosExtra),
    extra_small_frames_qty: toQty(form.quantosQuadros),
    christmas_ornaments: lookupEnum(SIM_NAO_INFO, form.ornamentosNatal),
    christmas_ornaments_qty: toQty(form.quantosOrnamentos),
    necklace_pendants: lookupEnum(SIM_NAO_INFO, form.pendentes),
    necklace_pendants_qty: toQty(form.quantosPendentes),
  };
}

/**
 * Barra fixa do telemóvel. Aparece depois de a pessoa chegar à secção
 * "O quadro" (onde começam as escolhas com preço) e esconde-se quando o
 * resumo já está no ecrã. Sobe para cima do banner de cookies enquanto
 * ele estiver visível, para nunca o tapar nem ser tapada.
 */
function BarraTotal({ resumoRef, activa, texto, valor, sub }) {
  const consent = useConsent();
  const [quadroVisto, setQuadroVisto] = useState(false);
  const [resumoNoEcra, setResumoNoEcra] = useState(false);
  const [alturaBanner, setAlturaBanner] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const quadro = document.getElementById("sec-quadro")?.closest(".pf-section");
    const resumo = resumoRef.current?.closest(".pf-section") ?? resumoRef.current;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === quadro && e.isIntersecting) setQuadroVisto(true);
        if (e.target === resumo) setResumoNoEcra(e.isIntersecting);
      }
    }, { threshold: 0.05 });
    if (quadro) obs.observe(quadro);
    if (resumo) obs.observe(resumo);
    return () => obs.disconnect();
  }, [resumoRef]);

  useEffect(() => {
    if (consent !== "unset") {
      const raf = requestAnimationFrame(() => setAlturaBanner(0));
      return () => cancelAnimationFrame(raf);
    }
    const banner = document.querySelector("[data-cookie-banner]");
    if (!banner || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => {
      // 12px de margem inferior do banner + 8px de folga.
      setAlturaBanner(Math.ceil(banner.getBoundingClientRect().height) + 20);
    });
    ro.observe(banner);
    return () => ro.disconnect();
  }, [consent]);

  const mostrar = activa && quadroVisto && !resumoNoEcra;

  const irAoResumo = () => {
    const alvo = resumoRef.current?.closest(".pf-section") ?? resumoRef.current;
    alvo?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      className={`re-barra${mostrar ? " re-barra-on" : ""}`}
      style={alturaBanner ? { bottom: alturaBanner } : undefined}
      onClick={irAoResumo}
      aria-hidden={!mostrar}
      tabIndex={mostrar ? 0 : -1}
    >
      <span className="re-barra-texto">
        <span className="re-barra-label">{texto.total}</span>
        <span className="re-barra-ver">{texto.ver}</span>
      </span>
      <span className="re-barra-valor">
        <span className="re-muda" key={valor}>{valor}</span>
        {sub && <small>{sub}</small>}
      </span>
    </button>
  );
}

export default function ResumoEncomenda({
  form,
  precos,
  locale,
  serviceType = "preservacao",
  dataEvento = "",
}) {
  const t = useTranslations("formReserva.resumo");
  const tf = useTranslations("formReserva");
  const rootRef = useRef(null);

  const secas = serviceType === "emoldurar_secas";
  const input = formToPricingInput(form, serviceType);
  const items = itemsFromPrecos(precos);
  const snap = computePricingSnapshot(input, items);

  const temEscolhas = Boolean(
    form.tamanhoMoldura || form.tipoFundo || form.vidroMuseu ||
    form.quadrosExtra || form.ornamentosNatal || form.pendentes,
  );

  // Preços unitários já formatados, para as frases "(35€ cada)".
  const p = (nome) => formatEuro(precoNumero(precos[nome]));
  const size = snap?.provisional ? "30x40" : input.frame_size;
  const sizeLabel = TAMANHO_LABEL[size] ?? size;
  const vidroKey = `vidro${size}`;
  const fotoKey = `fotografia${size}`;

  // ── Linhas ─────────────────────────────────────────────────────────
  // Cada linha: { k, label, value, nota } — `nota` = valor sem euros
  // ("incluído", "a confirmar"), que se mostra mais leve.
  const linhas = [];
  const euros = (n) => ({ value: formatEuro(n) });
  const nota = (txt) => ({ value: txt, nota: true });

  if (snap) {
    // Quadro
    if (snap.provisional) {
      linhas.push({ k: "quadro", label: t("quadroPorDefinir"), ...nota(t("aPartirDe", { valor: p(secas ? "secas30x40" : "quadro30x40") })) });
    } else {
      const base = snap.lines.find((l) => l.category === "base_frame");
      linhas.push({ k: "quadro", label: t(secas ? "quadroSecas" : "quadro", { tamanho: sizeLabel }), ...euros(base?.subtotal ?? 0) });
    }

    // Fundo
    const fundo = input.frame_background;
    if (fundo === "fotografia") {
      const l = snap.lines.find((x) => x.category === "background_supplement" && x.key.startsWith("fotografia") && x.key !== "fotografia_mini");
      linhas.push({ k: "fundo", label: t("fundoFotografia"), ...euros(l?.subtotal ?? precoNumero(precos[fotoKey])) });
    } else if (fundo === "voces_a_escolher" || fundo === "nao_sei") {
      linhas.push({ k: "fundo", label: t("fundoADefinir"), ...nota(t("aDefinir")) });
    } else if (fundo) {
      linhas.push({ k: "fundo", label: t("fundoIncluido", { fundo: t(`fundoNomes.${fundo}`) }), ...nota(t("incluido")) });
    }

    // Vidro museu (quadro principal)
    if (input.museum_glass === "sim") {
      const l = snap.lines.find((x) => x.category === "glass_supplement" && x.key !== "museum_glass_20x25");
      linhas.push({ k: "vidro", label: t("vidroMuseu", { tamanho: sizeLabel }), ...euros(l?.subtotal ?? precoNumero(precos[vidroKey])) });
    } else if (form.vidroMuseu && input.museum_glass === "nao_sei") {
      linhas.push({ k: "vidro", label: t("vidroPorDecidir"), ...nota(t("seEscolher", { valor: p(vidroKey) })) });
    }

    // Quadros extra (minis)
    const minisFlag = input.extra_small_frames;
    const minisQty = input.extra_small_frames_qty;
    if (minisFlag === "sim" && minisQty) {
      const l = snap.lines.find((x) => x.key === "mini_frame");
      linhas.push({ k: "minis", label: t("minis", { n: minisQty, unit: p("mini20x25") }), ...euros(l?.subtotal ?? 0) });
      const foto = snap.lines.find((x) => x.key === "fotografia_mini");
      if (foto) linhas.push({ k: "fotoMinis", label: t("fotoMinis", { n: minisQty, unit: formatEuro(foto.unit_price) }), ...euros(foto.subtotal) });
      if (input.museum_glass_mini === "sim") {
        const g = snap.lines.find((x) => x.key === "museum_glass_20x25");
        linhas.push({ k: "vidroMinis", label: t("vidroMinis", { n: minisQty, unit: p("vidro20x25") }), ...euros(g?.subtotal ?? 0) });
      } else if (input.museum_glass_mini === "nao_sei" && form.vidroMuseuMini) {
        linhas.push({ k: "vidroMinis", label: t("vidroMinisPorDecidir"), ...nota(t("seEscolherPorQuadro", { valor: p("vidro20x25") })) });
      }
    } else if (minisFlag === "sim") {
      linhas.push({ k: "minis", label: t("minisSemQty", { unit: p("mini20x25") }), ...nota(t("indiqueQuantidade")) });
    } else if (minisFlag === "mais_info") {
      linhas.push({ k: "minis", label: t("minisInfo"), ...nota(t("aConfirmar", { unit: p("mini20x25") })) });
    }

    // Ornamentos de Natal
    const ornFlag = input.christmas_ornaments;
    const ornQty = input.christmas_ornaments_qty;
    if (ornFlag === "sim" && ornQty) {
      const l = snap.lines.find((x) => x.key === "christmas_ornament");
      linhas.push({ k: "orn", label: t("ornamentos", { n: ornQty, unit: p("ornamento") }), ...euros(l?.subtotal ?? 0) });
    } else if (ornFlag === "sim") {
      linhas.push({ k: "orn", label: t("ornamentosSemQty", { unit: p("ornamento") }), ...nota(t("indiqueQuantidade")) });
    } else if (ornFlag === "mais_info") {
      linhas.push({ k: "orn", label: t("ornamentosInfo"), ...nota(t("aConfirmar", { unit: p("ornamento") })) });
    }

    // Pendentes
    const penFlag = input.necklace_pendants;
    const penQty = input.necklace_pendants_qty;
    if (penFlag === "sim" && penQty) {
      const l = snap.lines.find((x) => x.key === "necklace_pendant");
      linhas.push({ k: "pen", label: t("pendentes", { n: penQty, unit: p("pendente") }), ...euros(l?.subtotal ?? 0) });
    } else if (penFlag === "sim") {
      linhas.push({ k: "pen", label: t("pendentesSemQty", { unit: p("pendente") }), ...nota(t("indiqueQuantidade")) });
    } else if (penFlag === "mais_info") {
      linhas.push({ k: "pen", label: t("pendentesInfo"), ...nota(t("aConfirmar", { unit: p("pendente") })) });
    }
  }

  // Elementos no quadro (sem custo)
  const elementosOpcoes = tf.raw("elementosOpcoes");
  const semExtras = elementosOpcoes.find((o) => o.valor === "Não pretendo incluir extras")?.valor;
  const elementos = (form.elementosExtra ?? [])
    .filter((v) => v && v !== semExtras)
    .map((v) => {
      const label = elementosOpcoes.find((o) => o.valor === v)?.label ?? v;
      return label.replace(/\s*\(.*\)\s*$/, "").toLowerCase();
    });
  if (elementos.length) {
    linhas.push({ k: "elementos", label: t("elementos", { lista: elementos.join(", ") }), ...nota(t("incluido")) });
  }

  // Envio das flores / recepção do quadro (custos fora do orçamento)
  const envio = lookupEnum(COMO_ENVIAR_FLORES, form.comoEnviarFlores);
  if (envio === "maos") linhas.push({ k: "envio", label: t("envioFloresMaos"), ...nota(t("semCusto")) });
  if (envio === "ctt") linhas.push({ k: "envio", label: t("envioFloresCtt"), ...nota(t("custosSeuCargo")) });
  if (envio === "recolha_evento") linhas.push({ k: "envio", label: t("envioFloresRecolha"), ...nota(t("orcamentoAParte")) });
  const receber = lookupEnum(COMO_RECEBER_QUADRO, form.comoReceberQuadro);
  if (receber === "maos") linhas.push({ k: "receber", label: t("receberQuadroMaos"), ...nota(t("semCusto")) });
  if (receber === "ctt") linhas.push({ k: "receber", label: t("receberQuadroCtt"), ...nota(t("custosSeuCargo")) });

  // ── Previsão de entrega ───────────────────────────────────────────
  const b = (c) => <b>{c}</b>;
  let previsao;
  if (secas) {
    const abordagem = lookupEnum(DRIED_APPROACH, form.abordagem);
    if (abordagem === "ramo_original") previsao = t("previsaoSemData", { meses: 3 });
    else if (abordagem === "recriacao" || abordagem === "combinacao") previsao = t("previsaoSemData", { meses: 6 });
    else previsao = t("previsaoIntervalo", { min: 3, max: 6 });
  } else {
    const mes = formatMesAno(mesPrevisaoEntrega(dataEvento), locale);
    previsao = mes ? t.rich("previsaoComData", { mes, meses: 6, b }) : t("previsaoSemData", { meses: 6 });
  }

  const distante = !secas && eventoDistante(dataEvento);
  const total = snap?.total ?? 0;
  const fases = fasesPagamento(total);
  const totalTxt = formatEuro(total);

  const notaBloco = (
    <section className="re-bloco re-bloco-nota">
      <h3 className="re-bloco-titulo">{t("notaTitulo")}</h3>
      <p className="re-texto">{t.rich("nota", { b })}</p>
      {distante && <p className="re-texto">{t("notaDistante")}</p>}
    </section>
  );

  return (
    <div ref={rootRef} aria-live="polite">
      {!temEscolhas ? (
        <>
          <p className="re-vazio">{t("vazio")}</p>
          {notaBloco}
        </>
      ) : (
        <>
          <ul className="re-linhas">
            {linhas.map((l, i) => (
              <li key={`${l.k}-${i}`} className="re-linha">
                <span className="re-etiqueta">{l.label}</span>
                <span className={`re-valor${l.nota ? " re-valor-nota" : ""}`}>{l.value}</span>
              </li>
            ))}
          </ul>

          {snap && (
            <>
              <div className="re-total">
                <span>{snap.provisional ? t("totalAPartirDe") : t("total")}</span>
                <span className="re-valor"><span className="re-muda" key={total}>{totalTxt}</span></span>
              </div>

              {/* A nota "é uma estimativa" vem logo a seguir ao total, que é
                  o número que a pessoa lê primeiro (pedido da Maria). */}
              {notaBloco}

              <section className="re-bloco">
                <h3 className="re-bloco-titulo">{t("pagamentoTitulo")}</h3>
                <p className="re-bloco-intro">{t("pagamentoIntro")}</p>
                <ol className="re-fases">
                  {[
                    { titulo: t(secas ? "fase1TituloSecas" : "fase1Titulo"), sub: t("fase1Sub") },
                    { titulo: t("fase2Titulo"), sub: t("fase2Sub") },
                    { titulo: t("fase3Titulo"), sub: t("fase3Sub") },
                  ].map((f, i) => (
                    <li key={i} className="re-fase">
                      <span className="re-pct">{Math.round(FASES_PAGAMENTO[i] * 100)}%</span>
                      <span className="re-fase-corpo">
                        <span className="re-fase-titulo">{f.titulo}</span>
                        <span className="re-fase-sub">{f.sub}</span>
                      </span>
                      <span className="re-valor">{formatEuro(fases[i])}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </>
          )}

          <section className="re-bloco">
            <h3 className="re-bloco-titulo">{t("previsaoTitulo")}</h3>
            <p className="re-texto">{previsao} {t("previsaoArtesanal")}</p>
          </section>

          {/* Sem orçamento calculável (tabela de preços vazia) a nota fica aqui. */}
          {!snap && notaBloco}
        </>
      )}

      <BarraTotal
        resumoRef={rootRef}
        activa={temEscolhas && Boolean(snap)}
        texto={{ total: t("barraTotal"), ver: t("barraVer") }}
        valor={totalTxt}
        sub={snap?.provisional ? t("totalAPartirDe") : null}
      />
    </div>
  );
}
