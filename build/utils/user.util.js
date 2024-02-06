"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResetMail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // user: process.env.EMAIL,
    // pass: process.env.EMAIL_PASSWORD,
    user: 'fundoo.notes.demo@gmail.com',
    pass: 'ssoq nmbw jpaw vqkf'
  }
});
var sendResetMail = exports.sendResetMail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, token) {
    var mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          mailOptions = {
            from: 'FunDooNotes <fundoo.notes.demo@gmail.com>',
            to: email,
            subject: 'Reset Password',
            text: "Hello!.... \nYour reset token:\n".concat(token)
          };
          _context.next = 4;
          return transporter.sendMail(mailOptions);
        case 4:
          _context.next = 9;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function sendResetMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();