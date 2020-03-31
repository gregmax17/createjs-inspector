import React, { Component } from "react";
import Draggable from "react-draggable";
import Nestable from "react-nestable";
import { DisplayObjectContext } from "./DisplayObjectContext";

class Hierarchy extends Component {
	static contextType = DisplayObjectContext;

	constructor(props) {
		super(props);

		this.wasShowing = false;

		this.state = {
			show: false,
			items: this.getHierarchy(this.props.stage)
		};
	}

	getHierarchy = (parent) => {
		let kids = [];

		if (parent && parent.children) {
			parent.children.forEach(kid => {
				kids.push({
					id: kid.id,
					text: kid.toString(),
					children: this.getHierarchy(kid)
				});
			});
		}

		return kids;
	}

	onRefresh = () => {
		this.setState({
			items: this.getHierarchy(this.props.stage)
		});
	}

	onAdd = () => {
		let createjs = this.props.createjs;
		let select = document.querySelector(".hierarchy .hierarchy-content select");
		let newDisplayObject;

		if (select.value === "container") {
			newDisplayObject = new createjs.Container();
		}
		else if ( select.value === "sprite") {
			newDisplayObject = new createjs.Sprite();
		}
		else if ( select.value === "bitmap") {
			newDisplayObject = new createjs.Bitmap();
		}
		else if (select.value === "shape") {
			newDisplayObject = new createjs.Shape();
		}
		else if (select.value === "text") {
			newDisplayObject = new createjs.Text("New Text", "12px arial", "#0c0");
		}

		// add it to the scene
		let parent = this.context.displayObject;
		if (!parent || !parent.children) {
			parent = this.props.stage;
		}
		parent.addChild(newDisplayObject);

		// set as the new display object
		this.context.setDisplayObject(newDisplayObject);

		// // refresh the list
		// this.onRefresh();
	}

	toggleSelection = (item) => {
		// remove all previously selected
		document.querySelectorAll(".nestable .selected").forEach(node => {
			node.classList.remove("selected");
		});

		// this is the newly selected item
		item.closest(".nestable-item-name").classList.add("selected");
	}

	renderItem = ({ item, collapseIcon, index }) => {
		return (
			<DisplayObjectContext.Consumer>
				{(context) => (
					<div onDoubleClick={(event) => {
						// toggle items
						this.toggleSelection(event.target);

						// set the new display object
						context.setDisplayObject(this.props.stage.getChildById(item.id, true));
					}}>
						{collapseIcon}
						{item.text}
					</div>
				)}
			</DisplayObjectContext.Consumer>
		);
	}

	renderIcon({ isCollpased }) {
		return (
			<span>... </span>
		);
	}

	// if the parent has `children` for a property we assume its a container and can be dragged into
	checkConfirmChange = (dragItem, destinationParent) => {
		let displayObject = destinationParent ? this.props.stage.getChildById(destinationParent.id, true) : this.props.stage;
		return displayObject && displayObject.children;
	}

	// confirms we dragged the item 
	onChange = (items, item) => {
		// recursive 
		function findParent(_parent, _items, _id) {
			let parent = null;
			_items.forEach(_item => {
				// found it
				if (_item.id === _id) {
					parent = _parent;
				}
				// keep looking
				else if (!parent && _item.children) {
					parent = findParent(_item, _item.children, _id);
				}
			});
			return parent;
		};

		// this will return the parent this item was applied to
		let parent = findParent(null, items, item.id);

		// get the parent display object
		let parentDisplayObject = parent ? this.props.stage.getChildById(parent.id, true) : this.props.stage;

		// add the item to the new parent
		parentDisplayObject.addChild(this.props.stage.getChildById(item.id, true));
	}

	render() {
		return (
			<Draggable handle="h4">
				<div className="hierarchy inspector-box" style={{ left: 0 }}>
					<h4 onDoubleClick={() => this.setState({ show: !this.state.show })}>
						Hierarchy
					</h4>
					<div className="hierarchy-content" style={{ display: this.state.show ? "" : "none" }}>
						<Nestable
							items={this.state.items}
							renderItem={this.renderItem}
							onChange={this.onChange}
							renderCollapseIcon={this.renderIcon}
							confirmChange={this.checkConfirmChange}
							maxDepth={999}
							collapsed={true}
						/>

						<div style={{ marginTop: 8 }}>
							<select name="type">
								<option value="container">Container</option>
								<option value="sprite">Sprite</option>
								<option value="bitmap">Bitmap</option>
								<option value="shape">Shape</option>
								<option value="text">Text</option>
							</select> &nbsp;
							<button onClick={this.onAdd}>Add Type</button>

							<button style={{ float: "right" }} onClick={this.onRefresh}>Refresh</button>
						</div>
					</div>
				</div>
			</Draggable>
		);
	}
}

export default Hierarchy;