import mongoose from 'mongoose';
const { Schema } = mongoose;

const productsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date,
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });
const Product = mongoose.model('Product', productsSchema);
export default Product;
