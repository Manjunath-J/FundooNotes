"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.newNote = exports.isDeleted = exports.isArchieved = exports.getNote = exports.getAllNotes = exports.deleteNote = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = require("chai");
var _note = _interopRequireDefault(require("../models/note.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _redis = require("../config/redis");
var _express = require("express");
//get all Notes
var getAllNotes = exports.getAllNotes = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
    var data, key;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _note["default"].find({
            UserID: userId
          });
        case 3:
          data = _context.sent;
          if (data) {
            _context.next = 6;
            break;
          }
          throw new Error("User doesn't have Access.");
        case 6:
          key = userId;
          _redis.client.set(key, JSON.stringify(data));
          return _context.abrupt("return", data);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function getAllNotes(_x) {
    return _ref.apply(this, arguments);
  };
}();

//create new Note
var newNote = exports.newNote = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data, userId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _note["default"].create(body);
        case 3:
          data = _context2.sent;
          userId = body.UserID;
          _redis.client.del(userId);
          return _context2.abrupt("return", data);
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function newNote(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

//update single Note
var updateNote = exports.updateNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, userId, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _note["default"].findOneAndUpdate({
            _id: _id,
            UserID: userId
          }, body, {
            "new": true
          });
        case 3:
          data = _context3.sent;
          if (data) {
            _context3.next = 6;
            break;
          }
          throw new Error("User doesn't have Access.");
        case 6:
          _redis.client.del(userId);
          return _context3.abrupt("return", data);
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          throw new Error(_context3.t0);
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function updateNote(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

//delete single Note
var deleteNote = exports.deleteNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, userId) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _note["default"].findOneAndDelete({
            _id: id,
            UserID: userId
          });
        case 3:
          data = _context4.sent;
          if (data) {
            _context4.next = 6;
            break;
          }
          throw new Error("User doesn't have Access.");
        case 6:
          _redis.client.del(userId);
          return _context4.abrupt("return", '');
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function deleteNote(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

//get single Note
var getNote = exports.getNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, userId) {
    var data, key;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _note["default"].findOne({
            _id: id,
            UserID: userId
          });
        case 3:
          data = _context5.sent;
          if (data) {
            _context5.next = 6;
            break;
          }
          throw new Error("User doesn't have Access.");
        case 6:
          _redis.client.del(userId);
          key = id;
          _redis.client.set(key, JSON.stringify(data));
          return _context5.abrupt("return", data);
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          throw new Error(_context5.t0);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function getNote(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();
var isArchieved = exports.isArchieved = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, userId) {
    var data, body;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _note["default"].findById(_id);
        case 3:
          data = _context6.sent;
          body = {
            isArchieved: !data.isArchieved
          };
          _context6.next = 7;
          return _note["default"].findOneAndUpdate({
            _id: _id,
            UserID: userId
          }, body, {
            "new": true
          });
        case 7:
          data = _context6.sent;
          if (data) {
            _context6.next = 10;
            break;
          }
          throw new Error("User doesn't have Access.");
        case 10:
          _redis.client.del(userId);
          return _context6.abrupt("return", data);
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          throw new Error(_context6.t0);
        case 17:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function isArchieved(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var isDeleted = exports.isDeleted = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_id, userId) {
    var data, body;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _note["default"].findById(_id);
        case 3:
          data = _context7.sent;
          body = {
            isDeleted: !data.isDeleted
          };
          _context7.next = 7;
          return _note["default"].findOneAndUpdate({
            UserID: userId,
            _id: _id
          }, body, {
            "new": true
          });
        case 7:
          data = _context7.sent;
          if (data) {
            _context7.next = 10;
            break;
          }
          throw new Error("User doesn't have Access.");
        case 10:
          _redis.client.del(userId);
          return _context7.abrupt("return", data);
        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          throw new Error(_context7.t0);
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function isDeleted(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();