import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './products';

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/webscraper', { useNewUrlParser: true, useUnifiedTopology: true });
};

const models = { Product };

export { connectDb };

export default models;
