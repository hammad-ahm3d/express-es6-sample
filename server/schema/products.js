import mongoose from 'mongoose';
const { Schema } = mongoose;

const productsSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  description: String,
  dateAdded: Date,
  price: Number,
  rating: Number,
  imageUrl: String
});

export { productsSchema };
