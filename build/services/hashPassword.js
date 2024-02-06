"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var bcrypt = require('bcrypt');

//Hashing the password 
function hashPassword(_x) {
  return _hashPassword.apply(this, arguments);
} //verify a password against a hashed one
function _hashPassword() {
  _hashPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            bcrypt.hash(password, 10, function (err, hash) {
              if (err) {
                reject(err);
              } else {
                resolve(hash);
              }
            });
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _hashPassword.apply(this, arguments);
}
function verifyPassword(_x2, _x3) {
  return _verifyPassword.apply(this, arguments);
}
function _verifyPassword() {
  _verifyPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(plainPassword, hashedPassword) {
    var isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return bcrypt.compare(plainPassword, hashedPassword);
        case 3:
          isMatch = _context2.sent;
          return _context2.abrupt("return", isMatch);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _verifyPassword.apply(this, arguments);
}