export const dynamic = 'force-dynamic'; // defaults to force-static
export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const requestData = await request.json();
      const idempotencyKey = request.headers.get('Idempotency-Key');

      const requestBody = {
        package_id: requestData.package_id,
        split: requestData.split,
      };

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestData.token}`,
      };

      if (idempotencyKey) {
        headers['Idempotency-Key'] = idempotencyKey;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`, {
        method: 'POST',
        cache: 'no-store',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return Response.json({ data });
    } catch (error) {
      return Response.json({ error: error });
    }
  } else {
    request.status(405).end();
  }
}