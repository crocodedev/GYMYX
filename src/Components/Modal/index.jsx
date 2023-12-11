"use client"

import { useEffect } from "react"
import Button from "../Button"
import styles from "./Modal.module.scss"

const Modal = ({ handleClose, text, buttonLabel }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.height = "0"
    return () => {
      document.body.style.overflow = "unset"
      document.body.style.height = "unset"
    }
  }, [])
  return (
    <div className={styles.modal}>
      <div
        onClick={() => handleClose((prev) => !prev)}
        className={styles.modal__backdrop}
      ></div>
      <div className={styles.modal__wrapper}>
        <p className={styles.modal__text}>{text}</p>
        <Button
          onClick={() => handleClose((prev) => !prev)}
          className={styles.modal__btn}
          size="l"
          variant="blue"
          label={buttonLabel}
        />
      </div>
    </div>
  )
}

export default Modal
