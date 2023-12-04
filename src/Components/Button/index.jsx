import styles from "./Button.module.scss"

const Button = ({ className = "", size = "m", variant = "", label, icon }) => {
  return (
    <div
      className={`${className} ${styles.button} ${
        variant ? styles[`button-${variant}`] : ""
      } ${styles[`button-size-${size}`]}`}
    >
      {label}
      {icon && (
        <div className={styles.button__icon}>
          <img style={{transform: "rotate(180deg)"}} src="/icons/arrow.svg" />
        </div>
      )}
    </div>
  )
}

export default Button
