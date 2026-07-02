"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FORM_URL, SITE_URL } from "../_lib/constants";
import { waUrl } from "../_lib/wa";
import { splitTitle } from "../_lib/splitTitle";
import { PRECO_QUADRO_30x40 } from "../_lib/precos";
import PageHero from "@/components/PageHero";
import ExploreSquares from "@/components/ExploreSquares";
import "./ComoFuncionaClient.css";

// ─── HowTo Schema ─────────────────────────────────────────────────────────────
// Localizado por idioma (antes estava fixo em PT mesmo nas páginas EN) e com
// URLs no domínio canónico www (antes apontava para o apex sem www).
const HOWTO_TEXT = {
  pt: {
    path: "/como-funciona",
    name: "Como funciona a preservação de flores de momentos especiais",
    description:
      "Processo artesanal completo de preservação botânica de flores desde a reserva até ao quadro emoldurado com vidro museu anti-UV, pronto a pendurar em casa.",
    supplies: ["Flores frescas (até 6 dias após o evento)", "Fotografias do dia (opcional, para referência)"],
    tool: "Formulário de reserva online",
    steps: [
      { name: "Reservar a data", text: "Preencha o formulário de reserva com a data do evento e detalhes das flores. Pague o sinal de 30% para garantir a sua vaga." },
      { name: "Entregar as flores", text: "Entregue em mãos no atelier (Ceira, Coimbra), envie por CTT correio frágil urgente, ou solicite recolha no local do evento. Preferencialmente até 3 dias após o evento." },
      { name: "Prensagem e secagem artesanal", text: "Cada pétala é prensada e seca individualmente com técnicas de botânica artesanal, sem químicos agressivos, sem plásticos." },
      { name: "Composição e aprovação", text: "Criamos a composição artística e enviamos fotografia para aprovação. Pode pedir ajustes antes de selarmos a moldura definitivamente." },
      { name: "Emolduramento e entrega do quadro", text: "O quadro é emoldurado com vidro museu anti-reflexo com proteção UV e enviado por CTT com rastreio, ou levantado no atelier em Coimbra." },
    ],
  },
  en: {
    path: "/en/how-it-works",
    name: "How flower preservation for special occasions works",
    description:
      "The complete artisanal botanical preservation process, from booking to the finished frame with anti-UV museum glass, ready to hang at home.",
    supplies: ["Fresh flowers (up to 6 days after the event)", "Photos of the day (optional, for reference)"],
    tool: "Online booking form",
    steps: [
      { name: "Book your date", text: "Fill in the booking form with the event date and flower details. Pay the 30% deposit to secure your spot." },
      { name: "Deliver the flowers", text: "Hand-deliver to the atelier (Ceira, Coimbra), send by urgent fragile courier, or request collection at the event venue. Preferably within 3 days of the event." },
      { name: "Artisanal pressing and drying", text: "Each petal is pressed and dried individually using artisanal botanical techniques, with no harsh chemicals and no plastics." },
      { name: "Composition and approval", text: "We create the artistic composition and send you a photo for approval. You can request adjustments before we seal the frame permanently." },
      { name: "Framing and delivery", text: "The frame is finished with anti-reflective museum glass with UV protection and shipped with tracking, or collected at the atelier in Coimbra." },
    ],
  },
};

const HowToSchema = ({ locale }) => {
  const c = HOWTO_TEXT[locale] ?? HOWTO_TEXT.pt;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: c.name,
          description: c.description,
          totalTime: "P6M",
          estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: PRECO_QUADRO_30x40 },
          supply: c.supplies.map((name) => ({ "@type": "HowToSupply", name })),
          tool: [{ "@type": "HowToTool", name: c.tool }],
          step: c.steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
            url: `${SITE_URL}${c.path}#passo-${i + 1}`,
          })),
        }),
      }}
    />
  );
};

const STEP_IMAGES = [
  { img: "/reserva.webp",            imgAlt: "Calendário com data de evento marcada para reserva de preservação de flores", id: "passo-1", imgLink: true },
  { img: "/ramojoana.webp",          imgAlt: "Flores frescas a ser entregues no atelier para preservação botânica",          id: "passo-2", imgLink: false },
  { img: "/prensa.webp",             imgAlt: "Pétalas de flores a serem prensadas artesanalmente em papel botânico",          id: "passo-3", imgLink: false },
  { img: "/detalhe.webp",            imgAlt: "Composição artística de flores prensadas dentro de moldura",                    id: "passo-4", imgLink: false },
  { img: "/joanaceu.webp",           imgAlt: "Quadro botânico de flores prensadas emoldurado com vidro museu anti-UV",        id: "passo-5", imgLink: false },
];

