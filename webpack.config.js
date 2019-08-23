'use strict';
var plugins = require('./configs/plugins');
var path = require('path');
var TextPlugin = require('extract-text-webpack-plugin');
var dir = path.join(__dirname, 'assets', 'build');
var coreLoaders = ['babel-loader'];
module.exports = env => {
    if(env.development) coreLoaders.push('eslint-loader');
    return {
        entry: {
            main: './src/js/main',
            /**srcSet: './src/js/libraries/srcSet',
            labels: './src/js/libraries/labels',
            accordion: './src/libraries/accordion',
            dropdown: './src/libraries/dropdown',
            product: './src/js/product',
            shops: './src/js/shops',
            page404: './src/js/page404',
            about: './src/js/about',
            profile: './src/js/profile',
            addAddress: './src/js/profile/addAddress',
            changePass: './src/js/profile/changePass',
            sliders: './src/js/sliders',
            filter: './src/js/filter',
            cart: './src/js/cart',
            material_form: './src/js/material_form',
            vacancy: './src/js/vacancy',
            header_search: './src/js/search/header_search',
            pagination_ajax: './src/js/pagination_ajax_new',
            index: './src/js/index',
            location: './src/js/location',
            favorites: './src/js/favorites',
            contacts: './src/js/contacts',
            mobile_auth: './src/js/mobile_auth',
            animateDel: './src/js/modules/_animateDel'*/
        },
        output: {
            path: dir,
            filename: path.join('js', '[name].js'),
            library: '_[name]'
        },
        externals: {
            jquery: '$'
        },
        resolve: {
            moduleExtensions: ['node_modules'],
            extensions: ['.js', '.json', '.scss', 'css'],
            alias: {
                _images: path.join(__dirname, 'static', 'images')
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
                        publicPath: '/assets/build',
                        name: '/[ext]/[name].[hash].[ext]'
                    }
                },
                {
                    test: /(\.css|\.scss)$/,
                    loader: TextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {sourceMap: true}
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: function () {
                                        return [
                                            require('autoprefixer')
                                        ];
                                    },
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: plugins(env)
    };
};