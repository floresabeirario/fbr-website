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
          // Isolamento de janelas/popups (mitiga Spectre, tabnabbing).
          // same-origin-allow-popups permite WhatsApp/Instagram a abrirem em popup
          // mas mantém o site isolado do contexto da janela aberta.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // Impede que recursos sejam embebidos por outros sites
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          // Permite pré-resolução DNS para imagens/scripts externos (Cloudflare, Google)
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Content Security Policy
          // script-src 'unsafe-inline': necessário para hydration do Next.js e JSON-LD inline
          // style-src 'unsafe-inline': necessário para Framer Motion (estilos inline)
          // font-src 'self': Google Sans é auto-hospedado pelo Next.js em build
          // font-src data:: widget Elfsight (reviews) embebe a fonte de ícones como base64
          // challenges.cloudflare.com: Turnstile (CAPTCHA) — carrega script + iframe
          // *.umami.is: Umami (carrega o script e envia os dados de tráfego)
          // *.clarity.ms + c.bing.com: Microsoft Clarity (heatmaps, gravações, sync)
          // maps.googleapis.com + maps.gstatic.com: mapa de confirmação da morada
          //   de recolha no form de reserva. Só entra em cena depois de a cliente
          //   escolher uma sugestão de morada; sem estas entradas o browser bloqueia
          //   o script e o mapa nunca aparece (erro invisível para o build e para
          //   testes por linha de comandos — só um browser aplica a CSP).
          //   fonts.googleapis.com fica DE FORA de propósito: o Maps tenta buscar a
          //   Roboto e é bloqueado, o que só muda a fonte dos controlos do mapa.
          //   Continuamos sem servir fontes da Google, que é a decisão de RGPD do site.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' elfsightcdn.com *.elfsightcdn.com https://challenges.cloudflare.com https://*.umami.is https://*.clarity.ms https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' elfsightcdn.com *.elfsightcdn.com",
              "font-src 'self' data: elfsightcdn.com *.elfsightcdn.com",
              "img-src 'self' data: blob: elfsightcdn.com *.elfsightcdn.com *.googleusercontent.com https://*.clarity.ms https://c.bing.com https://maps.googleapis.com https://maps.gstatic.com https://*.googleapis.com https://*.gstatic.com",
              "connect-src 'self' elfsightcdn.com *.elfsightcdn.com elfsight.com *.elfsight.com https://challenges.cloudflare.com https://*.umami.is https://*.clarity.ms https://c.bing.com https://maps.googleapis.com",
              "frame-src 'self' https://challenges.cloudflare.com",
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
    return [
      // Apex (floresabeirario.pt) -> www (www.floresabeirario.pt)
      // Consolida autoridade SEO num único domínio canónico
      {
        source: "/:path*",
        has: [{ type: "host", value: "floresabeirario.pt" }],
        destination: "https://www.floresabeirario.pt/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
