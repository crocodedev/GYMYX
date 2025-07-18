import { Montserrat } from 'next/font/google';
import '../../styles/reset.scss'

import { Providers } from '@/Components/Providers';
const MontserratFont = Montserrat({ subsets: ['latin'] });

import { authConfig } from '@/configs/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Gymyx - индивидуальная фитнес-студия',
  description:
    'Фитнес-студия с почасовой арендой, внутри есть все необходимое оборудование: кардио-зона, свободные веса, музыка, кондиционер, а также душевая и туалет. Выберете удобное время, забронируйте и тренируйтесь! ЖК "Саларьево Парк" Станция метро: Филатов Луг/Прокшино',
  manifest: '/manifest.json',
  keywords: [
    'фитнес-студия',
    'филатов луг',
    'спорт зал',
    'тренажерный зал',
    'саларьево',
    'жк саларьево парк',
    'gymyx',
    'спорт',
  ],
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

export default async function LandingLayout({ children }) {
  const session = await getServerSession(authConfig);
  const redirectBlock = !children?.props?.childPropSegment?.includes('redirect');

  if (session && session?.user.email && redirectBlock) {
    redirect('/lk/profile');
  }

  return (
    <html lang="ru">
      <body className={MontserratFont.className}>
        <Providers isLanding={false}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
