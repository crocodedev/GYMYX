export const dynamic = 'force-dynamic'; // defaults to force-static
export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const requestData = await request.json();

      const requestBody = {
        date: requestData.date,
        time: requestData.time,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${requestData.line}`, {
        method: 'PUT',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${requestData.token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      return Response.json({ data });
    } catch (error) {
      return Response.json({ error: 'Error fetching data' });
    }
  } else {
    request.status(405).end();
  }
}