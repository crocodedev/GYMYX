'use client';

import Button from '@/Components/Button';
import styles from './CheckoutSummary.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useMemo, useState, useEffect } from 'react';
import { findPrice, createBooking, countValues, prepareDataForBooking } from './helpers';
import CheckoutConfirm from '@/Components/Checkout/CheckoutConfirm';

const CheckoutSummary = ({ items, gym }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [canSubmit, setCanSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [finalArr, setFinalArr] = useState([]);
  const [isFirstBooking, setIsFirstBooking] = useState();

  const totalPrice = useMemo(() => {
    let total = 0;

    items.forEach((entry, indexFirst) => {
      entry.time.map((time, indexSecond) => {
        if (isFirstBooking && indexFirst === 0 && indexSecond === 0) {
          total += gym.min_price;
        } else {
          total += findPrice(time, gym?.prices);
        }
      });
    });
    setList(countValues(items, gym?.prices));
    return total;
  }, [isFirstBooking, items, gym]);

  const sortArr = () => {
    const finalArr = list.reduce((acc, el) => {
      const existingEl = acc.find((item) => item.price === el.price);

      if (existingEl) {
        existingEl.count += el.count;
      } else {
        acc.push({ ...el, count: el.count });
      }

      return acc;
    }, []);

    setFinalArr(finalArr);
  };

  const handleSubmit = () => {
    setLoading(true);
    createBooking(sessionData.user.accessToken, gym?.id, prepareDataForBooking(list)).then(({ data }) => {
      if (data?.payment_link) {
        router.push(data?.payment_link);
      } else if (data?.status) {
        router.push('/lk/training');
      } else {
        setError(true);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (sessionData?.user) {
      setIsFirstBooking(!sessionData.user.enter_code);
      sortArr();
      setLoadingPage(false);
    }
  }, [sessionData, isFirstBooking, list]);

  if (loadingPage) return;

  return (
    <div className={styles['checkout-summary']}>
      <div className={styles['checkout-summary__wrapper']}>
        <div className={styles['checkout-summary__list']}>
          {finalArr.map(({ value, count, price }, index) => (
            <div key={`${value}_${index}`} className={styles['checkout-summary__item']}>
              <p>
                Тренировка {price} ₽/ч ({count})
              </p>
              <p>{price} ₽</p>
            </div>
          ))}
        </div>
        <div className={styles['checkout-summary__summary']}>
          <p>Итого</p>
          <p>{totalPrice} ₽</p>
        </div>
        <Button
          onClick={handleSubmit}
          size="l"
          variant="blue"
          fullSize={true}
          label={!loading ? 'Оплатить' : 'Ожидание'}
          icon={!loading ? 'arrow' : null}
          disabled={!canSubmit || loading}
          disabledShadow={true}
        />
        <CheckoutConfirm handleChangeCanSubmit={() => setCanSubmit((prev) => !prev)} isActive={canSubmit} />
        {error && <p className={styles['checkout-summary__summary-error']}>Произошла ошибка</p>}
      </div>
    </div>
  );
};

export default CheckoutSummary;
