"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FORM_URL, WA_URL, PHONE, EMAIL, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK } from "./_lib/constants";
import HomeHero from "./HomeHero";
import HomeSteps from "./HomeSteps";
import BeforeAfterSlider from "./BeforeAfterSlider";
import "./HomeClient.css";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const StructuredData = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "LocalBusiness",
      name: "Flores à Beira-Rio",
      description: "Atelier de preservação botânica artesanal em Coimbra. Transformamos bouquets de casamento em quadros de arte botânica que duram décadas.",
      image: "https://floresabeirario.pt/fotoquadro1.webp",
      address: { "@type": "PostalAddress", addressLocality: "Coimbra", addressRegion: "Coimbra", addressCountry: "PT" },
      geo: { "@type": "GeoCoordinates", latitude: "40.2033", longitude: "-8.4103" },
      telephone: PHONE, email: EMAIL,
      priceRange: "€€€", openingHours: "Mo-Fr 10:00-18:00",
      sameAs: [SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK],
      offers: {
        "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: "300",
        offers: [
          { "@type": "Offer", name: "Preservação de Bouquet 30×40cm", price: "300", priceCurrency: "EUR" },
          { "@type": "Offer", name: "Preservação de Bouquet 40×50cm", price: "400", priceCurrency: "EUR" },
          { "@type": "Offer", name: "Preservação de Bouquet 50×70cm", price: "500", priceCurrency: "EUR" },
        ],
      },
    }),
  }} />
);

// ─── Icons (usados nas secções 4 e 6) ─────────────────────────────────────────
const IconFlower = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <ellipse cx="12" cy="6.5" rx="2.5" ry="4" /><ellipse cx="12" cy="17.5" rx="2.5" ry="4" />
    <ellipse cx="6.5" cy="12" rx="4" ry="2.5" /><ellipse cx="17.5" cy="12" rx="4" ry="2.5" />
    <circle cx="12" cy="12" r="3" fill="white" opacity="0.6" /><circle cx="12" cy="12" r="1.5" />
  </svg>
);
const IconFrame = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="2.5" />
    <rect x="6" y="6" width="12" height="12" rx="1.5" fill="white" opacity="0.55" />
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9" />
  </svg>
);
const IconReuse = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconLeaf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);
const IconWA = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.555 4.116 1.524 5.847L.057 23.58a.75.75 0 0 0 .916.919l5.849-1.519A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.734 9.734 0 0 1-4.967-1.36l-.355-.213-3.693.959.984-3.588-.233-.369A9.72 9.72 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
);

