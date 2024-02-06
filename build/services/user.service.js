"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.logIn = exports.forgotPassword = exports.createUser = exports.authenticateToken = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _hashPassword = require("./hashPassword");
var _user2 = require("../utils/user.util");
//create new user
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data, hashedPassword;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          data = _context.sent;
          if (!data) {
            _context.next = 5;
            break;
          }
          throw new Error('User already Exists');
        case 5:
          _context.next = 7;
          return (0, _hashPassword.hashPassword)(body.password);
        case 7:
          hashedPassword = _context.sent;
          body.password = hashedPassword;
          _context.next = 11;
          return _user["default"].create(body);
        case 11:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var jwt = require('jsonwebtoken');

//User Sign-In
var logIn = exports.logIn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data, result, payload, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          data = _context2.sent;
          if (data) {
            _context2.next = 5;
            break;
          }
          throw new Error('User not Found');
        case 5:
          _context2.next = 7;
          return (0, _hashPassword.verifyPassword)(body.password, data.password);
        case 7:
          result = _context2.sent;
          if (result) {
            _context2.next = 10;
            break;
          }
          throw new Error('Password Mismatch.');
        case 10:
          payload = {
            UserID: data._id
          }; // const expiresIn = "1h";
          token = jwt.sign(payload, process.env.SECRET_KEY);
          return _context2.abrupt("return", token);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function logIn(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var forgotPassword = exports.forgotPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          data = _context3.sent;
          if (data) {
            _context3.next = 5;
            break;
          }
          throw new Error('User not Found');
        case 5:
          token = jwt.sign({
            email: body.email
          }, process.env.FORGOT_PASSWORD_KEY);
          (0, _user2.sendResetMail)(body.email, token);
          return _context3.abrupt("return", token);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function forgotPassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var resetPassword = exports.resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var hashedPassword, pwd;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _hashPassword.hashPassword)(body.password);
        case 2:
          hashedPassword = _context4.sent;
          body.password = hashedPassword;
          _context4.next = 6;
          return _user["default"].findOneAndUpdate({
            email: body.email
          }, body, {
            "new": true
          });
        case 6:
          pwd = _context4.sent;
          return _context4.abrupt("return", pwd);
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function resetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var authenticateToken = exports.authenticateToken = function authenticateToken(req, res) {
  var token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  try {
    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    res.json({
      message: 'Token Veification Successfull',
      decoded: decoded
    });
    return decoded;
  } catch (error) {
    throw new Error(error);
  }
};