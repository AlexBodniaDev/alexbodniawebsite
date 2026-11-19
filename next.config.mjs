/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // потрібне для static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

