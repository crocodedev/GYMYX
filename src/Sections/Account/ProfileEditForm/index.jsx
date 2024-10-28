'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

import Button from '@/Components/Button';
import Container from '@/Components/Container';
import ProfileField from '@/Components/Account/Profile/ProfileField';
import styles from './ProfileEditForm.module.scss';
import { checkValidPhone } from '@/Utils/helpers';
import heic2any from 'heic2any';
import { EditIcon } from '../../../../public/svg';
import { formatDateForBirth, isValidDate, checkDataDifference } from './helper';

const ProfileEditForm = () => {
  const { data: sessionData, update: updateSession } = useSession();
  const imagePreviewRef = useRef(null);
  const [isErrorSubmit, setIsErrorSubmit] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: {
      name: 'name',
      value: '',
      isValid: false,
      type: 'text',
    },
    lastname: {
      name: 'lastname',
      value: '',
      isValid: false,
      type: 'text',
    },
    email: {
      name: 'email',
      value: '',
      isValid: false,
      type: 'email',
    },
    phone: {
      name: 'phone',
      value: '',
      isValid: false,
      type: 'tel',
    },
    image: {
      name: 'image',
      value: null,
      preview: null,
      isValid: false,
      type: 'file',
      error: false,
    },
    birth: {
      name: 'birth',
      value: '',
      isValid: false,
      type: 'date',
    }
  });
  const [validateData, setValidateData] = useState({
    name: false,
    lastname: false,
    email: false,
    phone: false,
    image: false,
    birth: false,
  })

  const handleChangeInput = (value, fieldName) => {
    const sanitizedValue = value.replace(/\s/g, '');
    setData((prev) => {
      return {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value: sanitizedValue,
        },
      };
    });
  };

  const validateName = () => {
    setValidateData(prev => ({
      ...prev,
      name: data.name.value.length > 0
    }))
  }

  const validateLastName = () => {
    setValidateData(prev => ({
      ...prev,
      lastname: data.lastname.value.length > 0
    }))
  }

  const validateEmail = () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setValidateData(prev => ({
      ...prev,
      email: pattern.test(data.email.value)
    }))
  }

  const validatePhone = () => {
    setValidateData(prev => ({
      ...prev,
      phone: checkValidPhone(data.phone.value).valid
    }))
  }

  const validateImage = () => {
    setValidateData(prev => ({
      ...prev,
      image: (data.image.value?.size / 1024 <= 10240) || data.image.value == null
    }))
  }

  const validateBirth = () => {
    console.log(data.birth.value)
    setValidateData(prev => ({
      ...prev,
      birth: isValidDate(data.birth.value)
    }))
  }

  const validateAllInputs = () => {
    validateName()
    validateLastName()
    validateEmail()
    validatePhone()
    validateImage()
    validateBirth()
  }

  useEffect(() => {
    setData((prev) => {
      return {
        name: {
          ...prev.name,
          value: sessionData?.user?.full_name?.split(' ')[0] || '',
        },
        lastname: {
          ...prev.lastname,
          value: sessionData?.user?.full_name?.split(' ')[1] || '',
        },
        image: {
          ...prev.image,
          preview: sessionData?.user?.image || '',
        },
        phone: {
          ...prev.phone,
          value: sessionData?.user?.phone || '',
        },
        email: {
          ...prev.email,
          value: sessionData?.user?.email || '',
        },
        birth: {
          ...prev.birth,
          value: sessionData?.user?.birth || '',
        }
      };
    });
  }, [sessionData]);

  useEffect(() => {
    if (!sessionData || !data) return;
    validateAllInputs() 
  }, [data]);

  const handleUploadFile = (e) => {
    const file = e?.target?.files[0];
    const fileExt = file.name.substr(file.name.lastIndexOf('.') + 1);

    if (!file) return;

    if (fileExt.toLowerCase() == 'heic') {
      heic2any({
        blob: file,
        toType: 'image/jpeg',
      }).then(function (resultBlob) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 200;
        canvas.height = 200;

        const image = new Image();
        image.onload = function () {
          ctx.drawImage(image, 0, 0, 200, 200);

          const dataUrl = canvas.toDataURL('image/jpeg');

          imagePreviewRef.current.src = dataUrl;

          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              setData((prev) => ({
                ...prev,
                image: {
                  ...prev.image,
                  value: blob,
                  isValid: true,
                },
              }));
            });

          const inputFile = e.target.files;
          const container = new DataTransfer();
          const newFile = new File([resultBlob], 'heic.jpeg', {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          });
          container.items.add(newFile);
          inputFile.files = container.files;
        };

        image.src = URL.createObjectURL(resultBlob);
      });
    }

    if (file?.size / 1024 <= 10240) {
      imagePreviewRef.current.src = window?.URL?.createObjectURL(file);

      setData((prev) => {
        return {
          ...prev,
          image: {
            ...prev['image'],
            value: file,
            isValid: true,
          },
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          image: {
            ...prev['image'],
            value: file,
            isValid: false,
            error: 'Размер файла превышает 10 МБ',
          },
        };
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setIsErrorSubmit(false);
    var myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${sessionData.user.accessToken}`);

    var formdata = new FormData();
    formdata.append('full_name', `${data.name.value} ${data.lastname.value}`);
    formdata.append('email', data.email.value);
    formdata.append('birth', data.birth.value);

    if (data.phone.value !== sessionData.user.phone) {
      formdata.append('phone', checkValidPhone(data.phone.value).value);
    }

    if (data.image.value) {
      formdata.append('image', data.image.value);
    }

    formdata.append('_method', 'PUT');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, requestOptions, { cache: 'no-store' });
    const response = await result.json();

    if (!result.ok) {
      if (response.phone) {
        setIsErrorSubmit('Этот телефон уже занят другим пользователем!');
      }
    } else {
      setData((prev) => {
        return {
          ...prev,
          image: {
            ...prev['image'],
            value: null,
          },
        };
      });
      updateSession(response.data);
    }
    setLoading(false);
  };

  return (
    <section className={styles['profile-edit-form']}>
      <Container size="M">
        <div className={styles['profile-edit-form__wrapper']}>
          <div className={styles['profile-edit-form__data']}>

            <div className={styles['profile-edit-form__avatar-wrapper']}>
              <label className={styles['profile-edit-form__avatar']}>
                <input onChange={handleUploadFile} type="file" accept=".jpg, .jpeg, .png, .pdf, .webp, .heic" />
                <img ref={imagePreviewRef} src={data.image.preview || '/icons/account.svg'} alt="profile image" />
                <span className={styles['profile-edit-form__avatar-edit']}>
                  <img src="/icons/edit.svg" alt="edit" className={styles['profile-edit-form__edit-icon']} />
                </span>
              </label>
                <label className={styles['profile-edit-form__date-birth']}>
                  <input 
                    type='date' 
                    className={styles['profile-edit-form__date-birth-text']} 
                    max={formatDateForBirth(new Date)} 
                    onInput={(e) => handleChangeInput(e.target.value, 'birth')} 
                    value={data.birth.value}
                  />
                  <span className={styles['profile-edit-form__date-birth-edit-icon']} type='button'>
                    <EditIcon/>
                  </span>
                </label>
            </div>
            
            <div className={styles['profile-edit-form__data-col']}>
              <ProfileField 
                prefix="Имя" 
                name={'name'} 
                value={data.name.value} 
                onInput={handleChangeInput} 
              />
              <ProfileField
                name={'lastname'}
                prefix="Фамилия"
                value={data.lastname.value}
                onInput={handleChangeInput}
              />
            </div>
          </div>
          <div className={styles['profile-edit-form__contacts']}>
            <p className={styles['profile-edit-form__contacts-title']}>Контакты</p>
            <div className={styles['profile-edit-form__row']}>
              <ProfileField
                type="tel"
                name={'phone'}
                prefix="Телефон"
                value={data.phone.value}
                onInput={handleChangeInput}
              />
              <ProfileField
                type="email"
                prefix="E-mail"
                name={'email'}
                value={data.email.value}
                onInput={handleChangeInput}
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={ !(Object.values(validateData).every((field) => field) && checkDataDifference(sessionData.user, data)) }
            size="l"
            label={loading ? 'Загрузка' : 'Сохранить'}
            variant="blue-gradient"
            fullSize={true}
          />
          {isErrorSubmit && <p className={styles['profile-edit-form__error-field']}>{isErrorSubmit}</p>}
        </div>
      </Container>
    </section>
  );
};

export default ProfileEditForm;
