import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/User.js';
import productRouter from './routes/Products.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://busybuy-536e.onrender.com/', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

const Db_url = process.env.ATLAS_DB;

if (!Db_url) {
  console.error('ATLAS_DB environment variable is not defined.');
  process.exit(1);
}

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(Db_url, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

app.use('/api/user', userRouter);
app.use('/api/products', productRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(8000, () => {
      console.log('Server is listening at port 8000');
    });
  } catch (err) {
    console.error('Server startup error:', err);
  }
};

startServer();
