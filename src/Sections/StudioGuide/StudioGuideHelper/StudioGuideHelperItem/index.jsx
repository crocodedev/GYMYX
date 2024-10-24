import styles from './StudioGuideHelperItem.module.scss'

import Image from 'next/image'

const StudioGuideHelperItem = ({itemData}) => {
  console.log(itemData)

  const title = itemData.find(el => el.name == 'title')?.value
  const description = itemData.find(el => el.name == 'description')?.value
  const image = itemData.find(el => el.name == 'image')?.value

  
  return (
    <div className={styles['studio-guide-helper-item']}>
      <div className={styles['studio-guide-helper-item__top']}>
        <p className={styles['studio-guide-helper-item__title']}>{title}</p>
        <p className={styles['studio-guide-helper-item__description']}>{description}</p>
      </div>
      <div className={styles['studio-guide-helper-item__bottom']}>
        <Image className={styles['studio-guide-helper-item__image']} src={image} width={300} height={300} alt={'image-'+title}/>
      </div>
    </div>
  )
}

export default StudioGuideHelperItem