const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
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
                test:/\.css$/,
                use:["style-loader",'css-loader']
            }
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
        }),
        new HtmlWebpackPlugin({
            filename:"cart.html",
            template:"./src/cart.html",
            chunks:['cart'],
        }),
    ],
    devtool:"#source-map" //用于调试
};