import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  otpExpiry: { type: Date, required: true },
});

const User = mongoose.model('User', userSchema);
export default User;
