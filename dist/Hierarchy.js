"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDraggable = _interopRequireDefault(require("react-draggable"));

var _reactNestable = _interopRequireDefault(require("react-nestable"));

var _DisplayObjectContext = require("./DisplayObjectContext");

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

var Hierarchy = /*#__PURE__*/function (_Component) {
  _inherits(Hierarchy, _Component);

  function Hierarchy(props) {
    var _this;

    _classCallCheck(this, Hierarchy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hierarchy).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getHierarchy", function (parent) {
      var kids = [];

      if (parent && parent.children) {
        parent.children.forEach(function (kid) {
          kids.push({
            id: kid.id,
            text: kid.toString(),
            children: _this.getHierarchy(kid)
          });
        });
      }

      return kids;
    });

    _defineProperty(_assertThisInitialized(_this), "onRefresh", function () {
      _this.setState({
        items: _this.getHierarchy(_this.props.stage)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAdd", function () {
      var createjs = _this.props.createjs;
      var select = document.querySelector(".hierarchy .hierarchy-content select");
      var newDisplayObject;

      if (select.value === "container") {
        newDisplayObject = new createjs.Container();
      } else if (select.value === "sprite") {
        newDisplayObject = new createjs.Sprite();
      } else if (select.value === "bitmap") {
        newDisplayObject = new createjs.Bitmap();
      } else if (select.value === "shape") {
        newDisplayObject = new createjs.Shape();
      } else if (select.value === "text") {
        newDisplayObject = new createjs.Text("New Text", "12px arial", "#0c0");
      } // add it to the scene


      var parent = _this.context.displayObject;

      if (!parent || !parent.children) {
        parent = _this.props.stage;
      }

      parent.addChild(newDisplayObject); // set as the new display object

      _this.context.setDisplayObject(newDisplayObject); // // refresh the list
      // this.onRefresh();

    });

    _defineProperty(_assertThisInitialized(_this), "toggleSelection", function (item) {
      // remove all previously selected
      document.querySelectorAll(".nestable .selected").forEach(function (node) {
        node.classList.remove("selected");
      }); // this is the newly selected item

      item.closest(".nestable-item-name").classList.add("selected");
    });

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (_ref) {
      var item = _ref.item,
          collapseIcon = _ref.collapseIcon,
          index = _ref.index;
      return _react["default"].createElement(_DisplayObjectContext.DisplayObjectContext.Consumer, null, function (context) {
        return _react["default"].createElement("div", {
          onDoubleClick: function onDoubleClick(event) {
            // toggle items
            _this.toggleSelection(event.target); // set the new display object


            context.setDisplayObject(_this.props.stage.getChildById(item.id, true));
          }
        }, collapseIcon, item.text);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkConfirmChange", function (dragItem, destinationParent) {
      var displayObject = destinationParent ? _this.props.stage.getChildById(destinationParent.id, true) : _this.props.stage;
      return displayObject && displayObject.children;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (items, item) {
      // recursive 
      function findParent(_parent, _items, _id) {
        var parent = null;

        _items.forEach(function (_item) {
          // found it
          if (_item.id === _id) {
            parent = _parent;
          } // keep looking
          else if (!parent && _item.children) {
              parent = findParent(_item, _item.children, _id);
            }
        });

        return parent;
      }

      ; // this will return the parent this item was applied to

      var parent = findParent(null, items, item.id); // get the parent display object

      var parentDisplayObject = parent ? _this.props.stage.getChildById(parent.id, true) : _this.props.stage; // add the item to the new parent

      parentDisplayObject.addChild(_this.props.stage.getChildById(item.id, true));
    });

    _this.wasShowing = false;
    _this.state = {
      show: false,
      items: _this.getHierarchy(_this.props.stage)
    };
    return _this;
  }

  _createClass(Hierarchy, [{
    key: "renderIcon",
    value: function renderIcon(_ref2) {
      var isCollpased = _ref2.isCollpased;
      return _react["default"].createElement("span", null, "... ");
    } // if the parent has `children` for a property we assume its a container and can be dragged into

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(_reactDraggable["default"], {
        handle: "h4"
      }, _react["default"].createElement("div", {
        className: "hierarchy inspector-box",
        style: {
          left: 0
        }
      }, _react["default"].createElement("h4", {
        onDoubleClick: function onDoubleClick() {
          return _this2.setState({
            show: !_this2.state.show
          });
        }
      }, "Hierarchy"), _react["default"].createElement("div", {
        className: "hierarchy-content",
        style: {
          display: this.state.show ? "" : "none"
        }
      }, _react["default"].createElement(_reactNestable["default"], {
        items: this.state.items,
        renderItem: this.renderItem,
        onChange: this.onChange,
        renderCollapseIcon: this.renderIcon,
        confirmChange: this.checkConfirmChange,
        maxDepth: 999,
        collapsed: true
      }), _react["default"].createElement("div", {
        style: {
          marginTop: 8
        }
      }, _react["default"].createElement("select", {
        name: "type"
      }, _react["default"].createElement("option", {
        value: "container"
      }, "Container"), _react["default"].createElement("option", {
        value: "sprite"
      }, "Sprite"), _react["default"].createElement("option", {
        value: "bitmap"
      }, "Bitmap"), _react["default"].createElement("option", {
        value: "shape"
      }, "Shape"), _react["default"].createElement("option", {
        value: "text"
      }, "Text")), " \xA0", _react["default"].createElement("button", {
        onClick: this.onAdd
      }, "Add Type"), _react["default"].createElement("button", {
        style: {
          "float": "right"
        },
        onClick: this.onRefresh
      }, "Refresh")))));
    }
  }]);

  return Hierarchy;
}(_react.Component);

_defineProperty(Hierarchy, "contextType", _DisplayObjectContext.DisplayObjectContext);

var _default = Hierarchy;
exports["default"] = _default;