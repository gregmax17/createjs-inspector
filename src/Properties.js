import React, { Component, Fragment } from "react";
import Draggable from "react-draggable";
import { DisplayObjectContext } from "./DisplayObjectContext";
import { isNumber, updateProperty, getType } from "./utils";

let key = {};

class Properties extends Component {
	static contextType = DisplayObjectContext;

	constructor(props) {
		super(props);

		this.wasShowing = false;

		this.state = {
			show: false
		};
	}

	// I like to use if statements, a little too much maybe
	onChange = (event) => {
		event.preventDefault();

		let createjs = this.props.createjs;
		let displayObject = this.context.displayObject;
		let property = event.target.name;
		let value = event.target.value;

		// adds/removes the hit area
		if (property === "hitArea") {
			value = displayObject.hitArea ? null : new createjs.Shape(new createjs.Graphics().f("#fff").dc(0, 0, 32));
		}
		// adds/removes the mask
		else if (property === "mask") {
			value = displayObject.mask ? null : new createjs.Shape(new createjs.Graphics().f("#fff").dc(0, 0, 32));
		}
		// adds/removes the source rect for bitmaps
		else if (property === "sourceReact") {
			value = displayObject.sourceReact ? null : new createjs.Shape(new createjs.Graphics().f("#fff").dr(0, 0, 32, 32));
		}
		// adds/removes the shadow
		else if (property === "shadow") {
			value = displayObject.shadow ? null : new createjs.Shadow("#000", 0, 8, 0);
		}
		// adds/removes the cache canvas on it
		else if (property === "cacheCanvas") {
			if (displayObject.cacheCanvas) {
				displayObject.cacheCanvas = displayObject.bitmapCache = null;
			}
			else {
				let b = displayObject.getBounds();
				displayObject.cache(b.x, b.y, b.width, b.height);
			}
			return;
		}
		// make a duplicate
		else if (property === "clone") {
			let clone = displayObject.clone(true);
			displayObject.parent.addChild(clone);
			this.context.setDisplayObject(clone);
			return;
		}
		// removes it
		else if (property === "remove") {
			displayObject.parent.removeChild(displayObject);
			this.context.setDisplayObject(null);
			return;
		}

		// for boolean values
		if (event.target.type === "checkbox") {
			value = event.target.checked;
		}

		// finally we get to update it
		updateProperty(this.context, property, value);
	}

