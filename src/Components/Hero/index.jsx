import Button from "../Button"
import Container from "../Container"
import styles from "./Hero.module.scss"

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      <picture className={styles.hero__img}>
        <source media="(max-width: 768px)" srcSet="/images/hero_mobile.png" />
        <img src="/images/hero.png" alt="hero image" />
      </picture>
      <div className={styles["hero__content-wrapper"]}>
        <Container>
          <div className={styles.hero__content}>
            <h1 className={styles.hero__title}>
              Фитнес-студия с почасовой арендой
            </h1>
            <h2 className={styles.hero__subtitle}>
              Занимайся спортом рядом с домом
            </h2>
            <div className={styles.hero__info}>
              <p className={styles.hero__price}>
                от
                <span className={styles["hero__price-value"]}>
                  590{" "}
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
