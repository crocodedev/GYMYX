'use client';

import BookingTimeVariantsItem from './BookingTimeVariantsItem';
import styles from './BookingTimeVariants.module.scss';
import { useSelector } from 'react-redux';

import { timeToNumber, convertToTimeFormat } from './helpers';
import Loading from '@/Components/Loading';

const BookingTimeVariants = ({ loading, onChangeData, data, variants, isChange }) => {
  const { avaliableTimesCurrentDay } = useSelector((state) => state.booking);
  console.log(variants)

  return (
    <div className={styles['booking-time-variants']}>
      {loading && !!variants.length && (
        <div className={styles['booking-time-variants__loading-preview']}>
          <Loading />
        </div>
      )}
      {variants.map(({ start, end, bgColor }, index) => {
        const components = [];
        for (let i = timeToNumber(start), id = 0; i <= timeToNumber(end); i++, id++) {
          const formatedTime = convertToTimeFormat(i);
          const isDisabled = isChange ? !avaliableTimesCurrentDay?.includes(formatedTime) : !avaliableTimesCurrentDay.map(el => el.time)?.includes(formatedTime)
          const value = isChange ? formatedTime : avaliableTimesCurrentDay.find(el => el.time === formatedTime) || formatedTime;
          const isActive = isChange ? data.includes(formatedTime) : data.find(el => el.time === formatedTime)
          components.push(
            <BookingTimeVariantsItem
              key={`${index}_${i}`}
              isActive={isActive}
              disabled={ isDisabled }
              handleClick={onChangeData}
              value={value}
              bgColor={bgColor}
              variants={variants}
              isChange={isChange}
            />,
          );
        }
        return components;
      })}
    </div>
  );
};

export default BookingTimeVariants;
