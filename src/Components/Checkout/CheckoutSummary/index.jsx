'use client';

import Button from '@/Components/Button';
import styles from './CheckoutSummary.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { findPrice, createBooking, countValues, prepareDataForBooking, fun, sortByDate, combinedList } from './helpers';
import CheckoutConfirm from '@/Components/Checkout/CheckoutConfirm';
import Modal from '@/Components/Modal';
import { uniqueUserData } from '@/Utils/helpers';

const CheckoutSummary = ({ items, gym, isActivePackage = 0 }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [canSubmit, setCanSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState(items);
  const [finalArr, setFinalArr] = useState([]);
  const [listShowInCheckout, setListShowInCheckout] = useState([])
  const [isFirstBooking, setIsFirstBooking] = useState();
  const [modalData, setModalData] = useState({
    type: '', // successful, confirm, crowded
    isShow: false,
    text: '',
  })
  const balance = sessionData?.user?.balance || 0
  const [paidData, setPaidData] = useState({})
  const [isLoad, setIsLoad] = useState(false)

  const totalPrice = useMemo(() => {
    return items.reduce((acc, el, i) => {
      return acc + el.time.reduce((acc, el, id) => {
        return acc + ((i+id==0) ? el?.price?.first : el?.price?.default) || 0
      }, 0)
    }, 0);
    
  }, [isFirstBooking, items, gym, modalData]);

  const handleSubmit = () => {
    setLoading(true);
    createBooking(sessionData.user.accessToken, gym?.id, false, prepareDataForBooking(list), {uuid: uniqueUserData()})
    .then(({ data }) => {
      if (data?.payment_link) router.push(data?.payment_link);
      else if (data?.status) router.push('/lk/training');
      else setError(true);
      setLoading(false);
    });
  };

  const handlerClicktByBalance = () => {
    setPaidData(fun(listShowInCheckout, balance))
    const countTrainint = listShowInCheckout.reduce((acc, el) => acc + (el?.count || 0), 0)

    console.log(countTrainint, balance)
    if(countTrainint <= balance) setModal('confirm')
    else setModal('crowded')
  }

  const setModal = (type) => {
    if(type == 'confirm') {
      const countTrainint = listShowInCheckout.reduce((acc, el) => acc + (el?.count || 0), 0)
      const text = countTrainint == 1 
      ? 'тренировку' 
      : countTrainint > 1 && countTrainint <= 4 
      ? 'тренировки' 
      : 'тренировок'
      setModalData(prev => ({
        ...prev,
        type: 'confirm',
        isShow: true,
        text: `Списать ${countTrainint} ${text} с баланса?`,
      }))
    } else if(type == 'crowded') {
      setModalData(prev => ({
        ...prev,
        type: 'crowded',
        isShow: true,
        text: '',
      }))
    } else if(type == 'successful') {
      setModalData(prev => ({
        ...prev,
        type: 'successful',
        isShow: true,
        text: 'Спасибо за покупку!',
      }))
    } else if(type == 'close') {
      setModalData(prev => ({
        ...prev,
        type: '',
        isShow: false,
        text: '',
      }))
    } else if(type == 'error') {
      setModalData(prev => ({
        ...prev,
        type: 'error',
        isShow: true,
        text: 'Что то пошло не так =(',
      }))
    }
  }


  useEffect(() => {
    if (sessionData?.user) {
      setList(items)
      console.log(list)
      console.log('sortList', combinedList(list))
      setListShowInCheckout(combinedList(items))
      setIsFirstBooking(sessionData?.user?.is_new)
      setLoadingPage(false);
    }
  }, [sessionData, isFirstBooking, items, list]);

  if (loadingPage) return;

  return (
    <>
    {modalData.isShow && sessionData && (
      <Modal 
      text={modalData.text} 
      handleClose={modalData.type == 'successful' ? ()=>{} : () => setModal('close')} 
      size={modalData.type == 'crowded' ? 'xl' : ''}>
        {ModalInner(modalData.type, sessionData.user.accessToken, gym, paidData, setModal, isLoad, setIsLoad, list)}
      </Modal>
    )}
    
    <div className={styles['checkout-summary']}>
      <div className={styles['checkout-summary__wrapper']}>
        <div className={styles['checkout-summary__list']}>
          {listShowInCheckout.map((group, i) => (
            <div key={i} className={styles['checkout-summary__item']}>
              <p>Тренировка {group.price} ₽/ч ({group.count})</p>
              <p>{group.price * group.count} ₽</p>
            </div>
          ))}
        </div>
        <div className={styles['checkout-summary__summary']}>
          <p>Итого</p>
          <p>{totalPrice} ₽</p>
        </div>
        <div className={styles['checkout-summary__buttons']}>
          <Button
            onClick={handleSubmit}
            size="l"
            variant="blue-gradient"
            fullSize={true}
            label={!loading ? 'Оплатить' : 'Ожидание'}
            icon={!loading ? 'arrow' : null}
            disabled={!canSubmit || loading}
            disabledShadow={true}
          />
        {isActivePackage && (
          <Button
            onClick={handlerClicktByBalance}
            size="l"
            variant="light-blue-gradient"
            fullSize={true}
            label={!loading ? 'Списать с баланса' : 'Ожидание'}
            icon={!loading ? 'arrow' : null}
            disabled={!canSubmit || loading}
            disabledShadow={true}
          />
        )}
        </div>
        
        <CheckoutConfirm handleChangeCanSubmit={() => setCanSubmit((prev) => !prev)} isActive={canSubmit} />
        {error && <p className={styles['checkout-summary__summary-error']}>Произошла ошибка</p>}
      </div>
    </div>
    </>
  );
};

export default CheckoutSummary;


function ModalInner(type, token, gym, trainingsObj, setModal, isLoad, setIsLoad, list) {
  const router = useRouter()
  const totalPrice = trainingsObj.not_paid.reduce((acc, el) => acc + el.price * el.count, 0)

  const goToWorcouts = () => {
    router.push('/lk/workouts')
  }

  const paymentFullByBalance = () => {
    console.log('send', prepareDataForBooking(list), list)
    // return
    setIsLoad(true)
    createBooking(token, gym?.id, true, prepareDataForBooking(list), {uuid: uniqueUserData()})
    .then((res) => {
      console.log(res)
      if(res?.payment_link) {
        setModal('successful')
      } else {
        setModal('error')
      }
    })
    .finally(() => {
      setIsLoad(false)
    })
  } 

  const partialPayment = () => {
    setIsLoad(true)
    createBooking(token, gym?.id, true, prepareDataForBooking(list), {uuid: uniqueUserData()})
    .then((res) => {
      if(res?.data?.payment_link) {
        router.push(res?.data?.payment_link)
      } else {
        setModal('error')
      }
      setIsLoad(false)
    })
  }

  const closeModal = () => {
    setModal('close')
  }

  return (
    <>
    {type == 'successful' && (
      <Button
        onClick={goToWorcouts}
        size="l"
        variant="blue-gradient"
        fullSize={true}
        label={'К тренировкам'}
        disabledShadow={true}
      />
    )}

    {type == 'confirm' && (
      <div className={styles['modal-inner']}>
        <div className={styles['modal-inner__buttons']}>
          <Button
            onClick={paymentFullByBalance}
            size="l"
            variant="blue-gradient"
            fullSize={true}
            label={'Да'}
            disabledShadow={true}
            disabled={isLoad}
          />
          <Button
            onClick={closeModal}
            size="l"
            variant="black-gradient"
            fullSize={true}
            label={'Нет'}
            disabledShadow={true}
          />
        </div>
      </div>
    )}

    {type === 'crowded' && (
      <div className={styles['modal-inner']}>
        <div className={styles['modal-inner__header']}>
          <p className={styles['modal-inner__header-title']}>Недостаточно слотов</p>
          <button className={styles['modal-inner__header-icon']} type='button' onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32" fill="none">
              <path d="M32.0002 0.783203L1.56592 31.2176M1.56445 0.783203L31.9988 31.2176" stroke="#212428" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div className={styles['modal-inner__list']}>
          {trainingsObj?.paid && trainingsObj.paid.map(({count, price }, index) => (
            <div key={`${index}`} className={`${styles['modal-inner__list-item']} ${styles['modal-inner__list-item--paid']}`}>
              <p>Тренировка {price} ₽/ч ({count})</p>
              <p>{price} ₽</p>
            </div>
          ))}
          {trainingsObj?.not_paid && trainingsObj.not_paid.map(({count, price }, index) => (
            <div key={`${index}`} className={styles['modal-inner__list-item']}>
              <p>Тренировка {price} ₽/ч ({count})</p>
              <p>{price} ₽</p>
            </div>
          ))}
        </div>
        <div className={styles['modal-inner__summary']}>
          <span className={styles['modal-inner__summary-text']}>Итого</span>
          <span className={styles['modal-inner__summary-price']}>{totalPrice} ₽</span>
        </div>
        <div className={styles['modal-inner__buttons']}>
          <Button
            onClick={partialPayment}
            size="l"
            variant="blue-gradient"
            fullSize={true}
            icon={'arrow'}
            label={'Оплатить'}
            disabledShadow={true}
            disabled={isLoad}
          />
        </div>
      </div>
    )}
    </>
  )
}
