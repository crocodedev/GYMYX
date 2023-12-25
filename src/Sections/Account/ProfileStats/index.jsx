"use client"

import ProfileBlockTitle from "@/Components/Account/Profile/ProfileBlockTitle"
import ProfileStatsItem from "@/Components/Account/Profile/ProfileStatsItem"
import Container from "@/Components/Container"

import { useState, useEffect } from "react"
import styles from "./ProfileStats.module.scss"
import { sliderSettings, mounths } from "./helpers"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { useSession } from "next-auth/react"

export const getTrainingData = async (token) => {
  const result = await fetch("/api/booking/get-bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
    next: {
      revalidate: 60,
    },
  })

  const response = await result.json()
  if (!response.error) {
    return response
  }
}

const ProfileStats = () => {
  const { data: sessionData } = useSession()
  const [monthsStats, setMonthsStats] = useState([])

  useEffect(() => {
    if (!sessionData) return

    getTrainingData(sessionData?.user?.accessToken).then(({ data = [] }) => {
      const currentMonth = new Date().getMonth() + 1
      const tempMonths = [
        { id: 1, label: "Янв", count: 0 },
        { id: 2, label: "Февр", count: 0 },
        { id: 3, label: "Март", count: 0 },
        { id: 4, label: "Апр", count: 0 },
        { id: 5, label: "Май", count: 0 },
        { id: 6, label: "Июн", count: 0 },
        { id: 7, label: "Июл", count: 0 },
        { id: 8, label: "Авг", count: 0 },
        { id: 9, label: "Сен", count: 0 },
        { id: 10, label: "Окт", count: 0 },
        { id: 11, label: "Нояб", count: 0 },
        { id: 12, label: "Дек", count: 0 },
      ]

      data?.forEach(({ date }) => {
        const monthNumber = new Date(date).getMonth() + 1
        const month = tempMonths.filter(({ id }) => id === monthNumber)
        if (!!month?.length) {
          month[0].count += 1
        }
      })

      const sortedMonths = [
        ...tempMonths.slice(currentMonth - 1),
        ...tempMonths.slice(0, currentMonth - 1),
      ]
      setMonthsStats(sortedMonths)
    })
  }, [sessionData])

  return (
    <section className={styles["profile-stats"]}>
      <Container size="M">
        <div className={styles["profile-stats__wrapper"]}>
          <ProfileBlockTitle label={"Статистика тренировок"} />
          <div className={styles["profile-stats__list"]}>
            <Swiper
              className={`swiper-container ${styles["profile-stats__list-wrapper"]}`}
              {...sliderSettings}
            >
              {monthsStats.map(({ id, label, count }) => (
                <SwiperSlide key={id}>
                  <ProfileStatsItem
                    isCurrent={id === new Date().getMonth() + 1}
                    label={label}
                    count={count}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProfileStats
