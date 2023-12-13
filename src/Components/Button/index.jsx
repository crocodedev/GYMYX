import styles from "./Button.module.scss"

const Button = ({
  disabled = false,
  onClick,
  className = "",
  size = "m",
  variant = "",
  label,
  icon,
  fullSize = false
}) => {
  
  return (
    <button
      onClick={onClick}
      className={`${className} ${fullSize ? styles["full-size"] : ""} ${styles.button} ${
        variant ? styles[`button-${variant}`] : ""
      } ${styles[`button-size-${size}`]}`}
      disabled={disabled}
    >
      {label}
      {icon && (
        <div className={styles.button__icon}>
          <img style={{ transform: "rotate(180deg)" }} src="/icons/arrow.svg" />
        </div>
      )}
    </button>
  )
}

export default Button
