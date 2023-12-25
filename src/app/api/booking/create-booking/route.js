export const dynamic = "force-dynamic" // defaults to force-static
export async function POST(request) {
  if (request.method === "POST") {
    try {
      const requestData = await request.json()

      const requestBody = {
        gym_id: requestData.gym_id,
        lines: requestData.lines,
      }

      const response = await fetch("https://gymyx.cro.codes/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${requestData.token}`,
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      return Response.json({ data })
    } catch (error) {
      return Response.json({ error: "Error fetching data" })
    }
  } else {
    request.status(405).end()
  }
}
