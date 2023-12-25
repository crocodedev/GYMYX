/** @type {import('next').NextConfig} */
const path = require("path")
const withPWA = require("next-pwa")

const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gymyx.cro.codes",
        pathname: "**",
      },
    ],
  },
}

module.exports = nextConfig
