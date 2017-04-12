var express = require('express');
var path = require('path');
var webpack =  require('webpack');
var webpackConfig = process.env.NODE_ENV==='development'
			? require('./build/webpack.dev.config')
			: require('./build/webpack.prod.config');
var historyApiFallback = require('connect-history-api-fallback');
var app = express();

app.use(historyApiFallback());
if (app.get('env') == 'development') {
	var compiler = webpack(webpackConfig);
	var devMiddleware = require('webpack-dev-middleware')(compiler,{
		publicPath: '/',
		stats: {
			colors: true,
			chunks: false
		}
	});

	app.use(devMiddleware);
	app.use(require('webpack-hot-middleware')(compiler))
} else {
	app.use(express.static(path.resolve(__dirname,'dist')))
}
module.exports = app;
