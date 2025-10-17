/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/ReferMakkale',
  assetPrefix: '/ReferMakkale/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
