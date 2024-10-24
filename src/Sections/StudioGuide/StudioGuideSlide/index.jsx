import styles from './StudioGuideSlide.module.scss'

const StudioGuideSlide = ({data}) => {
  console.log('item', data)

  const name = data?.find(el => el.name == 'name')?.value || ''
  const poster = data?.find(el => el.name == 'poster')?.value || ''
  const video = data?.find(el => el.name == 'video')?.value || ''

  return (
    <div className={styles['studio-guide-slide']}>
      <div className={styles['studio-guide-slide__inner']}>

        <div className={styles['studio-guide-slide__video-wrapper']}>
          <video className={styles['studio-guide-slide__video']} poster={poster}>
            <source src={video}/>
          </video>
        </div>

        <div className={styles['studio-guide-slide__befor']}>
          <div className={styles['studio-guide-slide__name']}>{name}</div>
        </div>
      </div>
    </div>
  )
}

export default StudioGuideSlide