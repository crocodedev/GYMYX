import BookingVariantsItem from "@/Components/Booking/BookingVariantsItem"
import Container from "@/Components/Container"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { updateBookingData } from "@/redux/bookingSlice"
import styles from "./BookingVariants.module.scss"

const BookingVariants = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleChooseVariant = (url, variant) => {
    dispatch(updateBookingData({ variant: variant }))
    router.push(url)
  }

  return (
    <section className={styles["booking-variants"]}>
      <Container>
        <div
          className={`${styles["booking-variants__wrapper"]}  ${styles["one-child"]}`}
        >
          <BookingVariantsItem
            onClick={() =>
              handleChooseVariant("/account/booking/sign-up", "multiple")
            }
            image={"/icons/gym.svg"}
            tagLabel={"разовое посещение"}
            title={"Записаться на тренировку"}
            variant="white"
          />
        </div>
      </Container>
    </section>
  )
}

export default BookingVariants
