import GidInfo from "./GidInfo"
import styles from "./GidItem.module.scss"
import GidItemContent from "./GidItemContent"

const GidItem = (props) => {
  const { description, isViewed, link, trainingTime, duration, locked, title } =
    props
  return (
    <div className={styles["gid-item"]}>
      <div className={styles["gid-item__wrapper"]}>
        <GidItemContent
          link={link}
          duration={duration}
          title={title}
          lock={locked}
          isViewed={isViewed}
        />
        <GidInfo trainingTime={trainingTime} description={description} />
      </div>
    </div>
  )
}

export default GidItem
