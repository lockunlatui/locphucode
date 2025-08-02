const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // For Cloudflare Pages - static export for compatibility
  output: "export",
  trailingSlash: true,
  images: {
    domains: ["i.imgur.com"],
    unoptimized: true, // Required for static export
  },
});
