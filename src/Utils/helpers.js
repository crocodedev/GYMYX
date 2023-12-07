export const checkValidPhone = (value) => {
  const cleanedPhoneNumber = value.replace(/\D/g, "")

  return {
    value: cleanedPhoneNumber,
    valid: /^7[3-9]{1}[0-9]{9}$/.test(cleanedPhoneNumber),
  }
}

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  const country = cleaned.slice(0, 1);
  const region = cleaned.slice(1, 4);
  const firstBlock = cleaned.slice(4, 7);
  const secondBlock = cleaned.slice(7, 9);
  const thirdBlock = cleaned.slice(9, 11);

  const formattedNumber = `+${country} (${region}) ${firstBlock}-${secondBlock}-${thirdBlock}`;

  return formattedNumber;
}