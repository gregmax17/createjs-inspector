export function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getType(createjs, displayObject) {
	if (displayObject instanceof createjs.Container) {
		return "container";
	}
	else if (displayObject instanceof createjs.Bitmap) {
		return "bitmap";
	}
	else if (displayObject instanceof createjs.Sprite) {
		return "sprite";
	}
	else if (displayObject instanceof createjs.Text) {
		return "text";
	}
	else if (displayObject instanceof createjs.Shape) {
		return "shape";
	}
	else {
		return "other";
	}
}

export function updateProperty(context, property, value) {
	let object = context.displayObject;

	let prop = property.split('.');
	if (prop.length > 1) {
		object = object[prop[0]];
		property = prop[1];
	}

	// updates property value
	object[property] = value;

	// set as display object
	context.setDisplayObject(context.displayObject);
}