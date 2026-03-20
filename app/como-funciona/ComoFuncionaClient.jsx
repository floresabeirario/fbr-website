"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FORM_URL, WA_URL } from "../_lib/constants";
import PageHero from "@/components/PageHero";
import "./ComoFuncionaClient.css";

// ─── HowTo Schema ─────────────────────────────────────────────────────────────
const HowToSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como funciona a preservação de flores de momentos especiais",
        description:
          "Processo artesanal completo de preservação botânica de flores desde a reserva até ao quadro emoldurado com vidro museu anti-UV, pronto a pendurar em casa.",
        totalTime: "P6M",
        estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "300" },
        supply: [
          { "@type": "HowToSupply", name: "Flores frescas (até 5 dias após o evento)" },
          { "@type": "HowToSupply", name: "Fotografias do dia (opcional, para referência)" },
        ],
        tool: [{ "@type": "HowToTool", name: "Formulário de reserva online" }],
        step: [
          { "@type": "HowToStep", position: 1, name: "Reservar a data", text: "Preencha o formulário de reserva com a data do evento e detalhes das flores. Pague o sinal de 30% para garantir a sua vaga.", url: "https://floresabeirario.pt/como-funciona#passo-1" },
          { "@type": "HowToStep", position: 2, name: "Entregar as flores", text: "Entregue em mãos no atelier (Ceira, Coimbra), envie por CTT correio frágil urgente, ou solicite recolha no local do evento. Preferencialmente até 3 dias após o evento.", url: "https://floresabeirario.pt/como-funciona#passo-2" },
          { "@type": "HowToStep", position: 3, name: "Prensagem e secagem artesanal", text: "Cada pétala é prensada e seca individualmente com técnicas de botânica artesanal, sem químicos agressivos, sem plásticos.", url: "https://floresabeirario.pt/como-funciona#passo-3" },
          { "@type": "HowToStep", position: 4, name: "Composição e aprovação", text: "Criamos a composição artística e enviamos fotografia para aprovação. Pode pedir ajustes antes de selarmos a moldura definitivamente.", url: "https://floresabeirario.pt/como-funciona#passo-4" },
          { "@type": "HowToStep", position: 5, name: "Emolduramento e entrega do quadro", text: "O quadro é emoldurado com vidro museu anti-reflexo com proteção UV e enviado por CTT com rastreio, ou levantado no atelier em Coimbra.", url: "https://floresabeirario.pt/como-funciona#passo-5" },
        ],
      }),
    }}
  />
);

