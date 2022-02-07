import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './products';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

const models = { Product };

export { connectDb };

export default models;
