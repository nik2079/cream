var webpack = require('webpack');
var path = require('path');
var ProgressBar = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defaultPlagins = [ //default plugins for all.
    new ProgressBar(),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
];
const productionPlugins = [ //for production mode

];
const developPlugins = []; //for develop mode

module.exports = function (env) {
    let result = [];
    switch (true) {
        case env.production:
            result = defaultPlagins.concat(productionPlugins);
            break;
        case env.qa:
        case env.development:
            result = defaultPlagins.concat(developPlugins);
            break;

    }
    return result;
};