"use client"

import BookingTimePricingLine from "@/Components/Booking/BookingTimePricingLine"
import BookingTimeVariants from "@/Components/Booking/BookingTimeVariants"
import Button from "@/Components/Button"
import Container from "@/Components/Container"
import styles from "./BookingTimePricing.module.scss"
import { useEffect, useState } from "react"
import { updateBookingData, updateBookingVisitDate } from "@/redux/bookingSlice"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { checkData, prepareVisitDateWithTime } from "./helpers"

const BookingTimePricing = ({ variants = [] }) => {
  const dispatch = useDispatch()
  const { visitDate, currentDate, loading } = useSelector(
    (state) => state.booking
  )
  const [data, setData] = useState([])
  const router = useRouter()
  const [canSubmit, setCanSubmit] = useState(false)

  const handleChangeData = (value) => {
    if (!data.includes(value)) {
      setData([...data, value])
    } else {
      const tempData = data.filter((item) => item !== value)
      setData(tempData)
    }
  }

  const handleSubmit = () => {
    router.push("/account/checkout")
  }

  useEffect(() => {
    const result = prepareVisitDateWithTime(visitDate[currentDate], data)
    const updatedVisitDate = [...visitDate]
    updatedVisitDate[currentDate] = result
    dispatch(updateBookingVisitDate(updatedVisitDate))
    setCanSubmit(checkData(updatedVisitDate))
  }, [data])

  useEffect(() => {
    let tempData = []
    if (!!visitDate[currentDate]?.time) {
      tempData = visitDate[currentDate].time
    }
    setData(tempData)
  }, [currentDate])

  return (
    <section className={styles["booking-time-pricing"]}>
      <div className={styles["booking-time-pricing__wrapper"]}>
        <BookingTimePricingLine variants={variants} />
        <BookingTimeVariants
          loading={loading}
          data={data}
          onChangeData={handleChangeData}
          variants={variants}
        />
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          size="l"
          variant="blue"
          fullSize={true}
          label={"Забронировать"}
        />
      </div>
    </section>
  )
}

export default BookingTimePricing
