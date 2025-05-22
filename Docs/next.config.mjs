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
  },
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/AudioUI' : '',
  // The repository name (AudioUI)
  assetPrefix: process.env.NODE_ENV === 'production' ? '/AudioUI/' : '',
}

export default nextConfig
