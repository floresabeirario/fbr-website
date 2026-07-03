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
    privacy: "Saber mais",
    ok: "OK",
    privacyHref: "/politica-de-privacidade",
  },
  en: {
    msg: "We use third-party cookies.",
    privacy: "Learn more",
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
      aria-label="Cookies"
      style={{
        position: "fixed", bottom: "14px", left: "14px", zIndex: 150,
        maxWidth: "min(320px, calc(100vw - 28px))",
        backgroundColor: "var(--dark)", color: "var(--cream)",
        borderRadius: "14px", padding: "10px 12px",
        boxShadow: "0 8px 28px rgba(15,30,26,0.35)",
        border: "1px solid rgba(250,247,240,0.12)",
        fontFamily: FONT,
        display: "flex", alignItems: "center", gap: "10px",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.72rem", lineHeight: 1.5, color: "rgba(250,247,240,0.85)", flex: 1 }}>
        {t.msg}{" "}
        <Link href={t.privacyHref} style={{ color: "var(--green-l)", textDecoration: "underline", textUnderlineOffset: "2px", whiteSpace: "nowrap" }}>
          {t.privacy}
        </Link>
      </p>
      <button
        type="button"
        onClick={() => setConsent("ok")}
        style={{
          flexShrink: 0, backgroundColor: "var(--green)", color: "var(--cream)",
          border: "none", borderRadius: "100px", padding: "7px 16px",
          fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.8px",
          textTransform: "uppercase", cursor: "pointer", fontFamily: FONT,
        }}
      >
        {t.ok}
      </button>
    </div>
  );
}
