import styles from "./CheckoutList.module.scss"

import { useSelector, useDispatch } from "react-redux"
import { updateBookingData } from "@/redux/bookingSlice"

import { sortVisitDates, canDelete } from "./helpers"
import BookingCard from "@/Components/Booking/BookingCard"
import { useSession } from "next-auth/react"

const CheckoutList = ({ items }) => {
  const dispatch = useDispatch()
  const { gym, visitDate } = useSelector((state) => state.booking)
  const { data: sessionData } = useSession()
  const handleDeleteItem = (valueDate, valueTime) => {
    if (canDelete(items)) {
      const data = sortVisitDates(visitDate, valueDate, valueTime)
      dispatch(updateBookingData({ visitDate: data, currentDate: 0 }))
    }
  }

  return (
    <div className={styles["checkout-list"]}>
      <div className={styles["checkout-list__wrapper"]}>
        {items.map(({ time, value }, index) => {
          return time.map((timeZome) => {
            return (
              <BookingCard
                isSingle={timeZome.length === 1 && items.length === 1}
                key={index}
                onClickDelete={handleDeleteItem}
                date={value}
                time={timeZome}
                gymTitle={gym?.name}
                address={gym?.address}
              />
            )
          })
        })}
      </div>
    </div>
  )
}

export default CheckoutList
