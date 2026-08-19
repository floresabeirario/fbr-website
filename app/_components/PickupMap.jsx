"use client";

// ============================================================
// Mapa de confirmação da morada de recolha.
//
// Só aparece depois de a pessoa escolher uma sugestão. Serve para ela
// reconhecer o sítio e reparar se calhou noutro com nome parecido.
//
// Ao contrário do autocomplete (que passa pelo nosso servidor), o
// mapa é desenhado pela biblioteca da Google no browser — não há
// outra forma de haver zoom e arrastar. Por isso usa uma chave de
// browser própria (`NEXT_PUBLIC_GOOGLE_MAPS_KEY`), que deve estar
// restringida ao domínio do site e só à "Maps JavaScript API".
//
// A biblioteca só é carregada quando há mesmo uma morada escolhida:
// quem não pede recolha nunca paga o peso disto no telemóvel.
// ============================================================

import { useEffect, useRef, useState } from "react";

const BROWSER_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const CALLBACK = "__fbrMapsPronto";

// Uma só carga por sessão, partilhada por qualquer mapa da página.
let mapsPromise = null;

function loadMaps(language) {
  if (!BROWSER_KEY) return Promise.reject(new Error("sem chave de browser"));
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve(window.google.maps);
      return;
    }
    window[CALLBACK] = () => resolve(window.google.maps);
    const script = document.createElement("script");
    const params = new URLSearchParams({
      key: BROWSER_KEY,
      language,
      region: "PT",
      callback: CALLBACK,
      loading: "async",
    });
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = () => reject(new Error("script do Maps falhou"));
    document.head.appendChild(script);
  });

  return mapsPromise;
}

const ZOOM_INICIAL = 16;

export default function PickupMap({ lat, lng, locale = "pt", label, textoRecentrar }) {
  const divRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [falhou, setFalhou] = useState(false);
  // O botão de recentrar só faz sentido depois de a pessoa mexer no mapa.
  const [saiuDoSitio, setSaiuDoSitio] = useState(false);
  // Se a Google deixar de aceitar o marcador clássico, desenhamos um
  // pino nosso no centro em vez de ficar um mapa sem indicação.
  const [pinoProprio, setPinoProprio] = useState(false);

  useEffect(() => {
    if (!BROWSER_KEY) {
      setFalhou(true);
      return;
    }
    let cancelado = false;

    loadMaps(locale === "en" ? "en" : "pt")
      .then((maps) => {
        if (cancelado || !divRef.current) return;
        const posicao = { lat, lng };

        if (!mapRef.current) {
          mapRef.current = new maps.Map(divRef.current, {
            center: posicao,
            zoom: ZOOM_INICIAL,
            // "cooperative": no telemóvel só arrasta com dois dedos e no
            // computador só faz zoom com Ctrl. Sem isto, o mapa rouba o
            // scroll da página e a pessoa fica presa a meio do formulário.
            gestureHandling: "cooperative",
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
          });
          // "idle" dispara sempre que o mapa assenta depois de mexido.
          // Só mostramos o botão quando ela já se afastou do pino, para
          // não pôr mais um controlo por cima do mapa sem necessidade.
          mapRef.current.addListener("idle", () => {
            const c = mapRef.current?.getCenter();
            if (!c) return;
            const longe =
              Math.abs(c.lat() - lat) > 0.0006 ||
              Math.abs(c.lng() - lng) > 0.0006 ||
              mapRef.current.getZoom() !== ZOOM_INICIAL;
            setSaiuDoSitio(longe);
          });
        } else {
          mapRef.current.setCenter(posicao);
          mapRef.current.setZoom(ZOOM_INICIAL);
        }

        try {
          if (markerRef.current) {
            markerRef.current.setPosition(posicao);
          } else {
            markerRef.current = new maps.Marker({
              map: mapRef.current,
              position: posicao,
              title: label,
            });
          }
        } catch {
          setPinoProprio(true);
        }
      })
      .catch(() => {
        if (!cancelado) setFalhou(true);
      });

    return () => {
      cancelado = true;
    };
  }, [lat, lng, locale, label]);

  // Sem chave ou com a Google em baixo o mapa simplesmente não aparece.
  // A morada continua preenchida e a reserva segue igual.
  if (falhou) return null;

  return (
    <div className="pf-mapa">
      <div ref={divRef} className="pf-mapa-tela" role="img" aria-label={label} />
      {pinoProprio && <span className="pf-mapa-pino" aria-hidden="true" />}
      {saiuDoSitio && (
        // type="button" é essencial: dentro de um <form>, um botão sem
        // tipo submete a reserva.
        <button
          type="button"
          className="pf-mapa-recentrar"
          onClick={() => {
            mapRef.current?.setCenter({ lat, lng });
            mapRef.current?.setZoom(ZOOM_INICIAL);
          }}
        >
          {textoRecentrar}
        </button>
      )}
    </div>
  );
}
