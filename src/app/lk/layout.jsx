import { Montserrat } from 'next/font/google';
import './../globals.scss';

import { Providers } from '@/Components/Providers';
const MontserratFont = Montserrat({ subsets: ['latin'] });
import Header from '@/Sections/Header';
import MobileBar from '@/Components/MobileBar';
import Head from 'next/head';

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
      <Head>
        <script type="text/javascript">
          {`
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(96462782, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      });
      `}
        </script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/96462782" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/96462782" style="position:absolute; left:-9999px;" alt="" />
          </div>
        </noscript>
      </Head>
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
