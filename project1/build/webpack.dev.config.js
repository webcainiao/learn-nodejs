const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config');

webpackConfig = webpackMerge(webpackBaseConfig,{
	entry: {
		app: ['webpack-hot-middleware/client?reload=1',path.resolve(__dirname,'../src/main.js')]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
})

// Object.keys(webpackConfig.entry).forEach( function(name) {
// 	var extras = ['webpack-hot-middleware/client?reload=1'];
// 	webpackConfig.entry[name] = extras.concat(webpackConfig.entry[name]);
// });

module.exports = webpackConfig;