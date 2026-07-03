// app/_lib/consent.js
// Consentimento de cookies de terceiros (por agora só o widget Elfsight das
// avaliações Google). Guardado em localStorage; estado partilhado entre a
// caixinha de cookies e os widgets via useSyncExternalStore.
"use client";

import { useSyncExternalStore } from "react";

const KEY = "fbr-cookie-consent"; // "accepted" | "refused" | (ausente = por decidir)
const listeners = new Set();

function emit() {
  for (const l of listeners) l();
}

export function subscribeConsent(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Devolve sempre strings (comparadas por valor — snapshot estável).
export function getConsent() {
  if (typeof window === "undefined") return "unknown";
  try {
    return localStorage.getItem(KEY) || "unset";
  } catch {
    return "unset";
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // localStorage indisponível (modo privado antigo) — segue sem persistir
  }
  emit();
}

// "unknown" no servidor/primeiro paint (evita flash da caixinha em quem já decidiu)
export function useConsent() {
  return useSyncExternalStore(subscribeConsent, getConsent, () => "unknown");
}
