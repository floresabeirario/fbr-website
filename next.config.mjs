import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimização de imagens
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Headers de segurança e cache para assets estáticos
  async headers() {
    return [
      // ─── Security headers globais ──────────────────────────────────────────
      {
        source: "/(.*)",
        headers: [
          // Impede que o site seja embebido em iframes noutros domínios (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Impede que o browser tente adivinhar o tipo MIME de ficheiros
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limita a informação de referrer enviada a sites externos
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Desactiva funcionalidades do browser que não são usadas neste site
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Força HTTPS por 1 ano; preload permite inclusão na lista dos browsers
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Impede carregamento de plugins externos (Flash, etc.)
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          // Content Security Policy
          // script-src 'unsafe-inline': necessário para hydration do Next.js e JSON-LD inline
          // style-src 'unsafe-inline': necessário para Framer Motion (estilos inline)
          // font-src 'self': Google Sans é auto-hospedado pelo Next.js em build
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' *.elfsightcdn.com",
              "style-src 'self' 'unsafe-inline' *.elfsightcdn.com",
              "font-src 'self' *.elfsightcdn.com",
              "img-src 'self' data: blob: *.elfsightcdn.com *.googleusercontent.com",
              "connect-src 'self' *.elfsightcdn.com *.elfsight.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      // ─── Cache para assets estáticos ──────────────────────────────────────
      {
        source: "/(.*\\.webp|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.otf|.*\\.webm|.*\\.mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redireccionamentos permanentes
  async redirects() {
    return [];
  },
};

export default withNextIntl(nextConfig);
