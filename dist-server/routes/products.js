"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productsRouter = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = _interopRequireDefault(require("express"));

var _products = _interopRequireDefault(require("../models/products"));

var _scrape = require("../utilities/scrape");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var router = _express["default"].Router();

exports.productsRouter = router;

var fetchProducts = function fetchProducts(req, res, next) {
  _products["default"].find().exec(function (error, results) {
    if (error) {
      return next(error);
    }

    res.json({
      content: results,
      totalRecords: results.length
    });
  });
}; // methods


var postRecord = function postRecord(req, res, next) {
  var newProduct = new _products["default"](_objectSpread({}, req.body));

  _products["default"].create(newProduct).then(function (products) {
    return res.status(200).json(products);
  })["catch"](function (err) {
    next(err);
  });
}; // routes


router.get('/', function (req, res, next) {
  res.send('response from products router');
});
router.get('/all', fetchProducts);
router.post('/add', postRecord);
router.get('/search', _scrape.searchVendors);