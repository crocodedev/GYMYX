import { checkValidPhone } from '@/Utils/helpers';

export function formatDateForBirth(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

export function isValidDate(dateString) {
  const minDate = new Date("1900-01-01");
  const today = new Date();

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  minDate.setHours(0, 0, 0, 0);

  // console.log('is valid date', date >= minDate && date <= today)

  return date >= minDate && date <= today;
}

export const checkDataDifference = (prevData, newData) => {
  if (prevData.email !== newData.email.value) {
    // console.log('email', prevData.email !== newData.email.value)
    return true;
  }

  if (prevData.full_name !== `${newData.name.value} ${newData.lastname.value}`) {
    // console.log('full_name', prevData.full_name !== `${newData.name.value} ${newData.lastname.value}`)
    return true;
  }

  if (prevData.image !== newData.image.value && newData.image.value != null) {
    // console.log('image', prevData.image !== newData.image.value && newData.image.value != null)
    return true;
  }

  if (prevData.phone !== checkValidPhone(newData.phone.value).value) {
    // console.log('phone', prevData.phone !== checkValidPhone(newData.phone.value).value)
    return true;
  }

  // console.log('birth', prevData.birth !== newData.birth.value && '' !== newData.birth.value, prevData.birth, newData.birth.value)
  if (prevData.birth !== newData.birth.value && '' !== newData.birth.value) {
    return true;
  }

  return false;
};