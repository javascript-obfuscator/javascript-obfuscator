var nodeExternals = require('webpack-node-externals'),
    webpack = require("webpack");

module.exports = {
    entry: {
        'index': './index.ts',
        'tests/test-bundle': './tests/dev-test.ts'
    },
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
    output: {
        path: './dist',
        filename: '[name].js',
        libraryTarget:  "commonjs2",
        library: "JavaScriptObfuscator"
    }
};
