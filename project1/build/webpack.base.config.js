const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const vueLoaderConfig = require('./vue_loader.config');

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
				// loader: 'vue-loader',
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
				// options: vueLoaderConfig,
				use: [
					{
						loader: 'vue-loader',
						options: vueLoaderConfig,
					}
				]

			},
			{
				test: /\.js$/,
				use: [{loader:'babel-loader'}],
				include:[ path.resolve(__dirname,'../src')],//尽量使用include，而不是exclude
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,//没搞懂这个后面括号里的问号
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'static/img/[name].[hash:7].[ext]',
						}
					}
				]
			},
			{
				test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'static/fonts/[name].[hash:7].[ext]',
						}
					}
				]
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