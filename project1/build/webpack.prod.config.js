const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConfig  = require('./webpack.base.config.js');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestWebpackPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');

const prodWebpackConfig = webpackMerge(webpackConfig,{
	devtool: 'source-map',//同时开启sourceMap:true,才可生成map文件，默认格式是output.filename后加.map
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'static/js/[name].[chunkhash].js',//基于每个chunk内容的hash.若设为hash,则基于每次构建唯一的值
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({//定义需要打包的资源目录下的文件里调用的全局变量，而不是打包编译时的变量,如:/build/里的文件不能引用此设置
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
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
		new ExtractTextWebpackPlugin({//提取css到单独的文件中
			filename: 'static/css/[name].[contenthash].css',//不使用hash or chunkhash
			allChunks: true,
			disable: false
		}),
	]
})

module.exports = prodWebpackConfig;
