const path = require('path')
// 插入js
const HTmlWebpackPlugin = require('html-webpack-plugin')
// 解析css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 解析vue
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    // 模式 开发模式
    mode: 'development',
    // 入口文件 main.js
    entry: {
        main: './src/main.js'
    },
    // 输出
    output: {
        // 输出到dist文件夹
        path: path.resolve(__dirname, './dist'),
        // js文件下
        filename: 'js/chunk-[contenthash].js',
        // 每次大包前自动清楚旧的dist
        clean: true
    },
    // 插件都放Plugins
    plugins:[
        new HTmlWebpackPlugin({
            // 选择模版 public/index.html
            template: './public/index.html',
            // 打包后的名字
            filename: 'index.html',
            // js 文件插入body里
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            // 讲css代输出到dist/style 文件下
            filename: 'styles/chunk-[contenthash].css',
            ignoreOrder: true,
        }),
        // 打包vue
        new VueLoaderPlugin()
    ],
    module: {
        rules:[ {
            // 匹配文件后缀的规则
            test: /\.(css|s[cs]ss)$/,
            use: [
                // loader执行顺序是从右到左
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        },
        {
            // 匹配文件后缀的规则
            test: /\.(png|jpe?g|gif|svg|webp)$/,
            type: 'asset',
            parser: {
                // 转base64的条件
                dataUrlCondition: {
                    maxSize: 25 * 1024 // 25kb
                }
            },
            generator: {
                // 打包到dist /image文件下
                filename: 'images/[contenthash][ext][query]'
            },
        },
        {
            // 匹配js后缀文件
            test: /\.js$/,
            // 排除node_modules中的js
            use:[
                'babel-loader'
            ]
        },
        {
            test: /\.vue$/,
            use: 'vue-loader',
        }
    ]
    },
    resolve: {
        // 路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
            assets: '~assets',
            tools: '~tools'
        },
        // 引入文件时可以省略后缀
        extensions: ['.js', '.ts', '.vue','.less'],
    },
    devServer: {
        // 自定义端口号
        // port:7000
        // 自动打开浏览器
        open: true
    }
}