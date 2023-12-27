"use client";

import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import Button from "@/Components/Button";
import MobileMenu from "@/Components/Header/MobileMenu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { getFioShort } from "@/Utils/helpers";

const Header = ({ isLanding = false, data }) => {
  const sesstion = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const fields = data?.section?.fields;
  const logo = fields.find((field) => field.name === "logo")?.value;
  const menu = fields.find((field) => field.name === "Menu")?.value;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (
      sesstion?.status === "authenticated" &&
      sesstion?.data?.user?.full_name
    ) {
      setUserData({
        isLogined: true,
        fio: getFioShort(sesstion?.data?.user?.full_name),
        image: sesstion?.data?.user?.image,
      });
    }
  }, [sesstion]);

  if (!fields) return null;

  return (
    <header
      className={`${styles.header} ${isLanding ? styles["is-landing"] : ""}`}
    >
      <div className={styles.header__wrapper}>
        <Link href="/" className={styles.header__logo}>
          <Image alt="" width={200} height={50} src={logo?.src || ""} />
        </Link>
        <div className={styles.header__nav}>
          {menu.slice(0, 5).map((item) => {
            const title =
              item.find((field) => field.name === "title")?.value || "";

            const handle =
              item.find((field) => field.name === "handle_to")?.value || "";

            const link =
              item.find((field) => field.name === "link_to")?.value || "";

            if (handle !== "#") {
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
              );
            }
            return (
              <Link
                key={link}
                href={link}
                passHref
                className={`${styles["header__nav-item"]} ${
                  pathname.includes(link) ? styles["active"] : ""
                }`}
              >
                {title}
              </Link>
            );
          })}
        </div>
        <div className={styles.header__controls}>
          {isLanding && (
            <Link href={"/account/login"}>
              <Button label={"Записаться"} />
            </Link>
          )}
          {!isLanding && (
            <>
              {!userData?.isLogined && (
                <Link
                  href="/account/login"
                  className={styles["header__controls-account-text"]}
                >
                  Войти
                </Link>
              )}
              {userData?.isLogined && (
                <p className={styles["header__controls-account-text"]}>
                  {userData?.fio}
                </p>
              )}
            </>
          )}
          {isLanding && (
            <Link
              href={userData ? "/account/profile" : "/account/login"}
              className={styles["header__controls-account"]}
            >
              <img src="/icons/account.svg" alt="account icon" />
            </Link>
          )}
          {!isLanding && (
            <Link
              href={"/account/profile"}
              className={styles["header__controls-account"]}
            >
              <img
                src={userData?.image || "/icons/avatar.svg"}
                alt="account icon"
              />
            </Link>
          )}
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
  );
};

export default Header;
