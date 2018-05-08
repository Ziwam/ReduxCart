let path = require('path');

const webpack = require('webpack');

module.exports = {
	entry: './src/client.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		loaders: [
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loaders: 'babel-loader',
				query: {
					presets: ['react','es2015','stage-1']
				}
			}
		]
	}
}