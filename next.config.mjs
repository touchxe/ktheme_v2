/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'adm11.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  env: {
    WP_API_URL: process.env.WP_API_URL,
    WP_USERNAME: process.env.WP_USERNAME,
    WP_APP_PASSWORD: process.env.WP_APP_PASSWORD,
  },
}

export default nextConfig
