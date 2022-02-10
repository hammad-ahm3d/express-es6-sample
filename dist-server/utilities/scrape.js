"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchVendors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var amazonUrl = 'https://www.amazon.com/s?k=';
var flipkartUrl = 'https://www.flipkart.com/search?q=';
var alibabaUrl = 'https://www.alibaba.com/trade/search?SearchText=';

var getFlipkartVendors = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(productName) {
    var browser, page;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _puppeteer["default"].launch({
              headless: false
            });

          case 2:
            browser = _context.sent;
            _context.next = 5;
            return browser.newPage();

          case 5:
            page = _context.sent;
            _context.next = 8;
            return page["goto"](flipkartUrl + productName, {
              waitUntil: 'networkidle0'
            });

          case 8:
            _context.next = 10;
            return page.waitForSelector('body');

          case 10:
            return _context.abrupt("return", 'flipkart');

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getFlipkartVendors(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getAmazonVendors = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(productName) {
    var browser, page;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _puppeteer["default"].launch({
              headless: false
            });

          case 2:
            browser = _context2.sent;
            _context2.next = 5;
            return browser.newPage();

          case 5:
            page = _context2.sent;
            _context2.next = 8;
            return page["goto"](amazonUrl + productName, {
              waitUntil: 'networkidle0'
            });

          case 8:
            _context2.next = 10;
            return page.waitForSelector('body');

          case 10:
            return _context2.abrupt("return", 'amazon');

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAmazonVendors(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getAlibabaVendors = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(productName) {
    var browser, page;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _puppeteer["default"].launch({
              headless: false
            });

          case 2:
            browser = _context3.sent;
            _context3.next = 5;
            return browser.newPage();

          case 5:
            page = _context3.sent;
            _context3.next = 8;
            return page["goto"](alibabaUrl + productName, {
              waitUntil: 'networkidle0'
            });

          case 8:
            _context3.next = 10;
            return page.waitForSelector('body');

          case 10:
            return _context3.abrupt("return", 'alibaba');

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAlibabaVendors(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var searchVendors = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var browser, productName, amazonVendors, flipkartVendors, alibabaVendors;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _puppeteer["default"].launch({
              headless: false
            });

          case 3:
            browser = _context4.sent;
            productName = req.query.productName;
            amazonVendors = getAmazonVendors(productName);
            flipkartVendors = getFlipkartVendors(productName);
            alibabaVendors = getAlibabaVendors(productName);
            _context4.next = 10;
            return browser.close();

          case 10:
            res.json({
              amazonVendors: amazonVendors,
              flipkartVendors: flipkartVendors,
              alibabaVendors: alibabaVendors
            });
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function searchVendors(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.searchVendors = searchVendors;