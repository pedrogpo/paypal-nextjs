/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    SANDBOX_PAYPAL_CLIENT_ID: process.env.SANDBOX_PAYPAL_CLIENT_ID,
    PRODUCTION_PAYPAL_CLIENT_ID: process.env.PRODUCTION_PAYPAL_CLIENT_ID,
  },
}

module.exports = nextConfig
