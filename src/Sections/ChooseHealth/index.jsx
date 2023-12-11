"use client"

import Container from "@/Components/Container"
import styles from "./ChooseHealth.module.scss"

const ChooseHealth = ({ alias, fields }) => {
  const image = fields.find((item) => item.name === "image")?.value || ""
  const image_mobile =
    fields.find((item) => item.name === "image_mobile")?.value || ""

  return (
    <section id={alias} className={styles["choose-health"]}>
      <Container>
        {/* <picture className={styles["choose-health__image"]}>
          <source
            media="(max-width: 992px)"
            srcSet="/images/chooseHealth-mobile.png"
          />
          <img src="/images/chooseHealth.png" alt="choose health image" />
        </picture> */}
              {/* <Image
        className={styles["choose-health__image"]}
        src={image.value}
        alt="Description of hero image"
        width={1920}
        height={1080}
        srcSet={`${image_mobile.value} 992px`}
      /> */}
      </Container>
    </section>
  )
}

export default ChooseHealth
