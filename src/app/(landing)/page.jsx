'use client';

import Hero from '@/Sections/landing/Hero';
import AboutUs from '@/Sections/landing/AboutUs';
import Advantages from '@/Sections/landing/Advantages';
import Prices from '@/Sections/landing/Prices';
import ChooseHealth from '@/Sections/landing/ChooseHealth';

import Equipment from '@/Sections/landing/Equipment';
import Map from '@/Sections/landing/Map';
import Faq from '@/Sections/landing/Faq';
import Studio from '@/Sections/landing/Studio';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Loading from '@/Components/Loading';
import { useRouter, useSearchParams } from 'next/navigation';

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

const fetchData = async () => {
  const data = await getData();
  if (data) {
    return data.data.modules;
  }
};

export default function Home() {
  const sesstion = useSession();
  const router = useRouter();
  const [isLoad, setIsLoad] = useState(true);
  const [sections, setSections] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const searchParams = useSearchParams();

  console.log(sesstion);

  useEffect(() => {
    const fetchDataAndSetSections = async () => {
      if (sesstion?.status === 'authenticated' && sesstion?.data?.user?.full_name) {
        if (searchParams.get('redirect') !== 'false') {
          router.push('/lk/profile');
        }
      } else {
        if (!isDataFetched) {
          const fetchedSections = await fetchData();
          setSections(fetchedSections);
          if (sections) {
            setTimeout(() => {
              setIsLoad(false);
            }, 1000);
            setIsDataFetched(true);
          }
        }
      }
    };

    fetchDataAndSetSections();
  }, [sesstion, router]);

  if (isLoad) {
    return <Loading full_screen={true} background={true} />;
  }

  return !isLoad
    ? sections.map(({ alias, fields }) => {
        if (alias !== 'header' && alias !== 'footer') {
          const SectionComponent = SECTION_MAP[alias];
          return <SectionComponent key={alias} alias={alias} fields={fields} />;
        }
      })
    : null;
}
