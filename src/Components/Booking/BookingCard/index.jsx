import { formatDate, formatTime } from "@/Utils/helpers";
import styles from "./BookingCard.module.scss";

const BookingCard = ({
  id,
  isSingle,
  onClickDelete,
  date = "",
  time = "",
  gymTitle = "",
  address = "",
  older = false,
}) => {
  const handleClickRemove = () => {
    onClickDelete(id);
  };

  return (
    <div
      className={`${styles["booking-card"]} ${older ? styles["older"] : ""}`}
    >
      <div className={styles["booking-card__wrapper"]}>
        <div className={styles["booking-card__heading"]}>
          <p className={styles["booking-card__heading-title"]}>
            {date ? formatDate(date) : ""}
          </p>
          <p className={styles["booking-card__heading-text"]}>
            {time ? formatTime(time) : ""}
          </p>
          {!isSingle && (
            <div
              onClick={handleClickRemove}
              className={styles["booking-card__heading-btn"]}
            >
              <img src="/icons/cross.svg" alt="" />
            </div>
          )}
        </div>
        <p className={styles["booking-card__title"]}>{gymTitle}</p>
        <p className={styles["booking-card__text"]}>{address}</p>
      </div>
    </div>
  );
};

export default BookingCard;
