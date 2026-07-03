// app/_lib/supabase-server.js
// ============================================================
// Clientes Supabase para as rotas de SERVIDOR do site.
//
// createFormsClient() — para ESCREVER (forms de reserva e vale +
// teste de escrita do /api/health). Prefere a SERVICE_ROLE_KEY
// (secreta, nunca sai do servidor): permite revogar o INSERT
// anónimo na BD (mig 084 do admin), fechando a porta a quem
// tentasse contornar o Turnstile/honeypot/rate-limit falando
// directamente com o PostgREST com a anon key (que é pública).
// Sem a env var definida, cai para a anon key — comportamento
// antigo, para nada partir durante a transição. ATENÇÃO: a mig
// 084 só pode correr DEPOIS de a env var estar na Vercel e o
// site re-deployado; ao contrário, os forms partem.
//
// createAnonClient() — para LEITURAS que devem testar exactamente
// o que um visitante anónimo consegue (health check de leitura).
// ============================================================

import { createClient } from "@supabase/supabase-js";

export function createFormsClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = serviceKey || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!serviceKey) {
    console.warn(
      "[forms] SUPABASE_SERVICE_ROLE_KEY não definida — a usar a anon key (modo de transição).",
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export function createAnonClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
