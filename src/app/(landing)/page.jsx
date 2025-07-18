import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/Sections/Header'));
const Hero = dynamic(() => import('@/Sections/landing/Hero'));
const AboutUs = dynamic(() => import('@/Sections/landing/AboutUs'));
const Advantages = dynamic(() => import('@/Sections/landing/Advantages'));
const Prices = dynamic(() => import('@/Sections/landing/Prices'));
const ChooseHealth = dynamic(() => import('@/Sections/landing/ChooseHealth'));
const Equipment = dynamic(() => import('@/Sections/landing/Equipment'));
const Map = dynamic(() => import('@/Sections/landing/Map'));
const Faq = dynamic(() => import('@/Sections/landing/Faq'));
const Studio = dynamic(() => import('@/Sections/landing/Studio'));
const Trainers = dynamic(() => import('@/Sections/landing/Trainers'));
const Footer = dynamic(() => import('@/Sections/landing/Footer'));

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
  advantages: (props) => <Advantages {...props} />,
  aboutUs: (props) => <AboutUs {...props} />,
  Prices: (props) => <Prices {...props} />,
  banner_photo: (props) => <ChooseHealth {...props} />,
  studio: (props) => <Studio {...props} />,
  Equipment: (props) => <Equipment {...props} />,
  map: (props) => <Map {...props} />,
  faq: (props) => <Faq {...props} />,
  trainers_list: (props) => <Trainers {...props} />,
};

export default async function Home() {
  const { data } = await getData();

  const sections = data.modules.map((section) => section);
  const headerData = data.modules.find((item) => item.alias === 'header');
  const footerData = data.modules.find((item) => item.alias === 'footer');

  const SECTIONS_RENDER = sections
    ? sections.map(({ name, alias, fields }) => {
        if (alias != 'header' && alias != 'footer') {
          const SectionComponent = SECTION_MAP[alias];
          return <SectionComponent key={alias} alias={alias} fields={fields} />;
        }
      })
    : null;

  return <>
    <Header isLanding={true} data={headerData} />
    <main className="main">
      {SECTIONS_RENDER}
    </main>
    <Footer data={footerData} />
  </>;
}
