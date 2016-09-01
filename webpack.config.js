'use strict';

let fs = require("fs"),
    nodeExternals = require('webpack-node-externals'),
    webpack = require('webpack');

function getLicenseText () {
    return `/*
Copyright (C) 2016 Timofey Kachalov <sanex3339@yandex.ru>

${fs.readFileSync('./LICENSE.BSD', 'utf8')}
*/`;
}

const isTravisEnv = process.env.TRAVIS ? JSON.parse(process.env.TRAVIS) : false;
const plugins = [
    new webpack.BannerPlugin(
        {
            banner: `${getLicenseText()}\n\nrequire("source-map-support").install();\n`,
            raw: true,
            entryOnly: false
        }
    )
];

if (isTravisEnv) {
    plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = {
    bail: isTravisEnv,
    entry: {
        'index': './index.ts'
    },
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.ts'],
        modulesDirectories: ['./src', './node_modules']
    },
    plugins: plugins,
    output: {
        path: './dist',
        filename: '[name].js',
        libraryTarget:  "commonjs2",
        library: "JavaScriptObfuscator"
    }
};
