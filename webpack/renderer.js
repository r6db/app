const webpack = require('webpack');
const path = require('path');
const util = require('util');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const MiniExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const nano = require('cssnano');
const cssdedupe = require('postcss-discard-duplicates');

const DIST = path.join(__dirname, '../build');
const IS_PROD = process.env.NODE_ENV === 'production';

const scssLoader = IS_PROD
    ? {
          test: /\.scss$/,
          use: [
              MiniExtractPlugin.loader,
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
                  options: { includePaths: [path.resolve(__dirname, '../src')] },
              },
          ],
      }
    : {
          test: /\.scss$/,
          use: [
              { loader: 'style-loader' },
              { loader: 'cache-loader' },
              { loader: 'css-loader' },
              {
                  loader: 'postcss-loader',
                  options: {
                      plugins: [autoprefixer(), mqpacker(), cssdedupe()],
                  },
              },
              {
                  loader: 'sass-loader',
                  options: { includePaths: [path.resolve(__dirname, '../src')] },
              },
          ],
      };

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
            scssLoader,
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
        }),
        new SpriteLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: 'tsconfig.webpack.json',
            checkSyntacticErrors: true,
        }),
    ],
};

if (IS_PROD) {
    module.exports.plugins.push(new MiniExtractPlugin({ filename: '[name].[chunkhash].css', allChunks: true }));
} else {
}
