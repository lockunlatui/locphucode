const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // disable is help to disable PWA in deployment mode
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
  images: {
    domains: ["i.imgur.com"],
  },
  // write additional configuration here.
});
