/**
 * webpack config for all renderer bundles
 * -> check if target is electron-renderer
 * -> bundle node_modules
 * -> handle all file imports
 *  -> js/ts
 *      - bundle
 *      - tree shake
 *      - optimize
 *  -> scss
 *      - compile
 *      - prefix
 *       - dedupe
 *  -> svg
 *      - optimize
 *      - build spritesheet
 *  -> jpg/png
 *      - optimize
 *      - resize to multiple sizes
 *      - generate placeholder
 *      - build sourceset
 *  -> build html files
 * -> output should be build/<entry>/...
 */
const webpack = require('webpack');
const path = require('path');
const util = require('util');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlinePlugin = require('html-webpack-inline-source-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const MiniExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const nano = require('cssnano');
const cssdedupe = require('postcss-discard-duplicates');

const DIST = path.join(__dirname, '../build');
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: ['./src/renderer/app/index.ts'],
        loading: ['./src/renderer/loading/index.ts'],
    },
    output: {
        path: DIST,
        publicPath: '/',
        filename: '[name]/index.js',
        chunkFilename: '[name]/[chunkhash].js',
    },
    target: 'electron-renderer',
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
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /.svg$/,
                use: [
                    { loader: 'cache-loader' },
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
                    { loader: 'cache-loader' },
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
            {
                test: /\.scss$/,
                use: [
                    IS_PROD ? MiniExtractPlugin.loader : { loader: 'style-loader' },
                    { loader: 'cache-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer(),
                                mqpacker(),
                                cssdedupe(),
                                nano({
                                    reduceIdents: false,
                                    zindex: false,
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: { includePaths: [path.resolve(__dirname, '../src/renderer')] },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                VERSION: `"${process.env.VERSION}"`,
            },
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/renderer/app/index.ejs',
            filename: 'app/index.html',
            chunks: ['app'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/renderer/loading/index.ejs',
            filename: 'loading/index.html',
            chunks: ['loading'],
            inlineSource: '.css$',
        }),
        new HtmlInlinePlugin(),
        new SpriteLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: 'tsconfig.webpack.json',
            checkSyntacticErrors: false, // enable if using multi-process build
            silent: true,
        }),
    ],
};

if (IS_PROD) {
    module.exports.plugins.push(new MiniExtractPlugin({ filename: '[name].[chunkhash].css', allChunks: true }));
} else {
}
