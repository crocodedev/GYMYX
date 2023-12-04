import Hero from "@/Components/Hero"
import AboutUs from "@/Components/AboutUs"
import Advantages from "@/Components/Advantages"
import Image from "next/image"
import Prices from "@/Components/Prices"
import ChooseHealth from "@/Components/ChooseHealth"
import Equipment from "@/Components/Equipment"
import Map from "@/Components/Map"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Advantages />
      <Prices />
      <ChooseHealth />
      <Equipment />
      <Map />
    </>
  )
}
