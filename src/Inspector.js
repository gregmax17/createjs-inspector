import "./styles.scss";

import React, { Component, Fragment } from "react";
import Hierarchy from "./Hierarchy";
import Properties from "./Properties";
import { DisplayObjectContext } from "./DisplayObjectContext";
import { updateProperty, isNumber } from "./utils";

let key = {};
let drag = { x: null, y: null };

class Inspector extends Component {
	static contextType = DisplayObjectContext;

	constructor(props) {
		super(props);

		// extend the container to make it recursive
		this.props.createjs.Container.prototype.getChildById = function (id, deep) {
			var kids = this.children, l = kids.length, i = 0, kid = null;
			for (; i < l && !kid; i++) {
				if (kids[i].id === id) {
					kid = kids[i];
				}
				else if (deep && kids[i].children) {
					kid = kids[i].getChildById(id, deep);
				}
			}
			return kid;
		};

		// events applied to the stage, hopefully they don't get removed
		this.props.stage.on("stagemousedown", this.stageHandler);
		this.props.stage.on("stagemouseup", this.stageHandler);

		// same with this
		this.props.createjs.Ticker.on("tick", this.tickHandler);

		// events on the window and document
		window.addEventListener("mousewheel", this.wheelHandler, { passive: false });
		document.addEventListener("keydown", this.keyHandler, false);
		document.addEventListener("keyup", this.keyHandler, false);
	}

	tickHandler = (event) => {
		let displayObject = this.context.displayObject;
		if (!displayObject) {
			return;
		}

		// are we dragging anything?
		if (key.d && drag.x !== null && drag.y !== null) {
			let pt = displayObject.parent.globalToLocal(this.props.stage.mouseX, this.props.stage.mouseY);
			let x = pt.x - drag.x;
			let y = pt.y - drag.y;
			let axisX = 0;
			let axisY = 0;

			// just along the X or Y axis, or both
			if (key.x) axisX = 1;
			if (key.y) axisY = 1;
			if (!axisX && !axisY) axisX = 1, axisY = 1;

			// if shift key is held down, round it
			if (!key.shift) {
				x = Math.round(x);
				y = Math.round(y);
			}

			// drag the mask
			if (key.w && displayObject.mask) {
				if (axisX) displayObject.mask.x = x;
				if (axisY) displayObject.mask.y = y;
			}
			// drag hit area
			else if (key.h && displayObject.hitArea) {
				if (axisX) displayObject.hitArea.x = x;
				if (axisY) displayObject.hitArea.y = y;
			}
			// just drag the display object
			else {
				if (axisX) displayObject.x = x;
				if (axisY) displayObject.y = y;
			}

			// update
			this.context.setDisplayObject(displayObject);
		}
	}

	stageHandler = (event) => {
		if (event.type === "stagemousedown") {
			// annoying input fields!
			document.querySelectorAll("input").forEach(input => input.blur());
			document.querySelectorAll("select").forEach(select => select.blur());

			let displayObject = this.context.displayObject;

			if (displayObject) {
				let pt = displayObject.parent.globalToLocal(this.props.stage.mouseX, this.props.stage.mouseY);
				drag.x = pt.x - displayObject.x;
				drag.y = pt.y - displayObject.y;
			}
		}
		else {
			drag.x = drag.y = null;
		}
	}

	wheelHandler = (event) => {
		event.preventDefault();

		let displayObject = this.context.displayObject;
		if (!displayObject) {
			return;
		}

		let dir = Math.sign(event.deltaY);

		// over an element ;)
		if (event.target instanceof HTMLInputElement && event.target.type === "text") {
			let value = parseFloat(event.target.value); // update value
			let property = event.target.name; // property name

			if (isNumber(value)) {
				let amount = (/(scale|alpha)/i.test(property) ? 0.1 : 1) * dir;

				// update display object's property
				// console.log(property, displayObject[property], amount);
				displayObject[property] += amount;

				// update context
				this.context.setDisplayObject(displayObject);
			}
		}
		// if we are over the canvas
		else if (event.target === this.props.stage.canvas) {

			// the property we are editing
			let property = displayObject;

			// mask or hit area was selected
			if (key.w && displayObject.mask) {
				property = displayObject.mask;
			}
			else if (key.h && displayObject.hitArea) {
				property = displayObject.hitArea;
			}

			// scale
			if (key.s) {
				let x = 0, y = 0;
				if (key.x) x = 1; // just horizontally
				if (key.y) y = 1; // vertically
				if (!x && !y) x = 1, y = 1; // both
				if (x) property.scaleX += 0.1 * dir;
				if (y) property.scaleY += 0.1 * dir;
			}
			// alpha
			else if (key.a) {
				property.alpha += 0.1 * dir;
			}
			// rotation
			else if (key.r) {
				property.rotation += 10 * dir;
			}

			// update context
			this.context.setDisplayObject(displayObject);
		}
	}

	keyHandler = (event) => {
		let displayObject = this.context.displayObject;
		if (!displayObject) {
			return;
		}

		let theKey = event.key.toLowerCase();
		key[theKey] = event.type === "keydown";

		if (event.type === "keydown" && key.d && event.key.search(/arrow/i) === 0) {
			event.preventDefault();

			if (/left/i.test(event.key)) {
				updateProperty(this.context, "x", --displayObject.x);
			}
			if (/right/i.test(event.key)) {
				updateProperty(this.context, "x", ++displayObject.x);
			}
			if (/up/i.test(event.key)) {
				updateProperty(this.context, "y", --displayObject.y);
			}
			if (/down/i.test(event.key)) {
				updateProperty(this.context, "y", ++displayObject.y);
			}
		}
		else if (event.type === "keyup" && event.target instanceof HTMLInputElement && /(arrowup|arrowdown)/.test(theKey)) {
			event.preventDefault();

			let dir = /down/.test(theKey) ? -1 : 1;
			let name = event.target.name;
			let value = parseFloat(event.target.value);

			if (isNumber(value)) {
				let amount = (/scale|alpha/i.test(name) ? 0.1 : 1) * dir;
				updateProperty(this.context, name, value + amount);
			}
		}
	}

	render() {
		return (
			<Fragment>
				<Hierarchy stage={this.props.stage} createjs={this.props.createjs} />
				<Properties createjs={this.props.createjs} />
			</Fragment>
		);
	}
}

export default Inspector;