"use client";

// ============================================================
// Aviso de rascunho recuperado (topo do formulário).
//
// A Maria carregou em "Começar de novo" a pensar que era o botão para
// ficar com o que já tinha preenchido: com um só botão, a única acção
// visível parecia ser a de continuar. Agora há dois, o de continuar em
// primeiro e destacado, e o de apagar pede confirmação antes de deitar
// fora o formulário.
//
// Partilhado pelos formulários de Preservação e de Emoldurar (o CSS vive
// em reservar-preservacao/ReservarPreservacaoClient.css, que os dois
// importam).
// ============================================================

import { useState } from "react";
import { useTranslations } from "next-intl";

const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconRecomecar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </svg>
);

export default function AvisoRascunho({ onManter, onLimpar }) {
  const t = useTranslations("formReserva");
  const [aConfirmar, setAConfirmar] = useState(false);

  if (aConfirmar) {
    return (
      <div className="pf-rascunho pf-rascunho-confirma" role="status">
        <p className="pf-rascunho-texto">
          <strong>{t("rascunhoConfirmaTitulo")}</strong>
          {t("rascunhoConfirmaTexto")}
        </p>
        <div className="pf-rascunho-accoes">
          <button type="button" className="pf-rascunho-btn pf-rascunho-btn-manter"
                  onClick={() => setAConfirmar(false)}>
            <IconCheck /> {t("rascunhoConfirmaNao")}
          </button>
          <button type="button" className="pf-rascunho-btn pf-rascunho-btn-apagar" onClick={onLimpar}>
            <IconRecomecar /> {t("rascunhoConfirmaSim")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-rascunho" role="status">
      <p className="pf-rascunho-texto">
        <strong>{t("rascunhoTitulo")}</strong>
        {t("rascunhoTexto")}
      </p>
      <div className="pf-rascunho-accoes">
        <button type="button" className="pf-rascunho-btn pf-rascunho-btn-manter" onClick={onManter}>
          <IconCheck /> {t("rascunhoManter")}
        </button>
        <button type="button" className="pf-rascunho-btn" onClick={() => setAConfirmar(true)}>
          <IconRecomecar /> {t("rascunhoLimpar")}
        </button>
      </div>
    </div>
  );
}
