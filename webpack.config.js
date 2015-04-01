var webpack = require('webpack'),
    bower   = require('bower-webpack-plugin'),
    nodeDir = __dirname + '/node_modules';

var config = {
    entry: './src/js/app.react.js',
    resolve: { alias: {} },
    debug: true,
    output: {
        path: './build/js',
        filename: 'bundle.js'
    },
    module: {
        noParse: [],
        loaders: [{
            test: /\.react\.js$/,
            loader: 'jsx'
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
            loader: "file-loader?name=[name].[ext]"
        }]
    },
    plugins: [
        new bower({
            excludes: /.*\.less/
        }),
        new webpack.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.OccurenceOrderPlugin()
        // TODO: Enable in production only
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin(),
        //new webpack.optimize.AggressiveMergingPlugin()
    ]
};

module.exports = config;