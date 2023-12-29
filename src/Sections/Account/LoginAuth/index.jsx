"use client";

import AccountLoginForm from "@/Components/Account/Login/AccountLoginForm";
import styles from "./LoginAuth.module.scss";
import Modal from "@/Components/Modal";
import { useState } from "react";
import Button from "@/Components/Button";

const LoginAuth = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <section className={styles["account-auth"]}>
      <div className={styles["account-auth__wrapper"]}>
        {isShowModal && (
          <Modal handleClose={setIsShowModal} text={"Неверный код"}>
            <Button
              onClick={() => setIsShowModal((prev) => !prev)}
              size="l"
              fullSize={true}
              variant="blue"
              label="Понятно"
              disabledShadow={true}
            />
          </Modal>
        )}
        <AccountLoginForm
          handleToogleModal={() => setIsShowModal((prev) => !prev)}
        />
      </div>
    </section>
  );
};

export default LoginAuth;
