const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PurifyCSS = require("purifycss-webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpack = require('webpack')
const path = require('path')
const glob = require("glob-all")

module.exports = {
    output: {
        filename: 'js/[name].[chunkhash:7].js',
        chunkFilename: 'js/[id].[chunkhash:7].js'
    },
    devtool: '#source-map',
    plugins: [
        new CleanWebpackPlugin('./dist',{
            root: path.join(__dirname, '../')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function(module) {
                return module.context && module.context.includes("node_modules");
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, '../*.html'),
                path.join(__dirname,'../src/*.js')
            ])
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            cache: true
        }),
        new webpack.NamedChunksPlugin(),
        new webpack.NamedModulesPlugin(),
        // new BundleAnalyzerPlugin()
    ]
}