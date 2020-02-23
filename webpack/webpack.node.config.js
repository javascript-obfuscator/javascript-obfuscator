'use strict';

const path = require('path');

const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const packageJson = require('pjson');

const WebpackUtils = require('./utils/WebpackUtils').WebpackUtils;

module.exports = {
    context: path.resolve(__dirname, '..'),
    devtool: 'source-map',
    entry: {
        'index': './index.ts',
        'index.cli': './index.cli.ts'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    plugins: [
        new webpack.BannerPlugin(
            {
                banner: WebpackUtils.getBannerText(
                    WebpackUtils.getLicenseText(),
                    WebpackUtils.getSourceMapSupportImport()
                ),
                raw: true,
                entryOnly: false
            }
        ),
        new webpack.EnvironmentPlugin({
            VERSION: packageJson.version,
            BUILD_TIMESTAMP: Date.now()
        }),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: 'src/tsconfig.node.json',
            eslint: true
        }),
        new ForkTsCheckerNotifierWebpackPlugin({
            skipFirstNotification: true
        })
    ],
    output: {
        libraryTarget:  'commonjs2',
        library: 'JavaScriptObfuscator'
    },
    stats: {
        maxModules: 0
    }
};
