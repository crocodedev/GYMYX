'use client'

import styles from "./BookingTimePricingLine.module.scss"
import BookingTimePricingLineItem from "./BookingTimePricingLineItem"
import { useSelector } from "react-redux";

const BookingTimePricingLine = ({ variants, priceVariant, isChange = false }) => {
  const { visitDate } = useSelector((state) => state.booking)
  const dateLength = visitDate.reduce((acc, el) => acc + el.time.length, 0)

  return (
    <div className={styles["booking-time-pricing-line"]}>
      {isChange ? (
        variants.map(({ price, bgColor }) => (
          <BookingTimePricingLineItem
            key={price}
            bgColor={bgColor}
            value={price}
          />
        ))
      ) : (
        !dateLength ? (
          priceVariant.first.map(({price, color}) => (
            <BookingTimePricingLineItem
              key={price}
              bgColor={color}
              value={price}
            />
          ))
        ) : (
          priceVariant.default.map(({price, color}) => (
            <BookingTimePricingLineItem
              key={price}
              bgColor={color}
              value={price}
            />
          ))
        )
      )}
      
      
    </div>
  )
}

export default BookingTimePricingLine
