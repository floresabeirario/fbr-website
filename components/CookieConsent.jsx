"use client";

// Caixinha mínima de cookies — apenas INFORMATIVA (decisão da Maria: o widget
// de avaliações aparece sempre, não fica dependente do aceitar). Mostra-se
// uma vez; o "OK" guarda a escolha em localStorage e não volta a aparecer.
import Link from "next/link";
import { useLocale } from "next-intl";
import { useConsent, setConsent } from "@/app/_lib/consent";

const TEXT = {
  pt: {
    msg: "Usamos cookies de terceiros.",
    privacy: "Ler a política de privacidade",
    ok: "OK",
    privacyHref: "/politica-de-privacidade",
  },
  en: {
    msg: "We use third-party cookies.",
    privacy: "Read the privacy policy",
    ok: "OK",
    privacyHref: "/en/privacy-policy",
  },
};

const FONT = "var(--font-google-sans), 'Google Sans', sans-serif";

export default function CookieConsent() {
  const consent = useConsent();
  const locale = useLocale();
  const t = TEXT[locale] ?? TEXT.pt;

  // "unknown" = servidor/primeiro paint; qualquer valor guardado = já viu
  if (consent !== "unset") return null;

  return (
    <div
      role="region"
      data-cookie-banner=""
      aria-label="Cookies"
      style={{
        position: "fixed", bottom: "12px", left: "12px", zIndex: 150,
        maxWidth: "min(300px, calc(100vw - 24px))",
        // Vidro escuro MUITO translúcido: funde-se com o rodapé escurecido do
        // hero e nas páginas claras lê como parte da interface (a foto/fundo
        // passa através). Sem sombra, borda quase invisível, OK em ghost.
        backgroundColor: "rgba(15,30,26,0.34)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        color: "var(--cream)",
        borderRadius: "100px", padding: "7px 8px 7px 14px",
        border: "1px solid rgba(250,247,240,0.14)",
        fontFamily: FONT,
        display: "flex", alignItems: "center", gap: "10px",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.68rem", lineHeight: 1.4, color: "rgba(250,247,240,0.78)", flex: 1 }}>
        {t.msg}{" "}
        <Link href={t.privacyHref} style={{ color: "rgba(250,247,240,0.9)", textDecoration: "underline", textUnderlineOffset: "2px", whiteSpace: "nowrap" }}>
          {t.privacy}
        </Link>
      </p>
      <button
        type="button"
        onClick={() => setConsent("ok")}
        style={{
          flexShrink: 0, backgroundColor: "rgba(250,247,240,0.14)", color: "var(--cream)",
          border: "1px solid rgba(250,247,240,0.28)", borderRadius: "100px", padding: "6px 14px",
          fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.8px",
          textTransform: "uppercase", cursor: "pointer", fontFamily: FONT,
        }}
      >
        {t.ok}
      </button>
    </div>
  );
}
