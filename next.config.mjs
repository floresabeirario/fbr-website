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
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Impede que o browser tente adivinhar o tipo MIME de ficheiros
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limita a informação de referrer enviada a sites externos
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Desactiva funcionalidades do browser que não são usadas neste site
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
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

export default nextConfig;
