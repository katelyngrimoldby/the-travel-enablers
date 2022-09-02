/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
    domains: ["images.ctfassets.net"],
  },
};

module.exports = nextConfig;
