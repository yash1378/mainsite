import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface OtpVerificationPageProps {
  otpId: string;
  onVerification: (enteredOtp: string) => void;
}

const OtpVerificationPage: React.FC<OtpVerificationPageProps> = ({ otpId, onVerification }) => {
  const [enteredOtp, setEnteredOtp] = useState('');
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        // Make a request to the backend API
        const otpId = router.query.Id;

        // const response = await fetch(`http://localhost:3001/api/verifyOTP/${otpId}`, {
        const response = await fetch(`https://jsmainsitebackend.onrender.com/api/verifyOTP/${otpId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ enteredOtp:enteredOtp }),
        });
  
        if (response.ok) {
          console.log('Request successful');
          const data = await response.json()
          console.log(data)
          const dot = {
            jwt:data.jwtToken,
            new:data.message,
          }
          // Optionally, you can call the onSubmit callback here
          router.push({
            pathname:"/",
            query:dot,
          });
          // onSubmit(name, phone);
        } else {
          console.error('Request failed');
        }
      } catch (error) {
        console.error('Error during request:', error);
      } 
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Verify OTP
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Please enter the OTP sent to your phone number.
      </Typography>
      <form onSubmit={handleVerify}>
        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          margin="normal"
          value={enteredOtp}
          onChange={(e) => setEnteredOtp(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Verify OTP
        </Button>
      </form>
    </Container>
  );
};

export default OtpVerificationPage;
