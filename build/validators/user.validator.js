"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siginValidator = exports.passwordValidator = exports.newUserValidator = exports.emailValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(4).required(),
    lastName: _joi["default"].string().min(1).required(),
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(8).required().pattern(regex)
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      message: "".concat(error)
    });
  } else {
    req.validatedBody = value;
    next();
  }
};
var siginValidator = exports.siginValidator = function siginValidator(req, res, next) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(8).required().pattern(regex)
  });
  var _schema$validate2 = schema.validate(req.body),
    error = _schema$validate2.error,
    value = _schema$validate2.value;
  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      message: "".concat(error)
    });
  } else {
    req.validatedBody = value;
    next();
  }
};
var emailValidator = exports.emailValidator = function emailValidator(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required()
  });
  var _schema$validate3 = schema.validate(req.body),
    error = _schema$validate3.error,
    value = _schema$validate3.value;
  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      message: "".concat(error)
    });
  } else {
    req.validatedBody = value;
    next();
  }
};
var passwordValidator = exports.passwordValidator = function passwordValidator(req, res, next) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  var schema = _joi["default"].object({
    password: _joi["default"].string().min(8).required().pattern(regex)
  });
  var _schema$validate4 = schema.validate(req.body),
    error = _schema$validate4.error,
    value = _schema$validate4.value;
  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      message: "".concat(error)
    });
  } else {
    req.validatedBody = value;
    next();
  }
};