// 'use client';

import Hero from '@/Sections/landing/Hero';
import AboutUs from '@/Sections/landing/AboutUs';
import Advantages from '@/Sections/landing/Advantages';
import Prices from '@/Sections/landing/Prices';
import ChooseHealth from '@/Sections/landing/ChooseHealth';

import Equipment from '@/Sections/landing/Equipment';
import Map from '@/Sections/landing/Map';
import Faq from '@/Sections/landing/Faq';
import Studio from '@/Sections/landing/Studio';

import { headers } from 'next/headers';
import Loading from '@/Components/Loading';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';

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

const SECTION_MAP = {
  banner: (props) => <Hero {...props} />,
  aboutUs: (props) => <AboutUs {...props} />,
  advantages: (props) => <Advantages {...props} />,
  Prices: (props) => <Prices {...props} />,
  banner_photo: (props) => <ChooseHealth {...props} />,
  studio: (props) => <Studio {...props} />,
  Equipment: (props) => <Equipment {...props} />,
  map: (props) => <Map {...props} />,
  faq: (props) => <Faq {...props} />,
};

export default async function Home() {
  const session = await getServerSession(authConfig);
  if (session && session?.user.email) {
    console.log(session.user.email);

    // redirect('/lk/profile');
  }

  // useEffect(() => {
  //   const fetchDataAndSetSections = async () => {
  //     if (sesstion?.status === 'authenticated' && sesstion?.data?.user?.full_name) {
  //       if (searchParams.get('redirect') !== 'false') {
  //         router.push('/lk/profile');
  //       }
  //     } else {
  //       if (!isDataFetched) {
  //         const fetchedSections = await fetchData();
  //         setSections(fetchedSections);
  //         if (sections) {
  //           setIsLoad(false);
  //           setIsDataFetched(true);
  //         }
  //       }
  //     }
  //   };

  const { data } = await getData();

  const sections = data.modules.map((section) => section);

  const SECTIONS_RENDER = sections.map(({ name, alias, fields }) => {
    if (alias != 'header' && alias != 'footer') {
      const SectionComponent = SECTION_MAP[alias];
      return <SectionComponent key={alias} alias={alias} fields={fields} />;
    }
  });

  return <>{SECTIONS_RENDER}</>;
}
