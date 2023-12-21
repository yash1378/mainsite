// pages/ProtectedPage.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { radioClasses } from '@mui/material';

const ProtectedPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the JWT from the query parameters
    console.log(router.query)
    const jwtToken = Array.isArray(router.query.data) ? router.query.data[0] : router.query.data;
    console.log(jwtToken);
    if (!jwtToken) {
    //   setError('JWT not found in query parameters');
      return;
    }

    // Example fetch request with headers
    fetch('https://jsmainsite.onrender.com/api/protected-data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        const r = await response.json();
        console.log(r)
        return response.json();
      })
      .then((responseData) => {
        // Handle the data from the protected endpoint
        setData(responseData);
      })
      .catch((error) => {
        // Handle errors (e.g., unauthorized access)
        setError(error.message);
      });
  }, [router.query]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Protected Page</h1>
      {data ? (
        <div>
          <p>Data from the protected endpoint:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ProtectedPage;
