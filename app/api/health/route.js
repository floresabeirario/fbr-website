// app/api/health/route.js
// Verifica que os FORMULÁRIOS conseguem mesmo funcionar — ou seja, que a
// app consegue ESCREVER no Supabase (o backend real desde 2026-05-08) e que
// o envio de e-mail (Resend) está configurado.
//
// Antes este health check só testava o Monday.com, que os forms já não usam.
// Resultado: se o Supabase partisse (o caso real), o alarme não dava por nada.
//
// O teste de escrita é uma submissão de TESTE de ponta-a-ponta: usa o mesmo
// mapeamento e a mesma chave anónima dos forms para inserir uma encomenda e um
// vale "sentinela", e depois apaga-os via a função `cleanup_form_healthchecks`
// (SECURITY DEFINER, migração 077 do admin). Assim testamos exactamente o que
// o cliente faz, sem deixar lixo na base de dados.

import { NextResponse } from "next/server";
import {
  createAnonClient,
  createFormsClient,
} from "@/app/_lib/supabase-server";
import {
  mapReservaToOrder,
  mapValeToVoucher,
} from "@/app/_lib/supabase-mappings";

export const dynamic = "force-dynamic";

const SENTINEL_EMAIL = "healthcheck@floresabeirario.pt";
const SENTINEL_NAME = "HEALTHCHECK — apagar";

// Leitura: confirma que conseguimos chegar às tabelas (conectividade + grant
// de SELECT ao anónimo). Não conta linhas reais — head:true.
async function checkSupabaseRead(supabase) {
  try {
    const [orders, vouchers] = await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }),
      supabase.from("vouchers").select("id", { count: "exact", head: true }),
    ]);
    if (orders.error)
      return { ok: false, reason: `Tabela orders: ${orders.error.message}` };
    if (vouchers.error)
      return { ok: false, reason: `Tabela vouchers: ${vouchers.error.message}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: `Supabase inacessível: ${err.message}` };
  }
}

// Escrita real: insere uma encomenda + um vale sentinela (mesma chave anónima
// e mesmo mapeamento dos forms) e limpa logo a seguir. É isto que apanha uma
// policy/grant/coluna partida — a causa típica de "o form dá erro".
async function checkSupabaseWrite(supabase) {
  let orderInserted = false;
  let voucherInserted = false;
  try {
    const { payload: orderPayload, errors: orderErrors } = mapReservaToOrder(
      { nome: SENTINEL_NAME, email: SENTINEL_EMAIL, dataEvento: "2099-12-31", locale: "pt" },
      {},
    );
    if (orderErrors.length)
      return { ok: false, reason: `Mapeamento da reserva: ${orderErrors.join(", ")}` };

    const ins1 = await supabase.from("orders").insert(orderPayload).select("id").single();
    if (ins1.error)
      return { ok: false, reason: `INSERT em orders falhou: ${ins1.error.message}` };
    orderInserted = true;

    const { payload: voucherPayload, errors: voucherErrors } = mapValeToVoucher(
      { nome: SENTINEL_NAME, email: SENTINEL_EMAIL, nomeDestinatario: SENTINEL_NAME, valorVale: 300, locale: "pt" },
      {},
    );
    if (voucherErrors.length)
      return { ok: false, reason: `Mapeamento do vale: ${voucherErrors.join(", ")}` };

    const ins2 = await supabase.from("vouchers").insert(voucherPayload).select("id").single();
    if (ins2.error)
      return { ok: false, reason: `INSERT em vouchers falhou: ${ins2.error.message}` };
    voucherInserted = true;

    return { ok: true };
  } catch (err) {
    return { ok: false, reason: `Erro no teste de escrita: ${err.message}` };
  } finally {
    // Limpeza — corre sempre, mesmo que algo acima tenha falhado a meio.
    if (orderInserted || voucherInserted) {
      try {
        await supabase.rpc("cleanup_form_healthchecks");
      } catch {
        // Se a função não existir ainda, a limpeza falha em silêncio; as
        // linhas sentinela ficam marcadas e são fáceis de identificar/apagar.
      }
    }
  }
}

function checkResend() {
  // Chaves do Resend só-de-envio devolvem 401 nos endpoints de leitura mesmo
  // sendo válidas — por isso verificamos apenas a presença da variável.
  if (!process.env.RESEND_API_KEY)
    return { ok: false, reason: "RESEND_API_KEY não configurado" };
  return { ok: true };
}

export async function GET() {
  // Leitura testa o que um visitante anónimo vê (sites de status/voucher);
  // escrita testa o caminho REAL dos forms (service role com fallback anon
  // — ver supabase-server.js).
  const anon = createAnonClient();
  const forms = createFormsClient();
  if (!anon || !forms) {
    return NextResponse.json(
      {
        ok: false,
        supabaseRead: { ok: false, reason: "SUPABASE_URL/ANON_KEY não configurados" },
        supabaseWrite: { ok: false, reason: "SUPABASE_URL/ANON_KEY não configurados" },
        resend: checkResend(),
        checkedAt: new Date().toISOString(),
      },
      { status: 503 },
    );
  }

  const read = await checkSupabaseRead(anon);
  // Só tentamos escrever se a leitura passou (senão o erro de escrita seria
  // redundante e ainda deixava sentinelas se a limpeza também falhasse).
  const write = read.ok
    ? await checkSupabaseWrite(forms)
    : { ok: false, reason: "Saltado — leitura ao Supabase falhou" };
  const resend = checkResend();

  const ok = read.ok && write.ok && resend.ok;

  return NextResponse.json(
    {
      ok,
      supabaseRead: read,
      supabaseWrite: write,
      resend,
      checkedAt: new Date().toISOString(),
    },
    { status: ok ? 200 : 503 },
  );
}
