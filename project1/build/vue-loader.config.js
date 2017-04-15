var utils = require('./utils');
// const config = require('../config');//参考官方vue-webpack的实例中的设置
var isProduction = process.env.NODE_ENV === 'production';
//根据运行环境是否是production,如果是则提取css文件,在此可调用另一个文件来运行，不同配置下，css的提取
//和sourceMap的生成
module.exports = {
	loaders: utils.cssLoaders({
		sourceMap: isProduction,
		extract: isProduction,
		minimize: isProduction
	})
}