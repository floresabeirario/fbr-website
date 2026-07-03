"use client";

// Eventos personalizados ("event listeners") concentrados num só sítio.
//
// Em vez de decorar cada botão espalhado pelo site, um único listener de cliques
// no documento apanha os links importantes de uma vez, actuais e futuros. Quando
// alguém carrega num link que casa com uma das regras abaixo, avisamos o Umami.
//
// Só faz alguma coisa se o Umami já tiver carregado (window.umami existe); caso
// contrário o `?.` ignora em silêncio, sem partir nada.

import { useEffect } from "react";

// Padrão no href do link  ->  nome do evento que aparece no painel do Umami
const RULES = [
  [/\/reservar-preservacao/, "reservar"], // botão principal de reserva
  [/wa\.me\//, "whatsapp"], // qualquer botão de WhatsApp
  [/wkf\.ms\//, "vale-oferta"], // formulário do vale-oferta (Monday)
  [/status\.floresabeirario\.pt/, "ver-estado"], // link para o site de estado
];

export default function TrackClicks() {
  useEffect(() => {
    function onClick(e) {
      const el = e.target.closest?.("a, button");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      if (!href) return;
      for (const [pattern, name] of RULES) {
        if (pattern.test(href)) {
          window.umami?.track?.(name, { origem: window.location.pathname });
          break;
        }
      }
    }
    // capture: true garante que apanhamos o clique mesmo que algo o interrompa.
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
