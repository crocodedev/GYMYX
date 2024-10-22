import styles from './GideTags.module.scss'

import { CrossIcon } from '../../../../public/svg'

const GideTags = ({activeTags = [], setActiveTags}) => {

  const deleteActiveTag = () => {
    // setActiveTags({prev => []})
  }

  return (
    <div className={styles['select-tags']}>
      <div className={styles['select-tags__inner']}>
        {activeTags.map((tag, i) => (
          <div className={styles['select-tags__item']}>
            <span className={styles['select-tags__name']}>{tag.name}</span>
            <button type='bytton' className={styles['select-tags__delete-icon']} onClick={deleteActiveTag}><CrossIcon/></button>
          </div>
        ))}

        <div className={styles['select-tags__item']}>
          <span className={styles['select-tags__name']}>спина</span>
          <button type='bytton' className={styles['select-tags__delete-icon']} onClick={deleteActiveTag}><CrossIcon/></button>
        </div>

        <div className={styles['select-tags__item']}>
          <span className={styles['select-tags__name']}>грудь</span>
          <button type='bytton' className={styles['select-tags__delete-icon']} onClick={deleteActiveTag}><CrossIcon/></button>
        </div>

        <div className={styles['select-tags__item']}>
          <span className={styles['select-tags__name']}>грудь</span>
          <button type='bytton' className={styles['select-tags__delete-icon']} onClick={deleteActiveTag}><CrossIcon/></button>
        </div>

        <div className={styles['select-tags__item']}>
          <span className={styles['select-tags__name']}>грудь</span>
          <button type='bytton' className={styles['select-tags__delete-icon']} onClick={deleteActiveTag}><CrossIcon/></button>
        </div>

        <div className={styles['select-tags__item']}>
          <span className={styles['select-tags__name']}>грудь</span>
          <button type='bytton' className={styles['select-tags__delete-icon']} onClick={deleteActiveTag}><CrossIcon/></button>
        </div>

        <div className={styles['select-tags__item']}>
          <span className={styles['select-tags__name']}>грудь</span>
          <button type='bytton' className={styles['select-tags__delete-icon']} onClick={deleteActiveTag}><CrossIcon/></button>
        </div>
      </div>
    </div>
  )
}

export default GideTags