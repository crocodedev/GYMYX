"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import styles from "./MobileBar.module.scss"

const MENU = [
  {
    title: "Тренировки",
    link: "/account/training",
    icon: "/icons/mobile-bar/trainings.svg",
  },
  {
    title: "Бронь",
    link: "/account/booking",
    sublink: "/account/checkout",
    icon: "/icons/mobile-bar/booking.svg",
  },
  {
    title: "Профиль",
    link: "/account/profile",
    icon: "/icons/mobile-bar/profile.svg",
  },
  { title: "Гид", link: "/account/gid", icon: "/icons/mobile-bar/gid.svg" },
  {
    title: "Тренеры",
    link: "/account/trainers",
    icon: "/icons/mobile-bar/trainers.svg",
  },
]

const MobileBar = () => {
  const { data } = useSession()
  const pathname = usePathname()

  if (!data?.user?.full_name) return

  return (
    <div className={styles["mobile-bar"]}>
      <div className={styles["mobile-bar__wrapper"]}>
        {MENU.map(({ title, link, sublink, icon }) => (
          <Link
            key={title}
            href={link}
            className={`${styles["mobile-bar__btn"]} ${
              pathname.includes(link) || pathname.includes(sublink)
                ? styles["active"]
                : ""
            }`}
          >
            <div className={styles["mobile-bar__btn-icon"]}>
              <img src={icon} alt="mobile bar image" />
            </div>
            <p className={styles["mobile-bar__btn-title"]}>{title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileBar
