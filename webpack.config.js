var webpack = require('webpack');
var path = require('path');

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
        new webpack.optimize.OccurenceOrderPlugin(), new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                loader: "babel-loader",

                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,

                exclude: /node_modules/,

                // Options to configure babel with
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
