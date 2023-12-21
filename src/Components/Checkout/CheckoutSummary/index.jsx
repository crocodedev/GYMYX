"use client"

import Button from "@/Components/Button"
import styles from "./CheckoutSummary.module.scss"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { useMemo, useState } from "react"
import {
  findPrice,
  createBooking,
  countValues,
  prepareDataForBooking,
} from "./helpers"

const CheckoutSummary = ({ items, gym }) => {
  const router = useRouter()
  const { data: sessionData } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [list, setList] = useState([])
  const totalPrice = useMemo(() => {
    let total = 0

    items.forEach((entry) => {
      entry.time.map((time) => {
        total += findPrice(time, gym?.prices)
      })
    })

    setList(countValues(items, gym?.prices))
    return total
  }, [items, gym])

  const handleSubmit = () => {
    setLoading(true)
    createBooking(
      sessionData.user.accessToken,
      gym?.id,
      prepareDataForBooking(list)
    ).then(({ data }) => {
      if (data?.payment_link) {
        router.push(data?.payment_link)
      } else {
        setError(true)
      }
      setLoading(false)
    })
  }

  return (
    <div className={styles["checkout-summary"]}>
      <div className={styles["checkout-summary__wrapper"]}>
        <div className={styles["checkout-summary__list"]}>
          {list?.map(({ value, count, price }) => (
            <div
              key={`${count}_${value}_${price}}`}
              className={styles["checkout-summary__item"]}
            >
              <p>
                Тренировка {price} ₽/ч ({count})
              </p>
              <p>{price} ₽</p>
            </div>
          ))}
        </div>
        <div className={styles["checkout-summary__summary"]}>
          <p>Итого</p>
          <p>{totalPrice} ₽</p>
        </div>
        <Button
          onClick={handleSubmit}
          variant="blue"
          fullSize={true}
          label={!loading ? "Оплатить" : "Ожидание"}
          icon={!loading ? "arrow" : null}
          disabled={loading}
        />
        {error && (
          <p className={styles["checkout-summary__summary-error"]}>
            Произошла ошибка
          </p>
        )}
      </div>
    </div>
  )
}

export default CheckoutSummary
