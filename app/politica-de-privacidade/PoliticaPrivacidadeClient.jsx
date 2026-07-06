"use client";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PoliticaPrivacidadeClient() {
  const t = useTranslations("privacidade");
  const SECTIONS = t.raw("sections");
  return (
    // <div> em vez de <main>: o layout já embrulha as páginas num <main>.
    <div className="legal-page">
      <div className="legal-inner">
        <m.div className="hero-enter">
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
