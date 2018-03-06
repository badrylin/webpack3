const developmentConfig = require("./webpack.dev.conf")
const productionConfig = require("./webpack.prod.conf")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

const baseConfig = env => {

    const cssLoader = [{
            loader: "css-loader",
            options: {minimize: env === 'production',sourceMap: true}
        }, {
            loader: 'postcss-loader',
            options: {sourceMap: true}
        }, {
            loader: "sass-loader",
            options: {sourceMap: true}
        }
    ]

    return {
        entry: {
            app: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'js/[name].js',
            chunkFilename: 'js/[id].js'
        },
        resolve: {
            alias:{
                jquery$: path.resolve(__dirname, "../src/libs/jquery.min.js")
            }
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: [/(node_modules|bower_components)/,path.resolve(__dirname, '../src/libs')],
                    include: [path.resolve(__dirname, '../src')],
                    use: ['babel-loader'].concat(env === 'production' ? [] : 'eslint-loader')
                },
                {
                    test : /\.scss$/,
                    use : env === 'production'
                        ? ExtractTextPlugin.extract({fallback: "style-loader", use: cssLoader})
                        : ['style-loader'].concat(cssLoader)
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'img/[name].[hash:7].[ext]',
                            publicPath: '../'
                        }
                    }]
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: ('media/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]',
                        publicPath: '../'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'index page',
                filename: "index.html",
                template: "./index.html"
            }),
            new ExtractTextPlugin('css/[name].[contenthash:7].css'),
            new webpack.ProvidePlugin({
                $: 'jquery'
            }),
        ]
    }
}

module.exports = env => {
    let config = env === 'production' 
        ? productionConfig 
        : developmentConfig

    return merge(baseConfig(env), config);
}