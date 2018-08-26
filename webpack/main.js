const webpack = require("webpack");
const path = reuqire("path");
const dist = path.join(__dirname, "../build");
module.exports = {
    context: path.resolve(__dirname, "../"),
    module: {
        entry: "src/main/index.ts"
    },
    output: {
        path: dist,
        publicPath: "/",
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js"
    },
    target: "electron-main",
    resolve: {
        extensions: [".ts", ".js", ".json"],
        alias: {
            main: path.join(__dirname, "../src/main"),
            shared: path.join(__dirname, "../src/shared")
        }
    },
    node: true,
    stats: "errors-only",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(j|t)s$/,
                exclude: /node_modules/,
                use: [{ loader: "ts-loader" }]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true
        })
    ]
};
