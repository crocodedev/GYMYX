"use client"

import Container from "../Container"
import Slider from "../Slider"
import styles from "./Advantages.module.scss"

const slides = [
  {
    id: 1,
    image: "/images/advantagesjpeg.jpeg",
    title: "Близко к дому",
    text: "Студия расположена в вашем жилом комплексе",
    alt: "",
  },
  {
    id: 2,
    image: "/images/advantagesjpeg.jpeg",
    title: "Приватно",
    text: "На время брони студия и тренажеры только ваши",
    alt: "",
  },
  {
    id: 3,
    image: "/images/advantagesjpeg.jpeg",
    title: "Круглосуточно",
    text: "Занимайтесь тогда, когда вам удобно: даже ночью",
    alt: "",
  },
  {
    id: 4,
    image: "/images/advantagesjpeg.jpeg",
    title: "Близко к дому",
    text: "Студия расположена в вашем жилом комплексе",
    alt: "",
  },
  {
    id: 5,
    image: "/images/advantagesjpeg.jpeg",
    title: "Близко к дому",
    text: "Студия расположена в вашем жилом комплексе",
    alt: "",
  },
  {
    id: 6,
    image: "/images/advantagesjpeg.jpeg",
    title: "Близко к дому",
    text: "Студия расположена в вашем жилом комплексе",
    alt: "",
  },
  {
    id: 7,
    image: "/images/advantagesjpeg.jpeg",
    title: "Близко к дому",
    text: "Студия расположена в вашем жилом комплексе",
    alt: "",
  },
]

const Advantages = () => {
  return (
    <section className={styles.advantages}>
      <Container>
        <Slider items={slides} />
      </Container>
    </section>
  )
}

export default Advantages
