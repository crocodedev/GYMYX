"use client"

import ProfileBlockTitle from "@/Components/Account/Profile/ProfileBlockTitle"
import Checkbox from "@/Components/Checkbox"
import { useEffect, useState } from "react"

import styles from "./ProfileMailing.module.scss"

const ITEMS = [
  { id: 1, label: "E-mail" },
  { id: 2, label: "Sms" },
  { id: 3, label: "Не получать рассылку" },
]

const ProfileMailing = () => {
  const [activeVariant, setActiveVariant] = useState(1)
  const toggleVariant = (id) => {
    setActiveVariant(id)
  }

  return (
    <section className={styles["profile-mailing"]}>
      <div className={styles["profile-mailing__wrapper"]}>
        <ProfileBlockTitle label={"Рассылка"} />
        <div className={styles["profile-mailing__list"]}>
          {ITEMS.map(({ id, label }) => (
            <Checkbox
              key={id}
              isActive={id === activeVariant}
              toggleActive={() => toggleVariant(id)}
              label={label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfileMailing
