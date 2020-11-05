const webpack = require('webpack')
const {merge} = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(base, {
  target: 'node',
  entry: './src/entry-server.js',
  devtool: 'source-map',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    allowlist: /\.css$/,
    "jquery": "$",
    'Vue': true,
    'VueLazyload': true,
    '$': true,
    'vue-router': 'VueRouter',
    'vuex':'Vuex',
    'axios': 'axios',
    // 'element-ui':'ELEMENT',
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    /*
    使用webpack按需代码分割的特性的时候（require.ensure或动态import）结果就是服务端bundle会包含很多分开的文件。
    'vue-ssr-webpack-plugin'作用是将其打包为一个单独的JSON文件，这个文件可以传入到bundleRenderer中(server.js)，可以极大地简化了工作流。
    默认文件名为 `vue-ssr-server-bundle.json`，也可以参数形式传入其他名称
    */
    new VueSSRPlugin()
  ]
})