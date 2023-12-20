export const dynamic = "force-dynamic" // defaults to force-static
export async function POST(request) {
  if (request.method === "POST") {
    try {
      const response = await fetch("https://gymyx.cro.codes/api/gyms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        return Response.json({ error: "Произошла ошибка, попробуйте позже!" })
      }
      const result = await response.json()
      return Response.json({ data: result.data })
    } catch (error) {
      return Response.json({ error: "Error fetching data 2" })
    }
  } else {
    request.status(405).end()
  }
}
