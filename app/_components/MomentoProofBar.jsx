"use client";
import { useTranslations } from "next-intl";
import { SOCIAL_GOOGLE_BUSINESS, SOCIAL_CASAMENTOS } from "../_lib/constants";

// Linha de prova social das páginas de momentos — mesmo padrão (texto + links
// próprios) usado nos formulários de Reservar e Vale-Presente e em Opções.
export default function MomentoProofBar() {
  const t = useTranslations("common");
  return (
    <p className="momento-proof">
      {t.rich("provaSocial", {
        g: (chunks) => <a href={SOCIAL_GOOGLE_BUSINESS} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{chunks}</a>,
        c: (chunks) => <a href={`${SOCIAL_CASAMENTOS}/opinioes`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{chunks}</a>,
      })}
    </p>
  );
}
