const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PurifyCSS = require("purifycss-webpack")

const webpack = require('webpack')
const path = require('path')
const glob =require("glob-all")

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[hash:7].js',
        chunkFilename: 'js/[id].[hash:7].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [/(node_modules|bower_components)/,path.resolve(__dirname, './src/libs')],
                include: [path.resolve(__dirname, './src')]
            },
            {
                test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: [{
                //         loader: "css-loader",
                //         options: {
                //             minimize: true
                //         }
                //     }, 'postcss-loader',"sass-loader"]
                // })
                use: [
                    {
                        loader:"style-loader",
                        options: {sourceMap:true}
                    },{
                        loader: "css-loader",
                        options: {
                            // minimize: true,
                            sourceMap:true
                        }
                    }, {
                        loader:'postcss-loader',
                        options: {sourceMap: true},
                    },{
                        loader:"sass-loader",
                        options: {sourceMap:true}
                    }
                ]
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
    devtool: 'eval-source-map',
    devServer:{
        clientLogLevel: 'warning',
        historyApiFallback: true,
        port: '6080',
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
    resolve: {
        alias:{
            jquery$: path.resolve(__dirname, "./src/libs/jquery.min.js")
        }
    },
    plugins: [
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
        new HtmlWebpackPlugin({
            title: 'index page',
            filename: "index.html",
            template: "./index.html"
        }),
        new ExtractTextPlugin('css/[name].[contenthash:7].css'),
        // new PurifyCSS({
        //     paths: glob.sync([
        //         path.join(__dirname, './*.html'),
        //         path.join(__dirname,'./src/*.js')
        //     ])
        // }),
        new CleanWebpackPlugin('./dist'),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}