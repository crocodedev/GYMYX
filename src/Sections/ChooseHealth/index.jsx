import Container from "@/Components/Container"
import styles from "./ChooseHealth.module.scss"

const ChooseHealth = () => {
  return (
    <section className={styles["choose-health"]}>
      <Container>
        <picture className={styles["choose-health__image"]}>
          <source
            media="(max-width: 992px)"
            srcSet="/images/chooseHealth-mobile.png"
          />
          <img src="/images/chooseHealth.png" alt="choose health image" />
        </picture>
      </Container>
    </section>
  )
}

export default ChooseHealth
