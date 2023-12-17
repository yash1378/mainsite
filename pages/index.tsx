import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession, signIn } from 'next-auth/react';
import styles from '../styles/Home.module.css'; // You can create a new CSS file for styling
import React from 'react';
import { useState } from 'react';

const Login: NextPage = () => {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn(); // Initiates the Google sign-in process
  };

  const [renderCount, setRenderCount] = useState(0);

  React.useEffect(() => {
    // Increment the render count on each render
    setRenderCount((prevCount) => prevCount + 1);

    // Send post request only on odd renders
    if (renderCount % 2 !== 0 && session) {
      const sendUserDataToBackend = async () => {
        try {
          const response = await fetch('https://jsmainsite.onrender.com/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(session.user),
          });

          if (response.ok) {
            console.log('User data sent to backend successfully.');
          } else {
            console.error('Failed to send user data to backend:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending user data to backend:', error);
        }
      };

      sendUserDataToBackend();
    }
  }, [session]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Login | Your App Name</title>
        <meta name="description" content="Login to Your App Name" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Your App Name</h1>
        <p className={styles.description}>Login to access exclusive content.</p>

        {/* Google Sign-in Button */}
        <button className={styles.googleButton} onClick={handleSignIn}>
          Sign in with Google
        </button>
      </main>
    </div>
  );
};

export default Login;
