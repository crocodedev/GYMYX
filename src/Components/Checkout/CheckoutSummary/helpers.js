// export async function createBooking(token, gym_id, with_balance, lines, anti_frod) {
//   console.log(token, gym_id, with_balance, lines, anti_frod)
//   const result = await fetch('/api/booking/create-booking', {
//     method: 'POST',
//     cache: 'no-store',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ token, gym_id, with_balance, lines, anti_frod}),
//   });

//   const response = await result.json();
//   if (!response.error) {
//     return response;
//   }
// }

export async function createBooking(token, gym_id, with_balance, lines, anti_frod) {
  console.log(token, gym_id, with_balance, lines, anti_frod)
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gym_id, with_balance, lines, anti_frod}),
    });
  
    const response = await result.json();
    if (!response.error) {
      return response;
    } else {
      return response
    }
  } catch(error) {
    return Response.json({ error: 'Error fetching data' });
  }
}

export const combinedList = (list) => {
  const priceCounts = {};

  list.forEach(({ time }) => {
    time.forEach((training, index) => {
      const price = index === 0 ? training.price.first : training.price.default; // Первая тренировка берет `first`, остальные `default`
      priceCounts[price] = (priceCounts[price] || 0) + 1; // Группировка по цене
    });
  });

  // Преобразуем объект в массив с ценами и их количеством
  return Object.entries(priceCounts).map(([price, count]) => ({
    price: Number(price),
    count,
  }));
}

export function findPrice(timeStr, priceRanges = []) {
  const inputTime = new Date(`2000-01-01T${timeStr}`);

  for (const priceRange of priceRanges) {
    const startTime = new Date(`2000-01-01T${priceRange.start}`);
    const endTime = new Date(`2000-01-01T${priceRange.end}`);

    if (inputTime >= startTime && inputTime <= endTime) {
      return priceRange.price;
    }
  }

  return 0;
}

function formatDate(date) {
  const originalDate = new Date(date);

  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();

  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

  return formattedDate;
}

export function countValues(arr, pricesRange) {
  const countArray = [];

  arr.forEach((entry) => {
    entry.time.map((time) => {
      const existingObj = countArray.find((obj) => obj.value === entry.value);
      if (existingObj) {
        existingObj.count++;
      } else {
        countArray.push({
          value: formatDate(entry.value),
          count: 1,
          time: time,
          price: findPrice(time, pricesRange),
        });
      }
    });
  });
  return countArray;
}

export function prepareDataForBooking(data) {
  // const result = {};

  // data.forEach(({ value, time }) => {
  //   // Преобразуем дату в формат YYYY-MM-DD
  //   const date = new Date(value).toISOString().split("T")[0];
  //   console.log(date)

  //   // Собираем время в массив
  //   const times = time.map(({ time }) => time);

  //   // Добавляем или объединяем время по дате
  //   if (!result[date]) {
  //     result[date] = times;
  //   } else {
  //     result[date] = [...result[date], ...times];
  //   }
  // });

  // return result;

  const result = {};

  data.forEach(({ value, time }) => {
    // Преобразуем дату в локальную временную зону
    const date = new Date(value);
    const localDate = date.toLocaleDateString("en-CA"); // Формат YYYY-MM-DD
    const times = time.map(({ time }) => time);

    if (!result[localDate]) {
      result[localDate] = times;
    } else {
      result[localDate] = [...result[localDate], ...times];
    }
  });

  return result;
}

export const fun = (data, balance) => {
  console.log('arr',data)
  // let finalTraining = {
  //   paid: [],
  //   not_paid: []
  // }

  // finalTraining.paid = mergeByPrice(arr.slice(0, balance))
  // finalTraining.not_paid = mergeByPrice(arr.slice(balance))
  // return finalTraining

  // // const minPriceId = arr.findIndex(el => el.price == minPrice)
  // // if(minPriceId >= 0) {
  // //   finalTraining.not_paid.push(arr[minPriceId])
  // //   arr.splice(minPriceId, 1)
  // //   balance -= 1
  // // }

  
  let finalTraining = {
      paid: [],
      not_paid: []
    }
  const paid = [];
  const not_paid = [];
  let remainingTrainings = balance;

  data.forEach(({ price, count }) => {
    if (remainingTrainings > 0) {
      const paidCount = Math.min(count, remainingTrainings); // Сколько можно оплатить
      const unpaidCount = count - paidCount; // Остаток неоплаченных

      if (paidCount > 0) {
        paid.push({ price, count: paidCount });
      }
      if (unpaidCount > 0) {
        not_paid.push({ price, count: unpaidCount });
      }

      remainingTrainings -= paidCount;
    } else {
      // Все тренировки становятся неоплаченными, если закончился баланс
      not_paid.push({ price, count });
    }
  });

  return { paid, not_paid };
}

export const sortByDate = (arr) => {
  console.log(arr)
  return arr
  const result = arr.sort((a, b) => {
      // Сортировка по дате
      const dateA = new Date(a.value);
      const dateB = new Date(b.value);
      return dateA - dateB;
    });
  return result
}

function mergeByPrice(arr) {
  const result = [];

  arr.forEach(item => {
    const existingItem = result.find(el => el.price === item.price);
    
    if (existingItem) {
      existingItem.count += item.count;
    } else {
      const { price, count } = item;
      result.push({ price, count });
    }
  });

  result.sort((a, b) => a.price - b.price);

  return result;
}
