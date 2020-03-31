import React from "react";

const DisplayObjectContext = React.createContext();

class DisplayObjectProvider extends React.Component {
	state = {
		displayObject: null
	};

	render() {
		return (
			<DisplayObjectContext.Provider value={{
				displayObject: this.state.displayObject,
				setDisplayObject: (displayObject) => {

					// set the display object
					this.setState({ 
						displayObject: displayObject 
					});

					// set it globally
					window.$inspector = displayObject;
				}
			}}>
				{this.props.children}
			</DisplayObjectContext.Provider>
		);
	}
}

export { DisplayObjectProvider, DisplayObjectContext };