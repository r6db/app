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

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlinePlugin = require('html-webpack-inline-source-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const MiniExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const nano = require('cssnano');
const cssdedupe = require('postcss-discard-duplicates');

const DIST = path.join(__dirname, '../build');
const IS_PROD = process.env.NODE_ENV === 'production';

const stats = {
    assets: false,
    builtAt: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkGroups: true,
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
};

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
    target: 'web', // we use web, so that things like OBS can use this as browserSource
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            main: path.resolve(__dirname, '../src/main'),
            shared: path.resolve(__dirname, '../src/shared'),
            renderer: path.resolve(__dirname, '../src/renderer'),
            lib: path.join(__dirname, '../src/renderer/lib'),
            components: path.join(__dirname, '../src/renderer/components'),
            assets: path.join(__dirname, '../src/renderer/assets'),
        },
    },
    devServer: {
        host: 'localhost',
        inline: true,
        hot: true,
        lazy: false,
        stats,
        // TODO: switch port that we can pass /api to our actual server
        port: 2442,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 100,
            poll: 500,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:2443', // check the ports main/index at createServer
                secure: false,
            },
        },
    },
    stats,
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
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                        },
                    },
                    'cache-loader',
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
                            sizes: [640, 1200, 1600, 1920],
                            placeholder: true,
                            placeholderSize: 40,
                            quality: 90,
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
            {
                test: /\.(woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
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
            filename: 'index.html',
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
