import { Montserrat } from 'next/font/google';
import './../globals.scss';

import { Providers } from '@/Components/Providers';
const MontserratFont = Montserrat({ subsets: ['latin'] });
import Header from '@/Sections/Header';
import MobileBar from '@/Components/MobileBar';
import Metrika from '@/Components/Metrika';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 0,
};

export const metadata = {
  title: 'GYMYX',
  description: 'GYMYX',
  manifest: '/manifest.json',
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/account`, {
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

export default async function AccountLayout({ children }) {
  const { data } = await getData();
  const headerData = data.modules.find((item) => item.alias === 'account_header');
  return (
    <html lang="en">
      <Metrika />
      <body className={MontserratFont.className}>
        <Providers>
          <Header isLanding={false} data={headerData} />
          <MobileBar headerData={headerData} />
          <main className="main account">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
