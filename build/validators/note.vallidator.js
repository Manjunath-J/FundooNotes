"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newNoteValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var newNoteValidator = exports.newNoteValidator = function newNoteValidator(req, res, next) {
  var schema = _joi["default"].object({
    Title: _joi["default"].string().min(5).required(),
    Description: _joi["default"].string().min(6).required(),
    color: _joi["default"].string().min(3),
    isArchieved: _joi["default"]["boolean"](),
    isDeleted: _joi["default"]["boolean"](),
    UserID: _joi["default"].string()
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