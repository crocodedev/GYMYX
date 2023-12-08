import ProfileBlockTitle from "@/Components/Account/Profile/ProfileBlockTitle"

import styles from "./ProfileContacts.module.scss"

const ProfileContacts = () => {
  return (
    <section className={styles["profile-contacts"]}>
      <div className={styles["profile-contacts__wrapper"]}>
        <ProfileBlockTitle label={"Связаться с нами"} />
        <div className={styles["profile-contacts__elements"]}>
          <div className={styles["profile-contacts__element"]}>
            <p className={styles["profile-contacts__element-label"]}>Телефон</p>
            <p className={styles["profile-contacts__element-text"]}>
              +7 (495) 876 56 43
            </p>
          </div>
          <div className={styles["profile-contacts__element"]}>
            <p className={styles["profile-contacts__element-label"]}>Соцсети</p>
            <div className={styles["profile-contacts__socials"]}>
              <div className={styles["profile-contacts__socials-item"]}>
                <img src="/icons/socials/whatsapp.svg" alt="" />
              </div>
              <div className={styles["profile-contacts__socials-item"]}>
                <img src="/icons/socials/telegram.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileContacts
