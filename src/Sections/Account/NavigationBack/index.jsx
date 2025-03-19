import styles from "./NavigationBack.module.scss"
import Link from "next/link"
import Container from "@/Components/Container"
import Image from "next/image"

const NavigationBack = ({ containerSize, buttonLabel, link = "" }) => {
  return (
    <Container size={containerSize}>
      <Link href={link} className={styles["navigation-back__btn"]}>
        <span className={styles["navigation-back__btn-icon"]}>
          <Image src="/icons/arrow-2.svg" alt="arrow icon" unoptimized />
        </span>
        <p className={styles["navigation-back__btn-text"]}>{buttonLabel}</p>
      </Link>
    </Container>
  )
}

export default NavigationBack
