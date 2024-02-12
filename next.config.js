/** @type {import('next').NextConfig} */
const path = require('path');
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  }),
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gymyx.cro.codes',
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
        source: '/lk',
        headers: [
          {
            key: 'Cache-Control',
          },
        ],
      },
      {
        source: '/lk/login',
        headers: [
          {
            key: 'Cache-Control',
          },
        ],
      },
      {
        source: '/lk/profile',
        headers: [
          {
            key: 'Cache-Control',
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
        source: '/lk/booking/sign-up',
        headers: [
          {
            key: 'Cache-Control',
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

module.exports = nextConfig;
