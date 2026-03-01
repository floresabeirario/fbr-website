"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Flag SVGs ───────────────────────────────────────────────────────────────
const FlagPT = () => (
  <svg width="16" height="12" viewBox="0 0 600 400" style={{ marginLeft: "8px", borderRadius: "2px", verticalAlign: "middle" }}>
    <rect width="240" height="400" fill="#006600"/>
    <rect x="240" width="360" height="400" fill="#ff0000"/>
    <circle cx="240" cy="200" r="80" fill="#ffff00"/>
    <circle cx="240" cy="200" r="50" fill="#ffffff"/>
    <path d="M240 160 v80 M210 200 h60" stroke="#ff0000" strokeWidth="10"/>
  </svg>
);
const FlagEN = () => (
  <svg width="16" height="12" viewBox="0 0 640 480" style={{ marginLeft: "8px", borderRadius: "2px", verticalAlign: "middle" }}>
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 245 180L565 0h75v56L396 240l244 184v56h-75L320 300 75 480H0v-56l244-184L0 56V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM216 199 0 40V0l271 199h-55zm-216 241 216-159h55L0 480v-40zm640 0L424 281h55l161 119v40zM0 190h640v100H0z"/>
    <path fill="#FFF" d="M270 0h100v480H270z"/>
    <path fill="#C8102E" d="M0 210h640v60H0zM300 0h40v480h-40z"/>
  </svg>
);

