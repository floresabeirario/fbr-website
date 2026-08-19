"use client";

// ============================================================
// Campo de morada com sugestões do Google Maps.
//
// As sugestões vêm da nossa própria rota /api/places-autocomplete
// (a chave da Google fica no servidor — ver comentário lá).
//
// Regra de ouro: o campo é sempre uma caixa de texto que funciona.
// Se a Google estiver indisponível, sem chave, ou a pessoa preferir
// escrever à mão, nada bloqueia e o que ela escreveu é o que fica.
// As sugestões são uma ajuda, nunca uma obrigação.
// ============================================================

import { useState, useEffect, useRef, useId } from "react";

const MIN_CHARS = 3;
const DEBOUNCE_MS = 300;

export default function AddressAutocomplete({
  value,
  onChange,
  // Chamado só quando a pessoa escolhe mesmo uma sugestão (nunca ao
  // escrever à mão). Recebe o placeId, que o mapa usa para saber onde
  // se situa a morada.
  onSelectPlace,
  locale = "pt",
  placeholder,
  className = "pf-input",
  id,
  disabled = false,
  // O <Field> do formulário só associa automaticamente a etiqueta a
  // inputs nativos. Como este componente não é um, recebe a etiqueta
  // por aqui para os leitores de ecrã a anunciarem à mesma.
  ariaLabel,
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const listId = `${inputId}-lista`;

  const containerRef = useRef(null);
  // Última string realmente pesquisada. Evita repetir a pesquisa logo
  // a seguir a escolher uma sugestão (o valor muda, mas já o sabemos).
  const lastQueryRef = useRef((value ?? "").trim());
  // Sugestões desligadas nesta sessão (sem chave, erro, ou 429).
  const [desligado, setDesligado] = useState(false);

  const [sugestoes, setSugestoes] = useState([]);
  const [aberto, setAberto] = useState(false);
  const [activo, setActivo] = useState(-1);
  const [aCarregar, setACarregar] = useState(false);

  const query = (value ?? "").trim();
  const curta = query.length < MIN_CHARS;

  // Fecha ao clicar fora.
  useEffect(() => {
    function foraDaCaixa(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", foraDaCaixa);
    return () => document.removeEventListener("mousedown", foraDaCaixa);
  }, []);

  // Pesquisa com debounce.
  useEffect(() => {
    if (desligado || disabled) return;
    if (curta) return;
    if (query === lastQueryRef.current) return;

    let cancelado = false;
    setACarregar(true);

    const handle = setTimeout(async () => {
      lastQueryRef.current = query;
      try {
        const res = await fetch("/api/places-autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: query, locale }),
        });
        const json = res.ok ? await res.json() : null;
        if (cancelado) return;
        if (!json || json.disabled) {
          // Sem chave ou Google em baixo: deixa de tentar nesta sessão.
          setDesligado(true);
          setSugestoes([]);
          setAberto(false);
          return;
        }
        setSugestoes(json.suggestions ?? []);
        setActivo(-1);
        setAberto((json.suggestions ?? []).length > 0);
      } catch {
        if (!cancelado) {
          setDesligado(true);
          setSugestoes([]);
          setAberto(false);
        }
      } finally {
        if (!cancelado) setACarregar(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelado = true;
      clearTimeout(handle);
    };
  }, [query, curta, locale, desligado, disabled]);

  function escolher(sugestao) {
    lastQueryRef.current = sugestao.full.trim();
    onChange(sugestao.full);
    onSelectPlace?.(sugestao);
    setAberto(false);
    setActivo(-1);
  }

  function teclas(e) {
    if (!aberto || sugestoes.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActivo((i) => (i + 1) % sugestoes.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActivo((i) => (i <= 0 ? sugestoes.length - 1 : i - 1));
    } else if (e.key === "Enter" && activo >= 0) {
      // Só intercepta o Enter quando há uma sugestão destacada —
      // caso contrário deixa o formulário seguir o seu caminho.
      e.preventDefault();
      escolher(sugestoes[activo]);
    } else if (e.key === "Escape") {
      setAberto(false);
      setActivo(-1);
    }
  }

  // Sem sugestões visíveis quando a query é curta demais.
  const visiveis = curta ? [] : sugestoes;

  return (
    <div className="pf-addr" ref={containerRef}>
      <input
        id={inputId}
        type="text"
        className={className}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={teclas}
        onFocus={() => {
          if (visiveis.length > 0) setAberto(true);
        }}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-label={ariaLabel}
        role="combobox"
        aria-expanded={aberto && visiveis.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activo >= 0 ? `${listId}-${activo}` : undefined}
      />

      {aCarregar && !desligado && (
        <span className="pf-addr-spinner" aria-hidden="true" />
      )}

      {aberto && visiveis.length > 0 && (
        <ul className="pf-addr-lista" id={listId} role="listbox">
          {visiveis.map((s, i) => (
            <li key={s.placeId} role="presentation">
              <button
                type="button"
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === activo}
                className={`pf-addr-opcao${i === activo ? " pf-addr-opcao-activa" : ""}`}
                // onMouseDown em vez de onClick: o blur do input dispara
                // antes do click e fecharia a lista sem escolher nada.
                onMouseDown={(e) => {
                  e.preventDefault();
                  escolher(s);
                }}
              >
                <span className="pf-addr-principal">{s.mainText}</span>
                {s.secondaryText && (
                  <span className="pf-addr-secundario">{s.secondaryText}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
