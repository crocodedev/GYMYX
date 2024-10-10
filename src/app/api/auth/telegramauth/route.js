export const dynamic = 'force-dynamic'; // defaults to force-static
export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const requestData = await request.json();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/trusted`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegram_id: requestData.telegram_id}),
      });

      // const result = await response;

      if (response.ok) {
        // if (result?.message === 'Unauthorized') {
        //   return Response.json({ error: 'Unauthorized' });
        // }
        // return Response.json({ error: 'Network response was not ok' });
        return response
      }

      // return Response.json({ data: result?.data });
    } catch (error) {
      return Response.json({ error: 'Error fetching data' });
    }
  } else {
    request.status(405).end();
  }
}