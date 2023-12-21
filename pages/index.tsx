import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
const SignIn = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const handleSignIn = async () => {
    // Use Google Sign-In API here
    // Redirect to backend for authentication
    window.location.href = 'https://jsmainsitebackend.onrender.com/api/auth/google';
  };

  const handleSignOut = () => {
    // Clear the JWT from sessionStorage on sign-out
    // sessionStorage.removeItem('jwt');
    localStorage.removeItem('jwt');
    setData("");

    // For illustration purposes, simply reload the page
    // window.location.reload();
  };

  const handleGetEnrolled = () => {

    router.push('/getenroll');
  };

  useEffect(() => {
    // Check for JWT in URL query params after redirect from backend
    const jwt = Array.isArray(router.query.jwt) ? router.query.jwt[0] : router.query.jwt;

    if (jwt) {
      // Store JWT in sessionStorage
    // Writing to local storage
      localStorage.setItem('jwt', jwt);
      // sessionStorage.setItem('jwt', jwt);
      console.log('Received JWT:', jwt);
      setData(jwt);
    }
  }, [router.query]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your App
      </Typography>
      {data!=="" ? (
        <>
          {/* If 'jwt' is present in sessionStorage, show the "Sign Out" button */}
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
          <br />
          <br />
          <Button variant="contained" color="secondary" onClick={handleGetEnrolled}>
            Get Enrolled
          </Button>
        </>
      ) : (
        // Otherwise, show the "Sign In with Google" and "Get Enrolled" buttons
          <Button variant="contained" color="primary" onClick={handleSignIn}>
            Sign In with Google
          </Button>

      )}
    </div>
  );
};

export default SignIn;
