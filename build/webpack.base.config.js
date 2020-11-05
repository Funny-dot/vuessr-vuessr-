const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');

// 这样我们在开发过程中仍然可以热重载,CSS 提取应该只用于生产环境
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/entry-client.js',
    //app: ["babel-polyfill", "./src/entry-client.js"],///解决ie关键
    vendor: [
      'vue',
      'vue-router',
      'vuex'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'static': path.resolve(__dirname, '../static'),
      // '@': path.resolve('src'),
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProduction,
          preserveWhitespace: false,
          postcss: [
            require('autoprefixer')({
              browsers: ['last 3 versions']
            })
          ]
        }
      },

      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: isProduction
    // 确保添加了此插件！
    ? [new ExtractTextPlugin({ filename: 'common.[chunkhash].css' })]
    : [],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }

  }
}