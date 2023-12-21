"use client"

import Container from "@/Components/Container"
import styles from "./ProfileTrainings.module.scss"
import { useSession } from "next-auth/react"

import { getTrainingData } from "./helpers"

const ProfileTrainings = () => {
  const { data } = useSession()

  getTrainingData(data?.user?.accessToken).then((data) => {
  })

  return (
    <section className={styles["profile-trainings"]}>
      <Container size="M">
        <div className={styles["profile-trainings__wrapper"]}>
          <div className={styles["profile-trainings__object"]}>
            <img src="/icons/icon.svg" />
          </div>
          <div className={styles["profile-trainings__btn"]}>
            <img src="/icons/cross.svg" alt="" />
          </div>
          <div className={styles["profile-trainings__content"]}>
            <div className={styles["profile-trainings__date"]}>
              <p className={styles["profile-trainings__date-value"]}>
                23 декабря
              </p>
              <div className={styles["profile-trainings__date-time"]}>
                00:30
              </div>
            </div>
            <div className={styles["profile-trainings__col"]}>
              <p className={styles["profile-trainings__title"]}>
                Раменки, ЖК Небо
              </p>
              <p className={styles["profile-trainings__text"]}>
                г. Москва, Мичуринский пр., 5
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProfileTrainings
