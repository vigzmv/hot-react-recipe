var path = require('path');
var webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: '#eval-source-map',
    context: path.join(__dirname, 'src', 'js'),
    entry: ['./main'],
    output: {
        path: path.join(__dirname, 'docs', 'js'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                loaders: ['babel'],
                test: /\.jsx?$/,
                exclude: /node_modules/
            }
        ]
    }
};
