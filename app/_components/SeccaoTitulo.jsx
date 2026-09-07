// Cabeçalho de secção dos formulários de reserva (preservação e flores secas).
//
// O formulário tinha sete cartões iguais com um título pequeno, e o olho não
// distinguia "Dados pessoais" de "Extras". O numeral em TAN Memories repete a
// barra "01 02 03" do topo da página e dá noção de progresso; a linha de
// contexto diz em poucas palavras para que serve cada bloco.
//
// O Resumo não leva numeral: não é um passo, é o resultado dos outros.
export default function SeccaoTitulo({ n, id, titulo, lead }) {
  return (
    <div className="pf-section-head">
      {n != null && (
        <span className="pf-section-n" aria-hidden="true">
          {String(n).padStart(2, "0")}
        </span>
      )}
      <div className="pf-section-head-texto">
        <h2 className="pf-section-title" id={id}>{titulo}</h2>
        {lead && <p className="pf-section-lead">{lead}</p>}
      </div>
    </div>
  );
}
