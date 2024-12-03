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
  priceVariant
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
    const element = variants.find(el => price === el.price)
    if(element) return element.color
    else return 'blue'
  }

  useEffect(() => {
    if(!isChange) {
      const firstPrice = value?.price?.first
      const defaultPrice = value?.price?.default
      if(!selectOnceTime() && firstPrice) {
        setBg(getBgColorByPrice(firstPrice, priceVariant.first))
      } else if(selectOnceTime() && defaultPrice) {
        setBg(getBgColorByPrice(defaultPrice, priceVariant.default))
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
