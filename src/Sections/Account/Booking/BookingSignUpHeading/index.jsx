import Container from "@/Components/Container"
import Button from "@/Components/Button"
import styles from "./BookingSignUpHeading.module.scss"

const BookingSignUpHeading = ({
  showButtonEditGym = true,
  handleChangeGym,
  gymTitle,
  headingTitle,
}) => {
  return (
    <section className={styles["booking-sign-up-heading"]}>
      <Container>
        <div className={styles["booking-sign-up-heading__wrapper"]}>
          <p className={styles["booking-sign-up-heading__title"]}>
            {headingTitle}
          </p>
          {showButtonEditGym && (
            <div className={styles["booking-sign-up-heading__info"]}>
              <p className={styles["booking-sign-up-heading__info-title"]}>
                {gymTitle}
              </p>
              <Button
                onClick={handleChangeGym}
                variant="blue"
                label={"Изменить зал"}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default BookingSignUpHeading
