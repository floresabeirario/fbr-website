"use client";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

function PlusIcon({ open }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className={`bouquet-faq-icon${open ? " bouquet-faq-icon--open" : ""}`}
    >
      <circle cx="11" cy="11" r="10.5" stroke="var(--green)" strokeWidth="1" />
      <path d="M11 7v8M7 11h8" stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function MomentoFAQ({ namespace }) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const items = t.raw("faqItems");
  const [open, setOpen] = useState(null);

  const precosHref = locale === "en" ? "/en/options-and-pricing" : "/opcoes-e-precos";

  return (
    <section className="bouquet-faq">
      <div className="bouquet-faq-inner">
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bouquet-faq-header"
        >
          <span className="momento-eyebrow">{t("faqEyebrow")}</span>
          <h2 className="bouquet-faq-title">
            {t("faqTitle").split(t("faqEm"))[0]}
            <em>{t("faqEm")}</em>
          </h2>
        </m.div>

        <div className="bouquet-faq-list" role="list">
          {items.map((item, i) => (
            <div key={i} className="bouquet-faq-item" role="listitem">
              <button
                className="bouquet-faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <PlusIcon open={open === i} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <m.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="bouquet-faq-answer">
                      {item.a}
                      {item.linkPrecos && (
                        <>
                          {" "}
                          <a href={precosHref} className="momento-link">{item.linkPrecos}</a>
                        </>
                      )}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
