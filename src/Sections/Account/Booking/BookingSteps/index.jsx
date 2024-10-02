import styles from "./BookingSteps.module.scss"
import BorderLabel from "@/Components/BorderLabel"

const BookingSteps = ({ stepNumber, stepTitle, balance, packageIsActive = false }) => {
  return (
  <div className={styles['wrapper']}>
    <div className={styles["booking-steps"]}>
        <div className={styles["booking-steps__wrapper"]}>
          <p className={styles["booking-steps__tag"]}>шаг {stepNumber}</p>
          <p className={styles["booking-steps__text"]}>{stepTitle}</p>
        </div>
      </div>
    {packageIsActive && (
      <BorderLabel label={`баланс тренировок: ${(balance > 0) ? balance : 0}`}/>
    )}
  </div>
  )
}

export default BookingSteps
