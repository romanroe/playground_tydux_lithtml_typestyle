var webpack = require('webpack');
var path = require("path");
var ats = require('awesome-typescript-loader');

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "index.ts")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']

    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/, loader: 'awesome-typescript-loader'
        }, {
            test: /\.html$/,
            use: [{
                loader: 'file-loader?name=[path][name].[ext]&context='
            }, {
                loader: 'extract-loader'
            }, {
                loader: 'html-loader'

            }]
        }]

    },
    plugins: [
        new ats.CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        inline: true,
        overlay: true,
        compress: true,
        host: "0.0.0.0",
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, "src")
    }
};
