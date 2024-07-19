import express from 'express';
import { sendOTP, submitProtectedForm, verifyOTP } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/submit-form', submitProtectedForm);

export default router;
