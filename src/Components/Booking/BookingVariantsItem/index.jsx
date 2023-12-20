import styles from "./BookingVariantsItem.module.scss"

const BookingVariantsItem = ({ onClick, title, tagLabel, image, variant }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles["booking-variants-item"]} ${styles[variant]}`}
    >
      <p className={styles["booking-variants-item__title"]}>{title}</p>
      <div
        className={styles["booking-variants-item__tag"]}
        variant="transparent"
      >
        {tagLabel}
      </div>
      <img className={styles["booking-variants-item__img"]} src={image} />
    </div>
  )
}

export default BookingVariantsItem
