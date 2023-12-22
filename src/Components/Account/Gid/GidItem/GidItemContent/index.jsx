import styles from "./GidItemContent.module.scss"

const GidItemContent = ({ duration, link, title, lock, isViewed }) => {
  return (
    <div className={styles["gid-item-content"]}>
      <div className={styles["gid-item-content__bg"]}>
        <img src="/images/advantagesjpeg.jpeg" alt="grid item image" />
      </div>
      <p className={styles["gid-item-content__time"]}>{duration}</p>
      <button className={styles["gid-item-content__btn"]}>
        <img src="/icons/play.svg" alt="play icon button" />
      </button>
      <button
        className={`${styles["gid-item-content__btn-lock"]} ${
          lock ? styles["active"] : ""
        }`}
      >
        <img src="/icons/key.svg" alt="lock  icon button" />
        <span>{lock ? "Закреплено" : "Закрепить"}</span>
      </button>
      <div className={styles["gid-item-content__about"]}>
        <p className={styles["gid-item-content__title"]}>{title}</p>
        {isViewed && (
          <p className={styles["gid-item-content__status"]}>
            <span className={styles["gid-item-content__status-icon"]}>
              {isViewed && <img src="/icons/confirm.svg" alt="confirm icon" />}
            </span>
            <span className={styles["gid-item-content__status-text"]}>
              просмотрено
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default GidItemContent
