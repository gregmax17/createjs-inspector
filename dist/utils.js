"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.getType = getType;
exports.updateProperty = updateProperty;

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getType(createjs, displayObject) {
  if (displayObject instanceof createjs.Container) {
    return "container";
  } else if (displayObject instanceof createjs.Bitmap) {
    return "bitmap";
  } else if (displayObject instanceof createjs.Sprite) {
    return "sprite";
  } else if (displayObject instanceof createjs.Text) {
    return "text";
  } else if (displayObject instanceof createjs.Shape) {
    return "shape";
  } else {
    return "other";
  }
}

function updateProperty(context, property, value) {
  var object = context.displayObject;
  var prop = property.split('.');

  if (prop.length > 1) {
    object = object[prop[0]];
    property = prop[1];
  } // updates property value


  object[property] = value; // set as display object

  context.setDisplayObject(context.displayObject);
}