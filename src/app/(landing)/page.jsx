import Hero from "@/Sections/landing/Hero"
import AboutUs from "@/Sections/landing/AboutUs"
import Advantages from "@/Sections/landing/Advantages"
import Prices from "@/Sections/landing/Prices"
import ChooseHealth from "@/Sections/landing/ChooseHealth"
import Equipment from "@/Sections/landing/Equipment"
import Map from "@/Sections/landing/Map"
import Faq from "@/Sections/landing/Faq"

async function getData() {
  const res = await fetch("https://gymyx.cro.codes/api/pages/index", {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const SECTION_MAP = {
  banner: (props) => <Hero {...props} />,
  aboutUs: (props) => <AboutUs {...props} />,
  advantages: (props) => <Advantages {...props} />,
  Prices: (props) => <Prices {...props} />,
  banner_photo: (props) => <ChooseHealth {...props} />,
  Equipment: (props) => <Equipment {...props} />,
  map: (props) => <Map {...props} />,
  faq: (props) => <Faq {...props} />,
}

export default async function Home() {
  const { data } = await getData()
  const sections = data.modules.map(({ section }) => section)

  const SECTIONS_RENDER = sections.map(({ name, alias, fields }) => {
    if (alias != "header" && alias != "footer") {
      const SectionComponent = SECTION_MAP[alias]
      return <SectionComponent key={alias} alias={alias} fields={fields} />
    }
  })

  return <>{SECTIONS_RENDER}</>
}
