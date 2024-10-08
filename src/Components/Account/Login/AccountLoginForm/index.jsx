'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Input from '@/Components/Input';
import AccountCheckBox from '@/Components/Account/Login/AccountCheckBox';
import AccountRepeatCode from '@/Components/Account/Login/AccountRepeatCode';
import Button from '@/Components/Button';
import { useSession } from 'next-auth/react';

import styles from './AccountLoginForm.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { checkValidPhone, formatPhoneNumber } from '@/Utils/helpers';
import { authTelegram } from './helper';
import WebApp from '@twa-dev/sdk';
import { fun } from '@/Components/Checkout/CheckoutSummary/helpers';

const INIT_FORM_DATA = {
  phone: {
    value: '',
    valid: false,
  },
  agreePolicy: false,
  code: null,
  receivedCode: null,
};

const AccountLoginForm = ({ handleToogleModal }) => {
  const inputRef = useRef();
  const session = useSession();
  const inputCodeRef = useRef();
  const router = useRouter();
  const [data, setData] = useState(INIT_FORM_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.status === 'authenticated') {
      let url = session?.data?.user?.full_name ? '/lk/profile' : '/lk/login/create-profile'
      router.push(url);
    }
  }, [session.status]);

  const handleChangePhone = useCallback(() => {
    const phone = checkValidPhone(inputRef.current.value);
    setData((prev) => {
      return {
        ...prev,
        phone: {
          value: phone.value,
          valid: phone.valid,
        },
      };
    });
  }, []);

  const handleChangeCode = useCallback(() => {
    setData((prev) => {
      return {
        ...prev,
        code: inputCodeRef.current.value,
      };
    });
  }, []);

  const handleChangeAgreePolicy = useCallback(() => {
    setData((prev) => {
      return {
        ...prev,
        agreePolicy: !prev.agreePolicy,
      };
    });
  });

  const handleResetForm = () => {
    setData(INIT_FORM_DATA);
  };

  const handleSubmitLogin = async () => {
    setLoading(true);
    const result = await fetch('/api/login/send-code', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: data.phone.value }),
    });

    const response = await result.json();
    if (!response.error) {
      setData((prev) => {
        return {
          ...prev,
          receivedCode: response.data,
        };
      });
    }
    setLoading(false);
  };

  const handleSubmitCheckCode = async () => {
    setLoading(true);
    const result = await fetch('/api/login/verify-code', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: data.phone.value, code: data.code }),
    });

    const response = await result.json();
    if (!response.error) {
      await signIn('credentials', {
        token: response.data.access_token,
        redirect: false,
      });
    } else {
      handleToogleModal();
    }
    setLoading(false);
  };

  useEffect(() => {
    
    const tg = WebApp
    // const userId = tg.initDataUnsafe?.auth_date
    const userId = +"1728372265"
    console.log('tg', tg)
    console.log('userId', userId)

    if(userId) {
      console.log('userId', userId)
      authTelegram(userId).then(res => {
        console.log(res)
        if(res?.data) {
          console.log('data', res?.data)
        }
      })
    } else {
      console.log('not id')
    }
  }, [])

  return (
    <div className={styles['account-login-form']}>
      <div className={styles['account-login-form__wrapper']}>
        <div className={styles['account-login-form__logo']}>
          <img src="/icons/loginFormIcon.svg" />
        </div>
        <h1 className={styles['account-login-form__title']}>Войти или зарегистрироваться</h1>
        {!data.receivedCode && (
          <Input type="tel" refElement={inputRef} onChange={handleChangePhone} placeholder={'Номер телефона'} />
        )}
        {data.receivedCode && (
          <Input
            type="number"
            refElement={inputCodeRef}
            onChange={handleChangeCode}
            placeholder={'Код из SMS'}
            maxLength={4}
          />
        )}
        {!data.receivedCode && (
          <Button
            onClick={handleSubmitLogin}
            disabled={data.phone.valid && data.agreePolicy ? false : true}
            fullSize={true}
            size="l"
            variant="blue-gradient"
            icon={!loading ? 'arrow' : ''}
            label={!loading ? 'Продолжить' : 'Загрузка'}
          />
        )}
        {data.receivedCode && (
          <Button
            disabled={data.code ? (data.code.length < 4 ? true : false) : true}
            onClick={handleSubmitCheckCode}
            fullSize={true}
            size="l"
            variant="blue-gradient"
            label={!loading ? 'Подтвердить' : 'Загрузка'}
          />
        )}
        {!data.receivedCode && <AccountCheckBox value={data.agreePolicy} onChange={handleChangeAgreePolicy} />}
        {data.receivedCode && (
          <AccountRepeatCode
            handleClickChange={handleResetForm}
            handleClick={handleSubmitLogin}
            targetPhone={formatPhoneNumber(data.phone.value)}
          />
        )}
      </div>
    </div>
  );
};

export default AccountLoginForm;
