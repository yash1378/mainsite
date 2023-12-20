// pages/index.tsx

import { Button, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { send } from 'process';
import { useEffect } from 'react';


interface UserData {
  name: string;
  email:string;
  // Add other properties if necessary
}


export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignInWithGoogle = async () => {
    const result = await signIn('google');


  };

  const handleSignOut = async () => {
    await signOut();
    // Redirect to the home page or another page after sign-out
    router.push('/');
  };

  const handleRedirect = () => {
    // Replace with the desired path for redirection
    if(session){
      sendUserDataToBackend(session.user as UserData);
    }
    router.push('/getenroll');
  };

  const sendUserDataToBackend = (userData:UserData) => {
    fetch('https://jsmainsite.onrender.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(() => {
        console.log('User data sent to backend successfully');
      })
      .catch((error) => {
        console.error('Error sending user data to backend:', error);
      });
  };

  // useEffect to send user data when session becomes true


  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {session ? (
        <>
          <Typography variant="h5" gutterBottom>
            Welcome, {session.user?.name || 'User'}!
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={handleRedirect}>
            Get Enrolled 
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleSignInWithGoogle}>
          Sign In with Google
        </Button>
      )}
    </div>
  );
}
