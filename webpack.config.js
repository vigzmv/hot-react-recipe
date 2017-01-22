var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'docs');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    context: APP_DIR,
    entry: {
        javascript: './index.js',
        // html:'./index.html'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: './main.js',
        publicPath: '/'+ 'docs' + '/'
    },
    devServer: {
        inline: true
    },
    watch: true,
};

module.exports = config;
