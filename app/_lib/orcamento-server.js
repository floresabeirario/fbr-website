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
import { formatEuro, computePricingSnapshot, itemsFromPrecos } from "./orcamento";

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
        additional_main_frames: payload.additional_main_frames ?? {},
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

/**
 * Bloco HTML com o orçamento estimado para o email de notificação à FBR:
 * total + uma linha por item do snapshot (a mesma decomposição que o
 * cliente viu no resumo). Devolve "" quando não há snapshot. Pedido da
 * Maria (07/09/2026): o email listava os campos todos mas não o total.
 */
export function orcamentoEmailHtml(payload) {
  const snap = payload?.pricing_snapshot;
  if (!snap || !Array.isArray(snap.lines)) return "";
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const itens = snap.lines
    .filter((l) => l.subtotal > 0)
    .map((l) => {
      const rotulo = esc(l.label) + (l.variant === "additional" ? " (quadro adicional)" : "");
      const conta = l.qty > 1 ? `${l.qty} × ${formatEuro(l.unit_price)} = ` : "";
      return `<li>${rotulo}: ${conta}${formatEuro(l.subtotal)}</li>`;
    })
    .join("");
  const titulo = snap.provisional
    ? `Orçamento provisório: ${formatEuro(snap.total)} <span style="font-weight:400;color:#666;">(tamanho por decidir, calculado com a 30x40)</span>`
    : `Orçamento estimado: ${formatEuro(snap.total)}`;
  return `<p style="font-family:sans-serif;font-size:15px;margin:14px 0 4px;"><strong>${titulo}</strong></p>`
    + `<ul style="font-family:sans-serif;font-size:13px;color:#444;margin:0 0 16px;padding-left:18px;line-height:1.6;">${itens}</ul>`;
}
