const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig = {
	output: {
		path: path.resolve(__dirname,'../output'),
		publicPath: '/',
		filename: '[name].[hash].js'
	},
	resolve: {
		extensions: [' ','.js','.vue'],
		alias: {vue: 'vue/dist/vue.js'}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader'
				}
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: true,
			template: path.resolve(__dirname,'../index.html')
		})
	]
}

// Object.keys(webpackConfig.entry).forEach( function(name) {
// 	var extras = ['webpack-hot-middleware/client?reload=1'];
// 	webpackConfig.entry[name] = extras.concat(webpackConfig.entry[name]);
// });

module.exports = webpackConfig;