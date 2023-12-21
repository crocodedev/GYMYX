import Button from "@/Components/Button"
import styles from "./PriceLabel.module.scss"

const PriceLabel = ({ price }) => {
  return (
    <div className={styles["price-label"]}>
      <p className={styles["price-label__text"]}>Первая пробная тренировка</p>
      <div className={styles["price-label__bottom"]}>
        <p className={styles["price-label__value"]}>{price} ₽/час</p>
        <Button size="m" variant="black" label={"Записаться"} />
      </div>
    </div>
  )
}

export default PriceLabel
