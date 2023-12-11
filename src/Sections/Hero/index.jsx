"use client"

import Image from "next/image"

import Button from "@/Components/Button"
import Container from "@/Components/Container"
import styles from "./Hero.module.scss"

const Hero = ({ alias, fields }) => {
  const image = fields.find((item) => item.name === "image")
  const image_mobile = fields.find((item) => item.name === "image_mobile")
  const title = fields.find((item) => item.name === "title")
  const subtitle = fields.find((item) => item.name === "subtitle")
  const price = fields.find((item) => item.name === "price")

  return (
    <section id={alias} className={styles.hero}>
      <picture className={styles.hero__img}>
        <source media="(max-width: 768px)" srcSet={image_mobile?.value?.src} />
        <Image
          src={image?.value?.src}
          width={1920}
          height={1080}
          quality={100}
          alt={title}
        />
      </picture>

      <div className={styles["hero__content-wrapper"]}>
        <Container>
          <div className={styles.hero__content}>
            <h1 className={styles.hero__title}>{title?.value}</h1>
            <h2 className={styles.hero__subtitle}>{subtitle?.value}</h2>
            <div className={styles.hero__info}>
              <p className={styles.hero__price}>
                от
                <span className={styles["hero__price-value"]}>
                  {price?.value}{" "}
                  <span className={styles["hero__price-prefix"]}>₽/час</span>
                </span>
              </p>
              <Button size="l" variant="black" label={"Записаться"} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default Hero
