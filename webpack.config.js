'use strict';
var plugins = require('./configs/plugins');
var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var dir = path.join(__dirname, 'assets', 'build');
const glob = require('glob');
console.log(dir);
var coreLoaders = ['babel-loader'];

module.exports = env => {
    if (env.development) coreLoaders.push('eslint-loader');
    return {
        mode: 'development',
        entry: {
            main: './src/js/main',
            catalog: './src/js/catalog',
            profile: './src/js/profile'
            // srcSet: './src/js/libraries/srcSet',
            // labels: './src/js/libraries/labels',
            // accordion: './src/libraries/accordion',
            // dropdown: './src/libraries/dropdown',
            // product: './src/js/product',
            // shops: './src/js/shops',
            // page404: './src/js/page404',
            // about: './src/js/about',
            // addAddress: './src/js/profile/addAddress',
            // changePass: './src/js/profile/changePass',
            // sliders: './src/js/sliders',
            // filter: './src/js/filter',
            // cart: './src/js/cart',
            // material_form: './src/js/material_form',
            // vacancy: './src/js/vacancy',
            // header_search: './src/js/search/header_search',
            // pagination_ajax: './src/js/pagination_ajax_new',
            // index: './src/js/index',
            // location: './src/js/location',
            // favorites: './src/js/favorites',
            // contacts: './src/js/contacts',
            // mobile_auth: './src/js/mobile_auth',
            // animateDel: './src/js/modules/_animateDel'
        },
        output: {
            path: dir,
            filename: path.join('js', '[name].js'),
            library: '_[name]'
        },
        resolve: {
            moduleExtensions: ['node_modules'],
            extensions: ['.js', '.json', '.scss', 'css'],
            alias: {
                _images: path.join(__dirname, 'static', 'images')
            }
        },
        devServer: {
            compress: true,
            port: 8080,
            index: 'index.html',
            open: true,
            /*openPage:"index.html",*/
            overlay: {
                warnings: true,
                errors: true
            },
            liveReload: true,
            watchContentBase: true,
            watchOptions: {
                poll: true
            }
        },
        devtool: '#cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: coreLoaders,
                    exclude: /node_modules/
                },
                {
                    test: /\.(css|ttf|otf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[ext]/[name].[hash].[ext]'
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'style-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it uses publicPath in webpackOptions.output
                                // publicPath: './assets/build/css',
                                hmr: process.env.NODE_ENV === 'development'
                            }
                        },
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d))
                            }
                        }
                    ]
                }
            ]
        },
        plugins: plugins(env)
    };
};