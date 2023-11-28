import styles from "./Button.module.scss"

const Button = ({ size = "m", variant = "", label }) => {
  return (
    <div
      className={`${styles.button} ${
        variant ? styles[`button-${variant}`] : ""
      } ${styles[`button-size-${size}`]}`}
    >
      {label}
    </div>
  )
}

export default Button
