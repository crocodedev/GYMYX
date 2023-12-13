import styles from "./Container.module.scss"

const Container = ({ size = "xl", children }) => {
  return (
    <div className={`${styles[`container${size.toUpperCase()}`]}`}>
      {children}
    </div>
  )
}

export default Container
