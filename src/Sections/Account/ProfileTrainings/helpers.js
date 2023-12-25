
export const getTrainingData = async (token) => {
  const result = await fetch("/api/booking/get-bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })

  const response = await result.json()
  if (!response.error) {
    return response
  }
}