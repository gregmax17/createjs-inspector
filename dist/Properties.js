"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDraggable = _interopRequireDefault(require("react-draggable"));

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

var Properties = /*#__PURE__*/function (_Component) {
  _inherits(Properties, _Component);

  function Properties(props) {
    var _this;

    _classCallCheck(this, Properties);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Properties).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      event.preventDefault();
      var createjs = _this.props.createjs;
      var displayObject = _this.context.displayObject;
      var property = event.target.name;
      var value = event.target.value; // adds/removes the hit area

      if (property === "hitArea") {
        value = displayObject.hitArea ? null : new createjs.Shape(new createjs.Graphics().f("#fff").dc(0, 0, 32));
      } // adds/removes the mask
      else if (property === "mask") {
          value = displayObject.mask ? null : new createjs.Shape(new createjs.Graphics().f("#fff").dc(0, 0, 32));
        } // adds/removes the source rect for bitmaps
        else if (property === "sourceReact") {
            value = displayObject.sourceReact ? null : new createjs.Shape(new createjs.Graphics().f("#fff").dr(0, 0, 32, 32));
          } // adds/removes the shadow
          else if (property === "shadow") {
              value = displayObject.shadow ? null : new createjs.Shadow("#000", 0, 8, 0);
            } // adds/removes the cache canvas on it
            else if (property === "cacheCanvas") {
                if (displayObject.cacheCanvas) {
                  displayObject.cacheCanvas = displayObject.bitmapCache = null;
                } else {
                  var b = displayObject.getBounds();
                  displayObject.cache(b.x, b.y, b.width, b.height);
                }

                return;
              } // make a duplicate
              else if (property === "clone") {
                  var clone = displayObject.clone(true);
                  displayObject.parent.addChild(clone);

                  _this.context.setDisplayObject(clone);

                  return;
                } // removes it
                else if (property === "remove") {
                    displayObject.parent.removeChild(displayObject);

                    _this.context.setDisplayObject(null);

                    return;
                  } // for boolean values


      if (event.target.type === "checkbox") {
        value = event.target.checked;
      } // finally we get to update it


      (0, _utils.updateProperty)(_this.context, property, value);
    });

    _this.wasShowing = false;
    _this.state = {
      show: false
    };
    return _this;
  } // I like to use if statements, a little too much maybe


  _createClass(Properties, [{
    key: "showProperties",
    value: function showProperties(displayObject) {
      var type = (0, _utils.getType)(this.props.createjs, displayObject); // console.log('showing');

      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dl", null, _react["default"].createElement("dt", null, "visible"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "checkbox",
        name: "visible",
        defaultChecked: displayObject.visible,
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "name"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "name",
        value: displayObject.name || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "x/y/zIndex"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "x",
        value: displayObject.x,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "y",
        value: displayObject.y,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "zIndex",
        value: displayObject.zIndex,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "scale x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "scaleX",
        value: displayObject.scaleX,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "scaleY",
        value: displayObject.scaleY,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "reg x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "regX",
        value: displayObject.regX,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "regY",
        value: displayObject.regY,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "skew x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "skewX",
        value: displayObject.skewX,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "skewY",
        value: displayObject.skewY,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "rotation"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "rotation",
        value: displayObject.rotation,
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "alpha"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "alpha",
        value: displayObject.alpha,
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "cursor"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "cursor",
        value: displayObject.cursor || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "mouseEnabled"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "checkbox",
        name: "mouseEnabled",
        defaultChecked: !!displayObject.mouseEnabled,
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "tickEnabled"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "checkbox",
        name: "tickEnabled",
        defaultChecked: !!displayObject.tickEnabled,
        onChange: this.onChange
      })), type === "text" && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "text"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "text",
        value: displayObject.text || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "font"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "font",
        value: displayObject.font || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "color"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "color",
        name: "color",
        value: displayObject.color || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "textAlign"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "textAlign",
        value: displayObject.textAlign || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "textBaseline"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "textBaseline",
        value: displayObject.textBaseline || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "outline"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "outline",
        value: displayObject.outline || "",
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "line width/height"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "lineWidth",
        value: displayObject.lineWidth || "",
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "lineHeight",
        value: displayObject.lineHeight || "",
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "maxWidth"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "maxWidth",
        value: displayObject.maxWidth || "",
        onChange: this.onChange,
        size: "6"
      }))), type === "bitmap" && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "sourceRect"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "button",
        name: "sourceRect",
        value: "sourceRect",
        onClick: this.onChange
      })), displayObject.sourceRect && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "sourceRect.x",
        value: displayObject.sourceRect.x,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "sourceRect.y",
        value: displayObject.sourceRect.y,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "width/height"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "sourceRect.width",
        value: displayObject.sourceRect.width,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "sourceRect.height",
        value: displayObject.sourceRect.height,
        onChange: this.onChange,
        size: "6"
      })))), type === "sprite" && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "spriteSheet"), _react["default"].createElement("dd", null, _react["default"].createElement("select", {
        name: "spriteSheet",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "currentAnimation"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "currentAnimation",
        value: displayObject.currentAnimation || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "currentAnimationFrame"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "currentAnimationFrame",
        value: displayObject.currentAnimationFrame || "",
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "framerate"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "framerate",
        value: displayObject.framerate,
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "paused"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "checkbox",
        name: "paused",
        defaultChecked: displayObject.paused,
        onChange: this.onChange
      }))), type === "container" && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "mouseChildren"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "checkbox",
        name: "mouseChildren",
        defaultChecked: displayObject.mouseChildren,
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "tickChildren"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "checkbox",
        name: "tickChildren",
        defaultChecked: displayObject.tickChildren,
        onChange: this.onChange
      }))), _react["default"].createElement("dt", null, "hitArea"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "button",
        name: "hitArea",
        value: displayObject.hitArea ? "remove hitArea" : "add hitArea",
        onClick: this.onChange
      })), displayObject.hitArea && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "- x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "hitArea.x",
        value: displayObject.hitArea.x,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "hitArea.y",
        value: displayObject.hitArea.y,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "- scale x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "hitArea.scaleX",
        value: displayObject.hitArea.scaleX,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "hitArea.scaleY",
        value: displayObject.hitArea.scaleY,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "- reg x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "hitArea.regX",
        value: displayObject.hitArea.regX,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "hitArea.regY",
        value: displayObject.hitArea.regY,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "- rotation"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "hitArea.rotation",
        value: displayObject.hitArea.rotation,
        onChange: this.onChange
      }))), _react["default"].createElement("dt", null, "mask"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "button",
        name: "mask",
        value: displayObject.mask ? "remove mask" : "add mask",
        onClick: this.onChange
      })), displayObject.mask && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "- x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "mask.x",
        value: displayObject.mask.x,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "mask.y",
        value: displayObject.mask.y,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "- scale x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "mask.scaleX",
        value: displayObject.mask.scaleX,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "mask.scaleY",
        value: displayObject.mask.scaleY,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "- reg x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "mask.regX",
        value: displayObject.mask.regX,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "mask.regY",
        value: displayObject.mask.regY,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "- rotation"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "mask.rotation",
        value: displayObject.mask.rotation,
        onChange: this.onChange
      }))), _react["default"].createElement("dt", null, "shadow"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "button",
        name: "shadow",
        value: displayObject.shadow ? "remove shadow" : "add shadow",
        onClick: this.onChange
      })), displayObject.shadow && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "- color"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "color",
        name: "shadow.color",
        value: displayObject.shadow.color,
        onChange: this.onChange
      })), _react["default"].createElement("dt", null, "- offset x/y"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "shadow.offsetX",
        value: displayObject.shadow.offsetX,
        onChange: this.onChange,
        size: "6"
      }), " \xA0", _react["default"].createElement("input", {
        type: "text",
        name: "shadow.offsetY",
        value: displayObject.shadow.offsetY,
        onChange: this.onChange,
        size: "6"
      })), _react["default"].createElement("dt", null, "- blur"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "text",
        name: "shadow.blur",
        value: displayObject.shadow.blur,
        onChange: this.onChange
      }))), (type === "container" || type === "text") && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("dt", null, "cacheCanvas"), _react["default"].createElement("dd", null, _react["default"].createElement("input", {
        type: "button",
        name: "cacheCanvas",
        value: displayObject.cacheCanvas ? "add cacheCanvas" : "remove cacheCanvas",
        onClick: this.onChange
      }))), _react["default"].createElement("dt", null, "compositeOperation"), _react["default"].createElement("dd", null, _react["default"].createElement("select", {
        name: "compositeOperation",
        value: displayObject.compositeOperation || "",
        onChange: this.onChange
      }, _react["default"].createElement("option", {
        value: ""
      }, "none"), _react["default"].createElement("option", {
        value: "source-over"
      }, "source-over"), _react["default"].createElement("option", {
        value: "source-atop"
      }, "source-atop"), _react["default"].createElement("option", {
        value: "source-in"
      }, "source-in"), _react["default"].createElement("option", {
        value: "source-out"
      }, "source-out"), _react["default"].createElement("option", {
        value: "destination-over"
      }, "destination-over"), _react["default"].createElement("option", {
        value: "destination-atop"
      }, "destination-atop"), _react["default"].createElement("option", {
        value: "destination-in"
      }, "destination-in"), _react["default"].createElement("option", {
        value: "destination-out"
      }, "destination-out"), _react["default"].createElement("option", {
        value: "lighter"
      }, "lighter"), _react["default"].createElement("option", {
        value: "copy"
      }, "copy"), _react["default"].createElement("option", {
        value: "xor"
      }, "xor")))), _react["default"].createElement("hr", {
        style: {
          clear: "both"
        }
      }), _react["default"].createElement("input", {
        type: "button",
        name: "clone",
        value: "Clone",
        onClick: this.onChange
      }), " \xA0", _react["default"].createElement("input", {
        type: "button",
        name: "remove",
        value: "Remove",
        onDoubleClick: this.onChange
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(_reactDraggable["default"], {
        handle: "h4"
      }, _react["default"].createElement("div", {
        className: "properties inspector-box",
        style: {
          right: 0
        }
      }, _react["default"].createElement("h4", {
        onDoubleClick: function onDoubleClick() {
          return _this2.setState({
            show: !_this2.state.show
          });
        }
      }, "Display Object"), _react["default"].createElement("div", {
        className: "properties-content",
        style: {
          display: this.state.show ? "" : "none"
        }
      }, _react["default"].createElement(_DisplayObjectContext.DisplayObjectContext.Consumer, null, function (context) {
        if (!context || !context.displayObject) {
          return _react["default"].createElement("span", null, _react["default"].createElement("i", null, "No Display Object has been selected"));
        }

        return _this2.showProperties(context.displayObject);
      }))));
    }
  }]);

  return Properties;
}(_react.Component);

_defineProperty(Properties, "contextType", _DisplayObjectContext.DisplayObjectContext);

var _default = Properties;
exports["default"] = _default;