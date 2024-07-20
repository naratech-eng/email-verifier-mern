import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

const EmailVerificationForm = ({onEmailVerified}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  // const [verified, setVerified] = useState(false);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/emails/send-otp', { email });
      setOtpSent(true);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/emails/verify-otp', { email, otp });
      onEmailVerified(email);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  // const handleRestart = () => {
  //   setEmail('');
  //   setOtp('');
  //   setOtpSent(false);
  //   setVerified(false);
  //   setMessage('');
  // };

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Email Verification !
      </Typography>
      {!otpSent ? (
        <Box>
          <TextField
            type="email"
            label="Enter your email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSendOtp} variant="contained" color="primary" size='large' fullWidth>
            Send OTP
          </Button>
        </Box>
        ) : (
        <Box>
          <TextField
            type="text"
            label="Enter OTP"
            variant="outlined"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button onClick={handleVerifyOtp} variant="contained" color="primary" fullWidth>
            Verify OTP
          </Button>
        </Box>
      )}
      {message && <Typography color="error">{message}</Typography>}
    </Box>
  );
};

export default EmailVerificationForm;
