import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface OtpFormProps {
  onSubmit: (name: string, phone: string) => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        // Make a request to the backend API
        // const response = await fetch('http://localhost:3001/sendOTP', {
        const response = await fetch("https://jsmainsitebackend.onrender.com/sendOTP", {
            
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone }),
        });
  
        if (response.ok) {
          console.log('Request successful');
          // Optionally, you can call the onSubmit callback here
          const data = await response.json();
          router.push({
            pathname:"/login",
            query:{"Id":data.otpId}
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
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" gutterBottom>
          OTP Verification
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send OTP
        </Button>
      </form>
    </Container>
  );
};

export default OtpForm;