const apccItems = [
  { icon: <IconReuse />, title: "Pensado para reutilizar", desc: "O saco protege o quadro e pode depois ser usado para guardar roupa, coisas de praia, o que couber." },
  { icon: <IconHeart />, title: "Trabalho com valor social", desc: "Cada encomenda apoia diretamente o trabalho e a autonomia dos utentes da APCC." },
  { icon: <IconLeaf />, title: "Arte consciente e local", desc: "Artesanato português, embalagem sem desperdício, flores preservadas para durar décadas." },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HomeClient() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <StructuredData />
      <main style={{ backgroundColor: "#FAF7F0", overflowX: "hidden" }}>

        <HomeHero />

        {/* ════ 2. O QUE FAZEMOS + SLIDER ════ */}
        <section aria-label="Serviços de preservação botânica"
          style={{ padding: "80px 20px 40px", background: "linear-gradient(180deg, rgba(29,52,44,0.05) 0%, #FAF7F0 100%)", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="eyebrow">O que fazemos</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", color: "#1E2D2A", margin: "0 0 16px", lineHeight: 1.1 }}>As suas flores, para sempre</h2>
              <p style={{ color: "#5A6B60", fontSize: "clamp(1rem,2vw,1.1rem)", lineHeight: 1.85, maxWidth: "600px", margin: "0 auto 48px" }}>
                Transformamos flores com valor emocional em quadros de arte botânica que duram décadas. Recebemos flores de Portugal e de toda a Europa no nosso estúdio em Coimbra.
              </p>
              <BeforeAfterSlider />
            </motion.div>
          </div>
        </section>

        <HomeSteps />

        {/* ════ 4. TRACKING ════ */}
        <section aria-label="Acompanhe a sua encomenda em tempo real"
          style={{ padding: "88px 20px", background: "linear-gradient(180deg, #FAF7F0 0%, #F8F2E4 100%)", position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div className="tracking-title" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: "32px" }}>
              <span className="eyebrow">Transparência total</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", color: "#1E2D2A", margin: "0 0 4px", lineHeight: 1.1 }}>
                Acompanhe a sua<br /><em style={{ fontStyle: "italic", color: "#3D6B5E" }}>encomenda ao vivo</em>
              </h2>
            </motion.div>

            <div className="tracking-grid">
              <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="phone-float" style={{ position: "relative", width: "clamp(200px, 38vw, 280px)", transform: "rotate(-2deg)" }}>
                  <div style={{ position: "absolute", bottom: "-24px", left: "50%", transform: "translateX(-50%)", width: "70%", height: "40px", background: "radial-gradient(ellipse, rgba(30,45,42,0.18) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} aria-hidden="true" />
                  <div style={{ position: "relative", zIndex: 1, backgroundColor: "#1E2D2A", borderRadius: "42px", padding: "14px 10px", boxShadow: "0 32px 80px rgba(30,45,42,0.35), 0 0 0 1px rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", gap: "6px", alignItems: "center" }} aria-hidden="true">
                      <div style={{ width: "60px", height: "6px", borderRadius: "10px", backgroundColor: "#2D4A40" }} />
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#2D4A40" }} />
                    </div>
                    <div style={{ borderRadius: "28px", overflow: "hidden", backgroundColor: "#0f1f1a", aspectRatio: "9/19.5" }}>
                      <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} aria-label="Vídeo de tracking da encomenda">
                        <source src="/videos/tracking.webm" type="video/webm" />
                      </video>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }} aria-hidden="true">
                      <div style={{ width: "36px", height: "4px", borderRadius: "10px", backgroundColor: "#2D4A40" }} />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                <span className="eyebrow tracking-desktop-title">Transparência total</span>
                <h2 className="tracking-desktop-title" style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", color: "#1E2D2A", margin: "0 0 20px", lineHeight: 1.1 }}>
                  Acompanhe a sua<br /><em style={{ fontStyle: "italic", color: "#3D6B5E" }}>encomenda ao vivo</em>
                </h2>
                <p style={{ color: "#5A6B60", lineHeight: 1.85, fontSize: "clamp(1rem,2vw,1.1rem)", margin: "0 0 36px" }}>
                  Após a reserva estar confirmada, partilhamos consigo cada etapa do processo, da receção das flores à composição final. Pode acompanhar tudo em tempo real, sem ter de perguntar.
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[
                    { icon: <IconFlower />, title: "Receção das flores", desc: "Confirmamos a chegada e avaliamos o estado das flores no mesmo dia." },
                    { icon: <IconFrame />, title: "Composição aprovada por si", desc: "Enviamos uma fotografia da composição antes de emoldurar. Tem sempre a palavra final." },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "18px 0", borderBottom: i === 0 ? "1px solid rgba(61,107,94,0.12)" : "none" }}
                    >
                      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, #EDF2E8, #D4DECC)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3D6B5E", flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
                      <div>
                        <p style={{ margin: "0 0 4px", fontWeight: "700", color: "#1E2D2A", fontSize: "1rem", fontFamily: "'Google Sans', Roboto, sans-serif" }}>{item.title}</p>
                        <p style={{ margin: 0, color: "#5A6B60", fontSize: "0.95rem", lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 5. GOOGLE REVIEWS ════ */}
        <section aria-label="Avaliações de clientes" style={{ padding: "76px 20px", backgroundColor: "var(--navy-d)", color: "#FAF7F0", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "940px", margin: "0 auto" }}>
            <span style={{ display: "block", fontSize: "0.875rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "var(--blue-l)", marginBottom: "14px", fontFamily: "'Google Sans', Roboto, sans-serif" }}>Clientes felizes</span>
            <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", margin: "0 0 40px", lineHeight: 1.1, color: "#FAF7F0" }}>O que diz quem confiou em nós</h2>
            <script src="https://elfsightcdn.com/platform.js" async></script>
            <div className="elfsight-app-65dc34c1-0003-4419-ab4e-11e52faa447f" data-elfsight-app-lazy></div>
          </motion.div>
        </section>

        {/* ════ 6. APCC ════ */}
        <section aria-label="Parceria solidária com a APCC Coimbra"
          style={{ padding: "96px 20px", background: "linear-gradient(160deg, var(--navy-d) 0%, var(--navy-l) 50%, var(--navy-d) 100%)", position: "relative", overflow: "hidden" }}
        >
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `repeating-linear-gradient(45deg, #6B9EC4 0px, #6B9EC4 1px, transparent 1px, transparent 40px)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="apcc-grid">
              <motion.div className="apcc-text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,168,136,0.12)", border: "1px solid rgba(139,168,136,0.25)", borderRadius: "100px", padding: "7px 16px", marginBottom: "20px" }}>
                  <span style={{ color: "#8BA888", fontSize: "0.75rem" }} aria-hidden="true">♥</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", color: "#8BA888", fontFamily: "'Google Sans', Roboto, sans-serif" }}>Parceria solidária</span>
                </div>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>
                  Cada detalhe<br /><em style={{ fontStyle: "italic", color: "#8BA888" }}>tem um propósito</em>
                </h2>
                <p style={{ color: "rgba(250,247,240,0.7)", lineHeight: 1.82, fontSize: "0.97rem", margin: "0 0 28px" }}>
                  Parte da embalagem do seu quadro é feita à mão pelos utentes da APCC Coimbra. Cada peça é única, criada com cuidado especialmente para a Flores à Beira-Rio.
                </p>
                {apccItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + i * 0.08, duration: 0.5 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "13px 0", borderBottom: i < 2 ? "1px solid rgba(139,168,136,0.1)" : "none" }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(139,168,136,0.12)", border: "1px solid rgba(139,168,136,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8BA888", flexShrink: 0, marginTop: "2px" }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ margin: "0 0 2px", fontWeight: "700", color: "#FAF7F0", fontSize: "0.9rem", fontFamily: "'Google Sans', Roboto, sans-serif" }}>{item.title}</p>
                      <p style={{ margin: 0, color: "rgba(250,247,240,0.55)", fontSize: "0.86rem", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="apcc-visual" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}
              >
                <a
                  href="https://apc-coimbra.org.pt/capacitacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Saber mais sobre a APCC — Associação de Paralisia Cerebral de Coimbra"
                  className="apcc-photo-link"
                  style={{ display: "block", position: "relative", maxWidth: "340px", width: "100%", textDecoration: "none" }}
                >
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0, transform: "translate(12px, 12px) rotate(2deg)", borderRadius: "18px", background: "rgba(107,158,196,0.12)", border: "1px solid rgba(107,158,196,0.18)" }} />
                  <div style={{ position: "relative", transform: "rotate(-1.5deg)", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(107,158,196,0.22)", aspectRatio: "3/4", boxShadow: "0 28px 56px rgba(0,0,0,0.4)" }}>
                    <Image fill src="/oficinaapcc.webp" alt="Utentes da Oficina de Tecelagem de Almalaguês e Costura da APCC Coimbra a produzir as embalagens para a Flores à Beira-Rio" sizes="(max-width: 768px) 100vw, 340px" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(12,25,41,0.9) 0%, transparent 100%)" }} aria-hidden="true" />
                    <div style={{ position: "absolute", bottom: "18px", left: "18px", right: "18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#FAF7F0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                          <Image src="/apcc.webp" alt="Logótipo APCC" width={28} height={28} style={{ objectFit: "contain" }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: "700", color: "#FAF7F0", fontSize: "0.78rem", fontFamily: "'Google Sans', Roboto, sans-serif", lineHeight: 1.25 }}>Associação de Paralisia Cerebral de Coimbra</p>
                          <p style={{ margin: "2px 0 0", color: "var(--blue-l)", fontSize: "0.7rem", fontFamily: "'Google Sans', Roboto, sans-serif" }}>Oficina de Tecelagem de Almalaguês e Costura</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="/sustentabilidade" className="apcc-link">
                  Saiba mais sobre a origem dos nossos materiais e a nossa política de sustentabilidade →
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 7. CARTÃO-OFERTA ════ */}
        <section aria-label="Cartão-Oferta — ofereça a preservação de flores"
          style={{ position: "relative", overflow: "hidden", minHeight: "560px", display: "flex", alignItems: "center" }}
        >
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/vale1.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(15,25,20,0.82) 0%, rgba(15,25,20,0.58) 55%, rgba(15,25,20,0.15) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "88px 20px", width: "100%" }}>
            <div style={{ maxWidth: "580px" }}>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(184,149,74,0.15)", border: "1px solid rgba(184,149,74,0.35)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'Google Sans', Roboto, sans-serif" }}>O presente mais especial</span>
                </div>
                <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4.5vw,3.5rem)", color: "#FAF7F0", margin: "0 0 20px", lineHeight: 1.1 }}>
                  Ofereça memórias<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>que duram para sempre</em>
                </h2>
                <p style={{ color: "rgba(250,247,240,0.78)", lineHeight: 1.85, fontSize: "clamp(1rem,2vw,1.08rem)", margin: "0 0 34px" }}>
                  Ofereça a preservação das flores na forma do nosso cartão-oferta e deixe que os presenteados escolham a preservação ao seu gosto.
                </p>
                <a href="/oferecer-preservacao" className="gift-card-btn">
                  Descobrir o Cartão-Oferta
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════ 8. CTA SPLIT ════ */}
        <div className="cta-split">

          {/* Apoio personalizado */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ background: "linear-gradient(135deg, var(--navy-d) 0%, var(--navy) 50%, var(--navy-l) 100%)", padding: "clamp(64px,9vw,96px) clamp(32px,6vw,72px)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", minHeight: "480px" }}
          >
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: `radial-gradient(circle at 20% 80%, rgba(107,158,196,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(28,58,92,0.8) 0%, transparent 55%)`, pointerEvents: "none" }} />
            <div style={{ maxWidth: "440px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
              <span style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "var(--blue-l)", marginBottom: "14px", fontFamily: "'Google Sans', Roboto, sans-serif" }}>
                Apoio personalizado
              </span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>
                À procura de<br /><em style={{ fontStyle: "italic", color: "var(--blue-xl)" }}>mais ajuda?</em>
              </h2>
              <p style={{ color: "rgba(250,247,240,0.78)", fontSize: "0.97rem", lineHeight: 1.82, margin: "0 0 10px" }}>
                Agende uma sessão de esclarecimento gratuita por videochamada antes de fazer o seu pedido.
              </p>
              <p style={{ color: "rgba(250,247,240,0.52)", fontSize: "0.9rem", lineHeight: 1.75, margin: "0 0 32px" }}>
                Podemos ajudá-lo a entender o processo de preservação e a escolher os produtos que melhor se adequam a si. Esta sessão tem a duração aproximada de 30 minutos.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contactos" className="cta-btn-ghost">Contactos</a>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="cta-btn-wa">
                  <IconWA /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Vai casar em breve */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ position: "relative", overflow: "hidden", padding: "clamp(64px,9vw,96px) clamp(32px,6vw,72px)", textAlign: "center", minHeight: "480px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "url('/noiva.webp')", backgroundSize: "cover", backgroundPosition: "center top", filter: "brightness(0.52)" }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,26,0.28) 0%, rgba(15,30,26,0.65) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: "440px", margin: "0 auto" }}>
              <span style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(250,247,240,0.75)", marginBottom: "14px", fontFamily: "'Google Sans', Roboto, sans-serif" }}>Para noivas</span>
              <h2 style={{ fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,4vw,3.2rem)", color: "#FAF7F0", margin: "0 0 16px", lineHeight: 1.1 }}>Vai casar em breve?</h2>
              <p style={{ color: "rgba(250,247,240,0.8)", fontSize: "1rem", lineHeight: 1.82, margin: "0 0 32px" }}>
                Reserve a sua vaga com antecedência, as datas em época de casamentos esgotam rapidamente.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-noiva-ghost">Reservar Data</a>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
}
