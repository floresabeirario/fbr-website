// Grupo de "pílulas" de escolha única para perguntas com poucas opções curtas
// (meio de contacto, tipo de evento, tamanho da moldura). Substitui o <select>
// nesses casos: vêem-se todas as opções de uma vez, no telemóvel não abre o
// picker nativo, e quebra a monotonia de um formulário só de caixas iguais.
//
// Por baixo são <input type="radio"> a sério, escondidos mas focáveis: o
// teclado funciona (Tab entra no grupo, setas mudam a escolha), os leitores
// de ecrã anunciam o grupo pela <legend> do Field que o envolve, e o
// focusField() do formulário continua a encontrar um input para focar.
//
// Usar sempre dentro de <Field as="fieldset">.
export default function PillGroup({ name, options, value, onChange, error }) {
  return (
    <div className={`pf-pills${error ? " pf-pills-err" : ""}`}>
      {options.map((o) => {
        const on = value === o.valor;
        return (
          <label key={o.valor} className={`pf-pill${on ? " pf-pill-on" : ""}`}>
            <input
              type="radio"
              className="pf-pill-input"
              name={`pf-${name}`}
              value={o.valor}
              checked={on}
              onChange={() => onChange(o.valor)}
            />
            <span className="pf-pill-dot" aria-hidden="true" />
            <span className="pf-pill-texto">{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}
