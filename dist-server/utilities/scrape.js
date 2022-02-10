"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchVendors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var amazonUrl = 'https://www.amazon.com';
var flipkartUrl = 'https://www.flipkart.com';
var alibabaUrl = 'https://www.alibaba.com/trade/search?SearchText=';
var waitUntil = 'domcontentloaded';

var getFlipkartVendors = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(browser, productName) {
    var _productList$, _productList$2, _productList$3;

    var page, productList, productDetails, page1, productDetails1, page2, productDetails2, page3, productDetails3;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return browser.newPage();

          case 2:
            page = _context.sent;
            _context.next = 5;
            return page["goto"]("".concat(flipkartUrl, "/search?q=").concat(productName), {
              waitUntil: waitUntil
            });

          case 5:
            _context.next = 7;
            return page.waitForSelector('body');

          case 7:
            _context.next = 9;
            return page.evaluate(function () {
              var results = [];
              var items = document.querySelectorAll('a._1fQZEK');
              items.forEach(function (item, index) {
                if (index < 3) {
                  results.push({
                    url: item.getAttribute('href'),
                    text: item.innerText
                  });
                }
              });
              return results;
            });

          case 9:
            productList = _context.sent;
            productDetails = []; // first product

            _context.next = 13;
            return browser.newPage();

          case 13:
            page1 = _context.sent;
            _context.next = 16;
            return page1["goto"](flipkartUrl + ((_productList$ = productList[0]) === null || _productList$ === void 0 ? void 0 : _productList$.url), {
              waitUntil: waitUntil
            });

          case 16:
            _context.next = 18;
            return page1.waitForSelector('body');

          case 18:
            _context.next = 20;
            return getProductDetailsFromFlipkart(page1);

          case 20:
            productDetails1 = _context.sent;
            _context.next = 23;
            return browser.newPage();

          case 23:
            page2 = _context.sent;
            _context.next = 26;
            return page2["goto"](flipkartUrl + ((_productList$2 = productList[1]) === null || _productList$2 === void 0 ? void 0 : _productList$2.url), {
              waitUntil: waitUntil
            });

          case 26:
            _context.next = 28;
            return page2.waitForSelector('body');

          case 28:
            _context.next = 30;
            return getProductDetailsFromFlipkart(page2);

          case 30:
            productDetails2 = _context.sent;
            _context.next = 33;
            return browser.newPage();

          case 33:
            page3 = _context.sent;
            _context.next = 36;
            return page3["goto"](flipkartUrl + ((_productList$3 = productList[2]) === null || _productList$3 === void 0 ? void 0 : _productList$3.url), {
              waitUntil: waitUntil
            });

          case 36:
            _context.next = 38;
            return page3.waitForSelector('body');

          case 38:
            _context.next = 40;
            return getProductDetailsFromFlipkart(page3);

          case 40:
            productDetails3 = _context.sent;
            return _context.abrupt("return", [].concat(productDetails, [productDetails1, productDetails2, productDetails3]));

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getFlipkartVendors(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getAmazonVendors = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(browser, productName) {
    var _productList$4, _productList$5, _productList$6, _productList$7, _productList$8, _productList$9;

    var page, productList, productDetails, page1, productDetails1, page2, productDetails2, page3, productDetails3;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return browser.newPage();

          case 2:
            page = _context2.sent;
            _context2.next = 5;
            return page["goto"]("".concat(amazonUrl, "/s?k=").concat(productName), {
              waitUntil: waitUntil
            });

          case 5:
            _context2.next = 7;
            return page.waitForSelector('body');

          case 7:
            _context2.next = 9;
            return page.evaluate(function () {
              var results = [];
              var images = document.querySelectorAll('img.s-image');
              var items = document.querySelectorAll('a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal');
              items.forEach(function (item, index) {
                var _images$index;

                if (index < 3) results.push({
                  url: item.getAttribute('href'),
                  imageUrl: (_images$index = images[index]) === null || _images$index === void 0 ? void 0 : _images$index.getAttribute('src')
                });
              });
              return results;
            });

          case 9:
            productList = _context2.sent;
            productDetails = []; // first product

            _context2.next = 13;
            return browser.newPage();

          case 13:
            page1 = _context2.sent;
            _context2.next = 16;
            return page1["goto"](amazonUrl + ((_productList$4 = productList[0]) === null || _productList$4 === void 0 ? void 0 : _productList$4.url), {
              waitUntil: waitUntil
            });

          case 16:
            _context2.next = 18;
            return getProductDetailsFromAmazon(page1);

          case 18:
            productDetails1 = _context2.sent;
            _context2.next = 21;
            return browser.newPage();

          case 21:
            page2 = _context2.sent;
            _context2.next = 24;
            return page2["goto"](amazonUrl + ((_productList$5 = productList[1]) === null || _productList$5 === void 0 ? void 0 : _productList$5.url), {
              waitUntil: waitUntil
            });

          case 24:
            _context2.next = 26;
            return getProductDetailsFromAmazon(page2);

          case 26:
            productDetails2 = _context2.sent;
            _context2.next = 29;
            return browser.newPage();

          case 29:
            page3 = _context2.sent;
            _context2.next = 32;
            return page3["goto"](amazonUrl + ((_productList$6 = productList[2]) === null || _productList$6 === void 0 ? void 0 : _productList$6.url), {
              waitUntil: waitUntil
            });

          case 32:
            _context2.next = 34;
            return getProductDetailsFromAmazon(page3);

          case 34:
            productDetails3 = _context2.sent;
            return _context2.abrupt("return", [].concat(productDetails, [_objectSpread(_objectSpread({}, productDetails1), {}, {
              imageUrl: (_productList$7 = productList[0]) === null || _productList$7 === void 0 ? void 0 : _productList$7.imageUrl
            }), _objectSpread(_objectSpread({}, productDetails2), {}, {
              imageUrl: (_productList$8 = productList[1]) === null || _productList$8 === void 0 ? void 0 : _productList$8.imageUrl
            }), _objectSpread(_objectSpread({}, productDetails3), {}, {
              imageUrl: (_productList$9 = productList[2]) === null || _productList$9 === void 0 ? void 0 : _productList$9.imageUrl
            })]));

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAmazonVendors(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getProductDetailsFromAmazon = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(page) {
    var productDetails;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return page.evaluate(function () {
              var results = {};
              var productName = document.querySelector('#productTitle');
              var productRating = document.querySelector('span.a-icon-alt');
              var productPrice = document.querySelector('span.a-offscreen');
              results = {
                name: productName.innerHTML.trim(),
                rating: productRating.innerHTML.substring(0, 3),
                price: productPrice.innerHTML
              };
              return results;
            });

          case 2:
            productDetails = _context3.sent;
            return _context3.abrupt("return", productDetails);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getProductDetailsFromAmazon(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var getAlibabaVendors = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(productName) {
    var browser, page;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _puppeteer["default"].launch({
              headless: false
            });

          case 2:
            browser = _context4.sent;
            _context4.next = 5;
            return browser.newPage();

          case 5:
            page = _context4.sent;
            _context4.next = 8;
            return page["goto"](alibabaUrl + productName, {
              waitUntil: waitUntil
            });

          case 8:
            _context4.next = 10;
            return page.waitForSelector('body');

          case 10:
            return _context4.abrupt("return", 'alibaba');

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getAlibabaVendors(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

var getProductDetailsFromFlipkart = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(page) {
    var productDetails;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return page.evaluate(function () {
              var results = {};
              var productImage = document.querySelector('img._396cs4');
              var productName = document.querySelector('span.B_NuCI');
              var productRating = document.querySelector('div._3LWZlK');
              var productPrice = document.querySelector('div._30jeq3._16Jk6d');
              results = {
                imageUrl: productImage.getAttribute('srcset'),
                name: productName.innerHTML,
                rating: productRating.innerHTML.substring(0, 3),
                price: productPrice.innerHTML
              };
              return results;
            });

          case 2:
            productDetails = _context5.sent;
            return _context5.abrupt("return", productDetails);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getProductDetailsFromFlipkart(_x7) {
    return _ref5.apply(this, arguments);
  };
}();

var searchVendors = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var browser, productName, flipKartProducts, amazonProducts;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _puppeteer["default"].launch({
              headless: false
            });

          case 3:
            browser = _context6.sent;
            productName = req.query.productName;
            _context6.next = 7;
            return getFlipkartVendors(browser, productName);

          case 7:
            flipKartProducts = _context6.sent;
            _context6.next = 10;
            return getAmazonVendors(browser, productName);

          case 10:
            amazonProducts = _context6.sent;
            res.send({
              amazonVendors: amazonProducts,
              flipkartVendors: flipKartProducts
            });
            _context6.next = 17;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);
            next(_context6.t0);

          case 17:
            _context6.prev = 17;
            _context6.next = 20;
            return browser.close();

          case 20:
            return _context6.finish(17);

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 14, 17, 21]]);
  }));

  return function searchVendors(_x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.searchVendors = searchVendors;