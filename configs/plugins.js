var webpack = require('webpack');
var path = require('path');
var TextPlugin = require('extract-text-webpack-plugin');
var ProgressBar = require('progress-bar-webpack-plugin');

const defaultPlagins = [ //default plugins for all.
    new ProgressBar(),
    new TextPlugin(path.join('css', '[name].css'))
];
const productionPlugins = [ //for production mode
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    })
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