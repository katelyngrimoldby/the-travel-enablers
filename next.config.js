/** @type {import('next').NextConfig} */

const withOptimizedImages = require("next-optimized-images");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
    loader: "custom",
    domains: ["images.ctfassets.net"],
  },
};

module.exports = nextConfig;
