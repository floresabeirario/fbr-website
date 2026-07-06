"use client";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TermosCondicoesClient() {
  const t = useTranslations("termos");
  const SECTIONS = t.raw("sections");
  return (
    // <div> em vez de <main>: o layout já embrulha as páginas num <main>.
    <div className="legal-page">
      <div className="legal-inner">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="legal-h1">{t("h1")}</h1>
          <p className="legal-intro">{t("intro")}</p>
        </m.div>

        <div className="legal-sections">
          {SECTIONS.map((section, index) => (
            <section key={index}>
              <h2 className="legal-h2">{section.title}</h2>
              <p className="legal-text">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
