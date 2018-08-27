/**
 * webpack config for the main thread bundle
 * -> check if target is electron-main
 * -> don't bundle node_modules
 * -> only handle .ts files
 */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const dist = path.join(__dirname, '../build');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/main/index.ts',
    },
    output: {
        path: dist,
        publicPath: '/',
        filename: '[name]/index.js',
        chunkFilename: '[name]/[chunkhash].js',
    },
    target: 'electron-main',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            main: path.resolve(__dirname, '../src/main'),
            shared: path.resolve(__dirname, '../src/shared'),
        },
    },
    node: false,
    stats: 'errors-only',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(j|t)s$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.node.json',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
};
