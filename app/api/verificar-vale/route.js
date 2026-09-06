// ============================================================
// POST /api/verificar-vale — { code } → { existe: true|false|null }
//
// Usado pelo form de reserva para avisar gralhas no código do
// vale-presente ao sair do campo, em vez de a Maria descobrir
// depois no admin. NUNCA devolve dados do vale — só se existe.
// `existe: null` = não foi possível verificar (config/erro/limite);
// o form fica em silêncio nesse caso e nunca bloqueia a submissão.
//
// Usa a mesma RPC `get_voucher_by_code` (anon) que o site do
// voucher — o SELECT directo em `vouchers` está trancado ao anon.
// ============================================================

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createAnonClient } from "@/app/_lib/supabase-server";
import { createRateLimiter, isAllowedOrigin } from "@/app/_lib/api-helpers";

const isRateLimited = createRateLimiter();

export async function POST(request) {
  try {
    const headersList = await headers();

    if (!isAllowedOrigin(headersList.get("origin"), headersList.get("referer"))) {
      return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });
    }

    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    if (isRateLimited(ip)) {
      return NextResponse.json({ existe: null }, { status: 429 });
    }

    let code = "";
    try {
      const body = await request.json();
      code = String(body?.code ?? "");
    } catch {
      // body inválido → tratado como código vazio
    }
    code = code.trim().toUpperCase();
    if (!code || code.length > 12) {
      return NextResponse.json({ existe: null });
    }
    // Códigos são alfanuméricos; outra coisa qualquer não existe de certeza.
    if (!/^[A-Z0-9]+$/.test(code)) {
      return NextResponse.json({ existe: false });
    }

    const supabase = createAnonClient();
    if (!supabase) {
      return NextResponse.json({ existe: null });
    }

    const { data, error } = await supabase.rpc("get_voucher_by_code", { p_code: code });
    if (error) {
      console.error("[verificar-vale] RPC error:", error.message);
      return NextResponse.json({ existe: null });
    }

    const vale = Array.isArray(data) && data.length > 0 ? data[0] : null;
    if (!vale) return NextResponse.json({ existe: false });

    // Desde 06/09/2026 devolve também o valor e se expirou: o resumo do
    // formulário desconta o vale ao total, para a pessoa não ver um sinal
    // que não vai pagar. Quem tem o código já tem estes dados (estão no
    // site do voucher); nome e mensagem continuam a NÃO sair daqui.
    const hoje = new Date().toISOString().slice(0, 10);
    const valor = Number(vale.amount);
    return NextResponse.json({
      existe: true,
      valor: Number.isFinite(valor) ? valor : null,
      expirado: Boolean(vale.expiry_date && vale.expiry_date < hoje),
      validade: vale.expiry_date ?? null,
    });
  } catch (err) {
    console.error("[verificar-vale] error:", err);
    return NextResponse.json({ existe: null });
  }
}
