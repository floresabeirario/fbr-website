"use client";

// ============================================================
// Aviso do browser ao sair da página com o formulário preenchido e por
// enviar ("Sair do site? As alterações que fez podem não ser guardadas").
//
// O texto é sempre o do browser: desde 2016 nenhum browser deixa o site
// escolher a frase. Só dispara ao fechar o separador, recarregar ou ir
// para outro site, não em ligações internas. No Safari do iPhone não faz
// nada, e no Chrome do Android não aparece ao fechar o separador pelo
// gestor de separadores. Serve de rede no computador; no telemóvel é o
// rascunho (use-rascunho.js) que guarda o que foi escrito.
//
// Contexto: uma cliente leu o "Sucesso" do widget anti-spam como pedido
// enviado e fechou a página sem submeter (17/09/2026).
// ============================================================

import { useEffect } from "react";

export function useAvisoAoSair(activo) {
  useEffect(() => {
    if (!activo) return undefined;
    const avisar = (e) => {
      e.preventDefault();
      // Browsers antigos (Chrome/Edge < 119) ainda precisam do returnValue.
      e.returnValue = true;
    };
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [activo]);
}
