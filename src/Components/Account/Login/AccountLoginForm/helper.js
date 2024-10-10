export const authTelegram = async (id) => {
  // try {
    const result = await fetch('/api/auth/telegramauth', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telegram_id: id }),
    })
    
      const response = await result.json();

      if (response?.data) {
        return response?.data;
      } else if(response?.message) {
        return response
      }

  // } catch(err) {
  //   console.log('err', err)
  //   return {error: err}
  // }
  };
