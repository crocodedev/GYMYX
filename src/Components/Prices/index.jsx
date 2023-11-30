import SectionTitle from "../SectionTitle"
import Container from "../Container"
import styles from "./Prices.module.scss"
import PriceLabel from "./PriceLabel"
import PricesList from "./PricesList"

const Prices = () => {
  return (
    <section className={styles.prices}>
      <Container>
        <div className={styles.prices__wrapper}>
          <PriceLabel />
          <SectionTitle title={"Тарифы"} />
          <PricesList />
        </div>
      </Container>
    </section>
  )
}

export default Prices
