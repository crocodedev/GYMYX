'use client';

import { useSelector } from 'react-redux';

import CheckoutList from '@/Components/Checkout/CheckoutList';
import CheckoutSummary from '@/Components/Checkout/CheckoutSummary';
import Container from '@/Components/Container';

import styles from './CheckoutContent.module.scss';
import Modal from '@/Components/Modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CheckoutContent = () => {
  const router = useRouter();
  const { visitDate, gym } = useSelector((state) => state.booking);

  return (
    <div className={styles['checkout-content']}>
      <Container>
        <div className={styles['checkout-content__wrapper']}>
          <CheckoutList items={visitDate} />
          <CheckoutSummary items={visitDate} gym={gym} />
        </div>
      </Container>
    </div>
  );
};

export default CheckoutContent;
