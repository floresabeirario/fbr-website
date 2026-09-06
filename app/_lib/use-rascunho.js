"use client";

// ============================================================
// Rascunho do formulário guardado no telemóvel da pessoa (localStorage).
//
// 95% das reservas são feitas no telemóvel, onde uma chamada, ir ver a
// página de Opções ou o Android a matar o separador deitam fora um
// formulário de 7 secções. Guardamos o que já foi escrito no próprio
// aparelho (nada sai dele) e recuperamos ao voltar, com um aviso bem
// visível a lembrar de submeter, porque o receio da Maria é a pessoa
// pensar que já enviou.
//
// Regras: expira em 7 dias; nunca guarda o honeypot, o token anti-spam
// nem a aceitação dos Termos (tem de voltar a aceitar); apaga-se ao
// submeter com sucesso ou quando a pessoa escolhe "Começar de novo".
// ============================================================

import { useEffect, useRef, useState } from "react";

const DIAS = 7;
const IGNORAR = new Set(["website", "termosCondicoes"]);

function ler(chave) {
  try {
    const raw = localStorage.getItem(chave);
    if (!raw) return null;
    const { at, form } = JSON.parse(raw);
    if (!at || Date.now() - at > DIAS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(chave);
      return null;
    }
    return form && typeof form === "object" ? form : null;
  } catch {
    return null;
  }
}

function temConteudo(form, init) {
  return Object.keys(form).some((k) => {
    if (IGNORAR.has(k)) return false;
    const v = form[k];
    const i = init[k];
    if (Array.isArray(v)) return v.length > 0;
    return v !== i && v !== "" && v !== false && v !== null && v !== undefined;
  });
}

/**
 * useRascunho(chave, form, setForm, INIT) → { recuperado, limpar, apagar }
 *  - recuperado: true quando o formulário foi reposto a partir do rascunho
 *  - limpar(): "Começar de novo" (repõe INIT e apaga o rascunho)
 *  - apagar(): só apaga o rascunho (usar depois de submeter com sucesso)
 */
export function useRascunho(chave, form, setForm, INIT) {
  const [recuperado, setRecuperado] = useState(false);
  const prontoRef = useRef(false);
  const timerRef = useRef(null);
  // Depois de submeter com sucesso, nenhuma gravação pendente pode voltar
  // a escrever o rascunho (o temporizador dos 500ms podia disparar depois
  // do apagar). `limpar` volta a ligar, porque a pessoa recomeça.
  const paradoRef = useRef(false);

  // Repor ao montar (só no browser). Nunca pisa o que a pessoa já tenha
  // escrito entretanto (ex.: ?vale= no URL preencheu o código).
  useEffect(() => {
    const guardado = ler(chave);
    if (guardado && temConteudo(guardado, INIT)) {
      setForm((f) => {
        const next = { ...f };
        for (const k of Object.keys(INIT)) {
          if (IGNORAR.has(k)) continue;
          const jaEscrito = Array.isArray(f[k]) ? f[k].length > 0 : f[k] !== INIT[k];
          if (!jaEscrito && k in guardado) next[k] = guardado[k];
        }
        return next;
      });
      setRecuperado(true);
    }
    prontoRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  // Guardar com atraso a cada alteração (depois de montar).
  useEffect(() => {
    if (!prontoRef.current || paradoRef.current) return undefined;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (paradoRef.current) return;
      try {
        if (!temConteudo(form, INIT)) {
          localStorage.removeItem(chave);
          return;
        }
        const copia = {};
        for (const k of Object.keys(form)) if (!IGNORAR.has(k)) copia[k] = form[k];
        localStorage.setItem(chave, JSON.stringify({ at: Date.now(), form: copia }));
      } catch {
        // localStorage indisponível: segue sem rascunho
      }
    }, 500);
    return () => clearTimeout(timerRef.current);
  }, [chave, form, INIT]);

  const apagar = () => {
    paradoRef.current = true;
    clearTimeout(timerRef.current);
    try { localStorage.removeItem(chave); } catch { /* sem localStorage */ }
  };

  const limpar = () => {
    apagar();
    paradoRef.current = false;
    setForm(INIT);
    setRecuperado(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { recuperado, limpar, apagar };
}
