import styles from './GidInfo.module.scss';

const GidInfo = ({ description, trainingTime, tags }) => {
  // const arr = [[], []]
  return (
    <div className={styles['gid-item-info']}>
      <div className={styles['gid-item-info__cards']}>

        <div className={styles['gid-item-info__item']}>
          <p className={styles['gid-item-info__item-description']}>{description}</p>
          <ul className={styles['gid-item-info__item-tags']}>
            <li className={`${styles['gid-item-info__item-tag']} ${ true ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>грудь</li>
            <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>ноги</li>
            <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>руки</li>
            <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>плечи</li>
          </ul>
        </div>

        <div className={styles['gid-item-info__item']}>
          <div className={styles['gid-item-info__item-title']}>время</div>
          <p className={styles['gid-item-info__item-text']}>{trainingTime}</p>
        </div>

      </div>

      <div className={styles['gid-item-info__item-tags-wrapper']}>
        <ul className={styles['gid-item-info__item-tags--mobile']}>
          <li className={`${styles['gid-item-info__item-tag']} ${ true ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>грудь</li>
          <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>ноги</li>
          <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>руки</li>
          <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>плечи</li>
          <li className={`${styles['gid-item-info__item-tag']} ${ true ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>грудь</li>
          <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>ноги</li>
          <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>руки</li>
          <li className={`${styles['gid-item-info__item-tag']} ${ false ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`}>плечи</li>
        </ul>
      </div>
    </div>
  );
};

export default GidInfo;
