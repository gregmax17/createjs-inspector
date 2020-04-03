const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "createjs-inspector.js",
		path: path.resolve(__dirname, "dist"),
		library: "Inspector",
		libraryTarget: "umd"
	},
	module: {
		rules: [{
			test: /\.(scss|sass|css)$/i,
			use: ["style-loader", "css-loader", "sass-loader"]
		},  {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "svg-inline-loader"
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: ["@babel/plugin-proposal-class-properties"]
				}
			}
		}]
	}
};