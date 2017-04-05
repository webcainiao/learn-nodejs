var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ExtractTextPluginScss = new ExtractTextPlugin('mestyle.css')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // loader: 'vue-loader',
        // options: {
        //   loaders: {
        //     // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
        //     // the "scss" and "sass" values for the lang attribute to the right configs here.
        //     // other preprocessors should work out of the box, no loader config like this necessary.
        //     // 'scss': 'vue-style-loader!css-loader!sass-loader',
        //     // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        //     // scss: ExtractTextPlugin.extract({
        //     //   use: 'css-loader!sass-loader',
        //     //   fallback: 'vue-style-loader'
        //     // })和下面形式是一样的and plugins
            // scss: ExtractTextPluginScss.extract({
            //   use: 'css-loader!sass-loader',
            //   fallback: 'vue-style-loader'
            // })
        //   }
        use: [
          {loader: 'vue-loader',
          options: {
            loaders: {
                scss: ExtractTextPluginScss.extract({
                use: 'css-loader!sass-loader',
                fallback: 'vue-style-loader'
              })
            }
          }}
        ]
          // other vue-loader options go here
        // }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // new ExtractTextPlugin('mystyle.css')
    ExtractTextPluginScss
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
