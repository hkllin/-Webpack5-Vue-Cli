// 开发环境
// webpack-dev-server
// 不同的source-map模式
// 不同的环境变量
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const webpack = require('webpack')
module.exports = merge(base, {
  mode: 'development',
  devServer: {
    open: true,
    hot: true,
  },
//   development：使用eval-cheap-module-source-map模式，能具体定位到源码位置和源码展示，适合开发模式，体积较小
  devtool: 'eval-cheap-module-source-map',
  plugins:[
    //   定义全局变量
    new webpack.DefinePlugin({
        process: {
            env: {
                NODE_DEV: JSON.stringify('development'),
                // 这里可以定义你的环境变量
            },
        }
    })
  ]
})
