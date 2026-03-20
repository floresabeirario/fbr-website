"use client";

import { useState, useRef, useEffect } from "react";
import "./PhonePrefix.css";

const COUNTRIES = [
  // ── Mais comuns para este serviço ──
  { flag: "🇵🇹", name: "Portugal",               code: "+351" },
  { flag: "🇧🇷", name: "Brasil",                  code: "+55"  },
  { flag: "🇪🇸", name: "Espanha",                 code: "+34"  },
  { flag: "🇬🇧", name: "Reino Unido",             code: "+44"  },
  { flag: "🇫🇷", name: "França",                  code: "+33"  },
  { flag: "🇩🇪", name: "Alemanha",                code: "+49"  },
  { flag: "🇨🇭", name: "Suíça",                   code: "+41"  },
  { flag: "🇦🇹", name: "Áustria",                 code: "+43"  },
  { flag: "🇳🇱", name: "Países Baixos",           code: "+31"  },
  { flag: "🇧🇪", name: "Bélgica",                 code: "+32"  },
  { flag: "🇮🇹", name: "Itália",                  code: "+39"  },
  { flag: "🇱🇺", name: "Luxemburgo",              code: "+352" },
  { flag: "🇮🇪", name: "Irlanda",                 code: "+353" },
  // ── Resto da Europa ──
  { flag: "🇸🇪", name: "Suécia",                  code: "+46"  },
  { flag: "🇩🇰", name: "Dinamarca",               code: "+45"  },
  { flag: "🇳🇴", name: "Noruega",                 code: "+47"  },
  { flag: "🇫🇮", name: "Finlândia",               code: "+358" },
  { flag: "🇮🇸", name: "Islândia",                code: "+354" },
  { flag: "🇬🇷", name: "Grécia",                  code: "+30"  },
  { flag: "🇨🇾", name: "Chipre",                  code: "+357" },
  { flag: "🇲🇹", name: "Malta",                   code: "+356" },
  { flag: "🇵🇱", name: "Polónia",                 code: "+48"  },
  { flag: "🇨🇿", name: "Chéquia",                 code: "+420" },
  { flag: "🇸🇰", name: "Eslováquia",              code: "+421" },
  { flag: "🇭🇺", name: "Hungria",                 code: "+36"  },
  { flag: "🇷🇴", name: "Roménia",                 code: "+40"  },
  { flag: "🇧🇬", name: "Bulgária",                code: "+359" },
  { flag: "🇭🇷", name: "Croácia",                 code: "+385" },
  { flag: "🇸🇮", name: "Eslovénia",               code: "+386" },
  { flag: "🇪🇪", name: "Estónia",                 code: "+372" },
  { flag: "🇱🇻", name: "Letónia",                 code: "+371" },
  { flag: "🇱🇹", name: "Lituânia",                code: "+370" },
  { flag: "🇷🇸", name: "Sérvia",                  code: "+381" },
  { flag: "🇲🇰", name: "Macedónia do Norte",      code: "+389" },
  { flag: "🇦🇱", name: "Albânia",                 code: "+355" },
  { flag: "🇧🇦", name: "Bósnia-Herzegovina",      code: "+387" },
  { flag: "🇲🇪", name: "Montenegro",              code: "+382" },
  { flag: "🇽🇰", name: "Kosovo",                  code: "+383" },
  { flag: "🇲🇩", name: "Moldávia",                code: "+373" },
  { flag: "🇺🇦", name: "Ucrânia",                 code: "+380" },
  { flag: "🇧🇾", name: "Bielorrússia",            code: "+375" },
  // ── Américas ──
  { flag: "🇺🇸", name: "EUA",                     code: "+1"   },
  { flag: "🇨🇦", name: "Canadá",                  code: "+1"   },
  { flag: "🇲🇽", name: "México",                  code: "+52"  },
  { flag: "🇦🇷", name: "Argentina",               code: "+54"  },
  { flag: "🇨🇴", name: "Colômbia",                code: "+57"  },
  { flag: "🇨🇱", name: "Chile",                   code: "+56"  },
  { flag: "🇵🇪", name: "Peru",                    code: "+51"  },
  { flag: "🇻🇪", name: "Venezuela",               code: "+58"  },
  { flag: "🇺🇾", name: "Uruguai",                 code: "+598" },
  { flag: "🇵🇾", name: "Paraguai",                code: "+595" },
  { flag: "🇧🇴", name: "Bolívia",                 code: "+591" },
  { flag: "🇪🇨", name: "Equador",                 code: "+593" },
  // ── África Lusófona & outras ──
  { flag: "🇦🇴", name: "Angola",                  code: "+244" },
  { flag: "🇲🇿", name: "Moçambique",              code: "+258" },
  { flag: "🇨🇻", name: "Cabo Verde",              code: "+238" },
  { flag: "🇸🇹", name: "S. Tomé e Príncipe",      code: "+239" },
  { flag: "🇬🇼", name: "Guiné-Bissau",            code: "+245" },
  { flag: "🇬🇶", name: "Guiné Equatorial",        code: "+240" },
  { flag: "🇿🇦", name: "África do Sul",           code: "+27"  },
  { flag: "🇳🇬", name: "Nigéria",                 code: "+234" },
  { flag: "🇰🇪", name: "Quénia",                  code: "+254" },
  { flag: "🇬🇭", name: "Gana",                    code: "+233" },
  { flag: "🇲🇦", name: "Marrocos",                code: "+212" },
  // ── Ásia / Médio Oriente ──
  { flag: "🇦🇪", name: "Emirados Árabes",         code: "+971" },
  { flag: "🇸🇦", name: "Arábia Saudita",          code: "+966" },
  { flag: "🇶🇦", name: "Catar",                   code: "+974" },
  { flag: "🇮🇱", name: "Israel",                  code: "+972" },
  { flag: "🇹🇷", name: "Turquia",                 code: "+90"  },
  { flag: "🇮🇳", name: "Índia",                   code: "+91"  },
  { flag: "🇨🇳", name: "China",                   code: "+86"  },
  { flag: "🇯🇵", name: "Japão",                   code: "+81"  },
  { flag: "🇰🇷", name: "Coreia do Sul",           code: "+82"  },
  { flag: "🇸🇬", name: "Singapura",               code: "+65"  },
  { flag: "🇲🇾", name: "Malásia",                 code: "+60"  },
  { flag: "🇹🇭", name: "Tailândia",               code: "+66"  },
  { flag: "🇭🇰", name: "Hong Kong",               code: "+852" },
  // ── Oceânia ──
  { flag: "🇦🇺", name: "Austrália",               code: "+61"  },
  { flag: "🇳🇿", name: "Nova Zelândia",           code: "+64"  },
];

