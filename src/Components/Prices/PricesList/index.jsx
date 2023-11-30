import styles from "./PricesList.module.scss"

const PricesList = () => {
  return (
    <div className={styles["prices-list"]}>
      <div className={styles["prices-list__col"]}>
        <div className={styles["prices-list__price-value"]}>
          <p className={styles["prices-list__price-value-amount"]}>790</p>
          <p className={styles["prices-list__price-value-prefix"]}>₽/час</p>
        </div>
        <div className={styles["prices-list__price-value"]}>
          <p className={styles["prices-list__price-value-amount"]}>990</p>
          <p className={styles["prices-list__price-value-prefix"]}>₽/час</p>
        </div>
      </div>
      <div className={styles["prices-list__time-line"]}>
        <div className={styles["prices-list__time-line-item"]}>
          <div className={styles["prices-list__time-line-item-dot"]}>
            <p className={styles["prices-list__time-line-item-value"]}>00:00</p>
          </div>
        </div>
        <div className={styles["prices-list__time-line-item"]}>
          <div className={styles["prices-list__time-line-item-dot"]}>
            <p className={styles["prices-list__time-line-item-value"]}>07:00</p>
          </div>
        </div>
        <div className={styles["prices-list__time-line-item"]}>
          <div className={styles["prices-list__time-line-item-dot"]}>
            <p className={styles["prices-list__time-line-item-value"]}>12:00</p>{" "}
          </div>
        </div>
        <div className={styles["prices-list__time-line-item"]}>
          <div className={styles["prices-list__time-line-item-dot"]}>
            <p className={styles["prices-list__time-line-item-value"]}>18:00</p>{" "}
          </div>
        </div>
        <div className={styles["prices-list__time-line-item"]}>
          <div className={styles["prices-list__time-line-item-dot"]}>
            <p className={styles["prices-list__time-line-item-value"]}>24:00</p>{" "}
          </div>
        </div>
      </div>
      <div
        className={`${styles["prices-list__col"]} ${styles["prices-list__col-right"]}`}
      >
        <div className={styles["prices-list__price-value"]}>
          <p className={styles["prices-list__price-value-amount"]}>1190</p>
          <p className={styles["prices-list__price-value-prefix"]}>₽/час</p>
        </div>
        <div className={styles["prices-list__price-value"]}>
          <p className={styles["prices-list__price-value-amount"]}>1390</p>
          <p className={styles["prices-list__price-value-prefix"]}>₽/час</p>
        </div>
      </div>
    </div>
  )
}

export default PricesList
