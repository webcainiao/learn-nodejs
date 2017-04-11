const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config');
Object.keys(webpackBaseConfig.entry).forEach( function(name) {
	var extras = ['webpack-hot-middleware/client?reload=1'];
	webpackBaseConfig.entry[name] = extras.concat(webpackBaseConfig.entry[name]);
});

webpackConfig = webpackMerge(webpackBaseConfig,{
	output: {
		path: path.resolve(__dirname,'../output'),
		publicPath: '/',
		filename: '[name].[hash].js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
})


module.exports = webpackConfig;