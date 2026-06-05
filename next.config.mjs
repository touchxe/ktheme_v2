/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WP_API_URL: process.env.WP_API_URL,
    WP_USERNAME: process.env.WP_USERNAME,
    WP_APP_PASSWORD: process.env.WP_APP_PASSWORD,
  },
}

export default nextConfig
