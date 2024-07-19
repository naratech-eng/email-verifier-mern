import React, { useState } from 'react';
import axios from 'axios';

const EmailVerificationForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

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
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h2>Email Verification</h2>
      {!otpSent ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailVerificationForm;
