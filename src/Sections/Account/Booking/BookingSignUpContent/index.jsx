import styles from "./BookingSignUpContent.module.scss"
import Container from "@/Components/Container"

const BookingSignUpContent = ({ children }) => {
  return (
    <section className={styles["booking-signup-content"]}>
      <Container>
        <div className={styles["booking-signup-content__wrapper"]}>
          {children}
        </div>
      </Container>
    </section>
  )
}

export default BookingSignUpContent
