import crypto from 'crypto';
import User from '../models/User.js';
import { sendOTPEmail, sendConfirmationEmail } from '../utils/sendEmail.js';

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomBytes(3).toString('hex');
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  try {
    await User.findOneAndUpdate(
      { email },
      { email, otp, otpExpiry },
      { upsert: true, new: true }
    );
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: 'OTP sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await sendConfirmationEmail(email);
    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
