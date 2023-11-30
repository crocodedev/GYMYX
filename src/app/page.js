import Hero from "@/Components/Hero"
import AboutUs from "@/Components/AboutUs"
import Advantages from "@/Components/Advantages"
import Image from "next/image"
import Prices from "@/Components/Prices"
import ChooseHealth from "@/Components/ChooseHealth"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Advantages />
      <Prices />
      <ChooseHealth />
    </>
  )
}