// ─── Social Icons ─────────────────────────────────────────────────────────────
const IconInstagram = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconEmail = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// ─── Garden Silhouette SVG ────────────────────────────────────────────────────
// Pure SVG, ~3KB, zero render cost. Depicts botanical garden silhouette.
const GardenSilhouette = () => (
  <svg
    viewBox="0 0 1440 160"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMax slice"
    aria-hidden="true"
    style={{ display: "block", width: "100%", height: "auto" }}
  >
    {/* Ground line */}
    <rect x="0" y="148" width="1440" height="12" fill="#162420"/>

    {/* ── Far background plants (lightest) ── */}
    <g fill="#1a2e28" opacity="0.6">
      {/* Distant ferns */}
      <ellipse cx="80"  cy="140" rx="28" ry="18"/>
      <ellipse cx="200" cy="138" rx="22" ry="14"/>
      <ellipse cx="350" cy="141" rx="30" ry="16"/>
      <ellipse cx="520" cy="139" rx="24" ry="15"/>
      <ellipse cx="700" cy="140" rx="32" ry="17"/>
      <ellipse cx="900" cy="138" rx="26" ry="15"/>
      <ellipse cx="1100" cy="140" rx="28" ry="16"/>
      <ellipse cx="1300" cy="139" rx="22" ry="14"/>
      <ellipse cx="1400" cy="141" rx="20" ry="13"/>
    </g>

    {/* ── Mid-ground layer ── */}
    <g fill="#1e3530">

      {/* Tall stemmed flower left — daisy style */}
      <rect x="58" y="85" width="3" height="63"/>
      <circle cx="60" cy="80" r="10"/>
      <ellipse cx="48" cy="88" rx="10" ry="5" transform="rotate(-30 48 88)"/>
      <ellipse cx="72" cy="88" rx="10" ry="5" transform="rotate(30 72 88)"/>

      {/* Grass blades cluster left */}
      <path d="M20,148 Q15,120 12,105 Q18,120 22,148Z"/>
      <path d="M30,148 Q28,118 24,100 Q32,118 34,148Z"/>
      <path d="M40,148 Q42,122 46,108 Q40,124 38,148Z"/>

      {/* Leafy bush */}
      <ellipse cx="140" cy="128" rx="36" ry="22"/>
      <ellipse cx="120" cy="132" rx="22" ry="16"/>
      <ellipse cx="160" cy="130" rx="24" ry="18"/>

      {/* Tall tulip */}
      <rect x="218" y="90" width="3" height="58"/>
      <path d="M212,90 Q219.5,70 227,90 Q223,85 219.5,82 Q216,85 212,90Z"/>
      {/* Leaves on stem */}
      <path d="M219,115 Q205,108 200,100 Q210,110 219,112Z"/>
      <path d="M221,120 Q235,112 240,104 Q230,115 221,117Z"/>

      {/* Fern spread */}
      <path d="M280,148 Q270,130 260,115 Q275,132 282,148Z"/>
      <path d="M280,148 Q290,128 300,112 Q288,130 280,148Z"/>
      <path d="M280,148 Q268,125 255,108 Q272,127 280,148Z"/>
      <path d="M280,148 Q292,122 305,105 Q290,124 280,148Z"/>
      <path d="M280,148 Q265,135 260,125 Q272,136 280,148Z"/>
      <path d="M280,148 Q295,133 300,123 Q288,136 280,148Z"/>

      {/* Wildflower with multiple petals */}
      <rect x="378" y="88" width="2.5" height="60"/>
      <circle cx="379" cy="83" r="7"/>
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const rad = a * Math.PI / 180;
        const x = 379 + Math.cos(rad) * 11;
        const y = 83 + Math.sin(rad) * 11;
        return <ellipse key={i} cx={x} cy={y} rx="5" ry="3" transform={`rotate(${a} ${x} ${y})`}/>;
      })}
      {/* Leaves */}
      <path d="M379,115 Q362,105 355,95 Q368,108 379,112Z"/>
      <path d="M379,122 Q396,112 402,101 Q392,115 379,120Z"/>

      {/* Round shrub cluster */}
      <ellipse cx="460" cy="130" rx="30" ry="20"/>
      <ellipse cx="438" cy="136" rx="20" ry="14"/>
      <ellipse cx="482" cy="134" rx="22" ry="15"/>

      {/* Tall grass + small flower */}
      <path d="M550,148 Q546,115 542,95 Q550,118 554,148Z"/>
      <path d="M558,148 Q556,120 554,100 Q560,122 562,148Z"/>
      <rect x="565" y="100" width="2" height="48"/>
      <circle cx="566" cy="96" r="5"/>

      {/* Large fanned leaves */}
      <path d="M620,148 Q605,125 598,105 Q615,128 622,148Z"/>
      <path d="M622,148 Q610,120 605,98 Q618,122 624,148Z"/>
      <path d="M624,148 Q636,122 640,100 Q630,124 626,148Z"/>
      <path d="M626,148 Q640,126 648,106 Q636,128 628,148Z"/>
      <rect x="622" y="100" width="3" height="48"/>

      {/* Daisy right of centre */}
      <rect x="680" y="82" width="3" height="66"/>
      <circle cx="681" cy="77" r="9"/>
      {[0,60,120,180,240,300].map((a, i) => {
        const rad = a * Math.PI / 180;
        const x = 681 + Math.cos(rad) * 13;
        const y = 77 + Math.sin(rad) * 13;
        return <ellipse key={i} cx={x} cy={y} rx="6" ry="3" transform={`rotate(${a} ${x} ${y})`}/>;
      })}
      <path d="M681,120 Q665,110 658,98 Q671,112 681,117Z"/>

      {/* Boxwood hedge section */}
      <path d="M740,148 Q738,128 740,112 Q748,118 756,112 Q758,128 756,148Z"/>
      <ellipse cx="748" cy="112" rx="14" ry="10"/>

      {/* Tall spike flower — like a lavender */}
      <rect x="810" y="78" width="3" height="70"/>
      <rect x="808" y="78" width="7" height="28" rx="3"/>
      <path d="M811,110 Q797,100 790,90 Q804,104 811,108Z"/>
      <path d="M813,116 Q826,106 832,95 Q820,109 813,113Z"/>

      {/* Grass blades right side cluster */}
      <path d="M870,148 Q865,118 860,100 Q868,120 872,148Z"/>
      <path d="M878,148 Q876,115 872,96 Q880,118 882,148Z"/>
      <path d="M886,148 Q888,120 892,102 Q886,122 884,148Z"/>

      {/* Leafy branch drooping */}
      <path d="M940,148 Q952,120 958,100"/>
      <path d="M940,148 Q952,120 958,100 Q954,108 948,116 Q944,128 940,148Z"/>
      <ellipse cx="944" cy="118" rx="12" ry="6" transform="rotate(-20 944 118)"/>
      <ellipse cx="952" cy="108" rx="11" ry="5" transform="rotate(-15 952 108)"/>
      <ellipse cx="957" cy="100" rx="9"  ry="5" transform="rotate(-10 957 100)"/>

      {/* Pom-pom flower */}
      <rect x="1020" y="86" width="2.5" height="62"/>
      <circle cx="1021" cy="80" r="14"/>
      <circle cx="1021" cy="80" r="8" fill="#162420"/>
      <path d="M1021,115 Q1007,107 1002,97 Q1014,110 1021,112Z"/>
      <path d="M1021,122 Q1034,114 1038,103 Q1028,116 1021,119Z"/>

      {/* Dense shrub right */}
      <ellipse cx="1110" cy="126" rx="38" ry="24"/>
      <ellipse cx="1086" cy="132" rx="24" ry="16"/>
      <ellipse cx="1134" cy="130" rx="26" ry="18"/>
      <ellipse cx="1110" cy="116" rx="20" ry="14"/>

      {/* Tall stem with leaf pair */}
      <rect x="1198" y="80" width="3" height="68"/>
      <path d="M1199,100 Q1183,90 1176,80 Q1190,94 1199,98Z"/>
      <path d="M1201,108 Q1216,98 1222,87 Q1210,101 1201,105Z"/>
      <path d="M1199,120 Q1184,112 1178,102 Q1192,116 1199,118Z"/>
      <circle cx="1200" cy="76" r="8"/>
      {[0,72,144,216,288].map((a, i) => {
        const rad = a * Math.PI / 180;
        const x = 1200 + Math.cos(rad) * 12;
        const y = 76 + Math.sin(rad) * 12;
        return <ellipse key={i} cx={x} cy={y} rx="5" ry="3" transform={`rotate(${a} ${x} ${y})`}/>;
      })}

      {/* Grass blades far right */}
      <path d="M1360,148 Q1355,118 1350,98 Q1358,122 1362,148Z"/>
      <path d="M1370,148 Q1368,115 1365,95 Q1372,118 1374,148Z"/>
      <path d="M1380,148 Q1382,120 1386,102 Q1380,122 1378,148Z"/>
      <path d="M1390,148 Q1395,125 1400,108 Q1392,127 1388,148Z"/>
      <path d="M1400,148 Q1408,122 1414,105 Q1405,125 1402,148Z"/>
      <path d="M1415,148 Q1420,128 1426,112 Q1418,130 1414,148Z"/>
    </g>

    {/* ── Foreground layer (darkest) ── */}
    <g fill="#162420">
      {/* Ground cover left */}
      <path d="M0,148 Q10,138 20,132 Q30,138 40,148Z"/>
      <path d="M35,148 Q48,136 58,130 Q65,138 72,148Z"/>
      <path d="M100,148 Q112,140 120,135 Q128,140 136,148Z"/>

      {/* Small daisy foreground */}
      <rect x="168" y="120" width="2" height="28"/>
      <circle cx="169" cy="116" r="6"/>
      {[0,60,120,180,240,300].map((a, i) => {
        const rad = a * Math.PI / 180;
        const x = 169 + Math.cos(rad) * 9;
        const y = 116 + Math.sin(rad) * 9;
        return <ellipse key={i} cx={x} cy={y} rx="4" ry="2" transform={`rotate(${a} ${x} ${y})`}/>;
      })}

      {/* Ground cover patches */}
      <path d="M230,148 Q244,136 254,130 Q262,138 270,148Z"/>
      <path d="M320,148 Q330,140 338,136 Q344,142 350,148Z"/>
      <path d="M440,148 Q454,138 464,133 Q471,140 478,148Z"/>

      {/* Foreground tall grass */}
      <path d="M490,148 Q485,125 480,108 Q490,128 494,148Z"/>
      <path d="M502,148 Q500,122 498,104 Q505,125 506,148Z"/>
      <path d="M510,148 Q514,126 520,110 Q512,128 508,148Z"/>

      {/* Low leaf cluster */}
      <ellipse cx="600" cy="140" rx="28" ry="10"/>
      <ellipse cx="578" cy="143" rx="18" ry="7"/>
      <ellipse cx="622" cy="142" rx="20" ry="8"/>

      <path d="M720,148 Q732,138 742,133 Q750,140 758,148Z"/>

      {/* Foreground wispy grass right */}
      <path d="M790,148 Q784,128 778,110 Q788,130 792,148Z"/>
      <path d="M800,148 Q798,124 796,106 Q802,127 804,148Z"/>

      <path d="M920,148 Q932,140 940,136 Q946,142 952,148Z"/>

      {/* Dense foreground bush right */}
      <ellipse cx="1060" cy="140" rx="32" ry="12"/>
      <ellipse cx="1040" cy="143" rx="20" ry="8"/>
      <ellipse cx="1082" cy="142" rx="22" ry="9"/>

      <path d="M1160,148 Q1172,140 1180,136 Q1186,142 1192,148Z"/>
      <path d="M1240,148 Q1252,138 1260,134 Q1266,140 1272,148Z"/>

      {/* Far right ground */}
      <path d="M1300,148 Q1314,140 1322,136 Q1330,142 1338,148Z"/>
      <path d="M1430,148 Q1434,140 1436,136 Q1438,142 1440,148Z"/>
    </g>
  </svg>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
