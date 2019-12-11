'use strict';

const path = require('path');
const rootDir = path.resolve(__dirname);
const buildDir = path.resolve(rootDir, 'build');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const proxySettings = require('./proxy-settings');

module.exports = {
    entry: './lib/index.tsx',
    context: rootDir,
    target: 'web',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: buildDir,
        pathinfo: true,
        publicPath: '/',
    },
    devServer: {
        contentBase: buildDir,
        compress: true,
        publicPath: '/',
        port: 3000,
        host: '0.0.0.0',
        historyApiFallback: {
            index: '/',
        },
        proxy: [{
            context: ['/demo'],
            ...proxySettings,
        }, ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', 'scss', 'css'],
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(rootDir + '/dev-resources'),
            to: buildDir,
        }, ]),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader', // 3. Translates CSS into CommonJS
                    },
                    {
                        loader: 'resolve-url-loader', // 2. Resolves relative paths in url() statements based on the original source file
                    },
                    {
                        loader: 'sass-loader', // 1. compiles Sass to CSS
                        options: {
                            exclude: [/node_modules/],
                            sourceMap: true, // needed for 'resolve-url-loader' to work
                            sourceMapContents: false, // needed for 'resolve-url-loader' to work
                        },
                    },
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]',
                    outputPath: '/',
                },
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    useCache: true,
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
