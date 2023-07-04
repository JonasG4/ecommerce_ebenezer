/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: false,
  env: {
    AWS_BUCKET_URL: "https://comercialeben-ezer.s3.us-east-2.amazonaws.com/"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'comercialeben-ezer.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      }
    ],
  }
}

module.exports = nextConfig
  