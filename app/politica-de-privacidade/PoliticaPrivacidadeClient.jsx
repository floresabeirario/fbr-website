"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PoliticaPrivacidadeClient() {
  const t = useTranslations("privacidade");
  const SECTIONS = t.raw("sections");
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="legal-h1">{t("h1")}</h1>
          <p className="legal-intro">{t("intro")}</p>
        </motion.div>

        <div className="legal-sections">
          {SECTIONS.map((section, index) => (
            <section key={index}>
              <h2 className="legal-h2">{section.title}</h2>
              <p className="legal-text">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
