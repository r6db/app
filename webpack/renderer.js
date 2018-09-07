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
const { CheckerPlugin } = require('awesome-typescript-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const MiniExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const nano = require('cssnano');
const cssdedupe = require('postcss-discard-duplicates');

const DIST = path.join(__dirname, '../build');
const IS_PROD = process.env.NODE_ENV === 'production';

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: ['./src/renderer/app/index.tsx'],
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
    node: false,
    devServer: {
        host: 'localhost',
        compress: true,
        inline: true,
        hot: true,
        noInfo: true,
        lazy: false,
        port: 2442,
        stats: 'errors-only',
        watchOptions: {
            aggregateTimeout: 100,
            poll: 500,
        },
    },
    stats: 'errors-only',
    devtool: 'source-map',
    optimization: {
        removeEmptyChunks: true,
        splitChunks: {
            chunks: 'async',
            name: true,
            cacheGroups: {
                appStyles: {
                    name: 'app',
                    test: (m, c, entry = 'app') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
                loadingStyles: {
                    name: 'loading',
                    test: (m, c, entry = 'loading') =>
                        m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            silent: true,
                            configFileName: 'tsconfig.webpack.json',
                            useCache: true,
                            useBabel: true,
                            babelCore: '@babel/core',
                            forceIsolatedModule: true,
                            reportFiles: ['src/**/*.{ts,tsx}'],
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
                            // adapter: require('responsive-loader/sharp'),
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
        new HardSourceWebpackPlugin({
            info: { mode: 'none', level: 'warn' },
        }),
        new CheckerPlugin(),
    ],
};

if (IS_PROD) {
    module.exports.plugins = [...module.exports.plugins, new MiniExtractPlugin({ filename: '[name]/[chunkhash].css' })];
} else {
    module.exports.plugins = [new webpack.HotModuleReplacementPlugin(), ...module.exports.plugins];
}
