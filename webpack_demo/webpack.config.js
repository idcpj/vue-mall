const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        index:"./src/js/index.js", //设置多入口
        cart:'./src/js/cart.js',
    },
    output: {
        path:path.join(__dirname,"./dist"),
        filename: 'js/[name].js',
        // publicPath: "http://www.xxx.com/xx",//加前缀
    },
    module:{
        rules:[
            {
                test: /\.m?js$/,
                include: path.join(__dirname,'src'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.css$/,
                include: path.join(__dirname,'src'),
                exclude: /node_modules/,
                use:["style-loader",'css-loader'],
            },
            {
                test: /\.js$/,
                include: path.join(__dirname,'src'),
                exclude: /node_modules/,
                loader: "babel-loader"}
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['./dist'],{
            root:path.join(__dirname,''),
            verbose:true,
            dry:false,
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html",
            chunks:['index'], //只加载 指定 js
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                minimize: true,
            }
        }),
        new HtmlWebpackPlugin({
            filename:"cart.html",
            template:"./src/cart.html",
            chunks:['cart'],
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                minimize: true,
            }
        }),
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin({

            cache: true,
            parallel: true
        })]
    },
    // devtool:"#source-map" //用于调试
};