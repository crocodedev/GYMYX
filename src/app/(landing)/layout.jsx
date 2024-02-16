import { Montserrat } from 'next/font/google';
import './../globals.scss';

import Header from '@/Sections/Header';
import Footer from '@/Sections/landing/Footer';
import Head from 'next/head';

import { Providers } from '@/Components/Providers';
import Metrika from '@/Components/Metrika';
import { Suspense } from 'react';
const MontserratFont = Montserrat({ subsets: ['cyrillic-ext'] });

import { authConfig } from '@/configs/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

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
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function LandingLayout({ children }) {
  const { data } = await getData();
  const session = await getServerSession(authConfig);
  const redirectBlock = !children?.props?.childPropSegment?.includes('redirect');

  if (session && session?.user.email && redirectBlock) {
    redirect('/lk/profile');
  }

  const headerData = data.modules.find((item) => item.alias === 'header');
  const heroData = data.modules.find((item) => item.alias === 'banner');
  const footerData = data.modules.find((item) => item.alias === 'footer');

  return (
    <html lang="en">
      <link rel="preload" href={`${heroData.fields[0].value}?w=400&h=800`} as="image" />
      <link rel="preload" href={`${heroData.fields[1].value}?w=1920&h=1080`} as="image" />
      <Suspense>
        <Metrika />
      </Suspense>
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
