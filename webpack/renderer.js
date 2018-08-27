const webpack = require('webpack');
const path = require('path');
const util = require('util');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const DIST = path.join(__dirname, '../build');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: ['./src/renderer/app.ts'],
        loading: ['./src/renderer/loading.tsx'],
    },
    output: {
        path: DIST,
        publicPath: '/',
        filename: '[name]/index.js',
        chunkFilename: '[name]/[chunkhash].js',
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            renderer: path.resolve(__dirname, '../src/renderer'),
            shared: path.resolve(__dirname, '../src/shared'),
            components: path.join(__dirname, '../src/renderer/components'),
            lib: path.join(__dirname, '../src/renderer/lib'),
            assets: path.join(__dirname, '../src/assets'),
        },
    },
    node: {
        __filename: true,
    },
    stats: 'errors-only',
    devtool: 'source-map',
    optimization: {
        removeEmptyChunks: true,
        splitChunks: {
            chunks: 'async',
            name: true,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'cache-loader' },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: './.cache',
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.node.json',
                        },
                    },
                ],
            },
            {
                test: /.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                        },
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [{ convertShapeToPath: false }],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'responsive-loader',
                        options: {
                            sizes: [320, 640, 1200, 1600, 1920, 2440],
                            placeholder: true,
                            placeholderSize: 40,
                            quality: 85,
                            adapter: require('responsive-loader/sharp'),
                        },
                    },
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new HtmlWebpackPlugin({
            filename: 'app/index.html',
            chunks: ['app'],
        }),
        new HtmlWebpackPlugin({
            filename: 'loading/index.html',
            chunks: ['loading'],
        }),
        new SpriteLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: 'tsconfig.webpack.json',
            checkSyntacticErrors: true,
        }),
    ],
};
