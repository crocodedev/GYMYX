import styles from "./ProfileInfo.module.scss"

const ProfileInfo = () => {
  return (
    <div className={styles["profile-info"]}>
      <div className={styles["profile-info__avatar"]}>
        <img
          className={styles["profile-info__img"]}
          src="/images/hero_mobile.png"
          alt=""
        />
      </div>
      <div className={styles["profile-info__content"]}>
        <p className={styles["profile-info__title"]}>
          <span>Василий</span>
          <span>Наволокин</span>
        </p>
        <div className={styles["profile-info__code"]}>
          <p className={styles["profile-info__code-text"]}>код доступа</p>
          <p className={styles["profile-info__code-value"]}>1234</p>
        </div>
      </div>
    </div>
  )
}
export default ProfileInfo
