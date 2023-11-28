import Button from "@/Components/Button"
import styles from "./MobileMenu.module.scss"

const MobileMenu = ({ isShow }) => {
  return (
    <div
      className={`${styles["mobile-menu"]} ${isShow ? styles["active"] : ""}`}
    >
      <div className={styles["mobile-menu__wrapper"]}>
        <div className={styles["mobile-menu__nav"]}>
          <div className={styles["mobile-menu__nav-item"]}>
            Как это работает?
          </div>
          <div className={styles["mobile-menu__nav-item"]}>Наши плюсы</div>
          <div className={styles["mobile-menu__nav-item"]}>Студия</div>
          <div className={styles["mobile-menu__nav-item"]}>Тарифы</div>
          <div className={styles["mobile-menu__nav-item"]}>Адреса</div>
          <div className={styles["mobile-menu__nav-item"]}>
            Ответы на вопросы
          </div>
        </div>
        <div>
          <Button variant="blue" label={"Зарегистрироваться"} />
          <div className={styles["mobile-menu__login"]}>
            <span>У вас есть аккаунт?</span> <u>Войти</u>
            <span className={styles["mobile-menu__login-icon"]}>
              <img src="/icons/login.svg" alt="login icon" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
