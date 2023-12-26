export function sortVisitDates(data, dateToRemove, timeToRemove) {
  const updatedData = data.filter((item) => {
    if (item.date === dateToRemove && item.time === timeToRemove) {
      return false;
    }

    return true;
  });

  return updatedData;
}

export function canDelete(arr) {
  let status = false;
  arr.forEach(({ time }) => {
    if (arr.length === 1 && time.length === 1) {
      status = false;
    } else {
      status = true;
    }
  });

  return status;
}
