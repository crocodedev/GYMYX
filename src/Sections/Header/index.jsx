"use client"

import { Link as ScrollLink } from "react-scroll"
import { useState } from "react"
import styles from "./Header.module.scss"
import Link from "next/link"
import Button from "@/Components/Button"
import MobileMenu from "@/Components/Header/MobileMenu"
import { useSession } from "next-auth/react"
import Image from "next/image"

const Header = ({ isLanding = false, isLogined, data }) => {
  const sesstion = useSession()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fields = data.section.fields
  const logo = fields.find((field) => field.name === "logo")?.value
  const menu = fields.find((field) => field.name === "Menu")?.value

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  console.log("SESSTION", sesstion)

  return (
    <header
      className={`${styles.header} ${isLanding ? styles["is-landing"] : ""}`}
    >
      <div className={styles.header__wrapper}>
        <Link href="/" className={styles.header__logo}>
          <Image alt="" width={500} height={500} src={logo?.src || ""} />
        </Link>
        <div className={styles.header__nav}>
          {menu.slice(0, 5).map((item) => {
            const title =
              item.find((field) => field.name === "title")?.value || ""
            const handle =
              item.find((field) => field.name === "handle_to")?.value || ""

            return (
              <ScrollLink
                key={handle}
                to={handle}
                smooth={true}
                offset={-65}
                duration={500}
                className={styles["header__nav-item"]}
              >
                {title}
              </ScrollLink>
            )
          })}
        </div>
        <div className={styles.header__controls}>
          {isLanding && <Button label={"Записаться"} />}
          {!isLanding && (
            <>
              {!isLogined && (
                <p className={styles["header__controls-account-text"]}>Войти</p>
              )}
              {isLogined && (
                <p className={styles["header__controls-account-text"]}>
                  Наволокин В.
                </p>
              )}
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
      <MobileMenu
        toggleVisibility={handleMobileMenuToggle}
        items={menu}
        isShow={isMobileMenuOpen}
      />
    </header>
  )
}

export default Header
