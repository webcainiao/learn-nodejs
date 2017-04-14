const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConfig  = require('./webpack.base.config.js');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestWebpackPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');

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
		}),
		// new ManifestPlugin(),//可生成manifest.json，但是改变应用代码时manifest的chunkhash会改变,以文件名如：'app.js':'xxx'，作为键
		new ChunkManifestWebpackPlugin({//也可生成manifest.json,但是是以数字作为对象的键,'0':'sss'
			filename: 'manifest.json',
			manifestVariable: 'webpackManifest'//此webpackManifest成为全局属性，表示manifest.json中的那个对象
		}),
		// new webpack.HashedModuleIdsPlugin(),//没有搞懂这个啥意思,当模块热替换时，在浏览器控制台输出对用户友好的模块的名称
		new WebpackChunkHash(),//此插件可使生成的manifest.js文件的chunkhash值保持不变
	]
})

module.exports = prodWebpackConfig;
