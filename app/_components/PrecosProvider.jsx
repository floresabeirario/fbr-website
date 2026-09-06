"use client";

// ============================================================
// Preços disponíveis em toda a árvore de componentes.
//
// Os preços vêm da tabela `pricing_items` (Finanças → Catálogo no admin)
// e são lidos uma vez por pedido no layout, que é um Server Component.
// Este provider evita passá-los à mão por 10 páginas e 20 componentes
// só porque uma frase lá no fundo diz "a partir de 300€".
//
// Uso: `const precos = usePrecos()` em qualquer componente de cliente,
// depois `t("chave", { quadro30x40: precos.quadro30x40 })`.
//
// Sem provider (ou fora dele) devolve o último valor conhecido, para
// nenhuma página ficar a mostrar um preço vazio.
// ============================================================

import { createContext, useContext } from "react";
import { PRECOS_FALLBACK } from "../_lib/precos-valores";

const PrecosContext = createContext(PRECOS_FALLBACK);

export function PrecosProvider({ precos, children }) {
  return (
    <PrecosContext.Provider value={precos ?? PRECOS_FALLBACK}>
      {children}
    </PrecosContext.Provider>
  );
}

export function usePrecos() {
  return useContext(PrecosContext);
}
