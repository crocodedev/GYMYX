'use slient'

import styles from "./BookingTimeVariantsItem.module.scss"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const BookingTimeVariantsItem = ({
  handleClick,
  disabled,
  isActive,
  bgColor,
  value,
  variants,
  isChange,
}) => {
  const [bg, setBg] = useState(bgColor)
  const { visitDate } = useSelector((state) => state.booking);

  const handleOnClick = () => {
    handleClick(value)
  }

  const selectOnceTime = () => {
    return (visitDate.reduce((acc, el) => acc + el.time.length, 0)) > 0
  }

  function getBgColorByPrice(price, variants) {
    const ranges = [...variants].sort((a, b) => a.price - b.price)
    for (let i = 0; i < ranges.length; i++) {
      const currentRange = ranges[i];
      const nextRange = ranges[i + 1];
  
      if (
        price >= currentRange.price &&
        (!nextRange || price < nextRange.price)
      ) {
        return currentRange.bgColor;
      }
    }
  
    return '#7b92ff'; // или любой другой цвет
  }

  useEffect(() => {
    if(!isChange) {
      const firstPrice = value?.price?.first
      const defaultPrice = value?.price?.default
      if(!selectOnceTime() && firstPrice) {
        setBg(getBgColorByPrice(firstPrice, variants))
      } else if(selectOnceTime() && defaultPrice) {
        setBg(getBgColorByPrice(defaultPrice, variants))
      } 
    }
  }, [visitDate])

  return (
    <div
      disabled
      onClick={handleOnClick}
      style={{ background: bg }}
      className={`${styles["booking-time-variants-item"]} ${
        isActive ? styles["active"] : ""
      } ${disabled ? styles["disabled"] : ""}`}
    >
      {value?.time ?? value}
    </div>
  )
}

export default BookingTimeVariantsItem
