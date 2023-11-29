import styles from "./Container.module.scss"

const Container = ({ size = "xl", children }) => {
  return (
    <div className={`${size === "xl" ? styles.container : styles.containerXl}`}>
      {children}
    </div>
  )
}

export default Container
