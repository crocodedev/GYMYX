"use client"

import styles from "./EquipmentItem.module.scss"

const EquipmentItem = ({ props }) => {
  const { title, image, content } = props

  return (
    <div className={styles["equipment-item"]}>
      <p className={styles["equipment-item__title"]}>{title}</p>
      <div className={styles["equipment-item__image"]}>
        <img src={image} alt="" />
      </div>
      <div id="equipment-item__modal" className={styles["equipment-item__content"]}>{content}</div>
    </div>
  )
}

export default EquipmentItem