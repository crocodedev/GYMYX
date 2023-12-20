import { formatDate } from "@/Utils/helpers"
import styles from "./CheckoutListCard.module.scss"

const CheckoutListCard = ({
  isSingle,
  onClickDelete,
  date,
  time,
  gymTitle,
  address,
}) => {
  const handleClickRemove = () => {
    onClickDelete(date, time)
  }

  return (
    <div className={styles["checkout-list-card"]}>
      <div className={styles["checkout-list-card__wrapper"]}>
        <div className={styles["checkout-list-card__heading"]}>
          <p className={styles["checkout-list-card__heading-title"]}>
            {formatDate(date)}
          </p>
          <p className={styles["checkout-list-card__heading-text"]}>{time}</p>
          {!isSingle && (
            <div
              onClick={handleClickRemove}
              className={styles["checkout-list-card__heading-btn"]}
            >
              <img src="/icons/cross.svg" alt="" />
            </div>
          )}
        </div>
        <p className={styles["checkout-list-card__title"]}>{gymTitle}</p>
        <p className={styles["checkout-list-card__text"]}>{address}</p>
      </div>
    </div>
  )
}

export default CheckoutListCard
