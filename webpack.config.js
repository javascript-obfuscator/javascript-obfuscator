'use strict';

const fs = require("fs");
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const TSLintPlugin = require('tslint-webpack-plugin');

const copyright = 'Copyright (C) 2016-2018 Timofey Kachalov <sanex3339@yandex.ru>';

/**
 * @return {string}
 */
const getLicenseText = () => {
    return `/*!\n${copyright}\n\n` +
        fs.readFileSync('./LICENSE.BSD', 'utf8') + "\n*/";
};

/**
 * @return {string}
 */
const getSourceMapSupportImport = () => {
    return `require("source-map-support").install();`;
};

/**
 * @return {string}
 */
const getBannerText = () => {
    const lineSeparator = '\n\n';

    return getLicenseText() +
        lineSeparator +
        getSourceMapSupportImport() +
        lineSeparator;
};

module.exports = {
    entry: {
        'index': './index.ts'
    },
    cache: true,
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'awesome-typescript-loader',
                query: {
                    useBabel: true,
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
                banner: getBannerText(),
                raw: true,
                entryOnly: false
            }
        ),
        new CheckerPlugin(),
        new TSLintPlugin({
            files: ['./src/**/*.ts'],
            project: './tsconfig.json'
        })
    ],
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        libraryTarget:  "commonjs2",
        library: "JavaScriptObfuscator"
    },
    stats: {
        maxModules: 0
    }
};