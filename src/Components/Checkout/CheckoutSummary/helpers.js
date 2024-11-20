export async function createBooking(token, gym_id, with_balance, lines, total_price = '0', anti_frod) {
  console.log(token, gym_id, with_balance, lines, anti_frod)
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gym_id, with_balance, lines, total_price, anti_frod}),
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

export const combinedList = (list, type='def') => {
  const priceCounts = {};

  list.forEach(({ time}, id) => {
    time.forEach((training, index) => {
      const price = index + id === 0 ? training.price.first : training.price.default;
      priceCounts[price] = (priceCounts[price] || 0) + 1;
    });
  });

  return Object.entries(priceCounts).map(([price, count]) => ({
    price: Number(price),
    count,
  }));
}

// export function findPrice(timeStr, priceRanges = []) {
//   const inputTime = new Date(`2000-01-01T${timeStr}`);

//   for (const priceRange of priceRanges) {
//     const startTime = new Date(`2000-01-01T${priceRange.start}`);
//     const endTime = new Date(`2000-01-01T${priceRange.end}`);

//     if (inputTime >= startTime && inputTime <= endTime) {
//       return priceRange.price;
//     }
//   }

//   return 0;
// }

// function formatDate(date) {
//   const originalDate = new Date(date);

//   const year = originalDate.getFullYear();
//   const month = originalDate.getMonth() + 1;
//   const day = originalDate.getDate();

//   const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

//   return formattedDate;
// }

// export function countValues(arr, pricesRange) {
//   const countArray = [];

//   arr.forEach((entry) => {
//     entry.time.map((time) => {
//       const existingObj = countArray.find((obj) => obj.value === entry.value);
//       if (existingObj) {
//         existingObj.count++;
//       } else {
//         countArray.push({
//           value: formatDate(entry.value),
//           count: 1,
//           time: time,
//           price: findPrice(time, pricesRange),
//         });
//       }
//     });
//   });
//   return countArray;
// }

export function prepareDataForBooking(data) {
  const result = {};

  data.forEach(({ value, time }) => {
    const date = new Date(value);
    const localDate = date.toLocaleDateString("en-CA");
    const times = time.map(({ time }) => time);

    if (!result[localDate]) {
      result[localDate] = times;
    } else {
      result[localDate] = [...result[localDate], ...times];
    }
  });

  return result;
}

export const separation = (balance, list) => {
  const paidTrainings = [];
  const unpaidTrainings = [];

  let remainingBalance = balance;

  list.forEach(({ value, time }, id) => {
    const paidTime = [];
    const unpaidTime = [];

    time.forEach((session, i) => {
      const price = id+i==0 ? session.price.first : session.price.default;

      const sessionWithPrice = { ...session, price }; // Заменяем price объект на значение

      if (remainingBalance > 0) {
        paidTime.push(sessionWithPrice);
        remainingBalance--;
      } else {
        unpaidTime.push(sessionWithPrice);
      }
    });

    if (paidTime.length > 0) {
      paidTrainings.push({ value, time: paidTime });
    }
    if (unpaidTime.length > 0) {
      unpaidTrainings.push({ value, time: unpaidTime });
    }
  });

  console.log('result',{ paidTrainings, unpaidTrainings });
  const paid = aggregateByPrice(paidTrainings);
  const not_paid = aggregateByPrice(unpaidTrainings);
  console.log(paid, not_paid)

  return { paid, not_paid };
}

function aggregateByPrice(trainings) {
  const priceMap = {};

  trainings.forEach(({ time }) => {
    time.forEach(({ price }) => {
      if (priceMap[price]) {
        priceMap[price]++;
      } else {
        priceMap[price] = 1;
      }
    });
  });

  return Object.entries(priceMap).map(([price, count]) => ({
    price: Number(price),
    count
  }));
}