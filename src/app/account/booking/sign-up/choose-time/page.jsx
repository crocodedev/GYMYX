"use client"

import BookingSignUpHeading from "@/Sections/Account/Booking/BookingSignUpHeading"
import BookingSignUpTags from "@/Sections/Account/Booking/BookingSignUpTags"
import BookingSignUpContent from "@/Sections/Account/Booking/BookingSignUpContent"
import BookingSteps from "@/Sections/Account/Booking/BookingSteps"
import NavigationBack from "@/Sections/Account/NavigationBack"
import BookingTimePricing from "@/Sections/Account/Booking/BookingTimePricing"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

const variants = [
  { value: "00:00", bgColor: "#7B92FF" },
  { value: "08:00", bgColor: "#294AE7" },
  { value: "13:00", bgColor: "#1E318A" },
  { value: "19:00", bgColor: "#061641" },
]

const chooseTime = () => {
  const { gym } = useSelector((state) => state.booking)
  const [pricesVariants, setPricesVariants] = useState([])

  useEffect(() => {
    if (gym?.prices) {
      setPricesVariants(
        gym.prices.map((item, index) => {
          return { ...item, bgColor: variants[index]?.bgColor }
        })
      )
    }
  }, [gym])

  return (
    <>
      <NavigationBack
        buttonLabel={"Вернуться к выбору дней"}
        link={"/account/booking/sign-up"}
      />
      <BookingSignUpHeading
        showButtonEditGym={false}
        headingTitle={"Купить несколько тренировок"}
      />
      <BookingSignUpTags />
      <BookingSignUpContent>
        <BookingTimePricing variants={pricesVariants} />
        <BookingSteps stepNumber={2} stepTitle={"Выберите время"} />
      </BookingSignUpContent>
    </>
  )
}

export default chooseTime
