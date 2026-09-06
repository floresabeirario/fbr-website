// app/_lib/precos.js
// ============================================================
// Fonte única de verdade para os preços mostrados no site.
//
// Os preços vivem na tabela `pricing_items` do Supabase, a MESMA que a
// Maria edita em Finanças → Catálogo no admin. Mudar lá muda aqui: não
// há valores para actualizar à mão em dois sítios.
//
// Como funciona:
//   • `getPrecos()` (server-only) lê a tabela, com cache em memória de
//     10 minutos para não pesar nas páginas mais visitadas.
//   • Se a BD falhar, estiver lenta ou faltar uma chave, cai no
//     PRECOS_FALLBACK abaixo. Uma página de preços nunca fica em branco
//     nem mostra "undefined€" — no pior caso mostra o último preço
//     conhecido a 26/08/2026.
//   • Os componentes de cliente NÃO chamam isto: recebem os valores por
//     props a partir do server component da página.
//
// ⚠️ Ao acrescentar um preço novo ao site: juntar a chave a PRICE_KEYS e
// um valor a PRECOS_FALLBACK (ambos em precos-valores.js, que é puro e
// pode ir para o browser). Sem isso o site não o conhece.
// ============================================================

import { createFormsClient } from "./supabase-server";
import { PRECOS_FALLBACK, PRICE_KEYS } from "./precos-valores";

export { PRECOS_FALLBACK, PRICE_KEYS };

// "300.00" → "300" · "12.50" → "12,50" (formato europeu, sem cêntimos
// quando são zero, que é como os preços aparecem no site).
function formatPreco(valor) {
  const n = Number(valor);
  if (!Number.isFinite(n)) return null;
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ",");
}

// Cache de módulo: sobrevive entre pedidos na mesma instância serverless
// e evita uma query por visita. 10 minutos é tempo de sobra para a Maria
// ver uma alteração de preço reflectida no site.
const TTL_MS = 10 * 60 * 1000;
let cache = null; // { at: number, precos: object }

/**
 * Preços actuais do site, lidos do Supabase. Server-only.
 * Nunca lança: em qualquer falha devolve o fallback.
 */
export async function getPrecos() {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.precos;

  try {
    const supabase = createFormsClient();
    if (!supabase) return PRECOS_FALLBACK;

    const { data, error } = await supabase
      .from("pricing_items")
      .select("category, key, price")
      .is("deleted_at", null);

    if (error || !data?.length) {
      console.warn("[precos] Leitura falhou, a usar o fallback:", error?.message);
      return PRECOS_FALLBACK;
    }

    const porChave = new Map(data.map((r) => [`${r.category}:${r.key}`, r.price]));
    const precos = { ...PRECOS_FALLBACK };
    for (const [nome, [categoria, key]] of Object.entries(PRICE_KEYS)) {
      const formatado = formatPreco(porChave.get(`${categoria}:${key}`));
      // Chave em falta na BD mantém o fallback em vez de ficar vazia.
      if (formatado !== null) precos[nome] = formatado;
    }

    cache = { at: Date.now(), precos };
    return precos;
  } catch (err) {
    console.warn("[precos] Excepção, a usar o fallback:", err?.message);
    return PRECOS_FALLBACK;
  }
}
