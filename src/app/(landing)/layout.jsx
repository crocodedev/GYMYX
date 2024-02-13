import { Montserrat } from 'next/font/google';
import './../globals.scss';

import Header from '@/Sections/Header';
import Footer from '@/Sections/landing/Footer';

import { Providers } from '@/Components/Providers';
const MontserratFont = Montserrat({ subsets: ['cyrillic-ext'] });

export const metadata = {
  title: 'GYMYX',
  description: 'GYMYX',
  manifest: '/manifest.json',
  icons: {
    apple: [{ url: '/icon-192x192.png' }, { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
    other: [
      {
        rel: 'icon-192x192.png',
        url: '/icon-192x192.png',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 0,
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/index`, {
    cache: 'no-store',
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function LandingLayout({ children, params }) {
  const { data } = await getData();
  const headerData = data.modules.find((item) => item.alias === 'header');
  const footerData = data.modules.find((item) => item.alias === 'footer');

  return (
    <html lang="en">
      <body className={MontserratFont.className}>
        <Providers>
          <Header isLanding={true} data={headerData} />
          <main className="main">{children}</main>
          <Footer data={footerData} />
        </Providers>
      </body>
    </html>
  );
}
