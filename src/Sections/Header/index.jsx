"use client"

import { Link as ScrollLink} from "react-scroll"
import { useState } from "react"
import styles from "./Header.module.scss"
import Link from "next/link"
import Button from "@/Components/Button"
import MobileMenu from "@/Components/Header/MobileMenu"

const Header = ({isLanding = false, isLogined}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`${styles.header} ${styles["is-landing"]}`}>
      <div className={styles.header__wrapper}>
        <Link href="/" className={styles.header__logo}>
          <img src="/icons/logo.svg" alt="logo icon" />
        </Link>
        <div className={styles.header__nav}>
          <ScrollLink
            to="advantages"
            smooth={true}
            duration={500}
            className={styles["header__nav-item"]}
          >
            Преимущества
          </ScrollLink>
          <ScrollLink
            to="gym"
            smooth={true}
            duration={500}
            className={styles["header__nav-item"]}
          >
            Зал
          </ScrollLink>
          <ScrollLink
            to="prices"
            smooth={true}
            duration={500}
            className={styles["header__nav-item"]}
          >
            Прайс
          </ScrollLink>
          <ScrollLink
            to="map"
            smooth={true}
            duration={500}
            className={styles["header__nav-item"]}
          >
            Адреса
          </ScrollLink>
          <ScrollLink
            to="faq"
            smooth={true}
            duration={500}
            className={styles["header__nav-item"]}
          >
            Вопросы
          </ScrollLink>
        </div>
        <div className={styles.header__controls}>
          {isLanding && <Button label={"Записаться"} />}
          {!isLanding && ( 
            <>
            {!isLogined && <p className={styles["header__controls-account-text"]}>Войти</p>}
            {isLogined &&  <p className={styles["header__controls-account-text"]}>Наволокин В.</p> }
            </>
          )}
          <div className={styles["header__controls-account"]}>
            <img src="/icons/account.svg" alt="account icon" />
          </div>
        </div>
        <div
          onClick={handleMobileMenuToggle}
          className={`${styles["header__burger-btn"]} ${
            isMobileMenuOpen ? styles["active"] : ""
          }`}
        >
          <span></span>
        </div>
      </div>
      <MobileMenu isShow={isMobileMenuOpen} />
    </header>
  )
}

export default Header
