"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchVendors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var amazonUrl = 'https://www.amazon.com';
var flipkartUrl = 'https://www.flipkart.com';
var ebayUrl = 'https://www.ebay.com';
var waitUntil = 'domcontentloaded';

var getFlipkartVendors = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(browser, productName) {
    var page, productList;
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
            return page.evaluate(function () {
              var results = [];
              var images = document.querySelectorAll('._13oc-S img._396cs4._3exPp9');
              var ratings = document.querySelectorAll('._13oc-S div._3LWZlK');
              var prices = document.querySelectorAll('._13oc-S ._30jeq3._1_WHN1');
              images.forEach(function (item, index) {
                if (index < 3) {
                  var _ratings$index, _prices$index$innerHT, _prices$index;

                  results.push({
                    name: item.getAttribute('alt'),
                    imageUrl: item.getAttribute('src'),
                    rating: (_ratings$index = ratings[index]) === null || _ratings$index === void 0 ? void 0 : _ratings$index.innerHTML.trim().substring(0, 3),
                    price: (_prices$index$innerHT = (_prices$index = prices[index]) === null || _prices$index === void 0 ? void 0 : _prices$index.innerHTML) !== null && _prices$index$innerHT !== void 0 ? _prices$index$innerHT : 'price not available'
                  });
                }
              });
              return results;
            });

          case 7:
            productList = _context.sent;
            return _context.abrupt("return", productList);

          case 9:
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
    var page, productList;
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
            return page.evaluate(function () {
              var results = [];
              var images = document.querySelectorAll('img.s-image');
              var ratings = document.querySelectorAll('.a-section .a-row.a-size-small .a-icon-alt');
              var prices = document.querySelectorAll('.a-section .a-price .a-offscreen');
              images.forEach(function (item, index) {
                if (index < 3) {
                  var _ratings$index2, _prices$index$innerHT2, _prices$index2;

                  results.push({
                    name: item.getAttribute('alt'),
                    imageUrl: item.getAttribute('src'),
                    rating: (_ratings$index2 = ratings[index]) === null || _ratings$index2 === void 0 ? void 0 : _ratings$index2.innerHTML.trim().substring(0, 3),
                    price: (_prices$index$innerHT2 = (_prices$index2 = prices[index]) === null || _prices$index2 === void 0 ? void 0 : _prices$index2.innerHTML) !== null && _prices$index$innerHT2 !== void 0 ? _prices$index$innerHT2 : 'price not available'
                  });
                }
              });
              return results;
            });

          case 7:
            productList = _context2.sent;
            return _context2.abrupt("return", productList);

          case 9:
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

var getEbayVendors = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(browser, productName) {
    var page, productList;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return browser.newPage();

          case 2:
            page = _context3.sent;
            _context3.next = 5;
            return page["goto"]("".concat(ebayUrl, "/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=").concat(productName), {
              waitUntil: waitUntil
            });

          case 5:
            _context3.next = 7;
            return page.evaluate(function () {
              var results = [];
              var images = document.querySelectorAll('.s-item.s-item__pl-on-bottom.s-item--watch-at-corner img.s-item__image-img');
              var names = document.querySelectorAll('.s-item.s-item__pl-on-bottom.s-item--watch-at-corner h3.s-item__title');
              var ratings = document.querySelectorAll('.s-item.s-item__pl-on-bottom.s-item--watch-at-corner .x-star-rating span.clipped');
              var prices = document.querySelectorAll('.s-item.s-item__pl-on-bottom.s-item--watch-at-corner .s-item__details.clearfix span.s-item__price');
              images.forEach(function (item, index) {
                if (index < 3) {
                  var _names$index, _ratings$index3, _prices$index3;

                  results.push({
                    name: (_names$index = names[index]) === null || _names$index === void 0 ? void 0 : _names$index.innerHTML,
                    imageUrl: item.getAttribute('src'),
                    rating: (_ratings$index3 = ratings[index]) === null || _ratings$index3 === void 0 ? void 0 : _ratings$index3.innerHTML.trim().substring(0, 3),
                    price: (_prices$index3 = prices[index]) === null || _prices$index3 === void 0 ? void 0 : _prices$index3.innerHTML
                  });
                }
              });
              return results;
            });

          case 7:
            productList = _context3.sent;
            return _context3.abrupt("return", productList);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getEbayVendors(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var searchVendors = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var browser, productName, _yield$Promise$all, _yield$Promise$all2, amazonVendors, ebayVendors, flipkartVendors;

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
            _context4.next = 7;
            return Promise.all([getAmazonVendors(browser, productName), getEbayVendors(browser, productName), getFlipkartVendors(browser, productName)]);

          case 7:
            _yield$Promise$all = _context4.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 3);
            amazonVendors = _yield$Promise$all2[0];
            ebayVendors = _yield$Promise$all2[1];
            flipkartVendors = _yield$Promise$all2[2];
            res.send({
              amazonVendors: amazonVendors,
              ebayVendors: ebayVendors,
              flipkartVendors: flipkartVendors
            });
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 18:
            _context4.prev = 18;
            _context4.next = 21;
            return browser.close();

          case 21:
            return _context4.finish(18);

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15, 18, 22]]);
  }));

  return function searchVendors(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.searchVendors = searchVendors;