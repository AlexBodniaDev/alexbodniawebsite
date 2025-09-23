/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  ...(process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES && {
    output: 'export',
    basePath: '/portfolio',
    assetPrefix: '/portfolio/',
    trailingSlash: true,
  }),
}

export default nextConfig
