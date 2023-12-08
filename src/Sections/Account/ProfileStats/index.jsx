"use client"

import ProfileBlockTitle from "@/Components/Account/Profile/ProfileBlockTitle"
import ProfileStatsItem from "@/Components/Account/Profile/ProfileStatsItem"
import Container from "@/Components/Container"

import styles from "./ProfileStats.module.scss"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

const ITEMS = [
  { id: 1, label: "Янв", count: 12 },
  { id: 2, label: "Февр", count: 345 },
  { id: 3, label: "Март", count: 12 },
  { id: 4, label: "Апр", count: 12 },
  { id: 5, label: "Май", count: 15 },
  { id: 6, label: "Июн", count: 0 },
  { id: 7, label: "Июл", count: 0 },
  { id: 8, label: "Авг", count: 0 },
  { id: 9, label: "Сен", count: 0 },
  { id: 10, label: "Окт", count: 0 },
  { id: 11, label: "Нояб", count: 0 },
  { id: 12, label: "Дек", count: 0 },
]

const sliderSettings = {
  spaceBetween: 5,
  slidesPerView: "auto",

  breakpoints: {
    1200: {
      spaceBetween: 54,
    },
  },
}

const ProfileStats = () => {
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
              {ITEMS.map(({ id, label, count }, index) => (
                <SwiperSlide key={id}>
                  <ProfileStatsItem
                    isCurrent={index === new Date().getMonth()}
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