// ─── Dados ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "passo-1",
    n: "01",
    tag: "Antes do evento",
    title: "Reserve a sua data",
    img: "/reserva.webp",
    imgAlt: "Calendário com data de evento marcada para reserva de preservação de flores",
    imgLink: FORM_URL,
    body: "Respondemos em 72 horas com a confirmação e as instruções de pagamento do sinal de 30%. O pagamento deve ser efetuado no prazo de 24 horas para garantir a reserva; caso contrário, o agendamento será cancelado. O sinal não é reembolsável.",
    noteJsx: (
      <>
        As vagas são limitadas, especialmente entre Maio e Setembro. O processo começa muito antes do evento: assim que souber a data, garanta a sua vaga com o{" "}
        <a href={FORM_URL} style={{ color: "#C8522A", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(200,82,42,0.3)", paddingBottom: "1px" }}>
          formulário de reserva
        </a>.
      </>
    ),
  },
  {
    id: "passo-2",
    n: "02",
    tag: "Até 5 dias após",
    title: "As flores chegam até nós",
    img: "/ramojoana.webp",
    imgAlt: "Flores frescas a ser entregues no atelier para preservação botânica",
    body: "Depois do dia do evento, as flores têm de chegar até nós o mais frescas possível, preferencialmente em 1 a 3 dias, no máximo 5. Enquanto aguarda, mantenha as flores num vaso com água fresca longe do sol e do calor. O pagamento de 40% da encomenda será solicitado após recebermos as flores.",
    noteJsx: (
      <>
        <strong style={{ display: "block", marginBottom: "10px", color: "#C8522A", fontSize: "0.88rem" }}>Três opções de entrega:</strong>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { label: "Entrega em mãos", desc: "Gratuitamente no nosso atelier em Coimbra, mediante agendamento." },
            { label: "Envio por CTT", desc: "Correio frágil e urgente os custos de envio são a cargo do cliente." },
            { label: "Recolha no evento", desc: "Deslocamo-nos ao local do evento, mediante orçamento e disponibilidade." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span style={{ color: "#C8522A", fontWeight: 700, flexShrink: 0, fontSize: "0.88rem", marginTop: "1px" }}>+</span>
              <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.65, color: "#5A4050" }}>
                <strong>{item.label}:</strong> {item.desc}
              </p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "passo-3",
    n: "03",
    tag: "Até 6 meses",
    title: "Prensagem pétala a pétala",
    img: "/prensa.webp",
    imgAlt: "Pétalas de flores a serem prensadas artesanalmente em papel botânico",
    body: "É aqui que acontece a magia e também a parte que não pode ser apressada. Cada pétala, folha e raminho é prensado individualmente em condições controladas de temperatura e humidade.",
    note: "Após estarem preservadas, as flores são também congeladas para eliminar qualquer inseto que possa ainda estar presente.",
  },
  {
    id: "passo-4",
    n: "04",
    tag: "Aprovação",
    title: "Composição e aprovação",
    img: "/detalhe.webp",
    imgAlt: "Composição artística de flores prensadas dentro de moldura",
    body: "Escolhemos as flores melhor preservadas e iniciamos a criação do seu quadro. Quando a composição estiver pronta, receberá um e-mail com imagens do design.",
    note: "Terá 72 horas para aprovar ou solicitar alterações. Após o quadro estar emoldurado e antes de o enviarmos.",
  },
  {
    id: "passo-5",
    n: "05",
    tag: "A vida toda",
    title: "O quadro chega a casa",
    img: "/joanaceu.webp",
    imgAlt: "Quadro botânico de flores prensadas emoldurado com vidro museu anti-UV",
    body: "Antes do envio ou da recolha, será solicitado o pagamento da 3.ª e última prestação, 30% do valor total. O quadro inclui instruções de cuidados para garantir a sua durabilidade.",
    noteJsx: (
      <>
        <strong style={{ display: "block", marginBottom: "10px", color: "#C8522A", fontSize: "0.88rem" }}>Com o quadro pronto, tem duas opções:</strong>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { label: "Envio pelos CTT", desc: "Receberá um número de rastreamento assim que a encomenda for enviada. Custos de envio a cargo do cliente." },
            { label: "Recolha no atelier", desc: "Agende um horário para recolha em Coimbra." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span style={{ color: "#C8522A", fontWeight: 700, flexShrink: 0, fontSize: "0.88rem", marginTop: "1px" }}>+</span>
              <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.65, color: "#5A4050" }}>
                <strong>{item.label}:</strong> {item.desc}
              </p>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

const INCLUDED = [
  { label: "Vidro museu anti-UV", desc: "O mesmo vidro usado em museus. Bloqueia os raios que desbotam as cores." },
  { label: "Aprovação antes de selar", desc: "Enviamos fotografia. Nada é definitivo sem o seu acordo." },
  { label: "Composição artística", desc: "Não é só secar flores. É criar uma composição pensada." },
  { label: "Acompanhamento completo", desc: "Atualizações ao longo do processo. Nunca fica sem saber o estado." },
];

// ─── Componente Step ──────────────────────────────────────────────────────────
const Step = ({ step, index }) => {
  const isEven = index % 2 === 0;

  const photoInner = (
    <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "clamp(14px,2.5vw,22px)", overflow: "hidden", backgroundColor: "#F2D6E4", boxShadow: "0 16px 48px rgba(160,60,20,0.12)" }}>
      <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 2, backgroundColor: "#C8522A", color: "#FAF7F0", padding: "5px 14px", borderRadius: "50px", display: "flex", alignItems: "center", gap: "7px" }}>
        <span style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.7rem", lineHeight: 1 }}>{step.n}</span>
        <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", opacity: 0.8 }}>{step.tag}</span>
      </div>
      {step.imgLink && (
        <div style={{ position: "absolute", bottom: "14px", right: "14px", zIndex: 2, backgroundColor: "rgba(250,247,240,0.92)", color: "#C8522A", padding: "5px 12px", borderRadius: "50px", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "Roboto, sans-serif", backdropFilter: "blur(4px)" }}>
          Reservar
        </div>
      )}
      <Image fill src={step.img} alt={step.imgAlt} sizes="(max-width: 768px) 100vw, 50vw" className="step-img" style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />
    </div>
  );

  return (
    <article id={step.id} aria-labelledby={`${step.id}-title`} style={{ marginBottom: "clamp(64px,12vw,110px)" }}>
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
          <h2 className="step-title-mobile" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "#1E2D2A", margin: "0 0 clamp(12px,2vw,16px)", lineHeight: 1.1 }}>
            {step.title}
          </h2>
          {step.imgLink ? (
            <a href={step.imgLink} target="_blank" rel="noopener noreferrer" aria-label={`Reservar`} style={{ display: "block", textDecoration: "none", cursor: "pointer" }}>
              {photoInner}
            </a>
          ) : (
            photoInner
          )}
        </div>

        <div className="step-text">
          <h2 id={`${step.id}-title`} className="step-title-desktop" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "#1E2D2A", margin: "0 0 clamp(12px,2vw,18px)", lineHeight: 1.1 }}>
            {step.title}
          </h2>
          <div style={{ color: "#5A6B60", lineHeight: 1.88, fontSize: "clamp(0.92rem,1.8vw,1.02rem)", margin: "0 0 clamp(16px,2.5vw,22px)" }}>
            {step.body}
          </div>
          {(step.note || step.noteJsx) && (
            <div style={{ padding: "clamp(14px,2vw,18px) clamp(16px,2.5vw,22px)", borderRadius: "12px", backgroundColor: "rgba(200,82,42,0.05)", borderLeft: "3px solid rgba(200,82,42,0.25)" }}>
              {step.noteJsx ? (
                <div style={{ color: "#C8522A", lineHeight: 1.78, fontSize: "clamp(0.84rem,1.6vw,0.92rem)" }}>{step.noteJsx}</div>
              ) : (
                <p style={{ color: "#C8522A", lineHeight: 1.78, fontSize: "clamp(0.84rem,1.6vw,0.92rem)", margin: 0, fontStyle: "italic" }}>{step.note}</p>
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
  return (
    <>
      <HowToSchema />

      <div style={{ backgroundColor: "#FAF7F0", overflowX: "clip" }}>

        {/* HERO com fotoquadrocloseup2.webp */}
        <PageHero
          src="/fotoquadrocloseup2.webp"
          gradient="linear-gradient(to top, rgba(35,15,5,0.88) 0%, rgba(35,15,5,0.55) 45%, rgba(35,15,5,0.15) 100%)"
          ariaLabel="Como funciona a preservação de flores"
        >
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: "640px", textAlign: "center", margin: "0 auto" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(250,247,240,0.88)", fontFamily: "'Google Sans', Roboto, sans-serif", margin: "0 0 14px", fontWeight: 700, display: "block" }}>O nosso processo</p>
            <h1 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.05, color: "#FAF7F0", margin: "0 0 clamp(1.2rem,2.5vw,1.8rem)" }}>
              Da flor fresca<br />
              <em style={{ fontStyle: "italic", color: "#FAF7F0" }}>ao quadro para sempre</em>
            </h1>
            <p style={{ fontSize: "clamp(0.93rem,1.8vw,1.08rem)", lineHeight: 1.85, maxWidth: "460px", color: "rgba(250,247,240,0.88)", margin: "0 auto clamp(1.8rem,3.5vw,2.8rem)" }}>
              Cinco passos para transformar as suas flores numa obra de arte botânica que dura décadas, explicados com toda a transparência.
            </p>
            <div className="cta-row-hero">
              <a href="/perguntas-frequentes" className="btn-outline-hero">Ver Perguntas Frequentes</a>
            </div>
          </motion.div>
        </PageHero>

        {/* STEPS */}
        <section aria-label="Os cinco passos da preservação" style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,64px)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {STEPS.map((step, i) => (
              <Step key={step.id} step={step} index={i} />
            ))}
          </div>
        </section>

        {/* O QUE ESTÁ INCLUÍDO */}
        <section aria-label="O que está incluído" style={{ padding: "clamp(52px,8vw,84px) clamp(20px,5vw,48px)", background: "linear-gradient(180deg, #F5EDE0 0%, #FAF7F0 100%)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}>
              <span className="eyebrow">Sem surpresas</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,3rem)", color: "#1E2D2A", margin: 0, lineHeight: 1.1 }}>Tudo incluído no preço</h2>
            </motion.div>
            <div className="included-grid">
              {INCLUDED.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }} style={{ backgroundColor: "#fff", borderRadius: "14px", padding: "clamp(16px,2.5vw,22px)", border: "1px solid rgba(200,82,42,0.09)", boxShadow: "0 3px 14px rgba(160,60,20,0.05)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, marginTop: "2px" }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="10" fill="rgba(200,82,42,0.1)" />
                      <path d="M6 10l3 3 5-5" stroke="#C8522A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "0.98rem", color: "#1E2D2A", margin: "0 0 4px", lineHeight: 1.2 }}>{item.label}</p>
                    <p style={{ color: "#5A6B60", fontSize: "0.84rem", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "clamp(28px,4vw,40px)", fontSize: "0.88rem", color: "#5A6B60", lineHeight: 1.7 }}>
              Os preços começam em <strong style={{ color: "#1E2D2A" }}>300€</strong>, incluindo emolduramento e vidro museu.{" "}
              <a href="/opcoes-e-precos" className="text-link">Ver todos os preços e tamanhos</a>
            </div>
          </div>
        </section>

        {/* PAGAMENTO */}
        <section aria-label="Pagamento em três prestações" style={{ padding: "clamp(52px,8vw,84px) clamp(20px,5vw,48px)", background: "linear-gradient(135deg, #2D1A08 0%, #5C2E14 100%)" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}>
              <div style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)" }}>
                <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "3.5px", textTransform: "uppercase", color: "#F0C8A0", marginBottom: "12px", fontFamily: "Roboto, sans-serif" }}>Transparência total</span>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.7rem,4vw,2.8rem)", color: "#FAF7F0", margin: "0 0 12px", lineHeight: 1.1 }}>Pagamento em três momentos</h2>
                <p style={{ color: "rgba(250,247,240,0.6)", fontSize: "clamp(0.88rem,1.8vw,0.96rem)", lineHeight: 1.8, maxWidth: "440px", margin: "0 auto" }}>Para não pesar no orçamento, o valor é repartido ao longo do processo.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(8px,2vw,16px)" }}>
                {[
                  { pct: "30%", label: "Na reserva", desc: "Sinal que garante a sua vaga. Não reembolsável.", c: "#F0C8A0" },
                  { pct: "40%", label: "Início do trabalho", desc: "Quando as flores chegam e iniciamos a prensagem.", c: "#E8B080" },
                  { pct: "30%", label: "Antes da entrega", desc: "Após o quadro estar emoldurado e antes de o enviarmos.", c: "#D09060" },
                ].map((p, i) => (
                  <div key={i} style={{ backgroundColor: "rgba(250,247,240,0.06)", borderRadius: "clamp(12px,2vw,18px)", padding: "clamp(16px,2.5vw,26px) clamp(12px,2vw,18px)", border: "1px solid rgba(250,247,240,0.09)", textAlign: "center" }}>
                    <span style={{ display: "block", fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: p.c, lineHeight: 1, marginBottom: "6px" }}>{p.pct}</span>
                    <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#FAF7F0", fontFamily: "Roboto, sans-serif", marginBottom: "8px" }}>{p.label}</span>
                    <p style={{ color: "rgba(250,247,240,0.55)", fontSize: "clamp(0.75rem,1.4vw,0.84rem)", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section aria-label="Reservar preservação" style={{ padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)", background: "linear-gradient(140deg, #F5EDE0 0%, #FAF7F0 55%, #F0E8D8 100%)", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} style={{ maxWidth: "620px", margin: "0 auto" }}>
            <div aria-hidden="true" style={{ width: "44px", height: "1px", margin: "0 auto 28px", background: "linear-gradient(to right, transparent, #C8522A, transparent)" }} />
            <span className="eyebrow">Pronta para começar?</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,5.5vw,3.5rem)", color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1 }}>Reserve a sua vaga hoje</h2>
            <p style={{ color: "#5A6B60", lineHeight: 1.88, fontSize: "clamp(0.9rem,2vw,1rem)", margin: "0 0 34px" }}>
              Basta preencher o formulário de reserva. Respondemos em 72 horas com a confirmação e todas as instruções para os passos seguintes.
            </p>
            <div className="cta-row" style={{ marginBottom: "28px" }}>
              <a href={FORM_URL} className="btn-primary" style={{ background: "#C8522A", borderColor: "#C8522A", color: "#FAF7F0", boxShadow: "0 4px 16px rgba(200,82,42,0.28)" }}>Preencher Formulário de Reserva</a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Falar pelo WhatsApp
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", fontSize: "0.82rem" }}>
              {[
                { href: "/opcoes-e-precos", label: "Ver preços" },
                { href: "/recriacao", label: "Recriação de bouquet" },
                { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
              ].map((l, i) => (
                <a key={i} href={l.href} className="text-link">{l.label}</a>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
