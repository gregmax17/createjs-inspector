"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./styles.scss");

var _react = _interopRequireWildcard(require("react"));

var _Hierarchy = _interopRequireDefault(require("./Hierarchy"));

var _Properties = _interopRequireDefault(require("./Properties"));

var _DisplayObjectContext = require("./DisplayObjectContext");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var key = {};
var drag = {
  x: null,
  y: null
};

var Inspector = /*#__PURE__*/function (_Component) {
  _inherits(Inspector, _Component);

  function Inspector(props) {
    var _this;

    _classCallCheck(this, Inspector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Inspector).call(this, props)); // extend the container to make it recursive

    _defineProperty(_assertThisInitialized(_this), "tickHandler", function (event) {
      var displayObject = _this.context.displayObject;

      if (!displayObject) {
        return;
      } // are we dragging anything?


      if (key.d && drag.x !== null && drag.y !== null) {
        var pt = displayObject.parent.globalToLocal(_this.props.stage.mouseX, _this.props.stage.mouseY);
        var x = pt.x - drag.x;
        var y = pt.y - drag.y;
        var axisX = 0;
        var axisY = 0; // just along the X or Y axis, or both

        if (key.x) axisX = 1;
        if (key.y) axisY = 1;
        if (!axisX && !axisY) axisX = 1, axisY = 1; // if shift key is held down, round it

        if (!key.shift) {
          x = Math.round(x);
          y = Math.round(y);
        } // drag the mask


        if (key.w && displayObject.mask) {
          if (axisX) displayObject.mask.x = x;
          if (axisY) displayObject.mask.y = y;
        } // drag hit area
        else if (key.h && displayObject.hitArea) {
            if (axisX) displayObject.hitArea.x = x;
            if (axisY) displayObject.hitArea.y = y;
          } // just drag the display object
          else {
              if (axisX) displayObject.x = x;
              if (axisY) displayObject.y = y;
            } // update


        _this.context.setDisplayObject(displayObject);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "stageHandler", function (event) {
      // possibly start dragging, set the drag point
      if (event.type === "stagemousedown") {
        // annoying input fields
        document.querySelectorAll("input").forEach(function (input) {
          return input.blur();
        });
        document.querySelectorAll("select").forEach(function (select) {
          return select.blur();
        });
        var displayObject = _this.context.displayObject;

        if (displayObject) {
          var pt = displayObject.parent.globalToLocal(_this.props.stage.mouseX, _this.props.stage.mouseY);
          drag.x = pt.x - displayObject.x;
          drag.y = pt.y - displayObject.y;
        }
      } // stops dragging
      else {
          drag.x = drag.y = null;
        }
    });

    _defineProperty(_assertThisInitialized(_this), "wheelHandler", function (event) {
      event.preventDefault();
      var displayObject = _this.context.displayObject;

      if (!displayObject) {
        return;
      } // direction of the mouse wheel


      var dir = Math.sign(event.deltaY); // over an element ;)

      if (event.target instanceof HTMLInputElement && event.target.type === "text") {
        var value = parseFloat(event.target.value); // update value

        var property = event.target.name; // property name

        if ((0, _utils.isNumber)(value)) {
          var amount = (/(scale|alpha)/i.test(property) ? 0.1 : 1) * dir; // update display object's property
          // console.log(property, displayObject[property], amount);

          displayObject[property] += amount; // update context

          _this.context.setDisplayObject(displayObject);
        }
      } // if we are over the canvas
      else if (event.target === _this.props.stage.canvas) {
          // the property we are editing
          var _property = displayObject; // mask or hit area was selected

          if (key.w && displayObject.mask) {
            _property = displayObject.mask;
          } else if (key.h && displayObject.hitArea) {
            _property = displayObject.hitArea;
          } // scale


          if (key.s) {
            var x = 0,
                y = 0;
            if (key.x) x = 1; // just horizontally

            if (key.y) y = 1; // vertically

            if (!x && !y) x = 1, y = 1; // both

            if (x) _property.scaleX += 0.1 * dir;
            if (y) _property.scaleY += 0.1 * dir;
          } // alpha
          else if (key.a) {
              _property.alpha += 0.1 * dir;
            } // rotation
            else if (key.r) {
                _property.rotation += 10 * dir;
              } // update context


          _this.context.setDisplayObject(displayObject);
        }
    });

    _defineProperty(_assertThisInitialized(_this), "keyHandler", function (event) {
      var displayObject = _this.context.displayObject;

      if (!displayObject) {
        return;
      }

      var theKey = event.key.toLowerCase();
      key[theKey] = event.type === "keydown"; // did we press an arrow key

      if (event.type === "keydown" && key.d && event.key.search(/arrow/i) === 0) {
        event.preventDefault();

        if (/left/i.test(event.key)) {
          (0, _utils.updateProperty)(_this.context, "x", --displayObject.x);
        }

        if (/right/i.test(event.key)) {
          (0, _utils.updateProperty)(_this.context, "x", ++displayObject.x);
        }

        if (/up/i.test(event.key)) {
          (0, _utils.updateProperty)(_this.context, "y", --displayObject.y);
        }

        if (/down/i.test(event.key)) {
          (0, _utils.updateProperty)(_this.context, "y", ++displayObject.y);
        }
      } // arrow key released
      else if (event.type === "keyup" && event.target instanceof HTMLInputElement && /(arrowup|arrowdown)/.test(theKey)) {
          event.preventDefault();
          var dir = /down/.test(theKey) ? -1 : 1;
          var name = event.target.name;
          var value = parseFloat(event.target.value);

          if ((0, _utils.isNumber)(value)) {
            var amount = (/scale|alpha/i.test(name) ? 0.1 : 1) * dir;
            (0, _utils.updateProperty)(_this.context, name, value + amount);
          }
        }
    });

    _this.props.createjs.Container.prototype.getChildById = function (id, deep) {
      var kids = this.children,
          l = kids.length,
          i = 0,
          kid = null;

      for (; i < l && !kid; i++) {
        if (kids[i].id === id) {
          kid = kids[i];
        } else if (deep && kids[i].children) {
          kid = kids[i].getChildById(id, deep);
        }
      }

      return kid;
    }; // events applied to the stage, hopefully they don't get removed


    _this.props.stage.on("stagemousedown", _this.stageHandler);

    _this.props.stage.on("stagemouseup", _this.stageHandler); // same with this


    _this.props.createjs.Ticker.on("tick", _this.tickHandler); // events on the window and document


    window.addEventListener("mousewheel", _this.wheelHandler, {
      passive: false
    });
    document.addEventListener("keydown", _this.keyHandler, false);
    document.addEventListener("keyup", _this.keyHandler, false);
    return _this;
  }

  _createClass(Inspector, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_Hierarchy["default"], {
        stage: this.props.stage,
        createjs: this.props.createjs
      }), _react["default"].createElement(_Properties["default"], {
        createjs: this.props.createjs
      }));
    }
  }]);

  return Inspector;
}(_react.Component);

_defineProperty(Inspector, "contextType", _DisplayObjectContext.DisplayObjectContext);

var _default = Inspector;
exports["default"] = _default;