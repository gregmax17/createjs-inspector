"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addResource = exports.init = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Inspector = _interopRequireDefault(require("./Inspector"));

var _DisplayObjectContext = require("./DisplayObjectContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var refInspector;

var init = function init(options) {
  console.log("stage: ", stage);

  if (!options.createjs) {
    throw "No CreateJS property was passed";
  } // create the element


  if (!options.element) {
    var element = document.createElement("div");
    element.style.position = "absolute";
    element.style.top = "0";
    element.style.width = "100%"; // add to body

    document.body.appendChild(element); // assign as property

    options.element = element;
  } // get the element by the id
  else if (typeof options.element === "string") {
      options.element = document.getElementById(options.element);
    } // render it


  _reactDom["default"].render(_react["default"].createElement(_DisplayObjectContext.DisplayObjectProvider, null, _react["default"].createElement(_Inspector["default"], {
    stage: options.stage,
    createjs: options.createjs,
    ref: function ref(_ref) {
      return refInspector = _ref;
    }
  })), options.element);
}; // TODO
// let the user add a sprite or bitmap reference


exports.init = init;

var addResource = function addResource() {
  console.log(refInspector);
};

exports.addResource = addResource;