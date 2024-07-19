import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;
