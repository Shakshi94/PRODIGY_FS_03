import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/User.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

const Db_url = process.env.ATLAS_DB;

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get('/', async (req, res) => {
  res.status(200).json({
    message: "hello it's Shakshi Vishwakarma",
  });
});

app.use('/api/user', userRouter);

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(Db_url);
    console.log('database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

const startServer = async () => {
  connectDB();
  try {
    app.listen(9000, () => {
      console.log('server is listening at port 9000');
    });
  } catch (err) {
    console.error('Server error:', err);
  }
};

startServer();
