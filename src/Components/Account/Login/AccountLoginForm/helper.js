export const authTelegram = async (id) => {
    const result = await fetch('/api/auth/telegramauth', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telegram_id: id }),
    });
  
      const response = await result.json();
      if (response?.data) {
        return response?.data;
      } else {
        return response;
      }
  };

  // export const transferTraining = async (token, line, date, time) => {
  //   const result = await fetch('/api/booking/transfer-training', {
  //     cache: 'no-store',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({token, line, date, time }),
  //   });
  
  //     const response = await result.json();
  //     if (!response.error) {
  //       return response;
  //     }
  // };