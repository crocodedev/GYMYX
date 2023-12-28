import styles from "./TrainingItems.module.scss";

import { useState, useEffect } from "react";
import BookingCard from "@/Components/Booking/BookingCard";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingData, bookingSlice } from "@/redux/bookingSlice";

const TrainingItems = ({
  items = [],
  archive,
  selectedDate,
  handleDeleteItem,
  handleUpdateDate,
  deleteItem,
  handleShow,
  token,
}) => {
  const dispatch = useDispatch();

  const [renderingItems, setRenderingItems] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const filteredItems = items
        .filter((training) => training.date === selectedDate.date)
        .sort(
          (a, b) =>
            new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
        )
        .map((training) => training);
      setRenderingItems(filteredItems);
    } else {
      setRenderingItems([]);
    }
  }, [items, selectedDate]);

  return (
    <div className={styles["training-items"]}>
      <div className={styles["training-items__list"]}>
        {renderingItems.map(({ id, date, time, gym }) => {
          return (
            <BookingCard
              id={id}
              isSingle={archive}
              older={archive}
              onClickDelete={() => handleDeleteItem(id)}
              key={id}
              date={date}
              time={time}
              gymTitle={gym?.name}
              address={gym?.address}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrainingItems;
