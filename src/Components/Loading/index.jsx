import styles from "./Loading.module.scss"

const Loading = ({ full_screen }) => {
  return (
    <div
      className={`${styles.loading} ${
        full_screen ? styles["full-screen"] : ""
      }`}
    >
      <div className={styles["loading__img-wrapper"]}>
        <img className={styles.loading__img} src="/loading.gif" alt="" />
      </div>
      <p className={styles["loading__text"]}>Идёт загрузка</p>
    </div>
  )
}

export default Loading
