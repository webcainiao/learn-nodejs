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
		}),
		new webpack.optimize.CommonsChunkPlugin({//可将node_modules中的公共库，提取到单独vendor文件中
			name: ['vendor'],
			minChunks: function(module){
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({//可将运行时代码提取到manifest中，防止提取到vendor中改变vendor的chunkhash值
			names: ['manifest'],
		})
	]
})

module.exports = prodWebpackConfig;
