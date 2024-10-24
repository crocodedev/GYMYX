import styles from './StudioGuideHelper.module.scss'

import Container from '@/Components/Container'
import StudioGuideHelperItem from './StudioGuideHelperItem'

const StudioGuideHelper = ({helperData}) => {
  const title = helperData.find(el => el.name == 'title')?.value
  const items = helperData.find(el => el.type == 'object')?.childrens

  // console.log("helperData", items)


  return (
    <div className={styles['studio-guide-helper']}>
      <Container>
        <div className={styles['studio-guide-helper__inner']}>
          <h2 className={styles['studio-guide-helper__title']}>{title}</h2>
          <div className={styles['studio-guide-helper__items']}>
            {items.map((item, i) => (
              <StudioGuideHelperItem itemData={item} key={i}/>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default StudioGuideHelper