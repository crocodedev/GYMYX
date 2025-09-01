import Modal from "../Modal"
import styles from './MaintenanceOverlay.module.scss'

const text = `Уважаемые пользователи! 
На сайте ведутся работы по оптимизации. Совсем скоро все поправим 🙂
По любым вопросам пишите в поддержку https://t.me/helpgymyx или звоните по телефону + 7 (901) 424-00-24`

const MaintenanceOverlay = ({ isShow = false }) => {
  if (!isShow) return null
  
  return (
    <Modal size={'xl'}>
      <div className={styles.content}>
        <h3 className={styles.content__title}>Уважаемые пользователи!</h3>
        <p className={styles.content__text}>На сайте ведутся работы по оптимизации. Совсем скоро все поправим 🙂</p>
        <p className={styles.content__text}>
          {`По любым вопросам пишите в поддержку:`}{' '}
          <a className={styles.content__link} href="https://t.me/helpgymyx">
            {`https://t.me/helpgymyx`}{' '}
          </a>
          {`или звоните по телефону: `}
          <a className={styles.content__link} href="tell:+79014240024">
            {`+ 7 (901) 424-00-24`}
          </a>
        </p>
      </div>
    </Modal>
  )
}

export default MaintenanceOverlay