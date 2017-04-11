var express = require('express');
var path = require('path');
var webpack =  require('webpack');
var webpackConfig = process.env.NODE_ENV==='development'
			? require('./build/webpack.dev.config')
			: require('./build/webpack.prod.config');
var historyApiFallback = require('connect-history-api-fallback');
var app = express();

var compiler = webpack(webpackConfig);
var devMiddleware = require('webpack-dev-middleware')(compiler,{
	publicPath: '/',
	stats: {
		colors: true,
		chunks: false
	}
});

app.use(historyApiFallback());
app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler))
module.exports = app;
