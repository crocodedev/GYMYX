import styles from './Loading.module.scss';

const Loading = ({ full_screen, background }) => {
  return (
    <div
      className={`${styles.loading} ${full_screen ? styles['full-screen'] : ''} ${
        background ? styles['background'] : ''
      }`}
    >
      <div className={styles['loading__img-wrapper']}>
        <img className={styles.loading__img} src="/loading.gif" width="35" height="35" alt="" />
      </div>
      <p className={styles['loading__text']}>Идёт загрузка</p>
    </div>
  );
};

export default Loading;
