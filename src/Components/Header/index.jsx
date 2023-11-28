"use client"

import { useState } from "react"

import styles from "./Header.module.scss"
import Link from "next/link"
import Button from "@/Components/Button"
import MobileMenu from "./MobileMenu"

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Link href="/" className={styles.header__logo}>
          <img src="/icons/logo.svg" alt="logo icon" />
        </Link>
        <div className={styles.header__nav}>
          <div className={styles["header__nav-item"]}>Преимущества</div>
          <div className={styles["header__nav-item"]}>Зал</div>
          <div className={styles["header__nav-item"]}>Прайс</div>
          <div className={styles["header__nav-item"]}>Адреса</div>
          <div className={styles["header__nav-item"]}>Вопросы</div>
        </div>
        <div className={styles.header__controls}>
          <Button label={"Записаться"} />
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
