import styles from "./Button.module.scss";

const Button = ({
  disabled = false,
  onClick,
  className = "",
  size = "m",
  variant = "",
  label,
  icon,
  disabledShadow = false,
  fullSize = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${fullSize ? styles["full-size"] : ""} ${
        styles.button
      } ${variant ? styles[`button-${variant}`] : ""} ${
        styles[`button-size-${size}`]
      } ${disabledShadow ? styles["shadow"] : ""}`}
      disabled={disabled}
    >
      {label}
      {icon === "telegram" ? (
        <div className={styles.button__icon}>
          <img
            style={{
              filter:
                "brightness(0) saturate(100%) invert(24%) sepia(86%) saturate(5642%) hue-rotate(233deg) brightness(93%) contrast(94%)",
            }}
            src="/icons/socials/telegram.svg"
          />
        </div>
      ) : icon ? (
        <div className={styles.button__icon}>
          <img style={{ transform: "rotate(180deg)" }} src="/icons/arrow.svg" />
        </div>
      ) : null}
    </button>
  );
};

export default Button;
