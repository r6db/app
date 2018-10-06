/**
 * webpack config for the main thread bundle
 * -> check if target is electron-main
 * -> don't bundle node_modules
 * -> only handle .ts files
 */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CheckerPlugin } = require('awesome-typescript-loader');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
            renderer: path.resolve(__dirname, '../src/renderer'),
        },
    },
    node: false,
    stats: {
        assets: true,
        assetsSort: 'field',
        builtAt: true,
        cached: false,
        cachedAssets: false,
        children: true,
        chunks: false,
        chunkGroups: false,
        chunkModules: true,
        chunkOrigins: true,
        chunksSort: 'field',
        context: path.resolve(__dirname, '../src/'),
        colors: true,
        depth: false,
        entrypoints: false,
        env: true,
        errors: true,
        errorDetails: true,
        hash: false,
        maxModules: 5,
        modules: false,
        modulesSort: 'field',
        moduleTrace: false,
        performance: true,
        providedExports: false,
        publicPath: false,
        reasons: true,
        source: false,
        timings: true,
        usedExports: false,
        version: false,
        warnings: true,
    },
    devtool: 'inline-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ecma: 7,
                    keep_classnames: true,
                    keep_fnames: true,
                    unsafe: true,
                    passes: 2,
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            silent: true,
                            configFileName: 'tsconfig.node.json',
                            useCache: true,
                            forceIsolatedModule: true,
                            reportFiles: ['src/**/*.{ts,tsx}'],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                VERSION: `"${process.env.VERSION}"`,
            },
        }),
        new HardSourceWebpackPlugin({
            info: { mode: 'none', level: 'warn' },
        }),
        new CopyPlugin([{ from: './src/main/logo.png', to: 'main/' }]),
        new CheckerPlugin(),
    ],
};
