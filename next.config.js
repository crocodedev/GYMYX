/** @type {import('next').NextConfig} */
const path = require('path');
const withPWA = require('next-pwa');
const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );
    return config;
  },

  experimental: {
    optimizeCss: true,
    // compress: true,
    // optimizeFonts: true,
    swcMinify: true,
    nextScriptWorkers: false,
    optimizeServerReact: true,
    optimizePackageImports: [
      '@heroicons/react',
      'lodash-es',
      'date-fns'
    ],
    // fontLoaders: [
    //   {
    //     loader: '@next/font/google',
    //     options: {
    //       subsets: ['latin'],
    //       preload: true,
    //     },
    //   },
    // ],
    // modularizeImports: {
    //   'react-bootstrap': {
    //     transform: 'react-bootstrap/{{member}}',
    //   },
    //   lodash: {
    //     transform: 'lodash/{{member}}',
    //   },
    //   'lodash-es': {
    //     transform: 'lodash-es/{{member}}',
    //   },
    // },
  },

  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    minimumCacheTTL: 86400,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'workspace.gymyx.ru',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },

      {
        source: '/lk/guide',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/lk/trainers',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/lk/workouts',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/lk/booking',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },

      {
        source: '/lk/booking/sign-up/choose-time',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/lk/checkout',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

const withPlugins = withBundleAnalyzer(
  withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  })
);

module.exports = withPlugins(nextConfig);