export default function PhonePrefix({ value, onChange, btnClassName = "" }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef(null);
  const searchRef = useRef(null);

  const selected = COUNTRIES.find((c) => c.code === value && c.name === (COUNTRIES.find(x => x.code === value)?.name))
    ?? COUNTRIES.find((c) => c.code === value)
    ?? COUNTRIES[0];

  const filtered = search.trim()
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search)
      )
    : COUNTRIES;

  useEffect(() => {
    function onOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  function handleToggle() {
    const next = !open;
    setOpen(next);
    setSearch("");
    if (next) setTimeout(() => searchRef.current?.focus(), 40);
  }

  function handleSelect(country) {
    onChange(country.code);
    setOpen(false);
    setSearch("");
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") { setOpen(false); setSearch(""); }
  }

  return (
    <div className="pp-wrap" ref={wrapRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={`pp-trigger ${btnClassName}`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Indicativo: ${selected.name} ${selected.code}`}
      >
        <span className="pp-flag" aria-hidden="true">{selected.flag}</span>
        <span className="pp-code">{selected.code}</span>
        <span className="pp-arrow" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="pp-dropdown" role="listbox" aria-label="Seleccionar indicativo">
          <div className="pp-search-wrap">
            <input
              ref={searchRef}
              type="text"
              className="pp-search"
              placeholder="Pesquisar país ou indicativo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Pesquisar país"
            />
          </div>
          <ul className="pp-list">
            {filtered.length === 0 && (
              <li className="pp-empty">Nenhum resultado.</li>
            )}
            {filtered.map((c) => (
              <li
                key={`${c.name}-${c.code}`}
                role="option"
                aria-selected={c.code === value && c.name === selected.name}
                className={`pp-option${c.code === value && c.name === selected.name ? " pp-option-active" : ""}`}
                onClick={() => handleSelect(c)}
              >
                <span className="pp-flag" aria-hidden="true">{c.flag}</span>
                <span className="pp-option-name">{c.name}</span>
                <span className="pp-option-code">{c.code}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
