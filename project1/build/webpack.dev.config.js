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
	devtool: 'cheap-module-eval-source-map',//或者'cheap-eval-source-map'
	output: {
		path: path.resolve(__dirname,'../output'),//开发时这个好像没用，所有资源都打包到publicPath路径下，内存当中
		publicPath: '/',
		filename: '[name].js',//不要在开发中使用chunkhash,这会增加编译时间，推荐使用[name].js就可以了
		chunkFilename: '[id].[name].[chunkhash:7].js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),//开启全局的模块热替换
		new webpack.NamedModulesPlugin(),//当模块热替换时，在浏览器控制台输出对用户友好的模块的名称,没看到效果
		new webpack.NoEmitOnErrorsPlugin(),
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


module.exports = webpackConfig;