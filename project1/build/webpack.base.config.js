const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const vueLoaderConfig = require('./vue-loader.config');

webpackConfig = {
	entry: {
		app: path.resolve(__dirname,'../src/main.js')
	},
	resolve: {
		extensions: ['.js','.vue'],
		modules: [
			'node_modules',
			path.resolve(__dirname,'../src')
		],
		alias: {vue: 'vue/dist/vue.js'}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				// options: {//这样写不适用于不同环境,可将此设置单独引用一个文件，增加灵活性
				// 	loaders: {
				// 			css: ExtractTextWebpackPlugin.extract({
				// 				use: [
				// 					{
				// 						loader: 'css-loader',
				// 						options: {
				// 							minimize: true,//压缩css
				// 						}
				// 					}
				// 				],
				// 				fallback: 'vue-style-loader',
				// 			}),
				// 			scss: ExtractTextWebpackPlugin.extract({
				// 				use: [
				// 					{
				// 						loader: 'css-loader',
				// 						options: {
				// 							minimize: true,//压缩css
				// 						}
				// 					},
				// 					{loader: 'sass-loader'}
				// 				],
				// 				fallback: 'vue-style-loader',
				// 			})
				// 	}
				// }
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				exclude:[ (/node_modules/)],
				include:[ path.resolve(__dirname,'../src')],//尽量使用include，而不是exclude
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