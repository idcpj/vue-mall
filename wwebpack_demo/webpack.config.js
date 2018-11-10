var path = require("path");

module.exports = {
    entry: {
        index:"./src/js/index.js",
        cart:'./src/js/cart.js',
    },
    output: {
        path:path.join(__dirname,"./dist"),
        filename: 'js/[name].js',
        // publicPath: "http://www.xxx.com/xx",//加前缀
    },
    module:{

    },
    plugins:[

    ],
    devtool:"#source-map"
};