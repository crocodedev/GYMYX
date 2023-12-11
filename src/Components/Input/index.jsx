import styles from "./Input.module.scss"
import InputMask from "react-input-mask"
import { memo } from "react"

const Input = memo(
  ({ refElement, type = "", maxLength, onChange, placeholder }) => {
    if (type === "tel") {
      return (
        <div className={styles.input}>
          <InputMask
            ref={refElement}
            onChange={onChange}
            className={styles.input__field}
            mask="+7 (999) 999-99-99"
            maskChar="_"
            placeholder={placeholder}
            maxLength={maxLength}
          />
        </div>
      )
    } else {
      return (
        <div className={styles.input}>
          <input
            type="tel"
            maxLength={maxLength}
            ref={refElement}
            onChange={onChange}
            className={styles.input__field}
            placeholder={placeholder}
          />
        </div>
      )
    }
  }
)

Input.displayName = 'Input';

export default Input
