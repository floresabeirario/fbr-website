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
