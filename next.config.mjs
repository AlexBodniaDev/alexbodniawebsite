/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // потрібне для static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // ✅ Головне для GitHub Pages:
  output: 'export',                 // Вмикаємо статичний експорт
  basePath: '/alexbodniawebsite',   // Ім'я репозиторію
  assetPrefix: '/alexbodniawebsite/',// Префікс для всіх ресурсів
  trailingSlash: true,               // Додаємо / в кінці шляхів
};

export default nextConfig;
