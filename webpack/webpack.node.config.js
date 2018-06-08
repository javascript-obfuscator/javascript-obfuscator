'use strict';

const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const TSLintPlugin = require('tslint-webpack-plugin');
const packageJson = require('pjson');

const WebpackUtils = require('./utils/WebpackUtils').WebpackUtils;

module.exports = {
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
                test: /\.ts(x?)$/,
                loader: 'awesome-typescript-loader',
                query: {
                    configFileName: 'src/tsconfig.node.json',
                    useBabel: true,
                    babelCore: '@babel/core',
                    useCache: true,
                    forceIsolatedModules: true
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
            VERSION: packageJson.version
        }),
        new CheckerPlugin(),
        new TSLintPlugin({
            files: ['./src/**/*.ts'],
            project: './src/tsconfig.node.json',
            exclude: []
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
