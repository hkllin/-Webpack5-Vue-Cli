// 不同的source-map模式
// 不同的环境变量
// 生产环境

const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const webpack = require('webpack')
module.exports = merge(base, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify('production'),
          // 这里可以定义你的环境变量
        },
      },
    }),
  ]
})