	showProperties(displayObject) {
		let type = getType(this.props.createjs, displayObject);

		// console.log('showing');

		return (
			<Fragment>
				<dl>
					<dt>visible</dt>
					<dd><input type="checkbox" name="visible" defaultChecked={displayObject.visible} onChange={this.onChange} /></dd>
					<dt>name</dt>
					<dd><input type="text" name="name" value={displayObject.name || ""} onChange={this.onChange} /></dd>
					<dt>x/y/zIndex</dt>
					<dd>
						<input type="text" name="x" value={displayObject.x} onChange={this.onChange} size="6" /> &nbsp;
						<input type="text" name="y" value={displayObject.y} onChange={this.onChange} size="6" /> &nbsp;
						<input type="text" name="zIndex" value={displayObject.zIndex} onChange={this.onChange} size="6" />
					</dd>
					<dt>scale x/y</dt>
					<dd>
						<input type="text" name="scaleX" value={displayObject.scaleX} onChange={this.onChange} size="6" /> &nbsp;
						<input type="text" name="scaleY" value={displayObject.scaleY} onChange={this.onChange} size="6" />
					</dd>
					<dt>reg x/y</dt>
					<dd>
						<input type="text" name="regX" value={displayObject.regX} onChange={this.onChange} size="6" /> &nbsp;
						<input type="text" name="regY" value={displayObject.regY} onChange={this.onChange} size="6" />
					</dd>
					<dt>skew x/y</dt>
					<dd>
						<input type="text" name="skewX" value={displayObject.skewX} onChange={this.onChange} size="6" /> &nbsp;
						<input type="text" name="skewY" value={displayObject.skewY} onChange={this.onChange} size="6" />
					</dd>
					<dt>rotation</dt>
					<dd><input type="text" name="rotation" value={displayObject.rotation} onChange={this.onChange} /></dd>
					<dt>alpha</dt>
					<dd><input type="text" name="alpha" value={displayObject.alpha} onChange={this.onChange} /></dd>
					<dt>cursor</dt>
					<dd><input type="text" name="cursor" value={displayObject.cursor || ""} onChange={this.onChange} /></dd>
					<dt>mouseEnabled</dt>
					<dd><input type="checkbox" name="mouseEnabled" defaultChecked={!!displayObject.mouseEnabled} onChange={this.onChange} /></dd>
					<dt>tickEnabled</dt>
					<dd><input type="checkbox" name="tickEnabled" defaultChecked={!!displayObject.tickEnabled} onChange={this.onChange} /></dd>
					{type === "text" &&
						<Fragment>
							<dt>text</dt>
							<dd><input type="text" name="text" value={displayObject.text || ""} onChange={this.onChange} /></dd>
							<dt>font</dt>
							<dd><input type="text" name="font" value={displayObject.font || ""} onChange={this.onChange} /></dd>
							<dt>color</dt>
							<dd><input type="color" name="color" value={displayObject.color || ""} onChange={this.onChange} /></dd>
							<dt>textAlign</dt>
							<dd><input type="text" name="textAlign" value={displayObject.textAlign || ""} onChange={this.onChange} /></dd>
							<dt>textBaseline</dt>
							<dd><input type="text" name="textBaseline" value={displayObject.textBaseline || ""} onChange={this.onChange} /></dd>
							<dt>outline</dt>
							<dd><input type="text" name="outline" value={displayObject.outline || ""} onChange={this.onChange} size="6" /></dd>
							<dt>line width/height</dt>
							<dd>
								<input type="text" name="lineWidth" value={displayObject.lineWidth || ""} onChange={this.onChange} size="6" /> &nbsp;
								<input type="text" name="lineHeight" value={displayObject.lineHeight || ""} onChange={this.onChange} size="6" />
							</dd>
							<dt>maxWidth</dt>
							<dd><input type="text" name="maxWidth" value={displayObject.maxWidth || ""} onChange={this.onChange} size="6" /></dd>
						</Fragment>
					}
					{type === "bitmap" &&
						<Fragment>
							<dt>sourceRect</dt>
							<dd><input type="button" name="sourceRect" value="sourceRect" onClick={this.onChange} /></dd>
							{displayObject.sourceRect &&
								<Fragment>
									<dt>x/y</dt>
									<dd>
										<input type="text" name="sourceRect.x" value={displayObject.sourceRect.x} onChange={this.onChange} size="6" /> &nbsp;
										<input type="text" name="sourceRect.y" value={displayObject.sourceRect.y} onChange={this.onChange} size="6" />
									</dd>
									<dt>width/height</dt>
									<dd>
										<input type="text" name="sourceRect.width" value={displayObject.sourceRect.width} onChange={this.onChange} size="6" /> &nbsp;
										<input type="text" name="sourceRect.height" value={displayObject.sourceRect.height} onChange={this.onChange} size="6" />
									</dd>
								</Fragment>
							}
						</Fragment>
					}
					{type === "sprite" &&
						<Fragment>
							<dt>spriteSheet</dt>
							<dd>
								<select name="spriteSheet" onChange={this.onChange}>
								</select>
							</dd>
							<dt>currentAnimation</dt>
							<dd><input type="text" name="currentAnimation" value={displayObject.currentAnimation || ""} onChange={this.onChange} /></dd>
							<dt>currentAnimationFrame</dt>
							<dd><input type="text" name="currentAnimationFrame" value={displayObject.currentAnimationFrame || ""} onChange={this.onChange} /></dd>
							<dt>framerate</dt>
							<dd><input type="text" name="framerate" value={displayObject.framerate} onChange={this.onChange} /></dd>
							<dt>paused</dt>
							<dd><input type="checkbox" name="paused" defaultChecked={displayObject.paused} onChange={this.onChange} /></dd>
						</Fragment>
					}
					{type === "container" &&
						<Fragment>
							<dt>mouseChildren</dt>
							<dd><input type="checkbox" name="mouseChildren" defaultChecked={displayObject.mouseChildren} onChange={this.onChange} /></dd>
							<dt>tickChildren</dt>
							<dd><input type="checkbox" name="tickChildren" defaultChecked={displayObject.tickChildren} onChange={this.onChange} /></dd>
						</Fragment>
					}
					<dt>hitArea</dt>
					<dd><input type="button" name="hitArea" value={displayObject.hitArea ? "remove hitArea" : "add hitArea"} onClick={this.onChange} /></dd>
					{displayObject.hitArea &&
						<Fragment>
							<dt>- x/y</dt>
							<dd>
								<input type="text" name="hitArea.x" value={displayObject.hitArea.x} onChange={this.onChange} size="6" /> &nbsp;
								<input type="text" name="hitArea.y" value={displayObject.hitArea.y} onChange={this.onChange} size="6" />
							</dd>
							<dt>- scale x/y</dt>
							<dd>
								<input type="text" name="hitArea.scaleX" value={displayObject.hitArea.scaleX} onChange={this.onChange} size="6" /> &nbsp;
								<input type="text" name="hitArea.scaleY" value={displayObject.hitArea.scaleY} onChange={this.onChange} size="6" />
							</dd>
							<dt>- reg x/y</dt>
							<dd>
								<input type="text" name="hitArea.regX" value={displayObject.hitArea.regX} onChange={this.onChange} size="6" /> &nbsp;
								<input type="text" name="hitArea.regY" value={displayObject.hitArea.regY} onChange={this.onChange} size="6" />
							</dd>
							<dt>- rotation</dt>
							<dd><input type="text" name="hitArea.rotation" value={displayObject.hitArea.rotation} onChange={this.onChange} /></dd>
						</Fragment>
					}
					<dt>mask</dt>
					<dd><input type="button" name="mask" value={displayObject.mask ? "remove mask" : "add mask"} onClick={this.onChange} /></dd>
					{displayObject.mask &&
						<Fragment>
							<dt>- x/y</dt>
							<dd>
								<input type="text" name="mask.x" value={displayObject.mask.x} onChange={this.onChange} size="6" /> &nbsp;
								<input type="text" name="mask.y" value={displayObject.mask.y} onChange={this.onChange} size="6" />
							</dd>
							<dt>- scale x/y</dt>
							<dd>
								<input type="text" name="mask.scaleX" value={displayObject.mask.scaleX} onChange={this.onChange} size="6" /> &nbsp;
								<input type="text" name="mask.scaleY" value={displayObject.mask.scaleY} onChange={this.onChange} size="6" />
							</dd>
							<dt>- reg x/y</dt>
							<dd>
								<input type="text" name="mask.regX" value={displayObject.mask.regX} onChange={this.onChange} size="6" /> &nbsp;
								<input type="text" name="mask.regY" value={displayObject.mask.regY} onChange={this.onChange} size="6" />
							</dd>
							<dt>- rotation</dt>
							<dd><input type="text" name="mask.rotation" value={displayObject.mask.rotation} onChange={this.onChange} /></dd>
						</Fragment>
					}
					<dt>shadow</dt>
					<dd><input type="button" name="shadow" value={displayObject.shadow ? "remove shadow" : "add shadow"} onClick={this.onChange} /></dd>
					{displayObject.shadow &&
						<Fragment>
							<dt>- color</dt>
							<dd><input type="color" name="shadow.color" value={displayObject.shadow.color} onChange={this.onChange} /></dd>
							<dt>- offset x/y</dt>
							<dd>
								<input type="text" name="shadow.offsetX" value={displayObject.shadow.offsetX} onChange={this.onChange} size="6" /> &nbsp;
								<input type="text" name="shadow.offsetY" value={displayObject.shadow.offsetY} onChange={this.onChange} size="6" />
							</dd>
							<dt>- blur</dt>
							<dd><input type="text" name="shadow.blur" value={displayObject.shadow.blur} onChange={this.onChange} /></dd>
						</Fragment>
					}
					{(type === "container" || type === "text") &&
						<Fragment>
							<dt>cacheCanvas</dt>
							<dd><input type="button" name="cacheCanvas" value={displayObject.cacheCanvas ? "add cacheCanvas" : "remove cacheCanvas"} onClick={this.onChange} /></dd>
						</Fragment>
					}
					<dt>compositeOperation</dt>
					<dd>
						<select name="compositeOperation" value={displayObject.compositeOperation || ""} onChange={this.onChange}>
							<option value="">none</option>
							<option value="source-over">source-over</option>
							<option value="source-atop">source-atop</option>
							<option value="source-in">source-in</option>
							<option value="source-out">source-out</option>
							<option value="destination-over">destination-over</option>
							<option value="destination-atop">destination-atop</option>
							<option value="destination-in">destination-in</option>
							<option value="destination-out">destination-out</option>
							<option value="lighter">lighter</option>
							<option value="copy">copy</option>
							<option value="xor">xor</option>
						</select>
					</dd>
				</dl>
				<hr style={{ clear: "both" }} />
				<input type="button" name="clone" value="Clone" onClick={this.onChange} /> &nbsp;
				<input type="button" name="remove" value="Remove" onDoubleClick={this.onChange} />
			</Fragment>
		);
	}

	render() {
		return (
			<Draggable handle="h4">
				<div className="properties inspector-box" style={{ right: 0 }}>
					<h4 onDoubleClick={() => this.setState({ show: !this.state.show })}>
						Display Object
					</h4>
					<div className="properties-content" style={{ display: this.state.show ? "" : "none" }}>
						<DisplayObjectContext.Consumer>
							{(context) => {
								if (!context || !context.displayObject) {
									return (<span><i>No Display Object has been selected</i></span>);
								}
								return this.showProperties(context.displayObject);
							}}
						</DisplayObjectContext.Consumer>
					</div>
				</div>
			</Draggable>
		);
	}
}

export default Properties;