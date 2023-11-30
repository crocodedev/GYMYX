import BorderLabel from "../BorderLabel"
import Container from "../Container"
import styles from "./AboutUs.module.scss"
import AboutUsItem from "./AboutUsItem"

const LIST = [
  { text: "Забронируйте удобный слот" },
  { text: "Получите личный код для входа в студию" },
  { text: "Занимайтесь одни или вместе с друзьями" },
]

const AboutUs = () => {
  return (
    <section className={styles["about-us"]}>
      <Container>
        <div className={styles["about-us__wrapper"]}>
          <BorderLabel label={"Кто мы ?"} />
          <h2 className={styles["about-us__title"]}>
            GYMYX — это современная спортивная студия для индивидуальных
            тренировок
          </h2>
          <div className={styles["about-us__content"]}>
            <BorderLabel label={"как это работает?"} />
            <div className={styles["about-us__list"]}>
              {LIST.map(({ text }, index) => (
                <AboutUsItem key={text} title={index + 1} text={text} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AboutUs
