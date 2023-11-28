import styles from "./Button.module.scss"

const Button = ({ variant = "", label }) => {
  return (
    <div className={`${styles.button} ${styles[`button-${variant}`]}`}>
      {label}
    </div>
  )
}

export default Button
