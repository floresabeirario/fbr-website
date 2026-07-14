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
  { flag: "🇦🇩", name: "Andorra",                 code: "+376" },
  { flag: "🇲🇨", name: "Mónaco",                  code: "+377" },
  { flag: "🇸🇲", name: "San Marino",              code: "+378" },
  { flag: "🇱🇮", name: "Liechtenstein",           code: "+423" },
  { flag: "🇬🇮", name: "Gibraltar",               code: "+350" },
  { flag: "🇫🇴", name: "Ilhas Faroé",             code: "+298" },
  { flag: "🇬🇱", name: "Gronelândia",             code: "+299" },
  { flag: "🇷🇺", name: "Rússia",                  code: "+7"   },
  { flag: "🇬🇪", name: "Geórgia",                 code: "+995" },
  { flag: "🇦🇲", name: "Arménia",                 code: "+374" },
  { flag: "🇦🇿", name: "Azerbaijão",              code: "+994" },
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
  { flag: "🇬🇹", name: "Guatemala",               code: "+502" },
  { flag: "🇧🇿", name: "Belize",                  code: "+501" },
  { flag: "🇸🇻", name: "El Salvador",             code: "+503" },
  { flag: "🇭🇳", name: "Honduras",                code: "+504" },
  { flag: "🇳🇮", name: "Nicarágua",               code: "+505" },
  { flag: "🇨🇷", name: "Costa Rica",              code: "+506" },
  { flag: "🇵🇦", name: "Panamá",                  code: "+507" },
  { flag: "🇨🇺", name: "Cuba",                    code: "+53"  },
  { flag: "🇭🇹", name: "Haiti",                   code: "+509" },
  { flag: "🇩🇴", name: "República Dominicana",    code: "+1"   },
  { flag: "🇵🇷", name: "Porto Rico",              code: "+1"   },
  { flag: "🇯🇲", name: "Jamaica",                 code: "+1"   },
  { flag: "🇹🇹", name: "Trindade e Tobago",       code: "+1"   },
  { flag: "🇧🇧", name: "Barbados",                code: "+1"   },
  { flag: "🇧🇸", name: "Bahamas",                 code: "+1"   },
  { flag: "🇬🇾", name: "Guiana",                  code: "+592" },
  { flag: "🇸🇷", name: "Suriname",                code: "+597" },
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
  { flag: "🇪🇬", name: "Egipto",                  code: "+20"  },
  { flag: "🇩🇿", name: "Argélia",                 code: "+213" },
  { flag: "🇹🇳", name: "Tunísia",                 code: "+216" },
  { flag: "🇱🇾", name: "Líbia",                   code: "+218" },
  { flag: "🇸🇩", name: "Sudão",                   code: "+249" },
  { flag: "🇸🇸", name: "Sudão do Sul",            code: "+211" },
  { flag: "🇲🇷", name: "Mauritânia",              code: "+222" },
  { flag: "🇸🇳", name: "Senegal",                 code: "+221" },
  { flag: "🇬🇲", name: "Gâmbia",                  code: "+220" },
  { flag: "🇬🇳", name: "Guiné-Conacri",           code: "+224" },
  { flag: "🇸🇱", name: "Serra Leoa",              code: "+232" },
  { flag: "🇱🇷", name: "Libéria",                 code: "+231" },
  { flag: "🇨🇮", name: "Costa do Marfim",         code: "+225" },
  { flag: "🇧🇫", name: "Burkina Faso",            code: "+226" },
  { flag: "🇲🇱", name: "Mali",                    code: "+223" },
  { flag: "🇳🇪", name: "Níger",                   code: "+227" },
  { flag: "🇹🇬", name: "Togo",                    code: "+228" },
  { flag: "🇧🇯", name: "Benim",                   code: "+229" },
  { flag: "🇨🇲", name: "Camarões",                code: "+237" },
  { flag: "🇹🇩", name: "Chade",                   code: "+235" },
  { flag: "🇨🇫", name: "República Centro-Africana", code: "+236" },
  { flag: "🇬🇦", name: "Gabão",                   code: "+241" },
  { flag: "🇨🇬", name: "Congo-Brazzaville",       code: "+242" },
  { flag: "🇨🇩", name: "RD Congo",                code: "+243" },
  { flag: "🇷🇼", name: "Ruanda",                  code: "+250" },
  { flag: "🇧🇮", name: "Burundi",                 code: "+257" },
  { flag: "🇪🇹", name: "Etiópia",                 code: "+251" },
  { flag: "🇪🇷", name: "Eritreia",                code: "+291" },
  { flag: "🇩🇯", name: "Djibuti",                 code: "+253" },
  { flag: "🇸🇴", name: "Somália",                 code: "+252" },
  { flag: "🇹🇿", name: "Tanzânia",                code: "+255" },
  { flag: "🇺🇬", name: "Uganda",                  code: "+256" },
  { flag: "🇿🇲", name: "Zâmbia",                  code: "+260" },
  { flag: "🇿🇼", name: "Zimbabué",                code: "+263" },
  { flag: "🇲🇼", name: "Malawi",                  code: "+265" },
  { flag: "🇲🇬", name: "Madagáscar",              code: "+261" },
  { flag: "🇲🇺", name: "Maurícia",                code: "+230" },
  { flag: "🇸🇨", name: "Seicheles",               code: "+248" },
  { flag: "🇰🇲", name: "Comores",                 code: "+269" },
  { flag: "🇳🇦", name: "Namíbia",                 code: "+264" },
  { flag: "🇧🇼", name: "Botsuana",                code: "+267" },
  { flag: "🇱🇸", name: "Lesoto",                  code: "+266" },
  { flag: "🇸🇿", name: "Essuatíni",               code: "+268" },
  { flag: "🇷🇪", name: "Reunião",                 code: "+262" },
  // ── Ásia / Médio Oriente ──
  { flag: "🇲🇴", name: "Macau",                   code: "+853" },
  { flag: "🇹🇱", name: "Timor-Leste",             code: "+670" },
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
  { flag: "🇰🇼", name: "Kuwait",                  code: "+965" },
  { flag: "🇧🇭", name: "Bahrein",                 code: "+973" },
  { flag: "🇴🇲", name: "Omã",                     code: "+968" },
  { flag: "🇯🇴", name: "Jordânia",                code: "+962" },
  { flag: "🇱🇧", name: "Líbano",                  code: "+961" },
  { flag: "🇮🇶", name: "Iraque",                  code: "+964" },
  { flag: "🇸🇾", name: "Síria",                   code: "+963" },
  { flag: "🇾🇪", name: "Iémen",                   code: "+967" },
  { flag: "🇮🇷", name: "Irão",                    code: "+98"  },
  { flag: "🇦🇫", name: "Afeganistão",             code: "+93"  },
  { flag: "🇵🇰", name: "Paquistão",               code: "+92"  },
  { flag: "🇧🇩", name: "Bangladesh",              code: "+880" },
  { flag: "🇱🇰", name: "Sri Lanka",               code: "+94"  },
  { flag: "🇲🇻", name: "Maldivas",                code: "+960" },
  { flag: "🇳🇵", name: "Nepal",                   code: "+977" },
  { flag: "🇧🇹", name: "Butão",                   code: "+975" },
  { flag: "🇲🇲", name: "Mianmar",                 code: "+95"  },
  { flag: "🇱🇦", name: "Laos",                    code: "+856" },
  { flag: "🇰🇭", name: "Camboja",                 code: "+855" },
  { flag: "🇻🇳", name: "Vietname",                code: "+84"  },
  { flag: "🇮🇩", name: "Indonésia",               code: "+62"  },
  { flag: "🇵🇭", name: "Filipinas",               code: "+63"  },
  { flag: "🇧🇳", name: "Brunei",                  code: "+673" },
  { flag: "🇹🇼", name: "Taiwan",                  code: "+886" },
  { flag: "🇲🇳", name: "Mongólia",                code: "+976" },
  { flag: "🇰🇿", name: "Cazaquistão",             code: "+7"   },
  { flag: "🇺🇿", name: "Uzbequistão",             code: "+998" },
  { flag: "🇰🇬", name: "Quirguistão",             code: "+996" },
  { flag: "🇹🇯", name: "Tajiquistão",             code: "+992" },
  { flag: "🇹🇲", name: "Turquemenistão",          code: "+993" },
  // ── Oceânia ──
  { flag: "🇦🇺", name: "Austrália",               code: "+61"  },
  { flag: "🇳🇿", name: "Nova Zelândia",           code: "+64"  },
  { flag: "🇫🇯", name: "Fiji",                    code: "+679" },
  { flag: "🇵🇬", name: "Papua-Nova Guiné",        code: "+675" },
  { flag: "🇸🇧", name: "Ilhas Salomão",           code: "+677" },
  { flag: "🇻🇺", name: "Vanuatu",                 code: "+678" },
  { flag: "🇼🇸", name: "Samoa",                   code: "+685" },
  { flag: "🇹🇴", name: "Tonga",                   code: "+676" },
  { flag: "🇰🇮", name: "Kiribati",                code: "+686" },
  { flag: "🇫🇲", name: "Micronésia",              code: "+691" },
  { flag: "🇲🇭", name: "Ilhas Marshall",          code: "+692" },
  { flag: "🇵🇼", name: "Palau",                   code: "+680" },
  { flag: "🇳🇷", name: "Nauru",                   code: "+674" },
  { flag: "🇹🇻", name: "Tuvalu",                  code: "+688" },
  { flag: "🇵🇫", name: "Polinésia Francesa",      code: "+689" },
  { flag: "🇳🇨", name: "Nova Caledónia",          code: "+687" },
];

