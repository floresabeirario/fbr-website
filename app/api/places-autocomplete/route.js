// app/api/places-autocomplete/route.js
// ============================================================
// Proxy para o Google Places Autocomplete (API "New"), usado pelo
// campo de morada da recolha no formulário de reserva.
//
// Porquê um proxy e não a biblioteca JS no browser (como no admin):
//   • a chave nunca sai do servidor. Uma chave `NEXT_PUBLIC_*` num
//     site público é copiável por qualquer pessoa e as chamadas
//     dela aparecem na nossa factura da Google.
//   • o browser da visitante nunca contacta a Google, por isso não
//     há partilha de IP com terceiros (mantém o site limpo de RGPD,
//     na mesma linha das fontes servidas localmente).
//   • zero peso no bundle do telemóvel.
//
// Degrada com elegância: sem chave configurada devolve 200 com uma
// lista vazia e `disabled: true`. O campo do formulário continua a
// funcionar como caixa de texto normal e nada se perde.
//
// Env var: GOOGLE_MAPS_KEY (server-side). A chave TEM de estar sem
// restrição de "HTTP referrer" — quem chama é o servidor, não o
// browser. Restringir por API (só "Places API (New)") é o correcto.
// ============================================================

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { isAllowedOrigin } from "@/app/_lib/api-helpers";

const PLACES_URL = "https://places.googleapis.com/v1/places:autocomplete";

// A chave server-side é a preferida. Aceitamos também a variante
// NEXT_PUBLIC_* para o caso de ser copiada do admin, mas essa costuma
// estar restringida por referrer e falhará aqui — o log diz porquê.
const API_KEY =
  process.env.GOOGLE_MAPS_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

// Só os campos que usamos — resposta mais pequena e mais barata.
const FIELD_MASK = [
  "suggestions.placePrediction.placeId",
  "suggestions.placePrediction.text",
  "suggestions.placePrediction.structuredFormat",
].join(",");

// Rate limit próprio: escrever uma morada gera várias pesquisas, por
// isso o limite de 5/min dos formulários não serve aqui. 40/min/IP dá
// folga a quem escreve devagar e trava scraping da nossa quota.
const MAX_PER_MINUTE = 40;
const hits = new Map(); // ip → { count, resetAt }

function isRateLimited(ip) {
  const now = Date.now();
  if (hits.size > 500) {
    for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
  }
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= MAX_PER_MINUTE) return true;
  entry.count++;
  return false;
}

export async function POST(request) {
  try {
    const headersList = await headers();

    // Impede que outros sites usem a nossa chave (e a nossa factura).
    if (!isAllowedOrigin(headersList.get("origin"), headersList.get("referer"))) {
      return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });
    }

    if (!API_KEY) {
      // Sem chave o campo comporta-se como input de texto simples.
      return NextResponse.json({ suggestions: [], disabled: true });
    }

    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    if (isRateLimited(ip)) {
      return NextResponse.json({ suggestions: [], disabled: true }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const input = typeof body.input === "string" ? body.input.trim().slice(0, 200) : "";
    if (input.length < 3) {
      return NextResponse.json({ suggestions: [] });
    }

    const locale = body.locale === "en" ? "en" : "pt";

    const res = await fetch(PLACES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify({
        input,
        // A recolha é sempre em Portugal — filtrar reduz ruído e custo.
        includedRegionCodes: ["pt"],
        languageCode: locale,
        regionCode: "PT",
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        "[places-autocomplete] Google respondeu",
        res.status,
        detail.slice(0, 500),
      );
      // Nunca propagamos o erro para a cliente: o campo continua
      // utilizável à mão, apenas sem sugestões.
      return NextResponse.json({ suggestions: [], disabled: true });
    }

    const json = await res.json();
    const suggestions = (json.suggestions ?? [])
      .map((s) => s.placePrediction)
      .filter(Boolean)
      .map((p) => ({
        placeId: p.placeId,
        // `text.text` já vem como morada completa e legível — evita uma
        // segunda chamada (Place Details), que seria paga à parte.
        full: p.text?.text ?? "",
        mainText: p.structuredFormat?.mainText?.text ?? p.text?.text ?? "",
        secondaryText: p.structuredFormat?.secondaryText?.text ?? "",
      }))
      .filter((s) => s.full);

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("[places-autocomplete] erro:", err);
    return NextResponse.json({ suggestions: [], disabled: true });
  }
}
