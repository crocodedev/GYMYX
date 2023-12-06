import Link from "next/link"
import Container from "@/Components/Container"
import styles from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <img className={styles.footer__bg} src="/images/footer_bg.png" alt="" />
        <Container>
          <div className={styles["footer__inner-wrapper"]}>
            <div className={styles.footer__leftside}>
              <div className={styles.footer__logo}>
                <img src="/icons/footer_logo.svg" alt="" />
              </div>
              <div className={styles.footer__socials}>
                <Link href="/" className={styles["footer__socials-item"]}>
                  <img src="/icons/socials/whatsapp.svg" alt="" />
                </Link>
                <Link href="/" className={styles["footer__socials-item"]}>
                  <img src="/icons/socials/telegram.svg" alt="" />
                </Link>
                <Link href="/" className={styles["footer__socials-item"]}>
                  <img src="/icons/socials/vk.svg" alt="" />
                </Link>
              </div>
              <div className={styles.footer__copyright}>
                <p>© GYMYX {new Date().getFullYear()}</p>
              </div>
            </div>
            <div className={styles.footer__info}>
              <p className={styles["footer__info-tel"]}>+7 (495) 876 56 43</p>
              <div className={styles["footer__info-links"]}>
                <p className={styles["footer__info-link"]}>
                  Политика обработки персональных данных
                </p>
                <p className={styles["footer__info-link"]}>
                  Пользовательское соглашение
                </p>
                <p className={styles["footer__info-link"]}>
                  Договор аренды помещения
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
