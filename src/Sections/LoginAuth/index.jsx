"use client"

import AccountLoginForm from "@/Components/Account/Login/AccountLoginForm"
import styles from "./LoginAuth.module.scss"
import Modal from "@/Components/Modal"
import { useState } from "react"

const LoginAuth = () => {
  const [isShowModal, setIsShowModal] = useState(false)

  return (
    <section className={styles["account-auth"]}>
      <div className={styles["account-auth__wrapper"]}>
        {isShowModal && (
          <Modal
            handleClose={setIsShowModal}
            text={"Неверный код"}
            buttonLabel={"Понятно"}
          />
        )}
        <AccountLoginForm
          handleToogleModal={() => setIsShowModal((prev) => !prev)}
        />
      </div>
    </section>
  )
}

export default LoginAuth
