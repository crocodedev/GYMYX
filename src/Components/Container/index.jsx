import styles from "./Container.module.scss"

const Container = ({ size = "xl", children }) => {
  return (
    <div className={`${size === "xl" ? styles.containerXl : styles.container}`}>
      {children}
    </div>
  )
}

export default Container
