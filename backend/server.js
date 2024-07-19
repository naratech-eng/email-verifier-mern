import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './utils/dbConnect.js';
import emailRoutes from './routes/emailRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use('/api/emails', emailRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
