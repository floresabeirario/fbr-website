// app/_lib/orcamento-server.js
// ============================================================
// Orçamento a gravar na encomenda quando o pedido entra pelo site.
//
// Até 06/09/2026 as encomendas do site chegavam ao admin sem orçamento:
// ficava vazio até a Maria carregar em "Calcular automaticamente". Agora
// que o formulário mostra o resumo com o total, o admin tem de mostrar o
// MESMO número que o cliente viu. Por isso a API calcula o snapshot com
// as regras partilhadas (orcamento.js) e grava `budget` + `pricing_snapshot`
// tal como o admin faria.
//
// No admin, o orçamento continua editável à mão (descontos, acertos):
// enquanto `budget` == `pricing_snapshot.total` é "automático" e
// recalcula-se sozinho quando ela muda o tamanho na fase de design; assim
// que ela escreve outro valor, passa a "Auto · editado" e fica como está.
//
// Server-only: lê `pricing_items` com o cliente dos formulários.
// ============================================================

import { getPrecos } from "./precos";
import { computePricingSnapshot, itemsFromPrecos } from "./orcamento";

/**
 * Devolve `{ budget, pricing_snapshot }` para juntar ao payload de
 * INSERT, ou `{}` se não for possível calcular (nunca bloqueia o pedido:
 * a Maria calcula depois no admin, como antes).
 */
export async function camposOrcamento(supabase, payload) {
  try {
    let items = null;
    if (supabase) {
      const { data, error } = await supabase
        .from("pricing_items")
        .select("category, key, label, price, deleted_at")
        .is("deleted_at", null);
      if (!error && data?.length) items = data.map((r) => ({ ...r, price: Number(r.price) }));
    }
    // Sem leitura da tabela (permissões, rede): usa o mesmo mapa de
    // preços que a página do formulário mostrou ao cliente.
    if (!items) items = itemsFromPrecos(await getPrecos());

    const snap = computePricingSnapshot(
      {
        service_type: payload.service_type ?? "preservacao",
        frame_size: payload.frame_size ?? null,
        frame_background: payload.frame_background ?? null,
        museum_glass: payload.museum_glass ?? "nao_sei",
        museum_glass_mini: payload.museum_glass_mini ?? "nao_sei",
        pyramid_frame: false,
        extra_small_frames: payload.extra_small_frames ?? null,
        extra_small_frames_qty: payload.extra_small_frames_qty ?? null,
        christmas_ornaments: payload.christmas_ornaments ?? null,
        christmas_ornaments_qty: payload.christmas_ornaments_qty ?? null,
        necklace_pendants: payload.necklace_pendants ?? null,
        necklace_pendants_qty: payload.necklace_pendants_qty ?? null,
      },
      items,
    );
    if (!snap) return {};
    return { budget: snap.total, pricing_snapshot: snap };
  } catch (err) {
    console.warn("[orcamento] não foi possível calcular o orçamento:", err?.message);
    return {};
  }
}
