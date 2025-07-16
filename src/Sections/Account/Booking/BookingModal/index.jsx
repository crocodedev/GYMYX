'use client'

import styles from './BookingModal.module.scss';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { useState } from 'react';

const BookingModal = ({ closeModal, gyms, activeGym, changeGym }) => {
  const [selectGym, setSelectGym] = useState(activeGym)
  const gymsLenIsOne = gyms.length <= 1

  const handlerSelectGym = (gym) => setSelectGym(gym)
  const handlerChangeGym = () => changeGym(selectGym)

  return (
    <Modal
      handleClose={gymsLenIsOne ? closeModal : () => { }}
      text={gymsLenIsOne ? 'Извините, пока у нас только один зал :(' : 'Выберите зал'}>
      {!gymsLenIsOne ? (
        <div className={styles.modal__inner}>
          <div className={styles.gyms}>
            {gyms.map((gym, i) => (
              <button
                type='button'
                className={`${styles.gyms__gym_btn} ${selectGym.id == gym.id && styles.select}`}
                key={i}
                onClick={() => handlerSelectGym(gym)}>
                  <span className={styles.gyms__gym_name}>{gym.name}</span>
                  <span className={styles.gyms__gym_address}>{gym.address}</span>
              </button>
            ))}
          </div>
          <Button
            onClick={handlerChangeGym}
            fullSize={true}
            size="l"
            label="Выбрать"
            variant="blue-gradient"
            disabledShadow={true}
          />
        </div>
      ) : (
        <Button
          onClick={closeModal}
          fullSize={true}
          size="l"
          label="Понятно"
          variant="blue-gradient"
          disabledShadow={true}
        />
      )}
    </Modal>
  )
}

export default BookingModal;