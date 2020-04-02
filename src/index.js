import React from "react";
import ReactDOM from "react-dom";
import Inspector from "./Inspector";
import { DisplayObjectProvider } from "./DisplayObjectContext";

let refInspector;

const init = (options) => {
	console.log("stage: ", stage);

	if (!options.createjs) {
		throw "No CreateJS property was passed";
	}

	// create the element
	if (!options.element) {
		let element = document.createElement("div");
		element.style.position = "absolute";
		element.style.top = "0";
		element.style.width = "100%";

		// add to body
		document.body.appendChild(element);

		// assign as property
		options.element = element;
	}
	// get the element by the id
	else if (typeof options.element === "string") {
		options.element = document.getElementById(options.element);
	}

	// render it
	ReactDOM.render((
		<DisplayObjectProvider>
			<Inspector stage={options.stage} createjs={options.createjs} ref={(ref) => refInspector = ref} />
		</DisplayObjectProvider>
	), options.element);
};

// TODO
// let the user add a sprite or bitmap reference
const addResource = () => {
	console.log(refInspector);
};

export { init, addResource };