export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
      host: 'gymyx.ru',
    },
    sitemap: 'https://gymyx.ru/sitemap.xml',
  };
}
