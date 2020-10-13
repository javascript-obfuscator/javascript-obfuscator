'use strict';

const webpack = require('webpack');
const packageJson = require('pjson');

const WebpackUtils = require('./utils/WebpackUtils').WebpackUtils;

module.exports = {
    devtool: 'source-map',
    entry: {
        'index': './index.ts'
    },
    target: 'web',
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        alias: {
            assert: 'assert'
        },
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.BannerPlugin(
            {
                banner: WebpackUtils.getBannerText(WebpackUtils.getLicenseText()),
                raw: true,
                entryOnly: false
            }
        ),
        new webpack.EnvironmentPlugin({
            VERSION: packageJson.version
        }),
        new webpack.ProvidePlugin({
            process: ['process']
        })
    ],
    output: {
        libraryTarget: 'umd',
        library: 'JavaScriptObfuscator',
        filename: 'index.browser.js'
    },
    performance: {
        hints: false
    },
    stats: {
        excludeModules: true,
        warnings: false
    }
};
