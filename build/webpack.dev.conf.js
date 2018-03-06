const webpack = require('webpack')

module.exports = {
    devtool: 'eval-source-map',
    devServer:{
        clientLogLevel: 'warning',
        historyApiFallback: true,
        port: '6080',
        overlay: true,
        hot: true,
        compress: true,
        noInfo: true,
        // quiet: true,
        proxy:{
            '/api':{
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                // logLevel: 'debug',
                pathRewrite:{}
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}