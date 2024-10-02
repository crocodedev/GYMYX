"use client"

import { useSelector } from "react-redux"
import { useSession } from "next-auth/react"

import CheckoutList from "@/Components/Checkout/CheckoutList"
import CheckoutSummary from "@/Components/Checkout/CheckoutSummary"
import Container from "@/Components/Container"

import styles from "./CheckoutContent.module.scss"

const CheckoutContent = () => {
  const { visitDate, gym } = useSelector((state) => state.booking)
  const { data: sessionData } = useSession();
  const packageBalance = sessionData?.user?.balance || 0

  return (
    <div className={styles["checkout-content"]}>
      <Container>
        <div className={styles["checkout-content__wrapper"]}>
          <CheckoutList items={visitDate} />
          <CheckoutSummary items={visitDate} gym={gym} isActivePackage={packageBalance > 0}/>
        </div>
      </Container>
    </div>
  )
}

export default CheckoutContent
