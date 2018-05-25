let path = require('path');

const webpack = require('webpack');

module.exports = {
	entry: './src/client.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	watch: true,
	module: {
		loaders: [
		{
				test: /\.(otf|ttf|eot|woff|woff2|jpg|png|svg)$/,
			    loader: 'url-loader',
			    options: {
			      name: '/assets/[name].[ext]',
			      limit: 25000
			    },
		},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loaders: 'babel-loader',
				query: {
					presets: ['react','es2015','stage-1']
				}
			},
	    {
	    	test:/\.scss$/,
	  		use: [{
					loader: 'file-loader',
					options: {
						name: '[name].css',
						outputPath: 'css/'
					}
				}, {
					loader: 'extract-loader'
				}, {
	                loader: "css-loader" // translates CSS into CommonJS
	            }, {
	                loader: "sass-loader" // compiles Sass to CSS
	            }]
	    }
		]
	}
}