import styles from "./ProfileTextFiedBlock.module.scss"

const ProfileTextFiedBlock = () => {
  return (
    <div className={styles["profile-textfied-block"]}>
      <textarea
        placeholder="Расскажите о плохом и хорошем…"
        className={styles["profile-textfied-block__input"]}
      />
      <button className={styles["profile-textfied-block__btn"]}>
        <img
          className={styles["profile-textfied-block__btn-icon"]}
          src="/icons/arrow.svg"
          alt=""
        />
      </button>
    </div>
  )
}

export default ProfileTextFiedBlock
