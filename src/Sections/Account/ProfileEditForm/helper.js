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