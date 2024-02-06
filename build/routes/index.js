"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("./user.route"));
var _note = _interopRequireDefault(require("./note.route"));
var router = _express["default"].Router();
var routes = function routes() {
  router.get('/', function (req, res) {
    res.json('Welcome');
  });
  router.use('/User', _user["default"]);
  router.use('/Notes', _note["default"]);
  return router;
};
var _default = exports["default"] = routes;