export default function PhonePrefix({ value, onChange, btnClassName = "" }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  // Vários países partilham o mesmo indicativo (+1, +7…); guardamos o nome
  // escolhido para o botão mostrar o país certo e não o primeiro da lista.
  const [selectedName, setSelectedName] = useState(null);
  const wrapRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);

  const selected = COUNTRIES.find((c) => c.code === value && c.name === selectedName)
    ?? COUNTRIES.find((c) => c.code === value)
    ?? COUNTRIES[0];

  const filtered = search.trim()
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search)
      )
    : COUNTRIES;

  // Fecha ao clicar fora
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
    setSelectedName(country.name);
    onChange(country.code);
    setOpen(false);
    setSearch("");
  }

  // Navegação por teclado no botão trigger
  function handleTriggerKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
      return;
    }
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      setSearch("");
      setTimeout(() => searchRef.current?.focus(), 40);
    }
  }

  // Navegação por teclado na lista de opções
  function handleListKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
      return;
    }
    if (e.key === "Tab") {
      setOpen(false);
      setSearch("");
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const items = listRef.current?.querySelectorAll('[role="option"]');
      if (!items?.length) return;
      const arr = Array.from(items);
      const focused = document.activeElement;
      const idx = arr.indexOf(focused);
      if (e.key === "ArrowDown") {
        (arr[idx + 1] ?? arr[0])?.focus();
      } else {
        (arr[idx - 1] ?? arr[arr.length - 1])?.focus();
      }
    }
  }

  // ArrowDown na pesquisa move foco para a primeira opção
  function handleSearchKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      listRef.current?.querySelector('[role="option"]')?.focus();
    }
  }

  return (
    <div className="pp-wrap" ref={wrapRef}>
      <button
        type="button"
        className={`pp-trigger ${btnClassName}`}
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Indicativo: ${selected.name} ${selected.code}`}
      >
        <span className="pp-flag" aria-hidden="true">{selected.flag}</span>
        <span className="pp-code">{selected.code}</span>
        <span className="pp-arrow" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div
          className="pp-dropdown"
          role="listbox"
          aria-label="Seleccionar indicativo"
          onKeyDown={handleListKeyDown}
        >
          <div className="pp-search-wrap">
            <input
              ref={searchRef}
              type="text"
              className="pp-search"
              placeholder="Pesquisar país ou indicativo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              aria-label="Pesquisar país"
              aria-autocomplete="list"
            />
          </div>
          <ul className="pp-list" ref={listRef}>
            {filtered.length === 0 && (
              <li className="pp-empty">Nenhum resultado.</li>
            )}
            {filtered.map((c) => (
              <li
                key={`${c.name}-${c.code}`}
                role="option"
                tabIndex={0}
                aria-selected={c.code === value && c.name === selected.name}
                className={`pp-option${c.code === value && c.name === selected.name ? " pp-option-active" : ""}`}
                onClick={() => handleSelect(c)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(c);
                  }
                }}
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
