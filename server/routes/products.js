import express from 'express';
import Product from '../models/products';
const router = express.Router();

const fetchProducts = (req, res, next) => {
  Product.find().exec(function (error, results) {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
};

// methods
const postRecord = (req, res, next) => {
  const newProduct = new Product({
    ...req.body
  });
  Product.create(newProduct)
    .then((products) => res.status(200).json(products))
    .catch(err => {
      next(err);
    });
};

// routes
router.get('/', function (req, res, next) {
  res.send('response from products router');
});
router.get('/all', fetchProducts);
router.post('/add', postRecord);
export { router as productsRouter };
