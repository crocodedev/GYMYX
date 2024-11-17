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
}) => {
  const [bg, setBg] = useState(bgColor)
  const { visitDate } = useSelector((state) => state.booking);
  
  // console.log(value)

  const handleOnClick = () => {
    handleClick(value)
  }

  // function hasPositiveTimeValue(data) {
  //   return data.some(item => 
  //     item.time.some(timeItem => timeItem.value > 0)
  //   );
  // }

  useEffect(() => {
    // console.log(hasPositiveTimeValue(visitDate))
    // if(!hasPositiveTimeValue(visitDate)) {
    //   setBg('red')
    // } else {
    //   setBg(bgColor)
    // }
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
