import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { productsRouter } from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDb } from './models';
import createError from 'http-errors';

const app = express();

// mongoDB connect
connectDb().then(res => console.log('mongoDb connected'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// express middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/products', productsRouter);

// error handling
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  process.exit(1);
});
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  process.exit(1);
});

export default app;
