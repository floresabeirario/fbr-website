"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL } from "../_lib/constants";
import { waUrl } from "../_lib/wa";

const anim = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export default function MomentosEspeciaisClient() {
  const t = useTranslations("momentos");
  const locale = useLocale();
  const lista = t.raw("lista");

  const bookHref = locale === "en" ? "/en/book-preservation" : FORM_URL;

  return (
    <main className="momento-page">
      <section className="momento-hero">
        <motion.div {...anim} className="momento-inner">
          <span className="momento-eyebrow">{t("eyebrow")}</span>
          <h1 className="momento-h1">
            {t("h1").split(t("h1Em"))[0]}<br />
            <em>{t("h1Em")}</em>
          </h1>
          <p className="momento-desc">{t("heroDesc")}</p>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={waUrl(locale)} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
        </motion.div>
      </section>

      <section className="momento-content momento-content--warm">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="momento-content-inner"
        >
          <h2 className="momento-content-h2">
            {t("floresTitle")}
          </h2>
          <p className="momento-content-p">{t("floresP1")}</p>
          <p className="momento-content-p">{t("floresP2")}</p>
        </motion.div>
      </section>

      <section className="momentos-hub-section">
        <div className="momentos-hub-grid">
          {lista.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="momentos-hub-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.65 }}
              >
                <h2 className="momentos-hub-card-title">{item.titulo}</h2>
                <p className="momentos-hub-card-desc">{item.desc}</p>
                <span className="momentos-hub-card-cta">{t("saberMais")}</span>
              </motion.a>
          ))}
        </div>
      </section>

      <section className="momentos-hub-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="momentos-hub-cta-inner"
        >
          <h2 className="momentos-hub-cta-h2">{t("reserveTitle")}</h2>
          <p className="momentos-hub-cta-p">{t("reserveDesc")}</p>
          <div className="momento-ctas">
            <a href={bookHref} className="btn-primary">{t("ctaReservar")}</a>
            <a href={waUrl(locale)} target="_blank" rel="noopener noreferrer" className="btn-wa">{t("ctaWA")}</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
