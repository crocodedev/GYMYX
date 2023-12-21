const getAvailableTimes = async (gym, day, month, year) => {
  const result = await fetch("/api/booking/get-avaliable-times", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gym, day, month, year }),
  })

  const response = await result.json()
  if (!response.error) {
    return response
  }
}

export const takeAvaliableTimesDay = async (gym_id, date) => {
  const currentDate = new Date(date)
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const fetchCurrentDayTimes = getAvailableTimes(
    gym_id,
    currentDay,
    currentMonth,
    currentYear
  )

  return fetchCurrentDayTimes.then(({ data }) => {
    return data ? data : []
  })
}
