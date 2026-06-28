import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.18.9'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fifa.com',
        port: '',
        pathname: '/api/v3/picture/flags-sq-4/**',
      },
    ],
  },
}

export default nextConfig
