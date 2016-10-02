'use strict';

var fs = require('fs'),
    path = require('path'),
    nodeExternals = require('webpack-node-externals'),
    webpack = require('webpack'),
    TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

function getLicenseText () {
    return "/*\nCopyright (C) 2016 Timofey Kachalov <sanex3339@yandex.ru>\n\n" +
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
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'awesome-typescript-loader',
                query: {
                    useBabel: true
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts'],
        modules: ['node_modules', 'src'],
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },
    plugins: [
        new webpack.BannerPlugin(
            {
                banner: getLicenseText() + '\n\nrequire("source-map-support").install();\n',
                raw: true,
                entryOnly: false
            }
        )
    ],
    output: {
        path: './dist',
        filename: '[name].js',
        libraryTarget:  "commonjs2",
        library: "JavaScriptObfuscator"
    }
};
