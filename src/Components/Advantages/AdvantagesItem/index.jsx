import styles from "./AdvantagesItem.module.scss"

import Image from "next/image"

const AdvantagesItem = ({ props }) => {
  const { image, title, text, alt } = props
  return (
    <div className={styles["advantages-item"]}>
      <div className={styles["advantages-item__img"]}>
        <Image src={image} width={500} height={800} quality={100} alt={title} />
      </div>
      <div className={styles["advantages-item__content"]}>
        <p className={styles["advantages-item__title"]}>{title}</p>
        <p className={styles["advantages-item__text"]}>{text}</p>
      </div>
    </div>
  )
}

export default AdvantagesItem
