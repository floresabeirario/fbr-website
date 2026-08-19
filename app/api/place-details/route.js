// app/api/place-details/route.js
// ============================================================
// Devolve as coordenadas de um lugar escolhido no autocomplete de
// morada, para o mapa de confirmação do formulário de reserva.
//
// Continua tudo do lado do servidor (mesma chave `GOOGLE_MAPS_KEY`,
// mesmas defesas) — só o desenho do mapa é que corre no browser, e
// esse usa uma chave de browser própria e limitada.
//
// Pede apenas `location` + `formattedAddress`, que pertencem ao
// escalão "Essentials" do Places API (New): 10.000 pedidos grátis
// por mês, muito acima do que este site faz.
//
// Degrada com elegância: qualquer falha devolve 200 sem coordenadas.
// O formulário fica sem mapa, a morada continua preenchida e a
// reserva segue na mesma.
// ============================================================

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { isAllowedOrigin } from "@/app/_lib/api-helpers";

const API_KEY =
  process.env.GOOGLE_MAPS_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

const FIELD_MASK = "location,formattedAddress";

// Um pedido por morada escolhida — bem menos do que o autocomplete.
const MAX_PER_MINUTE = 20;
const hits = new Map();

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

    if (!isAllowedOrigin(headersList.get("origin"), headersList.get("referer"))) {
      return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });
    }

    if (!API_KEY) return NextResponse.json({ location: null });

    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    if (isRateLimited(ip)) return NextResponse.json({ location: null }, { status: 429 });

    const body = await request.json().catch(() => ({}));
    const placeId = typeof body.placeId === "string" ? body.placeId.trim() : "";
    // Os place ids da Google são alfanuméricos com "-" e "_". Validar
    // impede que o valor recebido componha outro caminho da API.
    if (!placeId || !/^[A-Za-z0-9_-]{1,255}$/.test(placeId)) {
      return NextResponse.json({ location: null });
    }

    const locale = body.locale === "en" ? "en" : "pt";

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=${locale}&regionCode=PT`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": FIELD_MASK,
        },
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[place-details] Google respondeu", res.status, detail.slice(0, 500));
      return NextResponse.json({ location: null });
    }

    const json = await res.json();
    const lat = json.location?.latitude;
    const lng = json.location?.longitude;
    if (typeof lat !== "number" || typeof lng !== "number") {
      return NextResponse.json({ location: null });
    }

    return NextResponse.json({
      location: { lat, lng },
      formattedAddress: json.formattedAddress ?? null,
    });
  } catch (err) {
    console.error("[place-details] erro:", err);
    return NextResponse.json({ location: null });
  }
}
