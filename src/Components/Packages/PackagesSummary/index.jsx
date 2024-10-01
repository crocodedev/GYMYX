import styles from './PackagesSummary.module.scss'
import Button from '@/Components/Button'

const PackagesSummary = ({packageData, handlerSubmit}) => {
  console.log(packageData)
  const workoutsNumber = packageData?.count || 0
  const price = packageData?.price?.package || 0
  const result = price * workoutsNumber
  

  return (
    <section className={styles["packages-summary"]}>
      <div className={styles["packages-summary__inner"]}>
        <div className={styles['packages-summary__shopping-list']}>
          <p className={styles['packages-summary__shopping-item']}>Пакет на {workoutsNumber} тренировок</p>
        </div>
        <div className={styles['packages-summary__result']}>
          <span className={styles['packages-summary__result-text']}>Итого</span>
          <span className={styles['packages-summary__result-price']}>{result}₽</span>
        </div>
        <Button
          onClick={handlerSubmit}
          size="l"
          variant="blue-gradient"
          fullSize={true}
          label={'Оплатить'}
          icon={'arrow'}
          disabledShadow={true}
        />
      </div>
    </section>
  )
}

export default PackagesSummary