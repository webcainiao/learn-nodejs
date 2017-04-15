const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//输出包含处理.vue文件的style的loader的函数
//这里以处理scss的函数为例
exports.cssLoaders = function(options){//此函数一定返回一个对象
	//添加一个基础的处理css-loader的选项变量，在后边用于合并
	var cssLoader = {
		loader: 'css-loader',
		options: {
			sourceMap: options.sourceMap,
			minimize: options.minimize
		}
	};

	//定义generatorCssLoader函数,处理不同样式的cssloader
	function generatorCssLoader(loader,loaderOption){
		//定义一个包含cssLoader的数组
		var loaderArray = [cssLoader];
		//若传入了loader,则扩展loaderArray
		if (loader) {
			loaderArray.push({
				loader: loader + '-loader',
				options: Object.assign({},loaderOption,{
					sourceMap: options.sourceMap
				})
			})
		}

		//判断是否需要提取css文件,返回不同的提取方法
		if (options.extract) {
			return ExtractTextWebpackPlugin.extract({
				use: loaderArray,
				fallback: 'vue-style-loader'
			})
		} else {
			return ['vue-style-loader'].concat(loaderArray)
		}
	}

	//最后返回处理不同样式css文件的对象,调用自定义的generatorCssLoader函数
	return {
		css: generatorCssLoader(),
		scss: generatorCssLoader('sass'),
		sass: generatorCssLoader('sass',{indentedSyntax: true}),
	}
}
