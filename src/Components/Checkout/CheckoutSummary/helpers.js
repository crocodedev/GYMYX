export async function createBooking(token, gym_id, items) {
  const result = await fetch("/api/booking/create-booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, gym_id, lines: items }),
  })

  const response = await result.json()
  if (!response.error) {
    return response
  }
}

export function findPrice(timeStr, priceRanges = []) {
  const inputTime = new Date(`2000-01-01T${timeStr}`)

  for (const priceRange of priceRanges) {
    const startTime = new Date(`2000-01-01T${priceRange.start}`)
    const endTime = new Date(`2000-01-01T${priceRange.end}`)

    if (inputTime >= startTime && inputTime <= endTime) {
      return priceRange.price
    }
  }

  return 0
}

function formatDate(date) {
  const originalDate = new Date(date)

  const year = originalDate.getFullYear()
  const month = originalDate.getMonth() + 1 // Месяцы в JavaScript начинаются с 0
  const day = originalDate.getDate()

  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`

  return formattedDate
}

export function countValues(arr, pricesRange) {
  const countArray = []

  arr.forEach((entry) => {
    entry.time.map((time) => {
      const existingObj = countArray.find((obj) => obj.value === entry.value)
      if (existingObj) {
        existingObj.count++
      } else {
        countArray.push({
          value: formatDate(entry.value),
          count: 1,
          time: time,
          price: findPrice(time, pricesRange),
        })
      }
    })
  })

  return countArray
}

export function prepareDataForBooking(arr) {
  const result = {}

  arr.forEach((item) => {
    const { value, time } = item

    if (!result[value]) {
      result[value] = [time]
    } else if (!result[value].includes(time)) {
      result[value].push(time)
    }
  })

  return result
}
