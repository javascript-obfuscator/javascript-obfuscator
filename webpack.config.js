'use strict';

const fs = require("fs");
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

function getLicenseText () {
    return "/*\nCopyright (C) 2017 Timofey Kachalov <sanex3339@yandex.ru>\n\n" +
        fs.readFileSync('./LICENSE.BSD', 'utf8') + "\n*/";
}

module.exports = {
    entry: {
        'index': './index.ts'
    },
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.ts(x?)$/,
                loader: 'awesome-typescript-loader',
                query: {
                    useBabel: true,
                    useCache: true
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
                banner: getLicenseText() + '\n\nrequire("source-map-support").install();\n',
                raw: true,
                entryOnly: false
            }
        ),
        new CheckerPlugin()
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