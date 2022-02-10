"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectDb = void 0;

require("dotenv/config");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _products = _interopRequireDefault(require("./products"));

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

exports.connectDb = connectDb;
var models = {
  Product: _products["default"]
};
var _default = models;
exports["default"] = _default;