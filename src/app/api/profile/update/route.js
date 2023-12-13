export const dynamic = "force-dynamic" // defaults to force-static
export async function POST(request) {
  if (request.method === "POST") {
    // try {
      const formData = await parseBody(request);

      // Если все еще есть проблемы, выведите formData в консоль, чтобы изучить его структуру
      // const requestData = await request.json()
      // const { token, data } = requestData


      // const response = await fetch("https://gymyx.cro.codes/api/users", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: formData,
      // })

      // if (!response.ok) {
      //   return Response.json({ error: "Произошла ошибка, попробуйте позже!" })
      // }
      // const result = await response.json()
      // return Response.json({ data: result.data })
    //   return Response.json({ success: true });
    // } catch (error) {
    //   return Response.json({ error: "Error fetching data 2" })
    // }
  } else {
    request.status(405).end()
  }
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let rawData = '';

    req.on('data', (chunk) => {
      rawData += chunk;
    });

    req.on('end', () => {
      try {
        const formData = new URLSearchParams(rawData);
        resolve(Object.fromEntries(formData));
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}