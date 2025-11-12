import { v4 } from "uuid";

export const getPackages = async (token, gym_id) => {
  const result = await fetch('/api/package/get-all-packages', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token, gym_id})
  });

    const response = await result.json();
    if (!response.error) {
      return response;
    }
};

export const buyPackage = async (token, package_id, split = false) => {
  const result = await fetch('/api/package/buy-package', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Idempotency-Key': v4(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token, package_id, split})
  });

    const response = await result.json();
    if (!response.error) {
      return response;
    }
};