// ─── Componente Step ──────────────────────────────────────────────────────────
const Step = ({ step, meta, index, reservarLabel, bookHref }) => {
  const isEven = index % 2 === 0;

  const photoInner = (
    <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "clamp(14px,2.5vw,22px)", overflow: "hidden", backgroundColor: "#F2D6E4", boxShadow: "0 16px 48px rgba(160,60,20,0.12)" }}>
      <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 2, backgroundColor: "var(--rust)", color: "var(--cream)", padding: "5px 14px", borderRadius: "50px", display: "flex", alignItems: "center", gap: "7px" }}>
        <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.7rem", lineHeight: 1 }}>{step.n}</span>
        <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", opacity: 0.8 }}>{step.tag}</span>
      </div>
      {meta.imgLink && (
        <div style={{ position: "absolute", bottom: "14px", right: "14px", zIndex: 2, backgroundColor: "rgba(250,247,240,0.92)", color: "var(--rust)", padding: "5px 12px", borderRadius: "50px", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", backdropFilter: "blur(4px)" }}>
          {reservarLabel}
        </div>
      )}
      <Image fill src={meta.img} alt={meta.imgAlt} sizes="(max-width: 768px) 100vw, 50vw" className="step-img" style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />
    </div>
  );

  return (
    <article id={meta.id} aria-labelledby={`${meta.id}-title`} style={{ marginBottom: "clamp(64px,12vw,110px)" }}>
      <div aria-hidden="true" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(5rem,18vw,14rem)", lineHeight: 0.85, color: "rgba(200,82,42,0.1)", userSelect: "none", pointerEvents: "none", marginBottom: "-2rem", paddingLeft: isEven ? "clamp(16px,5vw,48px)" : undefined, paddingRight: !isEven ? "clamp(16px,5vw,48px)" : undefined, textAlign: isEven ? "left" : "right" }}>
        {step.n}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`step-grid${isEven ? " step-grid--even" : " step-grid--odd"}`}
      >
        <div className="step-photo-wrap">
          <h2 className="step-title-mobile" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "var(--green-d)", margin: "0 0 clamp(12px,2vw,16px)", lineHeight: 1.1 }}>
            {step.titulo}
          </h2>
          {meta.imgLink ? (
            <a href={bookHref} aria-label={reservarLabel} style={{ display: "block", textDecoration: "none", cursor: "pointer" }}>
              {photoInner}
            </a>
          ) : (
            photoInner
          )}
        </div>

        <div className="step-text">
          <h2 id={`${meta.id}-title`} className="step-title-desktop" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "var(--green-d)", margin: "0 0 clamp(12px,2vw,18px)", lineHeight: 1.1 }}>
            {step.titulo}
          </h2>
          <div style={{ color: "var(--mid)", lineHeight: 1.88, fontSize: "clamp(0.92rem,1.8vw,1.02rem)", margin: "0 0 clamp(16px,2.5vw,22px)" }}>
            {step.corpo}
          </div>
          {(step.nota || step.opcoes?.length > 0) && (
            <div style={{ padding: "clamp(14px,2vw,18px) clamp(16px,2.5vw,22px)", borderRadius: "12px", backgroundColor: "rgba(200,82,42,0.05)", borderLeft: "3px solid rgba(200,82,42,0.25)" }}>
              {step.opcoes?.length > 0 ? (
                <div style={{ color: "var(--rust)", lineHeight: 1.78, fontSize: "clamp(0.84rem,1.6vw,0.92rem)" }}>
                  {step.opcoesTitulo && (
                    <strong style={{ display: "block", marginBottom: "10px", color: "var(--rust)", fontSize: "0.88rem" }}>{step.opcoesTitulo}</strong>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {step.opcoes.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--rust)", fontWeight: 700, flexShrink: 0, fontSize: "0.88rem", marginTop: "1px" }}>+</span>
                        <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.65, color: "#5A4050" }}>
                          <strong>{item.titulo}:</strong> {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p style={{ color: "var(--rust)", lineHeight: 1.78, fontSize: "clamp(0.84rem,1.6vw,0.92rem)", margin: 0, fontStyle: "italic" }}>{step.nota}</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </article>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ComoFuncionaClient() {
  const t = useTranslations("comoFunciona");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const passosRaw = t.raw("passos");
  const incluidos = t.raw("incluidos");

  const bookHref = locale === "en" ? "/en/book-preservation" : FORM_URL;
  const precosHref = locale === "en" ? "/en/options-and-pricing" : "/opcoes-e-precos";
  const recriacaoHref = locale === "en" ? "/en/bouquet-recreation" : "/recriacao";
  const faqHref = locale === "en" ? "/en/faq" : "/perguntas-frequentes";
  const bouquetNoivaHref = locale === "en" ? "/en/preserve-wedding-bouquet" : "/preservar-bouquet-noiva";
  const oferecerHref = locale === "en" ? "/en/gift-preservation" : "/oferecer-preservacao";

  const exploreItems = [
    { href: bouquetNoivaHref, label: tNav("preservacao.bouquetNoiva"), img: "/quadroflores.webp" },
    { href: precosHref,       label: tNav("preservacao.opcoes"),       img: "/molduranogueira.webp" },
    { href: oferecerHref,     label: tNav("oferecer"),                 img: "/vale1.webp" },
    { href: recriacaoHref,    label: tNav("recriacao"),                img: "/recriacao-passo4-quadro.jpg" },
  ];

  const passos = passosRaw.map((p, i) => ({
    ...p,
    opcoesTitulo: i === 1 ? t("tresopcoes") : i === 4 ? t("duasopcoes") : null,
  }));

  const pagamento = [
    { pct: "30%", label: t("pag30Label"),      desc: t("pag30Desc"),      c: "#F0C8A0" },
    { pct: "40%", label: t("pag40Label"),      desc: t("pag40Desc"),      c: "#E8B080" },
    { pct: "30%", label: t("pag30finalLabel"), desc: t("pag30finalDesc"), c: "#D09060" },
  ];

  const [h1Start, h1Em] = splitTitle(t("h1"), t("h1Em"));

  return (
    <>
      <HowToSchema locale={locale} />

      <div style={{ backgroundColor: "var(--cream)", overflowX: "clip" }}>

        <PageHero
          src="/fotoquadrocloseup2.webp"
          gradient="linear-gradient(to top, rgba(35,15,5,0.88) 0%, rgba(35,15,5,0.55) 45%, rgba(35,15,5,0.15) 100%)"
          ariaLabel={t("eyebrow")}
        >
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: "640px", textAlign: "center", margin: "0 auto" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(250,247,240,0.88)", fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 14px", fontWeight: 700, display: "block" }}>{t("eyebrow")}</p>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.05, color: "var(--cream)", margin: "0 0 clamp(1.2rem,2.5vw,1.8rem)" }}>
              {h1Start}{h1Em && <><br /><em style={{ fontStyle: "italic", color: "var(--cream)" }}>{h1Em}</em></>}
            </h1>
            <p style={{ fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.85, maxWidth: "460px", color: "rgba(250,247,240,0.88)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)" }}>
              {t("heroDesc")}
            </p>
            <div className="cta-row-hero">
              <a href={faqHref} className="btn-outline-hero">{t("ctaFAQ")}</a>
            </div>
          </motion.div>
        </PageHero>

        {/* STEPS */}
        <section aria-label={t("cincoPassos")} style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,64px)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {passos.map((step, i) => (
              <Step key={STEP_IMAGES[i].id} step={step} meta={STEP_IMAGES[i]} index={i} reservarLabel={t("reservar")} bookHref={bookHref} />
            ))}
          </div>
        </section>

        {/* O QUE ESTÁ INCLUÍDO */}
        <section aria-label={t("oQueInclui")} style={{ padding: "clamp(52px,8vw,84px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #F5EDE0 0%, #FAF7F0 100%)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}>
              <span className="eyebrow">{t("semSurpresas")}</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,3rem)", color: "var(--green-d)", margin: 0, lineHeight: 1.1 }}>{t("tudoIncluido")}</h2>
            </motion.div>
            <div className="included-grid">
              {incluidos.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }} style={{ backgroundColor: "#fff", borderRadius: "14px", padding: "clamp(16px,2.5vw,22px)", border: "1px solid rgba(200,82,42,0.09)", boxShadow: "0 3px 14px rgba(160,60,20,0.05)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, marginTop: "2px" }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="10" fill="rgba(200,82,42,0.1)" />
                      <path d="M6 10l3 3 5-5" stroke="var(--rust)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.98rem", color: "var(--green-d)", margin: "0 0 4px", lineHeight: 1.2 }}>{item.titulo}</p>
                    <p style={{ color: "var(--mid)", fontSize: "0.84rem", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "clamp(28px,4vw,40px)", fontSize: "0.88rem", color: "var(--mid)", lineHeight: 1.7 }}>
              {t("tudoIncluidoDesc")}{" "}
              <a href={precosHref} className="text-link">{t("verPrecos")}</a>
            </div>
          </div>
        </section>

        {/* PAGAMENTO */}
        <section aria-label={t("pagamento3Title")} style={{ padding: "clamp(52px,8vw,84px) clamp(20px,5vw,48px)", background: "linear-gradient(135deg, #2D1A08 0%, #5C2E14 100%)" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}>
              <div style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}>
                <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#F0C8A0", marginBottom: "12px", fontFamily: "Roboto, sans-serif" }}>{t("transparencia")}</span>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.7rem,4vw,2.8rem)", color: "var(--cream)", margin: "0 0 12px", lineHeight: 1.1 }}>{t("pagamento3Title")}</h2>
                <p style={{ color: "rgba(250,247,240,0.6)", fontSize: "clamp(0.88rem,1.8vw,0.96rem)", lineHeight: 1.8, maxWidth: "440px", margin: "0 auto" }}>{t("pagamento3Desc")}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(8px,2vw,16px)" }}>
                {pagamento.map((p, i) => (
                  <div key={i} style={{ backgroundColor: "rgba(250,247,240,0.06)", borderRadius: "clamp(12px,2vw,18px)", padding: "clamp(16px,2.5vw,26px) clamp(12px,2vw,18px)", border: "1px solid rgba(250,247,240,0.09)", textAlign: "center" }}>
                    <span style={{ display: "block", fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: p.c, lineHeight: 1, marginBottom: "6px" }}>{p.pct}</span>
                    <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--cream)", fontFamily: "Roboto, sans-serif", marginBottom: "8px" }}>{p.label}</span>
                    <p style={{ color: "rgba(250,247,240,0.55)", fontSize: "clamp(0.75rem,1.4vw,0.84rem)", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section aria-label={t("reserveTitle")} style={{ padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)", background: "linear-gradient(140deg, #F5EDE0 0%, #FAF7F0 55%, #F0E8D8 100%)", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} style={{ maxWidth: "620px", margin: "0 auto" }}>
            <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 28px", background: "linear-gradient(to right, transparent, #C8522A, transparent)" }} />
            <span className="eyebrow">{t("prontoTitle")}</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5.5vw,3.5rem)", color: "var(--green-d)", margin: "0 0 16px", lineHeight: 1.1 }}>{t("reserveTitle")}</h2>
            <p style={{ color: "var(--mid)", lineHeight: 1.88, fontSize: "clamp(0.9rem,2vw,1rem)", margin: "0 0 34px" }}>
              {t("reserveDesc")}
            </p>
            <div className="cta-row" style={{ marginBottom: "28px" }}>
              <a href={bookHref} className="btn-primary" style={{ background: "var(--rust)", borderColor: "var(--rust)", color: "var(--cream)", boxShadow: "0 4px 16px rgba(200,82,42,0.28)" }}>{t("ctaFormulario")}</a>
              <a href={waUrl(locale)} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t("ctaWA")}
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.82rem" }}>
              {[
                { href: precosHref,    label: t("ctaVerPrecos") },
                { href: recriacaoHref, label: t("ctaRecriacao") },
                { href: faqHref,       label: t("ctaFAQLow") },
              ].map((l, i) => (
                <a key={i} href={l.href} className="text-link">{l.label}</a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══ EXPLORAR — 4 QUADRADOS ═══════════════════════════════════════ */}
        <ExploreSquares items={exploreItems} ariaLabel={tCommon("explorar")} />
      </div>
    </>
  );
}
