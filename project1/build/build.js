// process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.config.js');
const rm = require('rimraf');

rm(path.resolve(__dirname,'../dist/static'),function(err){
	if (err) throw err
	webpack(webpackConfig,function(err,stats){
		if (err) throw err
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModuls: false
		}) + '\n')
	});
})
