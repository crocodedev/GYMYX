import styles from "./PriceLabel.module.scss"

const PriceLabel = () => {
  return (
    <div className={styles["price-label"]}>
      <p className={styles["price-label__text"]}>Первая пробная тренировка</p>
      <div className={styles["price-label__bottom"]}>
        <p className={styles["price-label__value"]}>590 ₽/час</p>
        <button className={styles["price-label__btn"]}>Записаться</button>
      </div>
    </div>
  )
}

export default PriceLabel
