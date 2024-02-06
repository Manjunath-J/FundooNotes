"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishMessage = publishMessage;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var amqp = require('amqplib');
function publishMessage() {
  return _publishMessage.apply(this, arguments);
}
function _publishMessage() {
  _publishMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var connection, channel, queueName, message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return amqp.connect('amqp://localhost');
        case 2:
          connection = _context.sent;
          _context.next = 5;
          return connection.createChannel();
        case 5:
          channel = _context.sent;
          // Declare a queue
          queueName = 'myQueue';
          _context.next = 9;
          return channel.assertQueue(queueName, {
            durable: false
          });
        case 9:
          // Send a message to the queue
          message = 'Connected to RabbitMQ!';
          channel.sendToQueue(queueName, Buffer.from(message));
          console.log("Sent: ".concat(message));

          // Close the connection
          setTimeout(function () {
            connection.close();
            // process.exit(0);
          }, 500);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _publishMessage.apply(this, arguments);
}