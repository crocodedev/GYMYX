import SectionTitle from "../../Components/SectionTitle"
import Container from "../../Components/Container"
import styles from "./Prices.module.scss"
import PriceLabel from "../../Components/Prices/PriceLabel"
import PricesList from "../../Components/Prices/PricesList"

const Prices = () => {
  return (
    <section id="prices" className={styles.prices}>
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
