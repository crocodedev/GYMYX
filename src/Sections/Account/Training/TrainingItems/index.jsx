import styles from "./TrainingItems.module.scss"
import { useState, useEffect } from "react"
import BookingCard from "@/Components/Booking/BookingCard"

const TrainingItems = ({ items = [], archive, selectedDate }) => {
  const [renderingItems, setRenderingItems] = useState([])

  useEffect(() => {
    if (selectedDate) {
      const filteredItems = items
        .filter((training) => training.date === selectedDate.date)
        .map((training) => training)
      setRenderingItems(filteredItems)
    } else {
      setRenderingItems([])
    }
  }, [items, selectedDate])

  return (
    <div className={styles["training-items"]}>
      <div className={styles["training-items__list"]}>
        {renderingItems.map(({ id, date, time, gym }) => {
          return (
            <BookingCard
              isSingle={archive}
              older={archive}
              key={id}
              date={date}
              time={time}
              gymTitle={gym?.name}
              address={gym?.address}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TrainingItems
