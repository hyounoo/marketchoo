/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  // assetPrefix: isProd ? 'https://cdn.marketchoo.com' : '',
  images: {
    domains: ['cdn.sanity.io'],
  }
}
