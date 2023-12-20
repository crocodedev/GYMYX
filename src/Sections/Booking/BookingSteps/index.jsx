import styles from "./BookingSteps.module.scss"

const BookingSteps = ({ stepNumber, stepTitle }) => {
  return (
    <div className={styles["booking-steps"]}>
      <div className={styles["booking-steps__wrapper"]}>
        <p className={styles["booking-steps__tag"]}>шаг {stepNumber}</p>
        <p className={styles["booking-steps__text"]}>{stepTitle}</p>
      </div>
    </div>
  )
}

export default BookingSteps
