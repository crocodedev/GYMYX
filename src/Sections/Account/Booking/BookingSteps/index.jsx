import styles from "./BookingSteps.module.scss"
import BorderLabel from "@/Components/BorderLabel"

const BookingSteps = ({ stepNumber, stepTitle, balance }) => {
  return (
  <div className={styles['wrapper']}>
    <div className={styles["booking-steps"]}>
        <div className={styles["booking-steps__wrapper"]}>
          <p className={styles["booking-steps__tag"]}>шаг {stepNumber}</p>
          <p className={styles["booking-steps__text"]}>{stepTitle}</p>
        </div>
      </div>
    {balance > 0 && (
      <BorderLabel label={`баланс тренировок: ${balance}`}/>
    )}
  </div>
  )
}

export default BookingSteps
