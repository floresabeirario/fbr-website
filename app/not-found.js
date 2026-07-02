// app/not-found.js
// 404 raiz — apanha URLs cujo primeiro segmento não é um locale válido
// (ex: /pagina-inexistente). Fora do layout de locale não há Nav/Footer nem
// next-intl, por isso renderiza html/body próprios com conteúdo bilingue.
import Link from "next/link";
import "@/app/globals.css";

export default function RootNotFound() {
  return (
    <html lang="pt">
      <body style={{ margin: 0 }}>
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "var(--cream)", padding: "48px 24px", textAlign: "center",
        }}>
          <div style={{ maxWidth: "520px" }}>
            <p style={{
              fontSize: "0.62rem", letterSpacing: "3.5px", textTransform: "uppercase",
              color: "var(--terra)", fontWeight: 700, margin: "0 0 14px",
            }}>
              Erro 404
            </p>
            <h1 style={{
              fontFamily: "'TAN-MEMORIES', serif", fontSize: "clamp(2.2rem,6vw,3.6rem)",
              color: "var(--green-d)", margin: "0 0 16px", lineHeight: 1.1,
            }}>
              Esta página não floresceu
            </h1>
            <p style={{ color: "var(--mid)", fontSize: "1rem", lineHeight: 1.85, margin: "0 0 8px" }}>
              A página que procura não existe ou mudou de sítio.
            </p>
            <p style={{ color: "var(--mid-l)", fontSize: "0.88rem", lineHeight: 1.7, margin: "0 0 32px" }}>
              The page you are looking for does not exist or has moved.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
              <Link href="/" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "var(--green)", color: "var(--cream)",
                border: "1.5px solid var(--green)",
                padding: "13px 28px", borderRadius: "100px", textDecoration: "none",
                fontWeight: 600, fontSize: "0.78rem", letterSpacing: "1.2px", textTransform: "uppercase",
              }}>
                Página inicial
              </Link>
              <Link href="/en" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "transparent", color: "var(--green)",
                border: "1.5px solid var(--green)",
                padding: "13px 28px", borderRadius: "100px", textDecoration: "none",
                fontWeight: 600, fontSize: "0.78rem", letterSpacing: "1.2px", textTransform: "uppercase",
              }}>
                Homepage (EN)
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
