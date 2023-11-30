import styles from "./AdvantagesItem.module.scss"

const AdvantagesItem = ({ props }) => {
  const { image, title, text, alt } = props
  return (
    <div className={styles["advantages-item"]}>
      <div className={styles["advantages-item__img"]}>
        <img src={image} alt={alt} />
      </div>
      <div className={styles["advantages-item__content"]}>
        <p className={styles["advantages-item__title"]}>{title}</p>
        <p className={styles["advantages-item__text"]}>{text}</p>
      </div>
    </div>
  )
}

export default AdvantagesItem
