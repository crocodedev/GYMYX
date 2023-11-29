import styles from "./AboutUsItem.module.scss"

const AboutUsItem = ({ title, text }) => {
  return (
    <div className={styles['About-us-item']}>
      <div className={styles['About-us-item__img']}>
        <img src="/images/about-us-item-bg.png" alt="" />
      </div>
      <p className={styles['About-us-item__title']}>{title}</p>
      <p className={styles['About-us-item__text']}>{text}</p>
    </div>
  )
}

export default AboutUsItem
