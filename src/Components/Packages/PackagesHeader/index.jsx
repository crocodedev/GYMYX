import styles from './PackagesHeader.module.scss'

import PackagesTagItem from '../PackagesTagItem'
import Container from '@/Components/Container'

const PackagesHeader = ({packagesData, packageIdActive, setPackageIdActive}) => {

  const handlerClick = (id) => {
    setPackageIdActive(id)
  }

  return (
    <section className={styles['package-header']}>
      <Container>
        <div className={styles['package-header__inner']}>
          <div className={styles['package-header__items']}>
            {packagesData.map((packageItem, i) => <PackagesTagItem id={i} name={packageItem.name} isActive={packageIdActive == i} key={i} handlerClick={handlerClick}/>)}
            {/* <PackagesTagItem name='Мини'/>
            <PackagesTagItem name='Миди'/>
            <PackagesTagItem name='Макс'/> */}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PackagesHeader