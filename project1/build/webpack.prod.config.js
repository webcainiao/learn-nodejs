const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConfig  = require('./webpack.base.config.js');

const prodWebpackConfig = webpackMerge(webpackConfig,{
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'static/js/[name].[chunkhash].js',//基于每个chunk内容的hash.若设为hash,则基于每次构建唯一的值
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
})

module.exports = prodWebpackConfig;
