import Image from "next/image"
import styles from "./ProfileLogout.module.scss"

const ProfileLogout = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={styles["profile-logout"]}>
      <p className={styles["profile-logout__text"]}>Выйти</p>
      <div className={styles["profile-logout__icon"]}>
        <Image
          className={styles["profile-logout__img"]}
          src="/icons/logout.svg"
          alt="logout icon"
          unoptimized
        />
      </div>
    </button>
  )
}

export default ProfileLogout