function SiteFooter() {
  const navLinks = [
    { href: "/passo-a-passo",       label: "Como Funciona" },
    { href: "/opcoes-e-precos",     label: "Opções e Preços" },
    { href: "/recriacao",           label: "Recriação de Bouquet" },
    { href: "/vale-presente",       label: "Vale-Presente" },
    { href: "/perguntas-frequentes",label: "Perguntas Frequentes" },
    { href: "/contactos",           label: "Contactos e Equipa" },
  ];

  return (
    <footer style={{ backgroundColor: "#0F1E1A", color: "#FAF7F0", position: "relative" }}>

      {/* Garden silhouette */}
      <div style={{ lineHeight: 0, marginBottom: "-2px", backgroundColor: "#FAF7F0" }}>
        <GardenSilhouette/>
      </div>

      {/* Main footer body */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px 0" }}>

        {/* Top: brand + tagline */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 style={{
            fontFamily: "'TAN-MEMORIES', serif",
            fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
            color: "#FAF7F0", margin: "0 0 8px", lineHeight: 1.05
          }}>
            Flores à Beira&#8209;Rio
          </h2>
          <p style={{
            fontSize: "0.65rem", letterSpacing: "4px",
            textTransform: "uppercase", color: "#8BA888",
            margin: "0 0 24px", fontFamily: "Roboto, sans-serif"
          }}>
            Atelier de Preservação Botânica · Ceira, Coimbra
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            {[
              { href: "https://instagram.com/floresabeirario", icon: <IconInstagram/>, label: "Instagram" },
              { href: "https://facebook.com/floresabeirario",  icon: <IconFacebook/>,  label: "Facebook" },
              { href: "https://wa.me/351934680300",             icon: <IconWhatsApp/>,  label: "WhatsApp" },
              { href: "mailto:info@floresabeirario.pt",         icon: <IconEmail/>,     label: "Email" },
            ].map((s, i) => (
              <a key={i} href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer" aria-label={s.label}
                style={{
                  color: "rgba(250,247,240,0.5)",
                  transition: "color 0.25s ease",
                  display: "flex", alignItems: "center"
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.5)"}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(250,247,240,0.1), transparent)",
          marginBottom: "44px"
        }}/>

        {/* Middle: nav + contact */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "36px 48px",
          marginBottom: "48px"
        }}>
          {/* Navigation */}
          <div>
            <p style={{
              fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase",
              color: "rgba(250,247,240,0.35)", marginBottom: "16px",
              fontFamily: "Roboto, sans-serif"
            }}>
              Páginas
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {navLinks.map((l, i) => (
                <a key={i} href={l.href} style={{
                  color: "rgba(250,247,240,0.65)",
                  textDecoration: "none", fontSize: "0.88rem",
                  fontWeight: "300", transition: "color 0.25s ease",
                  lineHeight: 1
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.65)"}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase",
              color: "rgba(250,247,240,0.35)", marginBottom: "16px",
              fontFamily: "Roboto, sans-serif"
            }}>
              Contacto
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="https://wa.me/351934680300"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  backgroundColor: "#25D366", color: "#fff",
                  padding: "10px 20px", borderRadius: "100px",
                  textDecoration: "none", fontWeight: "600",
                  fontSize: "0.78rem", letterSpacing: "0.5px",
                  transition: "background-color 0.25s ease",
                  fontFamily: "Roboto, sans-serif",
                  width: "fit-content"
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1da851"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#25D366"}
              >
                <IconWhatsApp/> +351 934 680 300
              </a>
              <a href="mailto:info@floresabeirario.pt" style={{
                color: "rgba(250,247,240,0.6)", fontSize: "0.88rem",
                textDecoration: "none", fontWeight: "300",
                transition: "color 0.25s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.6)"}
              >
                info@floresabeirario.pt
              </a>
              <p style={{
                color: "rgba(250,247,240,0.35)", fontSize: "0.82rem",
                margin: 0, lineHeight: 1.65, fontWeight: "300"
              }}>
                Ceira, Coimbra<br/>Portugal
              </p>
            </div>
          </div>

          {/* Legal / lang */}
          <div>
            <p style={{
              fontSize: "0.58rem", letterSpacing: "3px", textTransform: "uppercase",
              color: "rgba(250,247,240,0.35)", marginBottom: "16px",
              fontFamily: "Roboto, sans-serif"
            }}>
              Legal
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/politica-de-privacidade", label: "Política de Privacidade" },
                { href: "/termos-e-condicoes",      label: "Termos e Condições" },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{
                  color: "rgba(250,247,240,0.6)", textDecoration: "none",
                  fontSize: "0.88rem", fontWeight: "300",
                  transition: "color 0.25s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#FAF7F0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.6)"}
                >
                  {l.label}
                </a>
              ))}

              {/* Language selector */}
              <div style={{ marginTop: "8px", display: "flex", gap: "14px" }}>
                <a href="/pt" style={{
                  color: "#FAF7F0", fontSize: "0.78rem", fontWeight: "600",
                  textDecoration: "none", display: "flex", alignItems: "center",
                  fontFamily: "Roboto, sans-serif", letterSpacing: "1px"
                }}>
                  PT <FlagPT/>
                </a>
                <a href="/en" style={{
                  color: "rgba(250,247,240,0.4)", fontSize: "0.78rem", fontWeight: "600",
                  textDecoration: "none", display: "flex", alignItems: "center",
                  fontFamily: "Roboto, sans-serif", letterSpacing: "1px",
                  transition: "color 0.25s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(250,247,240,0.8)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,240,0.4)"}
                >
                  EN <FlagEN/>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(250,247,240,0.07)",
          padding: "20px 0 28px",
          display: "flex", justifyContent: "center",
          fontSize: "0.6rem", letterSpacing: "1.5px",
          color: "rgba(250,247,240,0.25)",
          fontFamily: "Roboto, sans-serif",
          textAlign: "center"
        }}>
          © 2026 FLORES À BEIRA-RIO. TODOS OS DIREITOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLeft = [
    { name: "Opções e Preços",      href: "/opcoes-e-precos" },
    { name: "Passo a Passo",        href: "/passo-a-passo" },
    { name: "Recriação de Bouquet", href: "/recriacao" },
  ];
  const menuRight = [
    { name: "Vale-Presente",        href: "/vale-presente" },
    { name: "Perguntas Frequentes", href: "/perguntas-frequentes" },
    { name: "Contactos e Equipa",   href: "/contactos" },
    { name: "PT", href: "/pt", isLang: true },
  ];

  const shouldShowScrolled = scrolled || !isHome;

  return (
    <html lang="pt">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"/>
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'TAN-MEMORIES';
            src: url('/TAN-MEMORIES.otf') format('opentype');
            font-weight: normal; font-style: normal; font-display: swap;
          }
          @font-face {
            font-family: 'TAN-MEMORIES';
            src: url('/TAN-MEMORIES-Italic.otf') format('opentype');
            font-weight: normal; font-style: italic; font-display: swap;
          }
        `}}/>
      </head>
      <body style={{ margin: 0, backgroundColor: "#FAF7F0", color: "#1a1a1a", fontFamily: "'Roboto', sans-serif" }}>

        {/* ── NAV ── */}
        <nav style={{
          position: "fixed", top: 0, width: "100%", zIndex: 100,
          backgroundColor: shouldShowScrolled ? "rgba(250,247,240,0.95)" : "transparent",
          backdropFilter: shouldShowScrolled ? "blur(10px)" : "none",
          transition: "all 0.4s ease",
          padding: shouldShowScrolled ? "15px 0" : "25px 0"
        }}>
          <div className="nav-container">
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div className="desktop-only" style={{ display: "flex", gap: "25px" }}>
                {menuLeft.map(item => (
                  <a key={item.name} href={item.href} className="nav-link" style={{
                    fontSize: "0.73rem", fontWeight: "500",
                    textTransform: "uppercase", letterSpacing: "1.5px",
                    color: shouldShowScrolled ? "#1a1a1a" : "#fff"
                  }}>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <motion.a
              href="/"
              initial={{ opacity: isHome ? 0 : 1 }}
              animate={{ opacity: shouldShowScrolled ? 1 : 0 }}
              className="nav-link logo-central"
              style={{
                color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                fontSize: "1.5rem", fontFamily: "'TAN-MEMORIES', serif",
                textAlign: "center", flex: "0 0 auto",
                pointerEvents: shouldShowScrolled ? "auto" : "none",
                display: shouldShowScrolled ? "block" : "none"
              }}>
              Flores à Beira-Rio
            </motion.a>

            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <div className="desktop-only" style={{ display: "flex", gap: "25px", alignItems: "center" }}>
                {menuRight.map(item => {
                  if (item.isLang) return (
                    <div key={item.name} className="lang-container" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                      <a href={item.href} className="nav-link" style={{
                        fontSize: "0.73rem", fontWeight: "500", textTransform: "uppercase",
                        letterSpacing: "1.5px", color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                        display: "flex", alignItems: "center", cursor: "pointer"
                      }}>
                        {item.name} <FlagPT/>
                      </a>
                      <div className="lang-dropdown">
                        <a href="/en" className="lang-dropdown-item" style={{
                          fontSize: "0.73rem", fontWeight: "500", textTransform: "uppercase",
                          letterSpacing: "1.5px", display: "flex", alignItems: "center",
                          color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                          background: shouldShowScrolled ? "rgba(250,247,240,0.92)" : "rgba(0,0,0,0.15)",
                          backdropFilter: "blur(12px)",
                          padding: "10px 16px", borderRadius: "4px",
                          border: `1px solid ${shouldShowScrolled ? "rgba(26,26,26,0.06)" : "rgba(255,255,255,0.1)"}`,
                          textDecoration: "none", transition: "background 0.3s ease"
                        }}>
                          EN <FlagEN/>
                        </a>
                      </div>
                    </div>
                  );
                  return (
                    <a key={item.name} href={item.href} className="nav-link" style={{
                      fontSize: "0.73rem", fontWeight: "500", textTransform: "uppercase",
                      letterSpacing: "1.5px", color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                      display: "flex", alignItems: "center"
                    }}>
                      {item.name}
                    </a>
                  );
                })}
              </div>

              <button className="mobile-only" onClick={() => setIsOpen(true)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: shouldShowScrolled ? "#1a1a1a" : "#fff",
                fontSize: "0.82rem", fontWeight: "500", letterSpacing: "2px",
                padding: "10px 0", fontFamily: "'Roboto', sans-serif"
              }}>
                MENU
              </button>
            </div>
          </div>
        </nav>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: "fixed", inset: 0,
                backgroundColor: "#FAF7F0", zIndex: 200,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
              }}
            >
              <button onClick={() => setIsOpen(false)} style={{
                position: "absolute", top: "28px", right: "24px",
                background: "none", border: "none",
                fontSize: "0.82rem", fontWeight: "500",
                letterSpacing: "2px", cursor: "pointer",
                fontFamily: "'Roboto', sans-serif"
              }}>
                FECHAR
              </button>

              {[...menuLeft, ...menuRight.filter(i => !i.isLang)].map(item => (
                <a key={item.name} href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="nav-link"
                  style={{
                    color: "#1a1a1a", fontSize: "clamp(1.4rem,5vw,1.9rem)",
                    margin: "12px 0", fontFamily: "'TAN-MEMORIES', serif"
                  }}>
                  {item.name}
                </a>
              ))}

              <div style={{
                display: "flex", gap: "28px", marginTop: "36px",
                borderTop: "1px solid rgba(26,26,26,0.1)", paddingTop: "28px"
              }}>
                <a href="/pt" style={{ color: "#1a1a1a", fontSize: "1.2rem", fontFamily: "'TAN-MEMORIES', serif", display: "flex", alignItems: "center", textDecoration: "none" }}>
                  PT <FlagPT/>
                </a>
                <a href="/en" style={{ color: "#1a1a1a", fontSize: "1.2rem", fontFamily: "'TAN-MEMORIES', serif", display: "flex", alignItems: "center", textDecoration: "none", opacity: 0.4 }}>
                  EN <FlagEN/>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>{children}</main>

        {/* ── FOOTER on every page ── */}
        <SiteFooter/>

        <style jsx global>{`
          @media (max-width: 1023px) { .desktop-only { display: none !important; } }
          @media (min-width: 1024px) { .mobile-only  { display: none !important; } }
          * { box-sizing: border-box; }
          .nav-container {
            max-width: 1400px; margin: 0 auto;
            display: flex; justify-content: space-between;
            align-items: center; padding: 0 20px;
          }
          @media (min-width: 1024px) { .nav-container { padding: 0 40px; } }
          .logo-central { padding: 0 20px; }
          h1, h2, h3, .serif { font-family: 'TAN-MEMORIES', serif !important; font-weight: 400; line-height: 1.1; }
          .italic { font-style: italic !important; }
          .nav-link {
            text-decoration: none !important;
            transition: all 0.3s ease;
            display: inline-block;
            border-bottom: 1px solid transparent;
            line-height: 1.4; padding-bottom: 2px;
          }
          .nav-link:hover { border-bottom: 1px solid currentColor; }
          .lang-dropdown {
            position: absolute; top: 100%; right: 0;
            padding-top: 12px; opacity: 0; visibility: hidden;
            transform: translateY(-8px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
          }
          .lang-container:hover .lang-dropdown {
            opacity: 1; visibility: visible;
            transform: translateY(0); pointer-events: auto;
          }
        `}</style>
      </body>
    </html>
  );
}
